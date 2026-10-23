"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function CartDrawer() {
  const { items, subtotal, count, setOpen, isOpen, updateQty, removeItem } = useCart();
  const { format } = useCurrency();

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-xl transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
          <h2 className="text-lg font-bold text-brand-950">
            Your Cart ({count})
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="rounded-md p-1 text-zinc-500 hover:bg-zinc-100"
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="text-lg font-semibold text-zinc-700">Your cart is empty</p>
            <Link href="/browse" onClick={() => setOpen(false)} className="btn btn-primary">
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-zinc-100 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.slug} className="flex gap-4 py-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 shrink-0 rounded-md object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <span className="text-xs uppercase text-zinc-400">{item.brand}</span>
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={() => setOpen(false)}
                      className="line-clamp-2 text-sm font-semibold text-brand-950 hover:underline"
                    >
                      {item.name}
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center rounded border border-zinc-300">
                        <button
                          className="px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
                          onClick={() => updateQty(item.slug, item.qty - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.qty}</span>
                        <button
                          className="px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100"
                          onClick={() => updateQty(item.slug, item.qty + 1)}
                        >
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
            <div className="border-t border-zinc-200 px-6 py-4">
              <div className="mb-1 flex justify-between text-sm text-zinc-500">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="mb-4 flex justify-between text-lg font-bold text-brand-950">
                <span>Subtotal</span>
                <span>{format(subtotal)}</span>
              </div>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="btn btn-primary w-full"
              >
                Proceed to payment
              </Link>
              <Link
                href="/cart"
                onClick={() => setOpen(false)}
                className="btn btn-outline mt-2 w-full"
              >
                View Cart
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
