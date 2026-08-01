import { computed, ref, type Ref } from 'vue'
import { fetchContent } from '../api/client'
import type { SiteContent } from '../types/content'

const content = ref<SiteContent | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
let loadPromise: Promise<void> | null = null

export function useContent() {
  async function load(force = false) {
    if (content.value && !force) return
    if (loadPromise && !force) return loadPromise

    loading.value = true
    error.value = null
    loadPromise = fetchContent()
      .then((data) => {
        content.value = data
      })
      .catch((err: Error) => {
        error.value = err.message || 'Nepodařilo se načíst obsah'
      })
      .finally(() => {
        loading.value = false
        loadPromise = null
      })

    return loadPromise
  }

  function setContent(next: SiteContent) {
    content.value = next
  }

  const ready = computed(() => !!content.value)

  return {
    content: content as Ref<SiteContent | null>,
    loading,
    error,
    ready,
    load,
    setContent,
  }
}

export function mapsUrl(lat: number, lng: number) {
  return `https://www.google.com/maps?q=${lat},${lng}`
}

export function mapEmbedUrl(lat: number, lng: number) {
  return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.02}%2C${lat - 0.012}%2C${lng + 0.02}%2C${lat + 0.012}&layer=mapnik&marker=${lat}%2C${lng}`
}
