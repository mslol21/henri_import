'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  Package,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  Search,
  AlertCircle,
  GripVertical
} from 'lucide-react';

interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  active: boolean;
  displayOrder: number;
  _count: { products: number };
}

interface CategoryFormData {
  name: string;
  slug: string;
  color: string;
  active: boolean;
  displayOrder: number;
}

const emptyForm: CategoryFormData = { name: '', slug: '', color: '#0284c7', active: true, displayOrder: 0 };

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<CategoryFormData>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Delete confirm
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      if (!res.ok) throw new Error('Erro ao carregar categorias');
      const data = await res.json();
      setCategories(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchCategories(); }, [fetchCategories]);

  // Generate slug automatically based on name
  const handleNameChange = (val: string) => {
    const slug = val.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^\w-]+/g, '');
    setForm({ ...form, name: val, slug });
  };

  const openCreate = () => {
    setEditingId(null);
    setForm({ ...emptyForm, displayOrder: categories.length });
    setFormError(null);
    setModalOpen(true);
  };

  const openEdit = (cat: CategoryData) => {
    setEditingId(cat.id);
    setForm({
      name: cat.name,
      slug: cat.slug,
      color: cat.color,
      active: cat.active,
      displayOrder: cat.displayOrder,
    });
    setFormError(null);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
    setFormError(null);
  };

  const handleSave = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      setFormError('Nome e Slug são obrigatórios.');
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const url = editingId ? `/api/admin/categories/${editingId}` : '/api/admin/categories';
      const method = editingId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || 'Erro ao salvar categoria.');
        return;
      }
      closeModal();
      fetchCategories();
    } catch {
      setFormError('Erro de conexão. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Erro ao excluir');
      } else {
        fetchCategories();
      }
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600">ORGANIZAÇÃO DE CATÁLOGO</span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">Categorias</h1>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white text-xs font-black px-4 py-2.5 rounded-2xl shadow-lg shadow-sky-600/30 transition-all"
        >
          <Plus className="h-4 w-4" />
          Nova Categoria
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Buscar categoria..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 bg-white text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 shadow-xs"
        />
      </div>

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span className="text-sm font-semibold">Carregando categorias...</span>
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-2xl text-red-600 text-sm text-slate-900">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-16 gap-3 text-slate-400 bg-white rounded-3xl border border-slate-200">
          <Package className="h-12 w-12 text-slate-300" />
          <p className="text-sm font-bold text-slate-600">Nenhuma categoria encontrada</p>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="divide-y divide-slate-100">
            {filtered.map((cat) => (
              <div key={cat.id} className={`p-5 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors ${!cat.active ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="cursor-move text-slate-300 hover:text-slate-500">
                    <GripVertical className="h-5 w-5" />
                  </div>
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${cat.color}20`, color: cat.color }}
                  >
                    <Package className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-black text-slate-900">{cat.name}</h3>
                      {!cat.active && (
                        <span className="text-[10px] font-bold bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">Inativo</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">/{cat.slug}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="hidden sm:block text-right">
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Produtos</span>
                    <span className="font-extrabold text-slate-900">{cat._count.products}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(cat)}
                      className="h-8 w-8 flex items-center justify-center rounded-xl bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      disabled={deletingId === cat.id}
                      className="h-8 w-8 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-100 transition-colors disabled:opacity-50"
                      title="Excluir"
                    >
                      {deletingId === cat.id ? (
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

      {/* ===== MODAL ===== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-black text-slate-900">
                {editingId ? 'Editar Categoria' : 'Nova Categoria'}
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

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Categoria *</label>
                <input
                  type="text"
                  placeholder="Ex: Pods Descartáveis"
                  value={form.name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Slug (URL) *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value.toLowerCase() })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 font-mono focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cor Base (Hex)</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="h-10 w-10 p-1 rounded-lg border border-slate-200 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={form.color}
                      onChange={(e) => setForm({ ...form, color: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 font-mono focus:outline-none focus:border-sky-400"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                  <label className="flex items-center gap-2 h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) => setForm({ ...form, active: e.target.checked })}
                      className="rounded border-slate-300 text-sky-600 focus:ring-sky-600"
                    />
                    <span className="text-sm font-semibold text-slate-700">Ativo na loja</span>
                  </label>
                </div>
              </div>
            </div>

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
                {saving ? 'Salvando...' : editingId ? 'Salvar' : 'Criar Categoria'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
