# Fotos de ambientes para el simulador

Deja aquí las fotos reales de cada ambiente y su máscara de pared:

    sala.jpg        + sala-mask.png
    dormitorio.jpg  + dormitorio-mask.png
    cocina.jpg      + cocina-mask.png
    fachada.jpg     + fachada-mask.png

- Foto: JPG ~1600 px de ancho, buena luz, pared bien visible.
- Máscara: PNG del mismo tamaño. La zona de PARED en blanco (#fff),
  el resto en negro (#000). Bordes con un desenfoque de 2-4 px.
  Se hace una vez en Photoshop / GIMP (o con rembg / Segment Anything).

Luego, en `src/data/rooms.ts`, agrega a cada ambiente:

    photo: "/rooms/sala.jpg",
    mask:  "/rooms/sala-mask.png",

y el simulador usa la foto real automáticamente.
