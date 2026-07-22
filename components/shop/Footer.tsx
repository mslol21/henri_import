'use client';

import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/contexts/ConfigContext';
import { MapPin, Phone, Clock, ExternalLink, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const { config } = useConfig();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    config.address
  )}`;

  return (
    <footer className="relative bg-white/85 backdrop-blur-xs border-t border-sky-100 text-slate-700 overflow-hidden">
      {/* Light Sky Blue Vapor Smoke Orbs */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-sky-100/50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4">
            <div className="h-12 w-auto max-w-[160px] flex items-center">
              <img src="/logo.png" alt={config.name} className="h-full w-auto object-contain max-h-12" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sua tabacaria e vape shop de confiança. Produtos 100% autênticos com o melhor preço e entrega expressa na região.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-full border border-sky-200 inline-flex">
              <ShieldCheck className="h-4 w-4 text-sky-600" />
              <span>Garantia de Qualidade & Procedência</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Navegação</h3>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li>
                <Link href="/search?category=pods-descartaveis" className="hover:text-sky-600 transition-colors">
                  Pods Descartáveis
                </Link>
              </li>
              <li>
                <Link href="/search?category=vapes-juices" className="hover:text-sky-600 transition-colors">
                  Vapes & Juices
                </Link>
              </li>
              <li>
                <Link href="/search?category=essencias" className="hover:text-sky-600 transition-colors">
                  Essências de Narguilé
                </Link>
              </li>
              <li>
                <Link href="/search?category=narguiles" className="hover:text-sky-600 transition-colors">
                  Narguilés Completo
                </Link>
              </li>
              <li>
                <Link href="/search?category=carvoes" className="hover:text-sky-600 transition-colors">
                  Carvões de Coco
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-sky-600 hover:underline">
                  Painel Administrativo
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Geolocation & Address */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Localização & Contato</h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <span>{config.address}</span>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 transition-colors"
              >
                <span>Ver no Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="h-4 w-4 text-emerald-600 shrink-0" />
                <a
                  href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-slate-900 hover:text-emerald-600 transition-colors"
                >
                  {config.whatsapp}
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Business Hours */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Horário de Funcionamento</h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <Clock className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">{config.businessHours}</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Pedidos online via WhatsApp entregues via Delivery Express.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {config.name}. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1 text-[11px] font-medium">
            <span>Desenvolvido com</span>
            <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
            <span>Sistema White Label SaaS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
