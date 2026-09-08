"use client";

import { useEffect, useRef } from "react";
import type { RoomId } from "@/data/rooms";
import { ART_W, ART_H, paintRoomBase } from "@/lib/roomArt";

/** Miniatura estática de un ambiente (sin recoloreo). */
export function RoomThumb({
  roomId,
  className,
}: {
  roomId: RoomId;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    paintRoomBase(ctx, roomId);
  }, [roomId]);

  return (
    <canvas
      ref={ref}
      width={ART_W}
      height={ART_H}
      className={className}
      aria-hidden
    />
  );
}
