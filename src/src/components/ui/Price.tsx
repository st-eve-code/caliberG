import type { Product } from "@/lib/types";

export function Price({
  product,
  size = "md",
}: {
  product: Product;
  size?: "sm" | "md" | "lg";
}) {
  const base = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  if (product.priceMin == null) {
    return <span className={`${base} font-semibold text-zinc-700`}>{product.price}</span>;
  }

  const range =
    product.priceMin !== product.priceMax && product.priceMax != null;

  return (
    <div className="flex flex-wrap items-baseline gap-x-2">
      <span className={`${base} font-bold text-brand-950`}>
        {range && product.priceMax != null
          ? `$${product.priceMin.toFixed(2)} - $${product.priceMax.toFixed(2)}`
          : `$${product.priceMin.toFixed(2)}`}
      </span>
      {product.compareAt && product.compareAt > (product.priceMin ?? 0) && (
        <span className={`${size === "sm" ? "text-xs" : "text-sm"} text-zinc-400 line-through`}>
          ${product.compareAt.toFixed(2)}
        </span>
      )}
    </div>
  );
}
