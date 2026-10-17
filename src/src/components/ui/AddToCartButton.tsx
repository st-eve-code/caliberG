"use client";

import { useCart } from "@/components/providers/CartProvider";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data/products";

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
  const price = product.priceMin ?? 0;

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
        })
      }
    >
      <span>Add To Cart</span>
      {showPrice && price > 0 && <span className="opacity-80">· {formatPrice(product)}</span>}
    </button>
  );
}
