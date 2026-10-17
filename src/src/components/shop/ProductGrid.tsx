import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/ProductCard";

export function ProductGrid({ products }: { products: Product[] }) {
  if (!products.length) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-300 p-16 text-center">
        <p className="text-lg font-semibold text-zinc-600">No products found</p>
        <p className="mt-1 text-sm text-zinc-400">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
