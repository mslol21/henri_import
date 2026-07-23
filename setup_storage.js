const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Criando bucket no Supabase Storage via SQL...');
    
    // Create the bucket
    await prisma.$executeRawUnsafe(`
      INSERT INTO storage.buckets (id, name, public) 
      VALUES ('products', 'products', true) 
      ON CONFLICT (id) DO UPDATE SET public = true;
    `);
    
    console.log('Bucket "products" garantido.');

    // Drop policy if exists to recreate
    try {
      await prisma.$executeRawUnsafe(`DROP POLICY IF EXISTS "products_public_all" ON storage.objects;`);
    } catch(e) {}

    // Create policy for all operations
    await prisma.$executeRawUnsafe(`
      CREATE POLICY "products_public_all" 
      ON storage.objects 
      FOR ALL 
      USING (bucket_id = 'products') 
      WITH CHECK (bucket_id = 'products');
    `);
    
    console.log('Políticas de segurança aplicadas com sucesso!');
  } catch (error) {
    console.error('Erro ao configurar storage:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
