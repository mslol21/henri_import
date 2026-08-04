'use client';

import React, { useState } from 'react';
import { ProductData } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { formatCurrency } from '@/lib/utils';
import { Flame, Tag, Truck, Copy, Check, Sparkles, Percent, Gift, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PromotionsViewProps {
  rules: Array<{
    id: string;
    title: string;
    description: string | null;
    discountType: string;
    discountValue: number;
    freeShipping: boolean;
    badgeText: string | null;
  }>;
  coupons: Array<{
    id: string;
    code: string;
    discountType: string;
    discountValue: number;
    minOrderValue: number | null;
    freeShipping: boolean;
  }>;
  banners: Array<{
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    link: string | null;
  }>;
  promoProducts: ProductData[];
}

export function PromotionsView({
  rules,
  coupons,
  banners,
  promoProducts,
}: PromotionsViewProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const filteredProducts = promoProducts.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category?.name.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero Banner */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-purple-700 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-black tracking-wider uppercase text-amber-300 border border-white/20">
              <Flame className="h-4 w-4 text-amber-300 animate-pulse" />
              <span>CENTRAL DE PROMOÇÕES & FRETE GRÁTIS</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Ofertas Especiais & Cupons Exclusivos
            </h1>
            
            <p className="text-xs sm:text-sm text-rose-100 leading-relaxed font-medium">
              Aproveite descontos imperdíveis, cupons de desconto validados e regras de frete grátis na cidade ativadas no nosso painel.
            </p>
          </div>
        </div>

        {/* SECTION 1: CUPONS ATIVOS PARA COPIAR */}
        {coupons.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-purple-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Cupons de Desconto Validados
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div
                  key={c.id}
                  className="bg-white rounded-2xl border border-purple-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 relative overflow-hidden group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-600 tracking-wider">
                        CUPOM DE DESCONTO
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        VALIDADO
                      </span>
                    </div>

                    <div className="text-xl font-black text-slate-900 flex items-baseline gap-1">
                      {c.discountType === 'PERCENTAGE' && <span>{c.discountValue}% OFF</span>}
                      {c.discountType === 'FIXED_AMOUNT' && <span>{formatCurrency(c.discountValue)} OFF</span>}
                      {c.discountType === 'FREE_SHIPPING' && <span>FRETE GRÁTIS</span>}
                    </div>

                    <p className="text-xs text-slate-500 font-semibold">
                      {c.minOrderValue && c.minOrderValue > 0
                        ? `Em compras a partir de ${formatCurrency(c.minOrderValue)}`
                        : 'Válido para qualquer valor de compra!'}
                    </p>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => copyCoupon(c.code)}
                    className="w-full inline-flex items-center justify-between bg-purple-50 hover:bg-purple-600 hover:text-white text-purple-900 border border-purple-200 px-4 py-2.5 rounded-xl font-mono font-black text-xs transition-all"
                  >
                    <span>CÓDIGO: {c.code}</span>
                    {copiedCode === c.code ? (
                      <span className="flex items-center gap-1 text-emerald-600 group-hover:text-white">
                        <Check className="h-4 w-4" /> Copiado!
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Copy className="h-3.5 w-3.5" /> Copiar
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 2: PROMOÇÕES ATIVAS & FRETE GRÁTIS */}
        {rules.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Promoções de Frete Grátis & Ofertas da Cidade
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rules.map((r) => (
                <div
                  key={r.id}
                  className="bg-emerald-950 text-white rounded-2xl p-6 shadow-lg border border-emerald-800 flex items-start gap-4"
                >
                  <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Truck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 flex-1">
                    {r.badgeText && (
                      <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-500 text-emerald-950 text-[10px] font-black uppercase tracking-wider mb-1">
                        {r.badgeText}
                      </span>
                    )}
                    <h3 className="text-base font-black text-white">{r.title}</h3>
                    {r.description && (
                      <p className="text-xs text-emerald-200/80">{r.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION 3: PRODUTOS EM PROMOÇÃO DA LOJA */}
        <section className="space-y-6 pt-4 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Produtos em Oferta Promocional ({promoProducts.length})
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar produto em oferta..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-none focus:border-purple-600 shadow-2xs"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3 max-w-md mx-auto">
              <Gift className="h-10 w-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">Nenhum produto em oferta no momento</h3>
              <p className="text-xs text-slate-500">
                Fique atento! Novas ofertas são cadastradas constantemente pela nossa equipe.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} isWholesale={false} />
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
