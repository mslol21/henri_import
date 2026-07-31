'use client';

import React, { useState } from 'react';
import { ProductData, CategoryData } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { CategoryProductsSection } from '@/components/shop/CategoryProductsSection';
import { Search, LogOut, PackageCheck, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function WholesaleCatalog({
  products,
  categories,
  storeName,
}: {
  products: ProductData[];
  categories: CategoryData[];
  storeName: string;
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch('/api/atacado/logout', { method: 'POST' });
      router.push('/atacado');
      router.refresh();
    } catch {
      alert('Erro ao sair do modo atacado');
    } finally {
      setLoggingOut(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    if (search) {
      const q = search.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchFlavor = p.flavors?.some((f) => f.name.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchFlavor) return false;
    }

    if (selectedCategory) {
      if (p.category?.slug !== selectedCategory) return false;
    }

    return true;
  });

  const isFiltering = Boolean(search || selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Portal B2B */}
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-xs font-black text-purple-300">
                <PackageCheck className="h-4 w-4 text-purple-400" />
                <span>PORTAL EXCLUSIVO B2B • {storeName}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Tabela de Preços Atacado
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Navegue pela nossa linha completa com preços especiais de atacado. Você pode comprar 1 unidade por item, desde que o total do carrinho tenha no mínimo 10 unidades.
              </p>
            </div>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-3 border border-slate-700 transition-all shrink-0 hover:text-white"
            >
              <LogOut className="h-4 w-4 text-red-400" />
              <span>Sair do Atacado</span>
            </button>
          </div>
        </div>

        {/* Wholesale Cart Requirement Notice */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl flex items-start gap-3 text-purple-900 text-xs sm:text-sm font-semibold">
          <AlertCircle className="h-5 w-5 text-purple-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-black">Regra de Pedido Mínimo no Atacado:</span> É permitido selecionar 1 unidade de cada item/sabor desejado, porém <span className="underline decoration-purple-400 underline-offset-2">no final da compra é obrigatório ter no mínimo 10 unidades no total do carrinho</span> para liberar o checkout.
          </div>
        </div>

        {/* Search & Category Filter */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar produtos ou sabores no atacado..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-xs"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                selectedCategory === ''
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              Todos os Produtos
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === cat.slug
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Displayed by Category or Filtered Grid */}
        {isFiltering ? (
          filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md mx-auto my-12">
              <Search className="h-12 w-12 text-slate-300 mx-auto" />
              <h3 className="text-lg font-bold text-slate-800">Nenhum produto encontrado no atacado</h3>
              <p className="text-xs text-slate-500">
                Tente buscar por outro termo ou limpe os filtros de categoria.
              </p>
              <button
                onClick={() => { setSearch(''); setSelectedCategory(''); }}
                className="inline-flex rounded-xl bg-purple-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isWholesale={true} />
              ))}
            </div>
          )
        ) : (
          <div className="space-y-4">
            {categories.map((cat) => {
              const catProducts = products.filter((p) => p.categoryId === cat.id || p.category?.slug === cat.slug);
              if (catProducts.length === 0) return null;
              return (
                <CategoryProductsSection
                  key={cat.id}
                  category={cat}
                  products={catProducts}
                  isWholesale={true}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
