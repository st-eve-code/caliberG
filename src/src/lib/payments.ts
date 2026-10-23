import { config } from "@/lib/config";

export type PaymentMethodId =
  | "whatsapp"
  | "bitcoin"
  | "applepay"
  | "zelle"
  | "cashapp"
  | "chime";

export type PaymentMethod = {
  id: PaymentMethodId;
  label: string;
  blurb: string;
  /**
   * "chat"    — the customer pays by chatting with us (WhatsApp).
   * "offline" — the customer pays to the address below, then sends proof of
   *              payment to us on WhatsApp.
   */
  flow: "chat" | "offline";
  /** Label for the primary address/handle shown to the customer. */
  detailLabel: string;
  /** The address, handle or tag the customer sends the money to. */
  detail: string;
  /** Extra lines shown under the address (alternate details, instructions). */
  notes: string[];
  /** Optional deep link (bitcoin:, mailto:). */
  href?: string;
  hrefLabel?: string;
  /** Tailwind classes for the icon chip. */
  tone: string;
};

const clean = (value: string | undefined) => (value ?? "").trim();

export function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1"))
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  if (digits.length === 10)
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  return `+${digits}`;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    blurb: "Chat with us and pay however you like",
    flow: "chat",
    detailLabel: "WhatsApp number",
    detail: formatPhone(clean(config.whatsappNumber)),
    notes: [
      "Start a chat and we'll confirm availability, shipping and payment with you directly.",
    ],
    tone: "bg-[#25D366]/15 text-[#128C7E] ring-[#25D366]/40",
  },
  {
    id: "bitcoin",
    label: "Bitcoin",
    blurb: "Pay with BTC to our wallet address",
    flow: "offline",
    detailLabel: "Bitcoin wallet address",
    detail: clean(config.payments.bitcoinAddress),
    notes: [
      config.payments.bitcoinNetwork,
      "Send the exact amount, then send your payment screenshot on WhatsApp.",
    ],
    href: clean(config.payments.bitcoinAddress)
      ? `bitcoin:${clean(config.payments.bitcoinAddress)}`
      : undefined,
    hrefLabel: "Open wallet app",
    tone: "bg-amber-500/15 text-amber-700 ring-amber-500/30",
  },
  {
    id: "applepay",
    label: "Apple Pay",
    blurb: "Fast checkout from iPhone, iPad or Mac",
    flow: "offline",
    detailLabel: "Apple Pay email",
    detail: clean(config.payments.applePayEmail),
    notes: [
      "Pay from your device, then send your payment screenshot on WhatsApp.",
    ],
    href: clean(config.payments.applePayEmail)
      ? `mailto:${clean(config.payments.applePayEmail)}`
      : undefined,
    hrefLabel: "Email us",
    tone: "bg-zinc-900/10 text-zinc-800 ring-zinc-900/20",
  },
  {
    id: "zelle",
    label: "Zelle",
    blurb: "Send from your banking app",
    flow: "offline",
    detailLabel: "Zelle email or phone",
    detail: clean(config.payments.zelleEmail) || clean(config.payments.zellePhone),
    notes: [
      clean(config.payments.zellePhone)
        ? `Mobile number: ${clean(config.payments.zellePhone)}`
        : "",
      "Your bank app must have Zelle enabled, then send your payment screenshot on WhatsApp.",
    ],
    href: clean(config.payments.zelleEmail)
      ? `mailto:${clean(config.payments.zelleEmail)}`
      : undefined,
    hrefLabel: "Email us",
    tone: "bg-sky-500/15 text-sky-700 ring-sky-500/30",
  },
  {
    id: "cashapp",
    label: "Cash App",
    blurb: "Send instantly with your $cashtag",
    flow: "offline",
    detailLabel: "Cash App $cashtag",
    detail: clean(config.payments.cashAppTag),
    notes: [
      "Include your order number in the note, then send your payment screenshot on WhatsApp.",
    ],
    href: clean(config.payments.cashAppTag)
      ? `https://cash.app/${
          clean(config.payments.cashAppTag).replace(/^\$/, "").replace(/\s/g, "")
        }`
      : undefined,
    hrefLabel: "Open Cash App",
    tone: "bg-emerald-500/15 text-emerald-700 ring-emerald-500/30",
  },
  {
    id: "chime",
    label: "Chime",
    blurb: "Pay from your Chime account",
    flow: "offline",
    detailLabel: "Chime handle or email",
    detail: clean(config.payments.chimeHandle) || clean(config.payments.chimeEmail),
    notes: [
      clean(config.payments.chimeEmail)
        ? `Chime email: ${clean(config.payments.chimeEmail)}`
        : "",
      "Send from the Chime app, then send your payment screenshot on WhatsApp.",
    ],
    href: clean(config.payments.chimeEmail)
      ? `mailto:${clean(config.payments.chimeEmail)}`
      : undefined,
    hrefLabel: "Email us",
    tone: "bg-indigo-500/15 text-indigo-700 ring-indigo-500/30",
  },
];

export function getPaymentMethod(id: string | null | undefined) {
  if (!id) return undefined;
  return paymentMethods.find((m) => m.id === id);
}

export function isPaymentMethodId(
  id: string | null | undefined
): id is PaymentMethodId {
  return paymentMethods.some((m) => m.id === id);
}
