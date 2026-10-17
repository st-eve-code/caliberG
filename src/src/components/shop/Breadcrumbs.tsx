import Link from "next/link";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-zinc-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-brand-800">
            Home
          </Link>
        </li>
        {crumbs.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-zinc-300">/</span>
            {c.href ? (
              <Link href={c.href} className="hover:text-brand-800">
                {c.name}
              </Link>
            ) : (
              <span className="font-medium text-brand-950">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
