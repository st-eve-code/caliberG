"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import {
  FREE_SHIPPING_THRESHOLD,
  shippingFor,
} from "@/lib/receipt";
import { convertAmount } from "@/lib/currency";

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clear } = useCart();
  const { currency, format } = useCurrency();
  const threshold = convertAmount(FREE_SHIPPING_THRESHOLD, "USD", currency);
  const shipping = shippingFor(subtotal, threshold);
  const total = subtotal + shipping;

  return (
    <div className="container-x py-6">
      <Breadcrumbs crumbs={[{ name: "Cart" }]} />
      <h1 className="mt-4 text-2xl font-extrabold text-brand-950">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-zinc-300 p-16 text-center">
          <p className="text-lg font-semibold text-zinc-600">Your cart is empty</p>
          <p className="mt-1 text-sm text-zinc-400">
            Head to the shop to find your next gun, part or ammo deal.
          </p>
          <Link href="/browse" className="btn btn-primary mt-6">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="rounded-lg border border-zinc-200">
            <ul className="divide-y divide-zinc-100">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 p-4">
                  <Link href={`/product/${item.slug}`}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col gap-1">
                    <span className="text-xs uppercase text-zinc-400">{item.brand}</span>
                    <Link
                      href={`/product/${item.slug}`}
                      className="line-clamp-2 text-sm font-semibold text-brand-950 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded border border-zinc-300">
                        <button className="px-3 py-1 text-zinc-600 hover:bg-zinc-100" onClick={() => updateQty(item.slug, item.qty - 1)}>
                          −
                        </button>
                        <span className="w-10 text-center text-sm">{item.qty}</span>
                        <button className="px-3 py-1 text-zinc-600 hover:bg-zinc-100" onClick={() => updateQty(item.slug, item.qty + 1)}>
                          +
                        </button>
                      </div>
                      <span className="text-sm font-bold text-brand-950">
                        {format(item.price * item.qty, item.currency ?? "USD")}
                      </span>
                    </div>
                    <button
                      onClick={() => removeItem(item.slug)}
                      className="mt-1 self-start text-xs text-zinc-400 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-zinc-200 p-4">
              <button onClick={clear} className="text-xs text-zinc-400 hover:text-red-600">
                Clear cart
              </button>
            </div>
          </div>

          <aside className="h-fit rounded-lg border border-zinc-200 p-5">
            <h2 className="text-lg font-bold text-brand-950">Order Summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-zinc-500">Subtotal</dt>
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
            <p className="mt-2 text-xs text-zinc-500">
              {subtotal < threshold && items.length > 0
                ? `Add ${format(threshold - subtotal)} more for FREE shipping.`
                : "You've unlocked FREE shipping!"}
            </p>
            <Link href="/checkout" className="btn btn-primary mt-4 w-full py-3">
              Proceed to payment
            </Link>
            <p className="mt-2 text-center text-xs text-zinc-400">
              No online payment — your cart stays saved here until you delete it.
            </p>
            <Link href="/browse" className="btn btn-ghost mt-2 w-full">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
