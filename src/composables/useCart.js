import { ref, computed } from 'vue'
import { exteriorPackages, interiorPackages, ceramicPackages } from '../data/cenik.js'

const allPackages = [...exteriorPackages, ...interiorPackages, ...ceramicPackages]

function parsePrice(str) {
  if (!str || typeof str !== 'string') return 0
  const num = str.replace(/\s/g, '').replace(/[^\d]/g, '')
  return parseInt(num, 10) || 0
}

function getPackage(id) {
  return allPackages.find((p) => p.id === id)
}

const items = ref([])

export function useCart() {
  const count = computed(() => items.value.length)

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + (item.price ?? 0), 0)
  )

  function addItem(service, size) {
    const pkg = typeof service === 'string' ? getPackage(service) : service
    if (!pkg) return
    const priceStr = size === 'XL' ? pkg.priceXL : pkg.priceL
    const price = parsePrice(priceStr)
    items.value = [
      ...items.value,
      { id: pkg.id, name: pkg.name, price, size, priceLabel: priceStr },
    ]
  }

  function removeItem(index) {
    items.value = items.value.filter((_, i) => i !== index)
  }

  function clear() {
    items.value = []
  }

  return { items, count, total, addItem, removeItem, clear }
}
