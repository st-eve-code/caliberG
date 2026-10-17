import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { StarRating } from "@/components/ui/StarRating";
import { Price } from "@/components/ui/Price";
import { AddToCartButton } from "@/components/ui/AddToCartButton";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import {
  getProductBySlug,
  getRelated,
  getAllProducts,
  formatPrice,
} from "@/lib/data/products";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  return {
    title: p ? `${p.brand} ${p.name}` : "Product",
    description: p ? `${p.name} — ${p.price} at Sovereign Arms.` : undefined,
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);
  const inStock = /in stock|in-stock/i.test(product.availability);

  return (
    <>
      <div className="container-x py-6">
        <Breadcrumbs
          crumbs={[
            { name: "Shop", href: "/browse" },
            { name: product.brand },
          ]}
        />

        <div className="mt-5 grid gap-10 lg:grid-cols-2">
          {/* gallery */}
          <div className="relative aspect-square overflow-hidden rounded-lg border border-zinc-200 bg-zinc-100">
            <Image
              src={product.image || "/assets/badges/placeholder.jpg"}
              alt={product.title}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            {product.compareAt && product.compareAt > (product.priceMin ?? 0) && (
              <span className="absolute left-3 top-3 rounded bg-gold-500 px-2.5 py-1 text-xs font-black uppercase text-brand-950">
                Sale
              </span>
            )}
          </div>

          {/* summary */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-wide text-brand-700">
                {product.brand}
              </p>
              <h1 className="mt-1 text-2xl font-extrabold leading-tight text-brand-950 sm:text-3xl">
                {product.name}
              </h1>
              <div className="mt-2 flex items-center gap-3">
                <StarRating rating={product.rating} />
                <span className="text-xs text-zinc-400">|</span>
                <span className="text-xs text-zinc-500">SKU: {product.id}</span>
              </div>
            </div>

            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4">
              <Price product={product} size="lg" />
              <p className="mt-1 text-sm text-zinc-500">
                {formatPrice(product)} · Price per item
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span
                className={`rounded px-2 py-1 text-xs font-bold ${
                  inStock ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}
              >
                {inStock ? "In Stock" : product.availability || "Check Availability"}
              </span>
              {product.badge && (
                <span className="rounded bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600">
                  Verified Product
                </span>
              )}
            </div>

            <AddToCartButton product={product} className="btn-primary py-3 text-base" />

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              {[
                ["Ships to FFL", "Most items ship same-day to your local dealer."],
                ["Price Match", "Found it cheaper? We'll match it."],
                ["30-Day Returns", "Buy with confidence, easy returns."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-lg border border-zinc-200 p-3">
                  <p className="font-bold text-brand-950">{t}</p>
                  <p className="mt-1 text-zinc-500">{d}</p>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-zinc-200 p-4 text-sm text-zinc-600">
              <p className="mb-1 font-bold text-brand-950">Buying a firearm online</p>
              <p>
                Firearms are shipped to your local FFL dealer who will complete the
                background check before transfer. Handguns require you to be 21+;
                long guns 18+. See our{" "}
                <a href="/shipping" className="text-brand-700 underline">
                  shipping & FFL guide
                </a>
                .
              </p>
            </div>
          </div>
        </div>

        {/* specs / details */}
        <section className="mt-12 grid gap-6 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 p-5">
            <h2 className="mb-3 text-lg font-bold text-brand-950">Product Details</h2>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li><span className="font-semibold text-zinc-800">Brand:</span> {product.brand}</li>
              <li><span className="font-semibold text-zinc-800">Type:</span> {product.category}</li>
              {product.subcategory && (
                <li><span className="font-semibold text-zinc-800">Family:</span> {product.subcategory}</li>
              )}
              <li><span className="font-semibold text-zinc-800">Item #:</span> {product.id}</li>
              <li><span className="font-semibold text-zinc-800">Availability:</span> {product.availability}</li>
            </ul>
          </div>
          <div className="rounded-lg border border-zinc-200 p-5">
            <h2 className="mb-3 text-lg font-bold text-brand-950">Reviews</h2>
            {product.rating ? (
              <div>
                <p className="text-3xl font-black text-brand-950">{product.rating.toFixed(1)}</p>
                <StarRating rating={product.rating} />
                <p className="mt-2 text-sm text-zinc-500">
                  Based on verified buyers. Every purchase is covered by our money-back guarantee.
                </p>
              </div>
            ) : (
              <p className="text-sm text-zinc-500">No reviews yet — be the first to review this product.</p>
            )}
          </div>
          <div className="rounded-lg border border-zinc-200 p-5">
            <h2 className="mb-3 text-lg font-bold text-brand-950">Shipping & Returns</h2>
            <ul className="space-y-2 text-sm text-zinc-600">
              <li>· Free shipping over $75 on parts & accessories</li>
              <li>· Firearms ship to your local FFL dealer</li>
              <li>· 30-day hassle-free returns</li>
              <li>· Live inventory from authorized distributors</li>
            </ul>
          </div>
        </section>
      </div>

      {related.length > 0 && (
        <ProductCarousel
          title="You May Also Like"
          products={related}
          viewAll={`Shop all ${product.category}`}
        />
      )}
    </>
  );
}
