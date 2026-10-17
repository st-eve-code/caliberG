import type { Banner, Brand } from "@/lib/types";

export const heroBanners: Banner[] = [
  {
    id: "bench-revival",
    image: "/assets/banners/hero-main.png",
    mobileImage: "/assets/banners/hero-main-mobile.png",
    kicker: "GET BACK TO THE BENCH.",
    title: "SMALL UPGRADES. MAJOR RESULTS.",
    subtitle: "EXCLUSIVE SAVINGS & OFFERS — ON THE GEAR THAT HELPS YOU BUILD BETTER!",
    cta: "Shop The Bench Revival Sale!",
    href: "/deals",
  },
  {
    id: "magpul-fs",
    image: "/assets/banners/side-magpul.png",
    kicker: "FREE SHIPPING",
    title: "On ALL Magpul",
    subtitle: "Use Code: MAGPULFS",
    cta: "Shop Magpul",
    href: "/category/gun_parts?type=magpul",
  },
  {
    id: "dd-optic",
    image: "/assets/banners/side-dd-optic.jpg",
    kicker: "20% OFF",
    title: "An Optic Of YOUR CHOICE",
    subtitle: "With Daniel Defense Upper Purchase",
    cta: "Get Your Combo!",
    href: "/category/rifles?type=semi",
  },
];

export const subBanners: Banner[] = [
  {
    id: "daily-deal",
    image: "/assets/banners/sub-fgmm.jpg",
    kicker: "DAILY DEAL",
    title: "FEDERAL GOLD MEDAL 308 175GR SMK 200-RD CASE",
    cta: "21% Today Only!",
    href: "/category/ammunition?type=rifle",
  },
  {
    id: "tools-sale",
    image: "/assets/banners/sub-tools.jpg",
    kicker: "BENCH FAVORITES",
    title: "BUILD BETTER WITH OUR BENCH FAVORITES",
    cta: "Up To 50% Off!",
    href: "/category/tools_cleaning",
  },
];

export const mediaRows = [
  {
    id: "brn4",
    image: "/assets/banners/media-brn4.jpg",
    title: "EXPLORE OUR BRN-4 LINEUP",
    cta: "See The Full Lineup",
    href: "/category/gun_parts?type=upper",
    textLight: true,
  },
  {
    id: "podcast",
    image: "/assets/banners/media-podcast.jpg",
    title: "THE PODCAST CELEBRATING THE TOOLS. THE PEOPLE. THE CRAFT.",
    cta: "Start Listening!",
    href: "/news",
    textLight: false,
  },
  {
    id: "brn180",
    image: "/assets/banners/media-brn180.jpg",
    title: "MEET OUR ALL-NEW BRN-180 GEN 3",
    cta: "See the Lineup",
    href: "/category/gun_parts?type=upper",
    textLight: true,
  },
];

export const brands: Brand[] = [
  { name: "Glock", image: "/assets/badges/sale.svg", href: "/browse?brand=glock" },
  { name: "Sig Sauer", image: "/assets/badges/sale.svg", href: "/browse?brand=sig" },
  { name: "Smith & Wesson", image: "/assets/badges/sale.svg", href: "/browse?brand=smith" },
  { name: "Daniel Defense", image: "/assets/badges/sale.svg", href: "/browse?brand=daniel" },
  { name: "Magpul", image: "/assets/badges/sale.svg", href: "/browse?brand=magpul" },
  { name: "Geissele", image: "/assets/badges/sale.svg", href: "/browse?brand=geissele" },
  { name: "Henry", image: "/assets/badges/sale.svg", href: "/browse?brand=henry" },
  { name: "CZ", image: "/assets/badges/sale.svg", href: "/browse?brand=cz" },
  { name: "Howa", image: "/assets/badges/sale.svg", href: "/browse?brand=howa" },
  { name: "Savage", image: "/assets/badges/sale.svg", href: "/browse?brand=savage" },
  { name: "Ruger", image: "/assets/badges/sale.svg", href: "/browse?brand=ruger" },
  { name: "Brownells", image: "/assets/badges/sale.svg", href: "/browse?brand=brownells" },
];
