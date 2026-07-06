<template>
  <div class="app-wrapper relative min-h-screen">

    <HeartParticles />

    <Transition name="login-fade">
      <LoginScreen
        v-if="!unlocked"
        @authenticated="onAuthenticated"
        @start-audio="startLoginAudio"
      />
    </Transition>

    <Transition name="content-fade">
      <div v-if="unlocked" class="content-wrapper">

        <header class="relative z-10 pt-12 pb-6 px-4 text-center" id="inicio">
          <p
            class="text-xs uppercase tracking-widest mb-3 fade-slide-up"
            style="color: rgba(255,107,157,0.6); font-family: var(--font-romantic); --delay: 0.1s;"
          >
            ✦ Nuestra bella vida reflejada en pixeles ✦
          </p>


          <div class="mt-3 fade-slide-up" style="--delay: 0.4s;">
            <span style="font-size: 2.5rem; animation: heartBeat 2s ease-in-out infinite; display: inline-block;">💝</span>
          </div>

          <div class="romantic-divider mt-5 mx-8 fade-slide-up" style="--delay: 0.5s;">
            <span style="color: rgba(255,107,157,0.5); font-size: 0.7rem;">❦</span>
          </div>
        </header>

        <main class="relative z-10 pb-32" id="main-content">

          <PhotoCarousel
            :galleries="galleries"
            :letters="letters"
            @open-photo="openPhoto"
          />

          <footer class="text-center py-8 px-4" id="footer">
            <div class="romantic-divider mx-8 mb-4">
              <span style="color: rgba(255,107,157,0.3); font-size: 0.7rem;">❦</span>
            </div>
            <p style="font-family: var(--font-script); color: rgba(255,214,214,0.4); font-size: 1rem;">
              Hecho con amor, solo para ti, mi ámbar 💕
            </p>
          </footer>
        </main>

        <PhotoLightbox :src="activePhoto" @close="closePhoto" />

      </div>
    </Transition>



  </div>
</template>

<script setup>
import { ref } from 'vue'

// Componentes
import HeartParticles from './components/HeartParticles.vue'
import LoginScreen    from './components/LoginScreen.vue'
import PhotoCarousel  from './components/PhotoCarousel.vue'
import AudioPlayer    from './components/AudioPlayer.vue'
import PhotoLightbox  from './components/PhotoLightbox.vue'

const unlocked = ref(false)

function startLoginAudio() {
  playSong(1)
}

function onAuthenticated() {
  unlocked.value = true
  playSong(2)
}

// Composables
import { usePhotos } from './composables/usePhotos.js'
import { useAudio  } from './composables/useAudio.js'

// ─────────────────────────────────────────────────────────
// DATOS: Array de 5 cartas románticas
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
  {
    icon: '🌙',
    phrase:
      'Si me preguntaran qué es la felicidad, no dudaría ni un segundo en decir que es tu risa. ' +
      'Eres lo más bonito que me ha pasado y quiero seguir coleccionando instantes contigo.',
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
  playSong,
  togglePlay,
  toggleMute,
  nextSong,
} = useAudio()
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
  max-width: 480px;
  margin: 0 auto;
}

.content-wrapper {
  position: relative;
}

.login-fade-leave-active {
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.login-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.content-fade-enter-active {
  transition: opacity 0.9s ease 0.3s;
}

.content-fade-enter-from {
  opacity: 0;
}
</style>
