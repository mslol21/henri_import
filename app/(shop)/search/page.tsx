import React from 'react';
import { getProducts } from '@/actions/products';
import { getCategories } from '@/actions/categories';
import { ProductCard } from '@/components/shop/ProductCard';
import { Search, Filter, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    promo?: string;
    sort?: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const selectedCategorySlug = params.category || '';
  const isPromoOnly = params.promo === 'true';

  const allProducts = await getProducts();
  const categories = await getCategories();

  // Filter products based on search parameters
  let filtered = allProducts.filter((p) => {
    if (query) {
      const q = query.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchCategory = p.category?.name.toLowerCase().includes(q);
      const matchFlavor = p.flavors?.some((f) => f.name.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchCategory && !matchFlavor) return false;
    }

    if (selectedCategorySlug) {
      if (p.category?.slug !== selectedCategorySlug) return false;
    }

    if (isPromoOnly) {
      if (!p.basePromoPrice || p.basePromoPrice >= p.basePrice) return false;
    }

    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              CATÁLOGO COMPLETO
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
              {query ? `Busca por: "${query}"` : 'Explorar Produtos'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Encontrados {filtered.length} produtos disponíveis em estoque.
            </p>
          </div>
        </div>

        {/* Filter Badges & Categories */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
          <Link
            href="/search"
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-colors ${
              !selectedCategorySlug && !isPromoOnly
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Todos os Produtos
          </Link>

          <Link
            href="/search?promo=true"
            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-colors flex items-center gap-1.5 ${
              isPromoOnly
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            <span>Em Promoção</span>
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/search?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-colors ${
                selectedCategorySlug === cat.slug
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4 max-w-md mx-auto my-12">
            <Search className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800">Nenhum produto encontrado</h3>
            <p className="text-xs text-slate-500">
              Tente buscar por outros termos como "Ignite", "Zomo", "Pod" ou limpe os filtros.
            </p>
            <Link
              href="/search"
              className="inline-flex rounded-xl bg-sky-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-sky-500 transition-colors"
            >
              Ver todos os produtos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
