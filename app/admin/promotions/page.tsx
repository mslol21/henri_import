'use client';

import React, { useState, useEffect } from 'react';
import {
  Tag,
  Plus,
  Trash2,
  CheckCircle,
  XCircle,
  Percent,
  DollarSign,
  Truck,
  Sparkles,
  Calendar,
  AlertCircle,
  Loader2,
  X,
  Save,
  Check,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface CouponData {
  id: string;
  code: string;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  discountValue: number;
  minOrderValue: number | null;
  freeShipping: boolean;
  maxUses: number | null;
  usedCount: number;
  active: boolean;
  expiresAt: string | null;
}

interface PromotionRuleData {
  id: string;
  title: string;
  description: string | null;
  targetType: 'PRODUCT' | 'CATEGORY' | 'ALL';
  productId: string | null;
  categoryId: string | null;
  discountType: 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING';
  discountValue: number;
  freeShipping: boolean;
  badgeText: string | null;
  active: boolean;
}

export default function AdminPromotionsPage() {
  const [activeTab, setActiveTab] = useState<'coupons' | 'rules'>('coupons');

  // Coupon State
  const [coupons, setCoupons] = useState<CouponData[]>([]);
  const [loadingCoupons, setLoadingCoupons] = useState(true);
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [couponForm, setCouponForm] = useState({
    code: '',
    discountType: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING',
    discountValue: 10,
    minOrderValue: 0,
    freeShipping: false,
    maxUses: '',
    active: true,
  });
  const [savingCoupon, setSavingCoupon] = useState(false);
  const [couponError, setCouponError] = useState<string | null>(null);

  // Promotion Rules State
  const [rules, setRules] = useState<PromotionRuleData[]>([]);
  const [loadingRules, setLoadingRules] = useState(true);
  const [ruleModalOpen, setRuleModalOpen] = useState(false);
  const [ruleForm, setRuleForm] = useState({
    title: '',
    description: '',
    targetType: 'ALL' as 'PRODUCT' | 'CATEGORY' | 'ALL',
    discountType: 'PERCENTAGE' as 'PERCENTAGE' | 'FIXED_AMOUNT' | 'FREE_SHIPPING',
    discountValue: 10,
    freeShipping: true,
    badgeText: 'FRETE GRÁTIS DA CIDADE',
    active: true,
  });
  const [savingRule, setSavingRule] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 2500);
  };

  // Fetch Coupons
  const fetchCoupons = async () => {
    setLoadingCoupons(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (res.ok) {
        const data = await res.json();
        setCoupons(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingCoupons(false);
    }
  };

  // Fetch Rules
  const fetchRules = async () => {
    setLoadingRules(true);
    try {
      const res = await fetch('/api/admin/promotion-rules');
      if (res.ok) {
        const data = await res.json();
        setRules(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingRules(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
    fetchRules();
  }, []);

  // Toggle Coupon Active Status (1-click activate/inactivate)
  const toggleCouponStatus = async (coupon: CouponData) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !coupon.active }),
      });
      if (res.ok) {
        showToast(coupon.active ? `Cupom ${coupon.code} INATIVADO` : `Cupom ${coupon.code} ATIVADO!`);
        fetchCoupons();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Rule Active Status
  const toggleRuleStatus = async (rule: PromotionRuleData) => {
    try {
      const res = await fetch(`/api/admin/promotion-rules/${rule.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !rule.active }),
      });
      if (res.ok) {
        showToast(rule.active ? `Promoção INATIVADA` : `Promoção ATIVADA!`);
        fetchRules();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Coupon
  const deleteCoupon = async (id: string) => {
    if (!confirm('Deseja excluir este cupom?')) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Cupom excluído com sucesso');
        fetchCoupons();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Rule
  const deleteRule = async (id: string) => {
    if (!confirm('Deseja excluir esta regra de promoção?')) return;
    try {
      const res = await fetch(`/api/admin/promotion-rules/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Promoção excluída');
        fetchRules();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Save Coupon
  const handleSaveCoupon = async () => {
    if (!couponForm.code.trim()) {
      setCouponError('Digite o código do cupom');
      return;
    }
    setSavingCoupon(true);
    setCouponError(null);
    try {
      const url = editingCouponId ? `/api/admin/coupons/${editingCouponId}` : '/api/admin/coupons';
      const method = editingCouponId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...couponForm,
          maxUses: couponForm.maxUses ? Number(couponForm.maxUses) : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponError(data.error || 'Erro ao salvar cupom');
        return;
      }
      showToast(editingCouponId ? 'Cupom atualizado!' : 'Novo cupom criado com sucesso!');
      setCouponModalOpen(false);
      setEditingCouponId(null);
      fetchCoupons();
    } catch {
      setCouponError('Erro de conexão');
    } finally {
      setSavingCoupon(false);
    }
  };

  // Save Rule
  const handleSaveRule = async () => {
    if (!ruleForm.title.trim()) return;
    setSavingRule(true);
    try {
      const res = await fetch('/api/admin/promotion-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleForm),
      });
      if (res.ok) {
        showToast('Nova regra de promoção criada!');
        setRuleModalOpen(false);
        fetchRules();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSavingRule(false);
    }
  };

  return (
    <div className="space-y-8">
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl bg-purple-600 px-5 py-3 text-white text-xs font-black shadow-xl animate-bounce flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            MARKETING & CUPONS
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            Promoções & Cupons da Loja
          </h1>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'coupons'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="h-3.5 w-3.5" />
            <span>Cupons de Desconto</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
              activeTab === 'rules'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="h-3.5 w-3.5" />
            <span>Frete Grátis & Desconto por Categoria</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CUPONS DE DESCONTO */}
      {activeTab === 'coupons' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Gerenciador de Cupons Ativos & Inativos
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Crie ou inative cupons de desconto instantaneamente na loja e checkout.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingCouponId(null);
                setCouponForm({
                  code: '',
                  discountType: 'PERCENTAGE',
                  discountValue: 10,
                  minOrderValue: 0,
                  freeShipping: false,
                  maxUses: '',
                  active: true,
                });
                setCouponError(null);
                setCouponModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-xs font-black text-white hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Cupom de Desconto</span>
            </button>
          </div>

          {loadingCoupons ? (
            <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-xs font-semibold">Carregando cupons...</span>
            </div>
          ) : coupons.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 space-y-2">
              <Tag className="h-8 w-8 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Nenhum cupom cadastrado ainda</p>
              <p className="text-xs text-slate-400">Clique em "Novo Cupom de Desconto" para criar o primeiro.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    coupon.active
                      ? 'bg-white border-slate-200 shadow-sm hover:border-purple-300'
                      : 'bg-slate-50/80 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Header Card */}
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100 text-purple-900 text-xs font-black font-mono border border-purple-200">
                        <Tag className="h-3.5 w-3.5 text-purple-600" />
                        <span>{coupon.code}</span>
                      </div>

                      {/* Status Toggle Button */}
                      <button
                        onClick={() => toggleCouponStatus(coupon)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all border ${
                          coupon.active
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                            : 'bg-slate-200 text-slate-600 border-slate-300 hover:bg-slate-300'
                        }`}
                        title="Clique para ativar ou inativar"
                      >
                        {coupon.active ? (
                          <>
                            <CheckCircle className="h-3 w-3 text-emerald-600" />
                            <span>ATIVO</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3 text-slate-500" />
                            <span>INATIVO</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Benefit Details */}
                    <div className="space-y-1">
                      <div className="text-base font-black text-slate-900 flex items-center gap-1.5">
                        {coupon.discountType === 'PERCENTAGE' && (
                          <span className="text-purple-600">{coupon.discountValue}% OFF</span>
                        )}
                        {coupon.discountType === 'FIXED_AMOUNT' && (
                          <span className="text-purple-600">{formatCurrency(coupon.discountValue)} OFF</span>
                        )}
                        {coupon.discountType === 'FREE_SHIPPING' && (
                          <span className="text-emerald-600">Frete Grátis na Cidade</span>
                        )}
                      </div>

                      {coupon.freeShipping && coupon.discountType !== 'FREE_SHIPPING' && (
                        <span className="inline-block text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          + Frete Grátis
                        </span>
                      )}

                      <p className="text-xs text-slate-500 font-medium">
                        {coupon.minOrderValue && coupon.minOrderValue > 0
                          ? `Pedido mín: ${formatCurrency(coupon.minOrderValue)}`
                          : 'Sem pedido mínimo'}
                      </p>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Usos: <strong>{coupon.usedCount}</strong></span>
                    <button
                      onClick={() => deleteCoupon(coupon.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded-lg transition-colors"
                      title="Excluir cupom"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: FRETE GRÁTIS & REGRAS POR PRODUTO/CATEGORIA */}
      {activeTab === 'rules' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Regras de Frete Grátis & Promoções da Cidade
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Defina ofertas especiais com frete grátis local ou desconto automático por produto.
              </p>
            </div>

            <button
              onClick={() => setRuleModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-xs font-black text-white hover:bg-purple-500 shadow-lg shadow-purple-600/30 transition-all shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Nova Promoção com Frete Grátis</span>
            </button>
          </div>

          {loadingRules ? (
            <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-xs font-semibold">Carregando promoções...</span>
            </div>
          ) : rules.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 space-y-2">
              <Truck className="h-8 w-8 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Nenhuma promoção ativa criada</p>
              <p className="text-xs text-slate-400">Clique acima para criar uma promoção de frete grátis ou desconto.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className={`p-5 rounded-2xl border flex flex-col justify-between space-y-4 ${
                    rule.active ? 'bg-white border-slate-200' : 'bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-purple-600 uppercase tracking-wider">
                        {rule.targetType === 'ALL' ? 'Toda a Loja' : rule.targetType}
                      </span>
                      <button
                        onClick={() => toggleRuleStatus(rule)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                          rule.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {rule.active ? 'ATIVO' : 'INATIVO'}
                      </button>
                    </div>

                    <h4 className="text-base font-black text-slate-900">{rule.title}</h4>
                    {rule.description && <p className="text-xs text-slate-500">{rule.description}</p>}

                    {rule.badgeText && (
                      <div className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200">
                        <Truck className="h-3.5 w-3.5" />
                        <span>{rule.badgeText}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => deleteRule(rule.id)}
                      className="text-slate-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: NOVO CUPOM */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingCouponId ? 'Editar Cupom' : 'Novo Cupom de Desconto'}
              </h3>
              <button
                onClick={() => setCouponModalOpen(false)}
                className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            {couponError && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-bold rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{couponError}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Código do Cupom *</label>
                <input
                  type="text"
                  placeholder="Ex: HENRI10, FRETEGRATIS"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 uppercase focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipo de Desconto</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) =>
                      setCouponForm({
                        ...couponForm,
                        discountType: e.target.value as any,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                  >
                    <option value="PERCENTAGE">Porcentagem (%)</option>
                    <option value="FIXED_AMOUNT">Valor Fixo (R$)</option>
                    <option value="FREE_SHIPPING">Frete Grátis na Cidade</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Valor do Desconto</label>
                  <input
                    type="number"
                    step="0.01"
                    disabled={couponForm.discountType === 'FREE_SHIPPING'}
                    value={couponForm.discountValue}
                    onChange={(e) => setCouponForm({ ...couponForm, discountValue: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-500 disabled:opacity-40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Pedido Mínimo (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0 para sem mínimo"
                  value={couponForm.minOrderValue}
                  onChange={(e) => setCouponForm({ ...couponForm, minOrderValue: Number(e.target.value) })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={couponForm.freeShipping}
                    onChange={(e) => setCouponForm({ ...couponForm, freeShipping: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-xs font-bold text-slate-800">Conceder Frete Grátis na Cidade com este cupom</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={couponForm.active}
                    onChange={(e) => setCouponForm({ ...couponForm, active: e.target.checked })}
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-xs font-bold text-slate-800">Cupom Ativo (Pronto para uso)</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setCouponModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveCoupon}
                disabled={savingCoupon}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-purple-600 hover:bg-purple-500 shadow-md shadow-purple-600/30 transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {savingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Salvar Cupom</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NOVA REGRA DE PROMOÇÃO */}
      {ruleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Nova Promoção / Frete Grátis</h3>
              <button
                onClick={() => setRuleModalOpen(false)}
                className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título da Oferta *</label>
                <input
                  type="text"
                  placeholder="Ex: Frete Grátis Sorocaba em toda a loja"
                  value={ruleForm.title}
                  onChange={(e) => setRuleForm({ ...ruleForm, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Selo / Badge de Destaque</label>
                <input
                  type="text"
                  placeholder="Ex: FRETE GRÁTIS CIDADE"
                  value={ruleForm.badgeText}
                  onChange={(e) => setRuleForm({ ...ruleForm, badgeText: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ruleForm.freeShipping}
                    onChange={(e) => setRuleForm({ ...ruleForm, freeShipping: e.target.checked })}
                    className="rounded text-purple-600"
                  />
                  <span className="text-xs font-bold text-slate-800">Conceder Frete Grátis na Cidade</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setRuleModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveRule}
                disabled={savingRule}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-purple-600 hover:bg-purple-500 shadow-md transition-all flex items-center gap-2"
              >
                {savingRule ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Criar Promoção</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
