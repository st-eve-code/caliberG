"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { navGroups, topNavLinks } from "@/lib/data/categories";
import { useCart } from "@/components/providers/CartProvider";
import { config } from "@/lib/config";
import logo from "@/app/logo.png";

const LOGO_W = 599;
const LOGO_H = 417;

function SearchBar() {
  const [q, setQ] = useState("");
  return (
    <form
      action="/search"
      className="relative w-full max-w-xl"
      role="search"
      onSubmit={() => {}}
    >
      <input
        name="q"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search guns, parts, ammo, brands…"
        className="w-full rounded-md border border-zinc-300 bg-white py-2.5 pl-4 pr-12 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
        aria-label="Search"
      />
      <button
        type="submit"
        className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-gold-500 p-1.5 text-brand-950 hover:bg-gold-400"
        aria-label="Search"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </button>
    </form>
  );
}

export function Header() {
  const { count, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const enterMega = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMega(label);
  };
  const leaveMega = () => {
    closeTimer.current = setTimeout(() => setOpenMega(null), 150);
  };

  const activeMegaIndex = navGroups.findIndex((g) => g.label === openMega);
  const activeMegaGroup = activeMegaIndex >= 0 ? navGroups[activeMegaIndex] : null;

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      {/* promo bar */}
      <div className="bg-brand-950 text-white">
        <div className="container-x flex items-center justify-between gap-4 py-2 text-xs">
          <p className="truncate font-medium">
            <span className="font-bold text-gold-400">Daily Deal:</span> Federal
            Gold Medal .308 175gr SMK 200-rd Case{" "}
            <span className="text-zinc-400 line-through">$381.99</span>{" "}
            <span className="font-bold text-gold-400">$299.99</span>{" "}
            <Link href="/deals" className="ml-1 underline underline-offset-2 hover:text-gold-300">
              Shop now
            </Link>
          </p>
          <nav className="hidden shrink-0 gap-4 sm:flex" aria-label="Utility">
            <Link href="/ffl-locator" className="hover:text-gold-300">FFL Locator</Link>
            <Link href="/order-lookup" className="hover:text-gold-300">Order Lookup</Link>
            <Link href="/support" className="hover:text-gold-300">Support</Link>
          </nav>
        </div>
      </div>

      {/* main bar */}
      <div className="container-x flex items-center gap-4 py-3">
        <button
          className="rounded-md p-2 text-brand-950 hover:bg-zinc-100 lg:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Link href="/" className="flex items-center" aria-label="Home">
          <Image
            src={logo}
            alt={config.siteName}
            width={LOGO_W}
            height={LOGO_H}
            priority
            className="h-10 w-auto lg:h-14 xl:h-16"
          />
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link href="/wishlist" className="hidden items-center gap-2 rounded-md p-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 sm:flex" aria-label="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21.2l7.8-7.8 1-1a5.5 5.5 0 000-7.8z" />
            </svg>
            <span className="hidden xl:block">Wish List</span>
          </Link>
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center gap-2 rounded-md p-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
            aria-label="Cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="19" cy="21" r="1.5" />
              <path d="M2.5 3h2.2l2.5 12.2a1.6 1.6 0 0 0 1.6 1.3h9.3a1.6 1.6 0 0 0 1.6-1.3L22 7H6" />
            </svg>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-500 px-1 text-xs font-bold text-brand-950">
                {count}
              </span>
            )}
            <span className="hidden xl:block">Cart</span>
          </button>
        </div>
      </div>

      {/* nav */}
      <nav className="hidden border-t border-zinc-200 bg-brand-950 lg:block" aria-label="Main">
        <div
          className="container-x relative flex items-stretch"
          onMouseLeave={leaveMega}
        >
          <button
            className="flex shrink-0 items-center gap-2 whitespace-nowrap px-3.5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-800 lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            All
          </button>

          {navGroups.map((group, gi) => (
            <div
              key={group.label}
              className="relative shrink-0"
              onMouseEnter={() => enterMega(group.label)}
            >
              <Link
                href={group.href}
                className="flex items-center gap-1 whitespace-nowrap px-3.5 py-3 text-sm font-semibold text-white hover:bg-brand-800"
              >
                {group.label}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </Link>
              {activeMegaGroup?.label === group.label && (
                <div
                  className={`absolute top-full z-50 w-[560px] max-w-[90vw] border-t border-gold-500 bg-white shadow-2xl ${
                    gi > 3 ? "right-0" : "left-0"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-6">
                    {group.groups.map((g) => (
                      <div key={g.title}>
                        <p className="mb-3 text-xs font-extrabold uppercase tracking-wider text-brand-900">
                          {g.title}
                        </p>
                        <ul className="space-y-2">
                          {g.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="text-sm text-zinc-600 hover:text-brand-800"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {group.image && (
                      <Link href={group.href} className="col-span-2 mt-2 block">
                        <Image
                          src={group.image}
                          alt={group.label}
                          width={640}
                          height={220}
                          className="h-36 w-full rounded-md object-cover"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="ml-auto flex shrink-0 items-center">
            {topNavLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="whitespace-nowrap px-3.5 py-3 text-sm font-semibold text-zinc-300 hover:bg-brand-800 hover:text-gold-400"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 flex h-full w-80 max-w-[85vw] flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3">
              <Image
                src={logo}
                alt={config.siteName}
                width={LOGO_W}
                height={LOGO_H}
                className="h-8 w-auto"
              />
              <button onClick={() => setMobileOpen(false)} className="p-1" aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-3 md:hidden">
              <SearchBar />
            </div>
            <nav className="flex-1 overflow-y-auto" aria-label="Mobile">
              <ul className="divide-y divide-zinc-100">
                <li>
                  <Link href="/browse" onClick={() => setMobileOpen(false)} className="flex items-center justify-between px-4 py-3 text-sm font-bold text-brand-950">
                    Shop All
                  </Link>
                </li>
                {navGroups.map((group) => (
                  <li key={group.label}>
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold text-brand-950"
                      onClick={() =>
                        setOpenGroup(openGroup === group.label ? null : group.label)
                      }
                    >
                      {group.label}
                      <span className="text-zinc-400">{openGroup === group.label ? "−" : "+"}</span>
                    </button>
                    {openGroup === group.label && (
                      <ul className="border-t border-zinc-100 bg-zinc-50 pb-2">
                        {group.groups.flatMap((g) => g.items).map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-6 py-2 text-sm text-zinc-600 hover:text-brand-800"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        <li>
                          <Link
                            href={group.href}
                            onClick={() => setMobileOpen(false)}
                            className="block px-6 py-2 text-sm font-semibold text-gold-700"
                          >
                            Shop All {group.label} →
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                ))}
                {topNavLinks.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-sm font-bold text-brand-950">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-zinc-200 px-4 py-3 text-xs text-zinc-500">
              <Link href="/ffl-locator" className="block py-1">FFL Locator</Link>
              <Link href="/support" className="block py-1">Support</Link>
              <Link href="/order-lookup" className="block py-1">Order Lookup</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
