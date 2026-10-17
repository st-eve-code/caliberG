"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

const CART_STORAGE_KEY = "guns_cart";
const EMPTY_CART: CartItem[] = [];

function readStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

let cartItems: CartItem[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CartItem[] {
  if (!loaded && typeof window !== "undefined") {
    cartItems = readStorage();
    loaded = true;
  }
  return cartItems;
}

function emit() {
  listeners.forEach((l) => l());
}

function updateCart(updater: (prev: CartItem[]) => CartItem[]) {
  cartItems = updater(cartItems);
  try {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch {
    // storage unavailable (private mode, quota) — cart stays in memory
  }
  emit();
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_CART);

  const addItem = (item: Omit<CartItem, "qty">) => {
    updateCart((prev) => {
      const existing = prev.find((i) => i.slug === item.slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === item.slug ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setOpen(true);
  };

  const removeItem = (slug: string) =>
    updateCart((prev) => prev.filter((i) => i.slug !== slug));

  const updateQty = (slug: string, qty: number) =>
    updateCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i))
    );

  const clear = () => updateCart(() => []);

  const { count, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, i) => {
        acc.count += i.qty;
        acc.subtotal += i.price * i.qty;
        return acc;
      },
      { count: 0, subtotal: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      addItem,
      removeItem,
      updateQty,
      clear,
      isOpen,
      setOpen,
    }),
    [items, count, subtotal, isOpen]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
