'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ProductData, CategoryData } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface CategoryProductsSectionProps {
  category: CategoryData;
  products: ProductData[];
  isWholesale?: boolean;
}

export function CategoryProductsSection({
  category,
  products,
  isWholesale,
}: CategoryProductsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <section className="py-8 sm:py-12 border-b border-slate-200/60 last:border-b-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Category Section Header (Tabacaria Style) */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="h-1 w-6 bg-amber-500 rounded-full shrink-0" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>{category.name}</span>
              <span className="text-xs font-bold text-slate-400 font-mono">
                ({products.length})
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href={isWholesale ? `/atacado?category=${category.slug}` : `/search?category=${category.slug}`}
              className="text-xs font-black tracking-wider uppercase text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
            >
              <span>VER TODOS</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {/* Scroll Arrow Buttons */}
            <div className="hidden sm:flex items-center gap-1.5">
              <button
                onClick={scrollLeft}
                aria-label={`Anterior ${category.name}`}
                className="h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={scrollRight}
                aria-label={`Próximo ${category.name}`}
                className="h-8 w-8 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Cards Track */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-2 scroll-smooth cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-[220px] sm:w-[250px] md:w-[270px] shrink-0"
            >
              <ProductCard product={product} isWholesale={isWholesale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
