<template>
  <!-- ═══════════════════════════════════════════════════
       PhotoLightbox.vue
       Visualizador de foto en pantalla completa
       ═══════════════════════════════════════════════════ -->
  <Transition name="lightbox-fade">
    <div
      v-if="src"
      id="lightbox"
      class="lightbox-overlay"
      @click.self="emit('close')"
      role="dialog"
      aria-modal="true"
      aria-label="Foto en pantalla completa"
    >
      <div class="lightbox-inner">
        <img :src="src" alt="Foto romántica ampliada" class="lightbox-img" />
        <button
          id="lightbox-close"
          class="lightbox-close"
          @click="emit('close')"
          aria-label="Cerrar foto"
        >
          ✕
        </button>
        <div class="lightbox-heart">💕</div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  src: { type: String, default: null },
})
const emit = defineEmits(['close'])
</script>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 2, 15, 0.92);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  padding: 20px;
}

.lightbox-inner {
  position: relative;
  max-width: 90vw;
  max-height: 85vh;
}

.lightbox-img {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 16px;
  border: 1px solid rgba(255, 107, 157, 0.4);
  box-shadow: 0 0 40px rgba(192, 57, 107, 0.5);
  display: block;
}

.lightbox-close {
  position: absolute;
  top: -12px;
  right: -12px;
  background: rgba(192, 57, 107, 0.9);
  color: white;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background 0.2s ease;
}

.lightbox-close:hover {
  transform: scale(1.2) rotate(90deg);
  background: rgba(255, 107, 157, 1);
}

.lightbox-heart {
  text-align: center;
  margin-top: 10px;
  font-size: 1.5rem;
  animation: pulseSoft 2s ease-in-out infinite;
}

@keyframes pulseSoft {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%       { transform: scale(1.2); opacity: 0.7; }
}

/* Transición de entrada/salida */
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
