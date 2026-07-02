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
