"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import {
  PaymentMethods,
  PaymentSummary,
  WhatsAppIcon,
  usePaymentMethod,
} from "@/components/checkout/PaymentMethods";
import { ReceiptModal } from "@/components/checkout/ReceiptModal";
import {
  FREE_SHIPPING_THRESHOLD,
  buildPaymentChatLink,
  shippingFor,
} from "@/lib/receipt";
import { convertAmount } from "@/lib/currency";
import { getPaymentMethod } from "@/lib/payments";

export default function CheckoutPage() {
  const { items, count, subtotal, clear } = useCart();
  const { currency, format } = useCurrency();
  const { id: paymentMethodId, select: selectPaymentMethod } =
    usePaymentMethod();
  const threshold = convertAmount(FREE_SHIPPING_THRESHOLD, "USD", currency);
  const shipping = shippingFor(subtotal, threshold);
  const total = subtotal + shipping;
  const paymentMethod = getPaymentMethod(paymentMethodId);

  const chatLink = useMemo(
    () => buildPaymentChatLink(items, currency, paymentMethod),
    [items, currency, paymentMethod]
  );

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
        Choose how you want to pay. We confirm every order by hand and never
        take payment on the site.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <PaymentMethods
            value={paymentMethodId}
            onChange={selectPaymentMethod}
            action={
              <>
                <a
                  href={chatLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!paymentMethod}
                  onClick={(e) => {
                    if (!paymentMethod) e.preventDefault();
                  }}
                  className={`btn w-full justify-center gap-2 py-3 ${
                    paymentMethod ? "btn-primary" : "btn-outline opacity-60"
                  }`}
                >
                  <WhatsAppIcon />
                  Proceed to payment
                </a>
                <p className="mt-2 text-center text-xs text-zinc-500">
                  {paymentMethod
                    ? paymentMethod.flow === "offline"
                      ? `Pay to the ${paymentMethod.label} details above, then continue here to send your payment screenshot.`
                      : `Continue in WhatsApp to confirm your order and pay with ${paymentMethod.label}.`
                    : "Pick a payment method above to continue."}
                </p>
              </>
            }
          />
        </div>

        <aside className="h-fit space-y-4 rounded-lg border border-zinc-200 p-5">
          <h2 className="text-lg font-bold text-brand-950">Order Summary</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-zinc-500">Items ({count})</dt>
              <dd className="font-semibold text-zinc-800">{format(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-zinc-500">Shipping</dt>
              <dd className="font-semibold text-zinc-800">
                {shipping === 0 ? (
                  <span className="text-green-600">FREE</span>
                ) : (
                  format(shipping)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-zinc-200 pt-3 text-base font-bold text-brand-950">
              <dt>Total</dt>
              <dd>{format(total)}</dd>
            </div>
          </dl>

          <dl className="space-y-2 border-t border-zinc-200 pt-3 text-sm">
            <PaymentSummary method={paymentMethod} />
          </dl>

          <ReceiptModal paymentMethodId={paymentMethodId} />

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
