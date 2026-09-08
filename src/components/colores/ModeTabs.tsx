"use client";

import Link from "next/link";
import { Grid2x2, Disc3 } from "lucide-react";
import { cn } from "@/lib/cn";

export function ModeTabs({ active }: { active: "explorar" | "rueda" }) {
  const tabs = [
    { id: "explorar", label: "Explorar", href: "/colores", icon: Grid2x2 },
    {
      id: "rueda",
      label: "Rueda de color",
      href: "/colores?modo=rueda",
      icon: Disc3,
    },
  ] as const;

  return (
    <div className="inline-flex rounded-full border border-line bg-bg-raised p-1">
      {tabs.map((t) => {
        const on = t.id === active;
        return (
          <Link
            key={t.id}
            href={t.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
              on
                ? "bg-gold text-on-gold"
                : "text-ink-soft hover:bg-white/5 hover:text-ink",
            )}
          >
            <t.icon size={15} />
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}
