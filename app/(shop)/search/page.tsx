import React from 'react';
import { getProducts } from '@/actions/products';
import { getCategories } from '@/actions/categories';
import { ProductCard } from '@/components/shop/ProductCard';
import Link from 'next/link';
import { Search, Filter, Sparkles, X } from 'lucide-react';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    brand?: string;
    promo?: string;
  }>;
}

export default async function SearchCatalogPage({ searchParams }: SearchPageProps) {
  const queryParams = await searchParams;
  const search = queryParams.q || '';
  const categorySlug = queryParams.category || '';
  const brand = queryParams.brand || '';
  const promoOnly = queryParams.promo === 'true';

  const categories = await getCategories();
  const products = await getProducts({
    search,
    categorySlug,
    brand,
    promoOnly,
  });

  // Extract unique brands for filter
  const allProducts = await getProducts();
  const availableBrands = Array.from(new Set(allProducts.map((p) => p.brand)));

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
              CATÁLOGO COMPLETO
            </span>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
              {search ? `Resultados para "${search}"` : categorySlug ? `Categoria: ${categories.find(c => c.slug === categorySlug)?.name || categorySlug}` : 'Todos os Produtos'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Foram encontrados <strong className="text-slate-900">{products.length}</strong> produtos
            </p>
          </div>

          {/* Active Filter Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {search && (
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 hover:bg-purple-200"
              >
                <span>Busca: {search}</span>
                <X className="h-3.5 w-3.5" />
              </Link>
            )}
            {categorySlug && (
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 hover:bg-purple-200"
              >
                <span>Cat: {categorySlug}</span>
                <X className="h-3.5 w-3.5" />
              </Link>
            )}
            {brand && (
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 hover:bg-purple-200"
              >
                <span>Marca: {brand}</span>
                <X className="h-3.5 w-3.5" />
              </Link>
            )}
            {promoOnly && (
              <Link
                href="/search"
                className="inline-flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1 text-xs font-bold text-purple-700 hover:bg-purple-200"
              >
                <span>Promoções</span>
                <X className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Filter className="h-4 w-4 text-purple-600" />
                <span>Filtros Inteligentes</span>
              </h3>
              <Link href="/search" className="text-[11px] font-bold text-purple-600 hover:underline">
                Limpar
              </Link>
            </div>

            {/* Categorias */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Categorias
              </h4>
              <div className="space-y-1 text-xs font-medium">
                <Link
                  href="/search"
                  className={`block px-3 py-1.5 rounded-xl transition-colors ${
                    !categorySlug ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Todas as categorias
                </Link>
                {categories.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/search?category=${cat.slug}${search ? `&q=${search}` : ''}`}
                    className={`block px-3 py-1.5 rounded-xl transition-colors ${
                      categorySlug === cat.slug
                        ? 'bg-purple-600 text-white font-bold'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Marcas */}
            <div className="space-y-2 border-t border-slate-100 pt-4">
              <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                Marcas
              </h4>
              <div className="space-y-1 text-xs font-medium">
                {availableBrands.map((b) => (
                  <Link
                    key={b}
                    href={`/search?brand=${encodeURIComponent(b)}${categorySlug ? `&category=${categorySlug}` : ''}`}
                    className={`block px-3 py-1.5 rounded-xl transition-colors ${
                      brand === b ? 'bg-purple-600 text-white font-bold' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {b}
                  </Link>
                ))}
              </div>
            </div>

            {/* Promoções Check */}
            <div className="border-t border-slate-100 pt-4">
              <Link
                href={promoOnly ? '/search' : '/search?promo=true'}
                className={`flex items-center justify-between p-3 rounded-2xl border text-xs font-bold transition-all ${
                  promoOnly
                    ? 'border-purple-600 bg-purple-50 text-purple-700'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  Apenas Promoções
                </span>
                <span className="h-4 w-4 rounded-full border border-purple-600 flex items-center justify-center">
                  {promoOnly && <span className="h-2 w-2 rounded-full bg-purple-600" />}
                </span>
              </Link>
            </div>
          </aside>

          {/* Right Product Grid */}
          <main className="lg:col-span-9">
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                  <Search className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Nenhum produto encontrado</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Tente buscar por outros termos ou remova os filtros aplicados.
                  </p>
                </div>
                <Link
                  href="/search"
                  className="rounded-xl bg-purple-600 px-6 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition-colors"
                >
                  Limpar Filtros
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
