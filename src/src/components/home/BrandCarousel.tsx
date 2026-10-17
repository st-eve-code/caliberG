"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { brands } from "@/lib/data/banners";

export function BrandCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: "-50%",
        duration: 40,
        ease: "none",
        repeat: -1,
      });
      return () => tween.kill();
    });
    return () => ctx.revert();
  }, []);

  const doubled = [...brands, ...brands];

  return (
    <section className="border-y border-zinc-200 bg-zinc-50 py-8">
      <div className="container-x">
        <p className="section-kicker text-center">Shop Our Top Brands</p>
        <h2 className="section-title text-center">Trusted Manufacturers</h2>
      </div>
      <div className="mt-6 overflow-hidden">
        <div ref={trackRef} className="flex w-max items-center gap-6 px-6">
          {doubled.map((b, i) => (
            <Link
              key={`${b.name}-${i}`}
              href={b.href}
              className="flex h-16 min-w-40 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-black uppercase tracking-wider text-brand-900 transition hover:border-gold-500 hover:text-gold-700"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
