import { ref } from 'vue'
import { fetchContent, saveContent, uploadImage } from '../api/client'
import type { SiteContent } from '../types/content'

const draft = ref<SiteContent | null>(null)
const saving = ref(false)
const saveMessage = ref('')
const loadError = ref('')

export function useAdminContent() {
  async function load() {
    loadError.value = ''
    try {
      draft.value = await fetchContent()
    } catch (err) {
      loadError.value = err instanceof Error ? err.message : 'Chyba načtení'
    }
  }

  async function save() {
    if (!draft.value) return
    saving.value = true
    saveMessage.value = ''
    try {
      draft.value = await saveContent(draft.value)
      saveMessage.value = 'Uloženo'
      setTimeout(() => {
        if (saveMessage.value === 'Uloženo') saveMessage.value = ''
      }, 2500)
    } catch (err) {
      saveMessage.value = err instanceof Error ? err.message : 'Uložení selhalo'
    } finally {
      saving.value = false
    }
  }

  async function upload(file: File) {
    return uploadImage(file)
  }

  return {
    draft,
    saving,
    saveMessage,
    loadError,
    load,
    save,
    upload,
  }
}

export function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}`
}
