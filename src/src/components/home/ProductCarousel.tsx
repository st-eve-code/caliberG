"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/ProductCard";

type Props = {
  title: string;
  products: Product[];
  href?: string;
  viewAll?: string;
  className?: string;
};

export function ProductCarousel({ title, products, href, viewAll, className = "" }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const cardW = 280;
  const gap = 20;

  const maxPos = Math.max(0, products.length * (cardW + gap) - gap);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = (e: MediaQueryListEvent | MediaQueryList) => setIsMobile(e.matches);
    update(mq);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const scrollTo = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.8, cardW * 2 + gap);
    const target = Math.max(0, Math.min(maxPos, pos + dir * step));
    setPos(target);
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el || isMobile) return;
    gsap.to(el, {
      x: -pos,
      duration: 0.6,
      ease: "power2.out",
    });
  }, [pos, isMobile]);

  if (!products.length) return null;

  return (
    <section className={`container-x py-10 ${className}`}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          {title && <h2 className="section-title">{title}</h2>}
          {href && (
            <p className="mt-1 text-sm text-zinc-500">
              Hand-picked by our shooters.
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {viewAll && (
            <Link href={viewAll} className="hidden text-sm font-semibold text-brand-700 hover:underline sm:block">
              {viewAll} →
            </Link>
          )}
          {/* Hide scroll buttons on mobile — touch scroll is used instead */}
          <button
            onClick={() => scrollTo(-1)}
            className="hidden rounded-full border border-zinc-300 p-2 text-zinc-600 hover:border-brand-700 hover:text-brand-800 md:flex"
            aria-label="Scroll left"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => scrollTo(1)}
            className="hidden rounded-full border border-zinc-300 p-2 text-zinc-600 hover:border-brand-700 hover:text-brand-800 md:flex"
            aria-label="Scroll right"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile: native horizontal scroll */}
      {isMobile ? (
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
        >
          {products.map((p) => (
            <div key={p.id} className="shrink-0" style={{ width: cardW }}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop: GSAP button-driven carousel */
        <div className="relative overflow-hidden">
          <div ref={trackRef} className="flex will-change-transform">
            {products.map((p) => (
              <div key={p.id} className="shrink-0 pr-5" style={{ width: cardW }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
