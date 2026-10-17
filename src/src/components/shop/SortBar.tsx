"use client";

import { useRouter } from "next/navigation";
import { SORTS, buildQueryString } from "@/lib/filter";
import type { Filters } from "@/lib/filter";

export function SortBar({
  filters,
  total,
  title,
  description,
  basePath = "/browse",
}: {
  filters: Filters;
  total: number;
  title?: string;
  description?: string;
  basePath?: string;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        {title && (
          <h1 className="text-2xl font-extrabold tracking-tight text-brand-950">
            {title}
          </h1>
        )}
        <p className="text-sm font-medium text-zinc-500">{total} products</p>
      </div>

      {description && (
        <p className="max-w-2xl text-sm leading-relaxed text-zinc-500">
          {description}
        </p>
      )}

      <div className="mt-1 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3">
        <span className="text-sm font-medium text-zinc-600">Sort by</span>
        <select
          value={filters.sort ?? "relevance"}
          onChange={(e) => {
            const params = { ...filters };
            if (e.target.value !== "relevance") params.sort = e.target.value;
            else delete params.sort;
            router.push(`${basePath}${buildQueryString(params)}`);
          }}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
        >
          {SORTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
