"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { buildReceiptText, buildWhatsAppLink } from "@/lib/receipt";

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.08a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function ReceiptCard() {
  const { items } = useCart();
  const [copied, setCopied] = useState(false);

  const receipt = useMemo(() => buildReceiptText(items), [items]);
  const waLink = useMemo(() => buildWhatsAppLink(receipt), [receipt]);

  const copyReceipt = async () => {
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
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-5 py-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-950">
          Your Receipt
        </h2>
        <span className="text-xs text-zinc-500">
          Copy it or send it to us on WhatsApp — it stays saved here until you
          clear your cart.
        </span>
      </div>

      <pre className="max-h-96 min-w-0 overflow-y-auto whitespace-pre-wrap bg-white px-5 py-4 font-mono text-[13px] leading-relaxed text-zinc-800 [overflow-wrap:anywhere]">
        {receipt}
      </pre>

      <div className="flex flex-col gap-3 border-t border-zinc-200 px-5 py-4 sm:flex-row">
        <button
          onClick={copyReceipt}
          className="btn btn-outline flex-1"
          type="button"
        >
          {copied ? "Copied!" : "Copy receipt"}
        </button>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn flex-1 bg-[#25D366] text-white hover:bg-[#1ebe5b]"
        >
          <WhatsAppIcon />
          Send to WhatsApp
        </a>
      </div>
    </div>
  );
}
