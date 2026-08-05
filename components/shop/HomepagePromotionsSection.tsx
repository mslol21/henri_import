'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductData } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { Flame, Tag, ArrowRight, Copy, Check, Sparkles, Percent } from 'lucide-react';
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

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  if (promoProducts.length === 0 && coupons.length === 0) return null;

  return (
    <section className="py-8 sm:py-10 bg-gradient-to-r from-red-600 via-rose-600 to-purple-700 text-white shadow-md relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3 py-0.5 text-xs font-black text-amber-300 border border-white/20">
              <Flame className="h-4 w-4 text-amber-300 animate-pulse" />
              <span>OFERTAS ESPECIAIS DA SEMANA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Promoções em Destaque
            </h2>
          </div>

          <Link
            href="/promotions"
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-5 py-2.5 shadow-lg transition-all shrink-0 hover:scale-105"
          >
            <span>Ver Todas as Promoções</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Coupons Strip if any active */}
        {coupons.length > 0 && (
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-bold text-rose-200 shrink-0 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" /> Cupons Ativos:
            </span>
            {coupons.map((c) => (
              <button
                key={c.id}
                onClick={() => copyCoupon(c.code)}
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1.5 text-xs font-mono font-bold text-white shrink-0 transition-all"
              >
                <span>{c.code}</span>
                <span className="text-amber-300 font-extrabold text-[10px]">
                  ({c.discountType === 'PERCENTAGE' ? `${c.discountValue}% OFF` : formatCurrency(c.discountValue)})
                </span>
                {copiedCode === c.code ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3 text-rose-200" />
                )}
              </button>
            ))}
          </div>
        )}

        {/* Horizontal Scroll Track of On-Sale Products */}
        {promoProducts.length > 0 && (
          <div
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none py-2 scroll-smooth cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {promoProducts.map((product) => (
              <div key={product.id} className="w-[220px] sm:w-[250px] md:w-[270px] shrink-0">
                <ProductCard product={product} isWholesale={isWholesale} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
