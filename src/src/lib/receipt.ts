import type { CartItem } from "@/lib/types";
import { config } from "@/lib/config";
import { convertAmount, formatAmount, type CurrencyCode } from "@/lib/currency";
import { getPaymentMethod, type PaymentMethod, type PaymentMethodId } from "@/lib/payments";

export const FREE_SHIPPING_THRESHOLD = 75;
export const FLAT_SHIPPING = 9.99;

export function shippingFor(subtotal: number, threshold = FREE_SHIPPING_THRESHOLD) {
  return subtotal >= threshold ? 0 : FLAT_SHIPPING;
}

export function formatMoney(n: number, currency: CurrencyCode = "USD") {
  return formatAmount(n, "USD", currency);
}

/** Subtotal of a (possibly mixed-currency) cart expressed in `currency`. */
export function cartSubtotal(items: CartItem[], currency: CurrencyCode = "USD") {
  return items.reduce(
    (sum, i) => sum + convertAmount(i.price, i.currency ?? "USD", currency) * i.qty,
    0
  );
}

export function buildReceiptText(
  items: CartItem[],
  currency: CurrencyCode = "USD",
  paymentMethodId?: PaymentMethodId | null
) {
  const subtotal = cartSubtotal(items, currency);
  const threshold = convertAmount(FREE_SHIPPING_THRESHOLD, "USD", currency);
  const shipping = shippingFor(subtotal, threshold);
  const method = getPaymentMethod(paymentMethodId);
  const lines: string[] = [];

  lines.push(`${config.siteName} — Order Receipt`);
  lines.push(`Generated ${new Date().toLocaleString()}`);
  lines.push("".padEnd(46, "─"));
  lines.push("");

  items.forEach((i, idx) => {
    const line = convertAmount(i.price, i.currency ?? "USD", currency) * i.qty;
    lines.push(`${idx + 1}. ${i.name}`);
    lines.push(
      `   ${i.qty} × ${formatAmount(i.price, i.currency ?? "USD", currency)}  =  ${formatAmount(
        line,
        "USD",
        currency
      )}`
    );
  });

  lines.push("");
  lines.push("".padEnd(46, "─"));
  lines.push(`Subtotal   ${formatMoney(subtotal, currency)}`);
  lines.push(
    `Shipping   ${shipping === 0 ? "FREE" : formatMoney(shipping, currency)}`
  );
  lines.push(`TOTAL      ${formatMoney(subtotal + shipping, currency)}`);
  lines.push("");

  if (method) {
    lines.push("".padEnd(46, "─"));
    lines.push(`Payment    ${method.label}`);
    if (method.detail) lines.push(`Pay to     ${method.detail}`);
    method.notes.filter(Boolean).forEach((note) => lines.push(`          ${note}`));
    lines.push("");
  }

  lines.push(
    "Send this receipt on WhatsApp and we'll confirm availability,",
    "shipping and payment for your order."
  );

  return lines.join("\n");
}

export function whatsappNumber() {
  return config.whatsappNumber.replace(/\D/g, "");
}

export function buildWhatsAppLink(message: string) {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

/**
 * WhatsApp hand-off link for the "Proceed to payment" button.
 * The customer confirms the order and, for offline methods, sends their
 * payment screenshot in the same chat.
 */
export function buildPaymentChatLink(
  items: CartItem[],
  currency: CurrencyCode = "USD",
  method?: PaymentMethod
) {
  const subtotal = cartSubtotal(items, currency);
  const threshold = convertAmount(FREE_SHIPPING_THRESHOLD, "USD", currency);
  const shipping = shippingFor(subtotal, threshold);
  const total = subtotal + shipping;
  const count = items.reduce((n, i) => n + i.qty, 0);

  const lines: string[] = [`Hi ${config.siteName},`];
  if (method) {
    lines.push(`I'd like to pay with ${method.label}.`);
    if (method.detail) lines.push(`Pay to: ${method.detail}`);
  } else {
    lines.push("I'd like to place an order.");
  }
  lines.push(`Order total: ${formatMoney(total, currency)} (${count} items)`);
  lines.push("");
  if (method && method.flow === "offline") {
    lines.push(
      "I've made the payment and I'm sending my screenshot here.",
      "My receipt:",
      "",
      buildReceiptText(items, currency, method.id)
    );
  } else {
    lines.push("Please send me the receipt so we can confirm the order.");
  }

  return buildWhatsAppLink(lines.join("\n"));
}
