import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  Layers,
  ShoppingBag,
  Users,
  Tag,
  Settings,
  LogOut,
  Flame,
  ExternalLink,
} from 'lucide-react';
import { Providers } from '../providers';
import { getStoreConfig } from '@/actions/settings';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const config = await getStoreConfig();

  return (
    <Providers initialConfig={config}>
      <div className="min-h-screen bg-slate-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col shrink-0 border-r border-slate-800">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600 text-white shadow-md">
                <Flame className="h-5 w-5 fill-purple-300" />
              </div>
              <div>
                <h1 className="text-sm font-black tracking-tight text-white uppercase">{config.name}</h1>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Painel Admin</span>
              </div>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 text-xs font-bold">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-purple-400" />
              <span>Dashboard</span>
            </Link>

            <Link
              href="/admin/products"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Package className="h-4 w-4 text-purple-400" />
              <span>Produtos & Sabores</span>
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Layers className="h-4 w-4 text-purple-400" />
              <span>Categorias</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <ShoppingBag className="h-4 w-4 text-purple-400" />
              <span>Pedidos</span>
            </Link>

            <Link
              href="/admin/clients"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Users className="h-4 w-4 text-purple-400" />
              <span>Clientes</span>
            </Link>

            <Link
              href="/admin/promotions"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Tag className="h-4 w-4 text-purple-400" />
              <span>Promoções & Banners</span>
            </Link>

            <Link
              href="/admin/settings"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <Settings className="h-4 w-4 text-purple-400" />
              <span>Configurações da Loja</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800 space-y-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between w-full px-3 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 hover:text-white transition-colors"
            >
              <span>Ver Loja Ao Vivo</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sair</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-8">{children}</main>
      </div>
    </Providers>
  );
}
