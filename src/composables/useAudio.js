/**
 * useAudio.js
 * ─────────────────────────────────────────────────────────
 * Gestiona el reproductor de música de fondo desde /public/musica/
 *
 * ESTRUCTURA DE ARCHIVOS:
 *   public/
 *     musica/
 *       cancion1.mp3
 *       cancion2.mp3
 *       cancion3.mp3
 *       ...cancionN.mp3  ← Sube tus canciones MP3 aquí
 *
 * IMPORTANTE: Edita la constante TOTAL_SONGS con el número
 * exacto de canciones que subiste a /public/musica/.
 * ─────────────────────────────────────────────────────────
 */

import { ref, onUnmounted } from 'vue'

// ← CONFIGURA AQUÍ: número total de canciones en /public/musica/
const TOTAL_SONGS = 5

export function useAudio() {
  const isPlaying = ref(false)
  const isMuted = ref(false)
  const currentSongName = ref('')
  const volume = ref(0.6)

  let audio = null
  let songIndex = 0

  /**
   * Selecciona un número aleatorio de canción
   */
  function getRandomSongIndex() {
    return Math.floor(Math.random() * TOTAL_SONGS) + 1
  }

  /**
   * Carga e inicia una canción aleatoria
   */
  function initAudio() {
    if (audio) {
      audio.pause()
      audio = null
    }

    songIndex = getRandomSongIndex()
    const songPath = `./musica/cancion${songIndex}.mp3`
    currentSongName.value = `Canción ${songIndex}`

    audio = new Audio(songPath)
    audio.volume = volume.value
    audio.loop = true

    audio.addEventListener('error', () => {
      console.warn(`[Audio] No se pudo cargar: ${songPath}`)
      // Si la canción no existe, silenciamos sin errores
      isPlaying.value = false
    })

    audio.addEventListener('canplaythrough', () => {
      if (!isMuted.value) {
        audio.play().then(() => {
          isPlaying.value = true
        }).catch(() => {
          // Autoplay bloqueado por el navegador
          isPlaying.value = false
        })
      }
    })

    audio.load()
  }

  function togglePlay() {
    if (!audio) return

    if (isPlaying.value) {
      audio.pause()
      isPlaying.value = false
    } else {
      audio.play().then(() => {
        isPlaying.value = true
      }).catch(() => { })
    }
  }

  function toggleMute() {
    if (!audio) return
    isMuted.value = !isMuted.value
    audio.muted = isMuted.value
  }

  function setVolume(val) {
    volume.value = val
    if (audio) audio.volume = val
  }

  /**
   * Reproduce una canción específica por número
   */
  function playSong(songNumber) {
    if (audio) {
      audio.pause()
      audio = null
    }

    songIndex = songNumber
    const songPath = `./musica/cancion${songNumber}.mp3`
    currentSongName.value = `Canción ${songNumber}`

    audio = new Audio(songPath)
    audio.volume = volume.value
    audio.loop = true

    audio.addEventListener('error', () => {
      console.warn(`[Audio] No se pudo cargar: ${songPath}`)
      isPlaying.value = false
    })

    audio.addEventListener('canplaythrough', () => {
      if (!isMuted.value) {
        audio.play().then(() => {
          isPlaying.value = true
        }).catch(() => {
          isPlaying.value = false
        })
      }
    })

    audio.load()
  }

  /**
   * Cambia a una canción diferente de forma aleatoria
   */
  function nextSong() {
    let newIndex = songIndex
    while (newIndex === songIndex && TOTAL_SONGS > 1) {
      newIndex = getRandomSongIndex()
    }
    songIndex = newIndex
    initAudio()
  }

  // Limpieza si el componente se desmonta
  onUnmounted(() => {
    if (audio) {
      audio.pause()
      audio = null
    }
  })

  return {
    isPlaying,
    isMuted,
    currentSongName,
    volume,
    initAudio,
    playSong,
    togglePlay,
    toggleMute,
    setVolume,
    nextSong,
  }
}
