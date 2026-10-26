export const config = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME ?? "CaliberGuns",
  siteMark: process.env.NEXT_PUBLIC_SITE_MARK ?? "♠",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.caliberguns.com",
  siteDescription:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
    "Shop new & used rifles, handguns, shotguns, gun parts, ammunition, reloading and optics online. Buy now or bid auction-style from top manufacturers.",

  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? "support@caliberguns.com",
  dealersEmail: process.env.NEXT_PUBLIC_DEALERS_EMAIL ?? "dealers@caliberguns.com",
  infoEmail: process.env.NEXT_PUBLIC_INFO_EMAIL ?? "info@caliberguns.com",

  phone: process.env.NEXT_PUBLIC_PHONE ?? "770-432-1202",
  phoneHref: process.env.NEXT_PUBLIC_PHONE_HREF ?? "tel:+17704321202",
  supportHours:
    process.env.NEXT_PUBLIC_SUPPORT_HOURS ?? "Monday-Friday, 8am-5pm ET",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "17704321202",
  whatsappLabel: process.env.NEXT_PUBLIC_WHATSAPP_LABEL ?? "Order on WhatsApp",

  payments: {
    bitcoinAddress: process.env.NEXT_PUBLIC_PAYMENT_BITCOIN_ADDRESS ?? "",
    bitcoinNetwork:
      process.env.NEXT_PUBLIC_PAYMENT_BITCOIN_NETWORK ?? "Bitcoin (mainnet)",
    applePayEmail: process.env.NEXT_PUBLIC_PAYMENT_APPLEPAY_EMAIL ?? "",
    zelleEmail: process.env.NEXT_PUBLIC_PAYMENT_ZELLE_EMAIL ?? "",
    zellePhone: process.env.NEXT_PUBLIC_PAYMENT_ZELLE_PHONE ?? "",
    cashAppTag: process.env.NEXT_PUBLIC_PAYMENT_CASHAPP_TAG ?? "",
    chimeEmail: process.env.NEXT_PUBLIC_PAYMENT_CHIME_EMAIL ?? "",
    chimeHandle: process.env.NEXT_PUBLIC_PAYMENT_CHIME_HANDLE ?? "",
  },

  address: {
    line1: process.env.NEXT_PUBLIC_ADDRESS_LINE1 ?? "6000 Highlands Parkway SE",
    line2: process.env.NEXT_PUBLIC_ADDRESS_LINE2 ?? "",
    city: process.env.NEXT_PUBLIC_ADDRESS_CITY ?? "Smyrna",
    state: process.env.NEXT_PUBLIC_ADDRESS_STATE ?? "GA",
    zip: process.env.NEXT_PUBLIC_ADDRESS_ZIP ?? "30082",
    country: process.env.NEXT_PUBLIC_ADDRESS_COUNTRY ?? "United States",
  },

  copyrightOwner: process.env.NEXT_PUBLIC_COPYRIGHT_OWNER ?? "CaliberGuns",
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
