'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ProductData } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { Flame, Tag, ArrowRight, Copy, Check, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface HomepagePromotionsSectionProps {
  coupons?: Array<{ id: string; code: string; discountType: string; discountValue: number }>;
  promoProducts: ProductData[];
  isWholesale?: boolean;
}

export function HomepagePromotionsSection({
  coupons = [],
  promoProducts = [],
  isWholesale = false,
}: HomepagePromotionsSectionProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  // Automatic Continuous Horizontal Carousel Scroll
  useEffect(() => {
    if (isPaused || !scrollRef.current || promoProducts.length === 0) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 15) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
        }
      }
    }, 3200);

    return () => clearInterval(interval);
  }, [isPaused, promoProducts.length]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }
  };

  if (promoProducts.length === 0 && coupons.length === 0) return null;

  return (
    <section className="py-4 sm:py-6 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Compact & Sleek Gradient Card Container */}
        <div className="rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-purple-700 p-4 sm:p-6 text-white shadow-xl relative overflow-hidden border border-red-500/30 space-y-4">
          {/* Subtle Background Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="flex items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-amber-300 backdrop-blur-md border border-white/20 shrink-0">
                <Flame className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                  OFERTAS ESPECIAIS • CARROSSEL AUTOMÁTICO
                </div>
                <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white leading-tight">
                  Promoções em Destaque
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/promotions"
                className="inline-flex items-center gap-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-3.5 py-2 shadow-md transition-all shrink-0 hover:scale-105"
              >
                <span>Ver Todas</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {/* Next / Prev Manual Controls */}
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={scrollLeft}
                  className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
                  aria-label="Anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={scrollRight}
                  className="h-7 w-7 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
                  aria-label="Próximo"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Coupons Strip */}
          {coupons.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5 relative z-10">
              <span className="text-[11px] font-bold text-rose-200 shrink-0 flex items-center gap-1">
                <Tag className="h-3 w-3" /> Cupons:
              </span>
              {coupons.map((c) => (
                <button
                  key={c.id}
                  onClick={() => copyCoupon(c.code)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[11px] font-mono font-bold text-white shrink-0 transition-all"
                >
                  <span>{c.code}</span>
                  <span className="text-amber-300 font-extrabold text-[10px]">
                    ({c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : formatCurrency(c.discountValue)})
                  </span>
                  {copiedCode === c.code ? (
                    <Check className="h-3 w-3 text-emerald-400" />
                  ) : (
                    <Copy className="h-3 w-3 text-rose-200" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Automatic Horizontal Carousel Track of Products */}
          {promoProducts.length > 0 && (
            <div
              ref={scrollRef}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex gap-4 overflow-x-auto scrollbar-none py-1 scroll-smooth cursor-grab active:cursor-grabbing select-none relative z-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {promoProducts.map((product) => (
                <div key={product.id} className="w-[200px] sm:w-[230px] shrink-0">
                  <ProductCard product={product} isWholesale={isWholesale} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
