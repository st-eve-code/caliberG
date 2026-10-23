import Link from "next/link";
import { categories } from "@/lib/data/categories";
import { getBrands, getAllProducts, countForCategory } from "@/lib/data/products";
import { PRICE_RANGES, buildQueryString } from "@/lib/filter";
import type { Filters } from "@/lib/filter";

export function FilterSidebar({ filters }: { filters: Filters }) {
  const brands = getBrands();
  const all = getAllProducts();

  const toggle = (key: keyof Filters, value?: string) => {
    const next: Record<string, string | undefined> = { ...filters };
    if (value && next[key] !== value) next[key] = value;
    else delete next[key];
    delete next.page;
    return buildQueryString(next);
  };

  const isActive = (key: keyof Filters, value: string) => filters[key] === value;

  return (
    <aside className="space-y-6">
      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-brand-950">
          Category
        </h3>
        <ul className="space-y-1.5 text-sm">
          <li>
            <Link
              href="/browse"
              className={!filters.category ? "font-semibold text-brand-800" : "text-zinc-600 hover:text-brand-800"}
            >
              All Products <span className="text-zinc-400">({all.length})</span>
            </Link>
          </li>
          {categories
            .filter((c) => c.slug !== "firearms")
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={toggle("category", c.slug)}
                  className={
                    isActive("category", c.slug)
                      ? "font-semibold text-brand-800"
                      : "text-zinc-600 hover:text-brand-800"
                  }
                >
                  {c.name}{" "}
                  <span className="text-zinc-400">({countForCategory(c.slug)})</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-brand-950">
          Brand
        </h3>
        <ul className="max-h-72 space-y-1.5 overflow-y-auto text-sm">
          <li>
            <Link
              href={toggle("brand")}
              className={!filters.brand ? "font-semibold text-brand-800" : "text-zinc-600 hover:text-brand-800"}
            >
              All Brands
            </Link>
          </li>
          {brands.slice(0, 40).map((b) => (
            <li key={b}>
              <Link
                href={toggle("brand", b)}
                className={
                  isActive("brand", b)
                    ? "font-semibold text-brand-800"
                    : "text-zinc-600 hover:text-brand-800"
                }
              >
                {b}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-brand-950">
          Price
        </h3>
        <ul className="space-y-1.5 text-sm">
          {PRICE_RANGES.map((r) => {
            const active =
              filters.min === String(r.min) && filters.max === String(r.max);
            return (
              <li key={r.label}>
                <Link
                  href={
                    active
                      ? toggle("min")
                      : buildQueryString({
                          ...filters,
                          min: String(r.min),
                          max: r.max === 999999 ? "999999" : String(r.max),
                          page: undefined,
                        })
                  }
                  className={active ? "font-semibold text-brand-800" : "text-zinc-600 hover:text-brand-800"}
                >
                  {r.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-brand-950">
          Condition
        </h3>
        <ul className="space-y-1.5 text-sm">
          {["New", "Used", "Collectible"].map((c) => (
            <li key={c}>
              <Link
                href={toggle("condition", c)}
                className={
                  isActive("condition", c)
                    ? "font-semibold text-brand-800"
                    : "text-zinc-600 hover:text-brand-800"
                }
              >
                {c}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-brand-950">
          Listing Type
        </h3>
        <ul className="space-y-1.5 text-sm">
          {[
            { value: "auction", label: "Auctions" },
            { value: "buynow", label: "Buy Now" },
          ].map((c) => (
            <li key={c.value}>
              <Link
                href={toggle("listing", c.value)}
                className={
                  isActive("listing", c.value)
                    ? "font-semibold text-brand-800"
                    : "text-zinc-600 hover:text-brand-800"
                }
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
