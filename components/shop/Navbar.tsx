'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, Phone, Zap } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useConfig } from '@/contexts/ConfigContext';

export function Navbar() {
  const { itemCount, setIsCartOpen } = useCart();
  const { config } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sky-200/80 bg-white/85 backdrop-blur-md shadow-xs transition-all">
      {/* Top Banner announcement - Sky Blue Theme */}
      <div className="bg-gradient-to-r from-sky-700 via-sky-600 to-cyan-600 px-4 py-1.5 text-center text-xs font-semibold text-white flex items-center justify-center gap-2 shadow-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-extrabold text-white border border-white/30 backdrop-blur-xs">
          <img src="/mascote.png" alt="Mascote" className="h-3.5 w-3.5 object-contain" />
          ENTREGA EXPRESS
        </span>
        <span>Entregamos na sua região via Delivery Express! Peça pelo WhatsApp ou Site.</span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo Branding */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-12 w-auto max-w-[140px] sm:max-w-[160px] flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/logo.png"
              alt={config.name}
              className="h-full w-auto object-contain max-h-12"
            />
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-1 max-w-md mx-8 relative items-center"
        >
          <input
            type="text"
            placeholder="Buscar por produto, marca, sabor ou essência..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border border-sky-200 bg-sky-50/50 py-2 pl-4 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 transition-all"
          />
          <button
            type="submit"
            aria-label="Buscar produtos"
            className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-xs"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          {/* Wholesale Button */}
          <Link
            href="/atacado"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-50 px-3.5 py-1.5 text-xs font-bold text-purple-700 hover:bg-purple-600 hover:text-white transition-all shadow-xs"
          >
            <span>Atacado B2B</span>
          </Link>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all shadow-xs"
          >
            <Phone className="h-3.5 w-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir carrinho de compras"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-sky-100/70 text-sky-800 hover:bg-sky-600 hover:text-white transition-all shadow-xs"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-sky-600 text-[11px] font-extrabold text-white shadow-xs animate-pulse">
                {itemCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu de navegação"
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation menu drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar produtos ou sabores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-sky-200 py-2 pl-3 pr-9 text-sm focus:border-sky-600 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Buscar produtos"
              className="absolute right-2 text-slate-500 hover:text-sky-600"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <nav className="flex flex-col space-y-2 pt-2 text-sm font-medium text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Início
            </Link>

            <Link
              href="/search?category=pods-descartaveis"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sky-50 flex items-center justify-between"
            >
              <span>Pods Descartáveis</span>
              <Zap className="h-4 w-4 text-sky-600" />
            </Link>

            <Link
              href="/search?category=vapes-juices"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Vapes & Juices
            </Link>

            <Link
              href="/search?category=essencias"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Essências
            </Link>

            <Link
              href="/search?category=narguiles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-sky-50"
            >
              Narguilés
            </Link>

            <Link
              href="/atacado"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase tracking-wider hover:bg-purple-50 rounded-lg mt-2 border-t border-slate-100 pt-3"
            >
              Área do Atacado (B2B)
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-sky-600 uppercase tracking-wider hover:bg-sky-50 rounded-lg mt-2"
            >
              Área Administrativa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
