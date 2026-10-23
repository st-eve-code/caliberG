"use client";

import type { Product } from "@/lib/types";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function PriceInline({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const { format } = useCurrency();
  const from = product.currency ?? "USD";

  if (product.priceMin == null) {
    return <span className={className}>{product.price || "N/A"}</span>;
  }

  const range = product.priceMin !== product.priceMax && product.priceMax != null;

  return (
    <span className={className}>
      {range && product.priceMax != null
        ? `${format(product.priceMin, from)} - ${format(product.priceMax, from)}`
        : format(product.priceMin, from)}
    </span>
  );
}
