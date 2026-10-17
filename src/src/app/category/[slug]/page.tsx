import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { FilterSidebar } from "@/components/shop/FilterSidebar";
import { SortBar } from "@/components/shop/SortBar";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { categoryBySlug } from "@/lib/data/categories";
import {
  getProductsByCategory,
  getProductsByBrand,
} from "@/lib/data/products";
import { applyFilters, toFilters } from "@/lib/filter";

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const cat = categoryBySlug(slug);
  return {
    title: cat ? `${cat.name} For Sale Online` : "Category",
    description: cat?.description,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const sp = await searchParams;

  const cat = categoryBySlug(slug);
  if (!cat && slug !== "firearms") notFound();

  const filters = toFilters(sp);

  let base = [];
  if (slug === "firearms") {
    base = [
      ...getProductsByCategory("rifles"),
      ...getProductsByCategory("handguns"),
      ...getProductsByCategory("shotguns"),
      ...getProductsByCategory("suppressors"),
    ];
  } else if (slug === "magazines") {
    base = [...getProductsByCategory("magazines")];
  } else {
    base = getProductsByCategory(slug);
  }

  if (filters.brand && slug === "firearms") {
    base = getProductsByBrand(filters.brand).filter(
      (p) => p.kind === "firearm"
    );
  }

  const results = applyFilters(base, filters);
  const title = cat?.name ?? "Firearms";

  return (
    <div className="container-x py-6">
      <Breadcrumbs crumbs={[{ name: "Shop", href: "/browse" }, { name: title }]} />
      <div className="mt-4 grid gap-8 lg:grid-cols-[240px_1fr]">
        <div className="hidden lg:block">
          <div className="rounded-lg border border-zinc-200 bg-white p-5 lg:sticky lg:top-32 lg:self-start">
            <FilterSidebar filters={{ ...filters, category: slug !== "firearms" ? slug : undefined }} />
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
              <FilterSidebar filters={{ ...filters, category: slug !== "firearms" ? slug : undefined }} />
            </div>
          </details>
          <SortBar
            filters={filters}
            total={results.length}
            title={title}
            description={cat?.description}
            basePath={`/category/${slug}`}
          />
          <div className="mt-5">
            <ProductGrid products={results} />
          </div>
        </div>
      </div>
    </div>
  );
}
