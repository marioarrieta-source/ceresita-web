"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Palette,
  ArrowRight,
  FileDown,
  MapPin,
  RefreshCw,
  Upload,
  Brush,
  Eraser,
  Sun,
} from "lucide-react";
import { rooms, uploadRoom, getRoom, type RoomId } from "@/data/rooms";
import { colors, seasonalColors, type Color } from "@/data/colors";
import { readableText } from "@/lib/color";
import {
  estimatePaint,
  recommendProduct,
  rendimientoM2,
  type Acabado,
} from "@/lib/paint";
import { useCeresita } from "@/lib/store";
import { cn } from "@/lib/cn";
import { CatalogPicker } from "@/components/colores/CatalogPicker";
import {
  PhotoCanvas,
  type BrushMode,
} from "@/components/simulador/PhotoCanvas";
import { RoomThumb } from "@/components/simulador/RoomThumb";

const DEFAULT_COLOR =
  seasonalColors.find((c) => c.familia === "verdes") ??
  seasonalColors.find((c) => c.familia === "azules") ??
  seasonalColors[0] ??
  colors[0];

function NumField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink-faint">
        {label}
      </span>
      <div className="flex items-center rounded-xl border border-line bg-bg px-3 focus-within:border-white/35">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          step={0.1}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full bg-transparent py-2.5 text-sm text-ink outline-none"
        />
        <span className="pl-2 text-xs text-ink-faint">m</span>
      </div>
    </label>
  );
}

export function Simulador() {
  const params = useSearchParams();
  const selectedColor = useCeresita((s) => s.selectedColor);
  const setSelectedColor = useCeresita((s) => s.setSelectedColor);
  const fileRef = useRef<HTMLInputElement>(null);

  const [roomId, setRoomId] = useState<RoomId>("sala");
  const [customPhoto, setCustomPhoto] = useState<string | null>(null);
  const [color, setColor] = useState<Color>(DEFAULT_COLOR);
  const [acabado, setAcabado] = useState<Acabado>("Mate");
  const [ancho, setAncho] = useState(rooms[0].paredRef.ancho);
  const [alto, setAlto] = useState(rooms[0].paredRef.alto);
  const [manos, setManos] = useState(2);
  const [light, setLight] = useState(1);
  const [brushMode, setBrushMode] = useState<BrushMode>("off");
  const [brushSize, setBrushSize] = useState(64);
  const [pickerOpen, setPickerOpen] = useState(false);

  const room = getRoom(roomId)!;

  useEffect(() => {
    const q = params.get("color");
    if (q) {
      const found = colors.find((c) => c.id === q);
      if (found) {
        setColor(found);
        return;
      }
    }
    if (selectedColor) {
      const found = colors.find((c) => c.id === selectedColor.id);
      if (found) setColor(found);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSelectedColor({
      id: color.id,
      nombre: color.nombre,
      codigo: color.codigo,
      hex: color.hex,
    });
  }, [color, setSelectedColor]);

  const changeRoom = (id: RoomId) => {
    setRoomId(id);
    const r = getRoom(id)!;
    setAncho(r.paredRef.ancho);
    setAlto(r.paredRef.alto);
    setBrushMode("off");
  };

  const onUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setCustomPhoto(String(reader.result));
      setRoomId("propia");
      setAncho(uploadRoom.paredRef.ancho);
      setAlto(uploadRoom.paredRef.alto);
      setBrushMode("add");
    };
    reader.readAsDataURL(file);
  };

  const area = useMemo(() => {
    const a = (ancho || 0) * (alto || 0);
    return Math.round(a * 10) / 10;
  }, [ancho, alto]);

  const rec = useMemo(
    () => recommendProduct(acabado, room.uso),
    [acabado, room.uso],
  );
  const est = useMemo(
    () => estimatePaint(area, manos, rendimientoM2(rec.rendimiento)),
    [area, manos, rec],
  );

  const txt = readableText(color.hex);
  const isPropia = roomId === "propia";
  const needsBrush = isPropia && !customPhoto;

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      {/* Vista previa */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-3xl border border-line bg-panel">
          <div className="relative aspect-[8/5] w-full bg-bg">
            {needsBrush ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <Upload size={22} className="text-ink-faint" />
                <p className="text-sm text-ink-soft">
                  Sube una foto de tu espacio para verla pintada.
                </p>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-on-gold hover:bg-gold-soft"
                >
                  Elegir foto
                </button>
              </div>
            ) : (
              <PhotoCanvas
                roomId={roomId}
                color={color.hex}
                light={light}
                customPhoto={isPropia ? customPhoto : null}
                brushMode={brushMode}
                brushSize={brushSize}
              />
            )}

            {!needsBrush && (
              <div
                className="pointer-events-none absolute left-4 top-4 rounded-xl px-3 py-2 text-xs"
                style={{
                  backgroundColor: color.hex,
                  color: txt,
                  boxShadow: "0 8px 24px -12px rgba(0,0,0,0.5)",
                }}
              >
                <p className="font-semibold leading-tight">{color.nombre}</p>
                <p className="opacity-80">
                  {color.codigo} · {color.hex.toUpperCase()}
                </p>
              </div>
            )}
          </div>

          {/* Controles de la vista */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line px-4 py-3">
            <div className="flex items-center gap-2">
              <Sun size={14} className="text-ink-faint" />
              <input
                type="range"
                min={0.7}
                max={1.5}
                step={0.02}
                value={light}
                onChange={(e) => setLight(parseFloat(e.target.value))}
                className="w-24 accent-gold"
                aria-label="Luz"
              />
              <span className="text-xs text-ink-faint">Luz</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() =>
                  setBrushMode((m) => (m === "add" ? "off" : "add"))
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
                  brushMode === "add"
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-line text-ink-soft hover:text-ink",
                )}
              >
                <Brush size={12} />
                Pared
              </button>
              <button
                type="button"
                onClick={() =>
                  setBrushMode((m) => (m === "erase" ? "off" : "erase"))
                }
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold",
                  brushMode === "erase"
                    ? "border-gold bg-gold/15 text-gold"
                    : "border-line text-ink-soft hover:text-ink",
                )}
              >
                <Eraser size={12} />
                Borrar
              </button>
              {brushMode !== "off" && (
                <input
                  type="range"
                  min={24}
                  max={140}
                  step={4}
                  value={brushSize}
                  onChange={(e) => setBrushSize(parseInt(e.target.value))}
                  className="w-20 accent-gold"
                  aria-label="Tamaño del pincel"
                />
              )}
            </div>

            <span className="ml-auto text-[11px] text-ink-faint">
              {isPropia
                ? "Tu foto · resultado real"
                : "Escena de referencia · con foto real se ve fotográfico"}
            </span>
          </div>
        </div>

        <p className="mt-3 text-xs text-ink-faint">
          El color se aplica sobre la zona de pared conservando luces y sombras
          (mezcla tipo «multiply»), la misma técnica de los visualizadores de
          pintura reales. Ajusta la pared con el pincel si hace falta.
        </p>
      </div>

      {/* Controles */}
      <div className="space-y-6">
        {/* 1 · Ambiente */}
        <section className="rounded-2xl border border-line bg-bg-raised p-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-faint">
            1 · Ambiente
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {rooms.map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => changeRoom(r.id)}
                className={cn(
                  "overflow-hidden rounded-xl border text-left transition-colors",
                  roomId === r.id
                    ? "border-gold ring-1 ring-gold"
                    : "border-line hover:border-white/25",
                )}
              >
                <div className="aspect-[3/2] w-full">
                  <RoomThumb roomId={r.id} className="h-full w-full" />
                </div>
                <div className="px-3 py-2">
                  <p className="text-sm font-semibold text-ink">{r.nombre}</p>
                  <p className="text-xs text-ink-soft">{r.descripcion}</p>
                </div>
              </button>
            ))}

            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={cn(
                "flex flex-col items-center justify-center gap-2 rounded-xl border p-4 text-center transition-colors",
                isPropia
                  ? "border-gold ring-1 ring-gold"
                  : "border-dashed border-white/20 hover:border-white/40",
              )}
            >
              <Upload size={18} className="text-gold" />
              <span className="text-sm font-semibold text-ink">Mi foto</span>
              <span className="text-xs text-ink-soft">
                Sube tu espacio y marca la pared
              </span>
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onUpload(f);
              e.target.value = "";
            }}
          />
        </section>

        {/* 2 · Color */}
        <section className="rounded-2xl border border-line bg-bg-raised p-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-faint">
            2 · Color
          </h2>
          <div className="mt-3 flex items-center gap-3">
            <span
              className="h-12 w-12 shrink-0 rounded-lg ring-1 ring-inset ring-white/10"
              style={{ backgroundColor: color.hex }}
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-ink">
                {color.nombre}
              </p>
              <p className="text-xs text-ink-soft">
                {color.codigo} · {color.cartilla}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPickerOpen(true)}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/20 px-3.5 py-2 text-sm font-semibold text-ink hover:bg-white/5"
            >
              <Palette size={15} />
              Cambiar
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {seasonalColors.slice(0, 8).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setColor(c)}
                title={`${c.nombre} · ${c.codigo}`}
                className={cn(
                  "h-8 w-8 rounded-lg ring-1 ring-inset transition-transform hover:-translate-y-0.5",
                  c.id === color.id ? "ring-2 ring-gold" : "ring-white/10",
                )}
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        </section>

        {/* 3 · Acabado y medidas */}
        <section className="rounded-2xl border border-line bg-bg-raised p-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-ink-faint">
            3 · Acabado y medidas
          </h2>
          <div className="mt-3 inline-flex rounded-full border border-line bg-bg p-1">
            {(["Mate", "Satinado"] as Acabado[]).map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => setAcabado(a)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-semibold transition-colors",
                  acabado === a
                    ? "bg-gold text-on-gold"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                {a}
              </button>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <NumField label="Ancho" value={ancho} onChange={setAncho} />
            <NumField label="Alto" value={alto} onChange={setAlto} />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Manos
            </span>
            <div className="inline-flex rounded-full border border-line bg-bg p-1">
              {[1, 2, 3].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setManos(m)}
                  className={cn(
                    "h-8 w-9 rounded-full text-sm font-semibold transition-colors",
                    manos === m
                      ? "bg-gold text-on-gold"
                      : "text-ink-soft hover:text-ink",
                  )}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-ink-soft">
            Área a pintar:{" "}
            <span className="font-semibold text-ink">{area || 0} m²</span>
          </p>
        </section>

        {/* 4 · Resultado */}
        <section className="rounded-2xl border border-gold/30 bg-gold/[0.06] p-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gold">
            4 · Lo que necesitas
          </h2>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display text-3xl text-ink">
              {est.litros.toFixed(1)} L
            </span>
            <span className="text-sm text-ink-soft">
              ≈ {est.envases4L} {est.envases4L === 1 ? "envase" : "envases"} de 4 L
            </span>
          </div>
          <p className="mt-1 text-xs text-ink-faint">
            {area || 0} m² × {manos} {manos === 1 ? "mano" : "manos"} · rendimiento{" "}
            {rendimientoM2(rec.rendimiento)} m²/4L
          </p>

          <div className="mt-4 rounded-xl border border-line bg-bg-raised p-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">
              Producto recomendado
            </p>
            <p className="mt-1 font-display text-lg text-ink">{rec.nombre}</p>
            <p className="text-xs text-ink-soft">
              Acabado {rec.acabado.toLowerCase()} · {rec.usos.join(" · ")} ·{" "}
              {rec.rendimiento}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a
                href={rec.fichaTecnica}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white/5"
              >
                <FileDown size={13} />
                Ficha técnica
              </a>
              <Link
                href={`/productos/${rec.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1.5 text-xs font-semibold text-ink hover:bg-white/5"
              >
                Ver producto
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          <Link
            href="/encuentranos"
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-gold text-sm font-semibold text-on-gold transition-colors hover:bg-gold-soft"
          >
            <MapPin size={16} />
            Dónde comprar
          </Link>
        </section>

        <button
          type="button"
          onClick={() => {
            setColor(DEFAULT_COLOR);
            setAcabado("Mate");
            setManos(2);
            setLight(1);
            setCustomPhoto(null);
            changeRoom("sala");
          }}
          className="inline-flex items-center gap-2 text-xs font-medium text-ink-soft hover:text-ink"
        >
          <RefreshCw size={13} />
          Reiniciar simulación
        </button>
      </div>

      <CatalogPicker
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        title="Elegir color para la pared"
        onPick={(c) => setColor(c)}
      />
    </div>
  );
}
