import type { CartItem } from "@/lib/types";
import { config } from "@/lib/config";

export const FREE_SHIPPING_THRESHOLD = 75;
export const FLAT_SHIPPING = 9.99;

export function shippingFor(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
}

export function formatMoney(n: number) {
  return `$${n.toFixed(2)}`;
}

export function cartSubtotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function buildReceiptText(items: CartItem[]) {
  const subtotal = cartSubtotal(items);
  const shipping = shippingFor(subtotal);
  const lines: string[] = [];

  lines.push(`${config.siteName} — Order Receipt`);
  lines.push(`Generated ${new Date().toLocaleString()}`);
  lines.push("".padEnd(46, "─"));
  lines.push("");

  items.forEach((i, idx) => {
    lines.push(`${idx + 1}. ${i.name}`);
    lines.push(`   ${i.qty} × ${formatMoney(i.price)}  =  ${formatMoney(i.price * i.qty)}`);
  });

  lines.push("");
  lines.push("".padEnd(46, "─"));
  lines.push(`Subtotal   ${formatMoney(subtotal)}`);
  lines.push(`Shipping   ${shipping === 0 ? "FREE" : formatMoney(shipping)}`);
  lines.push(`TOTAL      ${formatMoney(subtotal + shipping)}`);
  lines.push("");
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
