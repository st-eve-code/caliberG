import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/shop/Breadcrumbs";
import { config } from "@/lib/config";

export function LegalPage({
  title,
  kicker,
  updated = config.lastUpdated,
  children,
}: {
  title: string;
  kicker?: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="container-x py-10">
      <Breadcrumbs crumbs={[{ name: title }]} />
      <div className="mx-auto mt-6 max-w-3xl">
        {kicker && <p className="section-kicker">{kicker}</p>}
        <h1 className="section-title">{title}</h1>
        {updated && <p className="mt-2 text-xs text-zinc-400">Last updated: {updated}</p>}
        <div className="mt-6 space-y-6 text-sm leading-relaxed text-zinc-600">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-bold tracking-tight text-brand-950">{title}</h2>
      {children}
    </section>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="list-disc space-y-1.5 pl-5">{children}</ul>;
}
