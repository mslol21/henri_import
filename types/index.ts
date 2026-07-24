export interface StoreConfigData {
  id: string;
  name: string;
  logoUrl?: string | null;
  bannerUrl?: string | null;
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  whatsapp: string;
  instagram?: string | null;
  facebook?: string | null;
  address: string;
  latitude: number;
  longitude: number;
  cep: string;
  businessHours: string;
  deliveryMode: 'FAIXAS' | 'KM';
  deliveryKmRate: number;
  deliveryRanges: { maxKm: number; price: number }[];
  pixKey?: string | null;
  pixName?: string | null;
  whatsappTemplate: string;
  wholesalePassword?: string | null;
}

export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  icon: string;
  imageUrl?: string | null;
  color: string;
  displayOrder: number;
  active: boolean;
  productCount?: number;
}

export interface FlavorData {
  id: string;
  productId: string;
  name: string;
  imageUrl?: string | null;
  price?: number | null;
  wholesalePrice?: number | null;
  stock: number;
  sku: string;
  description?: string | null;
  displayOrder: number;
  active: boolean;
}

export interface ProductData {
  id: string;
  name: string;
  slug: string;
  brand: string;
  categoryId: string;
  category?: CategoryData;
  description: string;
  basePrice: number;
  basePromoPrice?: number | null;
  wholesalePrice?: number | null;
  minWholesaleQty?: number | null;
  hasFlavors: boolean;
  baseStock: number;
  baseSku: string;
  internalCode?: string | null;
  mainImageUrl: string;
  gallery: string[];
  weight: number;
  active: boolean;
  flavors?: FlavorData[];
}

export interface CartItem {
  id: string; // Unique combination key (productId + flavorId)
  product: ProductData;
  selectedFlavor?: FlavorData | null;
  quantity: number;
  unitPrice: number;
  notes?: string;
  minQty?: number;
}

export interface PromotionData {
  id: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  startDate?: Date | string | null;
  endDate?: Date | string | null;
  buttonText?: string | null;
  buttonLink?: string | null;
  active: boolean;
}

export interface BannerData {
  id: string;
  title: string;
  description?: string | null;
  imageUrl: string;
  link?: string | null;
  active: boolean;
  displayOrder: number;
}

export type OrderStatusType = 'NEW' | 'CONFIRMED' | 'PREPARING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

export interface OrderData {
  id: string;
  number: number;
  clientId: string;
  client: {
    id: string;
    name: string;
    phone: string;
    email?: string | null;
  };
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string | null;
    neighborhood: string;
    city: string;
    state: string;
    distanceKm?: number | null;
  };
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'PIX' | 'CASH' | 'CARD_ON_DELIVERY';
  notes?: string | null;
  status: OrderStatusType;
  whatsappSent: boolean;
  createdAt: string | Date;
  items: {
    id: string;
    product: ProductData;
    flavor?: FlavorData | null;
    quantity: number;
    priceAtPurchase: number;
  }[];
  history?: {
    id: string;
    status: OrderStatusType;
    notes?: string | null;
    changedBy: string;
    createdAt: string | Date;
  }[];
}
