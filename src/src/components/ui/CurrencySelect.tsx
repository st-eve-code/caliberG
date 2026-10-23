"use client";

import { useCurrency } from "@/components/providers/CurrencyProvider";
import { CURRENCIES, type CurrencyCode } from "@/lib/currency";

export function CurrencySelect({
  className = "",
  compact = false,
  tone = "light",
}: {
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
}) {
  const { currency, setCurrency } = useCurrency();
  const dark = tone === "dark";

  return (
    <label
      className={`flex items-center gap-1.5 rounded-md border px-2 py-1.5 ${className} ${
        dark
          ? "border-white/20 bg-white/10 text-white"
          : "border-zinc-300 bg-white text-zinc-700"
      }`}
      title="Display prices in your currency"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
      </svg>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
        aria-label="Currency"
        className={`cursor-pointer bg-transparent text-sm font-semibold outline-none ${
          compact ? "w-[4.5rem]" : "w-[4.75rem]"
        } ${dark ? "text-white" : "text-zinc-700"}`}
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </label>
  );
}
