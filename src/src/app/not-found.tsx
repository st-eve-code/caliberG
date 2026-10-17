import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x flex flex-col items-center py-24 text-center">
      <p className="text-6xl font-black text-brand-950">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-brand-950">
        Page Not Found
      </h1>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        The page you&apos;re looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
        <Link href="/browse" className="btn btn-outline">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
