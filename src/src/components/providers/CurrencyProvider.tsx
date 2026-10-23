"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  DEFAULT_CURRENCY,
  convertAmount,
  convertPrice,
  formatAmount,
  isCurrencyCode,
  type CurrencyCode,
} from "@/lib/currency";

const STORAGE_KEY = "guns_currency";

let currency: CurrencyCode = DEFAULT_CURRENCY;
let loaded = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): CurrencyCode {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (isCurrencyCode(raw)) currency = raw;
    } catch {
      // storage unavailable — stay on the default currency
    }
  }
  return currency;
}

function getServerSnapshot(): CurrencyCode {
  return DEFAULT_CURRENCY;
}

function setCurrency(next: CurrencyCode) {
  if (next === currency) return;
  currency = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // storage unavailable — selection stays in memory for this session
  }
  listeners.forEach((l) => l());
}

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  convert: (
    amount: number,
    from?: CurrencyCode,
    to?: CurrencyCode
  ) => number;
  convertPrice: (
    amount: number | null | undefined,
    from?: CurrencyCode
  ) => number;
  format: (
    amount: number,
    from?: CurrencyCode,
    fractionDigits?: number
  ) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const current = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency: current,
      setCurrency,
      convert: (amount, from = "USD", to = current) =>
        convertAmount(amount, from, to),
      convertPrice: (amount, from = "USD") => convertPrice(amount, from, current),
      format: (amount, from = "USD", fractionDigits = 2) =>
        formatAmount(amount, from, current, fractionDigits),
    }),
    [current]
  );

  return (
    <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx)
    throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
