"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/layout/Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors",
        scrolled || open
          ? "border-b border-line bg-bg/95"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="Ceresita — inicio" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                isActive(item.href)
                  ? "text-gold"
                  : "text-ink-soft hover:bg-white/5 hover:text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Buscar"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-soft hover:bg-white/5 hover:text-ink"
          >
            <Search size={18} />
          </button>

          <Link
            href="/colores"
            className="hidden h-10 items-center whitespace-nowrap rounded-full bg-gold px-4 text-sm font-semibold text-on-gold transition-colors hover:bg-gold-soft md:inline-flex"
          >
            Explorar colores
          </Link>

          <button
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-white/5 md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-bg md:hidden">
          <nav className="container-page flex flex-col py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-xl px-3 py-3 text-base",
                  isActive(item.href)
                    ? "bg-white/5 text-gold"
                    : "text-ink-soft hover:bg-white/5",
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/colores"
              className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-gold px-4 text-base font-semibold text-on-gold"
            >
              Explorar colores
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
