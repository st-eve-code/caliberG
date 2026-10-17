import { HeroCarousel } from "@/components/home/HeroCarousel";
import { BannerStrip } from "@/components/home/BannerStrip";
import { CategoryTiles } from "@/components/home/CategoryTiles";
import { BrandCarousel } from "@/components/home/BrandCarousel";
import { MediaRow } from "@/components/home/MediaRow";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { Reveal } from "@/components/home/Reveal";
import Link from "next/link";
import {
  getFeatured,
  getTopSellers,
  getDeals,
  getNewArrivals,
} from "@/lib/data/products";

export default function HomePage() {
  const featured = getFeatured(12);
  const topSellers = getTopSellers(12);
  const deals = getDeals(12);
  const newArrivals = getNewArrivals(12);

  return (
    <>
      <HeroCarousel />
      <BannerStrip />
      <CategoryTiles />

      <ProductCarousel
        title="Today's Best Deals"
        products={deals}
        viewAll="View all deals"
        href="/deals"
      />

      <section className="bg-brand-950 py-12 text-white">
        <div className="container-x flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-gold-400">
              SOVEREIGN ARMS VALOR PROGRAM
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Proud to Serve Those Who Serve
            </h2>
            <p className="mt-2 max-w-xl text-sm text-zinc-300">
              Exclusive discounts for Military, Veterans, First Responders & Law
              Enforcement.
            </p>
          </div>
          <a href="/veterans" className="btn btn-primary shrink-0">
            Learn More
          </a>
        </div>
      </section>

      <BrandCarousel />
      <MediaRow />

      <ProductCarousel
        title="Top Sellers"
        products={topSellers}
        viewAll="Shop best sellers"
        href="/browse?sort=rating"
      />

      <ProductCarousel
        title="New Arrivals"
        products={newArrivals}
        viewAll="Shop new products"
        href="/browse?sort=new"
        className="bg-zinc-50"
      />

      <ProductCarousel
        title="Featured Firearms"
        products={featured}
        viewAll="Browse all firearms"
        href="/category/firearms"
      />

      <Reveal className="container-x pb-16">
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-8 text-center">
          <p className="section-kicker">Can&apos;t decide?</p>
          <h2 className="section-title">Shop by Firearm</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-zinc-500">
            Browse a curated selection of rifles, pistols and shotguns — or head
            to the auction board for rare and used pieces.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/category/rifles" className="btn btn-dark">Rifles</Link>
            <Link href="/category/handguns" className="btn btn-dark">Handguns</Link>
            <Link href="/category/shotguns" className="btn btn-dark">Shotguns</Link>
            <Link href="/browse" className="btn btn-outline">Shop All</Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
