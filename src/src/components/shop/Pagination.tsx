import Link from "next/link";
import { buildQueryString } from "@/lib/filter";
import type { Filters } from "@/lib/filter";

export const PAGE_SIZE = 48;

export function Pagination({
  page,
  total,
  filters,
  basePath,
}: {
  page: number;
  total: number;
  filters: Filters;
  basePath: string;
}) {
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (totalPages <= 1) return null;

  const href = (p: number) => {
    const next: Record<string, string | undefined> = { ...filters, page: String(p) };
    return `${basePath}${buildQueryString(next)}`;
  };

  const window = 2;
  const pages: (number | "gap")[] = [];
  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= window) {
      pages.push(p);
    } else if (pages[pages.length - 1] !== "gap") {
      pages.push("gap");
    }
  }

  const btn =
    "flex h-9 min-w-9 items-center justify-center rounded-md border border-zinc-300 bg-white px-2 text-sm font-semibold text-zinc-700 transition hover:border-brand-600 hover:text-brand-800";

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
      aria-label="Pagination"
    >
      {page > 1 ? (
        <Link href={href(page - 1)} className={btn} rel="prev">
          Prev
        </Link>
      ) : (
        <span className={`${btn} cursor-not-allowed opacity-40`}>Prev</span>
      )}

      {pages.map((p, i) =>
        p === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-sm text-zinc-400">
            …
          </span>
        ) : p === page ? (
          <span
            key={p}
            aria-current="page"
            className="flex h-9 min-w-9 items-center justify-center rounded-md bg-brand-950 px-2 text-sm font-bold text-white"
          >
            {p}
          </span>
        ) : (
          <Link key={p} href={href(p)} className={btn}>
            {p}
          </Link>
        )
      )}

      {page < totalPages ? (
        <Link href={href(page + 1)} className={btn} rel="next">
          Next
        </Link>
      ) : (
        <span className={`${btn} cursor-not-allowed opacity-40`}>Next</span>
      )}

      <p className="mt-3 w-full text-center text-xs text-zinc-500">
        Showing{" "}
        <span className="font-semibold text-zinc-700">
          {(page - 1) * PAGE_SIZE + 1}
        </span>
        {"–"}
        <span className="font-semibold text-zinc-700">
          {Math.min(page * PAGE_SIZE, total)}
        </span>{" "}
        of <span className="font-semibold text-zinc-700">{total.toLocaleString()}</span>{" "}
        products
      </p>
    </nav>
  );
}
