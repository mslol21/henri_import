import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const products = await db.product.findMany({
      include: { flavors: true },
    });

    const report: Array<{
      productId: string;
      name: string;
      slug: string;
      issues: string[];
      fixed: boolean;
    }> = [];

    for (const product of products) {
      const issues: string[] = [];
      let needsFix = false;
      let newBasePromoPrice = product.basePromoPrice;

      // 1. Check if basePromoPrice equals wholesalePrice
      if (
        product.basePromoPrice !== null &&
        product.wholesalePrice !== null &&
        product.basePromoPrice === product.wholesalePrice
      ) {
        issues.push(
          `basePromoPrice (${product.basePromoPrice}) é igual ao wholesalePrice (${product.wholesalePrice}). Promoção de varejo removida para evitar que o varejo pague preço de atacado.`
        );
        newBasePromoPrice = null;
        needsFix = true;
      }

      // 2. Check if basePromoPrice >= basePrice
      if (product.basePromoPrice !== null && product.basePromoPrice >= product.basePrice) {
        issues.push(
          `basePromoPrice (${product.basePromoPrice}) é maior ou igual ao basePrice (${product.basePrice}). Promoção removida.`
        );
        newBasePromoPrice = null;
        needsFix = true;
      }

      // 3. Audit flavors
      const updatedFlavors: Array<{ id: string; price: number | null }> = [];
      for (const flavor of product.flavors) {
        if (
          flavor.price !== null &&
          flavor.wholesalePrice !== null &&
          flavor.price === flavor.wholesalePrice &&
          flavor.wholesalePrice < product.basePrice
        ) {
          issues.push(
            `Sabor "${flavor.name}" tinha preço de varejo (${flavor.price}) igual ao preço de atacado (${flavor.wholesalePrice}). Preço de varejo resetado para o preço base (${product.basePrice}).`
          );
          updatedFlavors.push({ id: flavor.id, price: null });
          needsFix = true;
        }
      }

      // Apply fix to DB if issues found
      if (needsFix) {
        await db.product.update({
          where: { id: product.id },
          data: { basePromoPrice: newBasePromoPrice },
        });

        for (const uf of updatedFlavors) {
          await db.flavor.update({
            where: { id: uf.id },
            data: { price: uf.price },
          });
        }
      }

      if (issues.length > 0) {
        report.push({
          productId: product.id,
          name: product.name,
          slug: product.slug,
          issues,
          fixed: needsFix,
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalAudited: products.length,
      anomaliesFound: report.length,
      report,
    });
  } catch (error: any) {
    console.error('GET /api/admin/audit-prices error:', error);
    return NextResponse.json({ error: 'Erro ao executar varredura de preços: ' + error.message }, { status: 500 });
  }
}
