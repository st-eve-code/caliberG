import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { SortBar } from "@/components/shop/SortBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Pagination, PAGE_SIZE } from "@/components/shop/Pagination";
import { getAllProducts } from "@/lib/data/products";
import { applyFilters, toFilters } from "@/lib/filter";

export const metadata: Metadata = {
  title: "Search Results",
};

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const sp = await searchParams;
  const filters = toFilters(sp);

  const results = applyFilters(getAllProducts(), filters);
  const query = filters.q || "";

  const totalPages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(
    Math.max(1, Number.parseInt(filters.page ?? "1", 10) || 1),
    totalPages
  );
  const paged = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="container-x py-6">
      <Breadcrumbs crumbs={[{ name: "Search" }]} />
      <div className="mt-4">
        <SortBar
          filters={filters}
          total={results.length}
          title={query ? `Results for "${query}"` : "Search"}
          basePath="/search"
        />
        <div className="mt-5">
          <ProductGrid products={paged} />
        </div>
        <Pagination
          page={page}
          total={results.length}
          filters={filters}
          basePath="/search"
        />
      </div>
    </div>
  );
}
