"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { heroBanners } from "@/lib/data/banners";

const DURATION = 6000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const indexRef = useRef(0);

  const goTo = useCallback((next: number) => {
    const count = heroBanners.length;
    const target = ((next % count) + count) % count;
    indexRef.current = target;
    setIndex(target);
  }, []);

  useEffect(() => {
    const id = setInterval(() => goTo(indexRef.current + 1), DURATION);
    return () => clearInterval(id);
  }, [goTo]);

  useEffect(() => {
    const current = slideRefs.current[index];
    const others = slideRefs.current.filter((_, i) => i !== index);
    if (current) {
      gsap.to(current, {
        opacity: 1,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        zIndex: 2,
      });
      gsap.fromTo(
        current.querySelectorAll("[data-hero-anim]"),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.15 }
      );
    }
    others.forEach((el) => {
      if (el) gsap.to(el, { opacity: 0, scale: 1.04, duration: 0.7, ease: "power2.out", zIndex: 1 });
    });
  }, [index]);

  return (
    <section className="relative overflow-hidden bg-brand-950">
      <div ref={trackRef} className="relative h-[420px] w-full sm:h-[480px] lg:h-[540px]">
        {heroBanners.map((banner, i) => (
          <div
            key={banner.id}
            ref={(el) => {
              slideRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 }}
            aria-hidden={i !== index}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              priority={i === 0}
              sizes="100vw"
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-950/90 via-brand-950/60 to-transparent" />
            <div className="container-x absolute inset-0 flex items-center">
              <div className="max-w-xl text-white">
                {banner.kicker && (
                  <p
                    data-hero-anim
                    className="mb-2 text-xs font-black uppercase tracking-[0.25em] text-gold-400"
                  >
                    {banner.kicker}
                  </p>
                )}
                <h1
                  data-hero-anim
                  className="text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl"
                >
                  {banner.title}
                </h1>
                {banner.subtitle && (
                  <p data-hero-anim className="mt-3 max-w-md text-sm text-zinc-300 sm:text-base">
                    {banner.subtitle}
                  </p>
                )}
                {banner.cta && (
                  <div data-hero-anim className="mt-6">
                    <Link href={banner.href} className="btn btn-primary">
                      {banner.cta}
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* controls */}
      <div className="container-x absolute inset-x-0 bottom-5 flex items-center justify-between">
        <div className="flex gap-2">
          {heroBanners.map((b, i) => (
            <button
              key={b.id}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-8 bg-gold-500" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => goTo(index - 1)}
            className="rounded-full bg-white/10 p-2 text-white backdrop-blur hover:bg-white/25"
            aria-label="Previous slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => goTo(index + 1)}
            className="rounded-full bg-white/10 p-2 text-white backdrop-blur hover:bg-white/25"
            aria-label="Next slide"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
