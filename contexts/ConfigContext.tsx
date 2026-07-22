'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { StoreConfigData } from '@/types';

const defaultConfig: StoreConfigData = {
  id: 'default',
  name: 'Henri Imports',
  logoUrl: 'https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=400&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1600&q=80',
  primaryColor: '#7c3aed', // Purple
  secondaryColor: '#f3f4f6', // Light gray
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
    { maxKm: 3, price: 10.0 },
    { maxKm: 5, price: 15.0 },
    { maxKm: 8, price: 20.0 },
    { maxKm: 15, price: 30.0 },
  ],
  pixKey: '11999999999',
  pixName: 'Henri Imports LTDA',
  whatsappTemplate: 'Novo Pedido Henri Imports',
};

interface ConfigContextType {
  config: StoreConfigData;
  updateConfig: (newConfig: Partial<StoreConfigData>) => void;
}

const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
  updateConfig: () => {},
});

export function ConfigProvider({ children, initialConfig }: { children: React.ReactNode; initialConfig?: StoreConfigData | null }) {
  const [config, setConfig] = useState<StoreConfigData>(initialConfig || defaultConfig);

  const updateConfig = (newConfig: Partial<StoreConfigData>) => {
    setConfig((prev) => {
      const updated = { ...prev, ...newConfig };
      return updated;
    });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && config) {
      document.documentElement.style.setProperty('--color-primary', config.primaryColor);
      document.documentElement.style.setProperty('--color-secondary', config.secondaryColor);
    }
  }, [config]);

  return (
    <ConfigContext.Provider value={{ config, updateConfig }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  return useContext(ConfigContext);
}
