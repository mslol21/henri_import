'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryData } from '@/types';
import { Zap, Wind, Flame, Sparkles, Box, FileText, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCleanImageUrl } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  Zap,
  Wind,
  Flame,
  Sparkles,
  Box,
  FileText,
  ShieldAlert,
};

export function CategoryGrid({ categories }: { categories: CategoryData[] }) {
  return (
    <section className="py-8 sm:py-10 bg-sky-50/50 backdrop-blur-xs border-b border-sky-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">
              EXPLORE NOSSO CATÁLOGO
            </span>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Categorias em Destaque
            </h2>
          </div>
          <Link
            href="/search"
            className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1 shrink-0"
          >
            <span>Ver todas</span> →
          </Link>
        </div>

        {/* Single Row Horizontal Scrollable Carousel */}
        <div
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none py-2 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || Zap;
            const cleanImage = getCleanImageUrl(cat.imageUrl, '');
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className="shrink-0 w-32 sm:w-36"
              >
                <Link
                  href={`/search?category=${cat.slug}`}
                  className="group flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-sky-300 transition-all text-center h-full"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-white mb-2 shadow-2xs group-hover:scale-105 transition-transform overflow-hidden relative shrink-0"
                    style={{ backgroundColor: cat.color || '#0284c7' }}
                  >
                    {cleanImage ? (
                      <img src={cleanImage} alt={cat.name} className="h-full w-full object-cover" />
                    ) : (
                      <IconComponent className="h-6 w-6" />
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
