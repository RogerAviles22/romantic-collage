<template>
  <div class="carousel-container">
    <!-- Encabezado del carrusel -->
    <div class="text-center mb-3 fade-slide-up" style="--delay: 0.1s;"> 
    </div>

    <!-- Viewport del carrusel -->
    <div
      class="carousel-viewport"
      ref="viewportRef"
      @touchstart="onTouchStart"
      @touchend="onTouchEnd"
    >
      <div class="carousel-track" :style="trackStyle">
        <!-- Slides con fotos -->
        <div
          v-for="(gallery, idx) in galleries"
          :key="'photo-slide-' + idx"
          class="carousel-slide"
        >
          <h2 class="slide-title">{{ currentTitle }}</h2>

          <!-- Galería de 6 fotos -->
          <PhotoGallery
            :photos="gallery"
            :gallery-id="idx + galleries.length"
            @open-photo="(src) => emit('open-photo', src)"
          />
        </div>

        <!-- Slide final: Pregunta -->
        <div class="carousel-slide carousel-slide-final">
          <h2 class="slide-title slide-title-final">💕 Mi mundo se detiene!! 💕</h2>
          <FinalQuestion />
        </div>
      </div>
    </div>

    <!-- Controles de navegación -->
    <div class="carousel-controls">
      <button
        class="carousel-btn carousel-btn-prev"
        :disabled="currentSlide === 0"
        @click="prev"
        aria-label="Anterior"
      >
        ‹
      </button>

      <div class="carousel-dots">
        <button
          v-for="(_, idx) in totalSlides"
          :key="'dot-' + idx"
          class="carousel-dot"
          :class="{
            active: currentSlide === idx,
            'is-last': idx === totalSlides - 1,
          }"
          @click="goToSlide(idx)"
          :aria-label="'Ir al slide ' + (idx + 1)"
        />
      </div>

      <button
        class="carousel-btn carousel-btn-next"
        :disabled="currentSlide === totalSlides - 1"
        @click="next"
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>

    <!-- Contador -->
    <p class="slide-counter">
      {{ currentSlide + 1 }} / {{ totalSlides }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PhotoGallery from './PhotoGallery.vue'
import RomanticCard from './RomanticCard.vue'
import FinalQuestion from './FinalQuestion.vue'

const props = defineProps({
  galleries: { type: Array, required: true },
  letters: { type: Array, required: true },
})

const emit = defineEmits(['open-photo'])

const currentSlide = ref(0)
const viewportRef = ref(null)

const SLIDE_TITLES = [
  'Nuestra historia empezó un 1 de Febrero.',
  'Me conecté con tu mirada tierna y dulce en 2 segundos.',
  'Te enamoré con mi rara pero excelente labia.',
  'Y cada momento a tu lado es un regalo.',
  'Después de 5 meses te pregunto.',
]

const totalSlides = computed(() => props.galleries.length + 1)

const currentTitle = computed(() => SLIDE_TITLES[currentSlide.value] || '')

const trackStyle = computed(() => ({
  transform: `translateX(-${currentSlide.value * 100}%)`,
}))

function next() {
  if (currentSlide.value < totalSlides.value - 1) {
    currentSlide.value++
  }
}

function prev() {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

function goToSlide(idx) {
  currentSlide.value = idx
}

function onKeyDown(e) {
  if (e.key === 'ArrowRight') next()
  if (e.key === 'ArrowLeft') prev()
}

let touchStartX = 0
let touchStartY = 0

function onTouchStart(e) {
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
}

function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX
  const dy = e.changedTouches[0].clientY - touchStartY
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) next()
    else prev()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
})
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-viewport {
  overflow: hidden;
  width: 100%;
  border-radius: 16px;
  position: relative;
}

.carousel-track {
  display: flex;
  flex-wrap: nowrap;
  will-change: transform;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.carousel-slide {
  flex: 0 0 100%;
  min-width: 0;
  padding: 0 8px;
}

.carousel-slide-final {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 60vh;
}

.slide-title {
  font-family: var(--font-script);
  font-size: 1.5rem;
  text-align: center;
  color: var(--color-champagne);
  margin-bottom: 0.15rem;
  padding-top: 0;
  position: relative;
  font-weight: 700;
  line-height: 1.3;
}

.slide-title::after {
  content: '';
  display: block;
  width: 40px;
  height: 1.5px;
  background: linear-gradient(to right, transparent, var(--color-rose-blush), transparent);
  margin: 4px auto 0;
}

.slide-title-final {
  color: var(--color-rose-blush);
  font-size: 1.8rem;
  animation: heartBeat 2s ease-in-out infinite;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
  padding: 0 1rem;
}

.carousel-btn {
  background: rgba(255, 107, 157, 0.12);
  border: 1px solid rgba(255, 107, 157, 0.25);
  color: var(--color-rose-soft);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 300;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  -webkit-user-select: none;
  line-height: 1;
}

.carousel-btn:hover:not(:disabled) {
  background: rgba(255, 107, 157, 0.3);
  border-color: var(--color-rose-blush);
  transform: scale(1.1);
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.3);
}

.carousel-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.carousel-btn:disabled {
  opacity: 0.2;
  cursor: default;
  pointer-events: none;
}

.carousel-dots {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.carousel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 107, 157, 0.25);
  border: 1px solid rgba(255, 107, 157, 0.15);
  cursor: pointer;
  transition: all 0.35s ease;
  padding: 0;
  flex-shrink: 0;
}

.carousel-dot.active {
  background: var(--color-rose-blush);
  border-color: var(--color-rose-blush);
  box-shadow: 0 0 10px rgba(255, 107, 157, 0.6);
  transform: scale(1.3);
}

.carousel-dot.is-last.active {
  background: var(--color-gold);
  border-color: var(--color-gold);
  box-shadow: 0 0 10px rgba(212, 168, 67, 0.6);
}

.slide-counter {
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.75rem;
  color: rgba(255, 107, 157, 0.4);
  font-family: var(--font-body);
  letter-spacing: 0.1em;
}
</style>
