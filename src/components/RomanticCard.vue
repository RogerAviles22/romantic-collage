<template>
  <!-- ═══════════════════════════════════════════════════
       RomanticCard.vue
       Carta con frase romántica + efecto floating / antigravity
       Props:
         - phrase    : texto principal de la carta
         - icon      : emoji decorativo
         - cardIndex : índice para variar animaciones (0-3)
         - delay     : delay de aparición (string CSS, ej: '0.2s')
       ═══════════════════════════════════════════════════ -->
  <div
    class="romantic-card p-6 mx-4 fade-slide-up"
    :style="cardStyle"
    :id="`carta-${cardIndex}`"
  >
    <!-- Icono decorativo superior -->
    <div class="text-center mb-4">
      <span class="text-4xl" :style="{ animationDelay: `${cardIndex * 0.3}s` }">
        {{ icon }}
      </span>
    </div>

    <!-- Número de carta decorativo -->
    <p class="text-center font-body text-xs uppercase tracking-widest mb-3" style="color: rgba(255,107,157,0.6);">
      — Carta {{ romanNumerals[cardIndex] }} —
    </p>

    <!-- Separador -->
    <div class="romantic-divider mb-4">
      <span style="color: rgba(255,107,157,0.5); font-size: 0.7rem;">♥</span>
    </div>

    <!-- Frase principal -->
    <blockquote class="text-center leading-relaxed" style="font-family: var(--font-script); font-size: 1.35rem; color: var(--color-rose-soft); font-weight: 600; line-height: 1.7;">
      "{{ phrase }}"
    </blockquote>

    <!-- Firma -->
    <div class="romantic-divider mt-4 mb-3">
      <span style="color: rgba(255,107,157,0.5); font-size: 0.7rem;">♥</span>
    </div>

    <p class="text-center text-xs" style="color: var(--color-rose-blush); font-family: var(--font-romantic); font-style: italic;">
      Con todo mi amor 💌
    </p>

    <!-- Decoración de esquinas -->
    <span class="absolute top-3 left-4 text-lg opacity-30">✦</span>
    <span class="absolute top-3 right-4 text-lg opacity-30">✦</span>
    <span class="absolute bottom-3 left-4 text-lg opacity-30">✦</span>
    <span class="absolute bottom-3 right-4 text-lg opacity-30">✦</span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  phrase:    { type: String,  required: true },
  icon:      { type: String,  default: '💕' },
  cardIndex: { type: Number,  default: 0 },
  delay:     { type: String,  default: '0s' },
})

const romanNumerals = ['I', 'II', 'III', 'IV']

// Cada carta tiene duración y ángulo de float ligeramente distintos
const floatConfig = [
  { duration: '7s', rotate: '-1deg' },
  { duration: '8.5s', rotate: '1.5deg' },
  { duration: '6.5s', rotate: '-0.5deg' },
  { duration: '9s', rotate: '2deg' },
]

const cardStyle = computed(() => {
  const cfg = floatConfig[props.cardIndex % floatConfig.length]
  return {
    '--duration': cfg.duration,
    '--delay': props.delay,
    '--rotate': cfg.rotate,
    animationDelay: props.delay,
  }
})
</script>
