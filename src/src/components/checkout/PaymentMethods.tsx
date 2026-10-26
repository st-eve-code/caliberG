"use client";

import Image from "next/image";

import { useSyncExternalStore, useState, type ReactNode } from "react";
import {
  paymentMethods,
  isPaymentMethodId,
  type PaymentMethod,
  type PaymentMethodId,
} from "@/lib/payments";

const STORAGE_KEY = "guns_payment_method";

let current: PaymentMethodId | null = null;
let loaded = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): PaymentMethodId | null {
  if (!loaded && typeof window !== "undefined") {
    loaded = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (isPaymentMethodId(raw)) current = raw;
    } catch {
      // storage unavailable — selection stays in memory for this session
    }
  }
  return current;
}

function getServerSnapshot(): PaymentMethodId | null {
  return null;
}

function setMethod(next: PaymentMethodId) {
  current = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // storage unavailable — selection stays in memory for this session
  }
  listeners.forEach((l) => l());
}

export function usePaymentMethod() {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { id, select: setMethod };
}

export function CopyButton({
  value,
  label = "Copy",
  className = "btn btn-outline text-xs",
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" onClick={copy} className={className} aria-label={label}>
      {copied ? "Copied!" : label}
    </button>
  );
}

export function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.08a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

function MethodIcon({ method }: { method: PaymentMethod }) {
  const chip =
    "flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-sm font-extrabold ring-1 ring-inset overflow-hidden bg-white";
  const tone = method.tone;

  if (method.logo) {
    return (
      <span className={`${chip} ${tone}`} aria-hidden="true">
        <Image
          src={method.logo}
          alt={method.label}
          width={28}
          height={28}
          unoptimized
          className="h-7 w-7 object-contain"
        />
      </span>
    );
  }

  if (method.id === "whatsapp") {
    return (
      <span className={`${chip} ${tone}`} aria-hidden="true">
        <WhatsAppIcon size={18} />
      </span>
    );
  }

  if (method.id === "applepay") {
    return (
      <span className={`${chip} ${tone}`} aria-hidden="true">
        <svg width="16" height="18" viewBox="0 0 17 20" fill="currentColor">
          <path d="M13.09 10.6c.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.71-3.19-1.73-1.36-.14-2.65.8-3.34.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.66-.39 6.6 1.11 8.76.73 1.06 1.61 2.25 2.76 2.21 1.11-.05 1.53-.72 2.87-.72 1.34 0 1.71.72 2.88.69 1.19-.02 1.94-1.08 2.67-2.14.85-1.23 1.2-2.42 1.22-2.48-.03-.01-2.34-.9-2.36-3.55ZM10.94 4.19c.61-.75 1.03-1.78.91-2.81-.88.04-1.95.59-2.58 1.32-.57.66-1.06 1.71-.93 2.71.98.08 1.98-.5 2.6-1.22Z" />
        </svg>
      </span>
    );
  }

  if (method.id === "chime") {
    return (
      <span className={`${chip} ${tone}`} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2 2 7v10l10 5 10-5V7L12 2Zm0 2.3 7.6 3.8L12 11.9 4.4 8.1 12 4.3ZM4 9.9l7 3.5v6.9l-7-3.5V9.9Zm9 10.4v-6.9l7-3.5v6.9l-7 3.5Z" />
        </svg>
      </span>
    );
  }

  const glyph =
    method.id === "bitcoin" ? "₿" : method.id === "zelle" ? "Z" : "$";

  return (
    <span className={`${chip} ${tone}`} aria-hidden="true">
      {glyph}
    </span>
  );
}

export function PaymentMethods({
  value,
  onChange,
  action,
}: {
  value: PaymentMethodId | null;
  onChange: (id: PaymentMethodId) => void;
  /** Primary call-to-action rendered under the method list. */
  action?: ReactNode;
}) {
  const selected = paymentMethods.find((m) => m.id === value);

  return (
    <section className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-5 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-950">
          Payment Method
        </h2>
        <span className="text-xs text-zinc-500">
          Pick how you want to pay — we confirm every order by hand.
        </span>
      </div>

      <div className="grid gap-2 p-4 sm:grid-cols-2">
        {paymentMethods.map((m) => {
          const active = m.id === value;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              aria-pressed={active}
              className={`flex items-center gap-3 rounded-lg border p-3 text-left transition ${
                active
                  ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                  : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <MethodIcon method={m} />
              <span className="min-w-0">
                <span className="block text-sm font-bold text-brand-950">
                  {m.label}
                </span>
                <span className="block truncate text-xs text-zinc-500">
                  {m.blurb}
                </span>
              </span>
              <span
                className={`ml-auto h-4 w-4 shrink-0 rounded-full border ${
                  active
                    ? "border-brand-600 bg-brand-600"
                    : "border-zinc-300 bg-white"
                }`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>

      {selected ? (
        selected.id === "whatsapp" ? null : (
        <div className="border-t border-zinc-200 px-5 py-4">
          <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">
            {selected.detailLabel}
          </p>
          {selected.detail ? (
            <div className="mt-1 space-y-2">
              {selected.id === "bitcoin" ? (
                <>
                  <code className="block w-full min-w-0 break-all rounded bg-zinc-100 px-2 py-1 font-mono text-sm font-semibold text-zinc-900">
                    {selected.detail}
                  </code>
                  <p className="text-xs text-zinc-700">
                    Copy the Bitcoin address above, pay the exact amount, and send
                    a screenshot of your payment to WhatsApp.
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <CopyButton
                      value={selected.detail}
                      label="Copy address"
                      className="btn btn-outline shrink-0 text-xs"
                    />
                  </div>
                </>
              ) : (
                <div className="flex flex-wrap items-center gap-3">
                  <code className="min-w-0 break-all rounded bg-zinc-100 px-2 py-1 font-mono text-sm font-semibold text-zinc-900">
                    {selected.detail}
                  </code>
                  <CopyButton
                    value={selected.detail}
                    label="Copy address"
                    className="btn btn-outline shrink-0 text-xs"
                  />
                </div>
              )}
            </div>
          ) : (
            <p className="mt-1 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              This address has not been set yet — message us on WhatsApp and
              we&apos;ll give you the details.
            </p>
          )}

          {selected.notes.filter(Boolean).length > 0 ? (
            <ul className="mt-3 space-y-1 text-xs text-zinc-500">
              {selected.notes
                .filter(Boolean)
                .map((note) => (
                  <li key={note}>{note}</li>
                ))}
            </ul>
          ) : null}
        </div>
        )
      ) : (
        <p className="border-t border-zinc-200 px-5 py-4 text-xs text-zinc-500">
          No payment method selected yet — choose one above and it will be
          added to your receipt.
        </p>
      )}

      {action && value === "whatsapp" ? (
        <div className="border-t border-zinc-200 bg-zinc-50 px-5 py-4">
          {action}
        </div>
      ) : null}
    </section>
  );
}

export function PaymentSummary({ method }: { method?: PaymentMethod }) {
  if (!method) return null;
  return (
    <>
      <div className="flex justify-between gap-3">
        <dt className="text-zinc-500">Payment method</dt>
        <dd className="text-right font-semibold text-zinc-800">
          {method.label}
        </dd>
      </div>
      {method.detail ? (
        <div className="flex justify-between gap-3">
          <dt className="text-zinc-500">{method.detailLabel}</dt>
          <dd className="max-w-[220px] break-all text-right font-mono text-xs font-semibold text-zinc-800">
            {method.detail}
          </dd>
        </div>
      ) : null}
    </>
  );
}
