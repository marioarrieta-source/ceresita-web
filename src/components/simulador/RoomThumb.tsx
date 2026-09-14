"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { RoomId } from "@/data/rooms";
import { getRoom } from "@/data/rooms";
import { ART_W, ART_H, paintRoomBase } from "@/lib/roomArt";

/** Miniatura estática de un ambiente (sin recoloreo): foto real si existe. */
export function RoomThumb({
  roomId,
  className,
}: {
  roomId: RoomId;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const room = getRoom(roomId);

  useEffect(() => {
    if (room?.photo) return;
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    paintRoomBase(ctx, roomId);
  }, [roomId, room?.photo]);

  if (room?.photo) {
    return (
      <div className={`relative overflow-hidden ${className ?? ""}`}>
        <Image
          src={room.photo}
          alt={room.nombre}
          fill
          sizes="200px"
          className="object-cover"
        />
      </div>
    );
  }

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
