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
 *       ...fotoN.jpg  ← Sube TODAS tus fotos aquí (mínimo 30)
 *
 * IMPORTANTE: Edita la constante TOTAL_PHOTOS con el número
 * exacto de fotos que subiste a /public/fotos/.
 * Las fotos deben llamarse foto1.jpg, foto2.jpg, etc.
 * ─────────────────────────────────────────────────────────
 */

import { ref } from 'vue'

// Lista de archivos reales con sus extensiones correctas en public/fotos/
const PHOTO_FILES = [
  'foto1.jpg',
  'foto2.jpg',
  'foto3.jpg',
  'foto4.jpg',
  'foto5.png',
  'foto6.png',
  'foto7.png',
  'foto8.png',
  'foto9.png',
  'foto10.png',
  'foto11.png',
  'foto12.jpg',
  'foto13.png',
  'foto14.png',
  'foto15.jpg',
  'foto16.png',
  'foto17.jpg',
  'foto18.png',
  'foto19.png',
  'foto20.jpg',
  'foto21.jpg',
  'foto22.jpg',
  'foto23.jpg',
  'foto24.jpg',
  'foto25.jpg',
  'foto26.jpg',
  'foto27.jpg',
  'foto28.jpg',
  'foto29.jpg',
  'foto30.jpg'
]

// Cuántas fotos por galería (5 cartas × 6 fotos = 30 en total)
const PHOTOS_PER_GALLERY = 6
const TOTAL_GALLERIES = 5

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
  // galleries[0..4] = array de 6 rutas de fotos cada uno
  const galleries = ref([])
  // Para el lightbox (foto expandida)
  const activePhoto = ref(null)

  function loadPhotos() {
    const needed = PHOTOS_PER_GALLERY * TOTAL_GALLERIES // 30

    // Barajar aleatoriamente la lista de fotos reales disponibles
    const shuffled = [...PHOTO_FILES].sort(() => Math.random() - 0.5)

    // Seleccionar las 30 requeridas y mapear a su ruta pública
    const selected = shuffled.slice(0, needed)
    const allPaths = selected.map(file => `./fotos/${file}`)

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
