"use client";

import type { Store } from "@/data/stores";

/*
  Contorno real de Perú (frontera oficial, simplificada de ~1700 a ~200
  puntos con Douglas-Peucker) proyectado a este viewBox 400×600 con
  escala uniforme lon/lat — así la silueta se reconoce como el país real
  y no una forma abstracta. Generado una vez a partir de datos públicos
  de fronteras (paquete `world-countries`), sin dependencia en runtime.
*/
const PERU_PATH =
  "M106.7 183.8 L107.7 176.8 L111.2 166.8 L114.6 162.4 L116.1 154.5 L117.9 154.3 L118.8 156.9 L120.4 155.1 L119.4 152.3 L128.2 143.4 L158.4 133.0 L173.2 121.9 L186.2 106.8 L190.2 91.4 L194.9 92.4 L193.0 86.5 L194.1 82.1 L190.0 78.8 L188.1 73.8 L184.6 72.5 L184.7 70.8 L189.8 72.2 L194.2 71.1 L195.5 68.9 L203.7 73.9 L206.2 73.4 L207.8 77.3 L216.1 82.4 L219.9 94.0 L236.8 102.7 L239.6 108.6 L238.4 112.7 L243.3 115.4 L245.8 113.6 L247.5 114.7 L249.4 122.1 L247.5 124.7 L248.0 127.1 L252.5 128.5 L253.8 131.3 L261.0 128.8 L270.3 131.1 L276.4 127.8 L278.9 128.2 L283.7 122.3 L284.4 124.3 L288.3 124.5 L292.3 127.4 L296.6 127.6 L304.8 124.2 L312.0 130.8 L319.0 131.2 L324.2 136.0 L324.8 137.6 L308.3 163.5 L313.5 165.5 L318.4 164.0 L327.6 174.3 L327.2 176.8 L321.4 177.4 L318.4 172.5 L311.8 174.0 L307.2 172.7 L302.6 178.6 L297.0 178.1 L285.0 181.9 L278.5 182.1 L266.6 188.8 L264.0 192.8 L254.6 197.4 L251.7 210.8 L245.0 221.9 L247.7 230.8 L246.0 233.4 L241.9 234.1 L232.0 241.6 L230.6 246.8 L233.1 252.5 L227.3 253.8 L225.3 258.4 L233.1 264.4 L231.3 268.7 L234.5 270.6 L237.4 278.9 L251.7 294.8 L251.7 298.8 L245.6 305.5 L257.6 305.6 L268.3 308.6 L269.2 314.0 L272.3 317.5 L271.4 320.5 L293.8 320.4 L313.5 306.0 L311.2 309.7 L310.7 316.3 L310.6 345.9 L313.1 344.0 L318.2 347.4 L328.3 343.5 L337.4 344.4 L360.0 383.6 L352.4 392.9 L352.8 408.8 L350.2 414.0 L355.5 426.4 L351.8 427.5 L352.2 431.0 L346.0 435.9 L342.5 441.6 L342.1 445.9 L348.3 452.8 L345.0 454.9 L341.1 462.2 L346.4 475.9 L348.4 477.5 L352.7 477.1 L356.2 480.4 L350.9 483.8 L351.5 488.4 L336.2 502.5 L335.2 504.3 L339.1 506.7 L339.2 509.9 L334.5 513.8 L330.8 514.2 L332.3 521.6 L327.4 528.8 L316.3 531.1 L293.7 515.1 L291.3 507.3 L288.7 504.6 L280.4 501.9 L264.6 489.7 L256.1 487.8 L242.5 480.2 L229.7 475.9 L224.1 470.7 L199.2 458.5 L187.3 444.5 L176.8 438.0 L175.4 433.2 L169.2 425.3 L167.7 419.0 L165.2 418.8 L165.9 416.5 L168.3 417.7 L170.1 406.7 L162.7 397.3 L154.9 380.7 L146.8 372.9 L144.8 362.3 L140.5 357.1 L133.4 353.1 L134.5 350.4 L132.7 344.0 L122.9 328.6 L111.5 299.6 L107.4 295.0 L105.2 284.8 L101.2 280.6 L99.7 275.7 L90.7 267.3 L81.4 247.7 L74.6 238.8 L57.3 227.6 L44.5 221.7 L45.0 215.9 L50.8 215.8 L52.2 210.7 L49.9 205.2 L43.6 199.1 L44.4 196.0 L46.8 194.8 L40.0 186.5 L41.6 176.8 L52.2 166.1 L53.5 162.7 L60.8 156.5 L64.5 155.9 L65.6 153.4 L67.8 154.4 L70.3 166.1 L66.2 169.4 L62.4 168.7 L62.3 174.1 L65.7 174.1 L62.4 180.1 L65.0 180.8 L70.8 176.2 L78.9 181.1 L83.0 179.9 L92.1 193.3 L98.0 194.5 L102.5 186.1 L106.7 183.8 Z";

/*
  Posición de cada ciudad (centro real proyectado) + desplazamiento de su
  etiqueta de texto. Lima y Callao quedan casi superpuestas a esta escala,
  así que sus etiquetas usan un offset propio en vez del genérico
  (derecha-arriba) para no chocar entre sí.
*/
const CITY_LABEL_POS: Record<
  string,
  { x: number; y: number; dx?: number; dy?: number }
> = {
  Lima: { x: 148.8, y: 372.1, dx: 12, dy: -26 },
  Callao: { x: 132, y: 366, dx: -58, dy: 4 },
  Arequipa: { x: 287.7, y: 482.2 },
  Trujillo: { x: 98.7, y: 272.8 },
  Cusco: { x: 276.9, y: 409.6 },
  Piura: { x: 58.2, y: 199.2 },
};

export function PeruMap({
  stores,
  activeCiudad,
  activeId,
  onHover,
  onSelect,
}: {
  /** Todas las tiendas a nivel nacional (no solo la ciudad filtrada) */
  stores: Store[];
  /** Ciudad actualmente seleccionada en los filtros */
  activeCiudad: string;
  activeId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  const cities = Array.from(new Set(stores.map((s) => s.ciudad)));

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

      {/* Ciudades fuera del filtro actual primero (atenuadas, debajo) */}
      {stores
        .filter((s) => s.ciudad !== activeCiudad)
        .map((s) => (
          <g
            key={s.id}
            transform={`translate(${s.mapPos.x} ${s.mapPos.y}) scale(0.7)`}
            opacity="0.45"
          >
            <path
              d="M0 0 C -7 -13 -9 -18 -9 -24 A 9 9 0 1 1 9 -24 C 9 -18 7 -13 0 0 Z"
              fill="#5a6f9e"
              stroke="#0a1226"
              strokeWidth="1.5"
            />
            <circle cx="0" cy="-24" r="3.4" fill="#0a1226" />
          </g>
        ))}

      {/* Ciudad activa: interactiva, resaltada */}
      {stores
        .filter((s) => s.ciudad === activeCiudad)
        .map((s) => {
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

      {/* Nombre de cada ciudad con puntos de venta */}
      {cities.map((city) => {
        const pos = CITY_LABEL_POS[city];
        if (!pos) return null;
        const on = city === activeCiudad;
        return (
          <text
            key={city}
            x={pos.x + (pos.dx ?? 11)}
            y={pos.y + (pos.dy ?? -20)}
            fontSize={on ? 12 : 10}
            fontWeight={on ? 700 : 500}
            fill={on ? "#f7b500" : "#8fa3cc"}
            className="pointer-events-none select-none"
          >
            {city}
          </text>
        );
      })}
    </svg>
  );
}
