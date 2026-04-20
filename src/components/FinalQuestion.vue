<template>
  <!-- ═══════════════════════════════════════════════════
       FinalQuestion.vue
       Carta especial: "¿Quieres ser mi novia?"
       - Botón SÍ: con animación de latido
       - Botón NO: se escapa al intentar tocarlo
       ═══════════════════════════════════════════════════ -->
  <div class="px-4 py-6" id="pregunta-final">

    <!-- Tarjeta especial -->
    <div v-if="!answered" class="final-card p-8 relative overflow-hidden">

      <!-- Decoración de fondo en la tarjeta -->
      <div class="absolute inset-0 flex items-center justify-center opacity-5">
        <span style="font-size: 12rem; line-height: 1;">💕</span>
      </div>

      <!-- Ícono central animado -->
      <div class="text-center mb-6 relative z-10">
        <span class="text-6xl block mb-2" style="animation: heartBeat 1.5s ease-in-out infinite;">💍</span>
        <div class="romantic-divider">
          <span style="color: rgba(255,107,157,0.6);">♥</span>
        </div>
      </div>

      <!-- Subtítulo -->
      <p class="text-center text-xs uppercase tracking-widest mb-3 relative z-10" style="color: rgba(255,107,157,0.7); font-family: var(--font-romantic);">
        — Una Pregunta Especial —
      </p>

      <!-- Pregunta principal -->
      <h2
        class="text-center mb-8 relative z-10 shimmer-text"
        style="font-family: var(--font-script); font-size: 2rem; line-height: 1.3; font-weight: 700;"
      >
        ¿Quieres ser mi novia?
      </h2>

      <!-- Botones interactivos -->
      <div class="flex flex-col items-center gap-5 relative z-10" style="min-height: 130px;">

        <!-- Botón SÍ -->
        <button
          id="btn-si"
          class="btn-yes"
          @click="handleYes"
        >
          ¡Sí, quiero! 💕
        </button>

        <!-- Botón NO — se mueve al intentar hacer hover/touch -->
        <div
          class="no-wrapper"
          :style="noPosition"
          ref="noWrapperRef"
        >
          <button
            id="btn-no"
            class="btn-no"
            :class="{ 'is-escaping': isEscaping }"
            @mouseenter="escapeButton"
            @touchstart.prevent="escapeButton"
            @click.prevent="escapeButton"
          >
            No, por ahora...
          </button>
        </div>
      </div>

      <!-- Pequeño hint -->
      <p class="text-center text-xs mt-4 relative z-10" style="color: rgba(255,214,214,0.35); font-style: italic;">
        (el botón "no" no quiere estar quieto 🙈)
      </p>
    </div>

    <!-- Respuesta positiva -->
    <div v-else class="final-card p-10 text-center yes-response">
      <div class="mb-6">
        <span class="text-6xl block" style="animation: heartBeat 1s ease-in-out infinite;">🥰</span>
      </div>
      <h2
        class="shimmer-text mb-4"
        style="font-family: var(--font-script); font-size: 2.2rem; font-weight: 700;"
      >
        ¡Me haces el más feliz del mundo!
      </h2>
      <p class="mb-6" style="font-family: var(--font-romantic); font-style: italic; color: var(--color-champagne); font-size: 1.1rem; line-height: 1.7;">
        Gracias por elegirme. Prometo amarte cada día más
        y ser el mejor para ti. 💕
      </p>
      <div class="romantic-divider mb-4">
        <span style="color: rgba(255,107,157,0.6);">♥</span>
      </div>
      <p class="text-5xl mt-2" style="letter-spacing: 0.3em;">
        💑 💕 🌹
      </p>

      <!-- Confetti de corazones -->
      <div class="confetti-hearts" aria-hidden="true">
        <span v-for="n in 12" :key="n" class="confetti-heart" :style="confettiStyle(n)">
          {{ ['💕','💖','💗','💓','❤️','🌹'][n % 6] }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const answered = ref(false)
const isEscaping = ref(false)
const noWrapperRef = ref(null)

// Posición dinámica del botón NO
const noOffsetX = ref(0)
const noOffsetY = ref(0)

const noPosition = computed(() => ({
  transform: `translate(${noOffsetX.value}px, ${noOffsetY.value}px)`,
  transition: isEscaping.value ? 'transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'transform 0.6s ease',
  position: 'relative',
  zIndex: 10,
}))

/**
 * Hace que el botón NO se mueva a una posición aleatoria
 * dentro de los límites de la tarjeta
 */
function escapeButton() {
  isEscaping.value = true

  const maxX = 100
  const maxY = 40
  const signX = Math.random() > 0.5 ? 1 : -1
  const signY = Math.random() > 0.5 ? 1 : -1

  noOffsetX.value = signX * (Math.random() * maxX + 40)
  noOffsetY.value = signY * (Math.random() * maxY + 10)

  setTimeout(() => {
    isEscaping.value = false
  }, 400)
}

function handleYes() {
  answered.value = true
  // Emitir evento para efectos extra si se necesita
}

function confettiStyle(n) {
  return {
    left: `${(n / 12) * 100}%`,
    animationDelay: `${(n * 0.2) % 2}s`,
    animationDuration: `${2 + (n % 3) * 0.5}s`,
    fontSize: `${1 + (n % 3) * 0.4}rem`,
  }
}
</script>

<style scoped>
.no-wrapper {
  display: inline-block;
}

/* Confetti de corazones al responder SÍ */
.confetti-hearts {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.confetti-heart {
  position: absolute;
  bottom: -10px;
  animation: heartRise linear infinite;
  opacity: 0;
}

@keyframes heartBeat {
  0%, 100% { transform: scale(1); }
  15%       { transform: scale(1.35); }
  30%       { transform: scale(1); }
  45%       { transform: scale(1.2); }
  60%       { transform: scale(1); }
}
</style>
