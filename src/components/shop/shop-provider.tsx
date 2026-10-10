"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { findShopItem } from "@/lib/shop/skin-kits";

const CART_KEY = "freyja-bandeja-v1";
const ACCOUNT_KEY = "freyja-piel-v1";

export type CartLine = { id: string; qty: number };

export type SkinAccount = {
  name: string;
  email: string;
  skinId: string;
  purchases: { id: string; name: string; at: string }[];
};

type ShopContextValue = {
  ready: boolean;
  lines: CartLine[];
  count: number;
  account: SkinAccount | null;
  toast: { text: string; id: number } | null;
  cartOpen: boolean;
  addItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openAccount: (input: { name: string; email: string; skinId: string }) => void;
  closeAccount: () => void;
  saveCartToSkin: () => boolean;
};

const ShopContext = createContext<ShopContextValue | null>(null);

function readJson<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<CartLine[]>([]);
  const [account, setAccount] = useState<SkinAccount | null>(null);
  const [toast, setToast] = useState<{ text: string; id: number } | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const storedLines = readJson<CartLine[]>(CART_KEY);
    const storedAccount = readJson<SkinAccount>(ACCOUNT_KEY);
    if (Array.isArray(storedLines)) {
      setLines(storedLines.filter((line) => line.qty > 0 && findShopItem(line.id)));
    }
    if (storedAccount?.name && storedAccount.email) setAccount(storedAccount);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  }, [lines, ready]);

  useEffect(() => {
    if (!ready) return;
    if (account) localStorage.setItem(ACCOUNT_KEY, JSON.stringify(account));
    else localStorage.removeItem(ACCOUNT_KEY);
  }, [account, ready]);

  const addItem = useCallback((id: string) => {
    const item = findShopItem(id);
    if (!item) return;
    setLines((prev) => {
      const found = prev.find((line) => line.id === id);
      if (!found) return [...prev, { id, qty: 1 }];
      return prev.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line));
    });
    setToast({ text: item.name, id: Date.now() });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const setQty = useCallback((id: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((line) => line.id !== id);
      return prev.map((line) => (line.id === id ? { ...line, qty } : line));
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setCartOpen(true), []);
  const closeCart = useCallback(() => setCartOpen(false), []);

  const openAccount = useCallback((input: { name: string; email: string; skinId: string }) => {
    setAccount((prev) => ({
      name: input.name.trim(),
      email: input.email.trim(),
      skinId: input.skinId,
      purchases: prev?.purchases ?? [],
    }));
  }, []);

  const closeAccount = useCallback(() => setAccount(null), []);

  const saveCartToSkin = useCallback(() => {
    if (!account || lines.length === 0) return false;
    const at = new Date().toISOString();
    const purchases = lines.flatMap((line) => {
      const item = findShopItem(line.id);
      if (!item) return [];
      return [{ id: line.id, name: `${item.name} × ${line.qty}`, at }];
    });
    setAccount({ ...account, purchases: [...purchases, ...account.purchases] });
    setLines([]);
    return true;
  }, [account, lines]);

  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  const value = useMemo(
    () => ({
      ready,
      lines,
      count,
      account,
      toast,
      cartOpen,
      addItem,
      setQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      openAccount,
      closeAccount,
      saveCartToSkin,
    }),
    [ready, lines, count, account, toast, cartOpen, addItem, setQty, removeItem, clearCart, openCart, closeCart, openAccount, closeAccount, saveCartToSkin],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop debe usarse dentro de ShopProvider");
  return ctx;
}
