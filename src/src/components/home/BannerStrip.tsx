import Link from "next/link";
import Image from "next/image";
import { subBanners } from "@/lib/data/banners";
import { Reveal } from "@/components/home/Reveal";

export function BannerStrip() {
  return (
    <section className="py-4">
      <div className="container-x grid gap-4 md:grid-cols-2">
        {subBanners.map((banner, i) => (
          <Reveal key={banner.id} delay={i * 0.1}>
            <Link href={banner.href} className="group relative block overflow-hidden rounded-lg">
              <Image
                src={banner.image}
                alt={banner.title}
                width={900}
                height={280}
                className="h-44 w-full object-cover transition duration-300 group-hover:scale-105 sm:h-52"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950/85 via-brand-950/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-center gap-2 p-6 text-white">
                {banner.kicker && (
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gold-400">
                    {banner.kicker}
                  </p>
                )}
                <p className="max-w-xs text-lg font-extrabold leading-snug sm:text-xl">
                  {banner.title}
                </p>
                {banner.cta && (
                  <span className="mt-1 inline-flex w-fit items-center gap-1 rounded bg-gold-500 px-3 py-1.5 text-xs font-bold text-brand-950">
                    {banner.cta}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
