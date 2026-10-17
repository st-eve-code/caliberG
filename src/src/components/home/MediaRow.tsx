import Link from "next/link";
import Image from "next/image";
import { mediaRows } from "@/lib/data/banners";
import { Reveal } from "@/components/home/Reveal";

export function MediaRow() {
  return (
    <section className="py-10">
      <div className="container-x grid gap-4 md:grid-cols-3">
        {mediaRows.map((m, i) => (
          <Reveal key={m.id} delay={i * 0.08}>
            <Link href={m.href} className="group relative block aspect-[3/2] overflow-hidden rounded-lg">
              <Image
                src={m.image}
                alt={m.title}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-5">
                <p
                  className={`text-lg font-extrabold leading-snug ${
                    m.textLight ? "text-white" : "text-brand-950"
                  }`}
                >
                  {m.title}
                </p>
                <span className="inline-flex w-fit items-center gap-1 text-sm font-bold text-gold-400">
                  {m.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
