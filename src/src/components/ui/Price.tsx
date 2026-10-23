"use client";

import type { Product } from "@/lib/types";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function Price({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  const { currency, format } = useCurrency();
  const base =
    size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";

  if (product.priceMin == null) {
    return (
      <span className={`${base} font-semibold text-zinc-700`}>{product.price}</span>
    );
  }

  const from = product.currency ?? "USD";
  const range = product.priceMin !== product.priceMax && product.priceMax != null;

  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className={`${base} font-bold text-brand-950`}>
        {range && product.priceMax != null
          ? `${format(product.priceMin, from)} - ${format(product.priceMax, from)}`
          : format(product.priceMin, from)}
      </span>
      {product.compareAt && product.compareAt > (product.priceMin ?? 0) && (
        <span
          className={`${size === "sm" ? "text-xs" : "text-sm"} text-zinc-400 line-through`}
        >
          {format(product.compareAt, from)}
        </span>
      )}
      <span className="sr-only" aria-live="polite">
        {currency}
      </span>
    </div>
  );
}
