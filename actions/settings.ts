'use server';

import { db } from '@/lib/db';
import { mockConfig } from '@/lib/mockData';
import { StoreConfigData } from '@/types';

export async function getStoreConfig(): Promise<StoreConfigData> {
  try {
    const config = await db.storeConfig.findUnique({
      where: { id: 'default' },
    });

    if (config) {
      return {
        id: config.id,
        name: config.name,
        logoUrl: config.logoUrl,
        bannerUrl: config.bannerUrl,
        primaryColor: config.primaryColor,
        secondaryColor: config.secondaryColor,
        textColor: config.textColor,
        whatsapp: config.whatsapp,
        instagram: config.instagram,
        facebook: config.facebook,
        address: config.address,
        latitude: config.latitude,
        longitude: config.longitude,
        cep: config.cep,
        businessHours: config.businessHours,
        deliveryMode: config.deliveryMode as 'FAIXAS' | 'KM',
        deliveryKmRate: config.deliveryKmRate,
        deliveryRanges: (config.deliveryRanges as any) || mockConfig.deliveryRanges,
        pixKey: config.pixKey,
        pixName: config.pixName,
        whatsappTemplate: config.whatsappTemplate,
        wholesalePassword: config.wholesalePassword,
      };
    }
  } catch (err) {
    console.warn('Database offline, using mock store config fallback');
  }

  return mockConfig;
}

export async function updateStoreConfig(data: Partial<StoreConfigData>) {
  try {
    const updated = await db.storeConfig.upsert({
      where: { id: 'default' },
      update: {
        ...data,
        deliveryRanges: data.deliveryRanges ? (data.deliveryRanges as any) : undefined,
      },
      create: {
        id: 'default',
        name: data.name || mockConfig.name,
        logoUrl: data.logoUrl || mockConfig.logoUrl,
        bannerUrl: data.bannerUrl || mockConfig.bannerUrl,
        primaryColor: data.primaryColor || mockConfig.primaryColor,
        secondaryColor: data.secondaryColor || mockConfig.secondaryColor,
        textColor: data.textColor || mockConfig.textColor,
        whatsapp: data.whatsapp || mockConfig.whatsapp,
        address: data.address || mockConfig.address,
        latitude: data.latitude ?? mockConfig.latitude,
        longitude: data.longitude ?? mockConfig.longitude,
        cep: data.cep || mockConfig.cep,
        businessHours: data.businessHours || mockConfig.businessHours,
        deliveryMode: data.deliveryMode || mockConfig.deliveryMode,
        deliveryKmRate: data.deliveryKmRate ?? mockConfig.deliveryKmRate,
        deliveryRanges: (data.deliveryRanges as any) || mockConfig.deliveryRanges,
        pixKey: data.pixKey,
        pixName: data.pixName,
        whatsappTemplate: data.whatsappTemplate || mockConfig.whatsappTemplate,
        wholesalePassword: data.wholesalePassword,
      },
    });

    return { success: true, config: updated };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
