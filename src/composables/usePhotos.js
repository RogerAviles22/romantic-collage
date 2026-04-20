/**
 * usePhotos.js
 * ─────────────────────────────────────────────────────────
 * Gestiona la selección aleatoria de fotos desde /public/fotos/
 *
 * ESTRUCTURA DE CARPETAS:
 *   public/
 *     fotos/
 *       foto1.jpg
 *       foto2.jpg
 *       foto3.jpg
 *       ...fotoN.jpg  ← Sube TODAS tus fotos aquí (mínimo 16)
 *
 * IMPORTANTE: Edita la constante TOTAL_PHOTOS con el número
 * exacto de fotos que subiste a /public/fotos/.
 * Las fotos deben llamarse foto1.jpg, foto2.jpg, etc.
 * ─────────────────────────────────────────────────────────
 */

import { ref } from 'vue'

// ← CONFIGURA AQUÍ: número total de fotos en /public/fotos/
const TOTAL_PHOTOS = 20

// Cuántas fotos por galería (4 cartas × 4 fotos = 16 en total)
const PHOTOS_PER_GALLERY = 4
const TOTAL_GALLERIES = 4

/**
 * Genera un array de N números únicos aleatorios en [1, max]
 */
function getRandomIndexes(count, max) {
  const pool = Array.from({ length: max }, (_, i) => i + 1)
  const shuffled = pool.sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

/**
 * Divide un array en chunks del tamaño dado
 */
function chunkArray(arr, size) {
  const chunks = []
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size))
  }
  return chunks
}

export function usePhotos() {
  // galleries[0..3] = array de 4 rutas de fotos cada uno
  const galleries = ref([])
  // Para el lightbox (foto expandida)
  const activePhoto = ref(null)

  function loadPhotos() {
    const needed = PHOTOS_PER_GALLERY * TOTAL_GALLERIES // 16
    const safeTotal = Math.max(TOTAL_PHOTOS, needed)

    const selectedIndexes = getRandomIndexes(needed, safeTotal)
    const allPaths = selectedIndexes.map(i => `/fotos/foto${i}.jpg`)

    galleries.value = chunkArray(allPaths, PHOTOS_PER_GALLERY)
  }

  function openPhoto(src) {
    activePhoto.value = src
  }

  function closePhoto() {
    activePhoto.value = null
  }

  // Cargar al inicializar
  loadPhotos()

  return { galleries, activePhoto, loadPhotos, openPhoto, closePhoto }
}
