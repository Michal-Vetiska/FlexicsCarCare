import { ref, onMounted, onUnmounted } from 'vue'

const IDLE_MS = 5 * 60 * 1000 // 5 minut

export function useInactivity() {
  const showDialog = ref(false)
  let timeoutId = null
  let lastActivity = Date.now()

  function resetTimer() {
    lastActivity = Date.now()
    if (timeoutId) clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      showDialog.value = true
      timeoutId = null
    }, IDLE_MS)
  }

  function hideDialog() {
    showDialog.value = false
    resetTimer()
  }

  function onActivity() {
    if (showDialog.value) return
    resetTimer()
  }

  onMounted(() => {
    resetTimer()
    window.addEventListener('mousedown', onActivity)
    window.addEventListener('mousemove', onActivity)
    window.addEventListener('keydown', onActivity)
    window.addEventListener('scroll', onActivity)
  })

  onUnmounted(() => {
    if (timeoutId) clearTimeout(timeoutId)
    window.removeEventListener('mousedown', onActivity)
    window.removeEventListener('mousemove', onActivity)
    window.removeEventListener('keydown', onActivity)
    window.removeEventListener('scroll', onActivity)
  })

  return { showDialog, hideDialog }
}
