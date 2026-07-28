'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Package, Plus, Pencil, Trash2, X, Save, Loader2,
  Search, AlertCircle, GripVertical, Image as ImageIcon,
  Tag, BarChart, ChevronDown, ChevronUp, Sparkles
} from 'lucide-react';
import { formatCurrency, getCleanImageUrl, parseNumber } from '@/lib/utils';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

interface FlavorData {
  id: string;
  productId: string;
  name: string;
  imageUrl: string | null;
  price: number | null;
  wholesalePrice: number | null;
  stock: number;
  sku: string;
  description: string | null;
  displayOrder: number;
  active: boolean;
}

interface ProductData {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryId: string;
  description: string;
  basePrice: number;
  basePromoPrice: number | null;
  wholesalePrice: number | null;
  minWholesaleQty: number | null;
  hasFlavors: boolean;
  baseStock: number;
  baseSku: string;
  internalCode: string | null;
  mainImageUrl: string;
  gallery: string[];
  weight: number;
  active: boolean;
  category: { name: string };
  flavors: FlavorData[];
}

interface CategoryData {
  id: string;
  name: string;
}

const emptyProductForm = {
  name: '', slug: '', brand: '', categoryId: '', description: '',
  basePrice: '' as string | number, basePromoPrice: '' as string | number | null,
  wholesalePrice: '' as string | number | null, minWholesaleQty: '' as string | number | null,
  hasFlavors: false,
  baseStock: '' as string | number, baseSku: '', internalCode: '', mainImageUrl: '',
  weight: 0, active: true
};

const emptyFlavorForm = {
  name: '', imageUrl: '', price: '' as string | number | null, wholesalePrice: '' as string | number | null, stock: '' as string | number,
  sku: '', description: '', active: true, displayOrder: 0
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [expandedProducts, setExpandedProducts] = useState<Record<string, boolean>>({});

  // Product Modal
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [productSaving, setProductSaving] = useState(false);
  const [productFormError, setProductFormError] = useState<string | null>(null);
  const [editableFlavors, setEditableFlavors] = useState<FlavorData[]>([]);

  // Flavor Modal
  const [flavorModalOpen, setFlavorModalOpen] = useState(false);
  const [parentProductId, setParentProductId] = useState<string | null>(null);
  const [editingFlavor, setEditingFlavor] = useState<string | null>(null);
  const [flavorForm, setFlavorForm] = useState(emptyFlavorForm);
  const [flavorSaving, setFlavorSaving] = useState(false);
  const [flavorFormError, setFlavorFormError] = useState<string | null>(null);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deletingFlavorId, setDeletingFlavorId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories')
      ]);
      if (!prodRes.ok || !catRes.ok) throw new Error('Erro ao carregar dados');
      
      const prods = await prodRes.json();
      const cats = await catRes.json();
      setProducts(prods);
      setCategories(cats);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const toggleExpand = (id: string) => {
    setExpandedProducts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // --- Product Functions ---
  const handleProductNameChange = (val: string) => {
    const slug = val.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');
    setProductForm({ ...productForm, name: val, slug });
  };

  const openCreateProduct = () => {
    setEditingProduct(null);
    setProductForm(emptyProductForm);
    setEditableFlavors([]);
    setProductFormError(null);
    setProductModalOpen(true);
  };

  const openEditProduct = (p: ProductData) => {
    setEditingProduct(p.id);
    setProductForm({
      name: p.name, slug: p.slug, brand: p.brand, categoryId: p.categoryId,
      description: p.description,
      basePrice: p.basePrice ?? '',
      basePromoPrice: p.basePromoPrice ?? '',
      wholesalePrice: p.wholesalePrice ?? '',
      minWholesaleQty: p.minWholesaleQty ?? '',
      hasFlavors: p.hasFlavors,
      baseStock: p.baseStock ?? '',
      baseSku: p.baseSku,
      internalCode: p.internalCode || '',
      mainImageUrl: p.mainImageUrl,
      weight: p.weight,
      active: p.active
    });
    setEditableFlavors(p.flavors ? p.flavors.map(f => ({ ...f })) : []);
    setProductFormError(null);
    setProductModalOpen(true);
  };

  const saveProduct = async () => {
    if (!productForm.name || !productForm.slug || !productForm.categoryId || !productForm.baseSku || !productForm.mainImageUrl) {
      setProductFormError('Preencha os campos obrigatórios (*)');
      return;
    }

    const parsedBasePrice = parseNumber(productForm.basePrice);
    if (parsedBasePrice === null) {
      setProductFormError('Preço Base é obrigatório e deve ser um número válido (ex: 120,50)');
      return;
    }

    setProductSaving(true);
    setProductFormError(null);

    const payload = {
      ...productForm,
      basePrice: parsedBasePrice,
      basePromoPrice: parseNumber(productForm.basePromoPrice),
      wholesalePrice: parseNumber(productForm.wholesalePrice),
      minWholesaleQty: parseNumber(productForm.minWholesaleQty),
      baseStock: parseNumber(productForm.baseStock) ?? 0,
      weight: parseNumber(productForm.weight) ?? 0,
      flavors: editableFlavors,
    };

    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct}` : '/api/admin/products';
      const method = editingProduct ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setProductFormError(data.error); return; }
      setProductModalOpen(false);
      fetchData();
    } catch {
      setProductFormError('Erro de conexão.');
    } finally {
      setProductSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) alert(data.error);
      else fetchData();
    } finally { setDeletingId(null); }
  };

  // --- Flavor Functions ---
  const openCreateFlavor = (productId: string) => {
    setParentProductId(productId);
    setEditingFlavor(null);
    setFlavorForm(emptyFlavorForm);
    setFlavorFormError(null);
    setFlavorModalOpen(true);
  };

  const openEditFlavor = (productId: string, f: FlavorData) => {
    setParentProductId(productId);
    setEditingFlavor(f.id);
    setFlavorForm({
      name: f.name,
      imageUrl: f.imageUrl || '',
      price: f.price ?? '',
      wholesalePrice: f.wholesalePrice ?? '',
      stock: f.stock ?? '',
      sku: f.sku,
      description: f.description || '',
      active: f.active,
      displayOrder: f.displayOrder
    });
    setFlavorFormError(null);
    setFlavorModalOpen(true);
  };

  const saveFlavor = async () => {
    if (!flavorForm.name || !flavorForm.sku) {
      setFlavorFormError('Preencha os campos obrigatórios (*)');
      return;
    }
    setFlavorSaving(true);
    setFlavorFormError(null);

    const payload = {
      ...flavorForm,
      productId: parentProductId,
      price: parseNumber(flavorForm.price),
      wholesalePrice: parseNumber(flavorForm.wholesalePrice),
      stock: parseNumber(flavorForm.stock) ?? 0,
    };

    try {
      const url = editingFlavor ? `/api/admin/flavors/${editingFlavor}` : '/api/admin/flavors';
      const method = editingFlavor ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setFlavorFormError(data.error); return; }
      setFlavorModalOpen(false);
      fetchData();
    } catch {
      setFlavorFormError('Erro de conexão.');
    } finally {
      setFlavorSaving(false);
    }
  };

  const deleteFlavor = async (id: string) => {
    setDeletingFlavorId(id);
    try {
      const res = await fetch(`/api/admin/flavors/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) alert(data.error);
      else fetchData();
    } finally { setDeletingFlavorId(null); }
  };


  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.baseSku.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">GESTÃO DE ESTOQUE E CATÁLOGO</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">Produtos e Sabores</h1>
        </div>
        <button onClick={openCreateProduct} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-lg shadow-sky-600/30 transition-all">
          <Plus className="h-4 w-4" /> Novo Produto
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar produto por nome ou SKU..."
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
        />
      </div>

      {loading ? (
        <div className="flex justify-center py-16 text-slate-400"><Loader2 className="animate-spin h-6 w-6" /></div>
      ) : error ? (
        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-2xl">{error}</div>
      ) : (
        <div className="space-y-4">
          {filtered.map(product => {
            const isExpanded = expandedProducts[product.id];
            const stockTotal = product.hasFlavors ? product.flavors.reduce((acc, f) => acc + f.stock, 0) : product.baseStock;
            
            return (
              <div key={product.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Product Info */}
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
                    <img
                      src={getCleanImageUrl(product.mainImageUrl)}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-2xl border border-slate-100 bg-slate-50 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                          {product.category.name}
                        </span>
                        {product.brand && (
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            {product.brand}
                          </span>
                        )}
                        {!product.active && (
                          <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            Inativo
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 truncate">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-slate-500 mt-1 font-mono flex-wrap">
                        <span>SKU: {product.baseSku}</span>
                        <span>•</span>
                        <span className="font-bold text-slate-800">{formatCurrency(product.basePrice)}</span>
                        <span>•</span>
                        <span>Estoque: {stockTotal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex items-center justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 shrink-0">
                    {product.hasFlavors && (
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="px-3 py-2 flex items-center gap-1.5 bg-purple-50 text-purple-700 rounded-xl text-xs font-bold hover:bg-purple-100 transition-colors border border-purple-200/60"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-purple-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-purple-600 shrink-0" />}
                        <span>Sabores ({product.flavors.length})</span>
                      </button>
                    )}

                    <button
                      onClick={() => openEditProduct(product)}
                      className="flex items-center gap-1.5 px-3.5 py-2 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded-xl text-xs font-black transition-colors border border-sky-200/60"
                      title="Editar Produto"
                    >
                      <Pencil className="w-4 h-4 text-sky-600 shrink-0" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      disabled={deletingId === product.id}
                      className="p-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors disabled:opacity-50 border border-red-200/60"
                      title="Excluir Produto"
                    >
                      {deletingId === product.id ? (
                        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-500" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Flavors List Section */}
                {isExpanded && product.hasFlavors && (
                  <div className="bg-slate-50 border-t border-slate-100 p-4 sm:p-5 mt-4 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Sabores / Variações</h4>
                      <button onClick={() => openCreateFlavor(product.id)} className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:text-purple-700">
                        <Plus className="w-3.5 h-3.5"/> Adicionar Sabor
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.flavors.map(flavor => (
                        <div key={flavor.id} className={`flex items-center justify-between p-3 bg-white border border-slate-200 rounded-2xl gap-3 ${!flavor.active ? 'opacity-60':''}`}>
                          <div className="flex items-center gap-3 min-w-0 pr-2">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border border-slate-200">
                              {getCleanImageUrl(flavor.imageUrl, '') ? (
                                <img src={getCleanImageUrl(flavor.imageUrl)!} className="w-full h-full object-cover" />
                              ) : (
                                <Package className="w-5 h-5 text-slate-400"/>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{flavor.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">SKU: {flavor.sku} | Est: {flavor.stock} {flavor.price ? `| ${formatCurrency(flavor.price)}` : ''}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              onClick={() => openEditFlavor(product.id, flavor)}
                              className="flex items-center gap-1 px-2.5 py-1.5 text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/60 rounded-xl text-xs font-bold transition-colors"
                              title="Editar Sabor"
                            >
                              <Pencil className="w-3.5 h-3.5 text-sky-600"/>
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => deleteFlavor(flavor.id)}
                              disabled={deletingFlavorId === flavor.id}
                              className="p-1.5 text-red-500 bg-red-50 hover:bg-red-100 border border-red-200/60 rounded-xl transition-colors"
                              title="Excluir Sabor"
                            >
                              {deletingFlavorId === flavor.id ? <Loader2 className="w-3.5 h-3.5 animate-spin"/> : <Trash2 className="w-3.5 h-3.5"/>}
                            </button>
                          </div>
                        </div>
                      ))}
                      {product.flavors.length === 0 && (
                        <p className="text-xs text-slate-400 col-span-full">Nenhum sabor cadastrado. Clique em Adicionar Sabor.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* --- PRODUCT MODAL --- */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto border border-slate-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <h2 className="text-lg font-black text-slate-900">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={() => setProductModalOpen(false)} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors">
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {productFormError && (
                <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {productFormError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Produto *</label>
                  <input type="text" value={productForm.name} onChange={(e) => handleProductNameChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500" placeholder="Ex: Ignite V250" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Marca *</label>
                  <input type="text" value={productForm.brand} onChange={(e) => setProductForm({...productForm, brand: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500" placeholder="Ex: Ignite, Elfbar, Zomo" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Slug (URL) *</label>
                  <input type="text" value={productForm.slug} onChange={(e) => setProductForm({...productForm, slug: e.target.value.toLowerCase()})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Categoria *</label>
                  <select value={productForm.categoryId} onChange={(e) => setProductForm({...productForm, categoryId: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500">
                    <option value="">Selecione uma categoria...</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preço Base (R$) *</label>
                  <input type="text" inputMode="decimal" value={productForm.basePrice ?? ''} onChange={(e) => setProductForm({...productForm, basePrice: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-sky-500" placeholder="Ex: 120,50" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preço Promocional (R$)</label>
                  <input type="text" inputMode="decimal" value={productForm.basePromoPrice ?? ''} onChange={(e) => setProductForm({...productForm, basePromoPrice: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500" placeholder="Ex: 99,90" />
                </div>

                <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-purple-50 rounded-2xl border border-purple-100">
                  <div>
                    <label className="block text-xs font-bold text-purple-900 mb-1">Preço de Atacado (R$)</label>
                    <input type="text" inputMode="decimal" value={productForm.wholesalePrice ?? ''} onChange={(e) => setProductForm({...productForm, wholesalePrice: e.target.value})} className="w-full rounded-xl border border-purple-200 bg-white px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:border-purple-500 focus:outline-none" placeholder="Ex: 50,00" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-purple-900 mb-1">Qtd Mín. Atacado</label>
                    <input type="text" inputMode="numeric" value={productForm.minWholesaleQty ?? ''} onChange={(e) => setProductForm({...productForm, minWholesaleQty: e.target.value})} className="w-full rounded-xl border border-purple-200 bg-white px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:border-purple-500 focus:outline-none" placeholder="Ex: 10" />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">SKU Base *</label>
                  <input type="text" value={productForm.baseSku} onChange={(e) => setProductForm({...productForm, baseSku: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500" placeholder="Ex: PROD-001" />
                </div>

                <div className="md:col-span-2">
                  <ImageUploadInput
                    label="Imagem Principal do Produto *"
                    value={productForm.mainImageUrl}
                    onChange={(url) => setProductForm({...productForm, mainImageUrl: url})}
                    bucket="products"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Descrição</label>
                  <textarea rows={3} value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-500" placeholder="Detalhes do produto..." />
                </div>

                <div className="flex items-center gap-6 md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={productForm.hasFlavors} onChange={(e) => setProductForm({...productForm, hasFlavors: e.target.checked})} className="rounded text-sky-600 focus:ring-sky-500" />
                    <span className="text-sm font-bold text-slate-700">Possui Sabores/Variações</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={productForm.active} onChange={(e) => setProductForm({...productForm, active: e.target.checked})} className="rounded text-sky-600 focus:ring-sky-500" />
                    <span className="text-sm font-bold text-slate-700">Produto Ativo</span>
                  </label>
                </div>

                {!productForm.hasFlavors && (
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estoque Inicial (Sem sabor)</label>
                    <input type="text" inputMode="numeric" value={productForm.baseStock ?? ''} onChange={(e) => setProductForm({...productForm, baseStock: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-sky-500" placeholder="0" />
                  </div>
                )}

                {/* --- BULK FLAVOR EDITING SECTION --- */}
                {editingProduct && productForm.hasFlavors && editableFlavors.length > 0 && (
                  <div className="md:col-span-2 p-4 sm:p-5 bg-purple-50/70 border border-purple-200 rounded-3xl space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-200/60 pb-3">
                      <div>
                        <h3 className="text-xs font-black uppercase tracking-wider text-purple-900 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-purple-600 shrink-0" />
                          <span>Edição de Sabores em Lote ({editableFlavors.length} sabores)</span>
                        </h3>
                        <p className="text-[11px] text-purple-700 mt-0.5">
                          Edite estoque ou preços de todos os sabores diretamente aqui, ou aplique valores em massa.
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => {
                            const val = prompt('Informe o estoque para aplicar a TODOS os sabores:');
                            if (val !== null && val.trim() !== '') {
                              setEditableFlavors(prev => prev.map(f => ({ ...f, stock: val })));
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-200 hover:bg-purple-300 text-purple-900 text-[11px] font-black transition-colors"
                        >
                          ⚡ Estoque em Massa
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const val = prompt('Informe o Preço de Atacado Especial para TODOS os sabores (deixe em branco para limpar):');
                            if (val !== null) {
                              setEditableFlavors(prev => prev.map(f => ({ ...f, wholesalePrice: val })));
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-200 hover:bg-purple-300 text-purple-900 text-[11px] font-black transition-colors"
                        >
                          ⚡ Atacado em Massa
                        </button>
                      </div>
                    </div>

                    {/* Flavors Grid List */}
                    <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                      {editableFlavors.map((flavor, index) => (
                        <div
                          key={flavor.id}
                          className="p-3 bg-white border border-purple-100 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                        >
                          <div className="flex items-center gap-2 min-w-0 sm:w-1/3">
                            <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md shrink-0">
                              #{index + 1}
                            </span>
                            <input
                              type="text"
                              value={flavor.name}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditableFlavors(prev => prev.map((f, i) => i === index ? { ...f, name: val } : f));
                              }}
                              className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-purple-500"
                              placeholder="Nome do sabor"
                            />
                          </div>

                          <div className="grid grid-cols-3 gap-2 flex-1">
                            <div>
                              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Estoque</label>
                              <input
                                type="text"
                                inputMode="numeric"
                                value={flavor.stock ?? ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditableFlavors(prev => prev.map((f, i) => i === index ? { ...f, stock: val } : f));
                                }}
                                className="w-full text-xs font-mono font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 focus:outline-none focus:border-purple-500"
                                placeholder="0"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Preço Varejo</label>
                              <input
                                type="text"
                                inputMode="decimal"
                                value={flavor.price ?? ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditableFlavors(prev => prev.map((f, i) => i === index ? { ...f, price: val } : f));
                                }}
                                className="w-full text-xs font-mono text-slate-900 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1.5 focus:outline-none focus:border-purple-500"
                                placeholder="Base"
                              />
                            </div>

                            <div>
                              <label className="block text-[9px] font-bold text-purple-900 uppercase mb-0.5">Preço Atacado</label>
                              <input
                                type="text"
                                inputMode="decimal"
                                value={flavor.wholesalePrice ?? ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditableFlavors(prev => prev.map((f, i) => i === index ? { ...f, wholesalePrice: val } : f));
                                }}
                                className="w-full text-xs font-mono text-slate-900 bg-purple-50/50 border border-purple-200 rounded-xl px-2 py-1.5 focus:outline-none focus:border-purple-500"
                                placeholder="Base"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50">
              <button onClick={() => setProductModalOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">
                Cancelar
              </button>
              <button onClick={saveProduct} disabled={productSaving} className="px-6 py-2.5 rounded-xl text-sm font-black text-white bg-sky-600 hover:bg-sky-500 shadow-lg shadow-sky-600/30 transition-all disabled:opacity-50 flex items-center gap-2">
                {productSaving && <Loader2 className="w-4 h-4 animate-spin"/>}
                <span>Salvar Produto</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLAVOR MODAL --- */}
      {flavorModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto border border-slate-200">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
              <h2 className="text-base font-black text-slate-900">{editingFlavor ? 'Editar Sabor' : 'Adicionar Sabor'}</h2>
              <button onClick={() => setFlavorModalOpen(false)} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"><X className="h-4 w-4 text-slate-500" /></button>
            </div>
            
            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1">
              {flavorFormError && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2"><AlertCircle className="w-4 h-4 shrink-0"/>{flavorFormError}</div>}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Sabor *</label>
                <input type="text" value={flavorForm.name} onChange={(e) => setFlavorForm({...flavorForm, name: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-500" placeholder="Ex: Grape Ice" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SKU da Variação *</label>
                <input type="text" value={flavorForm.sku} onChange={(e) => setFlavorForm({...flavorForm, sku: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-purple-500" placeholder="Ex: IGN-GRP-01" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estoque</label>
                  <input type="text" inputMode="numeric" value={flavorForm.stock ?? ''} onChange={(e) => setFlavorForm({...flavorForm, stock: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-purple-500" placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preço Varejo Especial</label>
                  <input type="text" inputMode="decimal" value={flavorForm.price ?? ''} onChange={(e) => setFlavorForm({...flavorForm, price: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:outline-none focus:border-purple-500" placeholder="Ex: 10,00" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-purple-900 mb-1">Preço Atacado Especial</label>
                  <input type="text" inputMode="decimal" value={flavorForm.wholesalePrice ?? ''} onChange={(e) => setFlavorForm({...flavorForm, wholesalePrice: e.target.value})} className="w-full rounded-xl border border-purple-200 bg-purple-50 px-3.5 py-2.5 text-sm font-mono text-slate-900 focus:border-purple-500 focus:outline-none" placeholder="Ex: 8,50" />
                </div>
              </div>
              <div>
                <ImageUploadInput
                  label="Imagem do Sabor (opcional)"
                  value={flavorForm.imageUrl || ''}
                  onChange={(url) => setFlavorForm({...flavorForm, imageUrl: url})}
                  bucket="products"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={flavorForm.active} onChange={(e) => setFlavorForm({...flavorForm, active: e.target.checked})} className="rounded text-purple-600 focus:ring-purple-500" />
                  <span className="text-sm font-bold text-slate-700">Sabor Ativo</span>
                </label>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 flex justify-end gap-3 shrink-0 bg-slate-50/50">
              <button onClick={() => setFlavorModalOpen(false)} className="px-4 py-2.5 rounded-xl text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors">Cancelar</button>
              <button onClick={saveFlavor} disabled={flavorSaving} className="px-6 py-2.5 rounded-xl text-sm font-black text-white bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 flex items-center gap-2">
                {flavorSaving && <Loader2 className="w-4 h-4 animate-spin"/>} Salvar Sabor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
