<script setup>
import { computed, ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  /** 'exterier' | 'interier' | 'keramika' */
  view: { type: String, default: 'exterier' },
  /** 0 = špinavé, 1 = čisté (např. po přidání exteriéru do košíku) */
  exteriorClean: { type: Number, default: 0 },
  interiorClean: { type: Number, default: 0 },
  /** keramika přidá lesk na exteriér */
  ceramicLevel: { type: Number, default: 0 },
})

const emit = defineEmits(['exterior-detailing-complete'])

/** Exteriér – stejné auto (Audi) špinavé a čisté */
const EXTERIOR_IMAGE_DIRTY = '/spinavy-auto-ext.png'
const EXTERIOR_IMAGE_CLEAN = '/cisty-auto-ext.png'
/** Interiér – stejný vůz špinavý a čistý */
const INTERIOR_IMAGE_DIRTY = '/interier-spinavy.png'
const INTERIOR_IMAGE_CLEAN = '/interier-cisty.png'
/** Keramika – čisté auto vs. po keramice (kapky vody) */
const KERAMIKA_IMAGE_BEFORE = EXTERIOR_IMAGE_CLEAN
const KERAMIKA_IMAGE_AFTER = '/keramika-cisty.png'

const exteriorCleanLevel = computed(() =>
  props.view === 'interier' || props.view === 'keramika' ? 0 : Math.min(1, props.exteriorClean)
)
const interiorCleanLevel = computed(() => Math.min(1, props.interiorClean))
/** Keramika: 0 = bez keramiky, 1 = po keramice (stejná logika jako interiér) */
const keramikaLevel = computed(() =>
  props.view === 'keramika' ? (props.ceramicLevel >= 0.5 ? 1 : 0) : 0
)

const detailingRef = ref(null)
const shineRef = ref(null)
const prevExteriorClean = ref(0)

const interiorDetailingRef = ref(null)
const interiorShineRef = ref(null)
const prevInteriorClean = ref(0)

const keramikaDetailingRef = ref(null)
const keramikaShineRef = ref(null)
const prevKeramikaLevel = ref(0)

watch(
  () => exteriorCleanLevel.value,
  (level, prev) => {
    if (props.view === 'interier') return
    if (prev === undefined) {
      prevExteriorClean.value = level
      return
    }
    if (level <= prev) return
    runDetailingAnimation(shineRef, detailingRef, () => emit('exterior-detailing-complete'))
    prevExteriorClean.value = level
  },
  { immediate: true }
)

watch(
  () => interiorCleanLevel.value,
  (level, prev) => {
    if (props.view !== 'interier') return
    if (prev === undefined) {
      prevInteriorClean.value = level
      return
    }
    if (level <= prev) return
    runDetailingAnimation(interiorShineRef, interiorDetailingRef, null)
    prevInteriorClean.value = level
  },
  { immediate: true }
)

watch(
  () => keramikaLevel.value,
  (level, prev) => {
    if (props.view !== 'keramika') return
    if (prev === undefined) {
      prevKeramikaLevel.value = level
      return
    }
    if (level <= prev) return
    runDetailingAnimation(keramikaShineRef, keramikaDetailingRef, null)
    prevKeramikaLevel.value = level
  },
  { immediate: true }
)

function runDetailingAnimation(shineRefEl, wrapRefEl, onComplete) {
  const shine = shineRefEl?.value ?? shineRefEl
  const wrap = wrapRefEl?.value ?? wrapRefEl
  if (!wrap || !shine) return

  gsap.killTweensOf(shine)
  gsap.set(shine, { xPercent: -100, opacity: 1 })

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    onComplete: () => onComplete?.(),
  })
  tl.to(shine, {
    xPercent: 100,
    duration: 1.1,
    ease: 'power2.inOut',
  }).to(
    shine,
    { opacity: 0, duration: 0.25 },
    '-=0.2'
  )
}
</script>

<template>
  <div class="cenik-viewer">
    <!-- Exteriér: špinavé vs čisté auto – plynulý přechod + detailing animace -->
    <div
      v-show="view === 'exterier'"
      ref="detailingRef"
      class="cenik-viewer__exterior"
      aria-hidden="true"
    >
      <img
        :src="EXTERIOR_IMAGE_DIRTY"
        alt=""
        class="cenik-viewer__exterior-img cenik-viewer__exterior-img--dirty"
        :style="{ opacity: 1 - exteriorCleanLevel }"
      />
      <img
        :src="EXTERIOR_IMAGE_CLEAN"
        alt=""
        class="cenik-viewer__exterior-img cenik-viewer__exterior-img--clean"
        :style="{ opacity: exteriorCleanLevel }"
      />
      <!-- Detailing shine – přejetí při přidání exteriéru (GSAP) -->
      <div ref="shineRef" class="cenik-viewer__shine" aria-hidden="true" />
    </div>
    <!-- Interiér – špinavý vs čistý, plynulý přechod + detailing animace -->
    <div
      v-show="view === 'interier'"
      ref="interiorDetailingRef"
      class="cenik-viewer__interior"
      aria-hidden="true"
    >
      <img
        :src="INTERIOR_IMAGE_DIRTY"
        alt=""
        class="cenik-viewer__interior-img cenik-viewer__interior-img--dirty"
        :style="{ opacity: 1 - interiorCleanLevel }"
      />
      <img
        :src="INTERIOR_IMAGE_CLEAN"
        alt=""
        class="cenik-viewer__interior-img cenik-viewer__interior-img--clean"
        :style="{ opacity: interiorCleanLevel }"
      />
      <div ref="interiorShineRef" class="cenik-viewer__shine cenik-viewer__shine--interior" aria-hidden="true" />
    </div>
    <!-- Keramika: čisté auto vs. po keramice (kapky) – plynulý přechod + detailing animace -->
    <div
      v-show="view === 'keramika'"
      ref="keramikaDetailingRef"
      class="cenik-viewer__keramika"
      aria-hidden="true"
    >
      <img
        :src="KERAMIKA_IMAGE_BEFORE"
        alt=""
        class="cenik-viewer__keramika-img cenik-viewer__keramika-img--before"
        :style="{ opacity: 1 - keramikaLevel }"
      />
      <img
        :src="KERAMIKA_IMAGE_AFTER"
        alt=""
        class="cenik-viewer__keramika-img cenik-viewer__keramika-img--after"
        :style="{ opacity: keramikaLevel }"
      />
      <div ref="keramikaShineRef" class="cenik-viewer__shine cenik-viewer__shine--keramika" aria-hidden="true" />
    </div>
    <div class="cenik-viewer__label">
      <template v-if="view === 'exterier'">Exteriér</template>
      <template v-else-if="view === 'interier'">Interiér</template>
      <template v-else>Keramika</template>
      — {{ view === 'interier' ? (interiorClean >= 1 ? 'čisté' : 'špinavé') : view === 'keramika' ? (ceramicLevel >= 0.5 ? 'po keramice' : 'bez keramiky') : (exteriorClean >= 1 ? 'čisté' : 'špinavé') }}
    </div>
  </div>
</template>

<style scoped>
.cenik-viewer {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 380px;
  border-radius: 16px;
  overflow: hidden;
  background: linear-gradient(180deg, #0c0c12 0%, #12121a 100%);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.cenik-viewer__exterior {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: #0c0c12;
  overflow: hidden;
}

.cenik-viewer__exterior-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 50%;
  filter: brightness(0.88) contrast(1.05);
  transition: opacity 0.7s ease;
}

/* Stejný framing obou fotek: špinavá bývá víc zazoomovaná – zmenšíme ji, ať je totožný záběr */
.cenik-viewer__exterior-img--dirty {
  transform: scale(0.9);
  transform-origin: center center;
}
.cenik-viewer__exterior-img--clean {
  z-index: 1;
}

/* Detailing animace – lesklé přejetí (GSAP posouvá .cenik-viewer__shine) */
.cenik-viewer__shine {
  position: absolute;
  inset: -2rem;
  z-index: 2;
  pointer-events: none;
  width: 50%;
  background: linear-gradient(
    105deg,
    transparent 0%,
    transparent 35%,
    rgba(255, 255, 255, 0.08) 45%,
    rgba(255, 255, 255, 0.22) 50%,
    rgba(255, 255, 255, 0.08) 55%,
    transparent 65%,
    transparent 100%
  );
  will-change: transform;
}

.cenik-viewer__interior {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: #0c0c12;
  overflow: hidden;
}

.cenik-viewer__interior-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 50%;
  filter: brightness(0.88) contrast(1.05);
  transition: opacity 0.7s ease;
}

.cenik-viewer__interior-img--dirty {
  transform: scale(0.9);
  transform-origin: center center;
}

.cenik-viewer__interior-img--clean {
  z-index: 1;
}

.cenik-viewer__shine--interior {
  z-index: 2;
}

.cenik-viewer__keramika {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: #0c0c12;
  overflow: hidden;
}

.cenik-viewer__keramika-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 50%;
  filter: brightness(0.88) contrast(1.05);
  transition: opacity 0.7s ease;
}

.cenik-viewer__keramika-img--before {
  transform: scale(0.9);
  transform-origin: center center;
}

.cenik-viewer__keramika-img--after {
  z-index: 1;
}

.cenik-viewer__shine--keramika {
  z-index: 2;
}

.cenik-viewer__label {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.4);
}
</style>
