import { prisma } from '../lib/db';

async function main() {
  console.log('Seeding Supabase database...');

  // 1. Create or Update Store Config
  await prisma.storeConfig.upsert({
    where: { id: 'default' },
    update: {
      name: 'Henri Imports',
      logoUrl: '/logo.png',
      bannerUrl: '/images/hero-banner.png',
      primaryColor: '#0284c7',
      secondaryColor: '#f0f9ff',
      whatsapp: '5511999999999',
      instagram: '@henri.imports',
      facebook: 'henriimportsoficial',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
      latitude: -23.5616,
      longitude: -46.656,
      cep: '01310-100',
      businessHours: 'Segunda a Sábado: 10h às 22h | Domingo: 12h às 18h',
      deliveryMode: 'FAIXAS',
      deliveryKmRate: 2.5,
      deliveryRanges: JSON.stringify([
        { maxKm: 3, price: 10.0 },
        { maxKm: 5, price: 15.0 },
        { maxKm: 8, price: 20.0 },
        { maxKm: 15, price: 30.0 },
      ]),
      pixKey: '11999999999',
      pixName: 'Henri Imports LTDA',
    },
    create: {
      id: 'default',
      name: 'Henri Imports',
      logoUrl: '/logo.png',
      bannerUrl: '/images/hero-banner.png',
      primaryColor: '#0284c7',
      secondaryColor: '#f0f9ff',
      whatsapp: '5511999999999',
      instagram: '@henri.imports',
      facebook: 'henriimportsoficial',
      address: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP',
      latitude: -23.5616,
      longitude: -46.656,
      cep: '01310-100',
      businessHours: 'Segunda a Sábado: 10h às 22h | Domingo: 12h às 18h',
      deliveryMode: 'FAIXAS',
      deliveryKmRate: 2.5,
      deliveryRanges: JSON.stringify([
        { maxKm: 3, price: 10.0 },
        { maxKm: 5, price: 15.0 },
        { maxKm: 8, price: 20.0 },
        { maxKm: 15, price: 30.0 },
      ]),
      pixKey: '11999999999',
      pixName: 'Henri Imports LTDA',
    },
  });

  // 2. Categories
  const catPods = await prisma.category.upsert({
    where: { slug: 'pods-descartaveis' },
    update: {},
    create: {
      name: 'Pods Descartáveis',
      slug: 'pods-descartaveis',
      icon: 'Zap',
      imageUrl: '/images/ignite-main.png',
      color: '#0284c7',
      displayOrder: 1,
    },
  });

  const catVapes = await prisma.category.upsert({
    where: { slug: 'vapes-juices' },
    update: {},
    create: {
      name: 'Vapes & Juices',
      slug: 'vapes-juices',
      icon: 'Wind',
      imageUrl: '/images/elfbar-main.png',
      color: '#06b6d4',
      displayOrder: 2,
    },
  });

  const catEssencias = await prisma.category.upsert({
    where: { slug: 'essencias' },
    update: {},
    create: {
      name: 'Essências',
      slug: 'essencias',
      icon: 'Flame',
      imageUrl: '/images/essencia-zomo.png',
      color: '#38bdf8',
      displayOrder: 3,
    },
  });

  const catNarguiles = await prisma.category.upsert({
    where: { slug: 'narguiles' },
    update: {},
    create: {
      name: 'Narguilés',
      slug: 'narguiles',
      icon: 'Sparkles',
      imageUrl: '/images/triton-hookah.png',
      color: '#0369a1',
      displayOrder: 4,
    },
  });

  const catCarvoes = await prisma.category.upsert({
    where: { slug: 'carvoes' },
    update: {},
    create: {
      name: 'Carvões',
      slug: 'carvoes',
      icon: 'Box',
      imageUrl: '/images/carvao-zomo.png',
      color: '#0d9488',
      displayOrder: 5,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'sedas' },
    update: {},
    create: {
      name: 'Sedas & Sedas Flavored',
      slug: 'sedas',
      icon: 'FileText',
      imageUrl: '/images/seda-smoking.png',
      color: '#0284c7',
      displayOrder: 6,
    },
  });

  await prisma.category.upsert({
    where: { slug: 'acessorios' },
    update: {},
    create: {
      name: 'Acessórios Premium',
      slug: 'acessorios',
      icon: 'ShieldAlert',
      imageUrl: '/images/pegador-hookah.png',
      color: '#0ea5e9',
      displayOrder: 7,
    },
  });

  // 3. Create Products & Flavors
  await prisma.product.upsert({
    where: { slug: 'ignite-v250-pod-descartavel' },
    update: {},
    create: {
      name: 'Ignite V250 Pod Descartável 25000 Puffs',
      slug: 'ignite-v250-pod-descartavel',
      brand: 'Ignite',
      categoryId: catPods.id,
      description: 'O Ignite V250 traz a mais recente tecnologia em vapes descartáveis com incrível capacidade para até 25.000 puxadas, tela digital LED com medidor de e-líquido e bateria recarregável Type-C. Sabor intenso e vapor denso até a última gota.',
      basePrice: 169.9,
      basePromoPrice: 149.9,
      hasFlavors: true,
      baseStock: 45,
      baseSku: 'IGN-V250-BASE',
      internalCode: 'IGN25K',
      mainImageUrl: '/images/ignite-main.png',
      gallery: JSON.stringify([
        '/images/ignite-main.png',
        '/images/blueberry-ice.png',
        '/images/grape-ice.png',
        '/images/strawberry-kiwi.png',
        '/images/mint-ice.png',
      ]),
      weight: 0.12,
      active: true,
      flavors: {
        create: [
          {
            name: 'Blueberry Ice',
            imageUrl: '/images/blueberry-ice.png',
            price: 149.9,
            stock: 15,
            sku: 'IGN-V250-BLUEICE',
            description: 'Mirtilos frescos colhidos no ápice com um toque gelado refrescante.',
            displayOrder: 1,
          },
          {
            name: 'Grape Ice',
            imageUrl: '/images/grape-ice.png',
            price: 149.9,
            stock: 12,
            sku: 'IGN-V250-GRAPEICE',
            description: 'Uva roxa suculenta com mentol glacial premium.',
            displayOrder: 2,
          },
          {
            name: 'Strawberry Kiwi',
            imageUrl: '/images/strawberry-kiwi.png',
            price: 154.9,
            stock: 8,
            sku: 'IGN-V250-STRAWKIWI',
            description: 'Associação perfeita entre morango doce e kiwi levemente cítrico.',
            displayOrder: 3,
          },
          {
            name: 'Mint Ice',
            imageUrl: '/images/mint-ice.png',
            price: 149.9,
            stock: 10,
            sku: 'IGN-V250-MINTICE',
            description: 'Hortelã mentolada de altíssima intensidade para um frescor inigualável.',
            displayOrder: 4,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: 'elf-bar-bc10000-puffs' },
    update: {},
    create: {
      name: 'Elf Bar BC10000 Puffs Descartável',
      slug: 'elf-bar-bc10000-puffs',
      brand: 'Elf Bar',
      categoryId: catPods.id,
      description: 'Com design ergonômico e revestimento em textura suave, o Elf Bar BC10000 é sinônimo de elegância. Possui tecnologia Quaq Mesh Coil para sabor consistente e bocal anatômico.',
      basePrice: 139.9,
      basePromoPrice: 119.9,
      hasFlavors: true,
      baseStock: 30,
      baseSku: 'ELF-BC10K-BASE',
      internalCode: 'ELF10K',
      mainImageUrl: '/images/elfbar-main.png',
      gallery: JSON.stringify(['/images/elfbar-main.png']),
      weight: 0.1,
      active: true,
      flavors: {
        create: [
          {
            name: 'Watermelon Ice',
            imageUrl: '/images/elfbar-main.png',
            price: 119.9,
            stock: 10,
            sku: 'ELF-BC10K-WMICE',
            description: 'Melancia gelada e suculenta.',
            displayOrder: 1,
          },
          {
            name: 'Strawberry Kiwi',
            imageUrl: '/images/strawberry-kiwi.png',
            price: 119.9,
            stock: 8,
            sku: 'ELF-BC10K-PMW',
            description: 'Mix de morango com kiwi cítrico.',
            displayOrder: 2,
          },
        ],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: 'narguile-triton-zip-black' },
    update: {},
    create: {
      name: 'Narguilé Completo Triton Zip Setup Black Edition',
      slug: 'narguile-triton-zip-black',
      brand: 'Triton',
      categoryId: catNarguiles.id,
      description: 'Narguilé compacto de alto desempenho produzido em alumínio anodizado inoxidável. Acompanha vaso de vidro reforçado, prato em alumínio fundido, rosh de cerâmica e mangueira de silicone lavável.',
      basePrice: 349.9,
      basePromoPrice: 299.9,
      hasFlavors: false,
      baseStock: 8,
      baseSku: 'TRITON-ZIP-BLK',
      internalCode: 'NAR001',
      mainImageUrl: '/images/triton-hookah.png',
      gallery: JSON.stringify(['/images/triton-hookah.png']),
      weight: 1.8,
      active: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'essencia-zomo-strong-mint-50g' },
    update: {},
    create: {
      name: 'Essência Zomo Strong Mint 50g',
      slug: 'essencia-zomo-strong-mint-50g',
      brand: 'Zomo',
      categoryId: catEssencias.id,
      description: 'A mundialmente famosa essência Zomo Strong Mint proporciona uma refrescância intensa incomparável. Produzida com folhas selecionadas e aroma natural de menta.',
      basePrice: 14.9,
      basePromoPrice: 12.9,
      hasFlavors: false,
      baseStock: 120,
      baseSku: 'ZOMO-SM-50G',
      internalCode: 'ESS01',
      mainImageUrl: '/images/essencia-zomo.png',
      gallery: JSON.stringify(['/images/essencia-zomo.png']),
      weight: 0.05,
      active: true,
    },
  });

  await prisma.product.upsert({
    where: { slug: 'carvao-de-coco-zomo-1kg' },
    update: {},
    create: {
      name: 'Carvão de Coco Zomo Hexagonal 1kg',
      slug: 'carvao-de-coco-zomo-1kg',
      brand: 'Zomo',
      categoryId: catCarvoes.id,
      description: 'Carvão 100% natural feito de fibra de coco sem aditivos químicos. Formato hexagonal que garante acendimento uniforme, sem cheiro e com baixíssimo teor de cinzas.',
      basePrice: 39.9,
      basePromoPrice: 34.9,
      hasFlavors: false,
      baseStock: 50,
      baseSku: 'CARV-ZOMO-1KG',
      internalCode: 'CARV01',
      mainImageUrl: '/images/carvao-zomo.png',
      gallery: JSON.stringify(['/images/carvao-zomo.png']),
      weight: 1.0,
      active: true,
    },
  });

  // 4. Create Banners
  await prisma.banner.upsert({
    where: { id: 'banner-1' },
    update: {},
    create: {
      id: 'banner-1',
      title: 'Henri Imports - Vape & Tabacaria Premium',
      description: 'As melhores marcas de Pods Descartáveis, Juices, Narguilés e Acessórios com entrega expressa no mesmo dia.',
      imageUrl: '/images/hero-banner.png',
      link: '/search?category=pods-descartaveis',
      active: true,
      displayOrder: 1,
    },
  });

  console.log('🎉 Supabase Database Seeded Successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
