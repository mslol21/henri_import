'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProductData } from '@/types';
import { ProductCard } from '@/components/shop/ProductCard';
import { ChevronLeft, ChevronRight, Sparkles, Pause, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeaturedCarouselProps {
  products: ProductData[];
  isWholesale?: boolean;
}

export function FeaturedCarousel({ products, isWholesale }: FeaturedCarouselProps) {
  const [isPaused, setIsPaused] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || isPaused) return;

    let animationFrameId: number;
    const speed = 0.8; // Smooth speed pixel per frame

    const step = () => {
      if (container) {
        // If reached end, loop seamlessly back to start
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  // Duplicate items array to make seamless infinite loop
  const displayProducts = [...products, ...products, ...products];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="relative group/carousel">
      {/* Controls Header & Auto-scroll indicator */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-sky-700 bg-sky-50 border border-sky-200 hover:bg-sky-100 transition-colors"
          >
            {isPaused ? (
              <>
                <Play className="h-3 w-3 fill-sky-600 text-sky-600" />
                <span>Retomar Carrossel</span>
              </>
            ) : (
              <>
                <Pause className="h-3 w-3 fill-sky-600 text-sky-600" />
                <span>Carrossel Automático Ativo</span>
              </>
            )}
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={scrollLeft}
            aria-label="Anterior"
            className="h-9 w-9 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Próximo"
            className="h-9 w-9 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all flex items-center justify-center"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Track & Cards */}
      <div
        ref={scrollContainerRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
        className="flex gap-5 overflow-x-auto scrollbar-none py-2 scroll-smooth cursor-grab active:cursor-grabbing select-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {displayProducts.map((product, idx) => (
          <div
            key={`${product.id}-${idx}`}
            className="w-[220px] sm:w-[250px] md:w-[270px] shrink-0 transform transition-transform hover:scale-[1.02]"
          >
            <ProductCard product={product} isWholesale={isWholesale} />
          </div>
        ))}
      </div>

      {/* Gradient Fades on edges for smooth visual finish */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent opacity-80" />
    </div>
  );
}
