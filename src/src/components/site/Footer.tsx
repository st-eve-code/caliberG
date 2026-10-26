import Link from "next/link";
import { footerGroups } from "@/lib/data/categories";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { config, formattedAddress } from "@/lib/config";

const socials = [
  { name: "facebook", href: config.socials.facebook },
  { name: "youtube", href: config.socials.youtube },
  { name: "instagram", href: config.socials.instagram },
  { name: "tiktok", href: config.socials.tiktok },
  { name: "x", href: config.socials.x },
  { name: "linkedin", href: config.socials.linkedin },
].filter((s) => s.href);

const legalLinks = [
  { name: "Shipping & Returns", href: "/shipping" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "State Restrictions", href: "/state-restrictions" },
];

export function Footer() {
  return (
    <footer className="bg-brand-950 text-zinc-400">
      {/* newsletter */}
      <div className="border-b border-white/10 bg-brand-900/60">
        <div className="container-x flex flex-col items-center gap-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xl font-extrabold text-white">
              New Subs Save 10% on First Order{" "}
              <span className="text-gold-400">+$100!</span>
            </p>
            <p className="mt-1 text-sm">
              Plus receive emails on future promotions, content and more.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* support / location / legal */}
      <div className="border-b border-white/10">
        <div className="container-x grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">
              Customer Support
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={config.phoneHref} className="hover:text-gold-400">
                  {config.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${config.supportEmail}`}
                  className="break-all hover:text-gold-400"
                >
                  {config.supportEmail}
                </a>
              </li>
              <li className="text-zinc-500">{config.supportHours}</li>
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">
              Visit Us
            </p>
            <address className="space-y-1 text-sm not-italic">
              <p>{config.address.line1}</p>
              {config.address.line2 ? <p>{config.address.line2}</p> : null}
              <p>
                {config.address.city}, {config.address.state}{" "}
                {config.address.zip}
              </p>
              <p>{config.address.country}</p>
            </address>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                formattedAddress
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs font-semibold text-gold-400 hover:underline"
            >
              Get directions
            </a>
          </div>

          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">
              Legal
            </p>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-gold-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 text-sm font-extrabold uppercase tracking-wider text-white">
              Order &amp; Pay
            </p>
            <p className="text-sm">
              Every order is confirmed by hand. Message us on WhatsApp to place
              an order or send payment confirmation.
            </p>
            <a
              href={`https://wa.me/${config.whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-3 text-xs"
            >
              {config.whatsappLabel}
            </a>
          </div>
        </div>
      </div>

      {/* link columns */}
      <div className="container-x grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {footerGroups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <p className="mb-4 text-sm font-extrabold uppercase tracking-wider text-white">
              {group.title}
            </p>
            <ul className="space-y-2.5 text-sm">
              {group.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-gold-400">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* bottom */}
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center gap-4 py-6 text-xs sm:flex-row sm:justify-between">
          <p>
            © {config.copyrightYear}, {config.copyrightOwner}. All rights
            reserved. For display purposes only.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex gap-2" aria-label="Order methods">
              {["WHATSAPP"].map((p) => (
                <span
                  key={p}
                  className="rounded border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-bold text-zinc-300"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a key={s.name} href={s.href} aria-label={s.name} className="text-zinc-400 hover:text-gold-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className="pb-6 text-center text-[11px] text-zinc-600">
          Firearms ship only to licensed FFL dealers. You must be 18+ (long guns) or 21+ (handguns)
          and comply with all federal, state and local laws.
        </p>
      </div>
    </footer>
  );
}
