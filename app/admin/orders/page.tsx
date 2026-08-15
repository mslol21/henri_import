'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { formatCurrency, formatDate, parseNumber } from '@/lib/utils';
import { OrderStatusType } from '@/types';
import { updateOrderStatus, deleteOrder } from '@/actions/orders';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Phone,
  MapPin,
  ChevronDown,
  ChevronUp,
  Loader2,
  RefreshCw,
  AlertCircle,
  Check,
  Send,
  Trash2,
  Edit,
  X,
  Plus,
  Save,
  DollarSign,
} from 'lucide-react';

interface OrderItemUI {
  id: string;
  productId?: string;
  flavorId?: string | null;
  productName: string;
  flavorName?: string | null;
  quantity: number;
  price: number;
}

interface OrderUI {
  id: string;
  number: number;
  client: { id: string; name: string; phone: string; email?: string | null };
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string | null;
    neighborhood: string;
    city: string;
    state: string;
    distanceKm?: number | null;
  };
  items: OrderItemUI[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'PIX' | 'CASH' | 'CARD_ON_DELIVERY';
  notes?: string | null;
  status: OrderStatusType;
  whatsappSent: boolean;
  createdAt: string;
  history: { id: string; status: OrderStatusType; notes?: string | null; changedBy: string; createdAt: string }[];
}

const statusBadgeMap: Record<OrderStatusType, { label: string; bg: string; text: string }> = {
  NEW: { label: 'Novo Pedido (Pendente)', bg: 'bg-purple-100 border border-purple-300', text: 'text-purple-700 font-black' },
  CONFIRMED: { label: 'Confirmado / Aprovado', bg: 'bg-blue-100 border border-blue-300', text: 'text-blue-700 font-black' },
  PREPARING: { label: 'Em Separação', bg: 'bg-amber-100 border border-amber-300', text: 'text-amber-700 font-black' },
  SHIPPED: { label: 'Saiu p/ Entrega', bg: 'bg-indigo-100 border border-indigo-300', text: 'text-indigo-700 font-black' },
  DELIVERED: { label: 'Entregue', bg: 'bg-emerald-100 border border-emerald-300', text: 'text-emerald-700 font-black' },
  CANCELLED: { label: 'Cancelado', bg: 'bg-red-100 border border-red-300', text: 'text-red-700 font-black' },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Edit Modal State
  const [editingOrder, setEditingOrder] = useState<OrderUI | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Toast Notification
  const [notification, setNotification] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
        const firstNew = data.find((o: OrderUI) => o.status === 'NEW');
        if (firstNew && !expandedOrderId) {
          setExpandedOrderId(firstNew.id);
        }
      }
    } catch (e) {
      console.error('Error loading orders:', e);
    } finally {
      setLoading(false);
    }
  }, [expandedOrderId]);

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 20000);
    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatusType, notes?: string) => {
    setUpdatingId(orderId);
    try {
      const res = await updateOrderStatus(orderId, newStatus, notes);
      if (res.success) {
        showToast(`Status do pedido alterado para ${newStatus}!`);
        setOrders((prev) =>
          prev.map((o) => {
            if (o.id === orderId) {
              const newHist = [
                ...o.history,
                {
                  id: `hist-${Date.now()}`,
                  status: newStatus,
                  changedBy: 'Admin',
                  createdAt: new Date().toISOString(),
                  notes: notes || `Status alterado para ${newStatus}`,
                },
              ];
              return { ...o, status: newStatus, history: newHist };
            }
            return o;
          })
        );
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDeleteOrder = async (order: OrderUI) => {
    if (!confirm(`Deseja realmente excluir permanentemente o Pedido #${order.number}? Esta ação não pode ser desfeita.`)) {
      return;
    }
    setUpdatingId(order.id);
    try {
      const res = await deleteOrder(order.id);
      if (res.success) {
        showToast(`Pedido #${order.number} excluído com sucesso!`);
        setOrders((prev) => prev.filter((o) => o.id !== order.id));
      } else {
        alert('Erro ao excluir pedido: ' + (res.error || ''));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const openEditModal = (order: OrderUI) => {
    setEditingOrder(order);
    setEditForm({
      clientName: order.client.name,
      clientPhone: order.client.phone,
      paymentMethod: order.paymentMethod,
      deliveryFee: String(order.deliveryFee),
      notes: order.notes || '',
      status: order.status,
      address: { ...order.address },
      items: order.items.map((i) => ({ ...i, priceStr: String(i.price) })),
    });
  };

  const handleSaveEdit = async () => {
    if (!editingOrder || !editForm) return;
    setSavingEdit(true);
    try {
      const parsedDeliveryFee = parseNumber(editForm.deliveryFee) ?? 0;
      const parsedItems = editForm.items.map((i: any) => ({
        ...i,
        quantity: Math.max(1, Number(i.quantity) || 1),
        price: parseNumber(i.priceStr) ?? i.price,
      }));

      const subtotal = parsedItems.reduce((acc: number, item: any) => acc + item.price * item.quantity, 0);
      const total = subtotal + parsedDeliveryFee;

      const payload = {
        clientName: editForm.clientName,
        clientPhone: editForm.clientPhone,
        paymentMethod: editForm.paymentMethod,
        deliveryFee: parsedDeliveryFee,
        subtotal,
        total,
        notes: editForm.notes,
        status: editForm.status,
        address: editForm.address,
        items: parsedItems,
        statusNotes: 'Pedido editado pelo administrador',
      };

      const res = await fetch(`/api/admin/orders/${editingOrder.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(`Pedido #${editingOrder.number} atualizado com sucesso!`);
        setEditingOrder(null);
        fetchOrders();
      } else {
        const errData = await res.json();
        alert('Erro ao atualizar pedido: ' + (errData.error || ''));
      }
    } catch (e) {
      console.error(e);
      alert('Erro de conexão ao salvar alterações do pedido.');
    } finally {
      setSavingEdit(false);
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (selectedFilter === 'ALL') return true;
    return o.status === selectedFilter;
  });

  const pendingCount = orders.filter((o) => o.status === 'NEW').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl bg-purple-600 px-5 py-3 text-white text-xs font-black shadow-xl flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            PAINEL DE CONTROLE • ENTREGAS & PEDIDOS
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            Gestão, Edição & Exclusão de Pedidos
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all shadow-xs"
          >
            <RefreshCw className={`h-4 w-4 text-purple-600 ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar Pedidos</span>
          </button>
        </div>
      </div>

      {/* Pending Orders Alert Banner */}
      {pendingCount > 0 && (
        <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-5 text-white shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-slate-950 font-black text-sm shrink-0 shadow-md">
              {pendingCount}
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                {pendingCount === 1
                  ? 'Existe 1 novo pedido aguardando aprovação!'
                  : `Existem ${pendingCount} novos pedidos aguardando aprovação!`}
              </h3>
              <p className="text-xs text-purple-200 mt-0.5">
                Revise os itens, altere dados se necessário ou clique em "Aprovar Pedido".
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedFilter('NEW')}
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs px-4 py-2.5 shadow-md transition-all shrink-0"
          >
            <span>Ver Pedidos Pendentes</span>
          </button>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
        {[
          { id: 'ALL', label: `Todos (${orders.length})` },
          { id: 'NEW', label: `Novos (${orders.filter((o) => o.status === 'NEW').length})` },
          { id: 'CONFIRMED', label: `Aprovados (${orders.filter((o) => o.status === 'CONFIRMED').length})` },
          { id: 'PREPARING', label: `Separando (${orders.filter((o) => o.status === 'PREPARING').length})` },
          { id: 'SHIPPED', label: `Em Entrega (${orders.filter((o) => o.status === 'SHIPPED').length})` },
          { id: 'DELIVERED', label: `Entregues (${orders.filter((o) => o.status === 'DELIVERED').length})` },
          { id: 'CANCELLED', label: `Cancelados (${orders.filter((o) => o.status === 'CANCELLED').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-3 py-2 rounded-xl text-xs font-black transition-all ${
              selectedFilter === tab.id
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {loading && orders.length === 0 ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-xs font-semibold">Carregando lista de pedidos do banco...</span>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
          <ShoppingBag className="h-10 w-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">Nenhum pedido encontrado neste filtro</h3>
          <p className="text-xs text-slate-500">
            Os novos pedidos realizados pelos clientes no site aparecerão aqui automaticamente.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const badge = statusBadgeMap[order.status] || statusBadgeMap.NEW;
            const isExpanded = expandedOrderId === order.id;
            const isPendingApproval = order.status === 'NEW';
            const cleanPhone = order.client.phone.replace(/\D/g, '');
            const waUrl = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
              `Olá ${order.client.name}! Sou da Henri Imports referente ao seu Pedido #${order.number} no valor de ${formatCurrency(order.total)}.`
            )}`;

            return (
              <div
                key={order.id}
                className={`bg-white rounded-3xl border shadow-xs p-6 space-y-4 transition-all ${
                  isPendingApproval ? 'border-amber-400 ring-2 ring-amber-400/20' : 'border-slate-200'
                }`}
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-black text-slate-900">Pedido #{order.number}</span>
                      <span className={`text-xs px-3 py-1 rounded-full ${badge.bg} ${badge.text}`}>
                        {badge.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap">
                      <span>Data: <strong>{formatDate(order.createdAt)}</strong></span>
                      <span>•</span>
                      <span>Cliente: <strong>{order.client.name}</strong> ({order.client.phone})</span>
                    </div>
                  </div>

                  {/* Actions & Status Dropdown */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Approve Button if pending */}
                    {isPendingApproval && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'CONFIRMED', 'Pedido aprovado pelo administrador')}
                        disabled={updatingId === order.id}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs px-3.5 py-2 shadow-md transition-all disabled:opacity-50"
                      >
                        {updatingId === order.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        <span>Aprovar Pedido</span>
                      </button>
                    )}

                    {/* Edit Button */}
                    <button
                      onClick={() => openEditModal(order)}
                      className="inline-flex items-center gap-1 rounded-xl bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-600 hover:text-white font-bold text-xs px-3 py-2 transition-all"
                      title="Editar Pedido"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      <span>Editar</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDeleteOrder(order)}
                      disabled={updatingId === order.id}
                      className="inline-flex items-center gap-1 rounded-xl bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white font-bold text-xs px-3 py-2 transition-all disabled:opacity-50"
                      title="Excluir Pedido"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Excluir</span>
                    </button>

                    {/* WhatsApp Chat Link */}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs px-3 py-2 transition-all"
                    >
                      <Phone className="h-3.5 w-3.5 fill-current" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Status Dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatusType)}
                      disabled={updatingId === order.id}
                      className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:border-purple-600 focus:outline-none"
                    >
                      <option value="NEW">Novo Pedido (Pendente)</option>
                      <option value="CONFIRMED">Aprovado / Confirmado</option>
                      <option value="PREPARING">Em Separação</option>
                      <option value="SHIPPED">Saiu para Entrega</option>
                      <option value="DELIVERED">Entregue</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>

                    <button
                      onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                      className="p-2 text-slate-500 hover:text-purple-600 rounded-xl hover:bg-slate-100"
                    >
                      {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Summary details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Endereço de Entrega:</span>
                    <p>{order.address.street}, Nº {order.address.number} {order.address.complement ? `- ${order.address.complement}` : ''}</p>
                    <p>{order.address.neighborhood}, {order.address.city}/{order.address.state} - CEP {order.address.cep}</p>
                    {order.address.distanceKm && (
                      <p className="text-purple-600 font-bold">Distância da loja: ~{order.address.distanceKm} km</p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="font-bold text-slate-900 block">Forma de Pagamento & Frete:</span>
                    <p className="font-extrabold text-purple-700 uppercase">{order.paymentMethod}</p>
                    <p>Taxa de Entrega: <strong>{formatCurrency(order.deliveryFee)}</strong></p>
                    {order.notes && (
                      <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 mt-1">
                        Obs: {order.notes}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1 text-right sm:text-right">
                    <span className="font-bold text-slate-900 block">Total do Pedido:</span>
                    <p className="text-2xl font-black text-slate-900">{formatCurrency(order.total)}</p>
                  </div>
                </div>

                {/* Expanded items & History log timeline */}
                {isExpanded && (
                  <div className="pt-4 border-t border-slate-100 space-y-4 bg-slate-50 p-4 rounded-2xl">
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2">
                        Itens Solicitados ({order.items.length})
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between text-xs bg-white p-3 rounded-xl border border-slate-200">
                            <div>
                              <span className="font-extrabold text-slate-900">{item.quantity}x {item.productName}</span>
                              {item.flavorName && (
                                <span className="ml-2 font-bold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md text-[11px]">
                                  Sabor: {item.flavorName}
                                </span>
                              )}
                            </div>
                            <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* History Timeline */}
                    <div>
                      <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider mb-2">
                        Histórico de Alterações de Status
                      </h4>
                      <div className="space-y-1.5 text-xs text-slate-600">
                        {order.history.map((h) => (
                          <div key={h.id} className="flex items-center justify-between text-[11px] bg-white px-3 py-2 rounded-lg border border-slate-100">
                            <span className="font-semibold">
                              Status <strong>{h.status}</strong> alterado por <strong>{h.changedBy}</strong> ({h.notes})
                            </span>
                            <span className="text-slate-400 font-mono">{formatDate(h.createdAt)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EDIT ORDER MODAL */}
      {editingOrder && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-black text-slate-900">
                Editar Pedido #{editingOrder.number}
              </h3>
              <button
                onClick={() => setEditingOrder(null)}
                className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-6">
              {/* 1. Dados do Cliente */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-600">1. Dados do Cliente</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nome do Cliente</label>
                    <input
                      type="text"
                      value={editForm.clientName}
                      onChange={(e) => setEditForm({ ...editForm, clientName: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Telefone (WhatsApp)</label>
                    <input
                      type="text"
                      value={editForm.clientPhone}
                      onChange={(e) => setEditForm({ ...editForm, clientPhone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Endereço de Entrega */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-600">2. Endereço de Entrega</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rua / Logradouro</label>
                    <input
                      type="text"
                      value={editForm.address.street}
                      onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, street: e.target.value } })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Número</label>
                    <input
                      type="text"
                      value={editForm.address.number}
                      onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, number: e.target.value } })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Complemento</label>
                    <input
                      type="text"
                      value={editForm.address.complement || ''}
                      onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, complement: e.target.value } })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Bairro</label>
                    <input
                      type="text"
                      value={editForm.address.neighborhood}
                      onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, neighborhood: e.target.value } })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cidade / UF</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editForm.address.city}
                        onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, city: e.target.value } })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                      />
                      <input
                        type="text"
                        value={editForm.address.state}
                        onChange={(e) => setEditForm({ ...editForm, address: { ...editForm.address, state: e.target.value } })}
                        className="w-14 rounded-xl border border-slate-200 bg-slate-50 px-2 py-2 text-xs font-bold text-slate-900 text-center uppercase focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Financeiro & Entrega */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-black uppercase tracking-wider text-purple-600">3. Financeiro & Pagamento</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Forma de Pagamento</label>
                    <select
                      value={editForm.paymentMethod}
                      onChange={(e) => setEditForm({ ...editForm, paymentMethod: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    >
                      <option value="PIX">PIX</option>
                      <option value="CASH">Dinheiro</option>
                      <option value="CARD_ON_DELIVERY">Maquininha na Entrega</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Taxa de Entrega (R$)</label>
                    <input
                      type="text"
                      value={editForm.deliveryFee}
                      onChange={(e) => setEditForm({ ...editForm, deliveryFee: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status do Pedido</label>
                    <select
                      value={editForm.status}
                      onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                    >
                      <option value="NEW">Novo Pedido (Pendente)</option>
                      <option value="CONFIRMED">Aprovado / Confirmado</option>
                      <option value="PREPARING">Em Separação</option>
                      <option value="SHIPPED">Saiu para Entrega</option>
                      <option value="DELIVERED">Entregue</option>
                      <option value="CANCELLED">Cancelado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Observações do Pedido</label>
                  <input
                    type="text"
                    value={editForm.notes}
                    onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* 4. Editar Itens do Pedido */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider text-purple-600">4. Itens do Pedido</h4>
                  <button
                    type="button"
                    onClick={() => {
                      setEditForm({
                        ...editForm,
                        items: [
                          ...editForm.items,
                          { id: `new-item-${Date.now()}`, productName: 'Novo Item', flavorName: '', quantity: 1, priceStr: '0,00', price: 0 },
                        ],
                      });
                    }}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-600 hover:text-purple-800"
                  >
                    <Plus className="h-3.5 w-3.5" /> Adicionar Item
                  </button>
                </div>

                <div className="space-y-2">
                  {editForm.items.map((item: any, idx: number) => (
                    <div key={item.id || idx} className="flex flex-col sm:flex-row sm:items-center gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                      <div className="flex-1">
                        <input
                          type="text"
                          placeholder="Nome do produto"
                          value={item.productName}
                          onChange={(e) => {
                            const newItems = [...editForm.items];
                            newItems[idx].productName = e.target.value;
                            setEditForm({ ...editForm, items: newItems });
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900"
                        />
                      </div>

                      <div className="w-full sm:w-32">
                        <input
                          type="text"
                          placeholder="Sabor (Opcional)"
                          value={item.flavorName || ''}
                          onChange={(e) => {
                            const newItems = [...editForm.items];
                            newItems[idx].flavorName = e.target.value;
                            setEditForm({ ...editForm, items: newItems });
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs text-slate-900"
                        />
                      </div>

                      <div className="w-20">
                        <input
                          type="number"
                          placeholder="Qtd"
                          value={item.quantity}
                          onChange={(e) => {
                            const newItems = [...editForm.items];
                            newItems[idx].quantity = Number(e.target.value);
                            setEditForm({ ...editForm, items: newItems });
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-center text-slate-900"
                        />
                      </div>

                      <div className="w-28">
                        <input
                          type="text"
                          placeholder="Preço (R$)"
                          value={item.priceStr}
                          onChange={(e) => {
                            const newItems = [...editForm.items];
                            newItems[idx].priceStr = e.target.value;
                            setEditForm({ ...editForm, items: newItems });
                          }}
                          className="w-full rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-slate-900"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          const newItems = editForm.items.filter((_: any, i: number) => i !== idx);
                          setEditForm({ ...editForm, items: newItems });
                        }}
                        className="p-2 text-slate-400 hover:text-red-600 rounded-xl"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 sticky bottom-0 bg-white z-10">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={savingEdit}
                className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs px-6 py-3 shadow-lg disabled:opacity-50 transition-all"
              >
                {savingEdit ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
