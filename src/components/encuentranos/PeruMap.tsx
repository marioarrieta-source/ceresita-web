"use client";

import type { Store } from "@/data/stores";

const PERU_PATH =
  "M148 34 L206 44 L232 70 L268 96 L306 150 L326 214 L338 286 L322 344 " +
  "L296 392 L274 452 L236 512 L206 566 L172 552 L150 500 L128 470 L108 430 " +
  "L96 372 L86 306 L74 236 L70 168 L84 104 L112 58 Z";

export function PeruMap({
  stores,
  activeId,
  onHover,
  onSelect,
}: {
  stores: Store[];
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 400 600"
      className="h-full w-full"
      role="img"
      aria-label="Mapa de puntos de venta en Perú"
    >
      <defs>
        <linearGradient id="pm-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#16294f" />
          <stop offset="1" stopColor="#0e1a38" />
        </linearGradient>
      </defs>

      {/* Mar (líneas de costa) */}
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M${20 + i * 12} 120 q 20 40 0 80 q -20 40 0 80 q 20 40 0 80 q -20 40 0 80`}
          fill="none"
          stroke="#22406e"
          strokeWidth="2"
          opacity={0.5 - i * 0.13}
        />
      ))}

      <path
        d={PERU_PATH}
        fill="url(#pm-fill)"
        stroke="#2f4f86"
        strokeWidth="2.5"
      />

      {stores.map((s) => {
        const on = s.id === activeId;
        return (
          <g
            key={s.id}
            transform={`translate(${s.mapPos.x} ${s.mapPos.y})`}
            className="cursor-pointer"
            onMouseEnter={() => onHover(s.id)}
            onMouseLeave={() => onHover(null)}
            onClick={() => onSelect(s.id)}
          >
            {on && (
              <circle r="16" fill="#f7b500" opacity="0.25">
                <animate
                  attributeName="r"
                  from="8"
                  to="20"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.35"
                  to="0"
                  dur="1.4s"
                  repeatCount="indefinite"
                />
              </circle>
            )}
            <path
              d="M0 0 C -7 -13 -9 -18 -9 -24 A 9 9 0 1 1 9 -24 C 9 -18 7 -13 0 0 Z"
              fill={on ? "#f7b500" : "#c99400"}
              stroke="#0a1226"
              strokeWidth="1.5"
              transform={on ? "scale(1.15)" : "scale(1)"}
            />
            <circle cx="0" cy="-24" r="3.4" fill="#0a1226" />
          </g>
        );
      })}
    </svg>
  );
}
