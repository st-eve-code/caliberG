import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { Price } from "@/components/ui/Price";
import { StarRating } from "@/components/ui/StarRating";
import { AddToCartButton } from "@/components/ui/AddToCartButton";

export function ProductCard({ product }: { product: Product }) {
  const badgeText =
    product.compareAt && product.compareAt > (product.priceMin ?? 0)
      ? "SALE"
      : product.badge?.includes("limited")
        ? "LIMITED"
        : null;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white transition hover:border-brand-300 hover:shadow-lg">
      <Link
        href={`/product/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-zinc-100"
        aria-label={product.title}
      >
        <Image
          src={product.image || "/assets/badges/placeholder.jpg"}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        {badgeText && (
          <span className="absolute left-2 top-2 z-10 rounded bg-gold-500 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-brand-950">
            {badgeText}
          </span>
        )}
      </Link>

      <button
        className="absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-zinc-500 shadow-sm backdrop-blur transition hover:bg-red-50 hover:text-red-500"
        aria-label={`Add ${product.name} to wishlist`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 000-7.8z" />
        </svg>
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <span className="truncate text-[11px] font-bold uppercase tracking-wide text-zinc-400">
          {product.brand}
        </span>
        <Link
          href={`/product/${product.slug}`}
          className="line-clamp-2 text-sm font-semibold leading-snug text-brand-950 hover:text-brand-700"
        >
          {product.name}
        </Link>
        <StarRating rating={product.rating} />
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          <Price product={product} size="sm" />
        </div>
        <AddToCartButton
          product={product}
          className="btn-dark w-full py-2 text-xs"
          showPrice={false}
        />
      </div>
    </article>
  );
}
