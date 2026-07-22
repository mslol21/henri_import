'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Phone, Sparkles, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';
import { motion } from 'framer-motion';

export function Hero() {
  const { config } = useConfig();

  return (
    <div className="relative overflow-hidden bg-slate-900 py-12 lg:py-20 text-white">
      {/* Dynamic Background Gradient & Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/60 via-slate-900 to-black pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-72 w-72 rounded-full bg-indigo-600/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* Left Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag with Mascot Avatar */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold text-purple-300 backdrop-blur-xs">
              <img
                src="/mascote.png"
                alt="Mascote Henri Imports"
                className="h-6 w-6 object-contain rounded-full bg-purple-900/50 p-0.5"
              />
              <span>LOJA OFICIAL HENRI IMPORTS • TECNOLOGIA & SOFISTICAÇÃO</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl leading-none">
              Experiência Premium em <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
                Vapes & Tabacaria
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed mx-auto lg:mx-0">
              Descubra os melhores Pods Descartáveis, Vapes, Essências, Narguilés e Acessórios. 
              Seleção exclusiva de sabores com entrega rápida expressa via WhatsApp e Delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#produtos-destaque"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-purple-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-purple-600/30 hover:bg-purple-500 hover:scale-102 active:scale-98 transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Comprar Agora</span>
              </Link>

              <a
                href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Henri%20Imports%20e%20gostaria%20de%20fazer%20um%20pedido.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-7 py-3.5 text-base font-bold text-emerald-400 backdrop-blur-xs hover:bg-emerald-500 hover:text-white transition-all"
              >
                <Phone className="h-5 w-5" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Delivery Express</h4>
                  <p className="text-[11px] text-slate-400">Entrega rápida na região</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">100% Originais</h4>
                  <p className="text-[11px] text-slate-400">Garantia de procedência</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Troca de Sabores</h4>
                  <p className="text-[11px] text-slate-400">Animação em tempo real</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Card with Mascot floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Mascot Floating Badge */}
            <div className="absolute -top-6 -left-6 z-20 flex items-center gap-2 rounded-2xl bg-slate-900/90 border border-purple-500/40 p-2.5 shadow-2xl backdrop-blur-md">
              <img
                src="/mascote.png"
                alt="Mascote Henri Imports"
                className="h-10 w-10 object-contain drop-shadow-md animate-bounce"
              />
              <div className="text-left pr-2">
                <span className="text-[10px] font-black uppercase text-purple-400 block">HENRI MASCOTE</span>
                <span className="text-xs font-bold text-white">100% Autêntico</span>
              </div>
            </div>

            <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-800/50 shadow-2xl backdrop-blur-md group">
              <img
                src={config.bannerUrl || 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1200&q=80'}
                alt="Banner Henri Imports"
                className="h-80 w-full object-cover sm:h-96 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-md">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400">
                  DESTAQUE DA SEMANA
                </span>
                <h3 className="text-lg font-bold text-white">Ignite V250 • 25.000 Puffs</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Selecione os melhores sabores gelados com fotos animadas e troque na hora!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
