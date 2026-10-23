import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortBar } from "@/components/shop/SortBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Pagination, PAGE_SIZE } from "@/components/shop/Pagination";
import { getAllProducts } from "@/lib/data/products";
import { applyFilters, toFilters } from "@/lib/filter";

export const metadata: Metadata = {
  title: "Shop All Guns, Parts & Accessories",
  description: "Browse the full catalog of rifles, handguns, shotguns, gun parts, ammunition and optics.",
};

export default async function BrowsePage({
  searchParams,
}: PageProps<"/browse">) {
  const sp = await searchParams;
  const filters = toFilters(sp);

  const results = applyFilters(getAllProducts(), filters);

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(
    Math.max(1, Number.parseInt(filters.page ?? "1", 10) || 1),
    totalPages
  );
  const paged = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container-x py-6">
      <Breadcrumbs crumbs={[{ name: "Shop All" }]} />
      <div className="mt-4 grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 lg:sticky lg:top-32 lg:self-start">
            <FilterSidebar filters={filters} />
          </div>
        </div>
        <div>
          <details className="mb-4 overflow-hidden rounded-lg border border-zinc-200 bg-white lg:hidden">
            <summary className="flex cursor-pointer select-none items-center justify-between gap-3 p-4 text-sm font-bold text-brand-950">
              <span className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M7 12h10M10 18h4" />
                </svg>
                Filters
              </span>
              <span className="text-zinc-400">▾</span>
            </summary>
            <div className="border-t border-zinc-200 p-4">
              <FilterSidebar filters={filters} />
            </div>
          </details>
          <SortBar filters={filters} total={results.length} title="All Products" />
          <div className="mt-5">
            <ProductGrid products={paged} />
          </div>
          <Pagination
            page={page}
            total={results.length}
            filters={filters}
            basePath="/browse"
          />
        </div>
      </div>
    </div>
  );
}
