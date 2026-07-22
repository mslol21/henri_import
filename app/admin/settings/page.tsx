'use client';

import React, { useState } from 'react';
import { useConfig } from '@/contexts/ConfigContext';
import { updateStoreConfig } from '@/actions/settings';
import { StoreConfigData } from '@/types';
import {
  Settings,
  Save,
  Palette,
  MapPin,
  Truck,
  Phone,
  QrCode,
  CheckCircle,
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { config, updateConfig } = useConfig();
  const [formData, setFormData] = useState<StoreConfigData>(config);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field: keyof StoreConfigData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await updateStoreConfig(formData);
    setSaving(false);

    if (res.success) {
      updateConfig(formData);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
          CONFIGURAÇÃO SISTÊMICA & WHITE LABEL
        </span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight sm:text-3xl mt-0.5">
          Configurações da Loja
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Altere a identidade visual (cores, logo), opções de entrega e chaves de pagamento em tempo real.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg animate-bounce">
          <CheckCircle className="h-5 w-5" />
          <span>Configurações salvas e aplicadas a toda a loja com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* 1. Identidade Visual White Label */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Palette className="h-4 w-4 text-purple-600" />
            <span>Identidade Visual & Tema White Label</span>
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
        </div>

        {/* 2. Endereço da Loja & Coordenadas */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <MapPin className="h-4 w-4 text-purple-600" />
            <span>Endereço da Loja & Geolocalização</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Endereço Completo</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">CEP de Origem</label>
              <input
                type="text"
                value={formData.cep}
                onChange={(e) => handleChange('cep', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Latitude da Loja</label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => handleChange('latitude', parseFloat(e.target.value))}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs text-slate-900 font-mono focus:border-purple-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Longitude da Loja</label>
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

        {/* 3. Regras de Entrega (Modo 1: Faixas vs Modo 2: Valor por KM) */}
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
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">Faixas de Preço por Distância</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {formData.deliveryRanges.map((range, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                      <span className="font-bold text-slate-900 block">Até {range.maxKm} km</span>
                      <span className="text-purple-600 font-extrabold">R$ {range.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Contatos & WhatsApp */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
            <Phone className="h-4 w-4 text-purple-600" />
            <span>Contatos & Redes Sociais</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp da Loja</label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => handleChange('whatsapp', e.target.value)}
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
        </div>

        {/* Save button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-8 py-4 text-sm font-black text-white shadow-xl shadow-purple-600/30 hover:bg-purple-500 transition-all"
          >
            <Save className="h-5 w-5" />
            <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
