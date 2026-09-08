"use client";

import { useCallback, useEffect, useRef } from "react";
import type { RoomId } from "@/data/rooms";
import { getRoom } from "@/data/rooms";
import {
  ART_W,
  ART_H,
  paintRoomBase,
  paintRoomMask,
} from "@/lib/roomArt";
import { recolorWall, loadImage } from "@/lib/roomComposite";

export type BrushMode = "off" | "add" | "erase";

function newCanvas() {
  const c = document.createElement("canvas");
  c.width = ART_W;
  c.height = ART_H;
  return c;
}

/** Dibuja `img` cubriendo ART_W×ART_H manteniendo proporción */
function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const s = Math.max(ART_W / img.width, ART_H / img.height);
  const w = img.width * s;
  const h = img.height * s;
  ctx.clearRect(0, 0, ART_W, ART_H);
  ctx.drawImage(img, (ART_W - w) / 2, (ART_H - h) / 2, w, h);
}

function feather(canvas: HTMLCanvasElement, px: number) {
  const tmp = newCanvas();
  const tctx = tmp.getContext("2d")!;
  tctx.filter = `blur(${px}px)`;
  tctx.drawImage(canvas, 0, 0);
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, ART_W, ART_H);
  ctx.drawImage(tmp, 0, 0);
}

export function PhotoCanvas({
  roomId,
  color,
  light,
  customPhoto,
  brushMode,
  brushSize,
  onWallDrawn,
}: {
  roomId: RoomId;
  color: string;
  light: number;
  customPhoto: string | null;
  brushMode: BrushMode;
  brushSize: number;
  onWallDrawn?: () => void;
}) {
  const viewRef = useRef<HTMLCanvasElement>(null);
  const baseRef = useRef<HTMLCanvasElement | null>(null);
  const maskRef = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number | null>(null);
  const painting = useRef(false);
  const ready = useRef(false);

  const compose = useCallback(() => {
    if (!baseRef.current || !maskRef.current || !viewRef.current) return;
    const out = recolorWall(baseRef.current, maskRef.current, color, { light });
    const v = viewRef.current;
    const ctx = v.getContext("2d")!;
    ctx.clearRect(0, 0, v.width, v.height);
    ctx.drawImage(out, 0, 0, v.width, v.height);
  }, [color, light]);

  const scheduleCompose = useCallback(() => {
    if (raf.current != null) return;
    raf.current = requestAnimationFrame(() => {
      raf.current = null;
      compose();
    });
  }, [compose]);

  // (re)construir base + máscara al cambiar de ambiente o foto
  useEffect(() => {
    let cancelled = false;
    ready.current = false;
    const base = newCanvas();
    const mask = newCanvas();
    const bctx = base.getContext("2d", { willReadFrequently: true })!;
    const mctx = mask.getContext("2d", { willReadFrequently: true })!;

    const finish = () => {
      if (cancelled) return;
      baseRef.current = base;
      maskRef.current = mask;
      ready.current = true;
      compose();
    };

    const genFallback = () => {
      paintRoomBase(bctx, roomId);
      paintRoomMask(mctx, roomId);
      feather(mask, 4);
      finish();
    };
    const r = getRoom(roomId);

    if (customPhoto) {
      loadImage(customPhoto).then((img) => {
        if (cancelled) return;
        drawCover(bctx, img);
        mctx.fillStyle = "#000";
        mctx.fillRect(0, 0, ART_W, ART_H); // el usuario pinta la pared
        finish();
      });
    } else if (r?.photo && r?.mask) {
      Promise.all([loadImage(r.photo), loadImage(r.mask)])
        .then(([pImg, mImg]) => {
          if (cancelled) return;
          drawCover(bctx, pImg);
          mctx.drawImage(mImg, 0, 0, ART_W, ART_H);
          feather(mask, 3);
          finish();
        })
        .catch(genFallback);
    } else {
      genFallback();
    }
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, customPhoto]);

  useEffect(() => {
    if (ready.current) scheduleCompose();
  }, [color, light, scheduleCompose]);

  /* ---- pincel ---- */
  const paintAt = (clientX: number, clientY: number) => {
    if (brushMode === "off" || !maskRef.current || !viewRef.current) return;
    const v = viewRef.current;
    const rect = v.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * ART_W;
    const y = ((clientY - rect.top) / rect.height) * ART_H;
    const ctx = maskRef.current.getContext("2d")!;
    const r = brushSize;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    if (brushMode === "add") {
      ctx.globalCompositeOperation = "source-over";
      g.addColorStop(0, "rgba(255,0,0,1)");
      g.addColorStop(0.7, "rgba(255,0,0,1)");
      g.addColorStop(1, "rgba(255,0,0,0)");
    } else {
      ctx.globalCompositeOperation = "destination-out";
      g.addColorStop(0, "rgba(0,0,0,1)");
      g.addColorStop(0.7, "rgba(0,0,0,1)");
      g.addColorStop(1, "rgba(0,0,0,0)");
    }
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    scheduleCompose();
    onWallDrawn?.();
  };

  return (
    <canvas
      ref={viewRef}
      width={ART_W}
      height={ART_H}
      className="h-full w-full touch-none select-none"
      style={{ cursor: brushMode === "off" ? "default" : "crosshair" }}
      onPointerDown={(e) => {
        if (brushMode === "off") return;
        painting.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        paintAt(e.clientX, e.clientY);
      }}
      onPointerMove={(e) => {
        if (painting.current) paintAt(e.clientX, e.clientY);
      }}
      onPointerUp={() => {
        painting.current = false;
      }}
      onPointerLeave={() => {
        painting.current = false;
      }}
      role="img"
      aria-label={`Vista previa de ${getRoom(roomId)?.nombre ?? "ambiente"} con el color aplicado`}
    />
  );
}
