import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";

export function InfoPage({
  title,
  kicker,
  children,
  cta,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="container-x py-10">
      <Breadcrumbs crumbs={[{ name: title }]} />
      <div className="mx-auto mt-6 max-w-3xl">
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h1 className="section-title">{title}</h1>
        <div className="prose-sm mt-6 space-y-4 text-sm leading-relaxed text-zinc-600">
          {children}
        </div>
        {cta && (
          <a href={cta.href} className="btn btn-primary mt-6">
            {cta.label}
          </a>
        )}
      </div>
    </div>
  );
}
