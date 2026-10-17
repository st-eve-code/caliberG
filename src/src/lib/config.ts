export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "Sovereign Arms",
  siteMark: process.env.NEXT_PUBLIC_SITE_MARK ?? "♠",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sovereignarms.example",
  siteDescription:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    "Shop new & used rifles, handguns, shotguns, gun parts, ammunition, reloading and optics online. Buy now or bid auction-style from top manufacturers.",

  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@sovereignarms.example",
  dealersEmail: process.env.NEXT_PUBLIC_DEALERS_EMAIL ?? "dealers@sovereignarms.example",
  infoEmail: process.env.NEXT_PUBLIC_INFO_EMAIL ?? "info@sovereignarms.example",

  phone: process.env.NEXT_PUBLIC_PHONE ?? "1-800-555-0157",
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF ?? "tel:+18005550157",
  supportHours: process.env.NEXT_PUBLIC_SUPPORT_HOURS ?? "Monday–Friday, 8am–6pm CT",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "18005550157",
  whatsappLabel: process.env.NEXT_PUBLIC_WHATSAPP_LABEL ?? "Order on WhatsApp",

  address: {
    line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 ?? "123 Main Street",
    line2: process.env.NEXT_PUBLIC_ADDRESS_LINE2 ?? "Suite 100",
    city: process.env.NEXT_PUBLIC_ADDRESS_CITY ?? "Dallas",
    state: process.env.NEXT_PUBLIC_ADDRESS_STATE ?? "TX",
    zip: process.env.NEXT_PUBLIC_ADDRESS_ZIP ?? "75201",
    country: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY ?? "United States",
  },

  copyrightOwner: process.env.NEXT_PUBLIC_COPYRIGHT_OWNER ?? "Sovereign Arms",
  copyrightYear: process.env.NEXT_PUBLIC_COPYRIGHT_YEAR ?? "2026",
  lastUpdated: process.env.NEXT_PUBLIC_LAST_UPDATED ?? "January 2026",

  socials: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "",
    youtube: process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE ?? "",
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    tiktok: process.env.NEXT_PUBLIC_SOCIAL_TIKTOK ?? "",
    x: process.env.NEXT_PUBLIC_SOCIAL_X ?? "",
    linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "",
  },
} as const;

export const formattedAddress = [
  config.address.line1,
  config.address.line2,
  `${config.address.city}, ${config.address.state} ${config.address.zip}`,
  config.address.country,
]
  .filter(Boolean)
  .join(", ");
