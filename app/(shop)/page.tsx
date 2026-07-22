import React from 'react';
import { Hero } from '@/components/shop/Hero';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { ProductCard } from '@/components/shop/ProductCard';
import { getCategories } from '@/actions/categories';
import { getProducts } from '@/actions/products';
import { Sparkles, Flame, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function LandingPage() {
  const categories = await getCategories();
  const allProducts = await getProducts();

  // Filter sections
  const featuredProducts = allProducts.slice(0, 4);
  const bestSellers = allProducts.filter((p) => p.hasFlavors || p.basePromoPrice).slice(0, 4);

  return (
    <div className="space-y-0 min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Categories Grid */}
      <CategoryGrid categories={categories} />

      {/* 3. Featured Products (Produtos em Destaque) */}
      <section id="produtos-destaque" className="py-12 sm:py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600">
                <Sparkles className="h-4 w-4" />
                <span>SELEÇÃO EXCLUSIVA</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl mt-0.5">
                Produtos em Destaque
              </h2>
            </div>
            <Link
              href="/search"
              className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
            >
              Ver todo o catálogo <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Best Sellers (Produtos Mais Vendidos) */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-purple-600">
                <Flame className="h-4 w-4 text-purple-600" />
                <span>OS QUERIDINHOS DA GALERA</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl mt-0.5">
                Produtos Mais Vendidos
              </h2>
            </div>
            <Link
              href="/search?sort=popular"
              className="text-xs font-bold text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1"
            >
              Ver mais populares <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Banner Promocional Intermediário */}
      <section className="py-10 sm:py-14 bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-3 py-1 text-xs font-bold text-purple-300 border border-purple-400/30">
              <Tag className="h-3.5 w-3.5" />
              <span>OFERTAS IMPERDÍVEIS</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Gosta de desconto? Economize até 20% no Combo Pods + Essências!
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Insira o cupom <strong className="text-purple-300">HENRI10</strong> no carrinho para ganhar 10% OFF em qualquer pedido.
            </p>
          </div>

          <Link
            href="/search?promo=true"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-6 py-3.5 text-sm font-black text-slate-900 shadow-xl hover:bg-slate-100 transition-all"
          >
            Aproveitar Promoções
          </Link>
        </div>
      </section>
    </div>
  );
}
