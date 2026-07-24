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
    // Remove 'id' — Prisma can't update the primary key
    const { id, ...rest } = data as any;

    const updateData: Record<string, any> = {};
    const allowedFields = [
      'name', 'logoUrl', 'bannerUrl', 'primaryColor', 'secondaryColor', 'textColor',
      'whatsapp', 'instagram', 'facebook', 'address', 'latitude', 'longitude', 'cep',
      'businessHours', 'deliveryMode', 'deliveryKmRate', 'pixKey', 'pixName',
      'whatsappTemplate', 'wholesalePassword',
    ];

    for (const key of allowedFields) {
      if (rest[key] !== undefined) {
        updateData[key] = rest[key];
      }
    }

    // deliveryRanges needs special handling (Json field)
    if (rest.deliveryRanges !== undefined) {
      updateData.deliveryRanges = rest.deliveryRanges as any;
    }

    const updated = await db.storeConfig.upsert({
      where: { id: 'default' },
      update: updateData,
      create: {
        id: 'default',
        name: rest.name || mockConfig.name,
        logoUrl: rest.logoUrl || mockConfig.logoUrl,
        bannerUrl: rest.bannerUrl || mockConfig.bannerUrl,
        primaryColor: rest.primaryColor || mockConfig.primaryColor,
        secondaryColor: rest.secondaryColor || mockConfig.secondaryColor,
        textColor: rest.textColor || mockConfig.textColor,
        whatsapp: rest.whatsapp || mockConfig.whatsapp,
        address: rest.address || mockConfig.address,
        latitude: rest.latitude ?? mockConfig.latitude,
        longitude: rest.longitude ?? mockConfig.longitude,
        cep: rest.cep || mockConfig.cep,
        businessHours: rest.businessHours || mockConfig.businessHours,
        deliveryMode: rest.deliveryMode || mockConfig.deliveryMode,
        deliveryKmRate: rest.deliveryKmRate ?? mockConfig.deliveryKmRate,
        deliveryRanges: (rest.deliveryRanges as any) || mockConfig.deliveryRanges,
        pixKey: rest.pixKey,
        pixName: rest.pixName,
        whatsappTemplate: rest.whatsappTemplate || mockConfig.whatsappTemplate,
        wholesalePassword: rest.wholesalePassword,
      },
    });

    return { success: true, config: updated };
  } catch (err: any) {
    console.error('updateStoreConfig error:', err);
    return { success: false, error: err.message };
  }
}
