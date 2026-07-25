'use client';

import React from 'react';
import { useConfig } from '@/contexts/ConfigContext';
import { motion } from 'framer-motion';

export function Hero() {
  const { config } = useConfig();

  return (
    <section className="py-6 sm:py-8 bg-slate-950 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl border border-amber-500/30 bg-slate-900 shadow-2xl overflow-hidden min-h-[220px] sm:min-h-[280px] flex items-center"
        >
          {/* Background image of store with dark overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30 scale-105"
            style={{
              backgroundImage: `url(${config.bannerUrl || '/images/hero-banner.png'})`,
            }}
          />

          {/* Dark gradient mask for optimal legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/70" />

          {/* Inner Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 p-6 sm:p-10 w-full text-center sm:text-left">
            {/* Left: Round Logo Avatar with Gold Border */}
            <div className="shrink-0 relative">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-4 border-amber-400 bg-slate-900 shadow-2xl overflow-hidden flex items-center justify-center p-2 group hover:scale-105 transition-transform duration-300">
                <img
                  src={config.logoUrl || '/mascote.png'}
                  alt={config.name || 'Henri Imports'}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-amber-400 tracking-tight font-serif sm:font-sans">
                {config.name ? `${config.name} Tabaca` : 'Henri Imports Tabaca'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl leading-relaxed">
                As melhores marcas de vapes, narguilés, sedas e acessórios importados.
              </p>

              <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-1">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-black text-amber-400 tracking-wider uppercase font-mono">
                  ZAPPEOU, CHEGOU!
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
