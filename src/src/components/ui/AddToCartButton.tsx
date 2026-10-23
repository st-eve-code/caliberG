"use client";

import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import type { Product } from "@/lib/types";

export function AddToCartButton({
  product,
  className = "btn-primary w-full",
  showPrice = true,
}: {
  product: Product;
  className?: string;
  showPrice?: boolean;
}) {
  const { addItem } = useCart();
  const { format } = useCurrency();
  const price = product.priceMin ?? 0;
  const currency = product.currency ?? "USD";

  return (
    <button
      className={`btn ${className}`}
      onClick={() =>
        addItem({
          slug: product.slug,
          id: product.id,
          name: product.name,
          brand: product.brand,
          image: product.image,
          price,
          currency,
        })
      }
    >
      <span>Add To Cart</span>
      {showPrice && price > 0 && (
        <span className="opacity-80">· {format(price, currency)}</span>
      )}
    </button>
  );
}
