import type { RoomId } from "@/data/rooms";

/*
  Escenas de referencia generadas en canvas: perspectiva, luz direccional,
  grano y viñeta para que se lean como render y no como vector plano.
  Se reemplazan por FOTOGRAFÍAS reales dejando el archivo en /public/rooms/.

  Cada escena expone:
   - base:  el "cuarto" con la pared en gris neutro iluminado
   - mask:  canal rojo = zona de pared a recolorear (blanco), resto negro
*/

export const ART_W = 1200;
export const ART_H = 750;

/* Puntos de la pared principal en perspectiva */
const WALL = { x0: 190, x1: 1200, y0: 70, y1: 560 };

function grain(ctx: CanvasRenderingContext2D, alpha: number) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const img = ctx.createImageData(w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const v = 120 + Math.random() * 135;
    d[i] = d[i + 1] = d[i + 2] = v;
    d[i + 3] = Math.random() * alpha;
  }
  ctx.putImageData(img, 0, 0);
}

function vignette(ctx: CanvasRenderingContext2D) {
  const g = ctx.createRadialGradient(
    ART_W * 0.5,
    ART_H * 0.45,
    ART_H * 0.3,
    ART_W * 0.5,
    ART_H * 0.5,
    ART_H * 0.95,
  );
  g.addColorStop(0, "rgba(0,0,0,0)");
  g.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, ART_W, ART_H);
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}

/* Rectángulos de pared que NO se recolorean (se restan de la máscara) */
function wallCutouts(room: RoomId): [number, number, number, number][] {
  switch (room) {
    case "sala":
      return [
        [40, 150, 150, 250], // ventana lateral
        [860, 150, 210, 170], // cuadro
      ];
    case "dormitorio":
      return [
        [40, 150, 150, 250],
        [360, 300, 470, 110], // cabecera
        [430, 150, 130, 120],
        [610, 150, 130, 120],
      ];
    case "cocina":
      return [
        [190, 70, 1010, 130], // alacena superior
        [190, 430, 1010, 130], // meseta / mueble bajo
        [40, 150, 150, 250],
      ];
    case "fachada":
      return [
        [500, 250, 180, 320], // puerta
        [230, 210, 150, 170], // ventana izq
        [820, 210, 150, 170], // ventana der
      ];
    default:
      return [];
  }
}

function drawInteriorShell(ctx: CanvasRenderingContext2D) {
  // Cielo raso
  const cg = ctx.createLinearGradient(0, 0, 0, 70);
  cg.addColorStop(0, "#e8e6df");
  cg.addColorStop(1, "#d5d2c9");
  ctx.fillStyle = cg;
  ctx.fillRect(0, 0, ART_W, 70);

  // Pared principal (gris neutro con luz de ventana desde la izquierda)
  const wg = ctx.createLinearGradient(WALL.x0, 0, WALL.x1, ART_H);
  wg.addColorStop(0, "#cfccc4");
  wg.addColorStop(0.5, "#c1beb6");
  wg.addColorStop(1, "#a7a49c");
  ctx.fillStyle = wg;
  ctx.fillRect(WALL.x0, WALL.y0, WALL.x1 - WALL.x0, WALL.y1 - WALL.y0);

  const wl = ctx.createRadialGradient(330, 240, 60, 330, 240, 620);
  wl.addColorStop(0, "rgba(255,247,225,0.5)");
  wl.addColorStop(1, "rgba(255,247,225,0)");
  ctx.fillStyle = wl;
  ctx.fillRect(WALL.x0, WALL.y0, WALL.x1 - WALL.x0, WALL.y1 - WALL.y0);

  // AO arriba y abajo
  const ao1 = ctx.createLinearGradient(0, WALL.y0, 0, WALL.y0 + 90);
  ao1.addColorStop(0, "rgba(0,0,0,0.22)");
  ao1.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = ao1;
  ctx.fillRect(WALL.x0, WALL.y0, WALL.x1 - WALL.x0, 90);
  const ao2 = ctx.createLinearGradient(0, WALL.y1 - 90, 0, WALL.y1);
  ao2.addColorStop(0, "rgba(0,0,0,0)");
  ao2.addColorStop(1, "rgba(0,0,0,0.25)");
  ctx.fillStyle = ao2;
  ctx.fillRect(WALL.x0, WALL.y1 - 90, WALL.x1 - WALL.x0, 90);

  // Pared lateral
  ctx.fillStyle = "#8f8c84";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(190, 70);
  ctx.lineTo(190, 560);
  ctx.lineTo(0, 650);
  ctx.closePath();
  ctx.fill();
  const sg = ctx.createLinearGradient(0, 0, 190, 0);
  sg.addColorStop(0, "rgba(0,0,0,0.35)");
  sg.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = sg;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(190, 70);
  ctx.lineTo(190, 560);
  ctx.lineTo(0, 650);
  ctx.closePath();
  ctx.fill();

  // Piso
  const fg = ctx.createLinearGradient(0, 560, 0, 750);
  fg.addColorStop(0, "#b48a5f");
  fg.addColorStop(1, "#7c5a3a");
  ctx.fillStyle = fg;
  ctx.beginPath();
  ctx.moveTo(0, 650);
  ctx.lineTo(190, 560);
  ctx.lineTo(1200, 560);
  ctx.lineTo(1200, 750);
  ctx.lineTo(0, 750);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.14)";
  ctx.beginPath();
  ctx.moveTo(0, 650);
  ctx.lineTo(190, 560);
  ctx.lineTo(1200, 560);
  ctx.lineTo(1200, 610);
  ctx.lineTo(0, 690);
  ctx.closePath();
  ctx.fill();

  // Ventana lateral
  ctx.fillStyle = "#dfe9ee";
  ctx.fillRect(40, 150, 150, 250);
  ctx.strokeStyle = "#f2f0e9";
  ctx.lineWidth = 10;
  ctx.strokeRect(40, 150, 150, 250);
  ctx.beginPath();
  ctx.moveTo(115, 155);
  ctx.lineTo(115, 395);
  ctx.moveTo(45, 275);
  ctx.lineTo(185, 275);
  ctx.stroke();
}

function drawFurniture(ctx: CanvasRenderingContext2D, room: RoomId) {
  ctx.save();
  ctx.filter = "blur(1.5px)";

  const dark = "rgba(28,26,24,0.82)";
  const soft = "rgba(40,44,52,0.72)";

  if (room === "sala") {
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    ctx.beginPath();
    ctx.ellipse(640, 660, 360, 46, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = soft;
    roundRect(ctx, 400, 430, 430, 150, 26);
    ctx.fillStyle = "rgba(60,66,76,0.75)";
    roundRect(ctx, 388, 392, 450, 70, 24);
    ctx.fillStyle = dark;
    ctx.fillRect(300, 300, 12, 300); // lámpara
    roundRect(ctx, 268, 262, 78, 42, 8);
    ctx.fillStyle = "rgba(20,20,18,0.9)"; // cuadro
    ctx.fillRect(860, 150, 210, 170);
    ctx.fillStyle = "rgba(210,205,190,0.85)";
    ctx.fillRect(878, 168, 174, 134);
  } else if (room === "dormitorio") {
    ctx.fillStyle = "rgba(0,0,0,0.16)";
    ctx.beginPath();
    ctx.ellipse(620, 660, 340, 42, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "rgba(70,54,40,0.85)"; // cabecera
    roundRect(ctx, 360, 300, 470, 120, 12);
    ctx.fillStyle = "rgba(225,220,208,0.9)"; // colchón / edredón
    roundRect(ctx, 350, 410, 500, 150, 16);
    ctx.fillStyle = "rgba(200,206,200,0.9)";
    roundRect(ctx, 350, 410, 500, 46, 16);
    ctx.fillStyle = dark;
    roundRect(ctx, 250, 470, 100, 100, 8);
    ctx.fillStyle = "rgba(20,20,18,0.9)";
    ctx.fillRect(430, 150, 130, 120);
    ctx.fillRect(610, 150, 130, 120);
  } else if (room === "cocina") {
    ctx.fillStyle = "rgba(235,233,226,0.95)"; // alacena superior
    ctx.fillRect(190, 70, 1010, 130);
    ctx.fillStyle = "rgba(60,64,72,0.9)"; // meseta
    ctx.fillRect(190, 430, 1010, 34);
    ctx.fillStyle = "rgba(225,223,216,0.95)"; // mueble bajo
    ctx.fillRect(190, 464, 1010, 96);
    ctx.fillStyle = "rgba(0,0,0,0.12)";
    ctx.fillRect(190, 200, 1010, 8);
  } else {
    ctx.restore();
    return;
  }
  ctx.restore();
}

function drawFacade(ctx: CanvasRenderingContext2D) {
  const wg = ctx.createLinearGradient(0, 0, ART_W, ART_H);
  wg.addColorStop(0, "#cbc8c0");
  wg.addColorStop(0.5, "#bdbab2");
  wg.addColorStop(1, "#a09d95");
  ctx.fillStyle = wg;
  ctx.fillRect(0, 0, ART_W, 580);

  const sun = ctx.createRadialGradient(280, 160, 60, 280, 160, 700);
  sun.addColorStop(0, "rgba(255,244,214,0.45)");
  sun.addColorStop(1, "rgba(255,244,214,0)");
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, ART_W, 580);

  // techo
  ctx.fillStyle = "#5c5750";
  ctx.fillRect(0, 0, ART_W, 46);
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(0, 46, ART_W, 16);

  // piso / jardín
  const fg = ctx.createLinearGradient(0, 580, 0, 750);
  fg.addColorStop(0, "#8a8f5f");
  fg.addColorStop(1, "#5f6440");
  ctx.fillStyle = fg;
  ctx.fillRect(0, 580, ART_W, 170);

  // puerta
  ctx.fillStyle = "rgba(48,40,32,0.9)";
  ctx.fillRect(500, 250, 180, 330);
  ctx.fillStyle = "rgba(0,0,0,0.25)";
  ctx.fillRect(500, 250, 180, 12);
  // ventanas
  for (const x of [230, 820]) {
    ctx.fillStyle = "#cfe0e8";
    ctx.fillRect(x, 210, 150, 170);
    ctx.strokeStyle = "#efeee7";
    ctx.lineWidth = 12;
    ctx.strokeRect(x, 210, 150, 170);
  }

  vignette(ctx);
  const gr = document.createElement("canvas");
  gr.width = ART_W;
  gr.height = ART_H;
  grain(gr.getContext("2d")!, 26);
  ctx.globalAlpha = 0.5;
  ctx.drawImage(gr, 0, 0);
  ctx.globalAlpha = 1;
}

export function paintRoomBase(
  ctx: CanvasRenderingContext2D,
  room: RoomId,
): void {
  ctx.clearRect(0, 0, ART_W, ART_H);
  if (room === "fachada") {
    drawFacade(ctx);
    return;
  }
  drawInteriorShell(ctx);
  drawFurniture(ctx, room);
  vignette(ctx);
  const gr = document.createElement("canvas");
  gr.width = ART_W;
  gr.height = ART_H;
  grain(gr.getContext("2d")!, 24);
  ctx.globalAlpha = 0.5;
  ctx.drawImage(gr, 0, 0);
  ctx.globalAlpha = 1;
}

export function paintRoomMask(
  ctx: CanvasRenderingContext2D,
  room: RoomId,
): void {
  ctx.clearRect(0, 0, ART_W, ART_H);
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, ART_W, ART_H);
  ctx.fillStyle = "#ff0000";

  if (room === "fachada") {
    ctx.fillRect(0, 62, ART_W, 518);
  } else {
    ctx.fillRect(WALL.x0, WALL.y0, WALL.x1 - WALL.x0, WALL.y1 - WALL.y0);
  }

  ctx.fillStyle = "#000";
  for (const [x, y, w, h] of wallCutouts(room)) {
    ctx.fillRect(x, y, w, h);
  }
}
