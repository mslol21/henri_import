'use client';

import React, { useState } from 'react';
import { StoreConfigData } from '@/types';
import {
  Save,
  Palette,
  MapPin,
  Truck,
  Phone,
  CheckCircle,
  Lock,
  AlertCircle,
  Loader2,
  Search,
} from 'lucide-react';

import WholesaleShareModal from '@/components/admin/WholesaleShareModal';

export default function SettingsForm({ initialConfig }: { initialConfig: StoreConfigData }) {
  const [formData, setFormData] = useState<StoreConfigData>(initialConfig);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState<string | null>(null);

  const handleChange = (field: keyof StoreConfigData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCepLookup = async (cepRaw: string) => {
    const cep = cepRaw.replace(/\D/g, '');
    if (cep.length !== 8) return;

    setCepLoading(true);
    setCepError(null);

    try {
      // 1. Lookup address via ViaCEP
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setCepError('CEP não encontrado.');
        return;
      }

      // Build full address string
      const fullAddress = [
        data.logradouro,
        data.bairro,
        data.localidade,
        data.uf,
      ].filter(Boolean).join(', ');

      setFormData((prev) => ({
        ...prev,
        address: fullAddress,
        cep: cepRaw,
      }));

      // 2. Try geocoding to get lat/lng via Nominatim (OpenStreetMap)
      try {
        const geoRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress + ', Brasil')}&format=json&limit=1`,
          { headers: { 'Accept-Language': 'pt-BR' } }
        );
        const geoData = await geoRes.json();
        if (geoData && geoData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            latitude: parseFloat(geoData[0].lat),
            longitude: parseFloat(geoData[0].lon),
          }));
        }
      } catch {
        // Geocoding failed silently — address is still filled
      }
    } catch (err) {
      setCepError('Erro ao buscar CEP. Tente novamente.');
    } finally {
      setCepLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setSaveError(data.error || 'Erro desconhecido ao salvar.');
      }
    } catch (err: any) {
      setSaveError('Erro de conexão: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          CONFIGURAÇÃO SISTÊMICA &amp; WHITE LABEL
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
          Configurações da Loja
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Altere a identidade visual (cores, logo), opções de entrega e chaves de pagamento em tempo real.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg">
          <CheckCircle className="h-5 w-5 shrink-0" />
          <span>Configurações salvas com sucesso no banco de dados!</span>
        </div>
      )}

      {saveError && (
        <div className="p-4 rounded-2xl bg-red-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Erro ao salvar: {saveError}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Identidade Visual */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Palette className="h-4 w-4 text-purple-600" />
            <span>Identidade Visual &amp; Tema White Label</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nome da Loja</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cor Principal (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="h-9 w-12 rounded-lg border border-slate-300 p-0.5 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.primaryColor}
                  onChange={(e) => handleChange('primaryColor', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 font-mono focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Cor Secundária (Hex)</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={formData.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="h-9 w-12 rounded-lg border border-slate-300 p-0.5 cursor-pointer"
                />
                <input
                  type="text"
                  value={formData.secondaryColor}
                  onChange={(e) => handleChange('secondaryColor', e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 font-mono focus:border-purple-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Logo URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">URL da Logo</label>
              <input
                type="text"
                value={formData.logoUrl || ''}
                onChange={(e) => handleChange('logoUrl', e.target.value)}
                placeholder="/logo.png ou https://..."
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Horário de Funcionamento</label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => handleChange('businessHours', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Endereço */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="h-4 w-4 text-purple-600" />
            <span>Endereço da Loja &amp; Geolocalização</span>
          </h3>

          {/* CEP lookup first */}
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                CEP de Origem
                <span className="ml-1 text-purple-600 font-normal">(preencha para buscar endereço automaticamente)</span>
              </label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => handleChange('cep', e.target.value)}
                onBlur={(e) => handleCepLookup(e.target.value)}
                placeholder="00000-000"
                maxLength={9}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-purple-600 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => handleCepLookup(formData.cep)}
              disabled={cepLoading}
              className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-700 transition-all disabled:opacity-60 shrink-0"
            >
              {cepLoading ? (
                <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Buscando...</>
              ) : (
                <><Search className="h-3.5 w-3.5" /> Buscar CEP</>
              )}
            </button>
          </div>

          {cepError && (
            <p className="text-xs text-red-600 font-semibold">{cepError}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Endereço Completo</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder="Preenchido automaticamente ao buscar o CEP"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Latitude <span className="text-slate-400 font-normal">(preenchida automaticamente)</span></label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => handleChange('longitude', parseFloat(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 3. Regras de Entrega */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Truck className="h-4 w-4 text-purple-600" />
            <span>Regras de Cálculo de Entrega (Delivery)</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Modo de Cálculo</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="radio"
                    name="deliveryMode"
                    value="FAIXAS"
                    checked={formData.deliveryMode === 'FAIXAS'}
                    onChange={() => handleChange('deliveryMode', 'FAIXAS')}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span>Modo 1: Faixas de Distância (Ex: Até 3km, 5km, 8km)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                  <input
                    type="radio"
                    name="deliveryMode"
                    value="KM"
                    checked={formData.deliveryMode === 'KM'}
                    onChange={() => handleChange('deliveryMode', 'KM')}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span>Modo 2: Valor Fixo por KM de Distância</span>
                </label>
              </div>
            </div>

            {formData.deliveryMode === 'KM' ? (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Valor cobrado por KM (R$)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.deliveryKmRate}
                  onChange={(e) => handleChange('deliveryKmRate', parseFloat(e.target.value))}
                  className="w-full max-w-xs rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-700">Faixas de Preço por Distância</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(formData.deliveryRanges || []).map((range, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Até (km)</label>
                        <input
                          type="number"
                          value={range.maxKm}
                          onChange={(e) => {
                            const newRanges = [...formData.deliveryRanges];
                            newRanges[idx] = { ...newRanges[idx], maxKm: Number(e.target.value) };
                            handleChange('deliveryRanges', newRanges);
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1">Valor (R$)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={range.price}
                          onChange={(e) => {
                            const newRanges = [...formData.deliveryRanges];
                            newRanges[idx] = { ...newRanges[idx], price: Number(e.target.value) };
                            handleChange('deliveryRanges', newRanges);
                          }}
                          className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleChange('deliveryRanges', [...(formData.deliveryRanges || []), { maxKm: 20, price: 40 }])}
                  className="text-xs font-bold text-purple-600 hover:text-purple-800 border border-purple-200 rounded-xl px-3 py-1.5 hover:bg-purple-50 transition-colors"
                >
                  + Adicionar Faixa
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. Contatos */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="h-4 w-4 text-purple-600" />
            <span>Contatos &amp; Redes Sociais</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp da Loja</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
                placeholder="5511999999999"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Instagram (@usuario)</label>
              <input
                type="text"
                value={formData.instagram || ''}
                onChange={(e) => handleChange('instagram', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Chave PIX</label>
              <input
                type="text"
                value={formData.pixKey || ''}
                onChange={(e) => handleChange('pixKey', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nome PIX (beneficiário)</label>
              <input
                type="text"
                value={formData.pixName || ''}
                onChange={(e) => handleChange('pixName', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Facebook</label>
              <input
                type="text"
                value={formData.facebook || ''}
                onChange={(e) => handleChange('facebook', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 5. Atacado */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Lock className="h-4 w-4 text-purple-600" />
              <span>Acesso Restrito: Atacado</span>
            </h3>
            <WholesaleShareModal variant="button" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Senha Universal do Atacado</label>
              <input
                type="text"
                placeholder="Ex: REVENDANOUVEAU"
                value={formData.wholesalePassword || ''}
                onChange={(e) => handleChange('wholesalePassword', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none font-mono font-bold"
              />
              <p className="text-[10px] text-slate-500 mt-1">
                Apenas clientes com essa senha poderão ver os preços de atacado.
              </p>
            </div>
          </div>
        </div>

        {/* Save */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-purple-600/30 hover:bg-purple-500 transition-all disabled:opacity-60"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
