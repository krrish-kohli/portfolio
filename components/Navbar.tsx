"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onPage = (e: Event) => {
      const detail = (e as CustomEvent<number>).detail;
      setScrolled(detail !== 0);
    };
    window.addEventListener("flipbook:page", onPage);
    return () => window.removeEventListener("flipbook:page", onPage);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-space-950/80 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6"
      >
        <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-gradient-to-br from-aurora/20 to-nebula/20 text-sm">
            KK
          </span>
          <span className="hidden sm:block">Krrish Kohli</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-star/70 transition-colors hover:text-star"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-star/80 md:hidden"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/5 px-6 pb-6 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-star/80 transition-colors hover:bg-white/5 hover:text-star"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
