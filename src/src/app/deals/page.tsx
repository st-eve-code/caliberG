import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { getDeals } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Deals & Clearance",
  description: "Save big on guns, parts, ammunition and gear. Daily deals, clearance and exclusive offers.",
};

export default function DealsPage() {
  const deals = getDeals(48);
  return (
    <div className="container-x py-6">
      <Breadcrumbs crumbs={[{ name: "Deals" }]} />
      <div className="mt-4 rounded-lg bg-brand-950 p-8 text-white">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-gold-400">
          Today Only
        </p>
        <h1 className="mt-1 text-3xl font-black sm:text-4xl">
          Deals & Clearance
        </h1>
        <p className="mt-2 max-w-lg text-sm text-zinc-300">
          Up to 50% off select firearms, parts and gear. Prices drop daily —
          grab your next build before it&apos;s gone.
        </p>
      </div>
      <div className="mt-6">
        <ProductGrid products={deals} />
      </div>
    </div>
  );
}
