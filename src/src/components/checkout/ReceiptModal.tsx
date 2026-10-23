"use client";

import { useEffect, useMemo, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { buildReceiptText } from "@/lib/receipt";
import type { PaymentMethodId } from "@/lib/payments";

function FileTextIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6M9 9h2" />
    </svg>
  );
}

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="9" y="9" width="12" height="12" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function ReceiptModal({
  paymentMethodId,
}: {
  paymentMethodId?: PaymentMethodId | null;
}) {
  const { items } = useCart();
  const { currency } = useCurrency();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const receipt = useMemo(
    () => buildReceiptText(items, currency, paymentMethodId),
    [items, currency, paymentMethodId]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(receipt);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = receipt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn btn-outline w-full justify-center gap-2 py-3"
      >
        <FileTextIcon />
        Open receipt
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Your receipt"
        >
          <div
            className="absolute inset-0 bg-zinc-900/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-50 px-5 py-3">
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-brand-950">
                  Your Receipt
                </h2>
                <p className="text-xs text-zinc-500">
                  Copy it and send it to us on WhatsApp.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copy}
                  title="Copy receipt"
                  aria-label="Copy receipt"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 bg-white text-zinc-600 hover:border-brand-600 hover:text-brand-700"
                >
                  <CopyIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  title="Close"
                  aria-label="Close receipt"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-zinc-300 bg-white text-lg leading-none text-zinc-500 hover:border-zinc-400 hover:text-zinc-800"
                >
                  &times;
                </button>
              </div>
            </div>

            <div className="overflow-y-auto px-5 py-4">
              <pre className="min-w-0 whitespace-pre-wrap bg-white font-mono text-[13px] leading-relaxed text-zinc-800 [overflow-wrap:anywhere]">
                {receipt}
              </pre>
            </div>

            {copied ? (
              <p className="border-t border-zinc-200 bg-green-50 px-5 py-2 text-xs font-semibold text-green-700">
                Receipt copied to your clipboard.
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
