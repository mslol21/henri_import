import { z } from 'zod';

export const checkoutSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório e deve ter no mínimo 2 caracteres'),
  phone: z.string().min(10, 'Informe um telefone válido com DDD'),
  cep: z.string().min(8, 'CEP inválido'),
  street: z.string().min(2, 'Rua/Logradouro é obrigatório'),
  number: z.string().min(1, 'Número do imóvel é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().min(2, 'Estado (UF) é obrigatório'),
  paymentMethod: z.enum(['PIX', 'CASH', 'CARD_ON_DELIVERY']),
  notes: z.string().optional(),
  coupon: z.string().optional(),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const productSchema = z.object({
  name: z.string().min(2, 'Nome do produto é obrigatório'),
  brand: z.string().min(1, 'Marca é obrigatória'),
  categoryId: z.string().min(1, 'Categoria é obrigatória'),
  description: z.string().min(5, 'Descrição é obrigatória'),
  basePrice: z.number().positive('O preço deve ser maior que zero'),
  basePromoPrice: z.number().optional().nullable(),
  hasFlavors: z.boolean().default(false),
  baseStock: z.number().int().nonnegative('Estoque deve ser maior ou igual a zero'),
  baseSku: z.string().min(2, 'SKU é obrigatório'),
  internalCode: z.string().optional().nullable(),
  mainImageUrl: z.string().url('URL da imagem inválida'),
  gallery: z.array(z.string()).default([]),
  weight: z.number().default(0.2),
  active: z.boolean().default(true),
});

export type ProductFormData = z.infer<typeof productSchema>;

export const flavorSchema = z.object({
  name: z.string().min(1, 'Nome do sabor é obrigatório'),
  imageUrl: z.string().optional().nullable(),
  price: z.number().optional().nullable(),
  stock: z.number().int().nonnegative().default(0),
  sku: z.string().min(1, 'SKU do sabor é obrigatório'),
  description: z.string().optional().nullable(),
  displayOrder: z.number().int().default(0),
  active: z.boolean().default(true),
});

export type FlavorFormData = z.infer<typeof flavorSchema>;

export const storeConfigSchema = z.object({
  name: z.string().min(2, 'Nome da loja é obrigatório'),
  whatsapp: z.string().min(8, 'WhatsApp é obrigatório'),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
  address: z.string().min(5, 'Endereço é obrigatório'),
  latitude: z.number(),
  longitude: z.number(),
  cep: z.string().min(8, 'CEP é obrigatório'),
  businessHours: z.string().min(3, 'Horário de funcionamento é obrigatório'),
  deliveryMode: z.enum(['FAIXAS', 'KM']),
  deliveryKmRate: z.number().positive('Taxa por KM deve ser maior que zero'),
  deliveryRanges: z.array(
    z.object({
      maxKm: z.number(),
      price: z.number(),
    })
  ),
  primaryColor: z.string().min(4),
  secondaryColor: z.string().min(4),
  textColor: z.string().min(4),
  pixKey: z.string().optional(),
  pixName: z.string().optional(),
});

export type StoreConfigFormData = z.infer<typeof storeConfigSchema>;
