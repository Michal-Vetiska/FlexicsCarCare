import { ref, computed } from 'vue'
import { exteriorPackages, interiorPackages, ceramicPackages } from '../data/cenik.js'

const allPackages = [...exteriorPackages, ...interiorPackages, ...ceramicPackages]

export function parsePrice(str) {
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

  /** Přidá položku; u kategorie exteriér/interiér nahradí stávající výběr (jen jedna položka za kategorii). */
  function addItem(service, size) {
    const pkg = typeof service === 'string' ? getPackage(service) : service
    if (!pkg) return
    if (pkg.id.startsWith('exterier-')) {
      items.value = items.value.filter((item) => !item.id.startsWith('exterier-'))
    }
    if (pkg.id.startsWith('interier-')) {
      items.value = items.value.filter((item) => !item.id.startsWith('interier-'))
    }
    const priceStr = size === 'XL' ? pkg.priceXL : pkg.priceL
    const price = parsePrice(priceStr)
    items.value = [
      ...items.value,
      { id: pkg.id, name: pkg.name, price, size, priceLabel: priceStr },
    ]
  }

  /** Nahradí položky v dané kategorii jednou novou (exterier / interier). */
  function replaceCategoryItem(categoryPrefix, pkg, size) {
    const priceStr = size === 'XL' ? pkg.priceXL : pkg.priceL
    const price = parsePrice(priceStr)
    items.value = items.value.filter((item) => !item.id.startsWith(categoryPrefix))
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

  return { items, count, total, addItem, replaceCategoryItem, removeItem, clear }
}
