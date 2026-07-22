'use client';

import React from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
  Flame,
  ArrowUpRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const mockChartData = [
  { month: 'Jan', vendas: 14200 },
  { month: 'Fev', vendas: 18500 },
  { month: 'Mar', vendas: 22400 },
  { month: 'Abr', vendas: 19800 },
  { month: 'Mai', vendas: 27900 },
  { month: 'Jun', vendas: 31200 },
  { month: 'Jul', vendas: 38400 },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          VISÃO GERAL DO NEGÓCIO
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
          Dashboard Executivo
        </h1>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Pedidos do Dia</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ShoppingBag className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">28</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              +14% <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Total de pedidos finalizados hoje</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Vendas Mês</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <DollarSign className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{formatCurrency(38400)}</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              +22% <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Faturamento acumulado no mês</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Ticket Médio</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">{formatCurrency(185.5)}</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              +8% <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Valor médio gasto por cliente</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Clientes Recorrentes</span>
            <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-slate-900">142</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-600">
              +18% <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="text-[11px] text-slate-400">Clientes com 2+ pedidos</p>
        </div>
      </div>

      {/* Sales Chart Section */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Evolução das Vendas (Gráfico Mensal)
            </h3>
            <p className="text-xs text-slate-500">Acompanhamento do faturamento mês a mês</p>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(v) => `R$${v / 1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <Tooltip formatter={(value: any) => formatCurrency(Number(value))} />
              <Area type="monotone" dataKey="vendas" stroke="#7c3aed" strokeWidth={3} fillOpacity={1} fill="url(#colorVendas)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Products & Top Flavors Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Flame className="h-4 w-4 text-purple-600" />
            <span>Produtos Mais Vendidos</span>
          </h3>

          <div className="space-y-3">
            {[
              { name: 'Ignite V250 Pod 25.000 Puffs', total: 184, revenue: 27581.6 },
              { name: 'Elf Bar BC10000 Puffs', total: 112, revenue: 13428.8 },
              { name: 'Narguilé Triton Zip Black', total: 24, revenue: 7197.6 },
              { name: 'Essência Zomo Strong Mint 50g', total: 310, revenue: 3999.0 },
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-purple-600 text-xs font-black text-white">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                    <span className="text-[11px] text-slate-500">{p.total} unidades vendidas</span>
                  </div>
                </div>
                <span className="text-xs font-black text-purple-600">{formatCurrency(p.revenue)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Flavors */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>Sabores Mais Vendidos</span>
          </h3>

          <div className="space-y-3">
            {[
              { flavor: 'Blueberry Ice (Ignite V250)', total: 78 },
              { flavor: 'Watermelon Ice (Elf Bar BC10000)', total: 64 },
              { flavor: 'Grape Ice (Ignite V250)', total: 52 },
              { flavor: 'Mint Ice (Ignite V250)', total: 46 },
            ].map((f, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-xs font-black text-white">
                    #{idx + 1}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{f.flavor}</h4>
                </div>
                <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2.5 py-1 rounded-full">
                  {f.total} un
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
