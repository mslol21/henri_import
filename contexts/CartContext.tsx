'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, ProductData, FlavorData } from '@/types';

interface CartContextType {
  items: CartItem[];
  addToCart: (
    product: ProductData,
    flavor?: FlavorData | null,
    quantity?: number,
    notes?: string,
    overrideUnitPrice?: number,
    minQty?: number,
    isWholesaleItem?: boolean
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  discount: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  freeShippingGranted: boolean;
  total: number;
  itemCount: number;
  hasWholesaleItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'henri_imports_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [freeShippingGranted, setFreeShippingGranted] = useState<boolean>(false);

  // Helper to check if wholesale mode is active
  const checkIsWholesaleActive = (): boolean => {
    if (typeof window === 'undefined') return false;
    return (
      document.cookie.includes('wholesale_auth=true') ||
      window.location.search.includes('atacado=true') ||
      window.location.pathname.includes('/atacado')
    );
  };

  // Helper: Sanitize & validate prices for retail vs wholesale
  const sanitizeCartItems = (cartItems: CartItem[]): CartItem[] => {
    const isWholesaleSession = checkIsWholesaleActive();

    return cartItems.map((item) => {
      const retailPrice = item.selectedFlavor?.price && item.selectedFlavor.price > 0
        ? item.selectedFlavor.price
        : item.product.basePromoPrice && item.product.basePromoPrice > 0
        ? item.product.basePromoPrice
        : item.product.basePrice;

      const wholesalePrice = item.selectedFlavor?.wholesalePrice && item.selectedFlavor.wholesalePrice > 0
        ? item.selectedFlavor.wholesalePrice
        : item.product.wholesalePrice && item.product.wholesalePrice > 0
        ? item.product.wholesalePrice
        : retailPrice;

      // If user is NOT in an authenticated wholesale session, ALWAYS force retail price
      if (!isWholesaleSession || !item.isWholesale) {
        return {
          ...item,
          unitPrice: retailPrice,
          isWholesale: false,
        };
      }

      return {
        ...item,
        unitPrice: wholesalePrice,
        isWholesale: true,
      };
    });
  };

  // Load cart from localStorage on mount & sanitize prices
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const sanitized = sanitizeCartItems(parsed);
          setItems(sanitized);
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
  }, []);

  // Save cart to localStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const addToCart = (
    product: ProductData,
    flavor: FlavorData | null = null,
    quantity = 1,
    notes = '',
    overrideUnitPrice?: number,
    minQty: number = 1,
    isWholesaleItem = false
  ) => {
    const isWholesaleSession = checkIsWholesaleActive() && isWholesaleItem;

    const retailPrice = flavor?.price && flavor.price > 0
      ? flavor.price
      : product.basePromoPrice && product.basePromoPrice > 0
      ? product.basePromoPrice
      : product.basePrice;

    const wholesalePrice = flavor?.wholesalePrice && flavor.wholesalePrice > 0
      ? flavor.wholesalePrice
      : product.wholesalePrice && product.wholesalePrice > 0
      ? product.wholesalePrice
      : retailPrice;

    const unitPrice = isWholesaleSession
      ? (overrideUnitPrice ?? wholesalePrice)
      : retailPrice;

    const cartItemId = flavor ? `${product.id}-${flavor.id}` : product.id;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === cartItemId);

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        const maxStock = flavor ? flavor.stock : product.baseStock;

        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, maxStock > 0 ? maxStock : 999),
          unitPrice,
          isWholesale: isWholesaleSession,
          notes: notes || updated[existingIndex].notes,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          id: cartItemId,
          product,
          selectedFlavor: flavor,
          quantity,
          unitPrice,
          isWholesale: isWholesaleSession,
          notes,
          minQty,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === cartItemId) {
          if (quantity < 1) {
            return item;
          }

          const maxStock = item.selectedFlavor ? item.selectedFlavor.stock : item.product.baseStock;
          return {
            ...item,
            quantity: Math.min(quantity, maxStock > 0 ? maxStock : 999),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setFreeShippingGranted(false);
  };

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const hasWholesaleItems = items.some((item) => item.isWholesale);

  const applyCoupon = async (code: string) => {
    const clean = code.trim().toUpperCase();
    if (!clean) return { success: false, message: 'Digite o código do cupom.' };

    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: clean, subtotal }),
      });

      const data = await res.json();
      if (!res.ok) {
        return { success: false, message: data.error || 'Cupom inválido ou inativo.' };
      }

      setAppliedCoupon(data.code);
      setCouponDiscount(data.calculatedDiscount || 0);
      setFreeShippingGranted(Boolean(data.freeShipping));
      return { success: true, message: data.message };
    } catch {
      if (clean === 'HENRI10' || clean === 'VAPE10') {
        setAppliedCoupon(clean);
        setCouponDiscount(subtotal * 0.1);
        return { success: true, message: 'Cupom de 10% aplicado!' };
      }
      return { success: false, message: 'Erro ao validar cupom.' };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    setFreeShippingGranted(false);
  };

  const discount = Math.min(subtotal, couponDiscount);
  const total = Math.max(0, subtotal - discount);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        freeShippingGranted,
        total,
        itemCount,
        hasWholesaleItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
