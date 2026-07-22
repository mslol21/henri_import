'use client';

import React from 'react';
import Link from 'next/link';
import { useConfig } from '@/contexts/ConfigContext';
import { Flame, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';

export function Footer() {
  const { config } = useConfig();

  return (
    <footer className="bg-slate-950 text-white pt-12 pb-8 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Branding & Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md">
                <Flame className="h-6 w-6 fill-purple-300" />
              </div>
              <span className="text-xl font-black tracking-tight text-white uppercase">
                {config.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sua tabacaria e vape shop de confiança. Entregas ultra-rápidas com produtos 100% autênticos e embalagens discretas.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {config.instagram && (
                <a
                  href={`https://instagram.com/${config.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Siga o Instagram Henri Imports"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-purple-600 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {config.facebook && (
                <a
                  href={`https://facebook.com/${config.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Siga a página no Facebook Henri Imports"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-300 hover:bg-purple-600 hover:text-white transition-colors"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.714 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Categorias */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <Link href="/search?category=pods-descartaveis" className="hover:text-white transition-colors">
                  Pods Descartáveis
                </Link>
              </li>
              <li>
                <Link href="/search?category=vapes-juices" className="hover:text-white transition-colors">
                  Vapes & Juices
                </Link>
              </li>
              <li>
                <Link href="/search?category=essencias" className="hover:text-white transition-colors">
                  Essências de Narguilé
                </Link>
              </li>
              <li>
                <Link href="/search?category=narguiles" className="hover:text-white transition-colors">
                  Narguilés Completos
                </Link>
              </li>
              <li>
                <Link href="/search?category=sedas" className="hover:text-white transition-colors">
                  Sedas & Acessórios
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Atendimento e Horários */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
              Atendimento & Horários
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <Clock className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{config.businessHours}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-300">
              <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
              <a
                href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-semibold"
              >
                WhatsApp: {config.whatsapp}
              </a>
            </div>
          </div>

          {/* Column 4: Localização e Endereço */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
              Localização da Loja
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-300">
              <MapPin className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
              <span>{config.address}</span>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${config.latitude},${config.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-400 hover:underline pt-1"
            >
              <span>Abrir no Google Maps →</span>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {config.name}. Todos os direitos reservados. Venda proibida para menores de 18 anos.</p>
          <div className="flex items-center gap-1 text-slate-600">
            <span>Desenvolvido com tecnologia White Label SaaS</span>
            <ShieldCheck className="h-4 w-4 text-purple-500 ml-1" />
          </div>
        </div>
      </div>
    </footer>
  );
}
