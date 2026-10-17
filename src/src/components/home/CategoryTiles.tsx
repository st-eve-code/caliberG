import Link from "next/link";
import Image from "next/image";
import { categories } from "@/lib/data/categories";
import { Reveal } from "@/components/home/Reveal";

export function CategoryTiles() {
  const tiles = categories.filter((c) => c.slug !== "firearms").slice(0, 8);

  return (
    <section className="py-12">
      <div className="container-x">
        <Reveal>
          <p className="section-kicker">Browse</p>
          <h2 className="section-title">Popular Categories</h2>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {tiles.map((cat, i) => (
            <Reveal key={cat.slug} delay={i * 0.05}>
              <Link
                href={cat.href}
                className="group block"
                aria-label={cat.name}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg bg-brand-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(min-width: 1024px) 12vw, (min-width: 640px) 25vw, 50vw"
                    className="object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <p className="mt-2 text-center text-xs font-bold text-brand-950 group-hover:text-brand-700">
                  {cat.shortName}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
