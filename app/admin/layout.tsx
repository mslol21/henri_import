'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  Megaphone,
  Settings,
  LogOut,
  ExternalLink,
} from 'lucide-react';

const adminNav = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Produtos & Sabores', href: '/admin/products', icon: Package },
  { name: 'Categorias', href: '/admin/categories', icon: FolderTree },
  { name: 'Pedidos', href: '/admin/orders', icon: ShoppingBag },
  { name: 'Clientes', href: '/admin/clients', icon: Users },
  { name: 'Banners & Promoções', href: '/admin/promotions', icon: Megaphone },
  { name: 'Configurações White Label', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If on login page, render without sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/mascote.png" alt="Mascote Henri" className="h-8 w-8 object-contain" />
            <div>
              <h1 className="text-sm font-black text-white tracking-tight">HENRI IMPORTS</h1>
              <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest block">
                Painel White Label
              </span>
            </div>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {adminNav.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between w-full px-3.5 py-2 rounded-xl bg-slate-900 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition-colors"
          >
            <span>Ver Loja Principal</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Link>

          <Link
            href="/admin/login"
            className="flex items-center gap-2 w-full px-3.5 py-2 rounded-xl text-red-400 text-xs font-semibold hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sair do Painel</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Body */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8 bg-slate-900">
        {children}
      </main>
    </div>
  );
}
