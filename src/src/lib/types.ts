export type Product = {
  id: string;
  slug: string;
  brand: string;
  name: string;
  title: string;
  price: string;
  priceMin: number | null;
  priceMax: number | null;
  compareAt: number | null;
  rating: number | null;
  image: string;
  badge: string | null;
  availability: string;
  url: string;
  source: string;
  category: CategoryKey;
  subcategory: string;
  kind: "firearm" | "accessory";
};

export type CategoryKey =
  | "rifles"
  | "handguns"
  | "shotguns"
  | "gun_parts"
  | "magazines"
  | "ammunition"
  | "optics"
  | "reloading"
  | "tools_cleaning"
  | "gear"
  | "suppressors";

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  href: string;
  children?: { name: string; href: string }[];
};

export type NavGroup = {
  label: string;
  href: string;
  image?: string;
  groups: { title: string; items: { name: string; href: string }[] }[];
};

export type Banner = {
  id: string;
  image: string;
  mobileImage?: string;
  kicker?: string;
  title: string;
  subtitle?: string;
  cta?: string;
  href: string;
  accent?: "light" | "dark";
};

export type Brand = { name: string; image: string; href: string };

export type CartItem = {
  slug: string;
  id: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  qty: number;
};
