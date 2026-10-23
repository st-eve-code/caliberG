export type CurrencyCode = "USD" | "EUR" | "GBP";

export type CurrencyMeta = {
  code: CurrencyCode;
  symbol: string;
  label: string;
  name: string;
};

export const CURRENCIES: CurrencyMeta[] = [
  { code: "USD", symbol: "$", label: "USD", name: "US Dollar" },
  { code: "EUR", symbol: "€", label: "EUR", name: "Euro" },
  { code: "GBP", symbol: "£", label: "GBP", name: "British Pound" },
];

/** Value of 1 USD expressed in each currency. */
export const USD_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
};

export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export function isCurrencyCode(value: string | undefined | null): value is CurrencyCode {
  return value === "USD" || value === "EUR" || value === "GBP";
}

export function currencyMeta(code: CurrencyCode): CurrencyMeta {
  return CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
}

/** Convert an amount between two currencies using the static rate table. */
export function convertAmount(
  amount: number,
  from: CurrencyCode = "USD",
  to: CurrencyCode = "USD"
): number {
  if (!Number.isFinite(amount)) return 0;
  if (from === to) return amount;
  return (amount / USD_RATES[from]) * USD_RATES[to];
}

/** Convert any amount into USD — the reference currency used for filtering and sorting. */
export function toUSD(amount: number, from: CurrencyCode = "USD"): number {
  return convertAmount(amount, from, "USD");
}

export function formatAmount(
  amount: number,
  from: CurrencyCode = "USD",
  to: CurrencyCode = "USD",
  fractionDigits = 2
): string {
  const value = convertAmount(amount, from, to);
  const symbol = currencyMeta(to).symbol;
  return `${symbol}${value.toFixed(fractionDigits)}`;
}

/** Convert a product's native price into the requested display currency. */
export function convertPrice(
  amount: number | null | undefined,
  from: CurrencyCode = "USD",
  to: CurrencyCode = "USD"
): number {
  if (amount == null) return 0;
  return convertAmount(amount, from, to);
}
