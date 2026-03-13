"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Product } from "@/lib/api";

export interface CartItem {
  product_id: number;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  discount_percent: number;
  thumbnail: string | null;
  quantity: number;
  stock: number;
}

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  totalMRP: number;
  totalDiscount: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "fk_cart";

const normalizeCartItems = (raw: unknown): CartItem[] => {
  if (!Array.isArray(raw)) return [];

  const byId = new Map<number, CartItem>();

  for (const item of raw) {
    if (!item || typeof item !== "object") continue;

    const i = item as Partial<CartItem> & { product_id?: number | string };
    const productId = Number(i.product_id);
    const price = Number(i.price);
    const mrp = Number(i.mrp);
    const stock = Number(i.stock);
    const quantity = Number(i.quantity);

    if (!Number.isInteger(productId) || productId <= 0) continue;
    if (!Number.isFinite(price) || !Number.isFinite(mrp) || !Number.isFinite(stock)) continue;

    const safeQty = Number.isFinite(quantity) && quantity > 0 ? Math.min(Math.floor(quantity), Math.max(1, stock || 1)) : 1;

    const normalized: CartItem = {
      product_id: productId,
      name: typeof i.name === "string" ? i.name : "",
      brand: typeof i.brand === "string" ? i.brand : "",
      price,
      mrp,
      discount_percent: Number(i.discount_percent) || 0,
      thumbnail: typeof i.thumbnail === "string" ? i.thumbnail : null,
      quantity: safeQty,
      stock: Math.max(1, Math.floor(stock)),
    };

    const existing = byId.get(productId);
    if (existing) {
      const mergedQty = Math.min(existing.quantity + normalized.quantity, normalized.stock);
      byId.set(productId, { ...normalized, quantity: mergedQty });
    } else {
      byId.set(productId, normalized);
    }
  }

  return Array.from(byId.values());
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(normalizeCartItems(JSON.parse(raw)));
    } catch {}
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever cart changes
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => Number(i.product_id) === Number(product.id));
      if (existing) {
        return prev.map((i) =>
          Number(i.product_id) === Number(product.id)
            ? { ...i, quantity: Math.min(i.quantity + 1, product.stock) }
            : i
        );
      }
      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          brand: product.brand,
          price: Number(product.price),
          mrp: Number(product.mrp),
          discount_percent: product.discount_percent,
          thumbnail: product.thumbnail,
          quantity: 1,
          stock: product.stock,
        },
      ];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => prev.filter((i) => i.product_id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, qty: number) => {
    if (qty < 1) return;
    setItems((prev) =>
      prev.map((i) =>
        i.product_id === productId
          ? { ...i, quantity: Math.min(qty, i.stock) }
          : i
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalMRP = items.reduce((sum, i) => sum + i.mrp * i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const totalDiscount = totalMRP - totalPrice;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        totalMRP,
        totalDiscount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
