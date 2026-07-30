'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductData, FlavorData } from '@/types';
import { formatCurrency, getCleanImageUrl } from '@/lib/utils';
import { Sparkles, ArrowRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductCard({ product, isWholesale }: { product: ProductData; isWholesale?: boolean }) {
  const [selectedFlavor, setSelectedFlavor] = useState<FlavorData | null>(null);

  const hasPromo = Boolean(product.basePromoPrice && product.basePromoPrice < product.basePrice);
  const baseOrPromo = product.basePromoPrice ?? product.basePrice;

  // Compute active price depending on selected flavor and wholesale mode
  const getActivePrice = () => {
    if (selectedFlavor) {
      if (isWholesale) {
        if (selectedFlavor.wholesalePrice && selectedFlavor.wholesalePrice > 0) return selectedFlavor.wholesalePrice;
        if (product.wholesalePrice && product.wholesalePrice > 0) return product.wholesalePrice;
      }
      if (selectedFlavor.price && selectedFlavor.price > 0) return selectedFlavor.price;
    }
    if (isWholesale && product.wholesalePrice && product.wholesalePrice > 0) {
      return product.wholesalePrice;
    }
    return baseOrPromo;
  };

  const currentPrice = getActivePrice();
  const isWholesalePriceApplied = Boolean(
    isWholesale &&
    ((selectedFlavor?.wholesalePrice && selectedFlavor.wholesalePrice > 0) ||
     (product.wholesalePrice && product.wholesalePrice > 0))
  );

  const discountPercent = hasPromo && !isWholesalePriceApplied
    ? Math.round(((product.basePrice - product.basePromoPrice!) / product.basePrice) * 100)
    : 0;

  const activeImage = selectedFlavor?.imageUrl
    ? getCleanImageUrl(selectedFlavor.imageUrl)
    : getCleanImageUrl(product.mainImageUrl);

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-sky-300 transition-all overflow-hidden text-slate-900"
    >
      {/* Image Container (Compact & Sleek) */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-slate-100">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={selectedFlavor ? selectedFlavor.name : product.name}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </AnimatePresence>

        {/* Promo Discount Tag */}
        {hasPromo && !isWholesalePriceApplied && (
          <div className="absolute top-2.5 left-2.5 rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
            -{discountPercent}% OFF
          </div>
        )}

        {/* Wholesale Tag */}
        {isWholesalePriceApplied && (
          <div className="absolute top-2.5 left-2.5">
            <div className="rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
              ATACADO
            </div>
          </div>
        )}

        {/* Selected Flavor Overlay Badge */}
        {selectedFlavor ? (
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between rounded-xl bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 text-white border border-slate-700/50">
            <span className="text-[10px] font-extrabold text-sky-300 truncate">
              {selectedFlavor.name}
            </span>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setSelectedFlavor(null);
              }}
              className="text-[9px] text-slate-400 hover:text-white underline ml-1"
            >
              Reset
            </button>
          </div>
        ) : (
          product.hasFlavors && product.flavors && product.flavors.length > 0 && (
            <div className="absolute top-2.5 right-2.5 flex items-center gap-1 rounded-full bg-slate-900/80 backdrop-blur-xs px-2 py-0.5 text-[9px] font-bold text-sky-300 border border-slate-700/50">
              <Sparkles className="h-3 w-3 text-sky-400" />
              <span>{product.flavors.length} Sabores</span>
            </div>
          )
        )}
      </div>

      {/* Product Information Body */}
      <div className="flex flex-1 flex-col p-3.5 sm:p-4 space-y-2">
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
          <span className="uppercase tracking-wider text-sky-600 truncate max-w-[120px]">
            {product.brand}
          </span>
          <span className="truncate max-w-[100px]">{product.category?.name || 'Vape Shop'}</span>
        </div>

        <h3 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-sky-600 transition-colors leading-snug">
          <Link href={`/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* SWIPEABLE/DRAGGABLE FLAVORS STRIP */}
        {product.hasFlavors && product.flavors && product.flavors.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
              <span>Deslize p/ ver sabores ({product.flavors.length}):</span>
            </div>
            <div
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              {product.flavors.map((flavor) => {
                const isSelected = selectedFlavor?.id === flavor.id;
                return (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setSelectedFlavor(isSelected ? null : flavor);
                    }}
                    className={`flex items-center gap-1.5 px-2 py-1 rounded-xl text-[10px] font-bold shrink-0 border transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-100 text-purple-900 shadow-2xs ring-1 ring-purple-600/30'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                    } ${flavor.stock <= 0 ? 'opacity-50 line-through' : ''}`}
                    title={`${flavor.name} (Estoque: ${flavor.stock})`}
                  >
                    {flavor.imageUrl && (
                      <img
                        src={getCleanImageUrl(flavor.imageUrl)}
                        alt={flavor.name}
                        className="w-4 h-4 rounded-full object-cover shrink-0 border border-slate-300"
                      />
                    )}
                    <span className="truncate max-w-[80px]">{flavor.name}</span>
                    {isSelected && <Check className="w-3 h-3 text-purple-700 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price & Action Button Row */}
        <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black text-slate-900 leading-none">
              {formatCurrency(currentPrice)}
            </span>
            {hasPromo && !isWholesalePriceApplied && (
              <span className="text-[10px] text-slate-400 line-through mt-0.5">
                {formatCurrency(product.basePrice)}
              </span>
            )}
            {isWholesalePriceApplied && (
              <span className="text-[10px] text-slate-400 line-through mt-0.5">
                {formatCurrency(baseOrPromo)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="flex items-center gap-1 text-xs font-bold text-sky-600 group-hover:text-sky-700 bg-sky-50 px-2.5 py-1.5 rounded-xl border border-sky-100 hover:bg-sky-600 hover:text-white transition-all shrink-0"
          >
            <span>{product.hasFlavors ? 'Escolher' : 'Ver'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
