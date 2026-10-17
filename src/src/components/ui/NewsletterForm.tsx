"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex w-full max-w-md gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {done ? (
        <p className="w-full rounded-md border border-gold-500/40 bg-gold-500/10 px-4 py-2.5 text-sm text-gold-400">
          Thanks — check your inbox for your code.
        </p>
      ) : (
        <>
          <input
            type="email"
            required
            placeholder="Please enter your email"
            className="w-full rounded-md border border-white/15 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-zinc-500 focus:border-gold-500 focus:outline-none"
          />
          <button className="btn btn-primary shrink-0">Subscribe</button>
        </>
      )}
    </form>
  );
}
