<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'

const sections = [
  {
    id: '1',
    headline: 'Detailing, který vrátí vašemu autu emoce.',
    subline: 'Ruční péče a precizní přístup.',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=1920&q=85',
  },
  {
    id: '2',
    headline: 'Každý detail má smysl.',
    subline: 'Od laku po interiér — nic neponecháme náhodě.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1920&q=85',
  },
  {
    id: '3',
    headline: 'Rezervujte si termín.',
    subline: 'Vyberte služby v ceníku a my se vám ozveme.',
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=85',
  },
]

const scrollRef = ref(null)
const sectionRefs = ref([])
const activeIndex = ref(0)

let observer = null
let scrollHandler = null
let wheelHandler = null

function setRef(el, index) {
  if (el) sectionRefs.value[index] = el
}

onMounted(() => {
  const container = scrollRef.value
  if (!container) return

  scrollHandler = () => {
    const scrollTop = container.scrollTop
    const sectionHeight = container.clientHeight
    const current = Math.floor(scrollTop / sectionHeight)
    activeIndex.value = Math.min(current, sections.length - 1)
  }

  container.addEventListener('scroll', scrollHandler, { passive: true })
  scrollHandler()

  // Zabrání „útěku“ scrollu do rodiče – na konci dolů a na začátku nahoru zůstane scroll v landingu
  const THRESHOLD = 8
  wheelHandler = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = container
    const atTop = scrollTop <= THRESHOLD
    const atBottom = scrollTop >= scrollHeight - clientHeight - THRESHOLD
    const scrollingDown = e.deltaY > 0
    const scrollingUp = e.deltaY < 0
    if ((atTop && scrollingUp) || (atBottom && scrollingDown)) {
      e.preventDefault()
    }
  }
  container.addEventListener('wheel', wheelHandler, { passive: false })

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = sectionRefs.value.findIndex((s) => s === entry.target)
        if (index !== -1) activeIndex.value = index
      })
    },
    { threshold: [0.25, 0.5, 0.75], root: container }
  )

  setTimeout(() => {
    sectionRefs.value.forEach((el) => {
      if (el) observer.observe(el)
    })
  }, 100)
})

onUnmounted(() => {
  const container = scrollRef.value
  if (container) {
    if (scrollHandler) container.removeEventListener('scroll', scrollHandler)
    if (wheelHandler) container.removeEventListener('wheel', wheelHandler)
  }
  observer?.disconnect()
})
</script>

<template>
  <div ref="scrollRef" class="landing-scroll">
    <section
      v-for="(section, index) in sections"
      :key="section.id"
      :ref="(el) => setRef(el, index)"
      class="landing-panel"
      :class="{
        'landing-panel--active': activeIndex === index,
        'landing-panel--prev': activeIndex === index + 1,
        'landing-panel--next': activeIndex === index - 1,
      }"
    >
      <div class="landing-panel__bg">
        <img
          :src="section.image"
          :alt="''"
          class="landing-panel__img"
        />
        <div class="landing-panel__overlay" />
      </div>

      <div class="landing-panel__content">
        <h2 class="landing-panel__headline">{{ section.headline }}</h2>
        <p class="landing-panel__subline">{{ section.subline }}</p>
        <div v-if="index === 2" class="landing-panel__actions">
          <RouterLink to="/cenik" class="landing-panel__btn landing-panel__btn--primary">
            Ceník a výběr služeb
          </RouterLink>
          <RouterLink to="/rezervace" class="landing-panel__btn landing-panel__btn--secondary">
            Rezervovat
          </RouterLink>
        </div>
      </div>

      <div v-if="index < sections.length - 1" class="landing-panel__hint" aria-hidden="true">
        <span class="landing-panel__hint-arrow">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-scroll {
  height: 100%;
  min-height: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
}

.landing-scroll::-webkit-scrollbar {
  width: 6px;
}

.landing-scroll::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.5);
}

.landing-scroll::-webkit-scrollbar-thumb {
  background: rgba(251, 191, 36, 0.5);
  border-radius: 3px;
}

.landing-panel {
  position: relative;
  min-height: 100%;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
}

.landing-panel__bg {
  position: absolute;
  inset: -10%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  perspective: 1200px;
}

.landing-panel__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: perspective(1200px) rotateX(0deg) scale(1.15);
  transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.landing-panel--active .landing-panel__img {
  transform: perspective(1200px) rotateX(0deg) scale(1.08);
}

.landing-panel--prev .landing-panel__img {
  transform: perspective(1200px) rotateX(4deg) scale(1.02);
}

.landing-panel--next .landing-panel__img {
  transform: perspective(1200px) rotateX(-4deg) scale(1.02);
}

.landing-panel__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(2, 6, 23, 0.75) 0%,
    rgba(2, 6, 23, 0.5) 40%,
    rgba(2, 6, 23, 0.85) 100%
  );
  pointer-events: none;
}

.landing-panel__content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: clamp(1.25rem, 4vw, 2.5rem);
  max-width: min(28rem, 92vw);
}

.landing-panel__headline {
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 0.75rem;
  color: #f9fafb;
  text-shadow: 0 2px 24px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease 0.2s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
}

.landing-panel--active .landing-panel__headline {
  opacity: 1;
  transform: translateY(0);
}

.landing-panel__subline {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: rgba(229, 231, 235, 0.95);
  margin: 0 0 1.5rem;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s;
}

.landing-panel--active .landing-panel__subline {
  opacity: 1;
  transform: translateY(0);
}

.landing-panel__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s;
}

.landing-panel--active .landing-panel__actions {
  opacity: 1;
  transform: translateY(0);
}

.landing-panel__btn {
  display: inline-block;
  padding: 0.85rem 1.6rem;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.landing-panel__btn--primary {
  color: #0f172a;
  background: linear-gradient(135deg, #fbbf24, #f97316);
  box-shadow: 0 4px 24px rgba(249, 115, 22, 0.45);
}

.landing-panel__btn--primary:hover {
  transform: scale(1.03);
  box-shadow: 0 6px 32px rgba(249, 115, 22, 0.55);
}

.landing-panel__btn--secondary {
  color: #f9fafb;
  border: 2px solid rgba(248, 250, 252, 0.6);
  background: rgba(15, 23, 42, 0.5);
}

.landing-panel__btn--secondary:hover {
  transform: scale(1.03);
  border-color: rgba(248, 250, 252, 0.9);
  background: rgba(15, 23, 42, 0.7);
}

.landing-panel__hint {
  position: absolute;
  bottom: clamp(2rem, 14vh, 7rem);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.5s ease 0.6s;
}

.landing-panel--active .landing-panel__hint {
  opacity: 1;
}

.landing-panel__hint-arrow {
  color: #f97316;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.6));
  animation: hint-pulse 2s ease-in-out infinite;
}

.landing-panel__hint-arrow svg {
  display: block;
}

@keyframes hint-pulse {
  0%, 100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  50% {
    transform: translateY(6px) scale(1.1);
    opacity: 0.85;
  }
}
</style>
