import React from 'react';
import { db } from '@/lib/db';
import SettingsForm from '@/components/admin/SettingsForm';
import { StoreConfigData } from '@/types';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  // Load directly from DB — avoids stale context/mock data issues
  let config: StoreConfigData | null = null;

  try {
    const raw = await db.storeConfig.findUnique({ where: { id: 'default' } });
    if (raw) {
      config = {
        id: raw.id,
        name: raw.name,
        logoUrl: raw.logoUrl,
        bannerUrl: raw.bannerUrl,
        primaryColor: raw.primaryColor,
        secondaryColor: raw.secondaryColor,
        textColor: raw.textColor,
        whatsapp: raw.whatsapp,
        instagram: raw.instagram,
        facebook: raw.facebook,
        address: raw.address,
        latitude: raw.latitude,
        longitude: raw.longitude,
        cep: raw.cep,
        businessHours: raw.businessHours,
        deliveryMode: raw.deliveryMode as 'FAIXAS' | 'KM',
        deliveryKmRate: raw.deliveryKmRate,
        deliveryRanges: (raw.deliveryRanges as any) || [],
        pixKey: raw.pixKey,
        pixName: raw.pixName,
        whatsappTemplate: raw.whatsappTemplate,
        wholesalePassword: raw.wholesalePassword,
      };
    }
  } catch (err) {
    console.error('Settings page: DB error', err);
  }

  // Fallback defaults if DB unavailable
  const fallback: StoreConfigData = {
    id: 'default',
    name: 'Henri Imports',
    logoUrl: '/logo.png',
    bannerUrl: null,
    primaryColor: '#0284c7',
    secondaryColor: '#f0f9ff',
    textColor: '#0f172a',
    whatsapp: '5511999999999',
    instagram: null,
    facebook: null,
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    latitude: -23.5616,
    longitude: -46.656,
    cep: '01310-100',
    businessHours: 'Segunda a Sábado: 10h às 22h',
    deliveryMode: 'FAIXAS',
    deliveryKmRate: 2.5,
    deliveryRanges: [
      { maxKm: 3, price: 10 },
      { maxKm: 5, price: 15 },
      { maxKm: 8, price: 20 },
      { maxKm: 15, price: 30 },
    ],
    pixKey: null,
    pixName: null,
    whatsappTemplate: 'Novo Pedido',
    wholesalePassword: null,
  };

  return <SettingsForm initialConfig={config || fallback} />;
}
