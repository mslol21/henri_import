'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreConfigData } from '@/types';

const defaultConfig: StoreConfigData = {
  id: 'default',
  name: 'Henri Imports',
  logoUrl: '/logo.png',
  bannerUrl: '/images/hero-banner.png',
  primaryColor: '#0284c7', // Sky Blue
  secondaryColor: '#f0f9ff', // Light Sky Blue
  textColor: '#0f172a',
  whatsapp: '5511999999999',
  instagram: '@henri_imports',
  facebook: 'henriimportsoficial',
  address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
  latitude: -23.5616,
  longitude: -46.656,
  cep: '01310-100',
  businessHours: 'Segunda a Sábado: 10h às 22h | Domingo: 12h às 18h',
  deliveryMode: 'FAIXAS',
  deliveryKmRate: 2.5,
  deliveryRanges: [
    { minKm: 0, maxKm: 3, price: 5.0 },
    { minKm: 3, maxKm: 6, price: 8.0 },
    { minKm: 6, maxKm: 10, price: 12.0 },
    { minKm: 10, maxKm: 15, price: 18.0 },
  ],
  pixKey: '11999999999',
  pixName: 'Henri Imports LTDA',
  whatsappTemplate: 'Novo Pedido Henri Imports',
};

interface ConfigContextType {
  config: StoreConfigData;
  updateConfig: (newConfig: Partial<StoreConfigData>) => void;
  refreshConfig: () => Promise<void>;
}

const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
  refreshConfig: async () => {},
});

export function ConfigProvider({ children, initialConfig }: { children: React.ReactNode; initialConfig?: StoreConfigData | null }) {
  const [config, setConfig] = useState<StoreConfigData>(initialConfig || defaultConfig);

  const refreshConfig = async () => {
    try {
      const res = await fetch('/api/settings', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data && data.deliveryRanges) {
          setConfig((prev) => ({ ...prev, ...data }));
        }
      }
    } catch (err) {
      console.warn('Error refreshing live store settings:', err);
    }
  };

  useEffect(() => {
    refreshConfig();
  }, []);

  const updateConfig = (newConfig: Partial<StoreConfigData>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && config) {
      document.documentElement.style.setProperty('--color-primary', config.primaryColor);
      document.documentElement.style.setProperty('--color-secondary', config.secondaryColor);
    }
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, updateConfig, refreshConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
