import { CategoryData, ProductData, BannerData, PromotionData, StoreConfigData } from '@/types';

export const mockConfig: StoreConfigData = {
  "id": "default",
  "name": "Henri Imports",
  "logoUrl": "/logo.png",
  "bannerUrl": "/images/hero-banner.png",
  "primaryColor": "#0284c7",
  "secondaryColor": "#f0f9ff",
  "textColor": "#0f172a",
  "whatsapp": "15996955018",
  "instagram": "@henri_imports",
  "facebook": "henriimportsoficial",
  "address": "Rua Najla Amary Murad, Jardim Guadalupe, Sorocaba, SP",
  "latitude": -23.4636357,
  "longitude": -47.4651022,
  "cep": "18076352",
  "businessHours": "Segunda a Sábado: 10h às 22h | Domingo: 12h às 18h",
  "deliveryMode": "FAIXAS",
  "deliveryKmRate": 1,
  "deliveryRanges": [
    {
      "maxKm": 3,
      "price": 0
    },
    {
      "maxKm": 5,
      "price": 5
    },
    {
      "maxKm": 7,
      "price": 8
    },
    {
      "maxKm": 10,
      "price": 10
    },
    {
      "maxKm": 15,
      "price": 15
    },
    {
      "maxKm": 18,
      "minKm": 15,
      "price": 20
    },
    {
      "maxKm": 25,
      "minKm": 18,
      "price": 23
    }
  ],
  "pixKey": "49228345000196",
  "pixName": "Henri Imports LTDA",
  "whatsappTemplate": "Novo Pedido Henri Imports",
  "wholesalePassword": "Henriimports "
};

export const mockCategories: CategoryData[] = [
  {
    "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "name": "IGNITE",
    "slug": "ignite",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-ignite.jpg",
    "color": "#0284c7",
    "displayOrder": 0,
    "active": true,
    "productCount": 13
  },
  {
    "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "name": "ELFBAR ",
    "slug": "elfbar-",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-elfbar-.jpg",
    "color": "#0284c7",
    "displayOrder": 1,
    "active": true,
    "productCount": 10
  },
  {
    "id": "1a8bcd17-e59e-468b-8a9b-7419d7108090",
    "name": "OXBAR",
    "slug": "oxbar",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-oxbar.webp",
    "color": "#0284c7",
    "displayOrder": 2,
    "active": true,
    "productCount": 3
  },
  {
    "id": "8de79051-2f0c-4710-857e-7623b681046d",
    "name": "BLACK SHEEP ",
    "slug": "black-sheep-",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-black-sheep-.jpg",
    "color": "#0284c7",
    "displayOrder": 3,
    "active": true,
    "productCount": 3
  },
  {
    "id": "99408194-3dea-44e6-a448-e33cb8bf6c16",
    "name": "WAKA ",
    "slug": "waka-",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-waka-.png",
    "color": "#0284c7",
    "displayOrder": 4,
    "active": true,
    "productCount": 3
  },
  {
    "id": "f39697b3-1325-4248-a03f-cb538d38f8e6",
    "name": "OUTROS",
    "slug": "outros",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-outros.png",
    "color": "#0284c7",
    "displayOrder": 5,
    "active": true,
    "productCount": 4
  },
  {
    "id": "9f9c6bd0-cbc7-4677-82e5-8ed3fd4eda00",
    "name": "NIK BAR",
    "slug": "nik-bar",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-nik-bar.jpg",
    "color": "#0284c7",
    "displayOrder": 6,
    "active": true,
    "productCount": 2
  },
  {
    "id": "1c72eb85-e34c-4056-9c7d-dbff5f94b747",
    "name": "DINNER LADY",
    "slug": "dinner-lady",
    "icon": "Package",
    "imageUrl": "/storage/products/cat-dinner-lady.png",
    "color": "#0284c7",
    "displayOrder": 7,
    "active": true,
    "productCount": 3
  }
];

export const mockProducts: ProductData[] = [
  {
    "id": "8f2543e1-753d-438e-95f7-3fbc85d7da1c",
    "name": "ELFBAR BC 15K-15 MIL PUFS ",
    "slug": "elfbar-bc-15k-15-mil-pufs-",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "🔥 Elf Bar BC 15K – Até 15.000 Puffs\n\nO Elf Bar BC 15K é a combinação perfeita de desempenho, praticidade e sabor intenso. Com capacidade de até 15.000 puffs, bateria recarregável via USB-C e visor para acompanhar o nível da bateria e do líquido, ele entrega uma experiência premium do início ao fim.\n\nSeu sistema de coil proporciona vapor denso e excelente fidelidade de sabor, garantindo tragadas suaves e consistentes. Compacto, moderno e fácil de usar, é ideal para quem busca alta durabilidade sem abrir mão da qualidade.\n\n✅ Até 15.000 puffs\n🔋 Bateria recarregável USB-C\n📊 Visor de bateria e e-líquido\n💨 Vapor intenso e sabor marcante\n🎯 Design moderno e ergonômico\n      Diversos sabores disponíveis",
    "basePrice": 100,
    "basePromoPrice": 85,
    "wholesalePrice": 52,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "BC15K",
    "internalCode": "",
    "mainImageUrl": "/storage/products/v3bxfuhbdv-1785288209332.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 01:23:51.192",
    "flavors": [
      {
        "id": "d22ed1e3-675b-4f32-bca9-2088e1dc7734",
        "productId": "8f2543e1-753d-438e-95f7-3fbc85d7da1c",
        "name": "Kiwi maracujá Goiaba ",
        "imageUrl": "/storage/products/wzknetih9p-1785288390127.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "KIWI MARACUJÁ GOIABA ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "76b95c60-a254-4af2-bab0-4f021e92e1fe",
        "productId": "8f2543e1-753d-438e-95f7-3fbc85d7da1c",
        "name": "Manga mágica ",
        "imageUrl": "/storage/products/pkkzlr69wzp-1785288496403.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Manga",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9e5817ee-c856-4cd4-a771-096a8ec8e41f",
        "productId": "8f2543e1-753d-438e-95f7-3fbc85d7da1c",
        "name": "Icy mint ",
        "imageUrl": "/storage/products/af61mmpyx2q-1785288562586.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menta",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "8d5612e4-86d8-404c-847c-a485f41bc6cb",
        "productId": "8f2543e1-753d-438e-95f7-3fbc85d7da1c",
        "name": "Blue razz ice ",
        "imageUrl": "/storage/products/b88igfvygl-1785288613727.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Frutas azuis ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9ad4b49c-2e99-44c6-bb00-f22b8988c885",
        "productId": "8f2543e1-753d-438e-95f7-3fbc85d7da1c",
        "name": "Tropical limonada ",
        "imageUrl": "/storage/products/ucbsmu5xzud-1785288867425.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Frutas tropicais ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
    "name": "IGNITE V155 ",
    "slug": "ignite-v155-",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "🔥 IGNITE V155 Ultra Slim – Até 15.500 Puffs 🔥\n\nO IGNITE V155 Ultra Slim é a escolha perfeita para quem busca qualidade, praticidade e muito sabor! 😮‍💨💨\n\nCom um design ultrafino e moderno ✨, ele é leve, confortável e fácil de levar para qualquer lugar.\n\n⚡ Destaques do IGNITE V155:\n• 💨 Até 15.500 puffs\n• 🔋 Bateria recarregável via USB-C\n• 🔥 Tecnologia Mesh Coil para mais sabor\n• 🚀 Modos Eco e Boost\n• 🎯 Acionamento automático por sucção\n• 💎 Design premium e acabamento elegante\n\nSe você procura um pod com alta autonomia, excelente desempenho e uma experiência diferenciada, o IGNITE V155 é a escolha certa! 🚀😎",
    "basePrice": 90,
    "basePromoPrice": null,
    "wholesalePrice": 62,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V155 IGNITE ",
    "internalCode": null,
    "mainImageUrl": "/storage/products/6g03r6xv8qc-1785189839075.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-27 22:05:18.477",
    "flavors": [
      {
        "id": "4eabd581-4d20-4d68-8113-957050239d2f",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Icy mint ",
        "imageUrl": "/storage/products/flav-4eabd581-4d20-4d68-8113-957050239d2f.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Menta gelada v155",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9519cc56-8f3d-4ccc-aade-8bdc970e2062",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Menthol ",
        "imageUrl": "/storage/products/sp30mcum0mh-1785857103230.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Menta doce v155",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "7bf5487d-47de-40ba-a34a-47360fa564ac",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Uva ice ",
        "imageUrl": "/storage/products/7l0h855qdtx-1785774602728.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Grape ice v155",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "566447b4-1cc4-49c3-912b-e144ccc44c9d",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Morango ice ",
        "imageUrl": "/storage/products/otyh5169cq-1785857494523.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Strawberry ice V155",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9a5ffcc8-0d35-4376-a30b-e56fe9f5f74f",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Banana ice ",
        "imageUrl": "/storage/products/ydq6zp5dhpk-1785857989644.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Banana ice v155",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "dd586e30-ecf0-41c6-b599-6349fce4072d",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Kiwi maracujá goiaba ",
        "imageUrl": "/storage/products/r2yzzq6m4os-1785857750017.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Kiwi passion fruit guava ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "e0d2666b-8dca-4d30-91f2-b9b1008e665b",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Blueberry ice ",
        "imageUrl": "/storage/products/gr25hs8wdaa-1785857838079.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Frutas azuis ice v155",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "32be24b3-0a33-4a7f-a011-8eff50b3b8ac",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "name": "Melancia mix ",
        "imageUrl": "/storage/products/gnq1isd961e-1785857916961.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Mix de melancia ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "112f64c8-5122-4bef-a681-38a8ad8d4596",
    "name": "IGNITE V400 ICE 40K PUFS",
    "slug": "ignite-v400-ice-40k-pufs",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "",
    "basePrice": 125,
    "basePromoPrice": null,
    "wholesalePrice": 73,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V400",
    "internalCode": null,
    "mainImageUrl": "/storage/products/1odvwjv3mya-1785283999039.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 00:13:26.21",
    "flavors": [
      {
        "id": "1fc1e85c-5d4f-4c56-bfef-5613477d726f",
        "productId": "112f64c8-5122-4bef-a681-38a8ad8d4596",
        "name": "Melancia ",
        "imageUrl": "/storage/products/u9w1683zhfp-1785773682959.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Watermelon ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "16d3fefb-e8da-4dab-8056-f2bafaa9e40b",
        "productId": "112f64c8-5122-4bef-a681-38a8ad8d4596",
        "name": "Uva ",
        "imageUrl": "/storage/products/o8usgp7vuw-1785773903336.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Grape ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "8a8e29c8-f256-46e0-a335-aa51c926eb25",
        "productId": "112f64c8-5122-4bef-a681-38a8ad8d4596",
        "name": "Morango banana ice ",
        "imageUrl": "/storage/products/2w0l6qancts-1785773949291.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Stramberry banana ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "c3c011bd-367c-484a-a14a-8bf1814525fe",
        "productId": "112f64c8-5122-4bef-a681-38a8ad8d4596",
        "name": "Menthol ",
        "imageUrl": "/storage/products/c8vvqj1iey9-1785773999233.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menta doce v400",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "c8808ef4-f338-41f9-8b02-9b0c8dd06e8d",
        "productId": "112f64c8-5122-4bef-a681-38a8ad8d4596",
        "name": "Frutas azuis limão ",
        "imageUrl": "/storage/products/znxpw9c62o-1785774143873.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Blue razz lemon ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
    "name": "IGNITE V80- 8.000 PUFS ",
    "slug": "ignite-v80--8000-pufs-",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "",
    "basePrice": 80,
    "basePromoPrice": null,
    "wholesalePrice": 60,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V80",
    "internalCode": "",
    "mainImageUrl": "/storage/products/xyf53cgwbdj-1784994099331.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-25 15:41:51.759",
    "flavors": [
      {
        "id": "6e8ecbb3-dbc1-4a96-bf06-460d90e15fbb",
        "productId": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
        "name": "Chiclete de hortelã ",
        "imageUrl": "/storage/products/e277xtbar9u-1784995008312.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Speramint gum",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "cd8d326e-5c6b-4a2e-94de-27145c3bd1f5",
        "productId": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
        "name": "Frozen mint water ",
        "imageUrl": "/storage/products/rh6jqxala4s-1785189714453.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 20,
        "sku": "V80 frozen mint water",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "116410ec-3127-45a9-9192-c0cb95148c97",
        "productId": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
        "name": "Grapefruit mint ",
        "imageUrl": "/storage/products/2cra33bwmfr-1784994732408.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Laranja vermelha ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "d271981f-6025-4c1d-98aa-b17f4d681be5",
        "productId": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
        "name": "Frozen mint ",
        "imageUrl": "/storage/products/1v84e6zsm0a-1785856619040.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Gelo de menta ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "64a795d0-c9f8-4515-95bb-d2871e83783f",
        "productId": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
        "name": "Bergamot limão menta ",
        "imageUrl": "/storage/products/k1g7zb7zajn-1785856821924.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Bergamot limão menta ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "90e5c7dd-161c-416d-9c71-80b620de1b26",
        "productId": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
        "name": "Maçã verde ",
        "imageUrl": "/storage/products/uwpc8lhlp09-1785856839080.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Green Apple ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "ff54aee8-c821-45b9-bf65-1055b495244e",
        "productId": "fb5ec8a5-3379-44ee-a0ca-2fb223f8c956",
        "name": "Icy mint ",
        "imageUrl": "/storage/products/i78mcg9dre-1785856899700.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menta ice v80",
        "description": null,
        "displayOrder": 0,
        "active": false
      }
    ]
  },
  {
    "id": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
    "name": "KIT ELFBAR EW BATERIA E REFIL 9K PUFS",
    "slug": "kit-elfbar-ew-bateria-e-refil-9k-pufs",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "",
    "basePrice": 110,
    "basePromoPrice": 80,
    "wholesalePrice": 65,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "ELFBAR EW ",
    "internalCode": null,
    "mainImageUrl": "/storage/products/zgk2n3u1a4-1785289010881.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 01:36:58.495",
    "flavors": [
      {
        "id": "8b219c27-c0e3-498e-9866-fde0b05b4707",
        "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
        "name": "Suor maçã verde ice ",
        "imageUrl": "/storage/products/kbh7fayv16-1785289493697.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Ácido maçã verde ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "fc556c92-20cb-4042-9a0c-5ad805284606",
        "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
        "name": "Melancia ice ",
        "imageUrl": "/storage/products/fywj7566a4u-1785289081202.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Melancia ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "c7e4caaf-3740-4758-bd3f-5913eba7b701",
        "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
        "name": "Dragon Stranwnana ",
        "imageUrl": "/storage/products/rv9ugbevnhr-1785289173906.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Pitaya banana morango",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "07a049f3-6301-4290-a376-58da22b7f92d",
    "name": "ELFBAR TE 30K 30 MIL PUFS ",
    "slug": "elfbar-te-30k-30-mil-pufs-",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "🔥 Elf Bar TE 🔥\n\nO Elf Bar TE entrega uma experiência premium com design moderno, excelente autonomia e sabores intensos do início ao fim. Desenvolvido para quem busca praticidade e alto desempenho, oferece tragadas suaves, vapor consistente e uma ampla variedade de sabores para todos os gostos.\n\n✅ Longa duração\n🔋 Bateria recarregável USB-C\n💨 Vapor intenso e sabor marcante\n✨ Design compacto e moderno\n🎯 Fácil de usar\nDiversos sabores disponíveis",
    "basePrice": 120,
    "basePromoPrice": 100,
    "wholesalePrice": 67,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "ELFBAR TE ",
    "internalCode": "",
    "mainImageUrl": "/storage/products/gvpxigqyqca-1785289658086.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 01:48:38.566",
    "flavors": [
      {
        "id": "b44899b4-fa51-4d72-9924-f73a8e97fa21",
        "productId": "07a049f3-6301-4290-a376-58da22b7f92d",
        "name": "Maçã verde ice ",
        "imageUrl": "/storage/products/e3lyknbrit-1785289829912.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "TE Maçã verde ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "91b81e22-6d47-45d4-ae95-b1892515bbe7",
    "name": "ELFBAR DUKE 35K-35 MIL PUFS ",
    "slug": "elfbar-duke-35k-35-mil-pufs-",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "🔥 Elf Bar DUKE 🔥\n\nO Elf Bar DUKE foi desenvolvido para quem busca máximo desempenho, longa duração e uma experiência premium a cada tragada. Com design moderno, bateria recarregável e tecnologia avançada de aquecimento, entrega vapor denso, sabor intenso e consistência do primeiro ao último puff.\n\nIdeal para quem valoriza praticidade e qualidade, o DUKE oferece excelente autonomia e uma ampla variedade de sabores, proporcionando uma experiência completa em qualquer momento.\n\n✅ Alta capacidade de puffs\n🔋 Bateria recarregável USB-C\n💨 Vapor intenso e tragadas suaves\n🎯 Tecnologia de aquecimento avançada\n✨ Design moderno, ergonômico e confortável\n📊 Indicador de bateria e e-líquido (conforme a versão)\n🌬️ Fluxo de ar otimizado para melhor desempenho\n✅ Diversos sabores disponíveis",
    "basePrice": 125,
    "basePromoPrice": 110,
    "wholesalePrice": 72,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "ELF DUKE",
    "internalCode": null,
    "mainImageUrl": "/storage/products/c4xvx4pfz8q-1785289979857.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 01:53:45.06",
    "flavors": [
      {
        "id": "1c6db22b-b5a6-4150-a2d5-05479cd35950",
        "productId": "91b81e22-6d47-45d4-ae95-b1892515bbe7",
        "name": "Fanta uva ",
        "imageUrl": "/storage/products/v3dlum8txa-1785686936954.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Uva gelada ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "62875e95-fa06-4df4-9805-13b1b1a3e1e4",
        "productId": "91b81e22-6d47-45d4-ae95-b1892515bbe7",
        "name": "Blue razz ice ",
        "imageUrl": "/storage/products/af2wyvumduc-1785687187950.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Frutas azuis ice ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9534a45d-d01a-49ed-8cd5-6ccb6162a994",
        "productId": "91b81e22-6d47-45d4-ae95-b1892515bbe7",
        "name": "Menthol ",
        "imageUrl": "/storage/products/0nhhzr3d51e-1785686345963.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Menta doce 35K",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "14800783-7a83-4042-8d96-a410575384fa",
    "name": "Ignite V600- 600 pufs ",
    "slug": "ignite-v600--600-pufs-",
    "brand": "",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "Duração de 24H",
    "basePrice": 35,
    "basePromoPrice": null,
    "wholesalePrice": null,
    "minWholesaleQty": 10,
    "hasFlavors": true,
    "baseStock": 10,
    "baseSku": "V600",
    "internalCode": "",
    "mainImageUrl": "/storage/products/2cazubyh3t3-1784852890890.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-24 00:28:25.045",
    "flavors": [
      {
        "id": "8404e98d-e87b-4083-a6ca-dc680d8b5163",
        "productId": "14800783-7a83-4042-8d96-a410575384fa",
        "name": "Blueberry",
        "imageUrl": "/storage/products/g3ejrvkeu8l-1784853195589.webp",
        "price": null,
        "wholesalePrice": 20,
        "stock": 0,
        "sku": "V600 morango",
        "description": "",
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "5324005b-c6c1-47c3-b4fc-f6b616765927",
    "name": "IGNITE V55- 5,500 pfs ",
    "slug": "ignite-v55--5500-pfs-",
    "brand": "Ignite ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "",
    "basePrice": 90,
    "basePromoPrice": 75,
    "wholesalePrice": 51,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V55",
    "internalCode": "",
    "mainImageUrl": "/storage/products/qgfaq8kbmhi-1784947724740.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-25 02:48:57.072",
    "flavors": [
      {
        "id": "90947cda-5f94-48f0-962f-3a2d5a5d16c4",
        "productId": "5324005b-c6c1-47c3-b4fc-f6b616765927",
        "name": "Morango kiwi",
        "imageUrl": "/storage/products/o9vyjrl2hnc-1785464256285.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 9,
        "sku": "Morango kiwi ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "e199cbcf-16fd-413e-a580-034668850965",
        "productId": "5324005b-c6c1-47c3-b4fc-f6b616765927",
        "name": "Uva ",
        "imageUrl": "/storage/products/yech7dxvuol-1785464309746.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Grape",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "b8f26b6f-bd69-456d-83f6-2e88537a0c2d",
        "productId": "5324005b-c6c1-47c3-b4fc-f6b616765927",
        "name": "Miami mint ",
        "imageUrl": "/storage/products/ysdrzevtde9-1784947820633.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "V55 Miame mint ",
        "description": "",
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "365a8665-5828-41c4-8da7-975a0ceee426",
    "name": "IGNITE V300 SLIM",
    "slug": "ignite-v300-slim",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "",
    "basePrice": 135,
    "basePromoPrice": null,
    "wholesalePrice": 78,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V300 slim ",
    "internalCode": null,
    "mainImageUrl": "/storage/products/xhz6h7kxtcf-1785283774366.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 00:10:52.116",
    "flavors": []
  },
  {
    "id": "d798e571-6c81-4842-b5a5-3efe6be3cda3",
    "name": "ELFBAR TRIO 3 REGULAGEM 40K-40 MIL PUFS ",
    "slug": "elfbar-trio-3-regulagem-40k-40-mil-pufs-",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "",
    "basePrice": 130,
    "basePromoPrice": 110,
    "wholesalePrice": null,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "ELF TRIO ",
    "internalCode": null,
    "mainImageUrl": "/storage/products/7g1bsttbxyd-1785290255981.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 01:57:59.501",
    "flavors": []
  },
  {
    "id": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
    "name": "ELFBAR ICE KING 40K-40 MIL PUFS",
    "slug": "elfbar-ice-king-40k-40-mil-pufs",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "👑 ELFBAR KING 40K 👑\n\nLeve sua experiência para outro nível com o Elfbar King 40K, um pod descartável de alta performance desenvolvido para quem busca longa duração, sabor intenso e tecnologia de ponta.\n\n✨ Destaques do produto:\n• Até 40.000 puffs*\n• Bateria recarregável via USB-C\n• Tela inteligente com indicador de bateria e e-líquido\n• Fluxo de ar ajustável\n• Vapor intenso e sabor marcante do início ao fim\n• Design moderno, ergonômico e compacto\n• Grande capacidade de e-líquido para máxima durabilidade\n\nO Elfbar King 40K combina praticidade, desempenho e uma ampla variedade de sabores, oferecendo uma experiência premium em cada puxada.\n\n⚠️ A quantidade de puffs pode variar conforme a frequência e o modo de uso.",
    "basePrice": 140,
    "basePromoPrice": 120,
    "wholesalePrice": 73,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "ICE KING ",
    "internalCode": null,
    "mainImageUrl": "/storage/products/py44a9huqhj-1785290855433.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 02:08:20.374",
    "flavors": [
      {
        "id": "331981df-4a12-44c3-b281-6f9c739048aa",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Morango ice ",
        "imageUrl": "/storage/products/gaobotjyg3-1785376829627.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 4,
        "sku": "Stramberry ice ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "50d763ff-2834-43cb-a791-34ecceed454d",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Cereja Strazz ",
        "imageUrl": "/storage/products/q2ou9bzr8ol-1785376665219.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 4,
        "sku": "Cereja e morango ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "f695dacc-b11a-4ec4-9614-b6bde9bb32c5",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Miame mint ",
        "imageUrl": "/storage/products/5fwnh9ecx2e-1785683648676.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Miame mint ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "957aa8b9-d51f-4ea1-89d1-3964d4dda57f",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Morango melancia ice ",
        "imageUrl": "/storage/products/hw7qkcsrcrn-1785683802309.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Strawbery watermelon ice ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "0920ef72-7741-496d-9115-62c3279505f4",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Cereja morango ice ",
        "imageUrl": "/storage/products/r0tl3tzpohc-1785683890360.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Cherry strawberry",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "f3d15f1f-3a80-4350-a7e7-a99c1b114417",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Blue razz ice ",
        "imageUrl": "/storage/products/r8m1m3a8us9-1785683968801.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Frutas azuis 40K",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "ee213cd7-06df-4543-9a99-7f54e9780ca0",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Cereja fuse ",
        "imageUrl": "/storage/products/h9loez0fxcg-1785684039128.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Cereja doce ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "695abb96-5aca-4686-8cba-9c3003a40a27",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Uva ice ",
        "imageUrl": "/storage/products/uu68ie2skd9-1785684168322.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Grape ice 40K",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "c4214f2c-11ba-4990-bb6f-7ce26f0b9270",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Frutas vermelhas ",
        "imageUrl": "/storage/products/cf9vez3n1ot-1785684331689.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Scary berry",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "b3627536-9aa0-4063-9227-51b158fae94d",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Bala fini ",
        "imageUrl": "/storage/products/dc1sim541aa-1785684240650.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Suor lush gummy",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "38da64ff-59ed-41d8-bb77-00b5c3ad1443",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Pitaya morango banana ",
        "imageUrl": "/storage/products/58nj93k01vw-1785684562052.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Dragon strawnana",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "e00776c1-a4ce-4d39-a379-e72816a0be43",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Blue razz ",
        "imageUrl": "/storage/products/6hhak0ez428-1785684720629.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 4,
        "sku": "Sweet king ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "ded8bb6a-bd39-4036-88dd-d6f778452cee",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Melancia ice ",
        "imageUrl": "/storage/products/vplbchbgkyd-1785684614905.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Watermelon ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "0ffbcbf4-ee5c-4ac9-a697-e49e51ebb0fe",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Framboesa laranja ",
        "imageUrl": "/storage/products/1rkg5r8a0bg-1785684818751.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Raspberry orange ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "1101bf6e-2504-4b65-ac76-f1b7a1061163",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Neon twist",
        "imageUrl": "/storage/products/ha9f1m2qmyu-1785684986595.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Cítricos com tropical",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "f2334522-48af-4d84-8631-1ff60c904741",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Lemon heads",
        "imageUrl": "/storage/products/f0oxef73rc4-1785685038126.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Limão ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "4ac2cc55-52f6-4c0f-b253-eed278744025",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "name": "Bala de menta ",
        "imageUrl": "/storage/products/5ndg5txdx06-1785685750651.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Wintergren savers",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "cbf04455-08ee-484c-83b3-4dc79668fbe4",
    "name": "ELFBAR BC 45K",
    "slug": "elfbar-bc-45k",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "🔥 Elfbar BC 45K – Até 45.000 Puffs\n\nO Elfbar BC 45K foi desenvolvido para quem busca alta durabilidade, sabor intenso e desempenho consistente do começo ao fim. Com design moderno e acabamento premium, ele entrega uma experiência de vaporização suave e marcante.\n\n⚡ Destaques do produto:\n• Até 45.000 puffs\n• Bateria recarregável de 850 mAh via USB-C\n• Bobina Mesh Coil, proporcionando mais sabor e vapor\n• Display inteligente com indicação de bateria e funcionamento\n• Modos de potência para personalizar a experiência\n• Grande autonomia e excelente rendimento\n• Design ergonômico, moderno e confortável\n\n🍓 Disponível em diversos sabores para agradar todos os estilos, desde frutados e doces até opções refrescantes.\n\n💨 Mais sabor, mais autonomia e muito mais desempenho em um único dispositivo.",
    "basePrice": 145,
    "basePromoPrice": 125,
    "wholesalePrice": 82,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "BC 45K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/gkloihb9zkl-1785336133652.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 14:43:03.965",
    "flavors": [
      {
        "id": "19c02fb1-e578-481d-bdb9-7ee8e77e90e3",
        "productId": "cbf04455-08ee-484c-83b3-4dc79668fbe4",
        "name": "Morango ice ",
        "imageUrl": "/storage/products/u9ch1dl7azm-1788883550470.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Stramberry ice BC 45 ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "8a6c3d2e-be18-4c5d-a4cb-21fceacf9873",
    "name": "OXBAR MAGIC 2.0 30K-30 MIL PUFS",
    "slug": "oxbar-magic-20-30k-30-mil-pufs",
    "brand": "OXBAR",
    "categoryId": "1a8bcd17-e59e-468b-8a9b-7419d7108090",
    "category": {
      "id": "1a8bcd17-e59e-468b-8a9b-7419d7108090",
      "name": "OXBAR",
      "slug": "oxbar",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-oxbar.webp",
      "color": "#0284c7",
      "displayOrder": 2,
      "active": true,
      "productCount": 3
    },
    "description": "🔥 Oxbar Magic 2.0 30K – Até 30.000 Puffs\n\nO Oxbar Magic 2.0 30K combina tecnologia, desempenho e longa duração para proporcionar uma experiência premium. Com design moderno, excelente produção de vapor e sabores intensos, é ideal para quem busca praticidade e alto rendimento.\n\n⚡ Destaques do produto:\n• Até 30.000 puffs\n• Bateria recarregável de 900 mAh via USB-C\n• Tecnologia Dual Mesh Coil, garantindo mais sabor e vapor\n• Display inteligente com indicador de bateria e e-líquido\n• Fluxo de ar ajustável para uma experiência personalizada\n• Alto desempenho do início ao fim\n• Design ergonômico, moderno e confortável\n\n🍓 Disponível em diversos sabores, com opções frutadas, doces e refrescantes para todos os gostos.\n\n💨 Mais autonomia, mais sabor e uma experiência de vaporização de alto nível em um único dispositivo.",
    "basePrice": 110,
    "basePromoPrice": 95,
    "wholesalePrice": 51,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "OX 30K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/bmpqbm7neav-1785336426555.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 14:47:41.362",
    "flavors": [
      {
        "id": "ef620983-5852-4992-9f2b-112e12b6db49",
        "productId": "8a6c3d2e-be18-4c5d-a4cb-21fceacf9873",
        "name": "Kiwi lime ",
        "imageUrl": "/storage/products/zt1l3h8l8pb-1785336676772.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Kiwi limão ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "b4b86428-b222-45c7-a4ea-21ed491e8d98",
        "productId": "8a6c3d2e-be18-4c5d-a4cb-21fceacf9873",
        "name": "Menta gelada ",
        "imageUrl": "/storage/products/ypwe1uks0d-1785685950658.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Frost ment ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "6fab5609-400e-48b1-96e8-ade04a4221c4",
        "productId": "8a6c3d2e-be18-4c5d-a4cb-21fceacf9873",
        "name": "Melancia menta ",
        "imageUrl": "/storage/products/j3xzalmy5oo-1785685852319.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Watermelon menta ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "3d83219a-7332-4f8a-9ee3-4128b081e5d2",
    "name": "OXBAR 32K-32 MIL PUFS KIT COMPLETO",
    "slug": "oxbar-32k-32-mil-pufs-kit-completo",
    "brand": "OXBAR ",
    "categoryId": "1a8bcd17-e59e-468b-8a9b-7419d7108090",
    "category": {
      "id": "1a8bcd17-e59e-468b-8a9b-7419d7108090",
      "name": "OXBAR",
      "slug": "oxbar",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-oxbar.webp",
      "color": "#0284c7",
      "displayOrder": 2,
      "active": true,
      "productCount": 3
    },
    "description": "🔥 Oxbar 32K Kit Completo – Até 32.000 Puffs\n\nO Oxbar 32K Kit Completo foi desenvolvido para quem busca alto desempenho, praticidade e muito sabor. Com tecnologia avançada, design moderno e excelente autonomia, ele proporciona uma experiência premium do início ao fim.\n\n⚡ Destaques do produto:\n• Até 32.000 puffs\n• Bateria recarregável de 900 mAh\n• Tecnologia Dual Mesh Coil, garantindo sabor intenso e vapor denso\n• Display inteligente com indicador de bateria e nível de e-líquido\n• Fluxo de ar ajustável para uma vaporização personalizada\n• Modo Boost para maior potência quando desejar\n• Design ergonômico, moderno e confortável\n\n📦 O Kit Completo acompanha:\n• 1 Dispositivo Oxbar 32K\n• 1 Refil (pod) original\n• Manual de instruções\n\n🍓 Disponível em diversos sabores, com opções frutadas, doces e refrescantes.\n\n💨 Mais autonomia, mais sabor e uma experiência completa para quem busca qualidade e praticidade em um único kit.",
    "basePrice": 125,
    "basePromoPrice": 105,
    "wholesalePrice": 51,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "OXBAR 32K KIT ",
    "internalCode": "",
    "mainImageUrl": "/storage/products/t00k0oowvb-1785336832177.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 14:55:29.091",
    "flavors": [
      {
        "id": "7d33e819-1874-469a-8d3c-3d64bbb3ea03",
        "productId": "3d83219a-7332-4f8a-9ee3-4128b081e5d2",
        "name": "Duas maçã ice ",
        "imageUrl": "/storage/products/evxghjjpe3w-1785337149424.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 10,
        "sku": "Double ice ",
        "description": "",
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "3e53d16a-e319-4ff5-b45e-fed8cfdaf036",
    "name": "ELFBAR BC 40K-40 MIL PUFS EUA",
    "slug": "elfbar-bc-40k-40-mil-pufs-eua",
    "brand": "ELFBAR ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "",
    "basePrice": 130,
    "basePromoPrice": 95,
    "wholesalePrice": 41,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "BC 40K",
    "internalCode": "",
    "mainImageUrl": "/storage/products/stjyr8v4i98-1785336008207.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 14:40:17.506",
    "flavors": [
      {
        "id": "dee3f8d3-834d-482d-9a32-c4689dde008b",
        "productId": "3e53d16a-e319-4ff5-b45e-fed8cfdaf036",
        "name": "Suor maçã verde ",
        "imageUrl": "/storage/products/b348afpwxzs-1785774497407.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Ácido maçã verde 40K",
        "description": "",
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "c3f1c8a9-164d-4b42-a4d0-3392c6c7ac3d",
    "name": "BLACK SHEEP 30K-30 MIL PUFS DUAS SABOR",
    "slug": "black-sheep-30k-30-mil-pufs-duas-sabor",
    "brand": "BLACK SHEEP ",
    "categoryId": "8de79051-2f0c-4710-857e-7623b681046d",
    "category": {
      "id": "8de79051-2f0c-4710-857e-7623b681046d",
      "name": "BLACK SHEEP ",
      "slug": "black-sheep-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-black-sheep-.jpg",
      "color": "#0284c7",
      "displayOrder": 3,
      "active": true,
      "productCount": 3
    },
    "description": "🔥 BLACK SHEEP 30K – DUAL TANK 🔥\n\nO Black Sheep 30K é um pod descartável premium desenvolvido para quem busca praticidade, alto desempenho e uma experiência diferenciada. Seu grande destaque é o sistema Dual Tank, que permite alternar entre 2 sabores no mesmo dispositivo de forma rápida e simples.\n\n⚡ Especificações:\n• Até 30.000 puffs\n• Sistema Dual Tank (2 sabores em 1 aparelho)\n• 26mL de e-líquido (13mL por tanque)\n• Bateria recarregável de 850mAh\n• Carregamento rápido via USB-C\n• 5% de nicotina (50mg)\n• Ativação automática por sucção (sem botões)\n• Vapor intenso e excelente fidelidade de sabor\n\n✅ Ideal para quem quer longa duração, praticidade e a possibilidade de alternar entre dois sabores sempre que desejar, sem precisar trocar de dispositivo.",
    "basePrice": 135,
    "basePromoPrice": 115,
    "wholesalePrice": 80,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "SHEEP 30K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/1zalh0wg5rn-1785461819376.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-31 01:38:05.546",
    "flavors": [
      {
        "id": "fc03713e-9957-484d-a049-ca68db0269c2",
        "productId": "c3f1c8a9-164d-4b42-a4d0-3392c6c7ac3d",
        "name": "UVA / UVA ",
        "imageUrl": "/storage/products/bv2zdoys7r7-1785461964529.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "UVA DOCE / UVA GELADA",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
    "name": "BLACK SHEEP 40K- 40 MIL PUFS DUAS SABOR",
    "slug": "black-sheep-40k--40-mil-pufs-duas-sabor",
    "brand": "BLACK SHEEP",
    "categoryId": "8de79051-2f0c-4710-857e-7623b681046d",
    "category": {
      "id": "8de79051-2f0c-4710-857e-7623b681046d",
      "name": "BLACK SHEEP ",
      "slug": "black-sheep-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-black-sheep-.jpg",
      "color": "#0284c7",
      "displayOrder": 3,
      "active": true,
      "productCount": 3
    },
    "description": "🔥 BLACK SHEEP 40K – DUAL TANK 🔥\n\nO Black Sheep 40K é um pod descartável de alta performance, desenvolvido para quem busca máxima durabilidade, sabores intensos e praticidade. Com o sistema Dual Tank, você pode alternar entre 2 sabores no mesmo dispositivo de forma rápida e fácil.\n\n⚡ Especificações:\n• Até 40.000 puffs\n• Sistema Dual Tank (2 sabores em 1 aparelho)\n• Grande capacidade de e-líquido\n• Bateria recarregável de 850mAh\n• Carregamento rápido via USB-C\n• 5% de nicotina (50mg)\n• Ativação automática por sucção\n• Vapor intenso e excelente entrega de sabor\n• Design moderno e ergonômico\n\n✅ Ideal para quem procura um pod com longa duração, ótima autonomia de bateria e a praticidade de alternar entre dois sabores em um único dispositivo.",
    "basePrice": 150,
    "basePromoPrice": 120,
    "wholesalePrice": 82,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "SHEEP 40K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/pf0muchtkwp-1785462120568.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-31 01:42:27.909",
    "flavors": [
      {
        "id": "937c1b5b-76a2-4457-ac30-a34d1480e278",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "name": "Uva / Uva manga ",
        "imageUrl": "/storage/products/9o9ker8ih2d-1785462481134.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Uva / Uva manga ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "af94a15d-cfb5-41e5-93ce-69c639f54ff8",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "name": "FRESH MINT / MANGÁ LARANJA",
        "imageUrl": "/storage/products/w216sv386d-1785462697509.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "MENTA / mangá laranja ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "8258f167-17c3-49e8-878a-63d4feace628",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "name": "Uva/ Menthol ",
        "imageUrl": "/storage/products/7e2hqemag2-1785462886660.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Uva / Menthol ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "6aa59b41-1828-48c1-abeb-02208eb89be2",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "name": "Chiclete Blueberry/ suor maçã verde ",
        "imageUrl": "/storage/products/fveocj2y3p-1785463743778.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Blueberry dublle/ suor gren Apple",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "03956c5a-c995-4074-9015-2abee5a7ffcf",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "name": "Uva / Uva ",
        "imageUrl": "/storage/products/ayhk4ani5t-1785463888539.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Uva doce / Uva gelada ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "feb4c78e-f2c7-4ce5-8986-10146244dd00",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "name": "Açaí Morango / Açaí uva ",
        "imageUrl": "/storage/products/juj1rht2oa-1785463989882.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Açaí morango / Açaí uva ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "72114a15-4a0d-426b-8a96-4c212ade3571",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "name": "Morango kiwi/ Fresh ment ",
        "imageUrl": "/storage/products/xxprgfhhu2-1785462848394.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Morango kiwi / Fresh menta ",
        "description": "",
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "12e3fc20-280f-4850-8509-59d4d4cabed5",
    "name": "OXBAR 50K-50 MIL PUFS COM REGULAGEM DE FUMAÇA",
    "slug": "oxbar-50k-50-mil-pufs-com-regulagem-de-fumaa",
    "brand": "OXBAR ",
    "categoryId": "1a8bcd17-e59e-468b-8a9b-7419d7108090",
    "category": {
      "id": "1a8bcd17-e59e-468b-8a9b-7419d7108090",
      "name": "OXBAR",
      "slug": "oxbar",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-oxbar.webp",
      "color": "#0284c7",
      "displayOrder": 2,
      "active": true,
      "productCount": 3
    },
    "description": "💨 OXBAR Invisible 50K – Tecnologia, Discrição e Alto Desempenho\n\nO OXBAR Invisible 50K é um pod descartável premium desenvolvido para quem busca uma experiência moderna e personalizada. Com tecnologia de fumaça invisível (Smoke Control), você pode ajustar a intensidade do vapor, tornando o uso mais discreto quando desejar, sem abrir mão do sabor.\n\n✨ Destaques do produto:\n• Até 50.000 puffs\n• Tecnologia Smoke Control (modo de fumaça invisível e vapor intenso)\n• Ajuste de intensidade do vapor\n• Controle de nível de Ice\n• Display digital com informações de bateria e e-líquido\n• Coil Mesh de alta performance para sabor intenso\n• Bateria recarregável de 1000 mAh\n• Carregamento rápido via USB-C\n• Design moderno, ergonômico e sofisticado\n\n🔥 Ideal para quem procura máxima autonomia, excelente rendimento e uma experiência premium do início ao fim.",
    "basePrice": 130,
    "basePromoPrice": null,
    "wholesalePrice": 80,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "OXBAR 50K",
    "internalCode": "",
    "mainImageUrl": "/storage/products/ru5ysxwatnc-1785434202921.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-30 17:58:34.087",
    "flavors": [
      {
        "id": "5c67f0dc-5b71-4878-a7f2-6531afdb8c5a",
        "productId": "12e3fc20-280f-4850-8509-59d4d4cabed5",
        "name": "Menthol",
        "imageUrl": "/storage/products/8fzxxzejn8g-1785434355929.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 6,
        "sku": "Menta doce ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "89485922-6c51-44ff-974a-35f7e04781db",
    "name": "BLACK SHEEP 55K-55 MIL PUFS ",
    "slug": "black-sheep-55k-55-mil-pufs-",
    "brand": "BLACK SHEEP ",
    "categoryId": "8de79051-2f0c-4710-857e-7623b681046d",
    "category": {
      "id": "8de79051-2f0c-4710-857e-7623b681046d",
      "name": "BLACK SHEEP ",
      "slug": "black-sheep-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-black-sheep-.jpg",
      "color": "#0284c7",
      "displayOrder": 3,
      "active": true,
      "productCount": 3
    },
    "description": "🔥 BLACK SHEEP 55K – Cyber Tank Pro 🔥\n\nO Black Sheep 55K foi desenvolvido para quem busca longa duração, desempenho e muito sabor. Com um visual moderno e tecnologia avançada, ele entrega uma experiência consistente do início ao fim.\n\n✨ Especificações:\n• Até 55.000 puffs\n• Display digital com indicador de bateria e nível de líquido\n• Fluxo de ar ajustável para personalizar a tragada\n• Mesh Coil para sabor mais intenso e vapor uniforme\n• Bateria recarregável via USB-C\n• Nicotina Salt 5% (50mg/mL)\n• Design premium com acabamento inspirado no estilo cyberpunk. \n\n💨 Destaques:\n✅ Sabor intenso do início ao fim\n✅ Vapor denso e tragada suave\n✅ Grande autonomia para uso prolongado\n✅ Ideal para quem procura praticidade e alta performance. ",
    "basePrice": 135,
    "basePromoPrice": 125,
    "wholesalePrice": 83,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Sheep 55K",
    "internalCode": "",
    "mainImageUrl": "/storage/products/cgq4j6xc8su-1785464472487.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-31 02:22:06.538",
    "flavors": [
      {
        "id": "f4b41532-f90b-43d3-b80f-d1735bc2a28c",
        "productId": "89485922-6c51-44ff-974a-35f7e04781db",
        "name": "Miami mint ",
        "imageUrl": "/storage/products/sc2k4t6yg-1785464615331.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Menta miame",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "71122c5e-4fd6-4295-813e-2068f41956c1",
        "productId": "89485922-6c51-44ff-974a-35f7e04781db",
        "name": "Melancia ice ",
        "imageUrl": "/storage/products/lggmtzgeajm-1785464676740.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Melancia ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "0bed8ad8-86dd-487b-8c74-776d00f7359f",
    "name": "WAKA 25K-25 MIL PUFS ",
    "slug": "waka-25k-25-mil-pufs-",
    "brand": "WAKA ",
    "categoryId": "99408194-3dea-44e6-a448-e33cb8bf6c16",
    "category": {
      "id": "99408194-3dea-44e6-a448-e33cb8bf6c16",
      "name": "WAKA ",
      "slug": "waka-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-waka-.png",
      "color": "#0284c7",
      "displayOrder": 4,
      "active": true,
      "productCount": 3
    },
    "description": "💨 WAKA KA25 – ATÉ 25.000 PUFFS 💨\n\nO WAKA KA25 é a escolha ideal para quem busca alta durabilidade, sabor intenso e tecnologia de ponta. Com um design moderno e acabamento premium, ele entrega uma experiência consistente do primeiro ao último puff.\n\n✨ Especificações:\n• Até 25.000 puffs\n• 🔋 Bateria recarregável de 850mAh\n• ⚡ Carregamento rápido via USB-C\n• 🧃 Aproximadamente 22mL de e-liquid\n• 🌬️ Dual Mesh Coil para mais sabor e vapor\n• 🎛️ Múltiplos modos de potência (Normal/Eco e Boost)\n• 📱 Display digital com indicador de bateria e nível de líquido\n• 💨 Fluxo de ar ajustável (dependendo da versão)\n• 🔥 Ativação automática por sucção\n\n🚀 Mais autonomia, mais desempenho e muito mais sabor em cada tragada.",
    "basePrice": 120,
    "basePromoPrice": 90,
    "wholesalePrice": 54,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Waka 25K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/3csu8idccjb-1785552207858.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-01 02:44:16.467",
    "flavors": [
      {
        "id": "48ceaa3e-7fb7-4632-8f1f-fc131dded3b5",
        "productId": "0bed8ad8-86dd-487b-8c74-776d00f7359f",
        "name": "Morango melancia pitaya ",
        "imageUrl": "/storage/products/wk7jphrfyd-1785552915381.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Morango melancia pitaya ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "c174d8bb-c807-4f4b-87f7-c6ffd4d7c7f4",
        "productId": "0bed8ad8-86dd-487b-8c74-776d00f7359f",
        "name": "Morango aqua ",
        "imageUrl": "/storage/products/dp9xz4worck-1785552975853.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Morango ice ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "f4925e06-c503-4231-80d9-bf14e3acae21",
        "productId": "0bed8ad8-86dd-487b-8c74-776d00f7359f",
        "name": "Chiclete de Uva ",
        "imageUrl": "/storage/products/pazwnwdkhi-1785552604943.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Bubbaloo grape ",
        "description": "",
        "displayOrder": 0,
        "active": false
      }
    ]
  },
  {
    "id": "70394673-64c6-4976-ae49-6cb16ca1b226",
    "name": "IGNITE V300-30 MIL PUFS ",
    "slug": "ignite-v300-30-mil-pufs-",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "IGNITE V300 – 30.000 PUFFS\n\nDispositivo com capacidade de até 30.000 puffs, equipado com tela digital, bateria recarregável via USB-C e sistema de aquecimento desenvolvido para proporcionar uma experiência consistente.\n\nCaracterísticas:\n• Até 30.000 puffs\n• Tela digital\n• Bateria recarregável USB-C\n• Design moderno e compacto\n• Disponível em diversos sabores",
    "basePrice": 115,
    "basePromoPrice": null,
    "wholesalePrice": 75,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "IGNITE V300",
    "internalCode": "",
    "mainImageUrl": "/storage/products/ssujjkkmo0m-1786158455450.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-08 03:08:28.722",
    "flavors": [
      {
        "id": "ea09763f-081f-4f96-90f4-8e9ca1906386",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "Pêssego|Manga ",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 5,
        "sku": "V300 tradicional .",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "8c1cd4ff-c374-4b76-9e00-855d1811934d",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "abacaxi/manga",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 5,
        "sku": "V 300 tradicional.",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "eb19ef18-a0fe-4ba1-993d-6066d37a8c85",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "Menty melão ",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 5,
        "sku": "Menty melão ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "fecdf39c-016c-4099-9ba1-899ba28787aa",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "Morango kiwi 🥝 ",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 0,
        "sku": "V300 normal ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9956fb73-63b0-4468-bc6a-8c43cba3ef10",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "Maçã verde 🍏",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 5,
        "sku": "Maçã ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "61378c41-5ccd-4237-bd85-6fda0465da2c",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "Morango/banana ",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 0,
        "sku": "V300 ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "42b92dfe-e701-4cf3-8740-a61b22127f7f",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "Abacaxi ice 🧊",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 0,
        "sku": "V300 tradicional ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "baafee08-17f8-40fa-845e-940726453848",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "ICY MINT ",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 5,
        "sku": "V300 tradicional :",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "d5b9a345-b9a9-44c2-8055-3fc4a8847e35",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "UVA ICE 🍇",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 5,
        "sku": "V300 tradicional",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "39e70cbb-f67d-4181-b8de-034b26af4362",
        "productId": "70394673-64c6-4976-ae49-6cb16ca1b226",
        "name": "Melancia ice ",
        "imageUrl": null,
        "price": 100,
        "wholesalePrice": 100,
        "stock": 0,
        "sku": "V300 melancia ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "e65aae75-23cd-4b86-a6e7-a64b7e543ad3",
    "name": "WAKA ICON 50K-50 MIL PUFS ",
    "slug": "waka-icon-50k-50-mil-pufs-",
    "brand": "WAKA",
    "categoryId": "99408194-3dea-44e6-a448-e33cb8bf6c16",
    "category": {
      "id": "99408194-3dea-44e6-a448-e33cb8bf6c16",
      "name": "WAKA ",
      "slug": "waka-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-waka-.png",
      "color": "#0284c7",
      "displayOrder": 4,
      "active": true,
      "productCount": 3
    },
    "description": "💨 WAKA 50K ICON – ATÉ 50.000 PUFFS 💨\n\nO WAKA 50K ICON foi desenvolvido para quem busca máxima autonomia, tecnologia e um sabor intenso do começo ao fim. Com design moderno e acabamento premium, ele oferece uma experiência completa em cada puff.\n\n✨ Especificações:\n• 💨 Até 50.000 puffs\n• 🔋 Bateria recarregável de 850mAh\n• ⚡ Carregamento rápido via USB-C\n• 🧃 Grande capacidade de e-liquid\n• 🌬️ Tecnologia Dual Mesh Coil, proporcionando mais sabor e vapor\n• 🎛️ Modos de potência ajustáveis (Eco, Normal e Boost)\n• 📱 Tela digital inteligente com indicador de bateria, nível de líquido e modo de uso\n• 💨 Fluxo de ar ajustável para uma experiência personalizada\n• 🔥 Acionamento automático por sucção\n\n🚀 Mais autonomia, mais desempenho e sabores marcantes em um único dispositivo. O WAKA 50K ICON é a escolha ideal para quem não abre mão de qualidade e alta performance.",
    "basePrice": 130,
    "basePromoPrice": 115,
    "wholesalePrice": 70,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Waka icon",
    "internalCode": null,
    "mainImageUrl": "/storage/products/a5g4a4y5jhv-1785553195647.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-01 03:00:32.615",
    "flavors": [
      {
        "id": "3656fa7c-9dd8-4fed-bf34-2028d2c0a031",
        "productId": "e65aae75-23cd-4b86-a6e7-a64b7e543ad3",
        "name": "Morango goiaba ",
        "imageUrl": "/storage/products/q3nckbrknds-1785553844972.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Strawnerry Guava",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "6d004ebc-1e4c-4e3e-9326-7a59ab9da52c",
        "productId": "e65aae75-23cd-4b86-a6e7-a64b7e543ad3",
        "name": "Cool menta ",
        "imageUrl": "/storage/products/n0tom17r9a-1785553282097.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Cool mint ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "c5673dbf-7342-4158-b4cf-c24f6855247b",
    "name": "Waka 70K-70 mil pufs ",
    "slug": "waka-70k-70-mil-pufs-",
    "brand": "Waka ",
    "categoryId": "99408194-3dea-44e6-a448-e33cb8bf6c16",
    "category": {
      "id": "99408194-3dea-44e6-a448-e33cb8bf6c16",
      "name": "WAKA ",
      "slug": "waka-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-waka-.png",
      "color": "#0284c7",
      "displayOrder": 4,
      "active": true,
      "productCount": 3
    },
    "description": "💨 WAKA 50K ICON – ATÉ 50.000 PUFFS 💨\n\nO WAKA 50K ICON foi desenvolvido para quem busca máxima autonomia, tecnologia e um sabor intenso do começo ao fim. Com design moderno e acabamento premium, ele oferece uma experiência completa em cada puff.\n\n✨ Especificações:\n• 💨 Até 50.000 puffs\n• 🔋 Bateria recarregável de 850mAh\n• ⚡ Carregamento rápido via USB-C\n• 🧃 Grande capacidade de e-liquid\n• 🌬️ Tecnologia Dual Mesh Coil, proporcionando mais sabor e vapor\n• 🎛️ Modos de potência ajustáveis (Eco, Normal e Boost)\n• 📱 Tela digital inteligente com indicador de bateria, nível de líquido e modo de uso\n• 💨 Fluxo de ar ajustável para uma experiência personalizada\n• 🔥 Acionamento automático por sucção\n\n🚀 Mais autonomia, mais desempenho e sabores marcantes em um único dispositivo. O WAKA 50K ICON é a escolha ideal para quem não abre mão de qualidade e alta performance.",
    "basePrice": 150,
    "basePromoPrice": 125,
    "wholesalePrice": 80,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Waka 70K",
    "internalCode": "",
    "mainImageUrl": "/storage/products/ui3fgxk8m4i-1785553833380.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-01 03:10:36.819",
    "flavors": []
  },
  {
    "id": "28a988f6-08ca-402e-a66c-aa9b0fcfeccd",
    "name": "VANTHER 30K-30 MIL PUFS ",
    "slug": "vanther-30k-30-mil-pufs-",
    "brand": "VANTHER ",
    "categoryId": "f39697b3-1325-4248-a03f-cb538d38f8e6",
    "category": {
      "id": "f39697b3-1325-4248-a03f-cb538d38f8e6",
      "name": "OUTROS",
      "slug": "outros",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-outros.png",
      "color": "#0284c7",
      "displayOrder": 5,
      "active": true,
      "productCount": 4
    },
    "description": "🐯 Vanther 30K – Descrição Completa\n\nO Vanther 30K é um pod descartável premium desenvolvido para quem busca alta autonomia, sabor intenso e praticidade. Com design moderno e acabamento sofisticado, oferece uma experiência consistente do primeiro ao último puff.\n\nEspecificações:\n\n* 💨 Até 30.000 puffs\n* 🔋 Bateria recarregável de 550 mAh\n* ⚡ Entrada USB Tipo-C\n* 🧃 25 ml de e-liquid\n* 🌬️ Fluxo de ar suave para tragadas confortáveis\n* ❄️ Sabores intensos com excelente durabilidade\n* 📱 Compacto, leve e fácil de transportar\n\nO Vanther 30K combina desempenho, longa duração e um visual marcante, sendo uma ótima opção para quem procura um pod confiável para o dia a dia.",
    "basePrice": 85,
    "basePromoPrice": null,
    "wholesalePrice": 56,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Vanther 30K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/5atdxafzz6y-1785576886487.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-01 09:35:26.85",
    "flavors": [
      {
        "id": "6fe8f76c-ff01-4785-b08f-73f51d168e52",
        "productId": "28a988f6-08ca-402e-a66c-aa9b0fcfeccd",
        "name": "Melancia ice ",
        "imageUrl": "/storage/products/4d9sbicb54e-1785576963817.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 4,
        "sku": "Watermelon",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "28120e72-4769-43ca-a3ec-746df8e7da5d",
        "productId": "28a988f6-08ca-402e-a66c-aa9b0fcfeccd",
        "name": "Cool mint ",
        "imageUrl": "/storage/products/hd0l6kodfmd-1785577012335.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Menta refrescante ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "af93a6fe-30bd-4fcc-81a2-e742c6ed1848",
        "productId": "28a988f6-08ca-402e-a66c-aa9b0fcfeccd",
        "name": "Morango kiwi ",
        "imageUrl": "/storage/products/if20frqriho-1785577064050.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Stramberry kiwi ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "ec7848a6-c235-4797-a57c-d5451f437221",
        "productId": "28a988f6-08ca-402e-a66c-aa9b0fcfeccd",
        "name": "Frutas Roxas ",
        "imageUrl": "/storage/products/5yt6d92cbfk-1785577126189.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Mix berries",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "1ad92183-b4d1-4039-9717-974dcb0a4fc5",
        "productId": "28a988f6-08ca-402e-a66c-aa9b0fcfeccd",
        "name": "Melão ice ",
        "imageUrl": "/storage/products/1ctiuxe7y9j-1785577235034.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Melon ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "7149758d-3d72-4f6b-a6c4-a1b24dcbebd1",
        "productId": "28a988f6-08ca-402e-a66c-aa9b0fcfeccd",
        "name": "Uva ice ",
        "imageUrl": "/storage/products/q2ki36gwgmi-1785577410530.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Grape ice",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
    "name": "NIK BAR 10K-10 MIL PUFS",
    "slug": "nik-bar-10k-10-mil-pufs",
    "brand": "NIK BAR ",
    "categoryId": "9f9c6bd0-cbc7-4677-82e5-8ed3fd4eda00",
    "category": {
      "id": "9f9c6bd0-cbc7-4677-82e5-8ed3fd4eda00",
      "name": "NIK BAR",
      "slug": "nik-bar",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-nik-bar.jpg",
      "color": "#0284c7",
      "displayOrder": 6,
      "active": true,
      "productCount": 2
    },
    "description": "💨 NIK 10K – Descrição Completa\n\nO NIK 10K é um pod descartável desenvolvido para oferecer praticidade, excelente desempenho e sabores marcantes. Compacto e moderno, é ideal para quem procura uma experiência consistente e duradoura.\n\nEspecificações:\n\n* 💨 Até 10.000 puffs\n* 🔋 Bateria recarregável de longa duração\n* ⚡ Entrada USB Tipo-C\n* 💧 Grande capacidade de e-liquid\n* 🌬️ Fluxo de ar suave para tragadas confortáveis\n* ❄️ Sabores intensos e refrescantes\n* 🎒 Design compacto, leve e fácil de transportar\n\nO NIK 10K combina autonomia, praticidade e ótimo desempenho, entregando uma experiência de uso consistente do primeiro ao último puff. Ideal para quem busca qualidade, excelente custo-benefício e uma grande variedade de sabores.",
    "basePrice": 80,
    "basePromoPrice": 65,
    "wholesalePrice": 43,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Nik 10K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/8dx6qqxx4wh-1785577623184.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-01 09:47:44.488",
    "flavors": [
      {
        "id": "290950aa-8980-481a-b463-c59d8a704c54",
        "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
        "name": "Menthol ",
        "imageUrl": "/storage/products/hmwjjnt4r2s-1785597158334.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menta ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "cac55b5b-c8ff-4110-8a03-aea683e06594",
        "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
        "name": "Morango kiwi ",
        "imageUrl": "/storage/products/7i0dc3w33r9-1785597283552.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Stramberry kiwi nik",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "f02118fc-8216-4550-ae6d-91aa98073e73",
        "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
        "name": "Sakura uva ",
        "imageUrl": "/storage/products/1r067zczul1-1785597323299.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Sakura Grape ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "fa5158a9-3ab8-4444-aa67-ddb784d2ceeb",
        "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
        "name": "Maracujá kiwi ",
        "imageUrl": "/storage/products/lrdivazowq-1785597378098.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 5,
        "sku": "Ácido maracujá kiwi ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "60ca2082-46c3-4d35-94e8-7c83cc8d22f4",
        "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
        "name": "Uva ice ",
        "imageUrl": "/storage/products/vob07jzuonb-1785597214966.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Grape ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "64940fe5-089e-4408-bcb3-4e2c9b8078ec",
    "name": "NIK BAR 30K-30 MIL PUFS ",
    "slug": "nik-bar-30k-30-mil-pufs-",
    "brand": "NIK BAR ",
    "categoryId": "9f9c6bd0-cbc7-4677-82e5-8ed3fd4eda00",
    "category": {
      "id": "9f9c6bd0-cbc7-4677-82e5-8ed3fd4eda00",
      "name": "NIK BAR",
      "slug": "nik-bar",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-nik-bar.jpg",
      "color": "#0284c7",
      "displayOrder": 6,
      "active": true,
      "productCount": 2
    },
    "description": "🔥 Nik Bar 30K – Descrição Completa 🔥\n\nO Nik Bar 30K foi desenvolvido para quem busca máxima autonomia, sabor intenso e praticidade. Com até 30.000 puffs, ele conta com bateria recarregável de 800mAh, 25ml de e-liquid, carregamento USB-C, tela LCD para acompanhar bateria e nível do líquido, além da tecnologia Dual Mesh Coil, que proporciona vapor mais intenso e sabor consistente do início ao fim. Também possui Boost Mode, que aumenta a potência para uma experiência ainda mais intensa. (Vaporesso Brasil)\n\n✨ Características:\n• Até 30.000 puffs\n• 🔋 Bateria recarregável de 800mAh\n• 💧 25ml de essência\n• ⚡ Carregamento rápido USB-C\n• 📺 Display LCD com indicador de bateria e líquido\n• 💨 Tecnologia Dual Mesh Coil\n• 🚀 Boost Mode para mais vapor e intensidade\n• 👌 Pronto para usar e fácil de transportar",
    "basePrice": 125,
    "basePromoPrice": 95,
    "wholesalePrice": 43,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Nik 30K",
    "internalCode": "",
    "mainImageUrl": "/storage/products/x93ro8z0apa-1785597514242.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-01 15:19:07.981",
    "flavors": [
      {
        "id": "69c128be-1ff8-4335-a13a-9ec9ee3d36d5",
        "productId": "64940fe5-089e-4408-bcb3-4e2c9b8078ec",
        "name": "Icy mint ",
        "imageUrl": "/storage/products/nkjmri8gile-1785597797481.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Menta gelada",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "e86f9b7c-1d9a-4cc7-988d-76905981359b",
        "productId": "64940fe5-089e-4408-bcb3-4e2c9b8078ec",
        "name": "Menthol ",
        "imageUrl": "/storage/products/98in0k5fnd-1785597760990.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Menta doce",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "674f117a-3aab-4be5-8fd7-068e4861578f",
    "name": "DINNER LADY LUMA 20K-20 ML PUFS ",
    "slug": "dinner-lady-luma-20k-20-ml-pufs-",
    "brand": "DINNER LADY",
    "categoryId": "1c72eb85-e34c-4056-9c7d-dbff5f94b747",
    "category": {
      "id": "1c72eb85-e34c-4056-9c7d-dbff5f94b747",
      "name": "DINNER LADY",
      "slug": "dinner-lady",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-dinner-lady.png",
      "color": "#0284c7",
      "displayOrder": 7,
      "active": true,
      "productCount": 3
    },
    "description": "💨 Dinner Lady LUMA 💨\n\nO Dinner Lady LUMA é um pod descartável desenvolvido para quem busca praticidade, excelente desempenho e sabores marcantes. Com design moderno e compacto, entrega uma experiência suave, intensa e consistente do início ao fim.\n\n✨ Características:\n• Até 20.000 puffs (aproximadamente)\n• Bateria recarregável de longa duração\n• Carregamento USB-C\n• Tecnologia de malha (Mesh Coil) para melhor sabor e produção de vapor\n• Fluxo de ar suave e confortável\n• Grande capacidade de e-liquid\n• Diversos sabores disponíveis\n• Design ergonômico e elegante\n\n🔥 Ideal para quem procura um pod premium, com alta autonomia, excelente rendimento e a qualidade reconhecida da Dinner Lady.",
    "basePrice": 110,
    "basePromoPrice": 90,
    "wholesalePrice": 65,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Dinner lady 20K ",
    "internalCode": null,
    "mainImageUrl": "/storage/products/prod-674f117a-3aab-4be5-8fd7-068e4861578f.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-02 16:18:56.888",
    "flavors": [
      {
        "id": "1d74c305-55d8-44a7-aa14-bc10effbf14b",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Morango ice ",
        "imageUrl": "/storage/products/4a29uzoc9fw-1785687584397.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Strawberry ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "4a80aa11-9896-4b6a-b235-3e540e69d1a9",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Morango ice ",
        "imageUrl": "/storage/products/jg82sucet5p-1785687870921.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Stramberry ice Luma ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "ce4d6c9c-82e6-4f45-8c3e-fa79e49ed085",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Kiwi maracujá ",
        "imageUrl": "/storage/products/44zib9p508b-1785687938650.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Kiwi passion fruit ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "c33433ab-f4e9-455a-a524-b7630275613f",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Banana ice ",
        "imageUrl": "/storage/products/zittox35t5-1785688239422.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Banana ice ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "0db1d750-ff3b-453c-b5b4-2963cfd0ae2b",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Menthol ",
        "imageUrl": "/storage/products/4ct5rmzz7gv-1785688265930.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menthol Luma ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "06619f6e-90fe-4cac-9a8d-492dca5f6693",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Cereja ice ",
        "imageUrl": "/storage/products/qih55khsnu-1785688372306.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Cherry ice Luma ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "3704fae5-3ab7-40c9-b0b9-1b43ece0b735",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Icy mint ",
        "imageUrl": "/storage/products/bz5zy1e1kuv-1785688433761.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menta ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "8e684716-bf29-485f-be6a-fa660908855f",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Manga ice ",
        "imageUrl": "/storage/products/lnd4ga9u7si-1785688657984.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Mango ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9661bc78-c5bf-4f40-ba64-cec6f5c414b6",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Maçã pêssego ice ",
        "imageUrl": "/storage/products/mbfp1wf1bx-1785688736490.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Apple peach ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "e1dd9304-db11-45ea-a54b-9d259316d30e",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "name": "Uva ice ",
        "imageUrl": "/storage/products/1jrx6l8hat7-1785687556672.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Grape ice luma ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "f5184da7-e948-4831-b035-83f115c79fa1",
    "name": "DINNER LADY 50K-50 MIL PUFS ",
    "slug": "dinner-lady-50k-50-mil-pufs-",
    "brand": "Dinner lady ",
    "categoryId": "1c72eb85-e34c-4056-9c7d-dbff5f94b747",
    "category": {
      "id": "1c72eb85-e34c-4056-9c7d-dbff5f94b747",
      "name": "DINNER LADY",
      "slug": "dinner-lady",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-dinner-lady.png",
      "color": "#0284c7",
      "displayOrder": 7,
      "active": true,
      "productCount": 3
    },
    "description": "💨 Dinner Lady 50K – Dual Flavor 💨\n\nO Dinner Lady 50K Dual Flavor é um pod descartável premium que permite alternar entre dois sabores no mesmo dispositivo, proporcionando uma experiência personalizada e maior variedade durante o uso. Com alto rendimento e tecnologia avançada, entrega sabor intenso e vapor consistente até o último puff.\n\n✨ Características:\n• Até 50.000 puffs (aproximadamente)\n• 2 sabores em 1 dispositivo\n• Sistema de troca de sabores com um toque\n• Bateria recarregável de alta capacidade\n• Carregamento USB-C\n• Tecnologia Dual Mesh Coil para melhor sabor e maior produção de vapor\n• Fluxo de ar suave e confortável\n• Grande capacidade de e-liquid\n• Design moderno, ergonômico e premium\n\n🔥 Ideal para quem busca máxima autonomia, praticidade e a liberdade de alternar entre dois sabores sempre que desejar, mantendo a qualidade reconhecida da Dinner Lady.",
    "basePrice": 150,
    "basePromoPrice": 130,
    "wholesalePrice": 88,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "DINNER 50k",
    "internalCode": null,
    "mainImageUrl": "/storage/products/3pvk8uh8ph9-1785688848179.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-02 16:41:19.607",
    "flavors": [
      {
        "id": "e328343a-b65e-4c21-a8b0-7958ef580edb",
        "productId": "f5184da7-e948-4831-b035-83f115c79fa1",
        "name": "Uva/ Manga ice ",
        "imageUrl": "/storage/products/9dlaxtfuacf-1785689078494.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Uva/ mango ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "4dfd45b5-f250-4ace-b179-e2eff5f6b8d3",
        "productId": "f5184da7-e948-4831-b035-83f115c79fa1",
        "name": "Banana ice/ pêssego manga melancia ",
        "imageUrl": "/storage/products/hp996g7mdvc-1785689164388.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Banana ice/ Peach mango watermelon",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "953f88d9-de53-481d-95e8-432857dce959",
        "productId": "f5184da7-e948-4831-b035-83f115c79fa1",
        "name": "Morango kiwi/ Cereja ",
        "imageUrl": "/storage/products/v4q1ha0ad6-1785689242153.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Strawberry/ cherry",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "d16775a9-feef-4f84-8700-a4c913dc4727",
        "productId": "f5184da7-e948-4831-b035-83f115c79fa1",
        "name": "Melancia ice/ Blue mint ",
        "imageUrl": "/storage/products/7gwv55zokf5-1785689301462.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 0,
        "sku": "Watermelon/ Menta azul ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "66ddd067-8229-497e-8a9d-c19c7fc93c94",
        "productId": "f5184da7-e948-4831-b035-83f115c79fa1",
        "name": "Menta/ Abacaxi ice ",
        "imageUrl": "/storage/products/wa3469zi8rj-1785689352209.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menta/ Pinneaple ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "1057f017-590c-486e-a255-54d7eddb3d2f",
        "productId": "f5184da7-e948-4831-b035-83f115c79fa1",
        "name": "Menthol/ Maracujá ice ",
        "imageUrl": "/storage/products/poeof5aqnh-1785688976189.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Menthol/ passion fruit ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "87c1ffab-8d79-4be0-872a-9a8c00ad5bf3",
    "name": "IGNITE V35-3,500 PUFS ",
    "slug": "ignite-v35-3500-pufs-",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "Duração de apenas 24H ",
    "basePrice": 60,
    "basePromoPrice": null,
    "wholesalePrice": 26,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V35",
    "internalCode": null,
    "mainImageUrl": "/storage/products/xj7ovb4x2j-1785858053514.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-04 15:41:05.32",
    "flavors": [
      {
        "id": "57c954bf-e04e-46c8-b20a-c984ef8a5376",
        "productId": "87c1ffab-8d79-4be0-872a-9a8c00ad5bf3",
        "name": "Cereja ice ",
        "imageUrl": "/storage/products/26bghd5j0q1-1785858220987.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Cherry ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "660f90fd-3c42-423f-87a1-c164ab9483ef",
    "name": "DOJO SPHERE X 40K-40 MIL PUFS ",
    "slug": "dojo-sphere-x-40k-40-mil-pufs-",
    "brand": "DOJO",
    "categoryId": "f39697b3-1325-4248-a03f-cb538d38f8e6",
    "category": {
      "id": "f39697b3-1325-4248-a03f-cb538d38f8e6",
      "name": "OUTROS",
      "slug": "outros",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-outros.png",
      "color": "#0284c7",
      "displayOrder": 5,
      "active": true,
      "productCount": 4
    },
    "description": "🔥 DOJO 40K – Até 40.000 Puffs\n\nO DOJO 40K é um pod descartável premium desenvolvido para oferecer longa duração, sabor intenso e vapor consistente. Equipado com bateria recarregável, display inteligente, modos de potência e tecnologia de coil avançada, entrega uma experiência de alto nível do começo ao fim. \n\n⚙️ Especificações:\n\n* 💨 Até 40.000 puffs\n* 🔋 Bateria recarregável de 1.100 mAh\n* 💧 20 mL de e-líquido\n* 🌀 Quad Mesh Coil para sabor mais intenso\n* 📺 Display 360° com indicador de bateria e nível de líquido\n* ⚡ Modos ECO e PWR\n* 🌬️ Fluxo de ar ajustável\n* 🔌 Carregamento USB-C\n* 🚀 Acionamento automático por sucção\n* ❄️ Grande variedade de sabores premium. ",
    "basePrice": 120,
    "basePromoPrice": 100,
    "wholesalePrice": 55,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "DOJO 40K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/v21gmo3iy2f-1785771810702.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-03 15:44:20.75",
    "flavors": [
      {
        "id": "df5329b3-a96f-4cec-a984-3c2542d27b79",
        "productId": "660f90fd-3c42-423f-87a1-c164ab9483ef",
        "name": "Frozen laranja vermelha ",
        "imageUrl": "/storage/products/flav-df5329b3-a96f-4cec-a984-3c2542d27b79.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Frozen grapefruit ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "62190d5e-2ffe-4f12-9b5b-421b9317936e",
    "name": "IGNITE V80 SLIM 8 MIL PUFS ",
    "slug": "ignite-v80-slim-8-mil-pufs-",
    "brand": "IGNITE",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "Aqui está uma descrição pronta para o Ignite V80 Slim:\n\n🔥 Ignite V80 Slim – 8.000 Puffs\n\nO Ignite V80 Slim combina um design ultrafino e elegante com alto desempenho, oferecendo até 8.000 puxadas. Equipado com bateria recarregável de 700 mAh via USB-C, tela LED para indicação de bateria e nível de líquido, além de Mesh Coil, proporciona sabor intenso, vapor consistente e uma experiência premium do início ao fim. Ideal para quem busca praticidade, autonomia e um dispositivo discreto para o dia a dia. \n\n⚙️ Especificações:\n\n* 💨 Até 8.000 puffs\n* 🔋 Bateria 700 mAh recarregável (USB-C)\n* 📺 Tela LED com indicador de bateria e líquido\n* 🌬️ Mesh Coil para melhor sabor\n* 💧 Sistema anti-vazamento\n* ⚡ Acionamento automático por sucção\n* 🧊 Sabores intensos e refrescantes\n* 🎨 Design ultrafino (Slim), leve e fácil de transportar. ",
    "basePrice": 85,
    "basePromoPrice": null,
    "wholesalePrice": 60,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V80 SLIM ",
    "internalCode": "",
    "mainImageUrl": "/storage/products/x28qvgv444h-1785771294477.jpeg",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-03 15:36:01.517",
    "flavors": [
      {
        "id": "fd339b15-d291-472f-b80c-5a491f228d94",
        "productId": "62190d5e-2ffe-4f12-9b5b-421b9317936e",
        "name": "Maracujá Kiwi ",
        "imageUrl": "/storage/products/fzsql6khshc-1785771462215.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 4,
        "sku": "Passion fruit suor kiwi ",
        "description": "",
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "f3bbaf85-7d29-47fd-9506-d805c38d6a20",
        "productId": "62190d5e-2ffe-4f12-9b5b-421b9317936e",
        "name": "Morango ice ",
        "imageUrl": "/storage/products/s3w0boqktlr-1785771507724.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Stramberry ice V80 ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "d02bd3fa-7768-4218-8f49-48882cf508d4",
        "productId": "62190d5e-2ffe-4f12-9b5b-421b9317936e",
        "name": "Banana ice ",
        "imageUrl": "/storage/products/7mzcc29gdvk-1785771613718.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Banana ice V80 Slim",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "8279daaf-8027-43e8-80b1-ef9568e1be46",
        "productId": "62190d5e-2ffe-4f12-9b5b-421b9317936e",
        "name": "Banana cereja ",
        "imageUrl": "/storage/products/zw6n6k8fm5-1785771646406.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Banana cherry",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "293312bb-a9ed-439e-b66f-ca00a0b07255",
    "name": "ELFBAR SISHA DELUX 18K-18 MIL PUFS",
    "slug": "elfbar-sisha-delux-18k-18-mil-pufs",
    "brand": "ELFBAR",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "Elf Bar Shisha Luxe 18K\n\nO Elf Bar Shisha Luxe 18K foi desenvolvido para quem busca alta autonomia, desempenho consistente e um design moderno. Com capacidade de até 18.000 puffs (conforme o modo de uso), ele entrega uma experiência suave e intensa, com excelente reprodução de sabor do início ao fim.\n\nSeu visual premium alia ergonomia e praticidade, enquanto a bateria recarregável e o sistema de alto rendimento garantem maior durabilidade para o uso diário. Além disso, o dispositivo conta com indicadores de funcionamento que tornam o acompanhamento da bateria e do nível de líquido muito mais prático.\n\nDestaques:\n\n* Até 18.000 puffs.\n* Bateria recarregável.\n* Excelente intensidade e fidelidade de sabor.\n* Design premium, confortável e moderno.\n* Indicadores de bateria e e-liquid.\n* Ideal para quem procura longa duração e praticidade.",
    "basePrice": 110,
    "basePromoPrice": 95,
    "wholesalePrice": 58,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Sisha 18K",
    "internalCode": null,
    "mainImageUrl": "/storage/products/wmleihlhzxd-1786105942943.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-07 12:33:36.262",
    "flavors": []
  },
  {
    "id": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
    "name": "IGNITE V400 MIX 40K DE PUFS ",
    "slug": "ignite-v400-mix-40k-de-pufs-",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "",
    "basePrice": 130,
    "basePromoPrice": null,
    "wholesalePrice": 83,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V400 MIX ",
    "internalCode": null,
    "mainImageUrl": "/storage/products/ftc51w7xv4w-1785284093261.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-29 00:15:01.436",
    "flavors": [
      {
        "id": "586bcc5c-532e-43f1-a439-1b2ad1c1e93f",
        "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
        "name": "Laranja/ Morango ice ",
        "imageUrl": "/storage/products/fsnh5g0p9tt-1785773471690.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 10,
        "sku": "Orange Strawberry ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "e3c55f8e-a8dc-4f3c-b6aa-718779cdf521",
        "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
        "name": "Morango manga ice/ Banana ice ",
        "imageUrl": "/storage/products/ywv1ojqgr-1785773542609.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 10,
        "sku": "Stramberry mango ice banana ice ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "2fe4d010-9ddb-4548-85e5-8ee398f466ec",
        "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
        "name": "Icy mint/ Pêssego uva ",
        "imageUrl": "/storage/products/8m6u0dj5rsg-1785773340158.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 7,
        "sku": "Menta gelada peach Grape ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "aa3af41f-b3d4-4ad0-b7ba-666aefb2c556",
        "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
        "name": "Melão/ Menthol ",
        "imageUrl": "/storage/products/3zi8n18febj-1785773401965.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 9,
        "sku": "Melon Menthol ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "d47f470b-725c-4ae0-8dfc-58ca12fe1b5d",
    "name": "LOST MARY MIXER 2 SABORES ",
    "slug": "lost-mary-mixer-2-sabores-",
    "brand": "LOST MARY",
    "categoryId": "f39697b3-1325-4248-a03f-cb538d38f8e6",
    "category": {
      "id": "f39697b3-1325-4248-a03f-cb538d38f8e6",
      "name": "OUTROS",
      "slug": "outros",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-outros.png",
      "color": "#0284c7",
      "displayOrder": 5,
      "active": true,
      "productCount": 4
    },
    "description": "LOST MARY MIXER 30K\n\nO Lost Mary Mixer 30K combina dois sabores em um único dispositivo, permitindo alternar entre eles ou misturá-los para criar diferentes combinações.\n\nEspecificações:\n\n* Até 30.000 puffs no modo Regular\n* Até 15.000 puffs no modo Turbo\n* Bateria: 800 mAh\n* Recarga: USB Type-C\n* E-líquido: 19 ml\n* Nicotina: 5% (50 mg/ml), conforme a versão\n* Tela digital: indica bateria, líquido e sabor selecionado\n* Sistema Dual Flavor: permite alternar entre os sabores\n* Modo Turbo: maior intensidade de vapor e sabor\n* Acionamento automático: basta puxar para utilizar",
    "basePrice": 95,
    "basePromoPrice": null,
    "wholesalePrice": 49,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "LOST MARY",
    "internalCode": null,
    "mainImageUrl": "/storage/products/t6j67yjpefo-1788916404881.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-09-09 01:15:26.61",
    "flavors": []
  },
  {
    "id": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
    "name": "IGNITE V500-50 MIL PUFS",
    "slug": "ignite-v500-50-mil-pufs",
    "brand": "Ignite ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "",
    "basePrice": 150,
    "basePromoPrice": null,
    "wholesalePrice": 96,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V500",
    "internalCode": null,
    "mainImageUrl": "/storage/products/xt5ozmh5q4i-1786035376510.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-06 16:56:51.254",
    "flavors": [
      {
        "id": "61c5e44e-1e25-444e-985f-4d1f05adce4c",
        "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
        "name": "Maçã verde pêssego ",
        "imageUrl": null,
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Green Apple peach",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "9ef3381d-aeaa-47ba-8866-e4325c164d50",
        "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
        "name": "Uva ice ",
        "imageUrl": null,
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Grape ice v500",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "fede02c7-b46b-4e3f-8fd8-746d3e7cb088",
        "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
        "name": "Melancia mix ",
        "imageUrl": null,
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Watermelon mix ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
    "name": "IGNITE SLIM V400-40 MIL PUFS ",
    "slug": "ignite-slim-v400-40-mil-pufs-",
    "brand": "IGNITE",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "Ignite V400 Slim – Descrição\n\nO Ignite V400 Slim é um pod descartável premium que combina design fino e elegante com alto desempenho. Equipado com bateria recarregável e tecnologia de aquecimento avançada, entrega vapor consistente, excelente intensidade de sabor e uma experiência suave do início ao fim.\n\nCom capacidade para até 40.000 puffs e 5% de nicotina, o V400 Slim oferece longa duração, praticidade e um formato compacto, ideal para o dia a dia. Seu acabamento moderno proporciona conforto na pegada e um visual sofisticado.\n\nCaracterísticas:\n\n* Até 40.000 puffs\n* 5% de nicotina\n* Bateria recarregável\n* Design slim, leve e ergonômico\n* Sabor intenso e vapor consistente\n* Ideal para quem busca praticidade e longa autonomia",
    "basePrice": 150,
    "basePromoPrice": null,
    "wholesalePrice": 86,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V400 SLIM",
    "internalCode": null,
    "mainImageUrl": "/storage/products/gcei6xfty8p-1786035294999.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-08-06 16:55:33.323",
    "flavors": [
      {
        "id": "436e4357-73ad-4641-9101-3e246e346214",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "SAKURA UVA ",
        "imageUrl": "/storage/products/evvvjfmrmfv-1786035599559.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Flor de uva ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "3caa31ab-b7e7-4bb6-bb8a-7f7c0e82c1b7",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Uva ",
        "imageUrl": "/storage/products/1jvxoqxx4m3-1786035647945.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Grape ice v400",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "d21143da-08ee-4395-b64f-7b8ab22a08dc",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Morango ",
        "imageUrl": "/storage/products/39bylmznnns-1786035683045.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Morango ice v400",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "d0951b34-dcbd-4fc1-b883-37f2c250c81e",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Banana cereja ice ",
        "imageUrl": "/storage/products/0d6xn9cxj1xq-1786035711269.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Banana cereja ice v400",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "71f6da7c-d5fe-4d7c-aea6-5f52fe826633",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Morango kiwi ",
        "imageUrl": "/storage/products/oezajsgzqne-1786035543328.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Morango kiwi v400",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "a8814549-3912-44a7-b62f-c83d42877e42",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Morango maçã melancia ",
        "imageUrl": "/storage/products/u6px9snhjn9-1786035624160.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Morango maçã melancia ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "e04d26cc-eafc-4fa9-bc93-95e31c0aaf46",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Blue razz lemon ",
        "imageUrl": "/storage/products/2kamgy0dpzc-1786035512535.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "FRUTAS AZUIS ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "824dfe78-0350-4f07-8e31-83212a8de762",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Menta ",
        "imageUrl": "/storage/products/eem43yhu2ks-1786035733201.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Menta v400 slim ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "f6ec2136-9d82-44ee-a55b-fd21765a1472",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "name": "Morango banana ",
        "imageUrl": "/storage/products/71amiif10qs-1786035763617.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Morango banana v400 slim",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "013a0c75-a979-4c32-ac26-d1ab6ba3243d",
    "name": "IGNITE V250 ",
    "slug": "ignite-v250-",
    "brand": "IGNITE ",
    "categoryId": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
    "category": {
      "id": "cf5b94c6-64eb-40ab-960a-7a9b185daa35",
      "name": "IGNITE",
      "slug": "ignite",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-ignite.jpg",
      "color": "#0284c7",
      "displayOrder": 0,
      "active": true,
      "productCount": 13
    },
    "description": "🔥 IGNITE V250 – Até 25.000 Puffs 🔥\n\nO IGNITE V250 foi desenvolvido para quem busca máximo desempenho, alta autonomia e sabores intensos! 😮‍💨💨\n\nCom um design moderno e ergonômico ✨, ele entrega uma experiência premium do começo ao fim, combinando praticidade com excelente produção de vapor.\n\n⚡ Destaques do IGNITE V250:\n• 💨 Até 25.000 puffs\n• 🔋 Bateria recarregável via USB-C\n• 🔥 Tecnologia Mesh Coil para sabor mais intenso\n• 🚀 Modos Eco e Boost\n• 🎯 Acionamento automático por sucção\n• 💎 Design premium e acabamento sofisticado\n• 💨 Vapor consistente e excelente durabilidade\n\nSe você procura um pod potente, com longa duração e desempenho de alto nível, o IGNITE V250 é a escolha ideal! 🚀😎",
    "basePrice": 110,
    "basePromoPrice": null,
    "wholesalePrice": 72,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "V250",
    "internalCode": "",
    "mainImageUrl": "/storage/products/vq4xkbkbelo-1785190121355.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-07-27 22:09:15.843",
    "flavors": [
      {
        "id": "808140a1-508e-459f-aebb-b4661f43e9ad",
        "productId": "013a0c75-a979-4c32-ac26-d1ab6ba3243d",
        "name": "Menthol ",
        "imageUrl": "/storage/products/xi6reg4y0l-1785856123922.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Menta v250 ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "1208240a-93cf-42fa-b04f-d4906329d093",
        "productId": "013a0c75-a979-4c32-ac26-d1ab6ba3243d",
        "name": "Melancia ice ",
        "imageUrl": "/storage/products/ipgpw252n1f-1785856176049.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Watermelon ice V250",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "73cf7bb6-0fba-4a0d-aced-67b701f34529",
        "productId": "013a0c75-a979-4c32-ac26-d1ab6ba3243d",
        "name": "Uva ice ",
        "imageUrl": "/storage/products/dy3020jc9zo-1785856286354.jpeg",
        "price": null,
        "wholesalePrice": null,
        "stock": 2,
        "sku": "Grape ice v250",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "17a11b97-30d9-4847-9769-c4fa276dd4ef",
        "productId": "013a0c75-a979-4c32-ac26-d1ab6ba3243d",
        "name": "Morango ice ",
        "imageUrl": "/storage/products/6i19l0n8zw2-1785856351734.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 1,
        "sku": "Stramberry ice v250",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
    "name": "REFIL ELFBAR EW",
    "slug": "refil-elfbar-ew",
    "brand": "Elfbar ",
    "categoryId": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
    "category": {
      "id": "c4870541-27f8-4a10-adb9-633a0a3aa9a9",
      "name": "ELFBAR ",
      "slug": "elfbar-",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-elfbar-.jpg",
      "color": "#0284c7",
      "displayOrder": 1,
      "active": true,
      "productCount": 10
    },
    "description": "Apenas o refil ",
    "basePrice": 55,
    "basePromoPrice": null,
    "wholesalePrice": 35,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Refil ew",
    "internalCode": null,
    "mainImageUrl": "/storage/products/lin1jjm5mfk-1788279791971.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-09-01 16:23:36.505",
    "flavors": [
      {
        "id": "8e06c272-343e-43b6-8b83-0cce17515e1b",
        "productId": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
        "name": "Suor maçã verde ",
        "imageUrl": "/storage/products/6v8t69g1xq3-1788280086021.png",
        "price": null,
        "wholesalePrice": null,
        "stock": 7,
        "sku": "Maçã verde ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "b8b74a32-e910-47c9-851c-dacf18889d4d",
    "name": "DINNER GALAXY 60K ",
    "slug": "dinner-galaxy-60k-",
    "brand": "DINNER LADY",
    "categoryId": "1c72eb85-e34c-4056-9c7d-dbff5f94b747",
    "category": {
      "id": "1c72eb85-e34c-4056-9c7d-dbff5f94b747",
      "name": "DINNER LADY",
      "slug": "dinner-lady",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-dinner-lady.png",
      "color": "#0284c7",
      "displayOrder": 7,
      "active": true,
      "productCount": 3
    },
    "description": "Dinner 60K\n\nDispositivo eletrônico descartável da linha Dinner, desenvolvido com formato compacto e prático para transporte.\n\n• Modelo: Dinner 60K\n• Capacidade: 60.000 puffs (conforme especificação do fabricante)\n• Design compacto e moderno\n• Disponível em diferentes opções de sabores, conforme estoque\n• Produto destinado exclusivamente a maiores de 18 anos, onde permitido pela legislação vigente.\n\nVerifique a embalagem e as especificações do fabricante para informações sobre composição, capacidade e demais características.",
    "basePrice": 135,
    "basePromoPrice": null,
    "wholesalePrice": 85,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "Dinner galaxy",
    "internalCode": null,
    "mainImageUrl": "/storage/products/uru57jtn0ka-1788884734752.webp",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-09-08 16:26:23.406",
    "flavors": [
      {
        "id": "4d350213-cd03-4624-8b6d-7429a33735c2",
        "productId": "b8b74a32-e910-47c9-851c-dacf18889d4d",
        "name": "Ultimato melão ",
        "imageUrl": "/storage/products/vmqb1i6x23j-1788916112046.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 7,
        "sku": "Melão doce ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "c51d1118-3c39-4810-a3e6-05198460d712",
        "productId": "b8b74a32-e910-47c9-851c-dacf18889d4d",
        "name": "Sour mangá abacaxi ",
        "imageUrl": "/storage/products/t0r1q7z10f-1788916295150.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Sour mango pinneaple ",
        "description": null,
        "displayOrder": 0,
        "active": true
      },
      {
        "id": "162264ba-0c82-4d40-83fe-f78424370a0d",
        "productId": "b8b74a32-e910-47c9-851c-dacf18889d4d",
        "name": "Morango cereja ",
        "imageUrl": "/storage/products/5ezn4rw5si-1788885081314.webp",
        "price": null,
        "wholesalePrice": null,
        "stock": 3,
        "sku": "Stramberry Strawberry ",
        "description": null,
        "displayOrder": 0,
        "active": true
      }
    ]
  },
  {
    "id": "fd53b5a2-55d7-48ad-8977-ebc1e68774ac",
    "name": "LOST M 15 MIL PUFS ",
    "slug": "lost-m-15-mil-pufs-",
    "brand": "Lost M ",
    "categoryId": "f39697b3-1325-4248-a03f-cb538d38f8e6",
    "category": {
      "id": "f39697b3-1325-4248-a03f-cb538d38f8e6",
      "name": "OUTROS",
      "slug": "outros",
      "icon": "Package",
      "imageUrl": "/storage/products/cat-outros.png",
      "color": "#0284c7",
      "displayOrder": 5,
      "active": true,
      "productCount": 4
    },
    "description": "LOST M 15K\n\nO LOST M 15K apresenta um design compacto e moderno, desenvolvido para oferecer praticidade e uma experiência consistente. Seu formato ergonômico facilita o transporte e proporciona uma pegada confortável.\n\nCaracterísticas:\n\n* Até 15.000 puffs\n* Design compacto e ergonômico\n* Acionamento automático\n* Construção moderna e acabamento premium\n* Disponível em diferentes opções de sabor",
    "basePrice": 95,
    "basePromoPrice": null,
    "wholesalePrice": 50,
    "minWholesaleQty": 5,
    "hasFlavors": true,
    "baseStock": 0,
    "baseSku": "LOST M",
    "internalCode": null,
    "mainImageUrl": "/storage/products/7k64n0douxw-1788916668598.png",
    "gallery": [],
    "weight": 0,
    "active": true,
    "createdAt": "2026-09-09 01:19:07.688",
    "flavors": []
  }
];

export const mockOrders: any[] = [
  {
    "id": "33367740-c7d7-437f-906d-2011c2d1ab6e",
    "number": 46,
    "clientId": "869566e6-8215-4ce3-8764-b80fa834ca29",
    "client": {
      "id": "869566e6-8215-4ce3-8764-b80fa834ca29",
      "name": "Matheus Da Silva Madureira",
      "phone": "15974074261",
      "email": null
    },
    "address": {
      "id": "8765a368-10c5-492a-932a-f3e52032be09",
      "cep": "18117236",
      "street": "Rua Domingos Arruda Ferraz",
      "number": "51",
      "complement": "Poiato recicla",
      "neighborhood": "Parque Jataí",
      "city": "Votorantim",
      "state": "SP",
      "distanceKm": 15.8
    },
    "subtotal": 95,
    "deliveryFee": 20,
    "total": 115,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-11-19T16:40:15.960Z",
    "items": [
      {
        "id": "f22834ef-63cd-4af2-a200-25f85d15984b",
        "productId": "8a6c3d2e-be18-4c5d-a4cb-21fceacf9873",
        "productName": "OXBAR MAGIC 2.0 30K-30 MIL PUFS",
        "productImage": "/storage/products/bmpqbm7neav-1785336426555.webp",
        "flavorId": "6fab5609-400e-48b1-96e8-ade04a4221c4",
        "flavorName": "Melancia menta ",
        "quantity": 1,
        "priceAtPurchase": 95
      }
    ],
    "history": [
      {
        "id": "b8795046-0cee-4d6b-b5ff-bd7d1eb9c1cf",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-11-19T16:40:15.960Z"
      }
    ]
  },
  {
    "id": "aaca5ae1-3d68-40d5-94f8-90008b6bbbf4",
    "number": 45,
    "clientId": "5664c0f6-02b4-4f8c-af5c-279db89bd6c4",
    "client": {
      "id": "5664c0f6-02b4-4f8c-af5c-279db89bd6c4",
      "name": "Lucas Borba da Silva Pessoa",
      "phone": "(15) 99156-6870",
      "email": null
    },
    "address": {
      "id": "860dd965-5fa2-44ac-a93c-62deda81fe40",
      "cep": "18047-620",
      "street": "Avenida Antônio Carlos Comitre",
      "number": "1230",
      "complement": "Just intercambios",
      "neighborhood": "Parque Campolim",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 8.9
    },
    "subtotal": 100,
    "deliveryFee": 10,
    "total": 110,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-11-18T17:29:55.660Z",
    "items": [
      {
        "id": "aa033b88-3804-4d8d-9a07-d5509c6766e5",
        "productId": "660f90fd-3c42-423f-87a1-c164ab9483ef",
        "productName": "DOJO SPHERE X 40K-40 MIL PUFS ",
        "productImage": "/storage/products/v21gmo3iy2f-1785771810702.jpeg",
        "flavorId": "df5329b3-a96f-4cec-a984-3c2542d27b79",
        "flavorName": "Frozen laranja vermelha ",
        "quantity": 1,
        "priceAtPurchase": 100
      }
    ],
    "history": [
      {
        "id": "fce9485f-bcf9-4880-b5bb-390cc76b9f3a",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-11-18T17:29:55.660Z"
      }
    ]
  },
  {
    "id": "40ea231b-59c5-4a24-8a28-5a8df59e3707",
    "number": 44,
    "clientId": "961acc6f-5c11-4013-967e-c8bc9b376e9d",
    "client": {
      "id": "961acc6f-5c11-4013-967e-c8bc9b376e9d",
      "name": "Daniela Pontes",
      "phone": "(15) 15996704971",
      "email": null
    },
    "address": {
      "id": "d9b0bf4e-3d68-496d-bc9f-098eae51af2c",
      "cep": "18071-801",
      "street": "Avenida Ipanema",
      "number": "10960",
      "complement": "ENTREGA NA PORTARIA PARA DANIELA SOARES",
      "neighborhood": "Jardim Novo Horizonte",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 3.9
    },
    "subtotal": 135,
    "deliveryFee": 5,
    "total": 140,
    "paymentMethod": "PIX",
    "notes": "Pix",
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-11-13T22:31:40.294Z",
    "items": [
      {
        "id": "4b385894-f85a-4f25-ae89-21c794480921",
        "productId": "b8b74a32-e910-47c9-851c-dacf18889d4d",
        "productName": "DINNER GALAXY 60K ",
        "productImage": "/storage/products/uru57jtn0ka-1788884734752.webp",
        "flavorId": "162264ba-0c82-4d40-83fe-f78424370a0d",
        "flavorName": "Morango cereja ",
        "quantity": 1,
        "priceAtPurchase": 135
      }
    ],
    "history": [
      {
        "id": "ec54f4ac-a86e-41d5-8e5f-aae07a971549",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-11-13T22:31:40.294Z"
      }
    ]
  },
  {
    "id": "0ca6b0b9-c37c-41ce-a180-344c27ee6185",
    "number": 43,
    "clientId": "7e00f942-75db-403d-8f9f-b1b018adc8e5",
    "client": {
      "id": "7e00f942-75db-403d-8f9f-b1b018adc8e5",
      "name": "Maria Fernanda Gardino",
      "phone": "15991919415",
      "email": null
    },
    "address": {
      "id": "c38bd10c-af68-4a48-9724-db14eced9945",
      "cep": "18055215",
      "street": "Avenida Elias Maluf",
      "number": "3305",
      "complement": "portaria",
      "neighborhood": "Wanel Ville",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 7.2
    },
    "subtotal": 150,
    "deliveryFee": 10,
    "total": 160,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-10-24T03:39:11.543Z",
    "items": [
      {
        "id": "c4988d97-40c1-49c9-92d1-c41c353cfc5a",
        "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
        "productName": "IGNITE SLIM V400-40 MIL PUFS ",
        "productImage": "/storage/products/gcei6xfty8p-1786035294999.png",
        "flavorId": "f6ec2136-9d82-44ee-a55b-fd21765a1472",
        "flavorName": "Morango banana ",
        "quantity": 1,
        "priceAtPurchase": 150
      }
    ],
    "history": [
      {
        "id": "12a2427f-c119-45b9-9d5e-81357db586a1",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-10-24T03:39:11.543Z"
      }
    ]
  },
  {
    "id": "ecbb2daf-b656-4759-9dde-fc8622814ac9",
    "number": 42,
    "clientId": "8cf48b57-22cb-4fa8-9d98-72b6c0ffa5cb",
    "client": {
      "id": "8cf48b57-22cb-4fa8-9d98-72b6c0ffa5cb",
      "name": "Renato Dantas",
      "phone": "(15) 99796-1056",
      "email": null
    },
    "address": {
      "id": "6513c176-44ef-43cb-9d8f-144183e72fc8",
      "cep": "18072-570",
      "street": "Rua Maria Aparecida Faria",
      "number": "156",
      "complement": null,
      "neighborhood": "Parque São Bento",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 8
    },
    "subtotal": 95,
    "deliveryFee": 10,
    "total": 105,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-10-23T08:57:35.622Z",
    "items": [
      {
        "id": "9ca2dbcf-5aa8-4396-9a83-27424fc0adde",
        "productId": "64940fe5-089e-4408-bcb3-4e2c9b8078ec",
        "productName": "NIK BAR 30K-30 MIL PUFS ",
        "productImage": "/storage/products/x93ro8z0apa-1785597514242.webp",
        "flavorId": "e86f9b7c-1d9a-4cc7-988d-76905981359b",
        "flavorName": "Menthol ",
        "quantity": 1,
        "priceAtPurchase": 95
      }
    ],
    "history": [
      {
        "id": "45b494ae-bc94-4942-b305-0d70f460f56f",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-10-23T08:57:35.622Z"
      }
    ]
  },
  {
    "id": "2ca27c85-ec45-4ee9-b904-8c52fb24ff4b",
    "number": 41,
    "clientId": "b4f00696-9a84-494e-927b-5b7ebd719841",
    "client": {
      "id": "b4f00696-9a84-494e-927b-5b7ebd719841",
      "name": "Vitor Heidmann",
      "phone": "13997023013",
      "email": null
    },
    "address": {
      "id": "22780107-b3c9-4115-8244-516207610ce9",
      "cep": "18072395",
      "street": "Rua Elisia Estáusia",
      "number": "10",
      "complement": "Casa 2",
      "neighborhood": "Parque São Bento",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5.7
    },
    "subtotal": 240,
    "deliveryFee": 8,
    "total": 248,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-10-18T02:50:49.182Z",
    "items": [
      {
        "id": "ce11ae4c-f170-4a82-ab0f-0177a246f6c7",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "productName": "BLACK SHEEP 40K- 40 MIL PUFS DUAS SABOR",
        "productImage": "/storage/products/pf0muchtkwp-1785462120568.webp",
        "flavorId": "8258f167-17c3-49e8-878a-63d4feace628",
        "flavorName": "Uva/ Menthol ",
        "quantity": 1,
        "priceAtPurchase": 120
      },
      {
        "id": "3539de08-8b10-4611-b18e-127a5d578a98",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "productName": "BLACK SHEEP 40K- 40 MIL PUFS DUAS SABOR",
        "productImage": "/storage/products/pf0muchtkwp-1785462120568.webp",
        "flavorId": "6aa59b41-1828-48c1-abeb-02208eb89be2",
        "flavorName": "Chiclete Blueberry/ suor maçã verde ",
        "quantity": 1,
        "priceAtPurchase": 120
      }
    ],
    "history": [
      {
        "id": "9679ff13-c8b4-4681-a5cb-e2b61112ce71",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-10-18T02:50:49.182Z"
      }
    ]
  },
  {
    "id": "531430a7-8fe9-48a8-ae8a-217b40c9678b",
    "number": 40,
    "clientId": "b4f00696-9a84-494e-927b-5b7ebd719841",
    "client": {
      "id": "b4f00696-9a84-494e-927b-5b7ebd719841",
      "name": "Vitor Heidmann",
      "phone": "13997023013",
      "email": null
    },
    "address": {
      "id": "6a417ef5-8c67-43d9-b703-ec3827869eac",
      "cep": "18072395",
      "street": "Elisia Estausia",
      "number": "10",
      "complement": "Casa 2",
      "neighborhood": "Parque São Bento",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5.7
    },
    "subtotal": 120,
    "deliveryFee": 8,
    "total": 128,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-10-18T02:45:36.703Z",
    "items": [
      {
        "id": "4dadf880-3e61-48fb-9057-221b4410b8f9",
        "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
        "productName": "BLACK SHEEP 40K- 40 MIL PUFS DUAS SABOR",
        "productImage": "/storage/products/pf0muchtkwp-1785462120568.webp",
        "flavorId": "72114a15-4a0d-426b-8a96-4c212ade3571",
        "flavorName": "Morango kiwi/ Fresh ment ",
        "quantity": 1,
        "priceAtPurchase": 120
      }
    ],
    "history": [
      {
        "id": "722c7add-114e-4890-8669-72a20c74ef77",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-10-18T02:45:36.703Z"
      }
    ]
  },
  {
    "id": "7aaf0f9c-56ca-4a5a-96ea-e0c0ba911e1f",
    "number": 39,
    "clientId": "6b369fce-93b4-474a-97d6-6a920218f01b",
    "client": {
      "id": "6b369fce-93b4-474a-97d6-6a920218f01b",
      "name": "Milenna",
      "phone": "15997843023",
      "email": null
    },
    "address": {
      "id": "47c2383e-bec9-410c-a99a-ff5cad2880e3",
      "cep": "15997843023",
      "street": "Rua Olímpio Mentone",
      "number": "178",
      "complement": null,
      "neighborhood": "Vila Aeroporto",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5
    },
    "subtotal": 65,
    "deliveryFee": 5,
    "total": 70,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-10-10T23:29:58.584Z",
    "items": [
      {
        "id": "9e992ef3-0f55-433e-b946-a21d0019bbd8",
        "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
        "productName": "NIK BAR 10K-10 MIL PUFS",
        "productImage": "/storage/products/8dx6qqxx4wh-1785577623184.jpeg",
        "flavorId": "60ca2082-46c3-4d35-94e8-7c83cc8d22f4",
        "flavorName": "Uva ice ",
        "quantity": 1,
        "priceAtPurchase": 65
      }
    ],
    "history": [
      {
        "id": "2a9bea33-b171-488b-9c32-66db02a367cc",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-10-10T23:29:58.584Z"
      }
    ]
  },
  {
    "id": "d6afb134-2bbd-4ade-9730-ab9b663f21d3",
    "number": 38,
    "clientId": "2786d7e6-3e11-4d54-89df-768f663070f3",
    "client": {
      "id": "2786d7e6-3e11-4d54-89df-768f663070f3",
      "name": "Isabelle Gonçalves Turaça",
      "phone": "15988003914",
      "email": null
    },
    "address": {
      "id": "dc836682-7419-4aec-805e-2ba266b78d4e",
      "cep": "18015000",
      "street": "Rua Pedro José Senger",
      "number": "1190",
      "complement": "Turaça Pastelaria",
      "neighborhood": "Vila Haro",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 7
    },
    "subtotal": 90,
    "deliveryFee": 8,
    "total": 98,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-10-10T23:17:08.375Z",
    "items": [
      {
        "id": "b66f5d7c-7510-4fd1-a45f-08c08c56afee",
        "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
        "productName": "DINNER LADY LUMA 20K-20 ML PUFS ",
        "productImage": "/storage/products/prod-674f117a-3aab-4be5-8fd7-068e4861578f.png",
        "flavorId": "e1dd9304-db11-45ea-a54b-9d259316d30e",
        "flavorName": "Uva ice ",
        "quantity": 1,
        "priceAtPurchase": 90
      }
    ],
    "history": [
      {
        "id": "8591bb60-4059-4528-8721-3908f11551fd",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-10-10T23:17:08.375Z"
      }
    ]
  },
  {
    "id": "29016e4d-19cf-48f6-9729-528e37883a91",
    "number": 37,
    "clientId": "d6cafbfb-ea5e-40f6-bb5e-51b4f2f44552",
    "client": {
      "id": "d6cafbfb-ea5e-40f6-bb5e-51b4f2f44552",
      "name": "Éric",
      "phone": "15997940856",
      "email": null
    },
    "address": {
      "id": "d21d4ba0-25bb-4493-872c-cd5b5d416f84",
      "cep": "18072856",
      "street": "Rua Seraphim Banietti",
      "number": "853",
      "complement": null,
      "neighborhood": "Caguassu",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 4.9
    },
    "subtotal": 65,
    "deliveryFee": 5,
    "total": 70,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-09-16T19:15:39.845Z",
    "items": [
      {
        "id": "f1064bc5-dcf3-445b-9140-f4797d004421",
        "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
        "productName": "NIK BAR 10K-10 MIL PUFS",
        "productImage": "/storage/products/8dx6qqxx4wh-1785577623184.jpeg",
        "flavorId": "60ca2082-46c3-4d35-94e8-7c83cc8d22f4",
        "flavorName": "Uva ice ",
        "quantity": 1,
        "priceAtPurchase": 65
      }
    ],
    "history": [
      {
        "id": "74e43a52-b08a-4e25-80cf-d11a05787949",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-16T19:15:39.845Z"
      }
    ]
  },
  {
    "id": "93074b32-376e-4940-a803-18ed72d2f39f",
    "number": 36,
    "clientId": "807f2bff-42d1-4166-b77b-251f27965e0c",
    "client": {
      "id": "807f2bff-42d1-4166-b77b-251f27965e0c",
      "name": "eric",
      "phone": "15996490256",
      "email": null
    },
    "address": {
      "id": "8eabebb5-4d1a-4619-aa6e-30e1dc969b1d",
      "cep": "18055745",
      "street": "Rua Padre Domenico Trivi",
      "number": "350",
      "complement": null,
      "neighborhood": "Parque Esmeralda",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 6.9
    },
    "subtotal": 55,
    "deliveryFee": 8,
    "total": 63,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "NEW",
    "whatsappSent": true,
    "createdAt": "2026-09-11T19:22:56.490Z",
    "items": [
      {
        "id": "43ac2619-e58d-4682-a454-af12bba6a9c9",
        "productId": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
        "productName": "REFIL ELFBAR EW",
        "productImage": "/storage/products/lin1jjm5mfk-1788279791971.png",
        "flavorId": "8e06c272-343e-43b6-8b83-0cce17515e1b",
        "flavorName": "Suor maçã verde ",
        "quantity": 1,
        "priceAtPurchase": 55
      }
    ],
    "history": [
      {
        "id": "233b96e9-b3ee-4f38-bb13-e490dcd38ace",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-11T19:22:56.490Z"
      }
    ]
  },
  {
    "id": "25081133-4b04-48b8-8201-c17025bc9a39",
    "number": 35,
    "clientId": "0026c189-c54f-4e66-9b5e-b5ea7b6ccbf8",
    "client": {
      "id": "0026c189-c54f-4e66-9b5e-b5ea7b6ccbf8",
      "name": "Samuel",
      "phone": "15920012818",
      "email": null
    },
    "address": {
      "id": "354620b9-3ce1-42f8-a5df-5ff0d2a75bc7",
      "cep": "18071095",
      "street": "Rua Rinaldo Scotto",
      "number": "89",
      "complement": "pix",
      "neighborhood": "Jardim Monterrey",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 6.3
    },
    "subtotal": 90,
    "deliveryFee": 8,
    "total": 98,
    "paymentMethod": "PIX",
    "notes": "piX, TA PAGO",
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-11T01:48:32.515Z",
    "items": [
      {
        "id": "1b826eeb-1204-419f-84e8-a6c86b84602c",
        "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
        "productName": "IGNITE V155 ",
        "productImage": "/storage/products/6g03r6xv8qc-1785189839075.webp",
        "flavorId": "7bf5487d-47de-40ba-a34a-47360fa564ac",
        "flavorName": "Uva ice ",
        "quantity": 1,
        "priceAtPurchase": 90
      }
    ],
    "history": [
      {
        "id": "3d0c509a-5606-40ae-bc67-6e5eb111367d",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:26.431Z"
      },
      {
        "id": "54d86fe3-5c59-4492-b90e-0a37779f8007",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-11T01:48:32.515Z"
      }
    ]
  },
  {
    "id": "ac2889ab-01dd-49b6-9ce9-ff7ce6d59386",
    "number": 34,
    "clientId": "f1067a97-644d-4f15-a9f8-1e4ed8598d76",
    "client": {
      "id": "f1067a97-644d-4f15-a9f8-1e4ed8598d76",
      "name": "ana",
      "phone": "15997879963",
      "email": null
    },
    "address": {
      "id": "ca5ff0ab-3d26-4d05-b49c-1b5dc829df5f",
      "cep": "18080001",
      "street": "Rua Comendador Hermelino Matarazzo",
      "number": "1308",
      "complement": null,
      "neighborhood": "Vila Santa Rita",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5.1
    },
    "subtotal": 150,
    "deliveryFee": 8,
    "total": 158,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-11T01:02:03.556Z",
    "items": [
      {
        "id": "369fd489-0b87-40eb-9132-b26915541899",
        "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
        "productName": "IGNITE V500-50 MIL PUFS",
        "productImage": "/storage/products/xt5ozmh5q4i-1786035376510.png",
        "flavorId": "fede02c7-b46b-4e3f-8fd8-746d3e7cb088",
        "flavorName": "Melancia mix ",
        "quantity": 1,
        "priceAtPurchase": 150
      }
    ],
    "history": [
      {
        "id": "3a1cbfca-7abf-4bd1-8f15-467d94f5a090",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:22.852Z"
      },
      {
        "id": "8fd31c6a-83f8-423d-99b0-4dab7248b2a3",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-11T01:02:03.556Z"
      }
    ]
  },
  {
    "id": "caf7d51a-cc1f-43d7-99da-2030c40a1aa7",
    "number": 33,
    "clientId": "fb77f019-632d-4bb1-80d8-7135b7cabef5",
    "client": {
      "id": "fb77f019-632d-4bb1-80d8-7135b7cabef5",
      "name": "arrais",
      "phone": "15991783464",
      "email": null
    },
    "address": {
      "id": "1b906c8c-7e91-42c9-8d03-73c3f4c71752",
      "cep": "18112240",
      "street": "Rua Sara Vieira Campos",
      "number": "360",
      "complement": null,
      "neighborhood": "Jardim Daniel Antônio",
      "city": "Votorantim",
      "state": "SP",
      "distanceKm": 12.7
    },
    "subtotal": 120,
    "deliveryFee": 15,
    "total": 135,
    "paymentMethod": "PIX",
    "notes": "pago",
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T20:50:04.613Z",
    "items": [
      {
        "id": "117a6794-f5b6-4fb7-b883-002ef0fab572",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "productName": "ELFBAR ICE KING 40K-40 MIL PUFS",
        "productImage": "/storage/products/py44a9huqhj-1785290855433.jpeg",
        "flavorId": "0920ef72-7741-496d-9115-62c3279505f4",
        "flavorName": "Cereja morango ice ",
        "quantity": 1,
        "priceAtPurchase": 120
      }
    ],
    "history": [
      {
        "id": "95a9a05f-f4b0-4fd8-b32d-84042b94ee4a",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:20.861Z"
      },
      {
        "id": "7ad104f3-852f-42ac-b7bb-71efe4cbb248",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T20:50:04.613Z"
      }
    ]
  },
  {
    "id": "5954a5a7-8e15-465c-af2d-6eb68f74b3f8",
    "number": 32,
    "clientId": "50739024-9b96-4b47-90c8-d2f353def243",
    "client": {
      "id": "50739024-9b96-4b47-90c8-d2f353def243",
      "name": "Lucas",
      "phone": "15991005693",
      "email": null
    },
    "address": {
      "id": "f77f9286-95da-405c-a8ea-e5a47fa69893",
      "cep": "18081085",
      "street": "Rua Joaquim Ferreira Barbosa",
      "number": "48",
      "complement": "Centro esportivo",
      "neighborhood": "Jardim Maria do Carmo",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5.8
    },
    "subtotal": 150,
    "deliveryFee": 8,
    "total": 158,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T20:27:36.958Z",
    "items": [
      {
        "id": "efeb0035-1c2c-493a-9301-5c079e00127a",
        "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
        "productName": "IGNITE V500-50 MIL PUFS",
        "productImage": "/storage/products/xt5ozmh5q4i-1786035376510.png",
        "flavorId": "9ef3381d-aeaa-47ba-8866-e4325c164d50",
        "flavorName": "Uva ice ",
        "quantity": 1,
        "priceAtPurchase": 150
      }
    ],
    "history": [
      {
        "id": "70f88988-f3a3-4ed0-977d-883d565c80a3",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:18.129Z"
      },
      {
        "id": "62a63747-1e56-4e73-8b9b-693c58a0dc68",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T20:27:36.958Z"
      }
    ]
  },
  {
    "id": "d5679270-2a67-4e30-beec-a546336091df",
    "number": 31,
    "clientId": "10700ccb-adac-436e-84c6-94e1db4b5ad3",
    "client": {
      "id": "10700ccb-adac-436e-84c6-94e1db4b5ad3",
      "name": "Lucas Abreu",
      "phone": "15997965671",
      "email": null
    },
    "address": {
      "id": "8fc297b2-7ef5-4fa3-b210-715e29e84ca7",
      "cep": "18044010",
      "street": "Rua Imperatriz Leopoldina",
      "number": "46",
      "complement": "Hospital evangelico",
      "neighborhood": "Vila Jardini",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5.8
    },
    "subtotal": 120,
    "deliveryFee": 8,
    "total": 128,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T20:23:45.003Z",
    "items": [
      {
        "id": "e02ec0d2-d53b-43c7-bf77-e0c5711699a3",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "productName": "ELFBAR ICE KING 40K-40 MIL PUFS",
        "productImage": "/storage/products/py44a9huqhj-1785290855433.jpeg",
        "flavorId": "e00776c1-a4ce-4d39-a379-e72816a0be43",
        "flavorName": "Blue razz ",
        "quantity": 1,
        "priceAtPurchase": 120
      }
    ],
    "history": [
      {
        "id": "08cdee32-a2ba-4be0-b9e8-d6a7fc10d301",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:16.121Z"
      },
      {
        "id": "978cf4c3-53e3-4ef4-b9f8-d4ee7d3edf4c",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T20:23:45.003Z"
      }
    ]
  },
  {
    "id": "44762a49-82c0-4c76-b99b-880a0bae7ac0",
    "number": 30,
    "clientId": "870db724-8686-41b7-9894-52f606203f2f",
    "client": {
      "id": "870db724-8686-41b7-9894-52f606203f2f",
      "name": "Rafael",
      "phone": "15997503121",
      "email": null
    },
    "address": {
      "id": "3530f130-3256-4ef8-9cfb-b74e168d58ec",
      "cep": "18104145",
      "street": "Rua Zulmira Cardoso Rodrigues",
      "number": "28",
      "complement": null,
      "neighborhood": "Jardim Ametista",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5.8
    },
    "subtotal": 150,
    "deliveryFee": 8,
    "total": 158,
    "paymentMethod": "CASH",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T20:10:08.173Z",
    "items": [
      {
        "id": "0383e9cc-6e4d-453d-ba67-98edf7b8e252",
        "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
        "productName": "IGNITE V500-50 MIL PUFS",
        "productImage": "/storage/products/xt5ozmh5q4i-1786035376510.png",
        "flavorId": "61c5e44e-1e25-444e-985f-4d1f05adce4c",
        "flavorName": "Maçã verde pêssego ",
        "quantity": 1,
        "priceAtPurchase": 150
      }
    ],
    "history": [
      {
        "id": "58bc9e59-28de-4093-8b6c-83db20ba399d",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:13.613Z"
      },
      {
        "id": "6ee39c36-6f20-4564-8d53-620e089e309d",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T20:10:08.173Z"
      }
    ]
  },
  {
    "id": "1edecbe9-847c-40ca-a34a-52fa5d1d4e43",
    "number": 29,
    "clientId": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
    "client": {
      "id": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
      "name": "Hilary",
      "phone": "1599237500",
      "email": null
    },
    "address": {
      "id": "7ad54236-3346-4a97-8f8b-24a262d747ad",
      "cep": "18117090",
      "street": "Rua Gregôrio Sevilha",
      "number": "46",
      "complement": null,
      "neighborhood": "Parque Santos Dumont",
      "city": "Votorantim",
      "state": "SP",
      "distanceKm": 3.8
    },
    "subtotal": 80,
    "deliveryFee": 5,
    "total": 85,
    "paymentMethod": "CASH",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T02:01:39.960Z",
    "items": [
      {
        "id": "d4226fca-b84b-497a-83f1-520dbba811c7",
        "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
        "productName": "KIT ELFBAR EW BATERIA E REFIL 9K PUFS",
        "productImage": "/storage/products/zgk2n3u1a4-1785289010881.jpeg",
        "flavorId": "c7e4caaf-3740-4758-bd3f-5913eba7b701",
        "flavorName": "Dragon Stranwnana ",
        "quantity": 1,
        "priceAtPurchase": 80
      }
    ],
    "history": [
      {
        "id": "f50e41d8-0f76-44a3-b5d6-a128ac2a74e7",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:11.390Z"
      },
      {
        "id": "001c8468-8fbe-4f1d-959d-f1c952fced99",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T02:01:39.960Z"
      }
    ]
  },
  {
    "id": "443af4c7-ae35-450e-b090-d041edabcdc1",
    "number": 28,
    "clientId": "1b77d358-facb-48b7-8fd3-9965f4079eb6",
    "client": {
      "id": "1b77d358-facb-48b7-8fd3-9965f4079eb6",
      "name": "Júlia",
      "phone": "15974034189",
      "email": null
    },
    "address": {
      "id": "172947a0-e42e-4092-be3e-134e335d5eae",
      "cep": "18066215",
      "street": "Rua Ariberti Fazzio",
      "number": "243",
      "complement": null,
      "neighborhood": "Jardim Nogueira",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 0.9
    },
    "subtotal": 95,
    "deliveryFee": 0,
    "total": 95,
    "paymentMethod": "CASH",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T01:58:52.300Z",
    "items": [
      {
        "id": "890f310f-a80d-4d73-a365-0c2699aa5f3f",
        "productId": "3e53d16a-e319-4ff5-b45e-fed8cfdaf036",
        "productName": "ELFBAR BC 40K-40 MIL PUFS EUA",
        "productImage": "/storage/products/stjyr8v4i98-1785336008207.webp",
        "flavorId": "dee3f8d3-834d-482d-9a32-c4689dde008b",
        "flavorName": "Suor maçã verde ",
        "quantity": 1,
        "priceAtPurchase": 95
      }
    ],
    "history": [
      {
        "id": "608fe8a1-810a-43fa-8f40-128e89f5a75f",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:09.431Z"
      },
      {
        "id": "b3b1fb08-03fe-4a7d-9815-15699f357477",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T01:58:52.300Z"
      }
    ]
  },
  {
    "id": "37322f21-243e-46f3-8178-af53ddf8efa2",
    "number": 27,
    "clientId": "4339d033-66e5-4902-a754-71aaa7abdedd",
    "client": {
      "id": "4339d033-66e5-4902-a754-71aaa7abdedd",
      "name": "Mary",
      "phone": "15981432270",
      "email": null
    },
    "address": {
      "id": "4acba820-80da-43f6-822f-ee086a7ae086",
      "cep": "18055680",
      "street": "Rua Doutor José Stilitano",
      "number": "328",
      "complement": null,
      "neighborhood": "Parque Ouro Fino",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 7.2
    },
    "subtotal": 95,
    "deliveryFee": 10,
    "total": 105,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T01:53:34.567Z",
    "items": [
      {
        "id": "7e304819-370b-4986-a5c7-ed53cb6986b2",
        "productId": "3e53d16a-e319-4ff5-b45e-fed8cfdaf036",
        "productName": "ELFBAR BC 40K-40 MIL PUFS EUA",
        "productImage": "/storage/products/stjyr8v4i98-1785336008207.webp",
        "flavorId": "dee3f8d3-834d-482d-9a32-c4689dde008b",
        "flavorName": "Suor maçã verde ",
        "quantity": 1,
        "priceAtPurchase": 95
      }
    ],
    "history": [
      {
        "id": "72eac9c2-16ba-4af2-be83-6212de150e72",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:07.232Z"
      },
      {
        "id": "affa6593-9cff-4d63-b265-4c56cae8f694",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T01:53:34.567Z"
      }
    ]
  },
  {
    "id": "f5414356-08b4-43f8-8ff1-2c72a1d32a44",
    "number": 26,
    "clientId": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
    "client": {
      "id": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
      "name": "Hilary",
      "phone": "1599237500",
      "email": null
    },
    "address": {
      "id": "7988e809-8917-400d-bfb1-1e1f9c2bf711",
      "cep": "18117090",
      "street": "Rua Gregôrio Sevilha",
      "number": "46",
      "complement": null,
      "neighborhood": "Parque Santos Dumont",
      "city": "Votorantim",
      "state": "SP",
      "distanceKm": 3.8
    },
    "subtotal": 55,
    "deliveryFee": 5,
    "total": 60,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-10T01:15:57.638Z",
    "items": [
      {
        "id": "f9ea6a6c-9c4b-460c-8072-9060d0f2301b",
        "productId": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
        "productName": "REFIL ELFBAR EW",
        "productImage": "/storage/products/lin1jjm5mfk-1788279791971.png",
        "flavorId": "8e06c272-343e-43b6-8b83-0cce17515e1b",
        "flavorName": "Suor maçã verde ",
        "quantity": 1,
        "priceAtPurchase": 55
      }
    ],
    "history": [
      {
        "id": "92c68d81-3721-478f-bcce-1949c289f223",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:05.360Z"
      },
      {
        "id": "1de5bfd8-f3ce-449e-b202-c8a8eb2daab5",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-10T01:15:57.638Z"
      }
    ]
  },
  {
    "id": "176f0eca-fb01-461c-b1c4-6f9248a880f2",
    "number": 25,
    "clientId": "fc070d47-ce5f-4ca8-855f-e0587d4e9b53",
    "client": {
      "id": "fc070d47-ce5f-4ca8-855f-e0587d4e9b53",
      "name": "Mikaella",
      "phone": "15976031366",
      "email": null
    },
    "address": {
      "id": "30e57a31-b817-4b6d-b17b-fc1626a4d935",
      "cep": "18074605",
      "street": "Rua Terezinha Silva Leite",
      "number": "364",
      "complement": null,
      "neighborhood": "Jardim São Guilherme",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 4.3
    },
    "subtotal": 75,
    "deliveryFee": 5,
    "total": 80,
    "paymentMethod": "CASH",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-09T21:30:05.952Z",
    "items": [
      {
        "id": "2ec1b66f-8164-498c-9ff0-79742590c815",
        "productId": "5324005b-c6c1-47c3-b4fc-f6b616765927",
        "productName": "IGNITE V55- 5,500 pfs ",
        "productImage": "/storage/products/qgfaq8kbmhi-1784947724740.png",
        "flavorId": "90947cda-5f94-48f0-962f-3a2d5a5d16c4",
        "flavorName": "Morango kiwi",
        "quantity": 1,
        "priceAtPurchase": 75
      }
    ],
    "history": [
      {
        "id": "789de506-3daa-463f-91d1-f98ea4cf4e67",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-11T19:23:03.751Z"
      },
      {
        "id": "cfa582ed-6e27-41cc-a7df-b9d147367224",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-09T21:30:05.952Z"
      }
    ]
  },
  {
    "id": "2a07856d-bf88-44d5-8bc8-cb020f1a2302",
    "number": 24,
    "clientId": "58cdb28b-8826-4678-9ee5-b6a775d11dfd",
    "client": {
      "id": "58cdb28b-8826-4678-9ee5-b6a775d11dfd",
      "name": "Bia",
      "phone": "15996851185",
      "email": null
    },
    "address": {
      "id": "17b6e815-5544-460f-9e07-24e3965631d9",
      "cep": "18076-280",
      "street": "Rua Raymundo Frutuoso da Silva",
      "number": "364",
      "complement": "Casa",
      "neighborhood": "Jardim São Conrado",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 0.9
    },
    "subtotal": 130,
    "deliveryFee": 0,
    "total": 130,
    "paymentMethod": "CASH",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-08T23:15:20.698Z",
    "items": [
      {
        "id": "293c3e31-dff1-419c-97b0-39d57775b3fb",
        "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
        "productName": "IGNITE V400 MIX 40K DE PUFS ",
        "productImage": "/storage/products/ftc51w7xv4w-1785284093261.webp",
        "flavorId": "aa3af41f-b3d4-4ad0-b7ba-666aefb2c556",
        "flavorName": "Melão/ Menthol ",
        "quantity": 1,
        "priceAtPurchase": 130
      }
    ],
    "history": [
      {
        "id": "492f6702-f5db-4cf4-8b08-b67b62d4c0ce",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-09T01:22:02.536Z"
      },
      {
        "id": "fb4f1e1f-73cb-47dc-8e97-96c6fc456276",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-08T23:15:20.698Z"
      }
    ]
  },
  {
    "id": "141cad5d-2db2-439a-9e72-92d6157fe0a6",
    "number": 23,
    "clientId": "84004f5b-f954-421b-97c3-dd403b5d4b18",
    "client": {
      "id": "84004f5b-f954-421b-97c3-dd403b5d4b18",
      "name": "Caio",
      "phone": "15988009830",
      "email": null
    },
    "address": {
      "id": "0c9b4b20-52a2-48c5-8029-4480ef02e275",
      "cep": "18076290",
      "street": "Rua Rubião de Almeida",
      "number": "220",
      "complement": "Ao",
      "neighborhood": "Jardim São Conrado",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 0.5
    },
    "subtotal": 130,
    "deliveryFee": 0,
    "total": 130,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-08T21:37:18.018Z",
    "items": [
      {
        "id": "69f4c460-8812-4e8f-b676-b0d1f95320b4",
        "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
        "productName": "IGNITE V400 MIX 40K DE PUFS ",
        "productImage": "/storage/products/ftc51w7xv4w-1785284093261.webp",
        "flavorId": "2fe4d010-9ddb-4548-85e5-8ee398f466ec",
        "flavorName": "Icy mint/ Pêssego uva ",
        "quantity": 1,
        "priceAtPurchase": 130
      }
    ],
    "history": [
      {
        "id": "340de8ab-4683-4ebe-bd44-4cb9043dc7c0",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-09T01:22:05.169Z"
      },
      {
        "id": "e83c2b8a-4969-4f67-92af-c58aa02aca3e",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-08T21:37:18.018Z"
      }
    ]
  },
  {
    "id": "3abefcbb-9823-489a-9000-005390af4eba",
    "number": 22,
    "clientId": "f08a5498-b91f-40a6-879f-f19dac423c8c",
    "client": {
      "id": "f08a5498-b91f-40a6-879f-f19dac423c8c",
      "name": "Isa Sampaio",
      "phone": "14999017775",
      "email": null
    },
    "address": {
      "id": "368d6c46-b933-4ba3-9c68-11d59a876438",
      "cep": "18076190",
      "street": "Rua Nelson Herdy Barbosa",
      "number": "66",
      "complement": null,
      "neighborhood": "Vila Formosa",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 1.5
    },
    "subtotal": 120,
    "deliveryFee": 0,
    "total": 120,
    "paymentMethod": "CASH",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-08T21:31:17.678Z",
    "items": [
      {
        "id": "9385520b-1a09-456e-b32a-6d0d3161cea2",
        "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
        "productName": "ELFBAR ICE KING 40K-40 MIL PUFS",
        "productImage": "/storage/products/py44a9huqhj-1785290855433.jpeg",
        "flavorId": "0920ef72-7741-496d-9115-62c3279505f4",
        "flavorName": "Cereja morango ice ",
        "quantity": 1,
        "priceAtPurchase": 120
      }
    ],
    "history": [
      {
        "id": "c2b70d40-4bff-454f-800b-b22eaeae5089",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-09T01:22:08.311Z"
      },
      {
        "id": "71fc63ba-59a6-41d0-bbb2-3c3ecb46c18e",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-08T21:31:17.678Z"
      }
    ]
  },
  {
    "id": "8a759405-f6d3-4ded-bd61-ee87279a5902",
    "number": 21,
    "clientId": "455130c7-8696-457d-8cc8-946cbadd65d9",
    "client": {
      "id": "455130c7-8696-457d-8cc8-946cbadd65d9",
      "name": "Sabrina",
      "phone": "15991889328",
      "email": null
    },
    "address": {
      "id": "66043343-7a08-4da9-a026-86f72e9f3597",
      "cep": "18085610",
      "street": "Rua Maria Terci",
      "number": "435",
      "complement": "Casa",
      "neighborhood": "Jardim Morumbi",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 4.6
    },
    "subtotal": 110,
    "deliveryFee": 5,
    "total": 115,
    "paymentMethod": "CASH",
    "notes": "Cobrar 110,00",
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-08T19:54:57.294Z",
    "items": [
      {
        "id": "126baf37-a83a-49b7-ba3c-8d1901c0bfa5",
        "productId": "91b81e22-6d47-45d4-ae95-b1892515bbe7",
        "productName": "ELFBAR DUKE 35K-35 MIL PUFS ",
        "productImage": "/storage/products/c4xvx4pfz8q-1785289979857.webp",
        "flavorId": "9534a45d-d01a-49ed-8cd5-6ccb6162a994",
        "flavorName": "Menthol ",
        "quantity": 1,
        "priceAtPurchase": 110
      }
    ],
    "history": [
      {
        "id": "9d3894f7-c15b-4173-81b9-453c1f129568",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-08T21:38:50.849Z"
      },
      {
        "id": "cb9fc5f0-f2e7-4bca-b32b-136df1e96b59",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-08T19:54:57.294Z"
      }
    ]
  },
  {
    "id": "3e0a0257-7049-4961-bb80-1e738474ede2",
    "number": 20,
    "clientId": "c20edd4d-70cd-482c-9dc2-17ed34046522",
    "client": {
      "id": "c20edd4d-70cd-482c-9dc2-17ed34046522",
      "name": "Davi",
      "phone": "15991063123",
      "email": null
    },
    "address": {
      "id": "cf5c195c-2b2e-42d0-b9f5-6ef1ae14ec77",
      "cep": "18090460",
      "street": "Rua Cristovam Colombo",
      "number": "159",
      "complement": null,
      "neighborhood": "Vila Progresso",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 3.5
    },
    "subtotal": 100,
    "deliveryFee": 5,
    "total": 105,
    "paymentMethod": "CASH",
    "notes": "Cobrar 100,00",
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-08T19:44:22.817Z",
    "items": [
      {
        "id": "0cdbcccd-c483-4e01-b0e4-7e3d3ffeb9bd",
        "productId": "660f90fd-3c42-423f-87a1-c164ab9483ef",
        "productName": "DOJO SPHERE X 40K-40 MIL PUFS ",
        "productImage": "/storage/products/v21gmo3iy2f-1785771810702.jpeg",
        "flavorId": "df5329b3-a96f-4cec-a984-3c2542d27b79",
        "flavorName": "Frozen laranja vermelha ",
        "quantity": 1,
        "priceAtPurchase": 100
      }
    ],
    "history": [
      {
        "id": "f130f2f1-2fb6-4938-af4e-9bad31f30a94",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-08T21:38:46.431Z"
      },
      {
        "id": "585cf859-ecab-40a3-ba62-df7a2a51b5cf",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-08T19:44:22.817Z"
      }
    ]
  },
  {
    "id": "2477e21c-881e-4555-b623-06c5d84216c4",
    "number": 19,
    "clientId": "7b4cb198-379d-4b50-aa60-57281266a5da",
    "client": {
      "id": "7b4cb198-379d-4b50-aa60-57281266a5da",
      "name": "Isabelly",
      "phone": "15992692686",
      "email": null
    },
    "address": {
      "id": "b1b8aa43-46c4-4fbf-a466-f305d98dd99a",
      "cep": "18022252",
      "street": "Rua José Ciandrini",
      "number": "46",
      "complement": "Casa",
      "neighborhood": "Vila Zacarias",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 5
    },
    "subtotal": 135,
    "deliveryFee": 5,
    "total": 140,
    "paymentMethod": "PIX",
    "notes": "Cobrar 135,00",
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-08T19:33:30.175Z",
    "items": [
      {
        "id": "b5042ccf-8b88-4b4b-bec3-49c53351661a",
        "productId": "b8b74a32-e910-47c9-851c-dacf18889d4d",
        "productName": "DINNER GALAXY 60K ",
        "productImage": "/storage/products/uru57jtn0ka-1788884734752.webp",
        "flavorId": "162264ba-0c82-4d40-83fe-f78424370a0d",
        "flavorName": "Morango cereja ",
        "quantity": 1,
        "priceAtPurchase": 135
      }
    ],
    "history": [
      {
        "id": "074a2b4d-2c16-43ba-a9c7-074f9be76246",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-08T21:38:58.240Z"
      },
      {
        "id": "2bc71828-90d8-41a8-984a-47fd674361c8",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-08T19:33:30.175Z"
      }
    ]
  },
  {
    "id": "79f0d695-a714-4c8a-9279-4a8588c10980",
    "number": 18,
    "clientId": "6dd8891d-fbed-4d6c-9f98-012b20f4ce02",
    "client": {
      "id": "6dd8891d-fbed-4d6c-9f98-012b20f4ce02",
      "name": "Nicolly",
      "phone": "15998273067",
      "email": null
    },
    "address": {
      "id": "250f0dd2-072e-4239-99c2-877cb92335a3",
      "cep": "18043020",
      "street": "Rua Aníbal Costa Dias",
      "number": "91",
      "complement": "Casa",
      "neighborhood": "Vila Lucy",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 4.7
    },
    "subtotal": 125,
    "deliveryFee": 5,
    "total": 130,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-08T19:10:44.788Z",
    "items": [
      {
        "id": "33e6b1c2-8a80-4a71-abc2-23f00dad751a",
        "productId": "cbf04455-08ee-484c-83b3-4dc79668fbe4",
        "productName": "ELFBAR BC 45K",
        "productImage": "/storage/products/gkloihb9zkl-1785336133652.webp",
        "flavorId": "19c02fb1-e578-481d-bdb9-7ee8e77e90e3",
        "flavorName": "Morango ice ",
        "quantity": 1,
        "priceAtPurchase": 125
      }
    ],
    "history": [
      {
        "id": "86bb6c43-b9be-405d-8a72-f46af9c55a70",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-08T21:39:03.467Z"
      },
      {
        "id": "f0db4e1d-7072-49d5-a9da-d79529444379",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-08T19:10:44.788Z"
      }
    ]
  },
  {
    "id": "7493523f-8ae5-49b4-90cd-440968b787fe",
    "number": 17,
    "clientId": "807f2bff-42d1-4166-b77b-251f27965e0c",
    "client": {
      "id": "807f2bff-42d1-4166-b77b-251f27965e0c",
      "name": "eric",
      "phone": "15996490256",
      "email": null
    },
    "address": {
      "id": "25bcc0f7-533a-48f7-bd6f-28db16aab6de",
      "cep": "18055745",
      "street": "Rua Padre Domenico Trivi",
      "number": "350",
      "complement": null,
      "neighborhood": "Parque Esmeralda",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 6.2
    },
    "subtotal": 135,
    "deliveryFee": 8,
    "total": 143,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-01T19:30:06.805Z",
    "items": [
      {
        "id": "d46f312c-19c8-4ce9-ab52-3842e1c5b531",
        "productId": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
        "productName": "REFIL ELFBAR EW",
        "productImage": "/storage/products/lin1jjm5mfk-1788279791971.png",
        "flavorId": "8e06c272-343e-43b6-8b83-0cce17515e1b",
        "flavorName": "Suor maçã verde ",
        "quantity": 1,
        "priceAtPurchase": 55
      },
      {
        "id": "c25852b5-1d45-48e9-8a77-16c634b4208e",
        "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
        "productName": "KIT ELFBAR EW BATERIA E REFIL 9K PUFS",
        "productImage": "/storage/products/zgk2n3u1a4-1785289010881.jpeg",
        "flavorId": "fc556c92-20cb-4042-9a0c-5ad805284606",
        "flavorName": "Melancia ice ",
        "quantity": 1,
        "priceAtPurchase": 80
      }
    ],
    "history": [
      {
        "id": "9cfd50b6-3c7b-4472-b76c-8d744a2f4094",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-08T21:39:07.553Z"
      },
      {
        "id": "9f441aa4-c24c-47b3-8f96-e9a137b8fbfb",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-01T19:30:06.805Z"
      }
    ]
  },
  {
    "id": "53fe5fc2-331e-4ad2-9940-c74df5b9adf8",
    "number": 16,
    "clientId": "15f8dc4a-1bc9-44a0-9749-c0d9534789dc",
    "client": {
      "id": "15f8dc4a-1bc9-44a0-9749-c0d9534789dc",
      "name": "Marianna Potiara Dos Santos Padilha",
      "phone": "15996642935",
      "email": null
    },
    "address": {
      "id": "25d354ee-1818-4e67-9d2d-2ff754012685",
      "cep": "18072044",
      "street": "Rua Amélia do Rosário Gaspar",
      "number": "435",
      "complement": "Casa",
      "neighborhood": "Parque São Bento",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": 6.6
    },
    "subtotal": 95,
    "deliveryFee": 8,
    "total": 103,
    "paymentMethod": "CASH",
    "notes": "150",
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-09-01T02:12:20.772Z",
    "items": [
      {
        "id": "92739721-456a-42ba-87ad-67b6be256e7d",
        "productId": "64940fe5-089e-4408-bcb3-4e2c9b8078ec",
        "productName": "NIK BAR 30K-30 MIL PUFS ",
        "productImage": "/storage/products/x93ro8z0apa-1785597514242.webp",
        "flavorId": "e86f9b7c-1d9a-4cc7-988d-76905981359b",
        "flavorName": "Menthol ",
        "quantity": 1,
        "priceAtPurchase": 95
      }
    ],
    "history": [
      {
        "id": "0ba7b159-4a2d-40e0-8363-94ec5a0322d7",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-09-01T02:14:11.310Z"
      },
      {
        "id": "db93bedf-6233-422b-babc-4bfd99de8c97",
        "status": "SHIPPED",
        "notes": "Status alterado para SHIPPED",
        "changedBy": "Admin",
        "createdAt": "2026-09-01T02:14:06.422Z"
      },
      {
        "id": "f9e934a0-7214-44c2-b5f9-d6c6200ff43c",
        "status": "PREPARING",
        "notes": "Status alterado para PREPARING",
        "changedBy": "Admin",
        "createdAt": "2026-09-01T02:13:56.189Z"
      },
      {
        "id": "1d458165-8e4f-4984-8aee-1467230d5389",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-09-01T02:12:20.772Z"
      }
    ]
  },
  {
    "id": "a8526e50-085e-4638-add2-6d8e60902d6f",
    "number": 14,
    "clientId": "28d4a8fe-3a44-4ae4-a195-c14e0a173c37",
    "client": {
      "id": "28d4a8fe-3a44-4ae4-a195-c14e0a173c37",
      "name": "Aline Oliveira",
      "phone": "15988060443",
      "email": null
    },
    "address": {
      "id": "fc08f16e-15aa-4c84-9683-cf6b696ab11a",
      "cep": "18115689",
      "street": "José Benedito das Neves",
      "number": "20",
      "complement": "Casa",
      "neighborhood": "Vila Rodrigues",
      "city": "Votorantim",
      "state": "SP",
      "distanceKm": null
    },
    "subtotal": 80,
    "deliveryFee": 0,
    "total": 80,
    "paymentMethod": "PIX",
    "notes": null,
    "status": "DELIVERED",
    "whatsappSent": true,
    "createdAt": "2026-08-29T16:21:42.954Z",
    "items": [
      {
        "id": "9cc5a001-3d73-4fc5-ba5f-aabe66aa2292",
        "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
        "productName": "KIT ELFBAR EW BATERIA E REFIL 9K PUFS",
        "productImage": "/storage/products/zgk2n3u1a4-1785289010881.jpeg",
        "flavorId": "c7e4caaf-3740-4758-bd3f-5913eba7b701",
        "flavorName": "Dragon Stranwnana ",
        "quantity": 1,
        "priceAtPurchase": 80
      }
    ],
    "history": [
      {
        "id": "ff40b114-2921-4b53-a610-b3371b0fe134",
        "status": "DELIVERED",
        "notes": "Status alterado para DELIVERED",
        "changedBy": "Admin",
        "createdAt": "2026-08-29T18:23:52.677Z"
      },
      {
        "id": "3e06b8b9-8b35-4ea2-b970-26a2510325d4",
        "status": "CONFIRMED",
        "notes": "Status alterado para CONFIRMED",
        "changedBy": "Admin",
        "createdAt": "2026-08-29T16:34:25.320Z"
      },
      {
        "id": "ee89f14c-4f00-46ec-9d41-555b22bb1ddc",
        "status": "NEW",
        "notes": "Pedido editado pelo administrador",
        "changedBy": "Admin",
        "createdAt": "2026-08-29T16:34:17.449Z"
      },
      {
        "id": "08ae88d7-b26e-4e8a-9c55-ac11838dd002",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
        "changedBy": "Cliente",
        "createdAt": "2026-08-29T16:21:42.954Z"
      }
    ]
  },
  {
    "id": "7ce15010-459e-46e3-8cfe-005169cf4a80",
    "number": 4,
    "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
    "client": {
      "id": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
      "name": "Henrique Rian",
      "phone": "15996204540",
      "email": null
    },
    "address": {
      "id": "caa2b93c-4815-47c9-a202-c9b6bc31aad9",
      "cep": "18076352",
      "street": "Rua Najla Amary Murad",
      "number": "537",
      "complement": "Adega",
      "neighborhood": "Jardim Guadalupe",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": null
    },
    "subtotal": 125,
    "deliveryFee": 5,
    "total": 130,
    "paymentMethod": "CARD_ON_DELIVERY",
    "notes": null,
    "status": "CANCELLED",
    "whatsappSent": true,
    "createdAt": "2026-08-01T06:15:46.997Z",
    "items": [
      {
        "id": "a5b5bce6-5c34-49b1-8927-5c7785472bf3",
        "productId": "89485922-6c51-44ff-974a-35f7e04781db",
        "productName": "BLACK SHEEP 55K-55 MIL PUFS ",
        "productImage": "/storage/products/cgq4j6xc8su-1785464472487.webp",
        "flavorId": "71122c5e-4fd6-4295-813e-2068f41956c1",
        "flavorName": "Melancia ice ",
        "quantity": 1,
        "priceAtPurchase": 125
      }
    ],
    "history": [
      {
        "id": "9b75b0cf-86a6-47ba-80e3-fcc6d5337dab",
        "status": "CANCELLED",
        "notes": "Status alterado para CANCELLED",
        "changedBy": "Admin",
        "createdAt": "2026-08-31T05:00:42.649Z"
      },
      {
        "id": "3a4ecb25-f56a-4426-921f-6b5228bbf111",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente",
        "changedBy": "Cliente",
        "createdAt": "2026-08-01T06:15:46.997Z"
      }
    ]
  },
  {
    "id": "8692871f-a406-451a-ab23-161a31e38a5a",
    "number": 2,
    "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
    "client": {
      "id": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
      "name": "Henrique Rian",
      "phone": "15996204540",
      "email": null
    },
    "address": {
      "id": "8d9da634-9dac-44b0-9093-0dba87fdfafc",
      "cep": "18076352",
      "street": "Rua Najla Amary Murad",
      "number": "537",
      "complement": "Adega",
      "neighborhood": "Jardim Guadalupe",
      "city": "Sorocaba",
      "state": "SP",
      "distanceKm": null
    },
    "subtotal": 75,
    "deliveryFee": 5,
    "total": 80,
    "paymentMethod": "CASH",
    "notes": null,
    "status": "CANCELLED",
    "whatsappSent": true,
    "createdAt": "2026-07-28T18:08:41.768Z",
    "items": [
      {
        "id": "473b42b4-7634-459a-9a88-6da096d942fb",
        "productId": "5324005b-c6c1-47c3-b4fc-f6b616765927",
        "productName": "IGNITE V55- 5,500 pfs ",
        "productImage": "/storage/products/qgfaq8kbmhi-1784947724740.png",
        "flavorId": "b8f26b6f-bd69-456d-83f6-2e88537a0c2d",
        "flavorName": "Miami mint ",
        "quantity": 1,
        "priceAtPurchase": 75
      }
    ],
    "history": [
      {
        "id": "cfa3153c-643c-4077-a51f-ee437c9b7c30",
        "status": "CANCELLED",
        "notes": "Status alterado para CANCELLED",
        "changedBy": "Admin",
        "createdAt": "2026-08-31T05:00:36.907Z"
      },
      {
        "id": "dc678dc5-a79f-4c64-9020-b98ef47f1ac6",
        "status": "NEW",
        "notes": "Pedido realizado pelo cliente",
        "changedBy": "Cliente",
        "createdAt": "2026-07-28T18:08:41.768Z"
      }
    ]
  }
];

export const mockClients: any[] = [
  {
    "id": "2ccaebc9-50cd-4aa6-b0a2-ff24345ce740",
    "name": "Massami Shitara",
    "phone": "16991551200",
    "email": null,
    "createdAt": "2026-07-25T03:26:15.291Z",
    "addresses": [
      {
        "id": "4ae14c04-6c15-4cad-91ad-4e0cc052a2e9",
        "clientId": "2ccaebc9-50cd-4aa6-b0a2-ff24345ce740",
        "cep": "18076352",
        "street": "Travessa Alfredo Eduardo Noronha",
        "number": "26",
        "complement": "",
        "neighborhood": "Jardim Guadalupe",
        "city": "São Paulo",
        "state": "SP",
        "distanceKm": 6.3
      },
      {
        "id": "465d1e4a-9c33-47e7-a023-88eac482c535",
        "clientId": "2ccaebc9-50cd-4aa6-b0a2-ff24345ce740",
        "cep": "08473-005",
        "street": "Travessa Alfredo Eduardo Noronha",
        "number": "26",
        "complement": "",
        "neighborhood": "Jardim Wilma Flor",
        "city": "São Paulo",
        "state": "SP",
        "distanceKm": 109.6
      },
      {
        "id": "fd74d89b-c635-4ce7-b143-c24146b26745",
        "clientId": "2ccaebc9-50cd-4aa6-b0a2-ff24345ce740",
        "cep": "08473-005",
        "street": "Travessa Alfredo Eduardo Noronha",
        "number": "26",
        "complement": "",
        "neighborhood": "Jardim Wilma Flor",
        "city": "São Paulo",
        "state": "SP",
        "distanceKm": 109.6
      },
      {
        "id": "7f29c5e3-39a7-4449-b902-764a43e11b61",
        "clientId": "2ccaebc9-50cd-4aa6-b0a2-ff24345ce740",
        "cep": "08473-005",
        "street": "Travessa Alfredo Eduardo Noronha",
        "number": "26",
        "complement": "",
        "neighborhood": "Jardim Wilma Flor",
        "city": "São Paulo",
        "state": "SP",
        "distanceKm": 109.6
      },
      {
        "id": "38c56b12-e730-4bf1-a1a2-ef114fbdd506",
        "clientId": "2ccaebc9-50cd-4aa6-b0a2-ff24345ce740",
        "cep": "14092-010",
        "street": "Rua Sebastiana Monteiro Faccioli",
        "number": "120",
        "complement": "",
        "neighborhood": "Jardim Novo Mundo",
        "city": "Ribeirão Preto",
        "state": "SP",
        "distanceKm": 40.8
      },
      {
        "id": "58388183-560e-4db3-abf3-1aa00dc14dc0",
        "clientId": "2ccaebc9-50cd-4aa6-b0a2-ff24345ce740",
        "cep": "08473-005",
        "street": "Travessa Alfredo Eduardo Noronha",
        "number": "26",
        "complement": null,
        "neighborhood": "Jardim Wilma Flor",
        "city": "São Paulo",
        "state": "SP",
        "distanceKm": 109.6
      }
    ],
    "orders": []
  },
  {
    "id": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
    "name": "Henrique Rian",
    "phone": "15996204540",
    "email": null,
    "createdAt": "2026-07-28T18:08:41.684Z",
    "addresses": [
      {
        "id": "8d9da634-9dac-44b0-9093-0dba87fdfafc",
        "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
        "cep": "18076352",
        "street": "Rua Najla Amary Murad",
        "number": "537",
        "complement": "Adega",
        "neighborhood": "Jardim Guadalupe",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": null
      },
      {
        "id": "c30a2d66-bf30-408c-b436-89a9936531f5",
        "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
        "cep": "18076352",
        "street": "Rua Najla Amary Murad",
        "number": "537",
        "complement": "Adega",
        "neighborhood": "Jardim Guadalupe",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": null
      },
      {
        "id": "caa2b93c-4815-47c9-a202-c9b6bc31aad9",
        "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
        "cep": "18076352",
        "street": "Rua Najla Amary Murad",
        "number": "537",
        "complement": "Adega",
        "neighborhood": "Jardim Guadalupe",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": null
      },
      {
        "id": "4bb3eaab-d536-46ca-8609-146d67845ffe",
        "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
        "cep": "18076352",
        "street": "Rua Najla Amary Murad",
        "number": "537",
        "complement": "Adega",
        "neighborhood": "Jardim Guadalupe",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": null
      },
      {
        "id": "8a1cee6f-5489-4667-aa4e-6e9357ee352a",
        "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
        "cep": "18072044",
        "street": "Rua Amélia do Rosário Gaspar",
        "number": "435",
        "complement": "Adega",
        "neighborhood": "Parque São Bento",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 6.6
      }
    ],
    "orders": [
      {
        "id": "7ce15010-459e-46e3-8cfe-005169cf4a80",
        "number": 4,
        "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
        "client": {
          "id": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
          "name": "Henrique Rian",
          "phone": "15996204540",
          "email": null
        },
        "address": {
          "id": "caa2b93c-4815-47c9-a202-c9b6bc31aad9",
          "cep": "18076352",
          "street": "Rua Najla Amary Murad",
          "number": "537",
          "complement": "Adega",
          "neighborhood": "Jardim Guadalupe",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": null
        },
        "subtotal": 125,
        "deliveryFee": 5,
        "total": 130,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "CANCELLED",
        "whatsappSent": true,
        "createdAt": "2026-08-01T06:15:46.997Z",
        "items": [
          {
            "id": "a5b5bce6-5c34-49b1-8927-5c7785472bf3",
            "productId": "89485922-6c51-44ff-974a-35f7e04781db",
            "productName": "BLACK SHEEP 55K-55 MIL PUFS ",
            "productImage": "/storage/products/cgq4j6xc8su-1785464472487.webp",
            "flavorId": "71122c5e-4fd6-4295-813e-2068f41956c1",
            "flavorName": "Melancia ice ",
            "quantity": 1,
            "priceAtPurchase": 125
          }
        ],
        "history": [
          {
            "id": "9b75b0cf-86a6-47ba-80e3-fcc6d5337dab",
            "status": "CANCELLED",
            "notes": "Status alterado para CANCELLED",
            "changedBy": "Admin",
            "createdAt": "2026-08-31T05:00:42.649Z"
          },
          {
            "id": "3a4ecb25-f56a-4426-921f-6b5228bbf111",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente",
            "changedBy": "Cliente",
            "createdAt": "2026-08-01T06:15:46.997Z"
          }
        ]
      },
      {
        "id": "8692871f-a406-451a-ab23-161a31e38a5a",
        "number": 2,
        "clientId": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
        "client": {
          "id": "9dab3fa1-5859-4ff5-9e45-16e4d61bb8a2",
          "name": "Henrique Rian",
          "phone": "15996204540",
          "email": null
        },
        "address": {
          "id": "8d9da634-9dac-44b0-9093-0dba87fdfafc",
          "cep": "18076352",
          "street": "Rua Najla Amary Murad",
          "number": "537",
          "complement": "Adega",
          "neighborhood": "Jardim Guadalupe",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": null
        },
        "subtotal": 75,
        "deliveryFee": 5,
        "total": 80,
        "paymentMethod": "CASH",
        "notes": null,
        "status": "CANCELLED",
        "whatsappSent": true,
        "createdAt": "2026-07-28T18:08:41.768Z",
        "items": [
          {
            "id": "473b42b4-7634-459a-9a88-6da096d942fb",
            "productId": "5324005b-c6c1-47c3-b4fc-f6b616765927",
            "productName": "IGNITE V55- 5,500 pfs ",
            "productImage": "/storage/products/qgfaq8kbmhi-1784947724740.png",
            "flavorId": "b8f26b6f-bd69-456d-83f6-2e88537a0c2d",
            "flavorName": "Miami mint ",
            "quantity": 1,
            "priceAtPurchase": 75
          }
        ],
        "history": [
          {
            "id": "cfa3153c-643c-4077-a51f-ee437c9b7c30",
            "status": "CANCELLED",
            "notes": "Status alterado para CANCELLED",
            "changedBy": "Admin",
            "createdAt": "2026-08-31T05:00:36.907Z"
          },
          {
            "id": "dc678dc5-a79f-4c64-9020-b98ef47f1ac6",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente",
            "changedBy": "Cliente",
            "createdAt": "2026-07-28T18:08:41.768Z"
          }
        ]
      }
    ]
  },
  {
    "id": "83d0f263-1780-4a82-948d-c1cadec4959a",
    "name": "Pedro",
    "phone": "15992370319",
    "email": null,
    "createdAt": "2026-08-10T02:19:35.044Z",
    "addresses": [
      {
        "id": "f9cda4df-713a-465a-bd48-9fe9d7126183",
        "clientId": "83d0f263-1780-4a82-948d-c1cadec4959a",
        "cep": "18075-490",
        "street": "Rua Professor Armando Rizzo",
        "number": "440",
        "complement": "Apto 44 bloco 1",
        "neighborhood": "Vila Almeida",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 1.2
      }
    ],
    "orders": []
  },
  {
    "id": "6444493b-087a-4781-b91e-a36f2994f7b4",
    "name": "Rodrigo menezes",
    "phone": "15998622887",
    "email": null,
    "createdAt": "2026-08-14T02:25:37.238Z",
    "addresses": [
      {
        "id": "c5c59aab-c2ea-4b4e-8272-404f96195455",
        "clientId": "6444493b-087a-4781-b91e-a36f2994f7b4",
        "cep": "18055210",
        "street": "Alameda das Rosas",
        "number": "25",
        "complement": "Casa",
        "neighborhood": "Jardim Simus",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5
      }
    ],
    "orders": []
  },
  {
    "id": "de59a29c-8993-4389-b762-72abfbd15094",
    "name": "Yasmin Botignon",
    "phone": "15991112511",
    "email": null,
    "createdAt": "2026-08-14T18:33:56.456Z",
    "addresses": [
      {
        "id": "46881233-2c2e-4662-8fa1-a334d5695050",
        "clientId": "de59a29c-8993-4389-b762-72abfbd15094",
        "cep": "18035-480",
        "street": "Rua Ramos de Azevedo",
        "number": "165",
        "complement": "Mercadinho ",
        "neighborhood": "Centro",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 2.8
      }
    ],
    "orders": []
  },
  {
    "id": "28d4a8fe-3a44-4ae4-a195-c14e0a173c37",
    "name": "Aline Oliveira",
    "phone": "15988060443",
    "email": null,
    "createdAt": "2026-08-29T16:21:42.777Z",
    "addresses": [
      {
        "id": "fc08f16e-15aa-4c84-9683-cf6b696ab11a",
        "clientId": "28d4a8fe-3a44-4ae4-a195-c14e0a173c37",
        "cep": "18115689",
        "street": "José Benedito das Neves",
        "number": "20",
        "complement": "Casa",
        "neighborhood": "Vila Rodrigues",
        "city": "Votorantim",
        "state": "SP",
        "distanceKm": null
      }
    ],
    "orders": [
      {
        "id": "a8526e50-085e-4638-add2-6d8e60902d6f",
        "number": 14,
        "clientId": "28d4a8fe-3a44-4ae4-a195-c14e0a173c37",
        "client": {
          "id": "28d4a8fe-3a44-4ae4-a195-c14e0a173c37",
          "name": "Aline Oliveira",
          "phone": "15988060443",
          "email": null
        },
        "address": {
          "id": "fc08f16e-15aa-4c84-9683-cf6b696ab11a",
          "cep": "18115689",
          "street": "José Benedito das Neves",
          "number": "20",
          "complement": "Casa",
          "neighborhood": "Vila Rodrigues",
          "city": "Votorantim",
          "state": "SP",
          "distanceKm": null
        },
        "subtotal": 80,
        "deliveryFee": 0,
        "total": 80,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-08-29T16:21:42.954Z",
        "items": [
          {
            "id": "9cc5a001-3d73-4fc5-ba5f-aabe66aa2292",
            "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
            "productName": "KIT ELFBAR EW BATERIA E REFIL 9K PUFS",
            "productImage": "/storage/products/zgk2n3u1a4-1785289010881.jpeg",
            "flavorId": "c7e4caaf-3740-4758-bd3f-5913eba7b701",
            "flavorName": "Dragon Stranwnana ",
            "quantity": 1,
            "priceAtPurchase": 80
          }
        ],
        "history": [
          {
            "id": "ff40b114-2921-4b53-a610-b3371b0fe134",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-08-29T18:23:52.677Z"
          },
          {
            "id": "3e06b8b9-8b35-4ea2-b970-26a2510325d4",
            "status": "CONFIRMED",
            "notes": "Status alterado para CONFIRMED",
            "changedBy": "Admin",
            "createdAt": "2026-08-29T16:34:25.320Z"
          },
          {
            "id": "ee89f14c-4f00-46ec-9d41-555b22bb1ddc",
            "status": "NEW",
            "notes": "Pedido editado pelo administrador",
            "changedBy": "Admin",
            "createdAt": "2026-08-29T16:34:17.449Z"
          },
          {
            "id": "08ae88d7-b26e-4e8a-9c55-ac11838dd002",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-08-29T16:21:42.954Z"
          }
        ]
      }
    ]
  },
  {
    "id": "15f8dc4a-1bc9-44a0-9749-c0d9534789dc",
    "name": "Marianna Potiara Dos Santos Padilha",
    "phone": "15996642935",
    "email": null,
    "createdAt": "2026-09-01T02:12:20.624Z",
    "addresses": [
      {
        "id": "25d354ee-1818-4e67-9d2d-2ff754012685",
        "clientId": "15f8dc4a-1bc9-44a0-9749-c0d9534789dc",
        "cep": "18072044",
        "street": "Rua Amélia do Rosário Gaspar",
        "number": "435",
        "complement": "Casa",
        "neighborhood": "Parque São Bento",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 6.6
      }
    ],
    "orders": [
      {
        "id": "53fe5fc2-331e-4ad2-9940-c74df5b9adf8",
        "number": 16,
        "clientId": "15f8dc4a-1bc9-44a0-9749-c0d9534789dc",
        "client": {
          "id": "15f8dc4a-1bc9-44a0-9749-c0d9534789dc",
          "name": "Marianna Potiara Dos Santos Padilha",
          "phone": "15996642935",
          "email": null
        },
        "address": {
          "id": "25d354ee-1818-4e67-9d2d-2ff754012685",
          "cep": "18072044",
          "street": "Rua Amélia do Rosário Gaspar",
          "number": "435",
          "complement": "Casa",
          "neighborhood": "Parque São Bento",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 6.6
        },
        "subtotal": 95,
        "deliveryFee": 8,
        "total": 103,
        "paymentMethod": "CASH",
        "notes": "150",
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-01T02:12:20.772Z",
        "items": [
          {
            "id": "92739721-456a-42ba-87ad-67b6be256e7d",
            "productId": "64940fe5-089e-4408-bcb3-4e2c9b8078ec",
            "productName": "NIK BAR 30K-30 MIL PUFS ",
            "productImage": "/storage/products/x93ro8z0apa-1785597514242.webp",
            "flavorId": "e86f9b7c-1d9a-4cc7-988d-76905981359b",
            "flavorName": "Menthol ",
            "quantity": 1,
            "priceAtPurchase": 95
          }
        ],
        "history": [
          {
            "id": "0ba7b159-4a2d-40e0-8363-94ec5a0322d7",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-01T02:14:11.310Z"
          },
          {
            "id": "db93bedf-6233-422b-babc-4bfd99de8c97",
            "status": "SHIPPED",
            "notes": "Status alterado para SHIPPED",
            "changedBy": "Admin",
            "createdAt": "2026-09-01T02:14:06.422Z"
          },
          {
            "id": "f9e934a0-7214-44c2-b5f9-d6c6200ff43c",
            "status": "PREPARING",
            "notes": "Status alterado para PREPARING",
            "changedBy": "Admin",
            "createdAt": "2026-09-01T02:13:56.189Z"
          },
          {
            "id": "1d458165-8e4f-4984-8aee-1467230d5389",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-01T02:12:20.772Z"
          }
        ]
      }
    ]
  },
  {
    "id": "6dd8891d-fbed-4d6c-9f98-012b20f4ce02",
    "name": "Nicolly",
    "phone": "15998273067",
    "email": null,
    "createdAt": "2026-09-08T19:10:43.743Z",
    "addresses": [
      {
        "id": "250f0dd2-072e-4239-99c2-877cb92335a3",
        "clientId": "6dd8891d-fbed-4d6c-9f98-012b20f4ce02",
        "cep": "18043020",
        "street": "Rua Aníbal Costa Dias",
        "number": "91",
        "complement": "Casa",
        "neighborhood": "Vila Lucy",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 4.7
      }
    ],
    "orders": [
      {
        "id": "79f0d695-a714-4c8a-9279-4a8588c10980",
        "number": 18,
        "clientId": "6dd8891d-fbed-4d6c-9f98-012b20f4ce02",
        "client": {
          "id": "6dd8891d-fbed-4d6c-9f98-012b20f4ce02",
          "name": "Nicolly",
          "phone": "15998273067",
          "email": null
        },
        "address": {
          "id": "250f0dd2-072e-4239-99c2-877cb92335a3",
          "cep": "18043020",
          "street": "Rua Aníbal Costa Dias",
          "number": "91",
          "complement": "Casa",
          "neighborhood": "Vila Lucy",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 4.7
        },
        "subtotal": 125,
        "deliveryFee": 5,
        "total": 130,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-08T19:10:44.788Z",
        "items": [
          {
            "id": "33e6b1c2-8a80-4a71-abc2-23f00dad751a",
            "productId": "cbf04455-08ee-484c-83b3-4dc79668fbe4",
            "productName": "ELFBAR BC 45K",
            "productImage": "/storage/products/gkloihb9zkl-1785336133652.webp",
            "flavorId": "19c02fb1-e578-481d-bdb9-7ee8e77e90e3",
            "flavorName": "Morango ice ",
            "quantity": 1,
            "priceAtPurchase": 125
          }
        ],
        "history": [
          {
            "id": "86bb6c43-b9be-405d-8a72-f46af9c55a70",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-08T21:39:03.467Z"
          },
          {
            "id": "f0db4e1d-7072-49d5-a9da-d79529444379",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-08T19:10:44.788Z"
          }
        ]
      }
    ]
  },
  {
    "id": "7b4cb198-379d-4b50-aa60-57281266a5da",
    "name": "Isabelly",
    "phone": "15992692686",
    "email": null,
    "createdAt": "2026-09-08T19:33:29.975Z",
    "addresses": [
      {
        "id": "b1b8aa43-46c4-4fbf-a466-f305d98dd99a",
        "clientId": "7b4cb198-379d-4b50-aa60-57281266a5da",
        "cep": "18022252",
        "street": "Rua José Ciandrini",
        "number": "46",
        "complement": "Casa",
        "neighborhood": "Vila Zacarias",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5
      }
    ],
    "orders": [
      {
        "id": "2477e21c-881e-4555-b623-06c5d84216c4",
        "number": 19,
        "clientId": "7b4cb198-379d-4b50-aa60-57281266a5da",
        "client": {
          "id": "7b4cb198-379d-4b50-aa60-57281266a5da",
          "name": "Isabelly",
          "phone": "15992692686",
          "email": null
        },
        "address": {
          "id": "b1b8aa43-46c4-4fbf-a466-f305d98dd99a",
          "cep": "18022252",
          "street": "Rua José Ciandrini",
          "number": "46",
          "complement": "Casa",
          "neighborhood": "Vila Zacarias",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5
        },
        "subtotal": 135,
        "deliveryFee": 5,
        "total": 140,
        "paymentMethod": "PIX",
        "notes": "Cobrar 135,00",
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-08T19:33:30.175Z",
        "items": [
          {
            "id": "b5042ccf-8b88-4b4b-bec3-49c53351661a",
            "productId": "b8b74a32-e910-47c9-851c-dacf18889d4d",
            "productName": "DINNER GALAXY 60K ",
            "productImage": "/storage/products/uru57jtn0ka-1788884734752.webp",
            "flavorId": "162264ba-0c82-4d40-83fe-f78424370a0d",
            "flavorName": "Morango cereja ",
            "quantity": 1,
            "priceAtPurchase": 135
          }
        ],
        "history": [
          {
            "id": "074a2b4d-2c16-43ba-a9c7-074f9be76246",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-08T21:38:58.240Z"
          },
          {
            "id": "2bc71828-90d8-41a8-984a-47fd674361c8",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-08T19:33:30.175Z"
          }
        ]
      }
    ]
  },
  {
    "id": "c20edd4d-70cd-482c-9dc2-17ed34046522",
    "name": "Davi",
    "phone": "15991063123",
    "email": null,
    "createdAt": "2026-09-08T19:44:22.388Z",
    "addresses": [
      {
        "id": "cf5c195c-2b2e-42d0-b9f5-6ef1ae14ec77",
        "clientId": "c20edd4d-70cd-482c-9dc2-17ed34046522",
        "cep": "18090460",
        "street": "Rua Cristovam Colombo",
        "number": "159",
        "complement": null,
        "neighborhood": "Vila Progresso",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 3.5
      }
    ],
    "orders": [
      {
        "id": "3e0a0257-7049-4961-bb80-1e738474ede2",
        "number": 20,
        "clientId": "c20edd4d-70cd-482c-9dc2-17ed34046522",
        "client": {
          "id": "c20edd4d-70cd-482c-9dc2-17ed34046522",
          "name": "Davi",
          "phone": "15991063123",
          "email": null
        },
        "address": {
          "id": "cf5c195c-2b2e-42d0-b9f5-6ef1ae14ec77",
          "cep": "18090460",
          "street": "Rua Cristovam Colombo",
          "number": "159",
          "complement": null,
          "neighborhood": "Vila Progresso",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 3.5
        },
        "subtotal": 100,
        "deliveryFee": 5,
        "total": 105,
        "paymentMethod": "CASH",
        "notes": "Cobrar 100,00",
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-08T19:44:22.817Z",
        "items": [
          {
            "id": "0cdbcccd-c483-4e01-b0e4-7e3d3ffeb9bd",
            "productId": "660f90fd-3c42-423f-87a1-c164ab9483ef",
            "productName": "DOJO SPHERE X 40K-40 MIL PUFS ",
            "productImage": "/storage/products/v21gmo3iy2f-1785771810702.jpeg",
            "flavorId": "df5329b3-a96f-4cec-a984-3c2542d27b79",
            "flavorName": "Frozen laranja vermelha ",
            "quantity": 1,
            "priceAtPurchase": 100
          }
        ],
        "history": [
          {
            "id": "f130f2f1-2fb6-4938-af4e-9bad31f30a94",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-08T21:38:46.431Z"
          },
          {
            "id": "585cf859-ecab-40a3-ba62-df7a2a51b5cf",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-08T19:44:22.817Z"
          }
        ]
      }
    ]
  },
  {
    "id": "455130c7-8696-457d-8cc8-946cbadd65d9",
    "name": "Sabrina",
    "phone": "15991889328",
    "email": null,
    "createdAt": "2026-09-08T19:54:57.156Z",
    "addresses": [
      {
        "id": "66043343-7a08-4da9-a026-86f72e9f3597",
        "clientId": "455130c7-8696-457d-8cc8-946cbadd65d9",
        "cep": "18085610",
        "street": "Rua Maria Terci",
        "number": "435",
        "complement": "Casa",
        "neighborhood": "Jardim Morumbi",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 4.6
      }
    ],
    "orders": [
      {
        "id": "8a759405-f6d3-4ded-bd61-ee87279a5902",
        "number": 21,
        "clientId": "455130c7-8696-457d-8cc8-946cbadd65d9",
        "client": {
          "id": "455130c7-8696-457d-8cc8-946cbadd65d9",
          "name": "Sabrina",
          "phone": "15991889328",
          "email": null
        },
        "address": {
          "id": "66043343-7a08-4da9-a026-86f72e9f3597",
          "cep": "18085610",
          "street": "Rua Maria Terci",
          "number": "435",
          "complement": "Casa",
          "neighborhood": "Jardim Morumbi",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 4.6
        },
        "subtotal": 110,
        "deliveryFee": 5,
        "total": 115,
        "paymentMethod": "CASH",
        "notes": "Cobrar 110,00",
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-08T19:54:57.294Z",
        "items": [
          {
            "id": "126baf37-a83a-49b7-ba3c-8d1901c0bfa5",
            "productId": "91b81e22-6d47-45d4-ae95-b1892515bbe7",
            "productName": "ELFBAR DUKE 35K-35 MIL PUFS ",
            "productImage": "/storage/products/c4xvx4pfz8q-1785289979857.webp",
            "flavorId": "9534a45d-d01a-49ed-8cd5-6ccb6162a994",
            "flavorName": "Menthol ",
            "quantity": 1,
            "priceAtPurchase": 110
          }
        ],
        "history": [
          {
            "id": "9d3894f7-c15b-4173-81b9-453c1f129568",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-08T21:38:50.849Z"
          },
          {
            "id": "cb9fc5f0-f2e7-4bca-b32b-136df1e96b59",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-08T19:54:57.294Z"
          }
        ]
      }
    ]
  },
  {
    "id": "f08a5498-b91f-40a6-879f-f19dac423c8c",
    "name": "Isa Sampaio",
    "phone": "14999017775",
    "email": null,
    "createdAt": "2026-09-08T21:31:16.798Z",
    "addresses": [
      {
        "id": "368d6c46-b933-4ba3-9c68-11d59a876438",
        "clientId": "f08a5498-b91f-40a6-879f-f19dac423c8c",
        "cep": "18076190",
        "street": "Rua Nelson Herdy Barbosa",
        "number": "66",
        "complement": null,
        "neighborhood": "Vila Formosa",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 1.5
      }
    ],
    "orders": [
      {
        "id": "3abefcbb-9823-489a-9000-005390af4eba",
        "number": 22,
        "clientId": "f08a5498-b91f-40a6-879f-f19dac423c8c",
        "client": {
          "id": "f08a5498-b91f-40a6-879f-f19dac423c8c",
          "name": "Isa Sampaio",
          "phone": "14999017775",
          "email": null
        },
        "address": {
          "id": "368d6c46-b933-4ba3-9c68-11d59a876438",
          "cep": "18076190",
          "street": "Rua Nelson Herdy Barbosa",
          "number": "66",
          "complement": null,
          "neighborhood": "Vila Formosa",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 1.5
        },
        "subtotal": 120,
        "deliveryFee": 0,
        "total": 120,
        "paymentMethod": "CASH",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-08T21:31:17.678Z",
        "items": [
          {
            "id": "9385520b-1a09-456e-b32a-6d0d3161cea2",
            "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
            "productName": "ELFBAR ICE KING 40K-40 MIL PUFS",
            "productImage": "/storage/products/py44a9huqhj-1785290855433.jpeg",
            "flavorId": "0920ef72-7741-496d-9115-62c3279505f4",
            "flavorName": "Cereja morango ice ",
            "quantity": 1,
            "priceAtPurchase": 120
          }
        ],
        "history": [
          {
            "id": "c2b70d40-4bff-454f-800b-b22eaeae5089",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-09T01:22:08.311Z"
          },
          {
            "id": "71fc63ba-59a6-41d0-bbb2-3c3ecb46c18e",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-08T21:31:17.678Z"
          }
        ]
      }
    ]
  },
  {
    "id": "84004f5b-f954-421b-97c3-dd403b5d4b18",
    "name": "Caio",
    "phone": "15988009830",
    "email": null,
    "createdAt": "2026-09-08T21:37:17.176Z",
    "addresses": [
      {
        "id": "0c9b4b20-52a2-48c5-8029-4480ef02e275",
        "clientId": "84004f5b-f954-421b-97c3-dd403b5d4b18",
        "cep": "18076290",
        "street": "Rua Rubião de Almeida",
        "number": "220",
        "complement": "Ao",
        "neighborhood": "Jardim São Conrado",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 0.5
      }
    ],
    "orders": [
      {
        "id": "141cad5d-2db2-439a-9e72-92d6157fe0a6",
        "number": 23,
        "clientId": "84004f5b-f954-421b-97c3-dd403b5d4b18",
        "client": {
          "id": "84004f5b-f954-421b-97c3-dd403b5d4b18",
          "name": "Caio",
          "phone": "15988009830",
          "email": null
        },
        "address": {
          "id": "0c9b4b20-52a2-48c5-8029-4480ef02e275",
          "cep": "18076290",
          "street": "Rua Rubião de Almeida",
          "number": "220",
          "complement": "Ao",
          "neighborhood": "Jardim São Conrado",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 0.5
        },
        "subtotal": 130,
        "deliveryFee": 0,
        "total": 130,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-08T21:37:18.018Z",
        "items": [
          {
            "id": "69f4c460-8812-4e8f-b676-b0d1f95320b4",
            "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
            "productName": "IGNITE V400 MIX 40K DE PUFS ",
            "productImage": "/storage/products/ftc51w7xv4w-1785284093261.webp",
            "flavorId": "2fe4d010-9ddb-4548-85e5-8ee398f466ec",
            "flavorName": "Icy mint/ Pêssego uva ",
            "quantity": 1,
            "priceAtPurchase": 130
          }
        ],
        "history": [
          {
            "id": "340de8ab-4683-4ebe-bd44-4cb9043dc7c0",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-09T01:22:05.169Z"
          },
          {
            "id": "e83c2b8a-4969-4f67-92af-c58aa02aca3e",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-08T21:37:18.018Z"
          }
        ]
      }
    ]
  },
  {
    "id": "58cdb28b-8826-4678-9ee5-b6a775d11dfd",
    "name": "Bia",
    "phone": "15996851185",
    "email": null,
    "createdAt": "2026-09-08T23:15:19.706Z",
    "addresses": [
      {
        "id": "17b6e815-5544-460f-9e07-24e3965631d9",
        "clientId": "58cdb28b-8826-4678-9ee5-b6a775d11dfd",
        "cep": "18076-280",
        "street": "Rua Raymundo Frutuoso da Silva",
        "number": "364",
        "complement": "Casa",
        "neighborhood": "Jardim São Conrado",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 0.9
      }
    ],
    "orders": [
      {
        "id": "2a07856d-bf88-44d5-8bc8-cb020f1a2302",
        "number": 24,
        "clientId": "58cdb28b-8826-4678-9ee5-b6a775d11dfd",
        "client": {
          "id": "58cdb28b-8826-4678-9ee5-b6a775d11dfd",
          "name": "Bia",
          "phone": "15996851185",
          "email": null
        },
        "address": {
          "id": "17b6e815-5544-460f-9e07-24e3965631d9",
          "cep": "18076-280",
          "street": "Rua Raymundo Frutuoso da Silva",
          "number": "364",
          "complement": "Casa",
          "neighborhood": "Jardim São Conrado",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 0.9
        },
        "subtotal": 130,
        "deliveryFee": 0,
        "total": 130,
        "paymentMethod": "CASH",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-08T23:15:20.698Z",
        "items": [
          {
            "id": "293c3e31-dff1-419c-97b0-39d57775b3fb",
            "productId": "9f1f9735-9fb5-43eb-9265-f730b96d8db4",
            "productName": "IGNITE V400 MIX 40K DE PUFS ",
            "productImage": "/storage/products/ftc51w7xv4w-1785284093261.webp",
            "flavorId": "aa3af41f-b3d4-4ad0-b7ba-666aefb2c556",
            "flavorName": "Melão/ Menthol ",
            "quantity": 1,
            "priceAtPurchase": 130
          }
        ],
        "history": [
          {
            "id": "492f6702-f5db-4cf4-8b08-b67b62d4c0ce",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-09T01:22:02.536Z"
          },
          {
            "id": "fb4f1e1f-73cb-47dc-8e97-96c6fc456276",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-08T23:15:20.698Z"
          }
        ]
      }
    ]
  },
  {
    "id": "fc070d47-ce5f-4ca8-855f-e0587d4e9b53",
    "name": "Mikaella",
    "phone": "15976031366",
    "email": null,
    "createdAt": "2026-09-09T21:30:05.788Z",
    "addresses": [
      {
        "id": "30e57a31-b817-4b6d-b17b-fc1626a4d935",
        "clientId": "fc070d47-ce5f-4ca8-855f-e0587d4e9b53",
        "cep": "18074605",
        "street": "Rua Terezinha Silva Leite",
        "number": "364",
        "complement": null,
        "neighborhood": "Jardim São Guilherme",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 4.3
      }
    ],
    "orders": [
      {
        "id": "176f0eca-fb01-461c-b1c4-6f9248a880f2",
        "number": 25,
        "clientId": "fc070d47-ce5f-4ca8-855f-e0587d4e9b53",
        "client": {
          "id": "fc070d47-ce5f-4ca8-855f-e0587d4e9b53",
          "name": "Mikaella",
          "phone": "15976031366",
          "email": null
        },
        "address": {
          "id": "30e57a31-b817-4b6d-b17b-fc1626a4d935",
          "cep": "18074605",
          "street": "Rua Terezinha Silva Leite",
          "number": "364",
          "complement": null,
          "neighborhood": "Jardim São Guilherme",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 4.3
        },
        "subtotal": 75,
        "deliveryFee": 5,
        "total": 80,
        "paymentMethod": "CASH",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-09T21:30:05.952Z",
        "items": [
          {
            "id": "2ec1b66f-8164-498c-9ff0-79742590c815",
            "productId": "5324005b-c6c1-47c3-b4fc-f6b616765927",
            "productName": "IGNITE V55- 5,500 pfs ",
            "productImage": "/storage/products/qgfaq8kbmhi-1784947724740.png",
            "flavorId": "90947cda-5f94-48f0-962f-3a2d5a5d16c4",
            "flavorName": "Morango kiwi",
            "quantity": 1,
            "priceAtPurchase": 75
          }
        ],
        "history": [
          {
            "id": "789de506-3daa-463f-91d1-f98ea4cf4e67",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:03.751Z"
          },
          {
            "id": "cfa582ed-6e27-41cc-a7df-b9d147367224",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-09T21:30:05.952Z"
          }
        ]
      }
    ]
  },
  {
    "id": "4339d033-66e5-4902-a754-71aaa7abdedd",
    "name": "Mary",
    "phone": "15981432270",
    "email": null,
    "createdAt": "2026-09-10T01:53:34.423Z",
    "addresses": [
      {
        "id": "4acba820-80da-43f6-822f-ee086a7ae086",
        "clientId": "4339d033-66e5-4902-a754-71aaa7abdedd",
        "cep": "18055680",
        "street": "Rua Doutor José Stilitano",
        "number": "328",
        "complement": null,
        "neighborhood": "Parque Ouro Fino",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 7.2
      }
    ],
    "orders": [
      {
        "id": "37322f21-243e-46f3-8178-af53ddf8efa2",
        "number": 27,
        "clientId": "4339d033-66e5-4902-a754-71aaa7abdedd",
        "client": {
          "id": "4339d033-66e5-4902-a754-71aaa7abdedd",
          "name": "Mary",
          "phone": "15981432270",
          "email": null
        },
        "address": {
          "id": "4acba820-80da-43f6-822f-ee086a7ae086",
          "cep": "18055680",
          "street": "Rua Doutor José Stilitano",
          "number": "328",
          "complement": null,
          "neighborhood": "Parque Ouro Fino",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 7.2
        },
        "subtotal": 95,
        "deliveryFee": 10,
        "total": 105,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T01:53:34.567Z",
        "items": [
          {
            "id": "7e304819-370b-4986-a5c7-ed53cb6986b2",
            "productId": "3e53d16a-e319-4ff5-b45e-fed8cfdaf036",
            "productName": "ELFBAR BC 40K-40 MIL PUFS EUA",
            "productImage": "/storage/products/stjyr8v4i98-1785336008207.webp",
            "flavorId": "dee3f8d3-834d-482d-9a32-c4689dde008b",
            "flavorName": "Suor maçã verde ",
            "quantity": 1,
            "priceAtPurchase": 95
          }
        ],
        "history": [
          {
            "id": "72eac9c2-16ba-4af2-be83-6212de150e72",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:07.232Z"
          },
          {
            "id": "affa6593-9cff-4d63-b265-4c56cae8f694",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T01:53:34.567Z"
          }
        ]
      }
    ]
  },
  {
    "id": "1b77d358-facb-48b7-8fd3-9965f4079eb6",
    "name": "Júlia",
    "phone": "15974034189",
    "email": null,
    "createdAt": "2026-09-10T01:58:51.584Z",
    "addresses": [
      {
        "id": "172947a0-e42e-4092-be3e-134e335d5eae",
        "clientId": "1b77d358-facb-48b7-8fd3-9965f4079eb6",
        "cep": "18066215",
        "street": "Rua Ariberti Fazzio",
        "number": "243",
        "complement": null,
        "neighborhood": "Jardim Nogueira",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 0.9
      }
    ],
    "orders": [
      {
        "id": "443af4c7-ae35-450e-b090-d041edabcdc1",
        "number": 28,
        "clientId": "1b77d358-facb-48b7-8fd3-9965f4079eb6",
        "client": {
          "id": "1b77d358-facb-48b7-8fd3-9965f4079eb6",
          "name": "Júlia",
          "phone": "15974034189",
          "email": null
        },
        "address": {
          "id": "172947a0-e42e-4092-be3e-134e335d5eae",
          "cep": "18066215",
          "street": "Rua Ariberti Fazzio",
          "number": "243",
          "complement": null,
          "neighborhood": "Jardim Nogueira",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 0.9
        },
        "subtotal": 95,
        "deliveryFee": 0,
        "total": 95,
        "paymentMethod": "CASH",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T01:58:52.300Z",
        "items": [
          {
            "id": "890f310f-a80d-4d73-a365-0c2699aa5f3f",
            "productId": "3e53d16a-e319-4ff5-b45e-fed8cfdaf036",
            "productName": "ELFBAR BC 40K-40 MIL PUFS EUA",
            "productImage": "/storage/products/stjyr8v4i98-1785336008207.webp",
            "flavorId": "dee3f8d3-834d-482d-9a32-c4689dde008b",
            "flavorName": "Suor maçã verde ",
            "quantity": 1,
            "priceAtPurchase": 95
          }
        ],
        "history": [
          {
            "id": "608fe8a1-810a-43fa-8f40-128e89f5a75f",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:09.431Z"
          },
          {
            "id": "b3b1fb08-03fe-4a7d-9815-15699f357477",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T01:58:52.300Z"
          }
        ]
      }
    ]
  },
  {
    "id": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
    "name": "Hilary",
    "phone": "1599237500",
    "email": null,
    "createdAt": "2026-09-10T01:15:57.451Z",
    "addresses": [
      {
        "id": "7988e809-8917-400d-bfb1-1e1f9c2bf711",
        "clientId": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
        "cep": "18117090",
        "street": "Rua Gregôrio Sevilha",
        "number": "46",
        "complement": null,
        "neighborhood": "Parque Santos Dumont",
        "city": "Votorantim",
        "state": "SP",
        "distanceKm": 3.8
      },
      {
        "id": "7ad54236-3346-4a97-8f8b-24a262d747ad",
        "clientId": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
        "cep": "18117090",
        "street": "Rua Gregôrio Sevilha",
        "number": "46",
        "complement": null,
        "neighborhood": "Parque Santos Dumont",
        "city": "Votorantim",
        "state": "SP",
        "distanceKm": 3.8
      }
    ],
    "orders": [
      {
        "id": "1edecbe9-847c-40ca-a34a-52fa5d1d4e43",
        "number": 29,
        "clientId": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
        "client": {
          "id": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
          "name": "Hilary",
          "phone": "1599237500",
          "email": null
        },
        "address": {
          "id": "7ad54236-3346-4a97-8f8b-24a262d747ad",
          "cep": "18117090",
          "street": "Rua Gregôrio Sevilha",
          "number": "46",
          "complement": null,
          "neighborhood": "Parque Santos Dumont",
          "city": "Votorantim",
          "state": "SP",
          "distanceKm": 3.8
        },
        "subtotal": 80,
        "deliveryFee": 5,
        "total": 85,
        "paymentMethod": "CASH",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T02:01:39.960Z",
        "items": [
          {
            "id": "d4226fca-b84b-497a-83f1-520dbba811c7",
            "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
            "productName": "KIT ELFBAR EW BATERIA E REFIL 9K PUFS",
            "productImage": "/storage/products/zgk2n3u1a4-1785289010881.jpeg",
            "flavorId": "c7e4caaf-3740-4758-bd3f-5913eba7b701",
            "flavorName": "Dragon Stranwnana ",
            "quantity": 1,
            "priceAtPurchase": 80
          }
        ],
        "history": [
          {
            "id": "f50e41d8-0f76-44a3-b5d6-a128ac2a74e7",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:11.390Z"
          },
          {
            "id": "001c8468-8fbe-4f1d-959d-f1c952fced99",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T02:01:39.960Z"
          }
        ]
      },
      {
        "id": "f5414356-08b4-43f8-8ff1-2c72a1d32a44",
        "number": 26,
        "clientId": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
        "client": {
          "id": "8bf13639-46a2-4157-b8be-c4eb7b80b958",
          "name": "Hilary",
          "phone": "1599237500",
          "email": null
        },
        "address": {
          "id": "7988e809-8917-400d-bfb1-1e1f9c2bf711",
          "cep": "18117090",
          "street": "Rua Gregôrio Sevilha",
          "number": "46",
          "complement": null,
          "neighborhood": "Parque Santos Dumont",
          "city": "Votorantim",
          "state": "SP",
          "distanceKm": 3.8
        },
        "subtotal": 55,
        "deliveryFee": 5,
        "total": 60,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T01:15:57.638Z",
        "items": [
          {
            "id": "f9ea6a6c-9c4b-460c-8072-9060d0f2301b",
            "productId": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
            "productName": "REFIL ELFBAR EW",
            "productImage": "/storage/products/lin1jjm5mfk-1788279791971.png",
            "flavorId": "8e06c272-343e-43b6-8b83-0cce17515e1b",
            "flavorName": "Suor maçã verde ",
            "quantity": 1,
            "priceAtPurchase": 55
          }
        ],
        "history": [
          {
            "id": "92c68d81-3721-478f-bcce-1949c289f223",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:05.360Z"
          },
          {
            "id": "1de5bfd8-f3ce-449e-b202-c8a8eb2daab5",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T01:15:57.638Z"
          }
        ]
      }
    ]
  },
  {
    "id": "870db724-8686-41b7-9894-52f606203f2f",
    "name": "Rafael",
    "phone": "15997503121",
    "email": null,
    "createdAt": "2026-09-10T20:10:08.009Z",
    "addresses": [
      {
        "id": "3530f130-3256-4ef8-9cfb-b74e168d58ec",
        "clientId": "870db724-8686-41b7-9894-52f606203f2f",
        "cep": "18104145",
        "street": "Rua Zulmira Cardoso Rodrigues",
        "number": "28",
        "complement": null,
        "neighborhood": "Jardim Ametista",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5.8
      }
    ],
    "orders": [
      {
        "id": "44762a49-82c0-4c76-b99b-880a0bae7ac0",
        "number": 30,
        "clientId": "870db724-8686-41b7-9894-52f606203f2f",
        "client": {
          "id": "870db724-8686-41b7-9894-52f606203f2f",
          "name": "Rafael",
          "phone": "15997503121",
          "email": null
        },
        "address": {
          "id": "3530f130-3256-4ef8-9cfb-b74e168d58ec",
          "cep": "18104145",
          "street": "Rua Zulmira Cardoso Rodrigues",
          "number": "28",
          "complement": null,
          "neighborhood": "Jardim Ametista",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5.8
        },
        "subtotal": 150,
        "deliveryFee": 8,
        "total": 158,
        "paymentMethod": "CASH",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T20:10:08.173Z",
        "items": [
          {
            "id": "0383e9cc-6e4d-453d-ba67-98edf7b8e252",
            "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
            "productName": "IGNITE V500-50 MIL PUFS",
            "productImage": "/storage/products/xt5ozmh5q4i-1786035376510.png",
            "flavorId": "61c5e44e-1e25-444e-985f-4d1f05adce4c",
            "flavorName": "Maçã verde pêssego ",
            "quantity": 1,
            "priceAtPurchase": 150
          }
        ],
        "history": [
          {
            "id": "58bc9e59-28de-4093-8b6c-83db20ba399d",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:13.613Z"
          },
          {
            "id": "6ee39c36-6f20-4564-8d53-620e089e309d",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T20:10:08.173Z"
          }
        ]
      }
    ]
  },
  {
    "id": "10700ccb-adac-436e-84c6-94e1db4b5ad3",
    "name": "Lucas Abreu",
    "phone": "15997965671",
    "email": null,
    "createdAt": "2026-09-10T20:23:44.833Z",
    "addresses": [
      {
        "id": "8fc297b2-7ef5-4fa3-b210-715e29e84ca7",
        "clientId": "10700ccb-adac-436e-84c6-94e1db4b5ad3",
        "cep": "18044010",
        "street": "Rua Imperatriz Leopoldina",
        "number": "46",
        "complement": "Hospital evangelico",
        "neighborhood": "Vila Jardini",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5.8
      }
    ],
    "orders": [
      {
        "id": "d5679270-2a67-4e30-beec-a546336091df",
        "number": 31,
        "clientId": "10700ccb-adac-436e-84c6-94e1db4b5ad3",
        "client": {
          "id": "10700ccb-adac-436e-84c6-94e1db4b5ad3",
          "name": "Lucas Abreu",
          "phone": "15997965671",
          "email": null
        },
        "address": {
          "id": "8fc297b2-7ef5-4fa3-b210-715e29e84ca7",
          "cep": "18044010",
          "street": "Rua Imperatriz Leopoldina",
          "number": "46",
          "complement": "Hospital evangelico",
          "neighborhood": "Vila Jardini",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5.8
        },
        "subtotal": 120,
        "deliveryFee": 8,
        "total": 128,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T20:23:45.003Z",
        "items": [
          {
            "id": "e02ec0d2-d53b-43c7-bf77-e0c5711699a3",
            "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
            "productName": "ELFBAR ICE KING 40K-40 MIL PUFS",
            "productImage": "/storage/products/py44a9huqhj-1785290855433.jpeg",
            "flavorId": "e00776c1-a4ce-4d39-a379-e72816a0be43",
            "flavorName": "Blue razz ",
            "quantity": 1,
            "priceAtPurchase": 120
          }
        ],
        "history": [
          {
            "id": "08cdee32-a2ba-4be0-b9e8-d6a7fc10d301",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:16.121Z"
          },
          {
            "id": "978cf4c3-53e3-4ef4-b9f8-d4ee7d3edf4c",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T20:23:45.003Z"
          }
        ]
      }
    ]
  },
  {
    "id": "50739024-9b96-4b47-90c8-d2f353def243",
    "name": "Lucas",
    "phone": "15991005693",
    "email": null,
    "createdAt": "2026-09-10T20:27:36.792Z",
    "addresses": [
      {
        "id": "f77f9286-95da-405c-a8ea-e5a47fa69893",
        "clientId": "50739024-9b96-4b47-90c8-d2f353def243",
        "cep": "18081085",
        "street": "Rua Joaquim Ferreira Barbosa",
        "number": "48",
        "complement": "Centro esportivo",
        "neighborhood": "Jardim Maria do Carmo",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5.8
      }
    ],
    "orders": [
      {
        "id": "5954a5a7-8e15-465c-af2d-6eb68f74b3f8",
        "number": 32,
        "clientId": "50739024-9b96-4b47-90c8-d2f353def243",
        "client": {
          "id": "50739024-9b96-4b47-90c8-d2f353def243",
          "name": "Lucas",
          "phone": "15991005693",
          "email": null
        },
        "address": {
          "id": "f77f9286-95da-405c-a8ea-e5a47fa69893",
          "cep": "18081085",
          "street": "Rua Joaquim Ferreira Barbosa",
          "number": "48",
          "complement": "Centro esportivo",
          "neighborhood": "Jardim Maria do Carmo",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5.8
        },
        "subtotal": 150,
        "deliveryFee": 8,
        "total": 158,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T20:27:36.958Z",
        "items": [
          {
            "id": "efeb0035-1c2c-493a-9301-5c079e00127a",
            "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
            "productName": "IGNITE V500-50 MIL PUFS",
            "productImage": "/storage/products/xt5ozmh5q4i-1786035376510.png",
            "flavorId": "9ef3381d-aeaa-47ba-8866-e4325c164d50",
            "flavorName": "Uva ice ",
            "quantity": 1,
            "priceAtPurchase": 150
          }
        ],
        "history": [
          {
            "id": "70f88988-f3a3-4ed0-977d-883d565c80a3",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:18.129Z"
          },
          {
            "id": "62a63747-1e56-4e73-8b9b-693c58a0dc68",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T20:27:36.958Z"
          }
        ]
      }
    ]
  },
  {
    "id": "fb77f019-632d-4bb1-80d8-7135b7cabef5",
    "name": "arrais",
    "phone": "15991783464",
    "email": null,
    "createdAt": "2026-09-10T20:50:04.446Z",
    "addresses": [
      {
        "id": "1b906c8c-7e91-42c9-8d03-73c3f4c71752",
        "clientId": "fb77f019-632d-4bb1-80d8-7135b7cabef5",
        "cep": "18112240",
        "street": "Rua Sara Vieira Campos",
        "number": "360",
        "complement": null,
        "neighborhood": "Jardim Daniel Antônio",
        "city": "Votorantim",
        "state": "SP",
        "distanceKm": 12.7
      }
    ],
    "orders": [
      {
        "id": "caf7d51a-cc1f-43d7-99da-2030c40a1aa7",
        "number": 33,
        "clientId": "fb77f019-632d-4bb1-80d8-7135b7cabef5",
        "client": {
          "id": "fb77f019-632d-4bb1-80d8-7135b7cabef5",
          "name": "arrais",
          "phone": "15991783464",
          "email": null
        },
        "address": {
          "id": "1b906c8c-7e91-42c9-8d03-73c3f4c71752",
          "cep": "18112240",
          "street": "Rua Sara Vieira Campos",
          "number": "360",
          "complement": null,
          "neighborhood": "Jardim Daniel Antônio",
          "city": "Votorantim",
          "state": "SP",
          "distanceKm": 12.7
        },
        "subtotal": 120,
        "deliveryFee": 15,
        "total": 135,
        "paymentMethod": "PIX",
        "notes": "pago",
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-10T20:50:04.613Z",
        "items": [
          {
            "id": "117a6794-f5b6-4fb7-b883-002ef0fab572",
            "productId": "b2d9540a-c6e9-427e-8b56-c9b2c0eafa6f",
            "productName": "ELFBAR ICE KING 40K-40 MIL PUFS",
            "productImage": "/storage/products/py44a9huqhj-1785290855433.jpeg",
            "flavorId": "0920ef72-7741-496d-9115-62c3279505f4",
            "flavorName": "Cereja morango ice ",
            "quantity": 1,
            "priceAtPurchase": 120
          }
        ],
        "history": [
          {
            "id": "95a9a05f-f4b0-4fd8-b32d-84042b94ee4a",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:20.861Z"
          },
          {
            "id": "7ad104f3-852f-42ac-b7bb-71efe4cbb248",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-10T20:50:04.613Z"
          }
        ]
      }
    ]
  },
  {
    "id": "f1067a97-644d-4f15-a9f8-1e4ed8598d76",
    "name": "ana",
    "phone": "15997879963",
    "email": null,
    "createdAt": "2026-09-11T01:02:03.349Z",
    "addresses": [
      {
        "id": "ca5ff0ab-3d26-4d05-b49c-1b5dc829df5f",
        "clientId": "f1067a97-644d-4f15-a9f8-1e4ed8598d76",
        "cep": "18080001",
        "street": "Rua Comendador Hermelino Matarazzo",
        "number": "1308",
        "complement": null,
        "neighborhood": "Vila Santa Rita",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5.1
      }
    ],
    "orders": [
      {
        "id": "ac2889ab-01dd-49b6-9ce9-ff7ce6d59386",
        "number": 34,
        "clientId": "f1067a97-644d-4f15-a9f8-1e4ed8598d76",
        "client": {
          "id": "f1067a97-644d-4f15-a9f8-1e4ed8598d76",
          "name": "ana",
          "phone": "15997879963",
          "email": null
        },
        "address": {
          "id": "ca5ff0ab-3d26-4d05-b49c-1b5dc829df5f",
          "cep": "18080001",
          "street": "Rua Comendador Hermelino Matarazzo",
          "number": "1308",
          "complement": null,
          "neighborhood": "Vila Santa Rita",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5.1
        },
        "subtotal": 150,
        "deliveryFee": 8,
        "total": 158,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-11T01:02:03.556Z",
        "items": [
          {
            "id": "369fd489-0b87-40eb-9132-b26915541899",
            "productId": "a60fbb1f-d3a0-4492-8f2c-c33dd4b16434",
            "productName": "IGNITE V500-50 MIL PUFS",
            "productImage": "/storage/products/xt5ozmh5q4i-1786035376510.png",
            "flavorId": "fede02c7-b46b-4e3f-8fd8-746d3e7cb088",
            "flavorName": "Melancia mix ",
            "quantity": 1,
            "priceAtPurchase": 150
          }
        ],
        "history": [
          {
            "id": "3a1cbfca-7abf-4bd1-8f15-467d94f5a090",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:22.852Z"
          },
          {
            "id": "8fd31c6a-83f8-423d-99b0-4dab7248b2a3",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-11T01:02:03.556Z"
          }
        ]
      }
    ]
  },
  {
    "id": "0026c189-c54f-4e66-9b5e-b5ea7b6ccbf8",
    "name": "Samuel",
    "phone": "15920012818",
    "email": null,
    "createdAt": "2026-09-11T01:48:32.335Z",
    "addresses": [
      {
        "id": "354620b9-3ce1-42f8-a5df-5ff0d2a75bc7",
        "clientId": "0026c189-c54f-4e66-9b5e-b5ea7b6ccbf8",
        "cep": "18071095",
        "street": "Rua Rinaldo Scotto",
        "number": "89",
        "complement": "pix",
        "neighborhood": "Jardim Monterrey",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 6.3
      }
    ],
    "orders": [
      {
        "id": "25081133-4b04-48b8-8201-c17025bc9a39",
        "number": 35,
        "clientId": "0026c189-c54f-4e66-9b5e-b5ea7b6ccbf8",
        "client": {
          "id": "0026c189-c54f-4e66-9b5e-b5ea7b6ccbf8",
          "name": "Samuel",
          "phone": "15920012818",
          "email": null
        },
        "address": {
          "id": "354620b9-3ce1-42f8-a5df-5ff0d2a75bc7",
          "cep": "18071095",
          "street": "Rua Rinaldo Scotto",
          "number": "89",
          "complement": "pix",
          "neighborhood": "Jardim Monterrey",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 6.3
        },
        "subtotal": 90,
        "deliveryFee": 8,
        "total": 98,
        "paymentMethod": "PIX",
        "notes": "piX, TA PAGO",
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-11T01:48:32.515Z",
        "items": [
          {
            "id": "1b826eeb-1204-419f-84e8-a6c86b84602c",
            "productId": "9bc46d06-0edb-4b90-8a0c-5a6c81ae7568",
            "productName": "IGNITE V155 ",
            "productImage": "/storage/products/6g03r6xv8qc-1785189839075.webp",
            "flavorId": "7bf5487d-47de-40ba-a34a-47360fa564ac",
            "flavorName": "Uva ice ",
            "quantity": 1,
            "priceAtPurchase": 90
          }
        ],
        "history": [
          {
            "id": "3d0c509a-5606-40ae-bc67-6e5eb111367d",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-11T19:23:26.431Z"
          },
          {
            "id": "54d86fe3-5c59-4492-b90e-0a37779f8007",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-11T01:48:32.515Z"
          }
        ]
      }
    ]
  },
  {
    "id": "807f2bff-42d1-4166-b77b-251f27965e0c",
    "name": "eric",
    "phone": "15996490256",
    "email": null,
    "createdAt": "2026-09-01T19:30:06.638Z",
    "addresses": [
      {
        "id": "25bcc0f7-533a-48f7-bd6f-28db16aab6de",
        "clientId": "807f2bff-42d1-4166-b77b-251f27965e0c",
        "cep": "18055745",
        "street": "Rua Padre Domenico Trivi",
        "number": "350",
        "complement": null,
        "neighborhood": "Parque Esmeralda",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 6.2
      },
      {
        "id": "8eabebb5-4d1a-4619-aa6e-30e1dc969b1d",
        "clientId": "807f2bff-42d1-4166-b77b-251f27965e0c",
        "cep": "18055745",
        "street": "Rua Padre Domenico Trivi",
        "number": "350",
        "complement": null,
        "neighborhood": "Parque Esmeralda",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 6.9
      }
    ],
    "orders": [
      {
        "id": "93074b32-376e-4940-a803-18ed72d2f39f",
        "number": 36,
        "clientId": "807f2bff-42d1-4166-b77b-251f27965e0c",
        "client": {
          "id": "807f2bff-42d1-4166-b77b-251f27965e0c",
          "name": "eric",
          "phone": "15996490256",
          "email": null
        },
        "address": {
          "id": "8eabebb5-4d1a-4619-aa6e-30e1dc969b1d",
          "cep": "18055745",
          "street": "Rua Padre Domenico Trivi",
          "number": "350",
          "complement": null,
          "neighborhood": "Parque Esmeralda",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 6.9
        },
        "subtotal": 55,
        "deliveryFee": 8,
        "total": 63,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-09-11T19:22:56.490Z",
        "items": [
          {
            "id": "43ac2619-e58d-4682-a454-af12bba6a9c9",
            "productId": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
            "productName": "REFIL ELFBAR EW",
            "productImage": "/storage/products/lin1jjm5mfk-1788279791971.png",
            "flavorId": "8e06c272-343e-43b6-8b83-0cce17515e1b",
            "flavorName": "Suor maçã verde ",
            "quantity": 1,
            "priceAtPurchase": 55
          }
        ],
        "history": [
          {
            "id": "233b96e9-b3ee-4f38-bb13-e490dcd38ace",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-11T19:22:56.490Z"
          }
        ]
      },
      {
        "id": "7493523f-8ae5-49b4-90cd-440968b787fe",
        "number": 17,
        "clientId": "807f2bff-42d1-4166-b77b-251f27965e0c",
        "client": {
          "id": "807f2bff-42d1-4166-b77b-251f27965e0c",
          "name": "eric",
          "phone": "15996490256",
          "email": null
        },
        "address": {
          "id": "25bcc0f7-533a-48f7-bd6f-28db16aab6de",
          "cep": "18055745",
          "street": "Rua Padre Domenico Trivi",
          "number": "350",
          "complement": null,
          "neighborhood": "Parque Esmeralda",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 6.2
        },
        "subtotal": 135,
        "deliveryFee": 8,
        "total": 143,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "DELIVERED",
        "whatsappSent": true,
        "createdAt": "2026-09-01T19:30:06.805Z",
        "items": [
          {
            "id": "d46f312c-19c8-4ce9-ab52-3842e1c5b531",
            "productId": "46c24ff4-6006-4018-8c36-566aa1e27f8f",
            "productName": "REFIL ELFBAR EW",
            "productImage": "/storage/products/lin1jjm5mfk-1788279791971.png",
            "flavorId": "8e06c272-343e-43b6-8b83-0cce17515e1b",
            "flavorName": "Suor maçã verde ",
            "quantity": 1,
            "priceAtPurchase": 55
          },
          {
            "id": "c25852b5-1d45-48e9-8a77-16c634b4208e",
            "productId": "24b6c1d1-7eea-441c-a9ff-b640aa75e7f1",
            "productName": "KIT ELFBAR EW BATERIA E REFIL 9K PUFS",
            "productImage": "/storage/products/zgk2n3u1a4-1785289010881.jpeg",
            "flavorId": "fc556c92-20cb-4042-9a0c-5ad805284606",
            "flavorName": "Melancia ice ",
            "quantity": 1,
            "priceAtPurchase": 80
          }
        ],
        "history": [
          {
            "id": "9cfd50b6-3c7b-4472-b76c-8d744a2f4094",
            "status": "DELIVERED",
            "notes": "Status alterado para DELIVERED",
            "changedBy": "Admin",
            "createdAt": "2026-09-08T21:39:07.553Z"
          },
          {
            "id": "9f441aa4-c24c-47b3-8f96-e9a137b8fbfb",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-01T19:30:06.805Z"
          }
        ]
      }
    ]
  },
  {
    "id": "d6cafbfb-ea5e-40f6-bb5e-51b4f2f44552",
    "name": "Éric",
    "phone": "15997940856",
    "email": null,
    "createdAt": "2026-09-16T19:15:39.635Z",
    "addresses": [
      {
        "id": "d21d4ba0-25bb-4493-872c-cd5b5d416f84",
        "clientId": "d6cafbfb-ea5e-40f6-bb5e-51b4f2f44552",
        "cep": "18072856",
        "street": "Rua Seraphim Banietti",
        "number": "853",
        "complement": null,
        "neighborhood": "Caguassu",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 4.9
      }
    ],
    "orders": [
      {
        "id": "29016e4d-19cf-48f6-9729-528e37883a91",
        "number": 37,
        "clientId": "d6cafbfb-ea5e-40f6-bb5e-51b4f2f44552",
        "client": {
          "id": "d6cafbfb-ea5e-40f6-bb5e-51b4f2f44552",
          "name": "Éric",
          "phone": "15997940856",
          "email": null
        },
        "address": {
          "id": "d21d4ba0-25bb-4493-872c-cd5b5d416f84",
          "cep": "18072856",
          "street": "Rua Seraphim Banietti",
          "number": "853",
          "complement": null,
          "neighborhood": "Caguassu",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 4.9
        },
        "subtotal": 65,
        "deliveryFee": 5,
        "total": 70,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-09-16T19:15:39.845Z",
        "items": [
          {
            "id": "f1064bc5-dcf3-445b-9140-f4797d004421",
            "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
            "productName": "NIK BAR 10K-10 MIL PUFS",
            "productImage": "/storage/products/8dx6qqxx4wh-1785577623184.jpeg",
            "flavorId": "60ca2082-46c3-4d35-94e8-7c83cc8d22f4",
            "flavorName": "Uva ice ",
            "quantity": 1,
            "priceAtPurchase": 65
          }
        ],
        "history": [
          {
            "id": "74e43a52-b08a-4e25-80cf-d11a05787949",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-09-16T19:15:39.845Z"
          }
        ]
      }
    ]
  },
  {
    "id": "2786d7e6-3e11-4d54-89df-768f663070f3",
    "name": "Isabelle Gonçalves Turaça",
    "phone": "15988003914",
    "email": null,
    "createdAt": "2026-10-10T23:17:08.043Z",
    "addresses": [
      {
        "id": "dc836682-7419-4aec-805e-2ba266b78d4e",
        "clientId": "2786d7e6-3e11-4d54-89df-768f663070f3",
        "cep": "18015000",
        "street": "Rua Pedro José Senger",
        "number": "1190",
        "complement": "Turaça Pastelaria",
        "neighborhood": "Vila Haro",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 7
      }
    ],
    "orders": [
      {
        "id": "d6afb134-2bbd-4ade-9730-ab9b663f21d3",
        "number": 38,
        "clientId": "2786d7e6-3e11-4d54-89df-768f663070f3",
        "client": {
          "id": "2786d7e6-3e11-4d54-89df-768f663070f3",
          "name": "Isabelle Gonçalves Turaça",
          "phone": "15988003914",
          "email": null
        },
        "address": {
          "id": "dc836682-7419-4aec-805e-2ba266b78d4e",
          "cep": "18015000",
          "street": "Rua Pedro José Senger",
          "number": "1190",
          "complement": "Turaça Pastelaria",
          "neighborhood": "Vila Haro",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 7
        },
        "subtotal": 90,
        "deliveryFee": 8,
        "total": 98,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-10-10T23:17:08.375Z",
        "items": [
          {
            "id": "b66f5d7c-7510-4fd1-a45f-08c08c56afee",
            "productId": "674f117a-3aab-4be5-8fd7-068e4861578f",
            "productName": "DINNER LADY LUMA 20K-20 ML PUFS ",
            "productImage": "/storage/products/prod-674f117a-3aab-4be5-8fd7-068e4861578f.png",
            "flavorId": "e1dd9304-db11-45ea-a54b-9d259316d30e",
            "flavorName": "Uva ice ",
            "quantity": 1,
            "priceAtPurchase": 90
          }
        ],
        "history": [
          {
            "id": "8591bb60-4059-4528-8721-3908f11551fd",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-10-10T23:17:08.375Z"
          }
        ]
      }
    ]
  },
  {
    "id": "6b369fce-93b4-474a-97d6-6a920218f01b",
    "name": "Milenna",
    "phone": "15997843023",
    "email": null,
    "createdAt": "2026-10-10T23:29:58.395Z",
    "addresses": [
      {
        "id": "47c2383e-bec9-410c-a99a-ff5cad2880e3",
        "clientId": "6b369fce-93b4-474a-97d6-6a920218f01b",
        "cep": "15997843023",
        "street": "Rua Olímpio Mentone",
        "number": "178",
        "complement": null,
        "neighborhood": "Vila Aeroporto",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5
      }
    ],
    "orders": [
      {
        "id": "7aaf0f9c-56ca-4a5a-96ea-e0c0ba911e1f",
        "number": 39,
        "clientId": "6b369fce-93b4-474a-97d6-6a920218f01b",
        "client": {
          "id": "6b369fce-93b4-474a-97d6-6a920218f01b",
          "name": "Milenna",
          "phone": "15997843023",
          "email": null
        },
        "address": {
          "id": "47c2383e-bec9-410c-a99a-ff5cad2880e3",
          "cep": "15997843023",
          "street": "Rua Olímpio Mentone",
          "number": "178",
          "complement": null,
          "neighborhood": "Vila Aeroporto",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5
        },
        "subtotal": 65,
        "deliveryFee": 5,
        "total": 70,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-10-10T23:29:58.584Z",
        "items": [
          {
            "id": "9e992ef3-0f55-433e-b946-a21d0019bbd8",
            "productId": "8b91f518-a0ee-4324-9905-cf9bf00bd81d",
            "productName": "NIK BAR 10K-10 MIL PUFS",
            "productImage": "/storage/products/8dx6qqxx4wh-1785577623184.jpeg",
            "flavorId": "60ca2082-46c3-4d35-94e8-7c83cc8d22f4",
            "flavorName": "Uva ice ",
            "quantity": 1,
            "priceAtPurchase": 65
          }
        ],
        "history": [
          {
            "id": "2a9bea33-b171-488b-9c32-66db02a367cc",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-10-10T23:29:58.584Z"
          }
        ]
      }
    ]
  },
  {
    "id": "b4f00696-9a84-494e-927b-5b7ebd719841",
    "name": "Vitor Heidmann",
    "phone": "13997023013",
    "email": null,
    "createdAt": "2026-10-18T02:45:36.537Z",
    "addresses": [
      {
        "id": "6a417ef5-8c67-43d9-b703-ec3827869eac",
        "clientId": "b4f00696-9a84-494e-927b-5b7ebd719841",
        "cep": "18072395",
        "street": "Elisia Estausia",
        "number": "10",
        "complement": "Casa 2",
        "neighborhood": "Parque São Bento",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5.7
      },
      {
        "id": "22780107-b3c9-4115-8244-516207610ce9",
        "clientId": "b4f00696-9a84-494e-927b-5b7ebd719841",
        "cep": "18072395",
        "street": "Rua Elisia Estáusia",
        "number": "10",
        "complement": "Casa 2",
        "neighborhood": "Parque São Bento",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 5.7
      }
    ],
    "orders": [
      {
        "id": "2ca27c85-ec45-4ee9-b904-8c52fb24ff4b",
        "number": 41,
        "clientId": "b4f00696-9a84-494e-927b-5b7ebd719841",
        "client": {
          "id": "b4f00696-9a84-494e-927b-5b7ebd719841",
          "name": "Vitor Heidmann",
          "phone": "13997023013",
          "email": null
        },
        "address": {
          "id": "22780107-b3c9-4115-8244-516207610ce9",
          "cep": "18072395",
          "street": "Rua Elisia Estáusia",
          "number": "10",
          "complement": "Casa 2",
          "neighborhood": "Parque São Bento",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5.7
        },
        "subtotal": 240,
        "deliveryFee": 8,
        "total": 248,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-10-18T02:50:49.182Z",
        "items": [
          {
            "id": "ce11ae4c-f170-4a82-ab0f-0177a246f6c7",
            "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
            "productName": "BLACK SHEEP 40K- 40 MIL PUFS DUAS SABOR",
            "productImage": "/storage/products/pf0muchtkwp-1785462120568.webp",
            "flavorId": "8258f167-17c3-49e8-878a-63d4feace628",
            "flavorName": "Uva/ Menthol ",
            "quantity": 1,
            "priceAtPurchase": 120
          },
          {
            "id": "3539de08-8b10-4611-b18e-127a5d578a98",
            "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
            "productName": "BLACK SHEEP 40K- 40 MIL PUFS DUAS SABOR",
            "productImage": "/storage/products/pf0muchtkwp-1785462120568.webp",
            "flavorId": "6aa59b41-1828-48c1-abeb-02208eb89be2",
            "flavorName": "Chiclete Blueberry/ suor maçã verde ",
            "quantity": 1,
            "priceAtPurchase": 120
          }
        ],
        "history": [
          {
            "id": "9679ff13-c8b4-4681-a5cb-e2b61112ce71",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-10-18T02:50:49.182Z"
          }
        ]
      },
      {
        "id": "531430a7-8fe9-48a8-ae8a-217b40c9678b",
        "number": 40,
        "clientId": "b4f00696-9a84-494e-927b-5b7ebd719841",
        "client": {
          "id": "b4f00696-9a84-494e-927b-5b7ebd719841",
          "name": "Vitor Heidmann",
          "phone": "13997023013",
          "email": null
        },
        "address": {
          "id": "6a417ef5-8c67-43d9-b703-ec3827869eac",
          "cep": "18072395",
          "street": "Elisia Estausia",
          "number": "10",
          "complement": "Casa 2",
          "neighborhood": "Parque São Bento",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 5.7
        },
        "subtotal": 120,
        "deliveryFee": 8,
        "total": 128,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-10-18T02:45:36.703Z",
        "items": [
          {
            "id": "4dadf880-3e61-48fb-9057-221b4410b8f9",
            "productId": "b1846bde-1cd8-4155-a6e5-8d0fe6c1d9ea",
            "productName": "BLACK SHEEP 40K- 40 MIL PUFS DUAS SABOR",
            "productImage": "/storage/products/pf0muchtkwp-1785462120568.webp",
            "flavorId": "72114a15-4a0d-426b-8a96-4c212ade3571",
            "flavorName": "Morango kiwi/ Fresh ment ",
            "quantity": 1,
            "priceAtPurchase": 120
          }
        ],
        "history": [
          {
            "id": "722c7add-114e-4890-8669-72a20c74ef77",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-10-18T02:45:36.703Z"
          }
        ]
      }
    ]
  },
  {
    "id": "8cf48b57-22cb-4fa8-9d98-72b6c0ffa5cb",
    "name": "Renato Dantas",
    "phone": "(15) 99796-1056",
    "email": null,
    "createdAt": "2026-10-23T08:57:35.433Z",
    "addresses": [
      {
        "id": "6513c176-44ef-43cb-9d8f-144183e72fc8",
        "clientId": "8cf48b57-22cb-4fa8-9d98-72b6c0ffa5cb",
        "cep": "18072-570",
        "street": "Rua Maria Aparecida Faria",
        "number": "156",
        "complement": null,
        "neighborhood": "Parque São Bento",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 8
      }
    ],
    "orders": [
      {
        "id": "ecbb2daf-b656-4759-9dde-fc8622814ac9",
        "number": 42,
        "clientId": "8cf48b57-22cb-4fa8-9d98-72b6c0ffa5cb",
        "client": {
          "id": "8cf48b57-22cb-4fa8-9d98-72b6c0ffa5cb",
          "name": "Renato Dantas",
          "phone": "(15) 99796-1056",
          "email": null
        },
        "address": {
          "id": "6513c176-44ef-43cb-9d8f-144183e72fc8",
          "cep": "18072-570",
          "street": "Rua Maria Aparecida Faria",
          "number": "156",
          "complement": null,
          "neighborhood": "Parque São Bento",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 8
        },
        "subtotal": 95,
        "deliveryFee": 10,
        "total": 105,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-10-23T08:57:35.622Z",
        "items": [
          {
            "id": "9ca2dbcf-5aa8-4396-9a83-27424fc0adde",
            "productId": "64940fe5-089e-4408-bcb3-4e2c9b8078ec",
            "productName": "NIK BAR 30K-30 MIL PUFS ",
            "productImage": "/storage/products/x93ro8z0apa-1785597514242.webp",
            "flavorId": "e86f9b7c-1d9a-4cc7-988d-76905981359b",
            "flavorName": "Menthol ",
            "quantity": 1,
            "priceAtPurchase": 95
          }
        ],
        "history": [
          {
            "id": "45b494ae-bc94-4942-b305-0d70f460f56f",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-10-23T08:57:35.622Z"
          }
        ]
      }
    ]
  },
  {
    "id": "7e00f942-75db-403d-8f9f-b1b018adc8e5",
    "name": "Maria Fernanda Gardino",
    "phone": "15991919415",
    "email": null,
    "createdAt": "2026-10-24T03:39:11.360Z",
    "addresses": [
      {
        "id": "c38bd10c-af68-4a48-9724-db14eced9945",
        "clientId": "7e00f942-75db-403d-8f9f-b1b018adc8e5",
        "cep": "18055215",
        "street": "Avenida Elias Maluf",
        "number": "3305",
        "complement": "portaria",
        "neighborhood": "Wanel Ville",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 7.2
      }
    ],
    "orders": [
      {
        "id": "0ca6b0b9-c37c-41ce-a180-344c27ee6185",
        "number": 43,
        "clientId": "7e00f942-75db-403d-8f9f-b1b018adc8e5",
        "client": {
          "id": "7e00f942-75db-403d-8f9f-b1b018adc8e5",
          "name": "Maria Fernanda Gardino",
          "phone": "15991919415",
          "email": null
        },
        "address": {
          "id": "c38bd10c-af68-4a48-9724-db14eced9945",
          "cep": "18055215",
          "street": "Avenida Elias Maluf",
          "number": "3305",
          "complement": "portaria",
          "neighborhood": "Wanel Ville",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 7.2
        },
        "subtotal": 150,
        "deliveryFee": 10,
        "total": 160,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-10-24T03:39:11.543Z",
        "items": [
          {
            "id": "c4988d97-40c1-49c9-92d1-c41c353cfc5a",
            "productId": "dd9470e9-9524-4ec0-8114-c7c5aa71e474",
            "productName": "IGNITE SLIM V400-40 MIL PUFS ",
            "productImage": "/storage/products/gcei6xfty8p-1786035294999.png",
            "flavorId": "f6ec2136-9d82-44ee-a55b-fd21765a1472",
            "flavorName": "Morango banana ",
            "quantity": 1,
            "priceAtPurchase": 150
          }
        ],
        "history": [
          {
            "id": "12a2427f-c119-45b9-9d5e-81357db586a1",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-10-24T03:39:11.543Z"
          }
        ]
      }
    ]
  },
  {
    "id": "961acc6f-5c11-4013-967e-c8bc9b376e9d",
    "name": "Daniela Pontes",
    "phone": "(15) 15996704971",
    "email": null,
    "createdAt": "2026-11-13T22:31:40.092Z",
    "addresses": [
      {
        "id": "d9b0bf4e-3d68-496d-bc9f-098eae51af2c",
        "clientId": "961acc6f-5c11-4013-967e-c8bc9b376e9d",
        "cep": "18071-801",
        "street": "Avenida Ipanema",
        "number": "10960",
        "complement": "ENTREGA NA PORTARIA PARA DANIELA SOARES",
        "neighborhood": "Jardim Novo Horizonte",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 3.9
      }
    ],
    "orders": [
      {
        "id": "40ea231b-59c5-4a24-8a28-5a8df59e3707",
        "number": 44,
        "clientId": "961acc6f-5c11-4013-967e-c8bc9b376e9d",
        "client": {
          "id": "961acc6f-5c11-4013-967e-c8bc9b376e9d",
          "name": "Daniela Pontes",
          "phone": "(15) 15996704971",
          "email": null
        },
        "address": {
          "id": "d9b0bf4e-3d68-496d-bc9f-098eae51af2c",
          "cep": "18071-801",
          "street": "Avenida Ipanema",
          "number": "10960",
          "complement": "ENTREGA NA PORTARIA PARA DANIELA SOARES",
          "neighborhood": "Jardim Novo Horizonte",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 3.9
        },
        "subtotal": 135,
        "deliveryFee": 5,
        "total": 140,
        "paymentMethod": "PIX",
        "notes": "Pix",
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-11-13T22:31:40.294Z",
        "items": [
          {
            "id": "4b385894-f85a-4f25-ae89-21c794480921",
            "productId": "b8b74a32-e910-47c9-851c-dacf18889d4d",
            "productName": "DINNER GALAXY 60K ",
            "productImage": "/storage/products/uru57jtn0ka-1788884734752.webp",
            "flavorId": "162264ba-0c82-4d40-83fe-f78424370a0d",
            "flavorName": "Morango cereja ",
            "quantity": 1,
            "priceAtPurchase": 135
          }
        ],
        "history": [
          {
            "id": "ec54f4ac-a86e-41d5-8e5f-aae07a971549",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-11-13T22:31:40.294Z"
          }
        ]
      }
    ]
  },
  {
    "id": "5664c0f6-02b4-4f8c-af5c-279db89bd6c4",
    "name": "Lucas Borba da Silva Pessoa",
    "phone": "(15) 99156-6870",
    "email": null,
    "createdAt": "2026-11-18T17:29:55.373Z",
    "addresses": [
      {
        "id": "860dd965-5fa2-44ac-a93c-62deda81fe40",
        "clientId": "5664c0f6-02b4-4f8c-af5c-279db89bd6c4",
        "cep": "18047-620",
        "street": "Avenida Antônio Carlos Comitre",
        "number": "1230",
        "complement": "Just intercambios",
        "neighborhood": "Parque Campolim",
        "city": "Sorocaba",
        "state": "SP",
        "distanceKm": 8.9
      }
    ],
    "orders": [
      {
        "id": "aaca5ae1-3d68-40d5-94f8-90008b6bbbf4",
        "number": 45,
        "clientId": "5664c0f6-02b4-4f8c-af5c-279db89bd6c4",
        "client": {
          "id": "5664c0f6-02b4-4f8c-af5c-279db89bd6c4",
          "name": "Lucas Borba da Silva Pessoa",
          "phone": "(15) 99156-6870",
          "email": null
        },
        "address": {
          "id": "860dd965-5fa2-44ac-a93c-62deda81fe40",
          "cep": "18047-620",
          "street": "Avenida Antônio Carlos Comitre",
          "number": "1230",
          "complement": "Just intercambios",
          "neighborhood": "Parque Campolim",
          "city": "Sorocaba",
          "state": "SP",
          "distanceKm": 8.9
        },
        "subtotal": 100,
        "deliveryFee": 10,
        "total": 110,
        "paymentMethod": "CARD_ON_DELIVERY",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-11-18T17:29:55.660Z",
        "items": [
          {
            "id": "aa033b88-3804-4d8d-9a07-d5509c6766e5",
            "productId": "660f90fd-3c42-423f-87a1-c164ab9483ef",
            "productName": "DOJO SPHERE X 40K-40 MIL PUFS ",
            "productImage": "/storage/products/v21gmo3iy2f-1785771810702.jpeg",
            "flavorId": "df5329b3-a96f-4cec-a984-3c2542d27b79",
            "flavorName": "Frozen laranja vermelha ",
            "quantity": 1,
            "priceAtPurchase": 100
          }
        ],
        "history": [
          {
            "id": "fce9485f-bcf9-4880-b5bb-390cc76b9f3a",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-11-18T17:29:55.660Z"
          }
        ]
      }
    ]
  },
  {
    "id": "869566e6-8215-4ce3-8764-b80fa834ca29",
    "name": "Matheus Da Silva Madureira",
    "phone": "15974074261",
    "email": null,
    "createdAt": "2026-11-19T16:40:15.772Z",
    "addresses": [
      {
        "id": "8765a368-10c5-492a-932a-f3e52032be09",
        "clientId": "869566e6-8215-4ce3-8764-b80fa834ca29",
        "cep": "18117236",
        "street": "Rua Domingos Arruda Ferraz",
        "number": "51",
        "complement": "Poiato recicla",
        "neighborhood": "Parque Jataí",
        "city": "Votorantim",
        "state": "SP",
        "distanceKm": 15.8
      }
    ],
    "orders": [
      {
        "id": "33367740-c7d7-437f-906d-2011c2d1ab6e",
        "number": 46,
        "clientId": "869566e6-8215-4ce3-8764-b80fa834ca29",
        "client": {
          "id": "869566e6-8215-4ce3-8764-b80fa834ca29",
          "name": "Matheus Da Silva Madureira",
          "phone": "15974074261",
          "email": null
        },
        "address": {
          "id": "8765a368-10c5-492a-932a-f3e52032be09",
          "cep": "18117236",
          "street": "Rua Domingos Arruda Ferraz",
          "number": "51",
          "complement": "Poiato recicla",
          "neighborhood": "Parque Jataí",
          "city": "Votorantim",
          "state": "SP",
          "distanceKm": 15.8
        },
        "subtotal": 95,
        "deliveryFee": 20,
        "total": 115,
        "paymentMethod": "PIX",
        "notes": null,
        "status": "NEW",
        "whatsappSent": true,
        "createdAt": "2026-11-19T16:40:15.960Z",
        "items": [
          {
            "id": "f22834ef-63cd-4af2-a200-25f85d15984b",
            "productId": "8a6c3d2e-be18-4c5d-a4cb-21fceacf9873",
            "productName": "OXBAR MAGIC 2.0 30K-30 MIL PUFS",
            "productImage": "/storage/products/bmpqbm7neav-1785336426555.webp",
            "flavorId": "6fab5609-400e-48b1-96e8-ade04a4221c4",
            "flavorName": "Melancia menta ",
            "quantity": 1,
            "priceAtPurchase": 95
          }
        ],
        "history": [
          {
            "id": "b8795046-0cee-4d6b-b5ff-bd7d1eb9c1cf",
            "status": "NEW",
            "notes": "Pedido realizado pelo cliente no site e aguardando aprovação",
            "changedBy": "Cliente",
            "createdAt": "2026-11-19T16:40:15.960Z"
          }
        ]
      }
    ]
  }
];

export const mockBanners: BannerData[] = [];

export const mockPromotions: PromotionData[] = [];
