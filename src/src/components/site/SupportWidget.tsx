"use client";

import { useState } from "react";
import { config } from "@/lib/config";
import { whatsappNumber } from "@/lib/receipt";

function ChatIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function CloseIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.08a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.24-8.24 8.24Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

export function SupportWidget() {
  const [open, setOpen] = useState(false);
  const waLink = `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(
    `Hi ${config.siteName}! I need some help with an order.`
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-brand-950 px-5 py-4 text-white">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-wide">
                Customer Support
              </p>
              <p className="mt-0.5 text-xs text-zinc-400">
                We usually reply within minutes
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              aria-label="Close support"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="space-y-3 p-5">
            <p className="text-sm text-zinc-600">
              The fastest way to reach us is WhatsApp — tap below and we&apos;ll
              take it from there.
            </p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full bg-[#25D366] py-3 text-white hover:bg-[#1ebe5b]"
            >
              <WhatsAppIcon />
              Contact us on WhatsApp
            </a>

            <a
              href={`mailto:${config.supportEmail}`}
              className="btn btn-outline w-full"
            >
              Email Support
            </a>

            <p className="pt-1 text-center text-xs text-zinc-400">
              {config.supportHours}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close support" : "Open support"}
        className="flex items-center gap-2 rounded-full bg-brand-900 py-3 pl-4 pr-5 text-sm font-bold text-white shadow-lg transition hover:bg-brand-800"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold-500 text-brand-950">
          {open ? <CloseIcon size={16} /> : <ChatIcon />}
        </span>
        {open ? "Close" : "Support"}
      </button>
    </div>
  );
}
