<template>
  <div class="login-screen">
    <div class="login-card">
      <div class="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <span style="font-size: 12rem; line-height: 1;">💕</span>
      </div>

      <div class="text-center mb-5 relative z-10">
        <span class="text-5xl block mb-2 login-icon">🔐</span>
        <div class="romantic-divider">
          <span style="color: rgba(255,107,157,0.6); font-size: 0.7rem;">♥</span>
        </div>
      </div>

      <p
        class="text-center text-xs uppercase tracking-widest mb-3 relative z-10"
        style="color: rgba(255,107,157,0.7); font-family: var(--font-romantic);"
      >
        — Acceso Especial —
      </p>

      <h2
        class="shimmer-text text-center mb-4 relative z-10"
        style="font-family: var(--font-script); font-size: 1.8rem; line-height: 1.3; font-weight: 700;"
      >
        Ingresa la clave
      </h2>

      <div class="romantic-divider mb-5 relative z-10">
        <span style="color: rgba(255,107,157,0.5); font-size: 0.7rem;">❦</span>
      </div>

      <div class="relative z-10">
        <p
          class="text-center text-sm mb-4"
          style="color: var(--color-champagne); font-family: var(--font-romantic); font-style: italic;"
        >
          💌 Pista: Fecha completa de nuestro primer beso
        </p>

        <div class="input-group">
          <input
            ref="inputRef"
            v-model="password"
            type="password"
            class="login-input"
            placeholder="Escribe la clave..."
            @keyup.enter="handleSubmit"
            @input="errorMsg = ''"
            aria-label="Clave de acceso"
          />
          <span class="input-icon">💕</span>
        </div>

        <p v-if="errorMsg" class="error-text">{{ errorMsg }}</p>

        <button class="login-btn" @click="handleSubmit">
          Ingresar ✨
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['authenticated', 'start-audio'])

const password = ref('')
const errorMsg = ref('')
const inputRef = ref(null)
const audioStarted = ref(false)

function onFirstInteraction() {
  if (!audioStarted.value) {
    audioStarted.value = true
    emit('start-audio')
  }
}

onMounted(() => {
  inputRef.value?.focus()
  document.addEventListener('click', onFirstInteraction, { once: true })
  document.addEventListener('touchstart', onFirstInteraction, { once: true })
  document.addEventListener('keydown', onFirstInteraction, { once: true })
})

onUnmounted(() => {
  document.removeEventListener('click', onFirstInteraction)
  document.removeEventListener('touchstart', onFirstInteraction)
  document.removeEventListener('keydown', onFirstInteraction)
})

function handleSubmit() {
  if (password.value === '14022026') {
    emit('authenticated')
  } else {
    errorMsg.value = 'Clave incorrecta, intenta de nuevo, tu puedes 💪'
    password.value = ''
  }
}
</script>

<style scoped>
.login-screen {
  position: fixed;
  inset: 0;
  z-index: 900;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(160deg, var(--color-bg-start) 0%, #2d0a2a 50%, var(--color-bg-end) 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: rgba(192, 57, 107, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 107, 157, 0.5);
  border-radius: 24px;
  animation: glowPulse 3s ease-in-out infinite;
  text-align: center;
  padding: 2.5rem 1.8rem;
  position: relative;
  overflow: hidden;
}

.login-icon {
  animation: heartBeat 2s ease-in-out infinite;
  display: inline-block;
  filter: drop-shadow(0 0 12px rgba(255, 107, 157, 0.5));
}

.input-group {
  position: relative;
  margin-bottom: 0.75rem;
}

.login-input {
  width: 100%;
  padding: 14px 48px 14px 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 107, 157, 0.3);
  border-radius: 50px;
  color: var(--color-rose-soft);
  font-family: var(--font-body);
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  box-sizing: border-box;
}

.login-input::placeholder {
  color: rgba(255, 214, 214, 0.3);
  font-style: italic;
  font-size: 0.9rem;
}

.login-input:focus {
  border-color: var(--color-rose-blush);
  box-shadow: 0 0 20px rgba(255, 107, 157, 0.2);
}

.input-icon {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  pointer-events: none;
  opacity: 0.5;
}

.error-text {
  color: var(--color-rose-blush);
  font-family: var(--font-romantic);
  font-size: 0.85rem;
  text-align: center;
  margin-bottom: 0.75rem;
  min-height: 1.5rem;
  animation: fadeSlideUp 0.4s ease-out forwards;
}

.login-btn {
  width: 100%;
  background: linear-gradient(135deg, #c0396b, #ff6b9d);
  color: white;
  font-family: var(--font-romantic);
  font-weight: 600;
  font-size: 1.1rem;
  padding: 14px 36px;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(192, 57, 107, 0.5);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: heartBeat 2.5s ease-in-out infinite;
  margin-top: 0.5rem;
}

.login-btn:hover {
  transform: scale(1.04);
  box-shadow: 0 8px 30px rgba(255, 107, 157, 0.7);
}

.login-btn:active {
  transform: scale(0.97);
}
</style>
