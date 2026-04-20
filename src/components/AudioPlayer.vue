<template>
  <!-- ═══════════════════════════════════════════════════
       AudioPlayer.vue
       Player flotante fijo en la esquina inferior derecha
       ═══════════════════════════════════════════════════ -->
  <div class="audio-player" id="audio-player" role="region" aria-label="Reproductor de música">
    <!-- Ícono de nota musical animado -->
    <span class="music-note" :class="{ spinning: isPlaying }">🎵</span>

    <!-- Nombre de la canción -->
    <span
      class="song-name text-xs"
      style="color: var(--color-rose-soft); font-family: var(--font-romantic); font-style: italic; max-width: 80px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;"
    >
      {{ currentSongName || 'Música ♫' }}
    </span>

    <!-- Botón play/pause -->
    <button
      id="btn-play-pause"
      @click="togglePlay"
      class="player-btn"
      :aria-label="isPlaying ? 'Pausar música' : 'Reproducir música'"
      :title="isPlaying ? 'Pausar' : 'Reproducir'"
    >
      {{ isPlaying ? '⏸' : '▶️' }}
    </button>

    <!-- Botón mute -->
    <button
      id="btn-mute"
      @click="toggleMute"
      class="player-btn"
      :aria-label="isMuted ? 'Activar sonido' : 'Silenciar'"
      :title="isMuted ? 'Activar sonido' : 'Silenciar'"
    >
      {{ isMuted ? '🔇' : '🔊' }}
    </button>

    <!-- Botón siguiente canción -->
    <button
      id="btn-next"
      @click="nextSong"
      class="player-btn"
      aria-label="Siguiente canción"
      title="Siguiente canción"
    >
      ⏭
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  isPlaying:       { type: Boolean, default: false },
  isMuted:         { type: Boolean, default: false },
  currentSongName: { type: String,  default: '' },
})

const emit = defineEmits(['toggle-play', 'toggle-mute', 'next-song'])

const togglePlay = () => emit('toggle-play')
const toggleMute = () => emit('toggle-mute')
const nextSong   = () => emit('next-song')
</script>

<style scoped>
.player-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 2px;
  transition: transform 0.2s ease;
  line-height: 1;
}

.player-btn:hover {
  transform: scale(1.2);
}

.music-note {
  font-size: 1rem;
  display: inline-block;
  transition: animation 0.3s;
}

.music-note.spinning {
  animation: noteSpin 2s linear infinite;
}

@keyframes noteSpin {
  0%   { transform: rotate(-15deg) scale(1); }
  25%  { transform: rotate(15deg) scale(1.15); }
  50%  { transform: rotate(-15deg) scale(1); }
  75%  { transform: rotate(15deg) scale(0.9); }
  100% { transform: rotate(-15deg) scale(1); }
}
</style>
