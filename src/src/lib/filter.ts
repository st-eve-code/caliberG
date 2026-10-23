import type { Product } from "@/lib/types";
import { toUSD } from "@/lib/currency";

export type Filters = {
  q?: string;
  category?: string;
  brand?: string;
  type?: string;
  condition?: string;
  listing?: string;
  min?: string;
  max?: string;
  sort?: string;
  page?: string;
};

export const PRICE_RANGES = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $250", min: 100, max: 250 },
  { label: "$250 - $500", min: 250, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000+", min: 1000, max: 999999 },
];

export const SORTS = [
  { value: "relevance", label: "Most Relevant" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "new", label: "Newest" },
];

export function applyFilters(products: Product[], f: Filters): Product[] {
  let result = products;

  if (f.q) {
    const q = f.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.category.includes(q)
    );
  }

  if (f.category) {
    result = result.filter((p) => p.category === f.category);
  }

  if (f.brand) {
    const brand = f.brand.toLowerCase();
    result = result.filter((p) => p.brand.toLowerCase().includes(brand));
  }

  if (f.type) {
    const t = f.type.toLowerCase();
    result = result.filter((p) => {
      const hay = `${p.subcategory} ${p.name}`.toLowerCase();
      const map: Record<string, string[]> = {
        bolt: ["bolt", "action"],
        semi: ["semi-auto", "semi", "self-loading", "ar-", "carbine"],
        lever: ["lever"],
        pistol: ["pistol", "semi-auto", "auto", "1911"],
        revolver: ["revolver", "revolv"],
        pump: ["pump"],
        rifle: ["rifle", "stock", "barrel", "receiver", "trigger", "bolt", "upper", "lower", "handguard", "grip", "charging", "bcg"],
        handgun: ["pistol", "revolver", "magazine", "slide", "grip", "sights", "trigger", "holster"],
        shotgun: ["shotgun", "shell", "choke"],
        rimfire: ["rimfire", "22", "17 hmr"],
        die: ["die"],
        press: ["press"],
        component: ["primer", "bullet", "powder", "brass", "case"],
        scope: ["scope"],
        reddot: ["red dot", "reflex", "red-dot", "sight"],
        ring: ["ring", "mount"],
        case: ["case", "bag", "storage"],
        tactical: ["tactical", "plate", "chest", "rig", "pouch", "holster", "duty", "belt", "armor", "helmet", "carrier", "handcuff", "baton", "pepper", "knife", "light", "badge", "mask"],
        bipod: ["bipod", "monopod"],
        upper: ["upper"],
        lower: ["lower"],
        bcg: ["bolt carrier", "carrier"],
        charging: ["charging"],
        barrel: ["barrel"],
        stock: ["stock", "buffer"],
        grip: ["grip"],
        kit: ["kit"],
        handguard: ["handguard", "rail"],
        trigger: ["trigger"],
        magpul: ["magpul"],
        blackpowder: ["blackpowder", "black powder", "muzzle"],
        suppressor: ["suppressor", "silencer"],
      };
      const words = map[t];
      return words ? words.some((w) => hay.includes(w)) : p.subcategory.includes(t);
    });
  }

  if (f.condition) {
    const c = f.condition.toLowerCase();
    if (c === "new") result = result.filter((p) => /new/i.test(p.availability));
    if (c === "used") result = result.filter((p) => /used|pre-own/i.test(p.availability));
    if (c === "collectible") result = result.filter((p) => /limited|anniv/i.test(p.name));
  }

  if (f.listing === "auction") {
    result = result.filter((p) => p.kind === "firearm");
  }
  if (f.listing === "buynow") {
    result = result.filter((p) => p.priceMin != null);
  }

  if (f.min || f.max) {
    const min = f.min ? parseFloat(f.min) : 0;
    const max = f.max ? parseFloat(f.max) : Infinity;
    result = result.filter((p) => {
      const price = toUSD(p.priceMin ?? 0, p.currency ?? "USD");
      return price >= min && price <= max;
    });
  }

  switch (f.sort) {
    case "price-asc":
      result = [...result].sort(
        (a, b) =>
          toUSD(a.priceMin ?? 0, a.currency ?? "USD") -
          toUSD(b.priceMin ?? 0, b.currency ?? "USD")
      );
      break;
    case "price-desc":
      result = [...result].sort(
        (a, b) =>
          toUSD(b.priceMin ?? 0, b.currency ?? "USD") -
          toUSD(a.priceMin ?? 0, a.currency ?? "USD")
      );
      break;
    case "rating":
      result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "new":
      result = [...result].reverse();
      break;
    default:
      break;
  }

  return result;
}

export function toFilters(sp: Record<string, string | string[] | undefined>): Filters {
  const str = (v: string | string[] | undefined) =>
    typeof v === "string" ? v : undefined;
  return {
    q: str(sp.q),
    category: str(sp.category),
    brand: str(sp.brand),
    type: str(sp.type),
    condition: str(sp.condition),
    listing: str(sp.listing),
    min: str(sp.min),
    max: str(sp.max),
    sort: str(sp.sort),
    page: str(sp.page),
  };
}

export function buildQueryString(params: Record<string, string | undefined>): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v) sp.set(k, v);
  }
  const s = sp.toString();
  return s ? `?${s}` : "";
}
