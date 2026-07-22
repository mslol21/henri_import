'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Phone, ShieldCheck, Truck, Zap } from 'lucide-react';
import { useConfig } from '@/contexts/ConfigContext';
import { motion } from 'framer-motion';

export function Hero() {
  const { config } = useConfig();

  return (
    <div className="relative overflow-hidden bg-white py-12 lg:py-20 text-slate-900 border-b border-slate-200">
      {/* Light White Background with Blue Vape Smoke Glowing Orbs */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-100/70 via-sky-50/40 to-white pointer-events-none" />
      <div className="absolute -top-24 -right-24 h-[500px] w-[500px] rounded-full bg-sky-300/30 blur-3xl" />
      <div className="absolute bottom-0 left-10 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

      {/* Decorative Smoke Waves */}
      <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2.5 rounded-full border border-sky-300 bg-sky-50 px-4 py-1.5 text-xs font-bold text-sky-800 shadow-xs">
              <img
                src="/mascote.png"
                alt="Mascote Henri Imports"
                className="h-6 w-6 object-contain rounded-full bg-sky-100 p-0.5"
              />
              <span>LOJA OFICIAL HENRI IMPORTS • TECNOLOGIA & SOFISTICAÇÃO</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-none">
              Experiência Premium em <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Vapes & Tabacaria
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed mx-auto lg:mx-0 font-medium">
              Descubra os melhores Pods Descartáveis, Vapes, Essências, Narguilés e Acessórios. 
              Seleção exclusiva de sabores com entrega rápida expressa via WhatsApp e Delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="#produtos-destaque"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl bg-sky-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-sky-600/25 hover:bg-sky-500 hover:scale-102 active:scale-98 transition-all"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Comprar Agora</span>
              </Link>

              <a
                href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Henri%20Imports%20e%20gostaria%20de%20fazer%20um%20pedido.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-50 px-7 py-3.5 text-base font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-xs"
              >
                <Phone className="h-5 w-5" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200 text-left">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Delivery Express</h4>
                  <p className="text-[11px] text-slate-500">Entrega rápida na região</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">100% Originais</h4>
                  <p className="text-[11px] text-slate-500">Garantia de procedência</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Troca de Sabores</h4>
                  <p className="text-[11px] text-slate-500">Animação em tempo real</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Image Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Mascot Floating Badge */}
            <div className="absolute -top-6 -left-6 z-20 flex items-center gap-2 rounded-2xl bg-white border border-sky-200 p-2.5 shadow-xl">
              <img
                src="/mascote.png"
                alt="Mascote Henri Imports"
                className="h-10 w-10 object-contain drop-shadow-md animate-bounce"
              />
              <div className="text-left pr-2">
                <span className="text-[10px] font-black uppercase text-sky-600 block">HENRI MASCOTE</span>
                <span className="text-xs font-bold text-slate-900">100% Autêntico</span>
              </div>
            </div>

            <div className="relative mx-auto max-w-md lg:max-w-none overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl group">
              <img
                src={config.bannerUrl || '/images/hero-banner.png'}
                alt="Banner Henri Imports"
                className="h-80 w-full object-cover sm:h-96 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 border border-slate-200 backdrop-blur-md shadow-lg">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-600">
                  DESTAQUE DA SEMANA
                </span>
                <h3 className="text-lg font-bold text-slate-900">Ignite V250 • 25.000 Puffs</h3>
                <p className="text-xs text-slate-600 mt-1">
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
