# 💕 Romantic Collage — Guía de Archivos

## Estructura de Carpetas (¡solo sube tus archivos aquí!)

```
romantic-collage/
│
├── public/
│   │
│   ├── fotos/          ← 📸 SUBE AQUÍ TUS FOTOS
│   │   ├── foto1.jpg
│   │   ├── foto2.jpg
│   │   ├── foto3.jpg
│   │   │   ... (mínimo 30 fotos, idealmente 35+)
│   │   └── foto30.jpg
│   │
│   └── musica/         ← 🎵 SUBE AQUÍ TUS CANCIONES
│       ├── cancion1.mp3
│       ├── cancion2.mp3
│       │   ...
│       └── cancion5.mp3
│
└── src/
    ├── App.vue                  ← Componente raíz (edita las FRASES aquí)
    ├── main.js
    ├── style.css
    ├── composables/
    │   ├── usePhotos.js         ← Edita TOTAL_PHOTOS con tu número de fotos
    │   └── useAudio.js          ← Edita TOTAL_SONGS con tu número de canciones
    └── components/
        ├── HeartParticles.vue
        ├── RomanticCard.vue
        ├── PhotoGallery.vue
        ├── FinalQuestion.vue
        ├── AudioPlayer.vue
        └── PhotoLightbox.vue
```

## Pasos de Configuración

### 1. Sube tus fotos
- Coloca **mínimo 30 fotos** en `public/fotos/`
- Nómbralas: `foto1.jpg`, `foto2.jpg`, ..., `fotoN.jpg`
- Acepta: `.jpg`, `.jpeg`, `.png`, `.webp`
- Abre `src/composables/usePhotos.js` y cambia:
  ```js
  const TOTAL_PHOTOS = 30  // ← pon aquí tu número total (6 fotos × 5 galerías = 30)
  ```

### 2. Sube tu música
- Coloca tus archivos MP3 en `public/musica/`
- Nómbralos: `cancion1.mp3`, `cancion2.mp3`, ..., `cancionN.mp3`
- Abre `src/composables/useAudio.js` y cambia:
  ```js
  const TOTAL_SONGS = 5  // ← pon aquí tu número total
  ```

### 3. Personaliza las frases (opcional)
- Abre `src/App.vue`
- Busca el comentario `// DATOS: Array de 5 cartas románticas`
- Edita el `phrase` de cada carta con tus propias palabras

### 4. Ejecutar la app

```bash
npm install        # solo la primera vez
npm run dev        # inicia el servidor local
```

Abre en el navegador: `http://localhost:5173`

### 5. Construir para producción

```bash
npm run build      # genera la carpeta dist/
```

Sube el contenido de `dist/` a cualquier hosting estático
(Netlify, Vercel, GitHub Pages, etc.)

---

## Características

- 🎴 **5 Cartas románticas** con efecto floating/antigravity
- 📸 **Galerías en mosaico** — 6 fotos por carta en layout irregular
- 🎲 **Selección aleatoria** — cada recarga muestra fotos diferentes
- 🎵 **Música de fondo** — canción aleatoria de tu carpeta
- 💍 **Propuesta especial** — botón "No" que escapa al tocarlo
- 💕 **Partículas antigravity** — corazones que ascienden en el fondo
- 📱 **Mobile-first** — diseño optimizado para pantallas de teléfono
- 🌙 **Tema oscuro premium** — paleta violeta/rosa/champán
