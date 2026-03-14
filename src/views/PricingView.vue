<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  exteriorPackages,
  interiorPackages,
  ceramicPackages,
} from '../data/cenik.js'
import { useCart, parsePrice } from '../composables/useCart.js'
import CenikViewer from '../components/CenikViewer.vue'

const { addItem, replaceCategoryItem, removeItem, items } = useCart()

const categories = [
  { step: 1, key: 'exterier', label: 'Exteriér', intro: 'Umytí, leštění, ochrana karoserie.', packages: exteriorPackages },
  { step: 2, key: 'interier', label: 'Interiér', intro: 'Luxování, čištění plastů a kůže.', packages: interiorPackages },
  { step: 3, key: 'keramika', label: 'Keramika', intro: 'Lak, kůže, plasty, světlomety.', packages: ceramicPackages },
]

const activeCategory = ref('exterier')
const expandedDetail = ref(null)
const addingFor = ref(null)
const loaded = ref(false)

/** Dialog změny exteriéru */
const showChangeExteriorDialog = ref(false)
const changeExteriorNewPkg = ref(null)
const changeExteriorNewSize = ref(null)

/** Krátký emotivní slogan po zrušení výběru (toast) */
const sloganToast = ref('')
let sloganToastTimer = null

onMounted(() => {
  requestAnimationFrame(() => { loaded.value = true })
})

const selectedCategories = computed(() => {
  const set = new Set()
  items.value.forEach((item) => {
    if (item.id.startsWith('exterier-')) set.add('exterier')
    else if (item.id.startsWith('interier-')) set.add('interier')
    else if (item.id.startsWith('keramika-')) set.add('keramika')
  })
  return set
})

/** Jediná vybraná položka exteriéru (max jedna v košíku) */
const selectedExteriorItem = computed(() =>
  items.value.find((item) => item.id.startsWith('exterier-')) ?? null
)

/** Jediná vybraná položka interiéru */
const selectedInteriorItem = computed(() =>
  items.value.find((item) => item.id.startsWith('interier-')) ?? null
)

/** Jediná vybraná položka keramiky */
const selectedCeramicItem = computed(() =>
  items.value.find((item) => item.id.startsWith('keramika-')) ?? null
)

/** Aktuální balíčky podle vybrané kategorie */
const activePackages = computed(() => {
  const cat = categories.find((c) => c.key === activeCategory.value)
  return cat ? cat.packages : []
})

/** Exteriér: 0 = špinavé, 1 = čisté (jedna volba = hned čisté, žádná postupná proměna) */
const exteriorClean = computed(() =>
  items.value.some((item) => item.id.startsWith('exterier-')) ? 1 : 0
)

/** Interiér: 0 = špinavý, 1 = čistý (jedna volba = hned čistý + detailing animace, jako u exteriéru) */
const interiorClean = computed(() =>
  items.value.some((item) => item.id.startsWith('interier-')) ? 1 : 0
)

/** Keramika přidá lesk na náhled */
const ceramicLevel = computed(() => {
  const hasCeramic = items.value.some((item) => item.id.startsWith('keramika-'))
  return hasCeramic ? 0.5 : 0
})

function addWithSize(pkg, size) {
  addItem(pkg, size)
  addingFor.value = null
  // Přepnutí na Interiér až po dokončení detailing animace (CenikViewer pošle @exterior-detailing-complete)
  if (pkg.id.startsWith('exterier-')) {
    // neřešíme tady – čekáme na emit z CenikViewer
  }
}

function startAdd(pkg) {
  addingFor.value = pkg.id
}

function toggleDetail(id) {
  expandedDetail.value = expandedDetail.value === id ? null : id
}

function openChangeExteriorDialog() {
  changeExteriorNewPkg.value = null
  changeExteriorNewSize.value = null
  showChangeExteriorDialog.value = true
}

function closeChangeExteriorDialog() {
  showChangeExteriorDialog.value = false
  changeExteriorNewPkg.value = null
  changeExteriorNewSize.value = null
}

function selectChangeExterior(pkg, size) {
  changeExteriorNewPkg.value = pkg
  changeExteriorNewSize.value = size
}

/** Rozdíl ceny při změně exteriéru (nová − stará) */
const changeExteriorDiff = computed(() => {
  const current = selectedExteriorItem.value
  const pkg = changeExteriorNewPkg.value
  const size = changeExteriorNewSize.value
  if (!current || !pkg || !size) return null
  const newPrice = parsePrice(size === 'XL' ? pkg.priceXL : pkg.priceL)
  return newPrice - current.price
})

function confirmChangeExterior() {
  const pkg = changeExteriorNewPkg.value
  const size = changeExteriorNewSize.value
  if (!pkg || !size) return
  replaceCategoryItem('exterier', pkg, size)
  closeChangeExteriorDialog()
  setTimeout(() => {
    activeCategory.value = 'interier'
  }, 400)
}

/** Zrušit výběr exteriéru a ukázat emotivní slogan */
function removeExteriorSelection() {
  const idx = items.value.findIndex((item) => item.id.startsWith('exterier-'))
  if (idx !== -1) removeItem(idx)
  closeChangeExteriorDialog()
  showSloganToast('Vaše auto si taky zaslouží péči 😢')
}

/** Zobrazí toast se sloganem (sdílené pro exteriér / interiér / keramika) */
function showSloganToast(text) {
  sloganToast.value = text
  if (sloganToastTimer) clearTimeout(sloganToastTimer)
  sloganToastTimer = setTimeout(() => {
    sloganToast.value = ''
    sloganToastTimer = null
  }, 3200)
}

// --- Dialog změny interiéru ---
const showChangeInteriorDialog = ref(false)
const changeInteriorNewPkg = ref(null)
const changeInteriorNewSize = ref(null)

function openChangeInteriorDialog() {
  changeInteriorNewPkg.value = null
  changeInteriorNewSize.value = null
  showChangeInteriorDialog.value = true
}

function closeChangeInteriorDialog() {
  showChangeInteriorDialog.value = false
  changeInteriorNewPkg.value = null
  changeInteriorNewSize.value = null
}

function selectChangeInterior(pkg, size) {
  changeInteriorNewPkg.value = pkg
  changeInteriorNewSize.value = size
}

const changeInteriorDiff = computed(() => {
  const current = selectedInteriorItem.value
  const pkg = changeInteriorNewPkg.value
  const size = changeInteriorNewSize.value
  if (!current || !pkg || !size) return null
  const newPrice = parsePrice(size === 'XL' ? pkg.priceXL : pkg.priceL)
  return newPrice - current.price
})

function confirmChangeInterior() {
  const pkg = changeInteriorNewPkg.value
  const size = changeInteriorNewSize.value
  if (!pkg || !size) return
  replaceCategoryItem('interier', pkg, size)
  closeChangeInteriorDialog()
}

function removeInteriorSelection() {
  const idx = items.value.findIndex((item) => item.id.startsWith('interier-'))
  if (idx !== -1) removeItem(idx)
  closeChangeInteriorDialog()
  showSloganToast('Vaše auto si taky zaslouží péči 😢')
}

// --- Dialog změny keramiky ---
const showChangeCeramicDialog = ref(false)
const changeCeramicNewPkg = ref(null)
const changeCeramicNewSize = ref(null)

function openChangeCeramicDialog() {
  changeCeramicNewPkg.value = null
  changeCeramicNewSize.value = null
  showChangeCeramicDialog.value = true
}

function closeChangeCeramicDialog() {
  showChangeCeramicDialog.value = false
  changeCeramicNewPkg.value = null
  changeCeramicNewSize.value = null
}

function selectChangeCeramic(pkg, size) {
  changeCeramicNewPkg.value = pkg
  changeCeramicNewSize.value = size
}

const changeCeramicDiff = computed(() => {
  const current = selectedCeramicItem.value
  const pkg = changeCeramicNewPkg.value
  const size = changeCeramicNewSize.value
  if (!current || !pkg || !size) return null
  const newPrice = parsePrice(size === 'XL' ? pkg.priceXL : pkg.priceL)
  return newPrice - current.price
})

function confirmChangeCeramic() {
  const pkg = changeCeramicNewPkg.value
  const size = changeCeramicNewSize.value
  if (!pkg || !size) return
  replaceCategoryItem('keramika', pkg, size)
  closeChangeCeramicDialog()
}

function removeCeramicSelection() {
  const idx = items.value.findIndex((item) => item.id.startsWith('keramika-'))
  if (idx !== -1) removeItem(idx)
  closeChangeCeramicDialog()
  showSloganToast('Vaše auto si taky zaslouží péči 😢')
}

/** Po dokončení detailing animace (výměna špinavé → čisté) plynule přepnout na Interiér */
/** Přepne na Interiér až po 3 s – jen když má uživatel v košíku vybraný exteriér (právě ho přidal). */
function onExteriorDetailingComplete() {
  if (activeCategory.value !== 'exterier') return
  if (!selectedExteriorItem.value) return
  setTimeout(() => {
    if (!selectedExteriorItem.value) return
    activeCategory.value = 'interier'
  }, 3000)
}
</script>

<template>
  <section class="cenik" :class="{ 'cenik--loaded': loaded }">
    <div class="cenik__bg" aria-hidden="true">
      <div class="cenik__bg-gradient cenik__bg-gradient--1" />
      <div class="cenik__bg-gradient cenik__bg-gradient--2" />
      <div class="cenik__bg-glow" />
    </div>

    <header class="cenik__hero">
      <p class="cenik__eyebrow">Vyberte služby</p>
      <h1 class="cenik__title">
        <span class="cenik__title-text">Ceník</span>
        <span class="cenik__title-accent">služeb</span>
      </h1>
      <div class="cenik__title-line" />
      <p class="cenik__tagline">
        Vyberte kategorii v menu vlevo — přidejte do košíku a sledujte náhled vozu.
      </p>
      <div class="cenik__legend">
        <span class="cenik__legend-pill"><strong>L</strong> sedan, combi</span>
        <span class="cenik__legend-pill"><strong>XL</strong> SUV, minivan</span>
      </div>
    </header>

    <div class="cenik__main">
      <aside class="cenik__sidebar">
        <nav class="cenik__tabs" aria-label="Kategorie služeb">
          <button
            v-for="cat in categories"
            :key="cat.key"
            type="button"
            class="cenik__tab"
            :class="{ 'cenik__tab--active': activeCategory === cat.key, 'cenik__tab--selected': selectedCategories.has(cat.key) }"
            @click="activeCategory = cat.key"
          >
            <span
              class="cenik__tab-num"
              :class="{ 'cenik__tab-num--check': selectedCategories.has(cat.key) }"
              aria-hidden="true"
            >
              <template v-if="selectedCategories.has(cat.key)">✓</template>
              <template v-else>{{ cat.step }}</template>
            </span>
            <span class="cenik__tab-label">{{ cat.label }}</span>
          </button>
        </nav>
        <div class="cenik__list-wrap">
          <!-- Exteriér: sbalený blok s výběrem -->
          <template v-if="activeCategory === 'exterier' && selectedExteriorItem">
            <div
              class="step__collapsed"
              role="button"
              tabindex="0"
              aria-label="Změnit výběr exteriéru"
              @click="openChangeExteriorDialog"
              @keydown.enter="openChangeExteriorDialog"
              @keydown.space.prevent="openChangeExteriorDialog"
            >
              <span class="step__collapsed-check" aria-hidden="true">✓</span>
              <span class="step__collapsed-label">Exteriér — vybráno</span>
              <span class="step__collapsed-name">{{ selectedExteriorItem.name }} ({{ selectedExteriorItem.size }})</span>
              <span class="step__collapsed-price">{{ selectedExteriorItem.priceLabel }}</span>
              <span class="step__collapsed-hint">Kliknutím změníte</span>
            </div>
          </template>
          <!-- Exteriér: rozbalený seznam balíčků -->
          <template v-else-if="activeCategory === 'exterier'">
            <p class="cenik__list-intro">{{ categories.find(c => c.key === activeCategory)?.intro }}</p>
            <div class="cenik__list">
              <div
                v-for="pkg in activePackages"
                :key="pkg.id"
                class="step__item"
              >
                <div class="step__item-main">
                  <div class="step__item-info">
                    <span class="step__item-name">{{ pkg.name }}</span>
                    <span class="step__item-prices">
                      <span class="step__price">L {{ pkg.priceL }}</span>
                      <span class="step__price-sep">/</span>
                      <span class="step__price">XL {{ pkg.priceXL }}</span>
                    </span>
                  </div>
                  <div class="step__item-actions">
                    <button
                      type="button"
                      class="btn-detail"
                      :class="{ 'btn-detail--open': expandedDetail === pkg.id }"
                      :aria-expanded="expandedDetail === pkg.id"
                      @click="toggleDetail(pkg.id)"
                    >
                      {{ expandedDetail === pkg.id ? 'Skrýt' : 'Co je zahrnuto' }}
                      <span class="btn-detail__chevron">›</span>
                    </button>
                    <template v-if="addingFor === pkg.id">
                      <button type="button" class="btn-size" @click="addWithSize(pkg, 'L')">L — {{ pkg.priceL }}</button>
                      <button type="button" class="btn-size" @click="addWithSize(pkg, 'XL')">XL — {{ pkg.priceXL }}</button>
                    </template>
                    <button v-else type="button" class="btn-cart" @click="startAdd(pkg)">
                      <span class="btn-cart__icon">+</span> Do košíku
                    </button>
                  </div>
                </div>
                <Transition name="detail">
                  <div v-show="expandedDetail === pkg.id" class="step__item-detail">
                    <p class="step__item-desc">{{ pkg.description }}</p>
                    <p v-if="pkg.subtitle" class="step__item-subtitle">{{ pkg.subtitle }}</p>
                    <ul v-if="pkg.extras?.length" class="step__item-extras">
                      <li v-for="e in pkg.extras" :key="e">{{ e }}</li>
                    </ul>
                    <p v-if="pkg.extra" class="step__item-extra">{{ pkg.extra }}</p>
                  </div>
                </Transition>
              </div>
            </div>
          </template>
          <!-- Interiér: sbalený blok s výběrem -->
          <template v-else-if="activeCategory === 'interier' && selectedInteriorItem">
            <div
              class="step__collapsed"
              role="button"
              tabindex="0"
              aria-label="Změnit výběr interiéru"
              @click="openChangeInteriorDialog"
              @keydown.enter="openChangeInteriorDialog"
              @keydown.space.prevent="openChangeInteriorDialog"
            >
              <span class="step__collapsed-check" aria-hidden="true">✓</span>
              <span class="step__collapsed-label">Interiér — vybráno</span>
              <span class="step__collapsed-name">{{ selectedInteriorItem.name }} ({{ selectedInteriorItem.size }})</span>
              <span class="step__collapsed-price">{{ selectedInteriorItem.priceLabel }}</span>
              <span class="step__collapsed-hint">Kliknutím změníte</span>
            </div>
          </template>
          <!-- Keramika: sbalený blok s výběrem -->
          <template v-else-if="activeCategory === 'keramika' && selectedCeramicItem">
            <div
              class="step__collapsed"
              role="button"
              tabindex="0"
              aria-label="Změnit výběr keramiky"
              @click="openChangeCeramicDialog"
              @keydown.enter="openChangeCeramicDialog"
              @keydown.space.prevent="openChangeCeramicDialog"
            >
              <span class="step__collapsed-check" aria-hidden="true">✓</span>
              <span class="step__collapsed-label">Keramika — vybráno</span>
              <span class="step__collapsed-name">{{ selectedCeramicItem.name }} ({{ selectedCeramicItem.size }})</span>
              <span class="step__collapsed-price">{{ selectedCeramicItem.priceLabel }}</span>
              <span class="step__collapsed-hint">Kliknutím změníte</span>
            </div>
          </template>
          <!-- Interiér / Keramika: rozbalený seznam -->
          <template v-else>
            <p class="cenik__list-intro">{{ categories.find(c => c.key === activeCategory)?.intro }}</p>
            <div class="cenik__list">
              <div
                v-for="pkg in activePackages"
                :key="pkg.id"
                class="step__item"
              >
                <div class="step__item-main">
                  <div class="step__item-info">
                    <span class="step__item-name">{{ pkg.name }}</span>
                    <span class="step__item-prices">
                      <span class="step__price">L {{ pkg.priceL }}</span>
                      <span class="step__price-sep">/</span>
                      <span class="step__price">XL {{ pkg.priceXL }}</span>
                    </span>
                  </div>
                  <div class="step__item-actions">
                    <button
                      type="button"
                      class="btn-detail"
                      :class="{ 'btn-detail--open': expandedDetail === pkg.id }"
                      :aria-expanded="expandedDetail === pkg.id"
                      @click="toggleDetail(pkg.id)"
                    >
                      {{ expandedDetail === pkg.id ? 'Skrýt' : 'Co je zahrnuto' }}
                      <span class="btn-detail__chevron">›</span>
                    </button>
                    <template v-if="addingFor === pkg.id">
                      <button type="button" class="btn-size" @click="addWithSize(pkg, 'L')">L — {{ pkg.priceL }}</button>
                      <button type="button" class="btn-size" @click="addWithSize(pkg, 'XL')">XL — {{ pkg.priceXL }}</button>
                    </template>
                    <button v-else type="button" class="btn-cart" @click="startAdd(pkg)">
                      <span class="btn-cart__icon">+</span> Do košíku
                    </button>
                  </div>
                </div>
                <Transition name="detail">
                  <div v-show="expandedDetail === pkg.id" class="step__item-detail">
                    <p class="step__item-desc">{{ pkg.description }}</p>
                    <p v-if="pkg.subtitle" class="step__item-subtitle">{{ pkg.subtitle }}</p>
                    <ul v-if="pkg.extras?.length" class="step__item-extras">
                      <li v-for="e in pkg.extras" :key="e">{{ e }}</li>
                    </ul>
                    <p v-if="pkg.extra" class="step__item-extra">{{ pkg.extra }}</p>
                  </div>
                </Transition>
              </div>
            </div>
          </template>
        </div>
      </aside>
      <div class="cenik__viewer-wrap">
        <CenikViewer
          :view="activeCategory"
          :exterior-clean="exteriorClean"
          :interior-clean="interiorClean"
          :ceramic-level="ceramicLevel"
          @exterior-detailing-complete="onExteriorDetailingComplete"
        />
      </div>
    </div>

    <footer class="cenik__footer">
      <p class="cenik__disclaimer">Ceny jsou orientační. Finální částku upřesníme po kontrole vozu.</p>
    </footer>

    <!-- Dialog změny exteriéru -->
    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="showChangeExteriorDialog"
          class="dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-change-exterior-title"
          @click.self="closeChangeExteriorDialog"
        >
          <div class="dialog dialog--change-exterior">
            <h2 id="dialog-change-exterior-title" class="dialog__title">Změnit výběr exteriéru</h2>
            <p class="dialog__current">
              Aktuálně: <strong>{{ selectedExteriorItem?.name }} ({{ selectedExteriorItem?.size }})</strong> — {{ selectedExteriorItem?.priceLabel }}
            </p>
            <p class="dialog__sub">Vyberte jiný balíček a velikost:</p>
            <div class="dialog__packages">
              <div
                v-for="pkg in exteriorPackages"
                :key="pkg.id"
                class="dialog-pkg"
                :class="{ 'dialog-pkg--selected': changeExteriorNewPkg?.id === pkg.id }"
              >
                <span class="dialog-pkg__name">{{ pkg.name }}</span>
                <span class="dialog-pkg__prices">L {{ pkg.priceL }} / XL {{ pkg.priceXL }}</span>
                <div class="dialog-pkg__sizes">
                  <button
                    type="button"
                    class="btn-size"
                    :class="{ 'btn-size--active': changeExteriorNewPkg?.id === pkg.id && changeExteriorNewSize === 'L' }"
                    @click="selectChangeExterior(pkg, 'L')"
                  >
                    L
                  </button>
                  <button
                    type="button"
                    class="btn-size"
                    :class="{ 'btn-size--active': changeExteriorNewPkg?.id === pkg.id && changeExteriorNewSize === 'XL' }"
                    @click="selectChangeExterior(pkg, 'XL')"
                  >
                    XL
                  </button>
                </div>
              </div>
            </div>
            <div v-if="changeExteriorDiff !== null" class="dialog__diff">
              <template v-if="changeExteriorDiff > 0">
                Rozdíl: <strong>+{{ changeExteriorDiff.toLocaleString('cs-CZ') }} Kč</strong>
              </template>
              <template v-else-if="changeExteriorDiff < 0">
                Rozdíl: <strong>{{ changeExteriorDiff.toLocaleString('cs-CZ') }} Kč</strong>
              </template>
              <template v-else>
                Stejná cena
              </template>
            </div>
            <div class="dialog__actions dialog__actions--multi">
              <button
                type="button"
                class="dialog__btn dialog__btn--text"
                @click="removeExteriorSelection"
              >
                Zrušit výběr
              </button>
              <div class="dialog__actions-right">
                <button type="button" class="dialog__btn dialog__btn--secondary" @click="closeChangeExteriorDialog">
                  Zrušit
                </button>
                <button
                  type="button"
                  class="dialog__btn dialog__btn--primary"
                  :disabled="!changeExteriorNewPkg || !changeExteriorNewSize"
                  @click="confirmChangeExterior"
                >
                  Ano, změnit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Dialog změny interiéru -->
    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="showChangeInteriorDialog"
          class="dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-change-interior-title"
          @click.self="closeChangeInteriorDialog"
        >
          <div class="dialog dialog--change-exterior">
            <h2 id="dialog-change-interior-title" class="dialog__title">Změnit výběr interiéru</h2>
            <p class="dialog__current">
              Aktuálně: <strong>{{ selectedInteriorItem?.name }} ({{ selectedInteriorItem?.size }})</strong> — {{ selectedInteriorItem?.priceLabel }}
            </p>
            <p class="dialog__sub">Vyberte jiný balíček a velikost:</p>
            <div class="dialog__packages">
              <div
                v-for="pkg in interiorPackages"
                :key="pkg.id"
                class="dialog-pkg"
                :class="{ 'dialog-pkg--selected': changeInteriorNewPkg?.id === pkg.id }"
              >
                <span class="dialog-pkg__name">{{ pkg.name }}</span>
                <span class="dialog-pkg__prices">L {{ pkg.priceL }} / XL {{ pkg.priceXL }}</span>
                <div class="dialog-pkg__sizes">
                  <button
                    type="button"
                    class="btn-size"
                    :class="{ 'btn-size--active': changeInteriorNewPkg?.id === pkg.id && changeInteriorNewSize === 'L' }"
                    @click="selectChangeInterior(pkg, 'L')"
                  >
                    L
                  </button>
                  <button
                    type="button"
                    class="btn-size"
                    :class="{ 'btn-size--active': changeInteriorNewPkg?.id === pkg.id && changeInteriorNewSize === 'XL' }"
                    @click="selectChangeInterior(pkg, 'XL')"
                  >
                    XL
                  </button>
                </div>
              </div>
            </div>
            <div v-if="changeInteriorDiff !== null" class="dialog__diff">
              <template v-if="changeInteriorDiff > 0">
                Rozdíl: <strong>+{{ changeInteriorDiff.toLocaleString('cs-CZ') }} Kč</strong>
              </template>
              <template v-else-if="changeInteriorDiff < 0">
                Rozdíl: <strong>{{ changeInteriorDiff.toLocaleString('cs-CZ') }} Kč</strong>
              </template>
              <template v-else>
                Stejná cena
              </template>
            </div>
            <div class="dialog__actions dialog__actions--multi">
              <button
                type="button"
                class="dialog__btn dialog__btn--text"
                @click="removeInteriorSelection"
              >
                Zrušit výběr
              </button>
              <div class="dialog__actions-right">
                <button type="button" class="dialog__btn dialog__btn--secondary" @click="closeChangeInteriorDialog">
                  Zrušit
                </button>
                <button
                  type="button"
                  class="dialog__btn dialog__btn--primary"
                  :disabled="!changeInteriorNewPkg || !changeInteriorNewSize"
                  @click="confirmChangeInterior"
                >
                  Ano, změnit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Dialog změny keramiky -->
    <Teleport to="body">
      <Transition name="dialog">
        <div
          v-if="showChangeCeramicDialog"
          class="dialog-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="dialog-change-ceramic-title"
          @click.self="closeChangeCeramicDialog"
        >
          <div class="dialog dialog--change-exterior">
            <h2 id="dialog-change-ceramic-title" class="dialog__title">Změnit výběr keramiky</h2>
            <p class="dialog__current">
              Aktuálně: <strong>{{ selectedCeramicItem?.name }} ({{ selectedCeramicItem?.size }})</strong> — {{ selectedCeramicItem?.priceLabel }}
            </p>
            <p class="dialog__sub">Vyberte jiný balíček a velikost:</p>
            <div class="dialog__packages">
              <div
                v-for="pkg in ceramicPackages"
                :key="pkg.id"
                class="dialog-pkg"
                :class="{ 'dialog-pkg--selected': changeCeramicNewPkg?.id === pkg.id }"
              >
                <span class="dialog-pkg__name">{{ pkg.name }}</span>
                <span class="dialog-pkg__prices">L {{ pkg.priceL }} / XL {{ pkg.priceXL }}</span>
                <div class="dialog-pkg__sizes">
                  <button
                    type="button"
                    class="btn-size"
                    :class="{ 'btn-size--active': changeCeramicNewPkg?.id === pkg.id && changeCeramicNewSize === 'L' }"
                    @click="selectChangeCeramic(pkg, 'L')"
                  >
                    L
                  </button>
                  <button
                    type="button"
                    class="btn-size"
                    :class="{ 'btn-size--active': changeCeramicNewPkg?.id === pkg.id && changeCeramicNewSize === 'XL' }"
                    @click="selectChangeCeramic(pkg, 'XL')"
                  >
                    XL
                  </button>
                </div>
              </div>
            </div>
            <div v-if="changeCeramicDiff !== null" class="dialog__diff">
              <template v-if="changeCeramicDiff > 0">
                Rozdíl: <strong>+{{ changeCeramicDiff.toLocaleString('cs-CZ') }} Kč</strong>
              </template>
              <template v-else-if="changeCeramicDiff < 0">
                Rozdíl: <strong>{{ changeCeramicDiff.toLocaleString('cs-CZ') }} Kč</strong>
              </template>
              <template v-else>
                Stejná cena
              </template>
            </div>
            <div class="dialog__actions dialog__actions--multi">
              <button
                type="button"
                class="dialog__btn dialog__btn--text"
                @click="removeCeramicSelection"
              >
                Zrušit výběr
              </button>
              <div class="dialog__actions-right">
                <button type="button" class="dialog__btn dialog__btn--secondary" @click="closeChangeCeramicDialog">
                  Zrušit
                </button>
                <button
                  type="button"
                  class="dialog__btn dialog__btn--primary"
                  :disabled="!changeCeramicNewPkg || !changeCeramicNewSize"
                  @click="confirmChangeCeramic"
                >
                  Ano, změnit
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast se sloganem po zrušení výběru -->
    <Teleport to="body">
      <Transition name="toast">
        <div v-if="sloganToast" class="slogan-toast" role="status">
          {{ sloganToast }}
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.cenik {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 2rem;
  min-height: 100%;
}

.cenik__main {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 360px) 1fr;
  gap: 1.5rem;
  align-items: start;
  min-height: 420px;
}

.cenik__sidebar {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(18, 18, 24, 0.65);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
}

.cenik__tabs {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.cenik__tab {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.65rem 0.9rem;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: rgba(226, 232, 240, 0.9);
  font-size: 0.9rem;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.cenik__tab:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #f9fafb;
}

.cenik__tab--active {
  background: rgba(249, 115, 22, 0.15);
  color: #f97316;
}

.cenik__tab--selected {
  box-shadow: 0 0 0 1px rgba(249, 115, 22, 0.25);
}

.cenik__tab-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.08);
  font-size: 0.75rem;
  font-weight: 700;
  flex-shrink: 0;
}

.cenik__tab-num--check {
  background: rgba(34, 197, 94, 0.25);
  color: #22c55e;
  font-size: 0.85rem;
}

.cenik__tab--active .cenik__tab-num {
  background: rgba(249, 115, 22, 0.4);
  color: #fff;
}

.cenik__tab--active .cenik__tab-num--check {
  background: rgba(34, 197, 94, 0.35);
  color: #4ade80;
}

.cenik__list-wrap {
  padding: 0.75rem 1rem 1rem;
  max-height: 55vh;
  overflow-y: auto;
}

.cenik__list-wrap::-webkit-scrollbar {
  width: 5px;
}

.cenik__list-wrap::-webkit-scrollbar-thumb {
  background: rgba(249, 115, 22, 0.35);
  border-radius: 3px;
}

/* Sbalená sekce (vybraný exteriér) */
.step__collapsed {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  padding: 1rem 1.25rem;
  border-radius: 12px;
  background: rgba(249, 115, 22, 0.08);
  border: 1px solid rgba(249, 115, 22, 0.25);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.step__collapsed:hover {
  background: rgba(249, 115, 22, 0.12);
  border-color: rgba(249, 115, 22, 0.4);
}

.step__collapsed-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: rgba(34, 197, 94, 0.25);
  color: #22c55e;
  font-size: 0.75rem;
  font-weight: 700;
}

.step__collapsed-label {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.95);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.step__collapsed-name {
  font-weight: 600;
  font-size: 1rem;
  color: #f9fafb;
}

.step__collapsed-price {
  font-size: 0.9rem;
  color: #f97316;
  font-weight: 600;
}

.step__collapsed-hint {
  width: 100%;
  font-size: 0.75rem;
  color: rgba(148, 163, 184, 0.8);
  margin-top: 0.15rem;
}

.cenik__list-intro {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.95);
  margin: 0 0 0.6rem;
}

.cenik__list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cenik__viewer-wrap {
  min-height: 380px;
  border-radius: 16px;
  overflow: hidden;
}

/* Pozadí stránky */
.cenik__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.cenik__bg-gradient {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0;
  transition: opacity 1.2s ease 0.3s;
}

.cenik--loaded .cenik__bg-gradient {
  opacity: 0.5;
}

.cenik__bg-gradient--1 {
  width: 80vmin;
  height: 80vmin;
  background: radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 60%);
  top: -20vmin;
  left: -10vmin;
}

.cenik__bg-gradient--2 {
  width: 60vmin;
  height: 60vmin;
  background: radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%);
  bottom: -10vmin;
  right: -15vmin;
}

.cenik__bg-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 120% 60% at 50% -20%,
    rgba(249, 115, 22, 0.06) 0%,
    transparent 50%
  );
  pointer-events: none;
}

/* Hero */
.cenik__hero {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 1rem 0 0.5rem;
}

.cenik__eyebrow {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(249, 115, 22, 0.95);
  margin: 0 0 0.75rem;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s;
}

.cenik--loaded .cenik__eyebrow {
  opacity: 1;
  transform: translateY(0);
}

.cenik__title {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: baseline;
  gap: 0.35em;
  margin: 0 0 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
}

.cenik--loaded .cenik__title {
  opacity: 1;
  transform: translateY(0);
}

.cenik__title-text {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
  color: #f9fafb;
}

.cenik__title-accent {
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  background: linear-gradient(135deg, #fbbf24 0%, #f97316 50%, #ea580c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cenik__title-line {
  width: 4rem;
  height: 3px;
  margin: 0 auto 1.25rem;
  background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.8), transparent);
  border-radius: 2px;
  opacity: 0;
  transform: scaleX(0);
  transition: opacity 0.5s ease 0.5s, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.5s;
}

.cenik--loaded .cenik__title-line {
  opacity: 1;
  transform: scaleX(1);
}

.cenik__tagline {
  font-size: clamp(1rem, 2.2vw, 1.2rem);
  color: rgba(229, 231, 235, 0.9);
  max-width: 32rem;
  margin: 0 auto 1rem;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s;
}

.cenik--loaded .cenik__tagline {
  opacity: 1;
  transform: translateY(0);
}

.cenik__legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.6rem;
  opacity: 0;
  transition: opacity 0.5s ease 0.55s;
}

.cenik--loaded .cenik__legend {
  opacity: 1;
}

.cenik__legend-pill {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.95);
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.cenik__legend-pill strong {
  color: #e5e7eb;
  margin-right: 0.2em;
}

/* Položky v bočním seznamu */
.cenik__list .step__item {
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: background 0.2s ease;
}

.cenik__list .step__item:hover {
  background: rgba(255, 255, 255, 0.02);
}

.cenik__list .step__item:last-child {
  border-bottom: none;
}

.step__item-main {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.step__item-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.step__item-name {
  font-weight: 600;
  font-size: 0.98rem;
  color: #f9fafb;
}

.step__item-prices {
  font-size: 0.82rem;
  color: rgba(209, 213, 219, 0.85);
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.step__price-sep {
  color: rgba(148, 163, 184, 0.6);
}

.step__item-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
}

.btn-detail {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.6rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(209, 213, 219, 0.95);
  font-size: 0.75rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease, color 0.2s ease;
}

.btn-detail:hover {
  border-color: rgba(249, 115, 22, 0.45);
  color: #f97316;
  background: rgba(249, 115, 22, 0.06);
}

.btn-detail--open {
  border-color: rgba(249, 115, 22, 0.5);
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
}

.btn-detail__chevron {
  font-size: 0.85rem;
  transition: transform 0.25s ease;
}

.btn-detail--open .btn-detail__chevron {
  transform: rotate(90deg);
}

.step__item-detail {
  overflow: hidden;
  padding-top: 0.85rem;
  margin-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.detail-enter-active,
.detail-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.detail-enter-from,
.detail-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.step__item-desc {
  margin: 0 0 0.4rem;
  font-size: 0.83rem;
  color: rgba(209, 213, 219, 0.9);
  line-height: 1.55;
}

.step__item-subtitle {
  margin: 0 0 0.4rem;
  font-size: 0.78rem;
  color: rgba(148, 163, 184, 0.95);
}

.step__item-extras {
  margin: 0;
  padding-left: 1rem;
  font-size: 0.78rem;
  color: rgba(209, 213, 219, 0.88);
  line-height: 1.55;
}

.step__item-extras li {
  margin-bottom: 0.2rem;
}

.step__item-extras li::marker {
  color: #f97316;
}

.step__item-extra {
  margin: 0.45rem 0 0;
  font-size: 0.78rem;
  color: rgba(148, 163, 184, 0.95);
}

.btn-cart {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: none;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  cursor: pointer;
  color: #0f172a;
  background: linear-gradient(180deg, #fcd34d 0%, #f97316 100%);
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 10px rgba(249, 115, 22, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
}

.btn-cart:hover {
  transform: translateY(-1px);
  filter: brightness(1.06);
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.3) inset,
    0 6px 20px rgba(249, 115, 22, 0.45);
}

.btn-cart:active {
  transform: translateY(0);
}

.btn-cart__icon {
  font-size: 1rem;
  line-height: 1;
  opacity: 0.95;
}

.btn-size {
  padding: 0.4rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(249, 115, 22, 0.5);
  font-size: 0.78rem;
  font-weight: 500;
  cursor: pointer;
  color: #f97316;
  background: rgba(15, 23, 42, 0.9);
  transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
}

.btn-size:hover {
  background: rgba(249, 115, 22, 0.15);
  color: #fbbf24;
  transform: scale(1.02);
}

/* Dialog změny exteriéru */
.dialog-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
}

.dialog {
  background: linear-gradient(180deg, #1e1e28 0%, #15151c 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 1.5rem;
  max-width: 420px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
}

.dialog__title {
  font-size: 1.15rem;
  font-weight: 700;
  color: #f9fafb;
  margin: 0 0 0.75rem;
}

.dialog__current {
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.9);
  margin: 0 0 1rem;
}

.dialog__current strong {
  color: #f9fafb;
}

.dialog__sub {
  font-size: 0.85rem;
  color: rgba(148, 163, 184, 0.95);
  margin: 0 0 0.5rem;
}

.dialog__packages {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.dialog-pkg {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 0.5rem 0.75rem;
  padding: 0.6rem 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  background: rgba(255, 255, 255, 0.02);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.dialog-pkg:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
}

.dialog-pkg--selected {
  border-color: rgba(249, 115, 22, 0.4);
  background: rgba(249, 115, 22, 0.08);
}

.dialog-pkg__name {
  font-weight: 600;
  font-size: 0.9rem;
  color: #f9fafb;
}

.dialog-pkg__prices {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.9);
}

.dialog-pkg__sizes {
  display: flex;
  gap: 0.35rem;
}

.dialog-pkg .btn-size {
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
}

.btn-size--active {
  background: rgba(249, 115, 22, 0.3) !important;
  border-color: #f97316 !important;
  color: #fbbf24 !important;
}

.dialog__diff {
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.95);
  margin-bottom: 1.25rem;
  padding: 0.5rem 0;
}

.dialog__diff strong {
  color: #f97316;
}

.dialog__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
}

.dialog__actions--multi {
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.dialog__actions-right {
  display: flex;
  gap: 0.75rem;
}

.dialog__btn--text {
  border: none;
  background: transparent;
  color: rgba(148, 163, 184, 0.95);
  font-size: 0.85rem;
  padding: 0.5rem 0;
}

.dialog__btn--text:hover {
  color: #f97316;
}

/* Toast se sloganem */
.slogan-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 110;
  max-width: 90vw;
  padding: 0.85rem 1.5rem;
  border-radius: 12px;
  background: rgba(30, 30, 40, 0.95);
  border: 1px solid rgba(249, 115, 22, 0.3);
  color: rgba(249, 226, 210, 0.95);
  font-size: 0.95rem;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(12px);
}

.dialog__btn {
  padding: 0.5rem 1.25rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.dialog__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.dialog__btn--secondary {
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: transparent;
  color: rgba(226, 232, 240, 0.9);
}

.dialog__btn--secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.06);
}

.dialog__btn--primary {
  border: none;
  background: linear-gradient(180deg, #fcd34d 0%, #f97316 100%);
  color: #0f172a;
}

.dialog__btn--primary:hover:not(:disabled) {
  filter: brightness(1.08);
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.25s ease;
}

.dialog-enter-active .dialog,
.dialog-leave-active .dialog {
  transition: transform 0.25s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-from .dialog,
.dialog-leave-to .dialog {
  transform: scale(0.96);
}

/* Footer sekce ceníku */
.cenik__footer {
  position: relative;
  z-index: 1;
  text-align: center;
  padding-top: 1rem;
}

.cenik__disclaimer {
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.7);
  margin: 0;
}

/* Responzivita */
@media (max-width: 900px) {
  .cenik__main {
    grid-template-columns: 1fr;
    min-height: 0;
  }

  .cenik__viewer-wrap {
    min-height: 320px;
    order: -1;
  }

  .cenik__list-wrap {
    max-height: 45vh;
  }
}

@media (max-width: 640px) {
  .cenik {
    gap: 1.25rem;
    padding-bottom: 1.5rem;
  }

  .cenik__title {
    flex-direction: column;
    gap: 0.1em;
  }

  .cenik__legend {
    flex-direction: column;
    align-items: center;
  }

  .cenik__tabs {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .cenik__tab {
    flex: 1;
    min-width: 0;
    justify-content: center;
  }

  .cenik__list .step__item-actions {
    gap: 0.5rem;
  }

  .btn-detail {
    order: -1;
    width: 100%;
    justify-content: center;
  }
}
</style>
