'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { formatCurrency } from '@/lib/utils';
import {
  Users,
  Phone,
  Mail,
  MapPin,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  UserSearch,
  AlertCircle,
} from 'lucide-react';

interface ClientData {
  id: string;
  name: string;
  phone: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  lastPurchase: string | null;
  address: string;
  createdAt: string;
}

interface ClientFormData {
  name: string;
  phone: string;
  email: string;
}

const emptyForm: ClientFormData = { name: '', phone: '', email: '' };

export default function AdminClientsPage() {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ClientFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/clients');
      if (!res.ok) throw new Error('Erro ao carregar clientes');
      const data = await res.json();
      setClients(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchClients(); }, [fetchClients]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (client: ClientData) => {
    setEditingId(client.id);
    setForm({ name: client.name, phone: client.phone, email: client.email });
    setFormError(null);
    setModalOpen(true);
  };

  const closeModal = () => { setModalOpen(false); setEditingId(null); setForm(emptyForm); setFormError(null); };

  const handleSave = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setFormError('Nome e telefone são obrigatórios.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const url = editingId ? `/api/admin/clients/${editingId}` : '/api/admin/clients';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'Erro ao salvar cliente.');
        return;
      }
      closeModal();
      fetchClients();
    } catch {
      setFormError('Erro de conexão. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/admin/clients/${id}`, { method: 'DELETE' });
      fetchClients();
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = clients.filter((c) =>
    `${c.name} ${c.phone} ${c.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (iso: string | null) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">BASE DE CLIENTES CADASTRADOS</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">Clientes & Histórico</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-lg shadow-sky-600/30 transition-all"
        >
          <Plus className="h-4 w-4" />
          Novo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <UserSearch className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar por nome, telefone ou e-mail..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 shadow-xs"
        />
      </div>

      {/* Clients List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Carregando clientes...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3 text-slate-400 bg-white rounded-3xl border border-slate-200">
          <Users className="h-12 w-12 text-slate-300" />
          <p className="text-sm font-bold text-slate-600">Nenhum cliente encontrado</p>
          <p className="text-xs text-slate-400">Clique em "Novo Cliente" para cadastrar o primeiro.</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filtered.map((client) => (
              <div key={client.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                {/* Avatar + Info */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-lg shrink-0">
                    {client.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{client.name}</h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3.5 w-3.5 text-emerald-600" />
                        {client.phone}
                      </span>
                      {client.email && (
                        <span className="flex items-center gap-1">
                          <Mail className="h-3.5 w-3.5 text-sky-500" />
                          {client.email}
                        </span>
                      )}
                      {client.address && (
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-purple-500" />
                          {client.address}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats + Actions */}
                <div className="flex items-center gap-4 shrink-0">
                  <div className="hidden sm:flex items-center gap-6 text-xs text-slate-700">
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Pedidos</span>
                      <span className="font-extrabold text-slate-900">{client.ordersCount} ped.</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Gasto</span>
                      <span className="font-black text-sky-600 text-sm">{formatCurrency(client.totalSpent)}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Última Compra</span>
                      <span className="font-semibold text-slate-600">{formatDate(client.lastPurchase)}</span>
                    </div>
                  </div>

                  {/* Edit / Delete buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(client)}
                      className="h-8 w-8 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(client.id)}
                      disabled={deletingId === client.id}
                      className="h-8 w-8 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                      title="Excluir"
                    >
                      {deletingId === client.id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total count */}
      {!loading && clients.length > 0 && (
        <p className="text-xs text-slate-400 text-right">{clients.length} cliente{clients.length !== 1 ? 's' : ''} cadastrado{clients.length !== 1 ? 's' : ''}</p>
      )}

      {/* ===== ADD / EDIT MODAL ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900">
                {editingId ? 'Editar Cliente' : 'Novo Cliente'}
              </h2>
              <button onClick={closeModal} className="h-8 w-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors">
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            {formError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-xs font-semibold">
                <AlertCircle className="h-4 w-4 shrink-0" /> {formError}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome completo *</label>
                <input
                  type="text"
                  placeholder="Ex: João Silva"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefone / WhatsApp *</label>
                <input
                  type="text"
                  placeholder="Ex: (11) 99999-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">E-mail (opcional)</label>
                <input
                  type="email"
                  placeholder="Ex: joao@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={closeModal}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-sm font-black shadow-lg shadow-sky-600/30 transition-all disabled:opacity-60"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {saving ? 'Salvando...' : editingId ? 'Salvar Alterações' : 'Cadastrar Cliente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
