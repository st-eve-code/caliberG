"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/CartProvider";
import { ReceiptCard } from "@/components/shop/ReceiptCard";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { shippingFor, formatMoney } from "@/lib/receipt";

export default function CheckoutPage() {
  const { items, count, subtotal, clear } = useCart();
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container-x py-16 text-center">
        <h1 className="text-2xl font-extrabold text-brand-950">Checkout</h1>
        <p className="mt-2 text-sm text-zinc-500">Your cart is empty.</p>
        <Link href="/browse" className="btn btn-primary mt-6">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-6">
      <Breadcrumbs crumbs={[{ name: "Checkout" }]} />
      <h1 className="mt-4 text-2xl font-extrabold text-brand-950">Checkout</h1>
      <p className="mt-1 max-w-2xl text-sm text-zinc-500">
        We never take payment on the site. Send your receipt to us on WhatsApp
        and we&apos;ll confirm availability, shipping and payment with you
        directly.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <ReceiptCard />
        </div>

        <aside className="h-fit space-y-4 rounded-lg border border-zinc-200 p-5">
          <h2 className="text-lg font-bold text-brand-950">Order Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Items ({count})</dt>
              <dd className="font-semibold text-zinc-800">{formatMoney(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Shipping</dt>
              <dd className="font-semibold text-zinc-800">
                {shipping === 0 ? <span className="text-green-600">FREE</span> : formatMoney(shipping)}
              </dd>
            </div>
            <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold text-brand-950">
              <dt>Total</dt>
              <dd>{formatMoney(total)}</dd>
            </div>
          </dl>

          <div className="rounded-lg border border-brand-200 bg-brand-50 p-4 text-xs leading-relaxed text-brand-900">
            <p className="font-bold">No online payment, no card details.</p>
            <p className="mt-1">
              Your cart and receipt are saved on this device until you
              manually delete them — so you can come back and recopy them
              anytime.
            </p>
          </div>

          <button
            onClick={clear}
            className="w-full text-xs text-zinc-400 hover:text-red-600"
          >
            Clear cart (deletes saved receipt)
          </button>
          <Link href="/browse" className="btn btn-ghost w-full">
            Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
