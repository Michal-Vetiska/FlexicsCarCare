<script setup>
import { ref, computed } from 'vue'
import {
  exteriorPackages,
  interiorPackages,
  ceramicPackages,
} from '../data/cenik.js'
import { useCart } from '../composables/useCart.js'

const { addItem, items } = useCart()

const categories = [
  {
    key: 'exterier',
    label: 'Exteriér',
    intro: 'Umytí, leštění, ochrana karoserie.',
    packages: exteriorPackages,
  },
  {
    key: 'interier',
    label: 'Interiér',
    intro: 'Luxování, čištění plastů a kůže.',
    packages: interiorPackages,
  },
  {
    key: 'keramika',
    label: 'Keramické ochrany',
    intro: 'Lak, kůže, plasty, světlomety.',
    packages: ceramicPackages,
  },
]

const expandedSection = ref(null)
const expandedDetail = ref(null) // id služby, u které je otevřený popis
const addingFor = ref(null)

const selectedCategories = computed(() => {
  const set = new Set()
  items.value.forEach((item) => {
    if (item.id.startsWith('exterier-')) set.add('exterier')
    else if (item.id.startsWith('interier-')) set.add('interier')
    else if (item.id.startsWith('keramika-')) set.add('keramika')
  })
  return set
})

function toggle(key) {
  if (expandedSection.value === key) {
    expandedSection.value = null
    expandedDetail.value = null
    addingFor.value = null
  } else {
    expandedSection.value = key
    expandedDetail.value = null
    addingFor.value = null
  }
}

function addWithSize(pkg, size) {
  addItem(pkg, size)
  addingFor.value = null
  expandedSection.value = null
}

function startAdd(pkg) {
  addingFor.value = pkg.id
}

function toggleDetail(id) {
  expandedDetail.value = expandedDetail.value === id ? null : id
}
</script>

<template>
  <section class="cenik">
    <header class="cenik__hero">
      <h1 class="cenik__title">Ceník služeb</h1>
      <p class="cenik__tagline">
        Vyberte kategorii, přidejte služby do košíku a pokračujte k rezervaci.
      </p>
      <p class="cenik__legend">
        <strong>L</strong> sedan, combi, hatchback • <strong>XL</strong> SUV, minivan, pickup
      </p>
    </header>

    <div class="categories">
      <div
        v-for="cat in categories"
        :key="cat.key"
        class="category"
        :class="{
          'category--open': expandedSection === cat.key,
          'category--selected': selectedCategories.has(cat.key),
        }"
      >
        <button
          type="button"
          class="category__head"
          @click="toggle(cat.key)"
        >
          <span class="category__label">{{ cat.label }}</span>
          <span class="category__intro">{{ cat.intro }}</span>
          <span class="category__chevron" aria-hidden="true">›</span>
        </button>

        <Transition name="expand">
          <div v-show="expandedSection === cat.key" class="category__body">
            <div class="category__body-inner">
              <div
                v-for="pkg in cat.packages"
                :key="pkg.id"
                class="category__item"
              >
                <div class="category__item-main">
                  <div class="category__item-info">
                    <span class="category__item-name">{{ pkg.name }}</span>
                    <span class="category__item-prices">
                      L {{ pkg.priceL }} / XL {{ pkg.priceXL }}
                    </span>
                  </div>
                  <div class="category__item-actions">
                    <button
                      type="button"
                      class="btn-detail"
                      :class="{ 'btn-detail--open': expandedDetail === pkg.id }"
                      :aria-expanded="expandedDetail === pkg.id"
                      @click="toggleDetail(pkg.id)"
                    >
                      {{ expandedDetail === pkg.id ? 'Skrýt popis' : 'Co je zahrnuto' }}
                      <span class="btn-detail__chevron">›</span>
                    </button>
                    <template v-if="addingFor === pkg.id">
                      <button
                        type="button"
                        class="btn-size"
                        @click="addWithSize(pkg, 'L')"
                      >
                        L — {{ pkg.priceL }}
                      </button>
                      <button
                        type="button"
                        class="btn-size"
                        @click="addWithSize(pkg, 'XL')"
                      >
                        XL — {{ pkg.priceXL }}
                      </button>
                    </template>
                    <button
                      v-else
                      type="button"
                      class="btn-cart"
                      @click="startAdd(pkg)"
                    >
                      + Přidat do košíku
                    </button>
                  </div>
                </div>
                <Transition name="detail">
                  <div v-show="expandedDetail === pkg.id" class="category__item-detail">
                    <p class="category__item-desc">{{ pkg.description }}</p>
                    <p v-if="pkg.subtitle" class="category__item-subtitle">{{ pkg.subtitle }}</p>
                    <ul v-if="pkg.extras?.length" class="category__item-extras">
                      <li v-for="e in pkg.extras" :key="e">{{ e }}</li>
                    </ul>
                    <p v-if="pkg.extra" class="category__item-extra">{{ pkg.extra }}</p>
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>

    <p class="cenik__disclaimer">
      Ceny jsou orientační. Finální částku upřesníme po kontrole vozu.
    </p>
  </section>
</template>

<style scoped>
.cenik {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cenik__hero {
  text-align: center;
  padding: 0.5rem 0 1rem;
}

.cenik__title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #f9fafb, #e5e7eb);
  -webkit-background-clip: text;
  color: transparent;
}

.cenik__tagline {
  font-size: 1.05rem;
  color: rgba(209, 213, 219, 0.95);
  max-width: 28rem;
  margin: 0 auto 0.75rem;
}

.cenik__legend {
  font-size: 0.85rem;
  color: rgba(148, 163, 184, 0.95);
}

.cenik__legend strong {
  color: #e5e7eb;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category {
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(165deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.95));
  border: 1px solid rgba(148, 163, 184, 0.25);
  transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.25s ease;
}

.category:hover {
  border-color: rgba(148, 163, 184, 0.45);
}

.category--open {
  border-color: rgba(251, 191, 36, 0.5);
  box-shadow: 0 0 0 1px rgba(251, 191, 36, 0.15), 0 20px 50px rgba(0, 0, 0, 0.35);
}

.category--selected {
  border-color: rgba(34, 197, 94, 0.4);
  background: linear-gradient(165deg, rgba(20, 45, 35, 0.5), rgba(15, 23, 42, 0.95));
  opacity: 0.92;
}

.category--selected .category__head::after {
  content: ' ✓ vybráno';
  font-size: 0.8em;
  color: #4ade80;
  font-weight: 500;
}

.category__head {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  text-align: left;
  border: none;
  background: transparent;
  color: #f9fafb;
  font: inherit;
  cursor: pointer;
  transition: background 0.2s ease;
}

.category__head:hover {
  background: rgba(255, 255, 255, 0.04);
}

.category__label {
  font-size: 1.2rem;
  font-weight: 600;
  flex-shrink: 0;
}

.category__intro {
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.85);
  flex: 1;
}

.category__chevron {
  font-size: 1.5rem;
  color: rgba(251, 191, 36, 0.9);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.category--open .category__chevron {
  transform: rotate(90deg);
}

.category__body {
  overflow: hidden;
}

.category__body-inner {
  padding: 0 1.5rem 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
}

/* Expand transition */
.expand-enter-active,
.expand-leave-active {
  transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s ease;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 90vh;
  opacity: 1;
}

.category__item {
  padding: 1rem 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.12);
}

.category__item:last-child {
  border-bottom: none;
}

.category__item-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.category__item-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.btn-detail {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.65rem;
  border: 1px solid rgba(148, 163, 184, 0.5);
  border-radius: 999px;
  background: transparent;
  color: rgba(209, 213, 219, 0.95);
  font-size: 0.8rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.btn-detail:hover {
  border-color: rgba(251, 191, 36, 0.5);
  color: #fbbf24;
}

.btn-detail--open {
  border-color: rgba(251, 191, 36, 0.6);
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}

.btn-detail__chevron {
  font-size: 0.9rem;
  transition: transform 0.25s ease;
}

.btn-detail--open .btn-detail__chevron {
  transform: rotate(90deg);
}

/* Rozbalený popis služby */
.category__item-detail {
  overflow: hidden;
  padding-top: 0.85rem;
  margin-top: 0.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
}

.detail-enter-active,
.detail-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.category__item-desc {
  margin: 0 0 0.5rem;
  font-size: 0.88rem;
  color: rgba(209, 213, 219, 0.92);
  line-height: 1.5;
}

.category__item-subtitle {
  margin: 0 0 0.5rem;
  font-size: 0.82rem;
  color: rgba(148, 163, 184, 0.95);
}

.category__item-extras {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.82rem;
  color: rgba(209, 213, 219, 0.88);
  line-height: 1.5;
}

.category__item-extras li {
  margin-bottom: 0.2rem;
}

.category__item-extras li::marker {
  color: #f97316;
}

.category__item-extra {
  margin: 0.5rem 0 0;
  font-size: 0.82rem;
  color: rgba(148, 163, 184, 0.95);
}

.category__item-name {
  font-weight: 600;
  color: #f9fafb;
}

.category__item-prices {
  font-size: 0.88rem;
  color: rgba(209, 213, 219, 0.85);
}

.category__item-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btn-cart {
  padding: 0.5rem 1rem;
  border-radius: 999px;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  color: #0f172a;
  background: linear-gradient(135deg, #fbbf24, #f97316);
  box-shadow: 0 2px 12px rgba(249, 115, 22, 0.4);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-cart:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 18px rgba(249, 115, 22, 0.5);
}

.btn-size {
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(251, 191, 36, 0.6);
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  color: #fbbf24;
  background: rgba(15, 23, 42, 0.9);
  transition: background 0.2s ease, color 0.2s ease;
}

.btn-size:hover {
  background: rgba(251, 191, 36, 0.2);
  color: #f9fafb;
}

.cenik__disclaimer {
  font-size: 0.85rem;
  color: rgba(148, 163, 184, 0.9);
  text-align: center;
  margin-top: 0.5rem;
}

@media (max-width: 640px) {
  .category__head {
    flex-wrap: wrap;
  }

  .category__intro {
    width: 100%;
    order: 3;
    margin-top: -0.25rem;
  }

  .category__item-main {
    flex-direction: column;
    align-items: flex-start;
  }

  .category__item-actions {
    flex-wrap: wrap;
    width: 100%;
  }

  .btn-detail {
    order: -1;
  }
}
</style>
