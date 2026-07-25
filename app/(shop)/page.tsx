import React from 'react';
import { Hero } from '@/components/shop/Hero';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { FeaturedCarousel } from '@/components/shop/FeaturedCarousel';
import { ProductCard } from '@/components/shop/ProductCard';
import { getCategories } from '@/actions/categories';
import { getProducts } from '@/actions/products';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { isWholesaleUser } from '@/lib/auth';

export default async function LandingPage() {
  const categories = await getCategories();
  const allProducts = await getProducts();
  const isWholesale = await isWholesaleUser();

  // Filter sections
  const featuredProducts = allProducts.length > 0 ? allProducts : [];
  const bestSellers = allProducts.filter((p) => p.hasFlavors || p.basePromoPrice).slice(0, 8);

  return (
    <div className="space-y-0 min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Categories Grid */}
      <CategoryGrid categories={categories} />

      {/* 3. Continuous Automatic Featured Products Carousel (Produtos em Destaque) */}
      <section id="produtos-destaque" className="py-12 sm:py-16 bg-white/80 backdrop-blur-xs border-b border-sky-100 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600">
                <Sparkles className="h-4 w-4" />
                <span>SELEÇÃO EXCLUSIVA • CARROSSEL AUTOMÁTICO</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl mt-0.5">
                Produtos em Destaque
              </h2>
            </div>
            <Link
              href="/search"
              className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1"
            >
              Ver todo o catálogo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Automatic Infinite Carousel */}
          <FeaturedCarousel products={featuredProducts} isWholesale={isWholesale} />
        </div>
      </section>

      {/* 4. Best Sellers (Produtos Mais Vendidos) */}
      <section className="py-12 sm:py-16 bg-sky-50/60 backdrop-blur-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sky-600">
                <Flame className="h-4 w-4 text-sky-600" />
                <span>OS QUERIDINHOS DA GALERA</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl mt-0.5">
                Produtos Mais Vendidos
              </h2>
            </div>
            <Link
              href="/search?sort=popular"
              className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1"
            >
              Ver mais populares <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {(bestSellers.length > 0 ? bestSellers : allProducts.slice(0, 4)).map((product) => (
              <ProductCard key={product.id} product={product} isWholesale={isWholesale} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
