import Image from "next/image";
import { cn } from "@/lib/cn";
import { ImageSlot } from "@/components/ui/ImageSlot";
import type { Product } from "@/data/products";

const glow: Record<string, string> = {
  Látex: "#1f5fc0",
  Sellador: "#2ec9f7",
  Pasta: "#f7b500",
};

/*
  Visual de producto. Marco reservado para la fotografía real del producto,
  con una lata ilustrada de referencia mientras no hay foto.
*/
export function ProductVisual({
  product,
  className,
  size = "md",
}: {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const g = glow[product.categoria] ?? "#1f5fc0";
  const ratio =
    size === "lg" ? "aspect-[16/10]" : size === "sm" ? "aspect-[4/3]" : "aspect-[4/3]";

  return (
    <ImageSlot ratio={ratio} className={className} label="Foto de producto">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-50"
        style={{ background: `radial-gradient(circle, ${g} 0%, transparent 70%)` }}
      />
      <span className="absolute left-4 top-4 z-10 rounded-full border border-line bg-white/5 px-3 py-1 text-xs font-medium text-ink-soft">
        {product.categoria}
      </span>

      <div className="absolute inset-0 flex items-center justify-center">
        {product.imagen ? (
          <Image
            src={product.imagen}
            alt={product.nombre}
            width={220}
            height={242}
            unoptimized
            className={cn(
              "w-auto object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]",
              size === "lg" ? "h-[72%]" : "h-[68%]",
            )}
          />
        ) : (
          <svg
            viewBox="0 0 200 200"
            className={cn(size === "lg" ? "h-[62%]" : "h-[58%]")}
            aria-hidden
          >
            <ellipse cx="100" cy="150" rx="60" ry="12" fill="#000" opacity="0.18" />
            <path d="M56 62 L144 62 L136 150 Q100 162 64 150 Z" fill="#0e1a38" />
            <path
              d="M56 62 L144 62 L136 150 Q100 162 64 150 Z"
              fill="none"
              stroke="#24406e"
              strokeWidth="2"
            />
            <ellipse cx="100" cy="62" rx="44" ry="11" fill="#16294f" />
            <ellipse
              cx="100"
              cy="62"
              rx="44"
              ry="11"
              fill="none"
              stroke="#2f4f86"
              strokeWidth="2"
            />
            <path
              d="M60 64 Q100 22 140 64"
              fill="none"
              stroke="#8494b0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <rect x="60" y="80" width="80" height="34" rx="4" fill="#f4f2ec" />
            <rect x="60" y="114" width="80" height="16" fill={g} />
            <rect
              x="60"
              y="130"
              width="80"
              height="6"
              fill="url(#pv-spectrum)"
              opacity="0.95"
            />
            <defs>
              <linearGradient id="pv-spectrum" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#29c5f6" />
                <stop offset="0.5" stopColor="#c93ccb" />
                <stop offset="1" stopColor="#f7b500" />
              </linearGradient>
            </defs>
            <text
              x="100"
              y="102"
              textAnchor="middle"
              fontSize="13"
              fontWeight="800"
              fill="#123a75"
              fontStyle="italic"
            >
              Ceresita
            </text>
          </svg>
        )}
      </div>
    </ImageSlot>
  );
}
