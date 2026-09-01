import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { mockConfig } from '@/lib/mockData';

export const revalidate = 60; // Cache Edge response for 60 seconds

export async function GET() {
  try {
    const config = await db.storeConfig.findUnique({
      where: { id: 'default' },
    });

    if (config) {
      return NextResponse.json(
        {
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
          deliveryMode: config.deliveryMode,
          deliveryKmRate: config.deliveryKmRate,
          deliveryRanges: config.deliveryRanges,
          pixKey: config.pixKey,
          pixName: config.pixName,
          whatsappTemplate: config.whatsappTemplate,
          wholesalePassword: config.wholesalePassword,
        },
        {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
          },
        }
      );
    }
  } catch (err: any) {
    console.error('GET /api/settings error:', err);
  }

  return NextResponse.json(mockConfig);
}
