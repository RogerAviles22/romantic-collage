<template>
  <!-- ═══════════════════════════════════════════════════════════
       App.vue — Romantic Collage SPA
       Tecnologías: Vue 3 (Composition API) + Tailwind CSS
       ═══════════════════════════════════════════════════════════ -->
  <div class="app-wrapper relative min-h-screen">

    <!-- ── FONDO: Partículas de corazones antigravity ── -->
    <HeartParticles />

    <!-- ── HEADER: Título principal ── -->
    <header class="relative z-10 pt-12 pb-6 px-4 text-center" id="inicio">
      <!-- Subtítulo superior -->
      <p
        class="text-xs uppercase tracking-widest mb-3 fade-slide-up"
        style="color: rgba(255,107,157,0.6); font-family: var(--font-romantic); --delay: 0.1s;"
      >
        ✦ Un mensaje especial ✦
      </p>

      <!-- Título principal con shimmer -->
      <h1
        class="shimmer-text fade-slide-up"
        style="
          font-family: var(--font-script);
          font-size: clamp(2rem, 8vw, 3rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          --delay: 0.25s;
        "
      >
        Para Ti, Con Todo<br />Mi Amor
      </h1>

      <!-- Emoji animado -->
      <div class="mt-3 fade-slide-up" style="--delay: 0.4s;">
        <span style="font-size: 2.5rem; animation: heartBeat 2s ease-in-out infinite; display: inline-block;">💝</span>
      </div>

      <!-- Separador decorativo -->
      <div class="romantic-divider mt-5 mx-8 fade-slide-up" style="--delay: 0.5s;">
        <span style="color: rgba(255,107,157,0.5); font-size: 0.7rem;">❦</span>
      </div>
    </header>

    <!-- ── CONTENIDO PRINCIPAL ── -->
    <main class="relative z-10 pb-32" id="main-content">

      <!-- Iteramos sobre las 4 cartas románticas -->
      <section
        v-for="(letter, idx) in letters"
        :key="`seccion-${idx}`"
        class="mb-6"
        :id="`seccion-${idx}`"
      >
        <!-- Carta romántica con frase -->
        <div class="py-4">
          <RomanticCard
            :phrase="letter.phrase"
            :icon="letter.icon"
            :card-index="idx"
            :delay="`${idx * 0.15}s`"
          />
        </div>

        <!-- Galería de 4 fotos después de cada carta -->
        <PhotoGallery
          v-if="galleries[idx]"
          :photos="galleries[idx]"
          :gallery-id="idx"
          @open-photo="openPhoto"
        />

        <!-- Divisor entre secciones (excepto después de la última carta) -->
        <div v-if="idx < letters.length - 1" class="flex justify-center my-8">
          <span style="color: rgba(255,107,157,0.3); font-size: 1.5rem; letter-spacing: 0.5rem;">
            ♥ ♥ ♥
          </span>
        </div>
      </section>

      <!-- ── SECCIÓN FINAL: Pregunta especial ── -->
      <section id="propuesta" class="mt-8 mb-6">
        <!-- Separador especial antes de la propuesta -->
        <div class="text-center mb-6">
          <div class="romantic-divider mx-8">
            <span style="color: rgba(255,107,157,0.5); font-size: 0.8rem;">❦</span>
          </div>
          <p class="mt-3 text-xs uppercase tracking-widest" style="color: rgba(255,107,157,0.5); font-family: var(--font-romantic);">
            Y ahora...
          </p>
        </div>

        <FinalQuestion />
      </section>

      <!-- ── PIE DE PÁGINA ── -->
      <footer class="text-center py-8 px-4" id="footer">
        <div class="romantic-divider mx-8 mb-4">
          <span style="color: rgba(255,107,157,0.3); font-size: 0.7rem;">❦</span>
        </div>
        <p style="font-family: var(--font-script); color: rgba(255,214,214,0.4); font-size: 1rem;">
          Hecho con amor, solo para ti 💕
        </p>
      </footer>
    </main>

    <!-- ── AUDIO PLAYER flotante ── -->
    <AudioPlayer
      :is-playing="isPlaying"
      :is-muted="isMuted"
      :current-song-name="currentSongName"
      @toggle-play="togglePlay"
      @toggle-mute="toggleMute"
      @next-song="nextSong"
    />

    <!-- ── LIGHTBOX para fotos ── -->
    <PhotoLightbox :src="activePhoto" @close="closePhoto" />

  </div>
</template>

<script setup>
import { onMounted } from 'vue'

// Componentes
import HeartParticles from './components/HeartParticles.vue'
import RomanticCard   from './components/RomanticCard.vue'
import PhotoGallery   from './components/PhotoGallery.vue'
import FinalQuestion  from './components/FinalQuestion.vue'
import AudioPlayer    from './components/AudioPlayer.vue'
import PhotoLightbox  from './components/PhotoLightbox.vue'

// Composables
import { usePhotos } from './composables/usePhotos.js'
import { useAudio  } from './composables/useAudio.js'

// ─────────────────────────────────────────────────────────
// DATOS: Array de 4 cartas románticas
// ← PERSONALIZA AQUÍ las frases para tu persona especial
// ─────────────────────────────────────────────────────────
const letters = [
  {
    icon: '🌹',
    phrase:
      'Desde que llegaste a mi vida, cada mañana tiene un color diferente. ' +
      'Tu sonrisa es lo primero que imagino al despertar y lo último que pienso antes de dormir.',
  },
  {
    icon: '✨',
    phrase:
      'Hay cosas en este mundo que no tienen explicación, y tú eres una de ellas. ' +
      'No sé cómo alguien puede ser tan perfecta, pero aquí estás, haciéndome creer en la magia.',
  },
  {
    icon: '💫',
    phrase:
      'Cuando estoy contigo, el tiempo se detiene y a la vez vuela. ' +
      'Quisiera quedarme en cada uno de esos momentos contigo para siempre, ' +
      'guardándolos como el tesoro más grande de mi vida.',
  },
  {
    icon: '💕',
    phrase:
      'En un universo lleno de posibilidades, elegiría encontrarte en cada una. ' +
      'Eres mi lugar favorito, mi calma y mi aventura al mismo tiempo.',
  },
]

// ─────────────────────────────────────────────────────────
// FOTOS — selección aleatoria por cada carga
// ─────────────────────────────────────────────────────────
const { galleries, activePhoto, openPhoto, closePhoto } = usePhotos()

// ─────────────────────────────────────────────────────────
// AUDIO — canción aleatoria de /public/musica/
// ─────────────────────────────────────────────────────────
const {
  isPlaying,
  isMuted,
  currentSongName,
  initAudio,
  togglePlay,
  toggleMute,
  nextSong,
} = useAudio()

// Inicializar audio cuando el componente está montado
// (el navegador requiere interacción del usuario para autoplay)
onMounted(() => {
  initAudio()
})
</script>

<style>
/* ── Animación del corazón en el header ── */
@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  15%       { transform: scale(1.35); }
  30%       { transform: scale(1); }
  45%       { transform: scale(1.2); }
  60%       { transform: scale(1); }
}

.app-wrapper {
  /* Limita el ancho máximo para experiencia móvil */
  max-width: 480px;
  margin: 0 auto;
}
</style>
