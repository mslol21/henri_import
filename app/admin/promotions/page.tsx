'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  Search,
  AlertCircle,
  Loader2,
  X,
  Save,
  Check,
  Image as ImageIcon,
  Flame,
  Zap,
  ArrowRight,
  Filter,
  Package,
} from 'lucide-react';
import { formatCurrency, parseNumber, getCleanImageUrl } from '@/lib/utils';
import { ImageUploadInput } from '@/components/admin/ImageUploadInput';

interface ProductData {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryId: string;
  basePrice: number;
  basePromoPrice: number | null;
  mainImageUrl: string;
  category?: { name: string; slug: string };
}

interface CategoryData {
  id: string;
  name: string;
  slug: string;
}

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
}

interface BannerData {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  link: string | null;
  active: boolean;
  displayOrder: number;
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
  const [activeTab, setActiveTab] = useState<'promoProducts' | 'coupons' | 'banners' | 'rules'>('promoProducts');

  // Notification Toast
  const [notification, setNotification] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // State: Promo Products Showcase Management
  const [products, setProducts] = useState<ProductData[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productSearch, setProductSearch] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');
  const [promoFilterOnly, setPromoFilterOnly] = useState(false);
  const [updatingProductId, setUpdatingProductId] = useState<string | null>(null);
  const [inlinePromoPrices, setInlinePromoPrices] = useState<Record<string, string>>({});

  // Mass Category Promo State
  const [massCategory, setMassCategory] = useState('');
  const [massPercent, setMassPercent] = useState('10');
  const [massApplying, setMassApplying] = useState(false);

  // State: Coupons
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

  // State: Banners
  const [banners, setBanners] = useState<BannerData[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
    link: '',
    active: true,
    displayOrder: 0,
  });
  const [savingBanner, setSavingBanner] = useState(false);

  // State: Promotion Rules
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

  // --- Fetching Functions ---
  const fetchProductsAndCategories = useCallback(async () => {
    setLoadingProducts(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/categories'),
      ]);
      if (prodRes.ok) {
        const prodData = await prodRes.json();
        setProducts(prodData);
        // Initialize inline promo price inputs
        const initialPrices: Record<string, string> = {};
        prodData.forEach((p: ProductData) => {
          initialPrices[p.id] = p.basePromoPrice ? String(p.basePromoPrice) : '';
        });
        setInlinePromoPrices(initialPrices);
      }
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const fetchCoupons = async () => {
    setLoadingCoupons(true);
    try {
      const res = await fetch('/api/admin/coupons');
      if (res.ok) setCoupons(await res.json());
    } catch (e) { console.error(e); } finally { setLoadingCoupons(false); }
  };

  const fetchBanners = async () => {
    setLoadingBanners(true);
    try {
      const res = await fetch('/api/admin/banners');
      if (res.ok) setBanners(await res.json());
    } catch (e) { console.error(e); } finally { setLoadingBanners(false); }
  };

  const fetchRules = async () => {
    setLoadingRules(true);
    try {
      const res = await fetch('/api/admin/promotion-rules');
      if (res.ok) setRules(await res.json());
    } catch (e) { console.error(e); } finally { setLoadingRules(false); }
  };

  useEffect(() => {
    fetchProductsAndCategories();
    fetchCoupons();
    fetchBanners();
    fetchRules();
  }, [fetchProductsAndCategories]);

  // --- Product Promo Actions ---
  const updateProductPromo = async (productId: string, newPromoPrice: number | null) => {
    setUpdatingProductId(productId);
    try {
      const res = await fetch(`/api/admin/products/${productId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ basePromoPrice: newPromoPrice }),
      });
      if (res.ok) {
        showToast(newPromoPrice ? 'Produto colocado em oferta!' : 'Promoção removida do produto.');
        fetchProductsAndCategories();
      } else {
        alert('Erro ao atualizar promoção do produto');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingProductId(null);
    }
  };

  const handleApplyMassPromo = async () => {
    if (!massCategory) {
      alert('Selecione uma categoria para aplicar a promoção em massa');
      return;
    }
    const percent = parseFloat(massPercent);
    if (isNaN(percent) || percent <= 0 || percent >= 100) {
      alert('Porcentagem inválida');
      return;
    }

    setMassApplying(true);
    try {
      const categoryProds = products.filter((p) => p.categoryId === massCategory);
      let count = 0;
      for (const p of categoryProds) {
        const discounted = Math.round(p.basePrice * (1 - percent / 100) * 100) / 100;
        await fetch(`/api/admin/products/${p.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ basePromoPrice: discounted }),
        });
        count++;
      }
      showToast(`Promoção de ${percent}% aplicada a ${count} produto(s) da categoria!`);
      fetchProductsAndCategories();
    } catch {
      alert('Erro ao aplicar promoção em massa');
    } finally {
      setMassApplying(false);
    }
  };

  const handleRemoveMassPromo = async () => {
    if (!massCategory) {
      alert('Selecione uma categoria');
      return;
    }
    setMassApplying(true);
    try {
      const categoryProds = products.filter((p) => p.categoryId === massCategory && p.basePromoPrice !== null);
      let count = 0;
      for (const p of categoryProds) {
        await fetch(`/api/admin/products/${p.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ basePromoPrice: null }),
        });
        count++;
      }
      showToast(`Promoções removidas de ${count} produto(s) da categoria!`);
      fetchProductsAndCategories();
    } catch {
      alert('Erro ao remover promoções em massa');
    } finally {
      setMassApplying(false);
    }
  };

  // --- Coupon Actions ---
  const toggleCouponStatus = async (coupon: CouponData) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !coupon.active }),
      });
      if (res.ok) {
        showToast(coupon.active ? `Cupom ${coupon.code} inativado` : `Cupom ${coupon.code} ativado!`);
        fetchCoupons();
      }
    } catch (e) { console.error(e); }
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm('Deseja excluir este cupom?')) return;
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
      if (res.ok) { showToast('Cupom excluído'); fetchCoupons(); }
    } catch (e) { console.error(e); }
  };

  const handleSaveCoupon = async () => {
    if (!couponForm.code.trim()) { setCouponError('Digite o código do cupom'); return; }
    setSavingCoupon(true); setCouponError(null);
    try {
      const url = editingCouponId ? `/api/admin/coupons/${editingCouponId}` : '/api/admin/coupons';
      const method = editingCouponId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...couponForm, maxUses: couponForm.maxUses ? Number(couponForm.maxUses) : null }),
      });
      const data = await res.json();
      if (!res.ok) { setCouponError(data.error || 'Erro ao salvar cupom'); return; }
      showToast(editingCouponId ? 'Cupom atualizado!' : 'Novo cupom criado!');
      setCouponModalOpen(false); setEditingCouponId(null); fetchCoupons();
    } catch { setCouponError('Erro de conexão'); } finally { setSavingCoupon(false); }
  };

  // --- Banner Actions ---
  const toggleBannerStatus = async (banner: BannerData) => {
    try {
      const res = await fetch(`/api/admin/banners/${banner.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !banner.active }),
      });
      if (res.ok) { showToast(banner.active ? 'Banner inativado' : 'Banner ativado!'); fetchBanners(); }
    } catch (e) { console.error(e); }
  };

  const deleteBanner = async (id: string) => {
    if (!confirm('Deseja excluir este banner?')) return;
    try {
      const res = await fetch(`/api/admin/banners/${id}`, { method: 'DELETE' });
      if (res.ok) { showToast('Banner excluído'); fetchBanners(); }
    } catch (e) { console.error(e); }
  };

  const handleSaveBanner = async () => {
    if (!bannerForm.title.trim() || !bannerForm.imageUrl) {
      alert('Preencha o título e faça upload da imagem');
      return;
    }
    setSavingBanner(true);
    try {
      const url = editingBannerId ? `/api/admin/banners/${editingBannerId}` : '/api/admin/banners';
      const method = editingBannerId ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method, headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bannerForm),
      });
      if (res.ok) {
        showToast(editingBannerId ? 'Banner atualizado!' : 'Novo banner cadastrado!');
        setBannerModalOpen(false); setEditingBannerId(null); fetchBanners();
      }
    } catch (e) { console.error(e); } finally { setSavingBanner(false); }
  };

  // --- Rule Actions ---
  const toggleRuleStatus = async (rule: PromotionRuleData) => {
    try {
      const res = await fetch(`/api/admin/promotion-rules/${rule.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !rule.active }),
      });
      if (res.ok) { showToast(rule.active ? 'Promoção inativada' : 'Promoção ativada!'); fetchRules(); }
    } catch (e) { console.error(e); }
  };

  const deleteRule = async (id: string) => {
    if (!confirm('Deseja excluir esta regra?')) return;
    try {
      const res = await fetch(`/api/admin/promotion-rules/${id}`, { method: 'DELETE' });
      if (res.ok) { showToast('Promoção excluída'); fetchRules(); }
    } catch (e) { console.error(e); }
  };

  const handleSaveRule = async () => {
    if (!ruleForm.title.trim()) return;
    setSavingRule(true);
    try {
      const res = await fetch('/api/admin/promotion-rules', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ruleForm),
      });
      if (res.ok) { showToast('Nova promoção criada!'); setRuleModalOpen(false); fetchRules(); }
    } catch (e) { console.error(e); } finally { setSavingRule(false); }
  };

  // Filtered Products for Showcase
  const filteredProducts = products.filter((p) => {
    if (productSearch) {
      const q = productSearch.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q)) return false;
    }
    if (selectedCategoryFilter && p.categoryId !== selectedCategoryFilter) return false;
    if (promoFilterOnly && !p.basePromoPrice) return false;
    return true;
  });

  const activePromoCount = products.filter((p) => p.basePromoPrice && p.basePromoPrice < p.basePrice).length;

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 rounded-2xl bg-purple-600 px-5 py-3 text-white text-xs font-black shadow-xl flex items-center gap-2">
          <CheckCircle className="h-4 w-4" />
          <span>{notification}</span>
        </div>
      )}

      {/* Header & Tabs */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            PAINEL DE CONTROLE • BANNERS & PROMOÇÕES
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
            Gestor de Ofertas & Banners
          </h1>
        </div>

        {/* Tab Navigation Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveTab('promoProducts')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'promoProducts'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            <span>Vitrine em Oferta ({activePromoCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'coupons'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="h-3.5 w-3.5" />
            <span>Cupons ({coupons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('banners')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'banners'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ImageIcon className="h-3.5 w-3.5" />
            <span>Banners ({banners.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
              activeTab === 'rules'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Truck className="h-3.5 w-3.5" />
            <span>Frete Grátis & Regras</span>
          </button>
        </div>
      </div>

      {/* TAB 1: VITRINE DE PRODUTOS EM PROMOÇÃO (SHOWCASE MANAGER) */}
      {activeTab === 'promoProducts' && (
        <div className="space-y-6">
          {/* Mass Category Promotion Tool */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-400" />
              <h3 className="text-base font-black uppercase tracking-wider">
                ⚡ Desconto em Massa por Categoria
              </h3>
            </div>
            <p className="text-xs text-purple-200 max-w-2xl">
              Aplique uma porcentagem de desconto promocional em todos os produtos de uma categoria de uma só vez com 1 clique!
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <select
                value={massCategory}
                onChange={(e) => setMassCategory(e.target.value)}
                className="rounded-xl border border-purple-400/30 bg-slate-800 px-4 py-2.5 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Selecione a Categoria...</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 bg-slate-800 px-3 py-2 rounded-xl border border-purple-400/30 text-xs font-bold text-white w-32">
                <span>Desconto:</span>
                <input
                  type="number"
                  value={massPercent}
                  onChange={(e) => setMassPercent(e.target.value)}
                  className="w-10 bg-transparent text-center font-extrabold focus:outline-none text-purple-300"
                />
                <span>%</span>
              </div>

              <button
                onClick={handleApplyMassPromo}
                disabled={massApplying}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-5 py-2.5 shadow-md transition-all disabled:opacity-50"
              >
                {massApplying ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                <span>Aplicar Oferta na Categoria</span>
              </button>

              <button
                onClick={handleRemoveMassPromo}
                disabled={massApplying}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white font-bold text-xs px-4 py-2.5 transition-all disabled:opacity-50"
              >
                <span>Limpar Ofertas da Categoria</span>
              </button>
            </div>
          </div>

          {/* Product Search & Filter Bar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar produto por nome ou marca..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-purple-600"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
              >
                <option value="">Todas as Categorias</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <label className="flex items-center gap-2 cursor-pointer bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl text-xs font-bold text-amber-900">
                <input
                  type="checkbox"
                  checked={promoFilterOnly}
                  onChange={(e) => setPromoFilterOnly(e.target.checked)}
                  className="rounded text-amber-600"
                />
                <span>Apenas em Oferta</span>
              </label>
            </div>
          </div>

          {/* Products Showcase Grid */}
          {loadingProducts ? (
            <div className="flex items-center justify-center py-16 text-slate-400 gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-xs font-semibold">Carregando catálogo de produtos...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-2">
              <Package className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Nenhum produto encontrado</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((p) => {
                const isPromo = Boolean(p.basePromoPrice && p.basePromoPrice < p.basePrice);
                const currentInputValue = inlinePromoPrices[p.id] !== undefined ? inlinePromoPrices[p.id] : (p.basePromoPrice ? String(p.basePromoPrice) : '');
                const discount = isPromo ? Math.round(((p.basePrice - p.basePromoPrice!) / p.basePrice) * 100) : 0;

                return (
                  <div
                    key={p.id}
                    className={`bg-white rounded-3xl border p-4 shadow-xs transition-all space-y-4 flex flex-col justify-between ${
                      isPromo ? 'border-amber-400 ring-1 ring-amber-400/20 bg-amber-50/20' : 'border-slate-200'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top status */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 truncate max-w-[150px]">
                          {p.category?.name || 'Geral'}
                        </span>
                        {isPromo ? (
                          <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                            <Flame className="h-3 w-3 fill-current" />
                            <span>-{discount}% OFF</span>
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            Sem Oferta
                          </span>
                        )}
                      </div>

                      {/* Product details */}
                      <div className="flex items-center gap-3">
                        <img
                          src={getCleanImageUrl(p.mainImageUrl)}
                          alt={p.name}
                          className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                            {p.name}
                          </h4>
                          <div className="text-xs text-slate-500 mt-1">
                            Preço Normal: <strong className="text-slate-800">{formatCurrency(p.basePrice)}</strong>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Inline Promo Price Input & Quick Controls */}
                    <div className="pt-3 border-t border-slate-100 space-y-2">
                      <label className="block text-[11px] font-bold text-slate-700">
                        Preço Promocional (R$):
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Ex: 89,90"
                          value={currentInputValue}
                          onChange={(e) =>
                            setInlinePromoPrices({ ...inlinePromoPrices, [p.id]: e.target.value })
                          }
                          className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-purple-600"
                        />

                        <button
                          onClick={() => {
                            const parsed = parseNumber(currentInputValue);
                            updateProductPromo(p.id, parsed);
                          }}
                          disabled={updatingProductId === p.id}
                          className="px-3 py-2 rounded-xl bg-purple-600 text-white font-black text-xs hover:bg-purple-500 shadow-xs transition-colors shrink-0 disabled:opacity-50"
                        >
                          {updatingProductId === p.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Salvar'}
                        </button>

                        {isPromo && (
                          <button
                            onClick={() => updateProductPromo(p.id, null)}
                            disabled={updatingProductId === p.id}
                            className="px-2.5 py-2 rounded-xl bg-red-50 text-red-600 font-bold text-xs hover:bg-red-100 transition-colors shrink-0"
                            title="Remover oferta"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CUPONS DE DESCONTO */}
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
                  code: '', discountType: 'PERCENTAGE', discountValue: 10, minOrderValue: 0,
                  freeShipping: false, maxUses: '', active: true,
                });
                setCouponError(null); setCouponModalOpen(true);
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
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    coupon.active ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-purple-100 text-purple-900 text-xs font-black font-mono border border-purple-200">
                        <Tag className="h-3.5 w-3.5 text-purple-600" />
                        <span>{coupon.code}</span>
                      </div>

                      <button
                        onClick={() => toggleCouponStatus(coupon)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                          coupon.active ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {coupon.active ? 'ATIVO' : 'INATIVO'}
                      </button>
                    </div>

                    <div className="text-base font-black text-slate-900">
                      {coupon.discountType === 'PERCENTAGE' && `${coupon.discountValue}% OFF`}
                      {coupon.discountType === 'FIXED_AMOUNT' && `${formatCurrency(coupon.discountValue)} OFF`}
                      {coupon.discountType === 'FREE_SHIPPING' && 'Frete Grátis na Cidade'}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <span>Usos: <strong>{coupon.usedCount}</strong></span>
                    <button onClick={() => deleteCoupon(coupon.id)} className="text-slate-400 hover:text-red-600 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BANNERS PROMOCIONAIS */}
      {activeTab === 'banners' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                Banners Promocionais da Loja
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Cadastre banners de destaque para exibir no topo da loja e na central de promoções.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingBannerId(null);
                setBannerForm({ title: '', description: '', imageUrl: '', link: '', active: true, displayOrder: 0 });
                setBannerModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-xs font-black text-white hover:bg-purple-500 shadow-lg transition-all shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>Novo Banner Promocional</span>
            </button>
          </div>

          {loadingBanners ? (
            <div className="flex items-center justify-center py-12 text-slate-400 gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              <span className="text-xs font-semibold">Carregando banners...</span>
            </div>
          ) : banners.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 space-y-2">
              <ImageIcon className="h-8 w-8 mx-auto text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Nenhum banner cadastrado ainda</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((b) => (
                <div
                  key={b.id}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-xs space-y-3 flex flex-col justify-between ${
                    b.active ? 'border-slate-200' : 'border-slate-200 opacity-60'
                  }`}
                >
                  <div className="relative aspect-[21/9] w-full bg-slate-100">
                    <img src={getCleanImageUrl(b.imageUrl)} alt={b.title} className="h-full w-full object-cover" />
                    <button
                      onClick={() => toggleBannerStatus(b)}
                      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-black shadow-md ${
                        b.active ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {b.active ? 'ATIVO' : 'INATIVO'}
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <h4 className="text-sm font-black text-slate-900">{b.title}</h4>
                    {b.description && <p className="text-xs text-slate-500">{b.description}</p>}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">Link: {b.link || 'Nenhum'}</span>
                      <button onClick={() => deleteBanner(b.id)} className="text-slate-400 hover:text-red-600 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: REGRAS DE FRETE GRÁTIS */}
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
              className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-5 py-3 text-xs font-black text-white hover:bg-purple-500 shadow-lg transition-all shrink-0"
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
              <p className="text-sm font-bold text-slate-700">Nenhuma regra ativa criada</p>
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
                    <button onClick={() => deleteRule(rule.id)} className="text-slate-400 hover:text-red-600 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: NOVO BANNER */}
      {bannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editingBannerId ? 'Editar Banner' : 'Novo Banner Promocional'}
              </h3>
              <button onClick={() => setBannerModalOpen(false)} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Título do Banner *</label>
                <input
                  type="text"
                  placeholder="Ex: Ofertas de Inverno 30% OFF"
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Descrição / Subtítulo</label>
                <input
                  type="text"
                  placeholder="Ex: Válido para toda a linha de Pods"
                  value={bannerForm.description}
                  onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Imagem do Banner *</label>
                <ImageUploadInput
                  label="Imagem do Banner"
                  value={bannerForm.imageUrl}
                  onChange={(url) => setBannerForm({ ...bannerForm, imageUrl: url })}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Link de Destino (Opcional)</label>
                <input
                  type="text"
                  placeholder="Ex: /promotions ou /search?category=pods"
                  value={bannerForm.link}
                  onChange={(e) => setBannerForm({ ...bannerForm, link: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:outline-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={bannerForm.active}
                  onChange={(e) => setBannerForm({ ...bannerForm, active: e.target.checked })}
                  className="rounded text-purple-600"
                />
                <span className="text-xs font-bold text-slate-800">Banner Ativo</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setBannerModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Cancelar</button>
              <button
                onClick={handleSaveBanner}
                disabled={savingBanner}
                className="px-5 py-2 rounded-xl text-xs font-black text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-2 disabled:opacity-50"
              >
                {savingBanner ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Salvar Banner</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NOVO CUPOM */}
      {couponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">{editingCouponId ? 'Editar Cupom' : 'Novo Cupom de Desconto'}</h3>
              <button onClick={() => setCouponModalOpen(false)} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
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
                  placeholder="Ex: HENRI10"
                  value={couponForm.code}
                  onChange={(e) => setCouponForm({ ...couponForm, code: e.target.value.toUpperCase() })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm font-mono font-bold text-slate-900 uppercase focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tipo</label>
                  <select
                    value={couponForm.discountType}
                    onChange={(e) => setCouponForm({ ...couponForm, discountType: e.target.value as any })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none"
                  >
                    <option value="PERCENTAGE">Porcentagem (%)</option>
                    <option value="FIXED_AMOUNT">Valor Fixo (R$)</option>
                    <option value="FREE_SHIPPING">Frete Grátis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Valor</label>
                  <input
                    type="number"
                    disabled={couponForm.discountType === 'FREE_SHIPPING'}
                    value={couponForm.discountValue}
                    onChange={(e) => setCouponForm({ ...couponForm, discountValue: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none disabled:opacity-40"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={couponForm.active}
                  onChange={(e) => setCouponForm({ ...couponForm, active: e.target.checked })}
                  className="rounded text-purple-600"
                />
                <span className="text-xs font-bold text-slate-800">Cupom Ativo</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setCouponModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Cancelar</button>
              <button
                onClick={handleSaveCoupon}
                disabled={savingCoupon}
                className="px-5 py-2 rounded-xl text-xs font-black text-white bg-purple-600 hover:bg-purple-500 disabled:opacity-50 flex items-center gap-2"
              >
                {savingCoupon ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                <span>Salvar Cupom</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: NOVA REGRA */}
      {ruleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">Nova Promoção / Frete Grátis</h3>
              <button onClick={() => setRuleModalOpen(false)} className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center">
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
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Selo / Badge de Destaque</label>
                <input
                  type="text"
                  placeholder="Ex: FRETE GRÁTIS CIDADE"
                  value={ruleForm.badgeText}
                  onChange={(e) => setRuleForm({ ...ruleForm, badgeText: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
              <button onClick={() => setRuleModalOpen(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Cancelar</button>
              <button
                onClick={handleSaveRule}
                disabled={savingRule}
                className="px-5 py-2 rounded-xl text-xs font-black text-white bg-purple-600 hover:bg-purple-500 flex items-center gap-2"
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
