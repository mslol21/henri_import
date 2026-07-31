'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ProductData, FlavorData } from '@/types';
import { formatCurrency, getCleanImageUrl } from '@/lib/utils';
import { Sparkles, ArrowRight, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductCard({ product, isWholesale }: { product: ProductData; isWholesale?: boolean }) {
  // Build slide items array: index 0 is main product, 1..N are active flavors
  const flavors = product.hasFlavors && product.flavors ? product.flavors : [];
  const slideItems = [
    { id: 'main', name: product.name, imageUrl: product.mainImageUrl, flavor: null as FlavorData | null },
    ...flavors.map(f => ({ id: f.id, name: f.name, imageUrl: f.imageUrl || product.mainImageUrl, flavor: f }))
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Active item & selected flavor derived from active index
  const activeSlide = slideItems[activeIndex] || slideItems[0];
  const selectedFlavor = activeSlide.flavor;

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

  const activeImage = getCleanImageUrl(activeSlide.imageUrl);

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % slideItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + slideItems.length) % slideItems.length);
  };

  const productHref = isWholesale ? `/product/${product.slug}?atacado=true` : `/product/${product.slug}`;

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:border-sky-300 transition-all overflow-hidden text-slate-900"
    >
      {/* Image Container with Swipeable Photo Navigation */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-slate-100 group/image">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={activeSlide.name}
            initial={{ opacity: 0.8, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.8, scale: 1.02 }}
            transition={{ duration: 0.25 }}
            className="h-full w-full object-cover object-center group-hover/image:scale-105 transition-transform duration-500"
          />
        </AnimatePresence>

        {/* Promo Discount Tag */}
        {hasPromo && !isWholesalePriceApplied && (
          <div className="absolute top-2.5 left-2.5 rounded-full bg-sky-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs z-10">
            -{discountPercent}% OFF
          </div>
        )}

        {/* Wholesale Tag */}
        {isWholesalePriceApplied && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <div className="rounded-full bg-purple-600 px-2 py-0.5 text-[10px] font-black text-white shadow-xs">
              ATACADO
            </div>
          </div>
        )}

        {/* Next & Previous Arrow Buttons (Visible on hover or mobile swipe) */}
        {slideItems.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Foto anterior"
              className="absolute left-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-xs flex items-center justify-center opacity-80 sm:opacity-0 group-hover/image:opacity-100 transition-all shadow-md z-20"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Próxima foto"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-7 w-7 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white backdrop-blur-xs flex items-center justify-center opacity-80 sm:opacity-0 group-hover/image:opacity-100 transition-all shadow-md z-20"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}

        {/* Active Flavor Badge & Dots Indicator */}
        {slideItems.length > 1 && (
          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-1 z-10">
            <div className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-xs px-2.5 py-1 rounded-xl text-white border border-slate-700/50 max-w-[80%]">
              <Sparkles className="h-3 w-3 text-sky-400 shrink-0" />
              <span className="text-[10px] font-extrabold text-sky-300 truncate">
                {selectedFlavor ? selectedFlavor.name : 'Foto Principal'}
              </span>
            </div>

            {/* Slide Dots Indicator */}
            <div className="flex items-center gap-1 bg-slate-900/70 backdrop-blur-xs px-2 py-1 rounded-full border border-slate-700/50">
              {slideItems.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === i ? 'w-3 bg-sky-400' : 'w-1.5 bg-slate-400 hover:bg-slate-200'
                  }`}
                  title={`Foto ${i + 1}`}
                />
              ))}
            </div>
          </div>
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
          <Link href={productHref}>
            {product.name}
          </Link>
        </h3>

        {/* HORIZONTAL SWIPEABLE FLAVORS CHIPS STRIP */}
        {flavors.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
              <span>Deslize p/ ver {flavors.length} sabores:</span>
            </div>
            <div
              className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 cursor-grab active:cursor-grabbing select-none"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              onClick={(e) => e.stopPropagation()}
            >
              {flavors.map((flavor, fIdx) => {
                const isSelected = activeIndex === fIdx + 1;
                return (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveIndex(isSelected ? 0 : fIdx + 1);
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
            href={productHref}
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
