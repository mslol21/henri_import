'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryData } from '@/types';
import { Zap, Wind, Flame, Sparkles, Box, FileText, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <section className="py-12 bg-sky-50/50 backdrop-blur-xs border-b border-sky-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
              EXPLORE NOSSO CATÁLOGO
            </span>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
              Categorias em Destaque
            </h2>
          </div>
          <Link
            href="/search"
            className="text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors flex items-center gap-1"
          >
            Ver todos os produtos →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat, idx) => {
            const IconComponent = iconMap[cat.icon] || Zap;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <Link
                  href={`/search?category=${cat.slug}`}
                  className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/90 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-sky-300 transition-all text-center h-full"
                >
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl text-white mb-3 shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: cat.color || '#0284c7' }}
                  >
                    <IconComponent className="h-7 w-7" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 group-hover:text-sky-600 transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {cat.productCount ?? 10}+ itens
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
