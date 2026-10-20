# Landing — Materiales y Decoraciones MG

Landing page de una sola pieza para **Materiales y Decoraciones MG, C.A.**
(Barquisimeto y Barinas). HTML, CSS y JavaScript puros: **sin build, sin
dependencias, sin npm install**. Se sube tal cual a cualquier hosting.

```
mglandingpage/
├─ index.html              ← toda la estructura y los textos
├─ manifest.webmanifest    ← PWA (usa los iconos de /iconos)
├─ assets/
│  ├─ css/styles.css       ← sistema de diseño completo
│  └─ js/main.js           ← interacciones (tema, scroll, contadores…)
├─ iconos/                 ← iconos ya existentes (192, 512, maskable, apple)
├─ logo-mg.png             ← logo usado en el header y el footer
└─ logo-mg-antiguo.png     ← no se usa, queda de respaldo
```

---

## ⚠️ Antes de publicar: datos por confirmar

Busca en `index.html` los comentarios `✏️ EDITAR`. Son los puntos donde puse
un valor razonable pero **tienes que verificarlo**:

| Dónde | Qué revisar |
|---|---|
| `<link rel="canonical">` y etiquetas `og:` | Cambia `materialesydecoracionesmg.com` por tu dominio real |
| Sección `#sucursales` | **Dirección exacta y horario de cada tienda.** Puse "Lun – Sáb · 8:00 a. m. – 5:00 p. m." como marcador |
| Enlaces "Cómo llegar" | Apuntan a una búsqueda en Google Maps. Lo ideal es pegar el enlace directo de tu ficha de Google Business |
| Sección `#faq` | Las respuestas son genéricas (envíos, encargos, factura). Ajústalas a tus políticas reales |
| Teléfono | `+58 426-550-7011` tomado de tu Instagram. Si hay un número distinto por sucursal, duplícalo |

> No incluí testimonios de clientes: inventarlos sería publicar reseñas falsas.
> Cuando tengas reseñas reales (capturas de WhatsApp, comentarios de IG), dime y
> armamos la sección con las de verdad.

---

## 📸 Fotos

Las cuatro fotos del equipo viven en `assets/img/` y alimentan la sección
**"Quien te atiende conoce la obra"** (`#equipo`):

| Archivo | Dónde sale |
|---|---|
| `equipo-tienda.jpg` | Foto grande de la sección, junto al titular |
| `equipo-perfiles.png` | Tarjeta "Perfilería y láminas" |
| `equipo-tornilleria.png` | Tarjeta "Tornillería y anclajes" |
| `equipo-impermeabilizantes.png` | Tarjeta "Impermeabilizantes" |

Los tres PNG son recortes con fondo transparente. Si cambias alguno por otra
foto, ten en cuenta dos cosas:

- **Que el recorte esté limpio.** Un borde blanco sobrante no se nota sobre
  fondo claro, pero sobre este negro se ve como un halo.
- **El encuadre se ajusta con una sola variable.** Cada tarjeta tiene
  `--img-h` en `styles.css` (`.person.p1`, `.p2`, `.p3`): es el alto que ocupa
  la imagen dentro de la tarjeta. Súbelo si la persona se ve pequeña, bájalo
  si queda muy apretada. La imagen siempre se apoya en el borde inferior.

Si quieres poner el **nombre real de cada asesor**, va en el `<strong>` de cada
`<figcaption>` en `index.html` (busca el comentario `✏️ EDITAR` de la sección
`#equipo`), y conviene que el `alt` de la imagen lo diga también.

### Dónde faltan fotos todavía

1. **Cuadrícula de Instagram** — los cuatro `<a class="ig-tile">` son bloques
   de color. Mete dentro de cada uno un `<img src="assets/img/post-1.jpg" alt="">`
   y cambia el enlace al post concreto.
2. **Tarjeta grande de "Cerámica y porcelanato"** — en `styles.css`, regla
   `.art-tiles`. Sustituye el `background` por:
   ```css
   .art-tiles { background: url('../img/ceramica.jpg') center / cover no-repeat; }
   ```

Consejo: exporta en **WebP** a ~1600 px de ancho y deja `loading="lazy"` en
todo lo que esté debajo del hero.

---

## 🎨 Cambiar colores, tipografía o textos

Todo el sistema visual vive en el bloque `@layer tokens` al inicio de
`styles.css`. Tocando cinco variables cambia la página entera:

```css
--brand:        oklch(63% .168 148);  /* verde del logo */
--brand-bright: oklch(76% .185 145);  /* verde claro de acentos */
--brand-deep:   oklch(42% .115 152);  /* verde oscuro */
--accent:       oklch(68% .19 27);    /* rojo del logo */
--font-display: 'Bricolage Grotesque', ...;
```

Los colores están en **OKLCH**: el primer número es luminosidad, el segundo
saturación y el tercero el matiz. Para subir o bajar la intensidad de un color
solo mueve el primer número.

Los textos están todos en `index.html`, en orden de aparición. No hay nada
escondido en el JavaScript.

---

## 🌑 Tema oscuro y contraste

La página es **solo tema oscuro**: no hay interruptor ni versión clara. El
fondo es `oklch(14.5% .013 162)` — negro con una pizca del verde de la marca,
para que no se vea gris muerto.

Sobre negro el contraste se rompe con facilidad, así que **cada color de texto
está medido contra WCAG 2.1 AA** (mínimo 4.5:1 en texto normal, 3:1 en texto
grande y en bordes de controles). Los ratios reales:

| Token | Uso | Sobre fondo | Sobre tarjeta |
|---|---|---|---|
| `--text` | títulos, texto corrido | **17.9:1** | 16.2:1 |
| `--text-soft` | párrafos, subtítulos | **11.4:1** | 10.3:1 |
| `--text-dim` | etiquetas, pie, "HORARIO" | **7.4:1** | 6.7:1 |
| `--brand-bright` | enlaces y acentos verdes | **9.8:1** | 8.9:1 |
| `--accent` | "remodelar" en el titular | **6.3:1** | 5.7:1 |
| `--on-brand` | texto dentro de botones verdes | 5.9:1 sobre `--brand` | |
| `--line-strong` | borde de botones secundarios | 3.6:1 | 3.3:1 |

Tres decisiones que vienen de esa medición y conviene no deshacer:

1. **El botón de WhatsApp lleva texto oscuro, no blanco.** Blanco sobre el
   verde de WhatsApp da 3.6:1 y no pasa AA a ese tamaño de letra.
2. **Los degradados de color (los "blobs") viven en los bordes y en la mitad
   derecha.** Donde dos se solapan, el fondo sube a 2.4:1 — ilegible. Por eso
   ninguno queda debajo de una columna de texto.
3. **El hero y el CTA final llevan un velo** (`.scrim`): una elipse opaca del
   color de fondo, desenfocada, detrás del texto. Garantiza que se lea sobre
   negro puro pase lo que pase con los degradados detrás.

Si cambias el verde o mueves los degradados, vuelve a comprobar el contraste
(DevTools → Inspeccionar → el cuadro de color muestra el ratio).

`--line` (1.6:1) es deliberadamente tenue: solo separa visualmente tarjetas,
no delimita ningún control, y ahí la norma no exige mínimo. Para eso está
`--line-strong`.

---

## 🚀 Publicar

**Opción rápida (gratis):** arrastra la carpeta completa a
[app.netlify.com/drop](https://app.netlify.com/drop). Queda en línea en
segundos. Después conectas tu dominio desde el panel.

**Otras opciones:** Vercel, Cloudflare Pages o GitHub Pages funcionan igual —
es un sitio estático, no necesita servidor ni base de datos. Si tienes hosting
propio (cPanel), sube los archivos a `public_html/` respetando las carpetas.

**Ver en local** mientras editas:

```bash
npx -y serve .
```

---

## 🧱 Qué lleva por dentro

Prácticas actuales de front-end, todas con degradación elegante en navegadores
viejos:

- **Cascade layers** (`@layer`) para que nada pelee por especificidad.
- **OKLCH + `color-mix()`** — paleta perceptualmente uniforme derivada del logo.
- **Scroll-driven animations** nativas (`animation-timeline: view()`), con
  IntersectionObserver de respaldo si el navegador no las soporta.
- **Container queries** en las tarjetas de categoría.
- **Popover API** nativa para el menú móvil (sin JS de apertura/cierre).
- **Tipografía fluida** con `clamp()` — sin saltos entre breakpoints.
- **`prefers-reduced-motion`** respetado en todas las animaciones.
- **SEO**: metadatos Open Graph y datos estructurados `HardwareStore` (JSON-LD)
  con las dos ciudades y el RIF.
- **Accesibilidad**: enlace para saltar al contenido, foco visible, HTML
  semántico y contraste WCAG AA verificado (ver la tabla de arriba).

### Rendimiento
No hay framework ni librerías. Lo único externo es Google Fonts; si quieres
cero peticiones externas, descarga las fuentes a `assets/fonts/` y cámbialas
por `@font-face`.
