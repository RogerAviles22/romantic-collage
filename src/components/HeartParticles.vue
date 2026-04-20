<template>
  <!-- ═══════════════════════════════════════════════════
       HeartParticles.vue
       Genera corazones / estrellas que ascienden en el fondo
       (efecto antigravity / floating hacia arriba)
       ═══════════════════════════════════════════════════ -->
  <div class="hearts-container" aria-hidden="true">
    <span
      v-for="heart in hearts"
      :key="heart.id"
      class="heart-particle"
      :style="heart.style"
    >{{ heart.char }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Variedad de partículas románticas
const PARTICLES = ['💕', '❤️', '✨', '💫', '🌸', '💖', '⭐', '🌺', '💗', '✿']
const PARTICLE_COUNT = 18

const hearts = ref([])
let intervalId = null

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

function createHeart(id) {
  const duration = randomBetween(6, 14)
  const delay = randomBetween(0, 12)
  const leftPos = randomBetween(2, 96)
  const size = randomBetween(0.9, 2.0)
  const char = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]

  return {
    id,
    char,
    style: {
      left: `${leftPos}%`,
      fontSize: `${size}rem`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      opacity: 0,
    },
  }
}

onMounted(() => {
  // Crear partículas iniciales
  hearts.value = Array.from({ length: PARTICLE_COUNT }, (_, i) => createHeart(i))

  // Regenerar algunas partículas periódicamente para mantener vida
  let counter = PARTICLE_COUNT
  intervalId = setInterval(() => {
    const replaceIdx = Math.floor(Math.random() * PARTICLE_COUNT)
    hearts.value[replaceIdx] = createHeart(counter++)
  }, 3000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<style scoped>
.hearts-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
</style>
