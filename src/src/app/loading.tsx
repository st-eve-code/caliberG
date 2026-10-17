export default function Loading() {
  return (
    <div className="container-x py-10">
      <div className="h-6 w-48 animate-pulse rounded bg-zinc-200" />
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg border border-zinc-200 p-3">
            <div className="aspect-square animate-pulse rounded bg-zinc-200" />
            <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-zinc-200" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
