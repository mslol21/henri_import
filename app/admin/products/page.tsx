'use client';

import React, { useState } from 'react';
import { mockProducts } from '@/lib/mockData';
import { ProductData, FlavorData } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { duplicateProduct, duplicateFlavor } from '@/actions/products';
import {
  Package,
  Plus,
  Copy,
  Trash2,
  Edit,
  Sparkles,
  Search,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductData[]>(mockProducts);
  const [search, setSearch] = useState('');
  const [expandedProductId, setExpandedProductId] = useState<string | null>('prod-1');
  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDuplicateProduct = async (id: string) => {
    const res = await duplicateProduct(id);
    if (res.success && res.product) {
      showToast(`Produto duplicado com sucesso!`);
      const updatedMock: ProductData = {
        id: res.product.id,
        name: res.product.name,
        slug: res.product.slug,
        brand: res.product.brand,
        categoryId: res.product.categoryId,
        description: res.product.description,
        basePrice: res.product.basePrice,
        basePromoPrice: res.product.basePromoPrice,
        hasFlavors: res.product.hasFlavors,
        baseStock: res.product.baseStock,
        baseSku: res.product.baseSku,
        mainImageUrl: res.product.mainImageUrl,
        gallery: [],
        weight: res.product.weight,
        active: false,
        flavors: [],
      };
      setProducts([updatedMock, ...products]);
    } else {
      // Local fallback simulation
      const original = products.find((p) => p.id === id);
      if (original) {
        const copy: ProductData = {
          ...original,
          id: `copy-${Date.now()}`,
          name: `${original.name} (Cópia)`,
          baseSku: `${original.baseSku}-COPY`,
          active: false,
        };
        setProducts([copy, ...products]);
        showToast(`Produto "${original.name}" duplicado!`);
      }
    }
  };

  const handleDuplicateFlavor = async (productId: string, flavorId: string) => {
    const res = await duplicateFlavor(flavorId);
    if (res.success && res.flavor) {
      showToast(`Sabor duplicado com sucesso!`);
    } else {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id === productId && p.flavors) {
            const flv = p.flavors.find((f) => f.id === flavorId);
            if (flv) {
              const flvCopy: FlavorData = {
                ...flv,
                id: `flv-copy-${Date.now()}`,
                name: `${flv.name} (Cópia)`,
                sku: `${flv.sku}-COPY`,
              };
              return { ...p, flavors: [...p.flavors, flvCopy] };
            }
          }
          return p;
        })
      );
      showToast('Sabor duplicado com sucesso!');
    }
  };

  const toggleProductStatus = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
    showToast('Status do produto alterado');
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Toast notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl bg-purple-600 px-4 py-3 text-white text-xs font-extrabold shadow-xl animate-bounce">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            GESTÃO DE ESTOQUE E CATÁLOGO
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            Produtos & Sabores
          </h1>
        </div>

        <button
          onClick={() => showToast('Formulário de novo produto aberto')}
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-xs font-black text-white hover:bg-purple-500 shadow-md transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Cadastrar Novo Produto</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar produto por nome ou marca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs text-slate-900 focus:border-purple-600 focus:outline-none shadow-xs"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map((product) => {
            const isExpanded = expandedProductId === product.id;
            return (
              <div key={product.id} className="p-4 space-y-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex items-center justify-between gap-4">
                  {/* Image & Basic Info */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-slate-100 border border-slate-200">
                      <img src={product.mainImageUrl} alt={product.name} className="h-full w-full object-cover" />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold uppercase text-purple-600">
                          {product.brand}
                        </span>
                        <span
                          onClick={() => toggleProductStatus(product.id)}
                          className={`cursor-pointer inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            product.active
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {product.active ? <CheckCircle className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
                          {product.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-slate-900 truncate">{product.name}</h3>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                        <span>SKU: {product.baseSku}</span>
                        <span>•</span>
                        <span>Preço: <strong>{formatCurrency(product.basePromoPrice ?? product.basePrice)}</strong></span>
                        <span>•</span>
                        <span>Estoque Total: <strong>{product.baseStock} un</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {/* Duplicate Product Action */}
                    <button
                      onClick={() => handleDuplicateProduct(product.id)}
                      title="Duplicar Produto"
                      className="flex items-center gap-1 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-purple-100 hover:text-purple-700 px-3 py-1.5 rounded-xl transition-colors"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">Duplicar</span>
                    </button>

                    {product.hasFlavors && (
                      <button
                        onClick={() => setExpandedProductId(isExpanded ? null : product.id)}
                        className="flex items-center gap-1 text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-xl transition-colors"
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Sabores ({product.flavors?.length || 0})</span>
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>
                    )}
                  </div>
                </div>

                {/* Expanded Flavors List */}
                {isExpanded && product.hasFlavors && product.flavors && (
                  <div className="pl-6 pt-2 border-t border-slate-100 space-y-3 bg-slate-50/80 p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
                        Sabores Cadastrados ({product.flavors.length})
                      </h4>
                      <button
                        onClick={() => showToast('Adicionar novo sabor')}
                        className="text-[11px] font-bold text-purple-600 hover:underline flex items-center gap-1"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        Adicionar Sabor
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.flavors.map((flavor) => (
                        <div
                          key={flavor.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-2xs"
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 border border-slate-200">
                              <img src={flavor.imageUrl || product.mainImageUrl} alt={flavor.name} className="h-full w-full object-cover" />
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-slate-900">{flavor.name}</h5>
                              <span className="text-[10px] text-slate-500 font-mono">
                                SKU: {flavor.sku} | Est: {flavor.stock} un
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => handleDuplicateFlavor(product.id, flavor.id)}
                            title="Duplicar Sabor"
                            className="p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Copy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
