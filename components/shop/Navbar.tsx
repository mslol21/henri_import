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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs transition-all">
      {/* Top Banner announcement */}
      <div className="bg-slate-900 px-4 py-1.5 text-center text-xs font-medium text-white flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/20 px-2 py-0.5 text-[10px] font-semibold text-purple-300 border border-purple-400/30">
          <img src="/mascote.png" alt="Mascote" className="h-3.5 w-3.5 object-contain" />
          ENTREGA EXPRESS
        </span>
        <span>Entregamos na sua região via Delivery Express! Peça pelo WhatsApp ou Site.</span>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo Branding using Official /logo.png */}
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
            className="w-full rounded-full border border-slate-300 bg-slate-50 py-2 pl-4 pr-10 text-sm text-slate-900 placeholder-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          />
          <button
            type="submit"
            aria-label="Buscar produtos"
            className="absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-purple-600 text-white hover:bg-purple-700 transition-colors"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Actions Right */}
        <div className="flex items-center gap-3">
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${config.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            <Phone className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
            <span>WhatsApp</span>
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir carrinho de compras"
            className="relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-800 hover:bg-purple-50 hover:text-purple-600 transition-all"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[11px] font-bold text-white shadow-xs animate-pulse">
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
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative flex items-center">
            <input
              type="text"
              placeholder="Buscar produtos ou sabores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-300 py-2 pl-3 pr-9 text-sm focus:border-purple-600 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Buscar produtos"
              className="absolute right-2 text-slate-500 hover:text-purple-600"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          <nav className="flex flex-col space-y-2 pt-2 text-sm font-medium text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Início
            </Link>

            <Link
              href="/search?category=pods-descartaveis"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center justify-between"
            >
              <span>Pods Descartáveis</span>
              <Zap className="h-4 w-4 text-purple-600" />
            </Link>

            <Link
              href="/search?category=vapes-juices"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Vapes & Juices
            </Link>

            <Link
              href="/search?category=essencias"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Essências
            </Link>

            <Link
              href="/search?category=narguiles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-100"
            >
              Narguilés
            </Link>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-purple-600 uppercase tracking-wider hover:bg-purple-50 rounded-lg mt-2"
            >
              Área Administrativa
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
