import React from 'react';
import { Hero } from '@/components/shop/Hero';
import { HomepagePromotionsSection } from '@/components/shop/HomepagePromotionsSection';
import { CategoryGrid } from '@/components/shop/CategoryGrid';
import { FeaturedCarousel } from '@/components/shop/FeaturedCarousel';
import { CategoryProductsSection } from '@/components/shop/CategoryProductsSection';
import { getCategories } from '@/actions/categories';
import { getProducts } from '@/actions/products';
import { getActivePromotions, getPromoProducts } from '@/actions/promotions';
import { Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function LandingPage() {
  const categories = await getCategories();
  const allProducts = await getProducts();
  const promoData = await getActivePromotions();
  const promoProducts = await getPromoProducts();

  const featuredProducts = allProducts.length > 0 ? allProducts : [];

  return (
    <div className="space-y-0 min-h-screen bg-slate-50">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. PROMOÇÕES & OFERTAS LOGO APÓS O HERO */}
      <HomepagePromotionsSection
        coupons={promoData.coupons}
        promoProducts={promoProducts}
        isWholesale={false}
      />

      {/* 3. Categorias em Destaque em 1 Linha (Carrossel Horizontal) */}
      <CategoryGrid categories={categories} />

      {/* 4. Continuous Automatic Featured Products Carousel */}
      <section id="produtos-destaque" className="py-10 sm:py-14 bg-white border-b border-slate-200/60 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600">
                <Sparkles className="h-4 w-4" />
                <span>SELEÇÃO EXCLUSIVA • DESTAQUES DA LOJA</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl mt-0.5">
                Produtos em Destaque
              </h2>
            </div>
            <Link
              href="/search"
              className="text-xs font-black tracking-wider uppercase text-amber-600 hover:text-amber-700 transition-colors flex items-center gap-1"
            >
              <span>Ver todo o catálogo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <FeaturedCarousel products={featuredProducts} isWholesale={false} />
        </div>
      </section>

      {/* 5. Products Grouped By Category (Tabacaria Layout) */}
      <div className="bg-slate-50 py-4">
        {categories.map((cat) => {
          const categoryProducts = allProducts.filter((p) => p.categoryId === cat.id || p.category?.slug === cat.slug);
          if (categoryProducts.length === 0) return null;
          return (
            <CategoryProductsSection
              key={cat.id}
              category={cat}
              products={categoryProducts}
              isWholesale={false}
            />
          );
        })}
      </div>
    </div>
  );
}
