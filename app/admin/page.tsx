'use client';

import React, { useEffect, useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  ShoppingBag,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
  Flame,
  PackageSearch,
  InboxIcon,
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

interface DashboardStats {
  ordersToday: number;
  revenueMonth: number;
  avgTicket: number;
  recurringClients: number;
  chartData: { month: string; vendas: number }[];
  topProducts: { name: string; total: number; revenue: number }[];
  topFlavors: { flavor: string; total: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/admin/dashboard');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          // Show zeros if API fails
          setStats({
            ordersToday: 0,
            revenueMonth: 0,
            avgTicket: 0,
            recurringClients: 0,
            chartData: [],
            topProducts: [],
            topFlavors: [],
          });
        }
      } catch {
        setStats({
          ordersToday: 0,
          revenueMonth: 0,
          avgTicket: 0,
          recurringClients: 0,
          chartData: [],
          topProducts: [],
          topFlavors: [],
        });
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const isEmpty = !loading && stats && stats.ordersToday === 0 && stats.revenueMonth === 0;

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
          VISÃO GERAL DO NEGÓCIO
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
          Dashboard Executivo
        </h1>
      </div>

      {/* Top 4 Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: 'Pedidos do Dia',
            value: loading ? '—' : String(stats?.ordersToday ?? 0),
            sub: 'Total de pedidos finalizados hoje',
            icon: ShoppingBag,
            isCurrency: false,
          },
          {
            label: 'Vendas Mês',
            value: loading ? '—' : formatCurrency(stats?.revenueMonth ?? 0),
            sub: 'Faturamento acumulado no mês',
            icon: DollarSign,
            isCurrency: true,
          },
          {
            label: 'Ticket Médio',
            value: loading ? '—' : formatCurrency(stats?.avgTicket ?? 0),
            sub: 'Valor médio gasto por cliente',
            icon: TrendingUp,
            isCurrency: true,
          },
          {
            label: 'Clientes Recorrentes',
            value: loading ? '—' : String(stats?.recurringClients ?? 0),
            sub: 'Clientes com 2+ pedidos',
            icon: Users,
            isCurrency: false,
          },
        ].map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2"
            >
              <div className="flex items-center justify-between text-slate-500">
                <span className="text-xs font-bold uppercase tracking-wider">{card.label}</span>
                <div className="h-9 w-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">{card.value}</span>
              </div>
              <p className="text-[11px] text-slate-400">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Empty state banner if no data at all */}
      {isEmpty && (
        <div className="flex flex-col items-center justify-center py-12 bg-sky-50 border border-sky-100 rounded-3xl text-center gap-3">
          <InboxIcon className="h-12 w-12 text-sky-300" />
          <h2 className="text-base font-black text-slate-700">Nenhuma venda ainda</h2>
          <p className="text-xs text-slate-500 max-w-xs">
            Cadastre seus produtos e categorias no painel e as vendas aparecerão aqui automaticamente.
          </p>
        </div>
      )}

      {/* Sales Chart Section */}
      {!isEmpty && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
              Evolução das Vendas (Gráfico Mensal)
            </h3>
            <p className="text-xs text-slate-500">Acompanhamento do faturamento mês a mês</p>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={stats?.chartData ?? []}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorVendas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(v) => `R$${v / 1000}k`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip formatter={(value: unknown) => formatCurrency(Number(value))} />
                <Area
                  type="monotone"
                  dataKey="vendas"
                  stroke="#0284c7"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorVendas)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Top Products & Top Flavors Rankings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Flame className="h-4 w-4 text-sky-600" />
            <span>Produtos Mais Vendidos</span>
          </h3>

          {!loading && (stats?.topProducts?.length ?? 0) === 0 ? (
            <div className="flex flex-col items-center py-8 gap-2 text-slate-400">
              <PackageSearch className="h-8 w-8 text-slate-300" />
              <p className="text-xs font-semibold">Nenhum produto vendido ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(stats?.topProducts ?? []).map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-sky-600 text-xs font-black text-white">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                      <span className="text-[11px] text-slate-500">{p.total} unidades vendidas</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-sky-600">{formatCurrency(p.revenue)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Flavors */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-sky-600" />
            <span>Sabores Mais Vendidos</span>
          </h3>

          {!loading && (stats?.topFlavors?.length ?? 0) === 0 ? (
            <div className="flex flex-col items-center py-8 gap-2 text-slate-400">
              <PackageSearch className="h-8 w-8 text-slate-300" />
              <p className="text-xs font-semibold">Nenhum sabor vendido ainda</p>
            </div>
          ) : (
            <div className="space-y-3">
              {(stats?.topFlavors ?? []).map((f, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100"
                >
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
          )}
        </div>
      </div>
    </div>
  );
}
