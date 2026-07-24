'use client';

import React from 'react';
import Link from 'next/link';
import { ProductData } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductCard({ product, isWholesale }: { product: ProductData; isWholesale?: boolean }) {
  const hasPromo = product.basePromoPrice && product.basePromoPrice < product.basePrice;
  const baseOrPromo = product.basePromoPrice ?? product.basePrice;
  
  let currentPrice = baseOrPromo;
  let isWholesalePriceApplied = false;

  if (isWholesale && product.wholesalePrice && product.wholesalePrice < baseOrPromo) {
    currentPrice = product.wholesalePrice;
    isWholesalePriceApplied = true;
  }

  const discountPercent = hasPromo && !isWholesalePriceApplied
    ? Math.round(((product.basePrice - product.basePromoPrice!) / product.basePrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-sky-200 transition-all overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <img
          src={product.mainImageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Promo Discount Tag */}
        {hasPromo && !isWholesalePriceApplied && (
          <div className="absolute top-3 left-3 rounded-full bg-sky-600 px-2.5 py-1 text-[11px] font-black text-white shadow-xs">
            -{discountPercent}% OFF
          </div>
        )}

        {/* Wholesale Tag */}
        {isWholesalePriceApplied && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <div className="rounded-full bg-purple-600 px-2.5 py-1 text-[11px] font-black text-white shadow-xs w-max">
              ATACADO
            </div>
            {product.minWholesaleQty && product.minWholesaleQty > 1 && (
              <div className="rounded-full bg-purple-100 px-2 py-0.5 text-[9px] font-bold text-purple-800 shadow-xs w-max border border-purple-200">
                Mín: {product.minWholesaleQty} un.
              </div>
            )}
          </div>
        )}

        {/* Flavors Count Badge */}
        {product.hasFlavors && product.flavors && product.flavors.length > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 text-[10px] font-bold text-sky-300 border border-slate-700/50">
            <Sparkles className="h-3 w-3 text-sky-400" />
            <span>{product.flavors.length} Sabores</span>
          </div>
        )}
      </div>

      {/* Product Information */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
          <span className="uppercase tracking-wider text-sky-600">{product.brand}</span>
          <span>{product.category?.name || 'Vape Shop'}</span>
        </div>

        <h3 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-sky-600 transition-colors mb-2 min-h-[2.5rem]">
          <Link href={`/product/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>

        {/* Price Section */}
        <div className="mt-auto pt-2 flex items-baseline gap-2">
          <span className="text-lg font-black text-slate-900">
            {formatCurrency(currentPrice)}
          </span>
          {hasPromo && !isWholesalePriceApplied && (
            <span className="text-xs text-slate-400 line-through">
              {formatCurrency(product.basePrice)}
            </span>
          )}
          {isWholesalePriceApplied && (
            <span className="text-xs text-slate-400 line-through">
              {formatCurrency(baseOrPromo)}
            </span>
          )}
        </div>

        {/* Button Action */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
          <span>{product.hasFlavors ? 'Escolher Sabor' : 'Ver Detalhes'}</span>
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
