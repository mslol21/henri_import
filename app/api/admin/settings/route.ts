import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';

// GET — retorna config atual do banco
export async function GET() {
  try {
    const config = await db.storeConfig.findUnique({
      where: { id: 'default' },
    });

    if (!config) {
      return NextResponse.json({ error: 'Config not found' }, { status: 404 });
    }

    return NextResponse.json(config);
  } catch (err: any) {
    console.error('GET /api/admin/settings error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PATCH — salva config
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    // Remove fields that cannot be updated
    const { id, createdAt, updatedAt, ...rest } = body;

    const allowedFields = [
      'name', 'logoUrl', 'bannerUrl', 'primaryColor', 'secondaryColor', 'textColor',
      'whatsapp', 'instagram', 'facebook', 'address', 'latitude', 'longitude', 'cep',
      'businessHours', 'deliveryMode', 'deliveryKmRate', 'deliveryRanges',
      'pixKey', 'pixName', 'whatsappTemplate', 'wholesalePassword',
    ];

    const updateData: Record<string, any> = {};
    for (const key of allowedFields) {
      if (rest[key] !== undefined) {
        updateData[key] = rest[key];
      }
    }

    const updated = await db.storeConfig.upsert({
      where: { id: 'default' },
      update: updateData,
      create: {
        id: 'default',
        name: rest.name || 'Henri Imports',
        primaryColor: rest.primaryColor || '#0284c7',
        secondaryColor: rest.secondaryColor || '#f0f9ff',
        textColor: rest.textColor || '#0f172a',
        whatsapp: rest.whatsapp || '5511999999999',
        address: rest.address || 'Av. Paulista, 1000 - São Paulo, SP',
        latitude: rest.latitude ?? -23.5616,
        longitude: rest.longitude ?? -46.656,
        cep: rest.cep || '01310-100',
        businessHours: rest.businessHours || 'Segunda a Sábado: 10h às 22h',
        deliveryMode: rest.deliveryMode || 'FAIXAS',
        deliveryKmRate: rest.deliveryKmRate ?? 2.5,
        deliveryRanges: rest.deliveryRanges || [
          { maxKm: 3, price: 10 },
          { maxKm: 5, price: 15 },
          { maxKm: 8, price: 20 },
          { maxKm: 15, price: 30 },
        ],
        whatsappTemplate: rest.whatsappTemplate || 'Novo Pedido',
        ...updateData,
      },
    });

    return NextResponse.json({ success: true, config: updated });
  } catch (err: any) {
    console.error('PATCH /api/admin/settings error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
