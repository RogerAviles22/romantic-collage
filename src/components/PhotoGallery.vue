<template>
  <!-- ═══════════════════════════════════════════════════
       PhotoGallery.vue
       Mosaico de 4 fotos con efecto floating/antigravity
       Props:
         - photos    : array de 4 rutas de imágenes
         - galleryId : identificador único para la galería
       ═══════════════════════════════════════════════════ -->
  <div class="px-4 py-2" :id="`galeria-${galleryId}`">
    <!-- Encabezado de galería decorativo -->
    <div class="flex items-center justify-center gap-2 mb-4">
      <span class="text-rose-300 text-xs opacity-60">✦</span>
      <p class="text-xs uppercase tracking-widest" style="color: rgba(255,107,157,0.5); font-family: var(--font-romantic);">
        Nuestros Momentos
      </p>
      <span class="text-rose-300 text-xs opacity-60">✦</span>
    </div>

    <!-- Grid de fotos en mosaico irregular -->
    <div class="photo-grid">
      <div
        v-for="(src, idx) in photos"
        :key="`g${galleryId}-p${idx}`"
        class="photo-item"
        :style="photoStyle(idx)"
        @click="emit('open-photo', src)"
        :id="`foto-g${galleryId}-${idx}`"
        role="button"
        :aria-label="`Ver foto ${idx + 1}`"
        tabindex="0"
        @keyup.enter="emit('open-photo', src)"
      >
        <!-- Imagen -->
        <img
          :src="src"
          :alt="`Foto romántica ${idx + 1}`"
          loading="lazy"
          @error="onImgError($event, idx)"
        />
        <!-- Overlay con corazón al hover -->
        <div class="photo-overlay">
          <span class="text-2xl">💕</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Configuración de float por posición en el mosaico
const FLOAT_CONFIGS = [
  { duration: '5.5s', delay: '0s' },    // foto grande portrait
  { duration: '4.8s', delay: '0.7s' },  // landscape
  { duration: '6.2s', delay: '0.3s' },  // square
  { duration: '5.0s', delay: '1.1s' },  // wide banner
]

const props = defineProps({
  photos:    { type: Array,  required: true },
  galleryId: { type: Number, default: 0 },
})

const emit = defineEmits(['open-photo'])

function photoStyle(idx) {
  const cfg = FLOAT_CONFIGS[idx % FLOAT_CONFIGS.length]
  return {
    '--duration': cfg.duration,
    '--delay': cfg.delay,
  }
}

function onImgError(event, idx) {
  // Si la imagen no carga, muestra un placeholder con emoji
  const parent = event.target.parentElement
  event.target.style.display = 'none'
  const placeholder = document.createElement('div')
  placeholder.className = 'photo-placeholder'
  placeholder.innerHTML = ['🌸', '💕', '✨', '🌺'][idx] || '💖'
  parent.appendChild(placeholder)
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
}

.photo-item {
  position: relative;
}

.photo-item:hover .photo-overlay {
  background: rgba(192, 57, 107, 0.25);
  opacity: 1;
}
</style>
