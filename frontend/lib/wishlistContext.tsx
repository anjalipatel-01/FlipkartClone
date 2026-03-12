"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getWishlist, addToWishlist as apiAdd, removeFromWishlist as apiRemove, type WishlistItem } from "@/lib/api";
import { useAuth } from "@/lib/authContext";

interface WishlistContextValue {
  items: WishlistItem[];
  loading: boolean;
  isInWishlist: (productId: number) => boolean;
  toggle: (productId: number) => Promise<void>;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch wishlist when user logs in / changes
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    setLoading(true);
    getWishlist()
      .then((res) => setItems(res.data.data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [user]);

  const isInWishlist = useCallback(
    (productId: number) => items.some((i) => i.product_id === productId),
    [items]
  );

  const toggle = useCallback(
    async (productId: number) => {
      if (!user) return;
      const exists = items.some((i) => i.product_id === productId);
      if (exists) {
        // Optimistic remove
        setItems((prev) => prev.filter((i) => i.product_id !== productId));
        try {
          await apiRemove(productId);
        } catch {
          // Re-fetch on failure
          const res = await getWishlist();
          setItems(res.data.data);
        }
      } else {
        try {
          const res = await apiAdd(productId);
          setItems(res.data.data);
        } catch {
          // ignore
        }
      }
    },
    [user, items]
  );

  return (
    <WishlistContext.Provider value={{ items, loading, isInWishlist, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
