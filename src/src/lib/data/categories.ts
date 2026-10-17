import type { Category, NavGroup } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "firearms",
    name: "Firearms",
    shortName: "Guns",
    description:
      "New and used rifles, handguns and shotguns from every major manufacturer. Buy instantly or bid auction-style.",
    image: "/assets/categories/firearms.jpg",
    href: "/browse",
    children: [
      { name: "Rifles", href: "/category/rifles" },
      { name: "Handguns", href: "/category/handguns" },
      { name: "Shotguns", href: "/category/shotguns" },
    ],
  },
  {
    slug: "suppressors",
    name: "Suppressors",
    shortName: "Suppressors",
    description: "Rifle, pistol, rimfire and shotgun suppressors with mounts and accessories.",
    image: "/assets/categories/firearms.jpg",
    href: "/category/suppressors",
  },
  {
    slug: "rifles",
    name: "Rifles",
    shortName: "Rifles",
    description: "Bolt-action, semi-auto and lever-action rifles for hunting, competition and home defense.",
    image: "/assets/categories/firearms.jpg",
    href: "/category/rifles",
    children: [
      { name: "Bolt Action", href: "/category/rifles?type=bolt" },
      { name: "Semi-Auto", href: "/category/rifles?type=semi" },
      { name: "Lever Action", href: "/category/rifles?type=lever" },
    ],
  },
  {
    slug: "handguns",
    name: "Handguns",
    shortName: "Handguns",
    description: "Semi-auto pistols and revolvers for concealed carry, duty and range use.",
    image: "/assets/categories/handgun-parts.jpg",
    href: "/category/handguns",
    children: [
      { name: "Semi-Auto Pistols", href: "/category/handguns?type=pistol" },
      { name: "Revolvers", href: "/category/handguns?type=revolver" },
    ],
  },
  {
    slug: "shotguns",
    name: "Shotguns",
    shortName: "Shotguns",
    description: "Pump-action, semi-auto and over-under shotguns for hunting, clays and defense.",
    image: "/assets/categories/ammo.jpg",
    href: "/category/shotguns",
  },
  {
    slug: "gun_parts",
    name: "Gun Parts",
    shortName: "Gun Parts",
    description: "Rifle, handgun and shotgun parts — barrels, triggers, bolt carrier groups, receivers and more.",
    image: "/assets/categories/rifle-parts.jpg",
    href: "/category/gun_parts",
    children: [
      { name: "Rifle Parts", href: "/category/gun_parts?type=rifle" },
      { name: "Handgun Parts", href: "/category/gun_parts?type=handgun" },
      { name: "Shotgun Parts", href: "/category/gun_parts?type=shotgun" },
    ],
  },
  {
    slug: "magazines",
    name: "Magazines",
    shortName: "Magazines",
    description: "Factory and aftermarket magazines for rifles, handguns and shotguns.",
    image: "/assets/categories/rifle-mags.jpg",
    href: "/category/magazines",
  },
  {
    slug: "ammunition",
    name: "Ammunition",
    shortName: "Ammo",
    description: "Rifle, handgun, shotgun and rimfire ammunition from top makers.",
    image: "/assets/categories/ammo.jpg",
    href: "/category/ammunition",
    children: [
      { name: "Rifle Ammo", href: "/category/ammunition?type=rifle" },
      { name: "Handgun Ammo", href: "/category/ammunition?type=handgun" },
      { name: "Shotgun Ammo", href: "/category/ammunition?type=shotgun" },
      { name: "Rimfire", href: "/category/ammunition?type=rimfire" },
    ],
  },
  {
    slug: "optics",
    name: "Optics",
    shortName: "Optics",
    description: "Scopes, red dot sights, rings and mounts for every platform.",
    image: "/assets/categories/scopes.jpg",
    href: "/category/optics",
  },
  {
    slug: "reloading",
    name: "Reloading",
    shortName: "Reloading",
    description: "Dies, presses, powder handling and reloading components.",
    image: "/assets/categories/reloading-components.jpg",
    href: "/category/reloading",
  },
  {
    slug: "tools_cleaning",
    name: "Tools & Cleaning",
    shortName: "Tools",
    description: "Gunsmithing tools, bore tools and gun cleaning supplies.",
    image: "/assets/categories/gunsmith-tools.jpg",
    href: "/category/tools_cleaning",
  },
  {
    slug: "gear",
    name: "Gear",
    shortName: "Gear",
    description: "Cases, storage, tactical gear, bipods and shooting accessories.",
    image: "/assets/categories/gear.jpg",
    href: "/category/gear",
  },
];

export const categoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);

export const navGroups: NavGroup[] = [
  {
    label: "Firearms",
    href: "/category/firearms",
    image: "/assets/banners/hero-main.png",
    groups: [
      {
        title: "Firearms",
        items: [
          { name: "Rifles", href: "/category/rifles" },
          { name: "Handguns", href: "/category/handguns" },
          { name: "Shotguns", href: "/category/shotguns" },
          { name: "Blackpowder", href: "/category/rifles?type=blackpowder" },
          { name: "Suppressors", href: "/category/suppressors" },
        ],
      },
      {
        title: "Shop By Type",
        items: [
          { name: "Bolt Action Rifles", href: "/category/rifles?type=bolt" },
          { name: "Semi-Auto Rifles", href: "/category/rifles?type=semi" },
          { name: "Lever Action Rifles", href: "/category/rifles?type=lever" },
          { name: "Semi-Auto Pistols", href: "/category/handguns?type=pistol" },
          { name: "Revolvers", href: "/category/handguns?type=revolver" },
          { name: "Pump & Semi Shotguns", href: "/category/shotguns" },
        ],
      },
      {
        title: "Auction Marketplace",
        items: [
          { name: "All Firearm Auctions", href: "/browse?sort=auction" },
          { name: "Buy Now Only", href: "/browse?listing=buynow" },
          { name: "New", href: "/browse?condition=new" },
          { name: "Used", href: "/browse?condition=used" },
          { name: "Collector's Corner", href: "/browse?condition=collectible" },
        ],
      },
    ],
  },
  {
    label: "AR-15",
    href: "/category/gun_parts?type=rifle",
    groups: [
      {
        title: "AR-15 Build",
        items: [
          { name: "AR-15 Rifles", href: "/category/rifles?type=semi" },
          { name: "AR-15 Uppers", href: "/category/gun_parts?type=upper" },
          { name: "AR-15 Lowers", href: "/category/gun_parts?type=lower" },
          { name: "Bolt Carrier Groups", href: "/category/gun_parts?type=bcg" },
          { name: "Charging Handles", href: "/category/gun_parts?type=charging" },
          { name: "Barrels", href: "/category/gun_parts?type=barrel" },
        ],
      },
      {
        title: "AR-15 Components",
        items: [
          { name: "Stocks & Buffers", href: "/category/gun_parts?type=stock" },
          { name: "Grips", href: "/category/gun_parts?type=grip" },
          { name: "Parts Kits", href: "/category/gun_parts?type=kit" },
          { name: "Handguards", href: "/category/gun_parts?type=handguard" },
          { name: "Triggers", href: "/category/gun_parts?type=trigger" },
          { name: "Magazines", href: "/category/magazines" },
        ],
      },
    ],
  },
  {
    label: "Gun Parts",
    href: "/category/gun_parts",
    groups: [
      {
        title: "Gun Parts",
        items: [
          { name: "Rifle Parts", href: "/category/gun_parts?type=rifle" },
          { name: "Handgun Parts", href: "/category/gun_parts?type=handgun" },
          { name: "Shotgun Parts", href: "/category/gun_parts?type=shotgun" },
          { name: "Magazines", href: "/category/magazines" },
          { name: "Recoil Pads & Reducers", href: "/category/gun_parts?type=recoil" },
        ],
      },
    ],
  },
  {
    label: "Ammunition",
    href: "/category/ammunition",
    groups: [
      {
        title: "Ammunition",
        items: [
          { name: "Handgun Ammo", href: "/category/ammunition?type=handgun" },
          { name: "Rifle Ammo", href: "/category/ammunition?type=rifle" },
          { name: "Rimfire Ammo", href: "/category/ammunition?type=rimfire" },
          { name: "Shotgun Ammo", href: "/category/ammunition?type=shotgun" },
        ],
      },
      {
        title: "Popular Calibers",
        items: [
          { name: "9mm", href: "/category/ammunition?caliber=9mm" },
          { name: ".223 / 5.56", href: "/category/ammunition?caliber=556" },
          { name: ".308 Win", href: "/category/ammunition?caliber=308" },
          { name: ".22 LR", href: "/category/ammunition?caliber=22" },
        ],
      },
    ],
  },
  {
    label: "Reloading",
    href: "/category/reloading",
    groups: [
      {
        title: "Reloading",
        items: [
          { name: "Reloading Dies", href: "/category/reloading?type=die" },
          { name: "Presses & Accessories", href: "/category/reloading?type=press" },
          { name: "Reloading Tools", href: "/category/reloading?type=tool" },
          { name: "Components", href: "/category/reloading?type=component" },
          { name: "Powder Handling", href: "/category/reloading?type=powder" },
        ],
      },
    ],
  },
  {
    label: "Optics",
    href: "/category/optics",
    groups: [
      {
        title: "Optics",
        items: [
          { name: "Scopes & Accessories", href: "/category/optics?type=scope" },
          { name: "Red Dot Sights", href: "/category/optics?type=reddot" },
          { name: "Rings & Mounts", href: "/category/optics?type=ring" },
          { name: "Night Vision & Thermal", href: "/category/optics?type=thermal" },
          { name: "Laser Sights", href: "/category/optics?type=laser" },
        ],
      },
    ],
  },
  {
    label: "Gear",
    href: "/category/gear",
    groups: [
      {
        title: "Gear",
        items: [
          { name: "Gun Cases & Storage", href: "/category/gear?type=case" },
          { name: "Tactical Gear", href: "/category/gear?type=tactical" },
          { name: "Bipods & Monopods", href: "/category/gear?type=bipod" },
          { name: "Range Gear", href: "/category/gear?type=range" },
          { name: "Safety Gear", href: "/category/gear?type=safety" },
        ],
      },
    ],
  },
];

export const topNavLinks = [
  { name: "Deals", href: "/deals" },
  { name: "New Products", href: "/browse?sort=new" },
];

export const footerGroups = [
  {
    title: "Shop",
    links: [
      { name: "Firearms", href: "/category/firearms" },
      { name: "Gun Parts", href: "/category/gun_parts" },
      { name: "Magazines", href: "/category/magazines" },
      { name: "Ammunition", href: "/category/ammunition" },
      { name: "Reloading", href: "/category/reloading" },
      { name: "Optics", href: "/category/optics" },
      { name: "Gear", href: "/category/gear" },
      { name: "Deals", href: "/deals" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Sell Your Guns", href: "/sell" },
      { name: "Gun Schematics", href: "/schematics" },
      { name: "FFL Locator", href: "/ffl-locator" },
      { name: "Veteran Discount Program", href: "/veterans" },
      { name: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "Order Lookup", href: "/order-lookup" },
      { name: "Returns Policy", href: "/returns" },
      { name: "Shipping & FFL Transfers", href: "/shipping" },
      { name: "Gift Cards", href: "/gift-cards" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Terms of Use", href: "/terms" },
      { name: "Cancellation Policy", href: "/cancellation" },
      { name: "Returns Policy", href: "/returns" },
      { name: "Warranty & Disclaimer", href: "/warranty" },
      { name: "Acceptable Use Policy", href: "/acceptable-use" },
      { name: "Accessibility Statement", href: "/accessibility" },
      { name: "State Restrictions", href: "/state-restrictions" },
      { name: "Firearm Safety", href: "/safety" },
    ],
  },
];
