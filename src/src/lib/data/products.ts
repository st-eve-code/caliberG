import type { Product, CategoryKey } from "@/lib/types";
import type { CurrencyCode } from "@/lib/currency";
import { formatAmount } from "@/lib/currency";
import raw from "./products.json";

type RawProduct = Product & { category: string };

const products = (raw as { products: RawProduct[] }).products.map((p) => ({
  ...p,
  currency: (p.currency ?? "USD") as CurrencyCode,
}));

const byCategory = new Map<string, Product[]>();
const bySlug = new Map<string, Product>();
for (const p of products) {
  const list = byCategory.get(p.category);
  if (list) list.push(p);
  else byCategory.set(p.category, [p]);
  if (!bySlug.has(p.slug)) bySlug.set(p.slug, p);
}

export const getAllProducts = (): Product[] => products;

export const getProductsByCategory = (category: string): Product[] =>
  byCategory.get(category) ?? [];

export const countForCategory = (category: string): number =>
  getProductsByCategory(category).length;

export const getProductBySlug = (slug: string): Product | undefined =>
  bySlug.get(slug);

export const getFeatured = (n = 12): Product[] =>
  products.filter((p) => p.kind === "firearm").slice(0, n);

export const getTopSellers = (n = 12): Product[] =>
  [...products]
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, n);

export const getDeals = (n = 12): Product[] => {
  const withDiscount = products.filter((p) => p.compareAt && p.compareAt > (p.priceMin ?? 0));
  if (withDiscount.length) return withDiscount.slice(0, n);
  return [...products].sort((a, b) => (a.priceMin ?? 0) - (b.priceMin ?? 0)).slice(0, n);
};

export const getNewArrivals = (n = 12): Product[] =>
  products.filter((p) => p.availability.toLowerCase().includes("new")).slice(0, n).length
    ? products.filter((p) => p.availability.toLowerCase().includes("new")).slice(0, n)
    : products.slice(-n).reverse();

export const getRelated = (product: Product, n = 6): Product[] =>
  (byCategory.get(product.category) ?? [])
    .filter((p) => p.id !== product.id)
    .slice(0, n);

export const getBrands = (): string[] =>
  [...new Set(products.map((p) => p.brand))].sort();

export const getProductsByBrand = (brand: string): Product[] =>
  products.filter((p) => p.brand.toLowerCase().includes(brand.toLowerCase()));

export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.title.toLowerCase().includes(q)
  );
};

export const formatPrice = (product: Product): string => {
  const currency = product.currency ?? "USD";
  if (product.priceMin == null) return product.price || "N/A";
  if (product.priceMin !== product.priceMax && product.priceMax != null) {
    return `${formatAmount(product.priceMin, currency, currency)} - ${formatAmount(
      product.priceMax,
      currency,
      currency
    )}`;
  }
  return formatAmount(product.priceMin, currency, currency);
};

export const categoryLabel = (key: CategoryKey): string => {
  const map: Record<string, string> = {
    rifles: "Rifles",
    handguns: "Handguns",
    shotguns: "Shotguns",
    ar15: "AR-15",
    glock: "Glock",
    blackpowder: "Blackpowder",
    airguns: "Airguns & Airsoft",
    gun_parts: "Gun Parts",
    magazines: "Magazines",
    ammunition: "Ammunition",
    optics: "Optics",
    reloading: "Reloading",
    tools_cleaning: "Tools & Cleaning",
    gear: "Gear",
    suppressors: "Suppressors",
  };
  return map[key] ?? key;
};
