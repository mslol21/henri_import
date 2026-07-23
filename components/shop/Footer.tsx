'use client';

import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/contexts/ConfigContext';
import { Phone, Clock, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const { config } = useConfig();
  const cleanWhatsapp = config.whatsapp.replace(/\D/g, '');

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
              Sua tabacaria e vape shop de confiança. Produtos 100% autênticos com o melhor preço e atendimento direto via WhatsApp.
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

          {/* Col 3: WhatsApp Contact (No physical address/maps) */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Atendimento WhatsApp</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Tire dúvidas, consulte disponibilidade de estoque ou faça seu pedido diretamente com a nossa equipe.
            </p>

            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Ol%C3%A1%21%20Vim%20pelo%20site%20da%20Henri%20Imports%20e%20gostaria%20de%20tirar%20uma%20d%C3%BAvida.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-2xl bg-emerald-600 px-4 py-3 text-xs font-extrabold text-white shadow-md hover:bg-emerald-500 transition-all hover:scale-105"
            >
              <Phone className="h-4 w-4 fill-current" />
              <span>Chamar no WhatsApp ({config.whatsapp})</span>
            </a>
          </div>

          {/* Col 4: Business Hours */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">Horário de Funcionamento</h3>
            <div className="flex items-start gap-2.5 text-xs text-slate-600">
              <Clock className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">{config.businessHours}</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Atendimento e pedidos online 100% via WhatsApp.
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
