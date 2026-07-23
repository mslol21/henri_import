'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Package, Plus, Pencil, Trash2, X, Save, Loader2,
  Search, AlertCircle, GripVertical, Image as ImageIcon,
  Tag, BarChart, ChevronDown, ChevronUp
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface FlavorData {
  id: string;
  productId: string;
  name: string;
  imageUrl: string | null;
  price: number | null;
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
  basePrice: 0, basePromoPrice: null as number | null, hasFlavors: false,
  baseStock: 0, baseSku: '', internalCode: '', mainImageUrl: '',
  weight: 0, active: true
};

const emptyFlavorForm = {
  name: '', imageUrl: '', price: null as number | null, stock: 0,
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
    setProductFormError(null);
    setProductModalOpen(true);
  };

  const openEditProduct = (p: ProductData) => {
    setEditingProduct(p.id);
    setProductForm({
      name: p.name, slug: p.slug, brand: p.brand, categoryId: p.categoryId,
      description: p.description, basePrice: p.basePrice, basePromoPrice: p.basePromoPrice,
      hasFlavors: p.hasFlavors, baseStock: p.baseStock, baseSku: p.baseSku,
      internalCode: p.internalCode || '', mainImageUrl: p.mainImageUrl,
      weight: p.weight, active: p.active
    });
    setProductFormError(null);
    setProductModalOpen(true);
  };

  const saveProduct = async () => {
    if (!productForm.name || !productForm.slug || !productForm.categoryId || !productForm.baseSku || !productForm.mainImageUrl) {
      setProductFormError('Preencha os campos obrigatórios (*)');
      return;
    }
    setProductSaving(true);
    setProductFormError(null);
    try {
      const url = editingProduct ? `/api/admin/products/${editingProduct}` : '/api/admin/products';
      const method = editingProduct ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productForm),
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
      name: f.name, imageUrl: f.imageUrl || '', price: f.price,
      stock: f.stock, sku: f.sku, description: f.description || '',
      active: f.active, displayOrder: f.displayOrder
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
    try {
      const url = editingFlavor ? `/api/admin/flavors/${editingFlavor}` : '/api/admin/flavors';
      const method = editingFlavor ? 'PATCH' : 'POST';
      const bodyData = { ...flavorForm, productId: parentProductId };
      
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
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
              <div key={product.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={product.mainImageUrl || '/placeholder.png'} alt={product.name} className="w-14 h-14 object-cover rounded-xl border border-slate-100 bg-slate-50" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider bg-sky-50 px-2 py-0.5 rounded-full">{product.category.name}</span>
                        {!product.active && <span className="text-[10px] font-black uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">Inativo</span>}
                      </div>
                      <h3 className="text-sm font-black text-slate-900">{product.name}</h3>
                      <div className="flex gap-3 text-xs text-slate-500 mt-1 font-mono">
                        <span>SKU: {product.baseSku}</span>
                        <span>|</span>
                        <span>{formatCurrency(product.basePrice)}</span>
                        <span>|</span>
                        <span>Estoque: {stockTotal}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {product.hasFlavors && (
                      <button onClick={() => toggleExpand(product.id)} className="px-3 py-1.5 flex items-center gap-1.5 bg-purple-50 text-purple-600 rounded-xl text-xs font-bold hover:bg-purple-100">
                        {isExpanded ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                        Sabores ({product.flavors.length})
                      </button>
                    )}
                    <button onClick={() => openEditProduct(product)} className="w-8 h-8 flex items-center justify-center bg-slate-50 text-slate-600 rounded-xl hover:bg-slate-100"><Pencil className="w-4 h-4"/></button>
                    <button onClick={() => deleteProduct(product.id)} disabled={deletingId === product.id} className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-500 rounded-xl hover:bg-red-100 disabled:opacity-50">
                      {deletingId === product.id ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="w-4 h-4"/>}
                    </button>
                  </div>
                </div>

                {isExpanded && product.hasFlavors && (
                  <div className="bg-slate-50 border-t border-slate-100 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-xs font-black uppercase text-slate-500 tracking-wider">Sabores / Variações</h4>
                      <button onClick={() => openCreateFlavor(product.id)} className="text-xs font-bold text-purple-600 flex items-center gap-1 hover:text-purple-700">
                        <Plus className="w-3.5 h-3.5"/> Adicionar Sabor
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.flavors.map(flavor => (
                        <div key={flavor.id} className={`flex items-center justify-between p-3 bg-white border border-slate-200 rounded-2xl ${!flavor.active ? 'opacity-60':''}`}>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden">
                              {flavor.imageUrl ? <img src={flavor.imageUrl} className="w-full h-full object-cover" /> : <Package className="w-5 h-5 text-slate-300"/>}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-900">{flavor.name}</p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">SKU: {flavor.sku} | Est: {flavor.stock} {flavor.price ? `| ${formatCurrency(flavor.price)}` : ''}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => openEditFlavor(product.id, flavor)} className="p-1.5 text-slate-400 hover:text-sky-600 bg-slate-50 rounded-lg"><Pencil className="w-3.5 h-3.5"/></button>
                            <button onClick={() => deleteFlavor(flavor.id)} disabled={deletingFlavorId === flavor.id} className="p-1.5 text-slate-400 hover:text-red-500 bg-slate-50 rounded-lg">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
              <button onClick={() => setProductModalOpen(false)} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X className="h-4 w-4 text-slate-500" /></button>
            </div>
            
            {productFormError && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2"><AlertCircle className="w-4 h-4"/>{productFormError}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Produto *</label>
                <input type="text" value={productForm.name} onChange={(e) => handleProductNameChange(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Slug (URL) *</label>
                <input type="text" value={productForm.slug} onChange={(e) => setProductForm({...productForm, slug: e.target.value.toLowerCase()})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoria *</label>
                <select value={productForm.categoryId} onChange={(e) => setProductForm({...productForm, categoryId: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm">
                  <option value="">Selecione...</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Preço Base (R$) *</label>
                <input type="number" step="0.01" value={productForm.basePrice} onChange={(e) => setProductForm({...productForm, basePrice: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SKU Base *</label>
                <input type="text" value={productForm.baseSku} onChange={(e) => setProductForm({...productForm, baseSku: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">URL da Imagem Principal *</label>
                <input type="text" placeholder="https://..." value={productForm.mainImageUrl} onChange={(e) => setProductForm({...productForm, mainImageUrl: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">Descrição</label>
                <textarea rows={3} value={productForm.description} onChange={(e) => setProductForm({...productForm, description: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
              </div>

              <div className="flex items-center gap-6 md:col-span-2 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={productForm.hasFlavors} onChange={(e) => setProductForm({...productForm, hasFlavors: e.target.checked})} className="rounded text-sky-600" />
                  <span className="text-sm font-bold text-slate-700">Possui Sabores/Variações</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={productForm.active} onChange={(e) => setProductForm({...productForm, active: e.target.checked})} className="rounded text-sky-600" />
                  <span className="text-sm font-bold text-slate-700">Produto Ativo</span>
                </label>
              </div>

              {!productForm.hasFlavors && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estoque Inicial (Sem sabor)</label>
                  <input type="number" value={productForm.baseStock} onChange={(e) => setProductForm({...productForm, baseStock: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setProductModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancelar</button>
              <button onClick={saveProduct} disabled={productSaving} className="px-6 py-2 rounded-xl text-sm font-black text-white bg-sky-600 hover:bg-sky-500 disabled:opacity-50 flex items-center gap-2">
                {productSaving && <Loader2 className="w-4 h-4 animate-spin"/>} Salvar Produto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLAVOR MODAL --- */}
      {flavorModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900">{editingFlavor ? 'Editar Sabor' : 'Adicionar Sabor'}</h2>
              <button onClick={() => setFlavorModalOpen(false)} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"><X className="h-4 w-4 text-slate-500" /></button>
            </div>
            
            {flavorFormError && <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2"><AlertCircle className="w-4 h-4"/>{flavorFormError}</div>}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Sabor *</label>
                <input type="text" value={flavorForm.name} onChange={(e) => setFlavorForm({...flavorForm, name: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SKU da Variação *</label>
                <input type="text" value={flavorForm.sku} onChange={(e) => setFlavorForm({...flavorForm, sku: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estoque</label>
                  <input type="number" value={flavorForm.stock} onChange={(e) => setFlavorForm({...flavorForm, stock: Number(e.target.value)})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preço Extra (opcional)</label>
                  <input type="number" step="0.01" value={flavorForm.price ?? ''} onChange={(e) => setFlavorForm({...flavorForm, price: e.target.value ? Number(e.target.value) : null})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" placeholder="Ex: 10.00" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">URL da Imagem (opcional)</label>
                <input type="text" value={flavorForm.imageUrl} onChange={(e) => setFlavorForm({...flavorForm, imageUrl: e.target.value})} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm" />
              </div>
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={flavorForm.active} onChange={(e) => setFlavorForm({...flavorForm, active: e.target.checked})} className="rounded text-sky-600" />
                  <span className="text-sm font-bold text-slate-700">Sabor Ativo</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setFlavorModalOpen(false)} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200">Cancelar</button>
              <button onClick={saveFlavor} disabled={flavorSaving} className="px-6 py-2 rounded-xl text-sm font-black text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 flex items-center gap-2">
                {flavorSaving && <Loader2 className="w-4 h-4 animate-spin"/>} Salvar Sabor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
