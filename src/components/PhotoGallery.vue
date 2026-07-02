<template>
  <!-- ═══════════════════════════════════════════════════
       PhotoGallery.vue
       Mosaico de 4 fotos con efecto floating/antigravity
       Props:
         - photos    : array de 4 rutas de imágenes
         - galleryId : identificador único para la galería
       ═══════════════════════════════════════════════════ -->
  <div class="px-2 py-1" :id="`galeria-${galleryId}`">
    <!-- Encabezado de galería decorativo -->
    <div class="flex items-center justify-center gap-2 mb-2">
      <span class="text-rose-300 text-xs opacity-40">✦</span>
      <p class="text-xs uppercase tracking-widest pb-10" style="color: rgba(255,107,157,0.4); font-family: var(--font-romantic);">
        Nuestros Momentos
      </p>
      <span class="text-rose-300 text-xs opacity-40">✦</span>
    </div>

    <!-- Grid de fotos en mosaico irregular -->
    <div class="photo-grid">
      <div
        v-for="(src, idx) in photos"
        :key="`g${galleryId}-p${idx}`"
        class="photo-item"
        :class="{ 'is-error': loadedStates[idx] === 'error' }"
        :style="photoStyle(idx)"
        @click="emit('open-photo', src)"
        :id="`foto-g${galleryId}-${idx}`"
        role="button"
        :aria-label="`Ver foto ${idx + 1}`"
        tabindex="0"
        @keyup.enter="emit('open-photo', src)"
      >
        <!-- Imagen siempre renderizada, opacity controlada por clase -->
        <img
          :src="src"
          :alt="`Foto romántica ${idx + 1}`"
          loading="lazy"
          @load="onImgLoad(idx)"
          @error="onImgError($event, idx)"
          :class="['gallery-img', { 'is-loaded': loadedStates[idx] === 'loaded' }]"
        />

        <!-- Skeleton Loader -->
        <div
          v-if="loadedStates[idx] === 'loading'"
          class="photo-skeleton"
        >
          <div class="shimmer-effect"></div>
          <div class="heart-spinner">💖</div>
        </div>

        <!-- Placeholder en caso de error -->
        <div v-if="loadedStates[idx] === 'error'" class="photo-placeholder">
          <span>{{ ['🌸', '💕', '✨', '🌺'][idx] || '💖' }}</span>
        </div>

        <!-- Overlay con corazón al hover -->
        <div v-if="loadedStates[idx] === 'loaded'" class="photo-overlay">
          <span class="text-2xl">💕</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const FLOAT_CONFIGS = [
  { duration: '5.5s', delay: '0s' },
  { duration: '4.8s', delay: '0.7s' },
  { duration: '6.2s', delay: '0.3s' },
  { duration: '5.0s', delay: '1.1s' },
]

const props = defineProps({
  photos:    { type: Array,  required: true },
  galleryId: { type: Number, default: 0 },
})

const emit = defineEmits(['open-photo'])

const loadedStates = ref({})

watch(() => props.photos, (newPhotos) => {
  loadedStates.value = {}
  newPhotos.forEach((_, idx) => {
    loadedStates.value[idx] = 'loading'
  })
}, { immediate: true })

onMounted(() => {
  setTimeout(() => {
    props.photos.forEach((_, idx) => {
      if (loadedStates.value[idx] === 'loading') {
        loadedStates.value[idx] = 'loaded'
      }
    })
  }, 4000)
})

function photoStyle(idx) {
  const cfg = FLOAT_CONFIGS[idx % FLOAT_CONFIGS.length]
  return {
    '--duration': cfg.duration,
    '--delay': cfg.delay,
  }
}

function onImgLoad(idx) {
  loadedStates.value[idx] = 'loaded'
}

function onImgError(event, idx) {
  loadedStates.value[idx] = 'error'
}
</script>

<style scoped>
.photo-overlay {
  position: absolute;
  inset: 0;
  background: rgba(192, 57, 107, 0.0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease, opacity 0.3s ease;
  opacity: 0;
  z-index: 3;
}

.photo-item {
  position: relative;
}

.photo-item:hover .photo-overlay {
  background: rgba(192, 57, 107, 0.25);
  opacity: 1;
}

/* Estilo del Skeleton Loader */
.photo-skeleton {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(30, 10, 30, 0.95), rgba(74, 25, 66, 0.85));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  overflow: hidden;
  border-radius: 12px;
}

/* Efecto Shimmer de fondo */
.shimmer-effect {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 107, 157, 0.15),
    transparent
  );
  transform: translateX(-100%);
  animation: skeletonShimmer 1.8s infinite;
}

@keyframes skeletonShimmer {
  100% {
    transform: translateX(100%);
  }
}

/* Spinner de corazón latiendo */
.heart-spinner {
  font-size: 1.8rem;
  animation: heartPulse 1.2s ease-in-out infinite;
  filter: drop-shadow(0 0 8px rgba(255, 107, 157, 0.6));
}

@keyframes heartPulse {
  0%, 100% {
    transform: scale(0.85);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.15);
    opacity: 1;
  }
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  opacity: 0;
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.gallery-img.is-loaded {
  opacity: 1;
}

/* Placeholder para errores */
.photo-placeholder {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(192, 57, 107, 0.2), rgba(74, 25, 66, 0.4));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  border-radius: 12px;
  z-index: 1;
  border: 1px dashed rgba(255, 107, 157, 0.4);
}
</style>
