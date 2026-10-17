export function StarRating({ rating }: { rating?: number | null }) {
  if (!rating) {
    return <span className="text-xs text-zinc-400">No reviews yet</span>;
  }
  return (
    <div className="flex items-center gap-1 text-xs text-zinc-500">
      <span className="relative inline-block h-3 w-16">
        <span className="absolute inset-0 text-zinc-200">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden whitespace-nowrap text-gold-500"
          style={{ width: `${(rating / 5) * 100}%` }}
        >
          ★★★★★
        </span>
      </span>
      <span>({rating.toFixed(1)})</span>
    </div>
  );
}
