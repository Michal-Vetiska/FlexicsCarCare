<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useContent } from '../composables/useContent'
import { useActiveSection, useSmoothScroll } from '../composables/useAnimations'
import { useBookingModal } from '../composables/useBookingModal'

const { content } = useContent()
const { handleClick } = useSmoothScroll()
const { open: openBooking } = useBookingModal()

const menuOpen = ref(false)

const links = computed(() => content.value?.nav.links ?? [])
const sectionIds = computed(() => links.value.map((link) => link.href.slice(1)))
const { activeSection } = useActiveSection(sectionIds, 90)

function isActive(href: string) {
  return activeSection.value === href.slice(1)
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}

function onNavClick(e: Event) {
  handleClick(e)
  closeMenu()
}

function onBook() {
  closeMenu()
  openBooking()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && menuOpen.value) closeMenu()
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <header v-if="content" class="fixed top-0 left-0 right-0 z-50 w-full">
    <nav
      class="w-full bg-surface/80 backdrop-blur-xl border-b border-white/10 shadow-[0_0_30px_rgba(0,219,233,0.08)]"
    >
      <div
        class="flex justify-between items-center gap-4 px-4 sm:px-6 lg:px-10 xl:px-14 py-3 sm:py-4 w-full"
      >
        <a
          href="#"
          class="flex items-center gap-2 sm:gap-3 border border-primary-container/40 px-2.5 sm:px-3 py-1.5 sm:py-2 min-w-0 shrink-0 hover:border-primary-container transition-colors"
          @click="closeMenu"
        >
          <img
            :src="content.meta.logoUrl"
            alt="Flexic's Car Care"
            class="w-7 h-7 sm:w-8 sm:h-8 object-contain shrink-0"
          />
          <span
            class="font-headline-md text-sm sm:text-base tracking-[0.08em] uppercase text-primary-container italic font-bold truncate"
          >
            <span class="lg:hidden">Flexic's</span>
            <span class="hidden lg:inline">Flexic's Car Care</span>
          </span>
        </a>

        <div class="hidden lg:flex items-center justify-center gap-6 xl:gap-8 flex-1">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="font-label-caps text-label-caps uppercase italic tracking-[0.12em] transition-colors duration-200"
            :class="
              isActive(link.href)
                ? 'text-primary-container border-b border-primary-container'
                : 'text-on-surface-variant hover:text-primary-container'
            "
            @click="handleClick"
          >
            {{ link.label }}
          </a>
        </div>

        <div class="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            :href="content.contact.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="hidden sm:flex w-10 h-10 border border-white/15 items-center justify-center text-on-surface-variant hover:border-primary-container/40 hover:text-primary-container transition-colors"
            aria-label="Instagram"
          >
            <span class="material-symbols-outlined text-[20px]">photo_camera</span>
          </a>
          <a
            :href="`tel:${content.contact.phoneTel}`"
            class="hidden md:flex w-10 h-10 border border-white/15 items-center justify-center text-on-surface-variant hover:border-primary-container/40 hover:text-primary-container transition-colors"
            aria-label="Telefon"
          >
            <span class="material-symbols-outlined text-[20px]">call</span>
          </a>
          <button
            type="button"
            class="hidden sm:inline-flex bg-primary-container text-on-primary-container px-4 lg:px-5 py-2.5 font-label-caps text-label-caps font-bold uppercase italic tracking-[0.08em] hover:bg-primary transition-colors shimmer-trigger"
            @click="onBook"
          >
            {{ content.nav.bookLabel }}
          </button>

          <button
            type="button"
            class="lg:hidden w-10 h-10 border border-white/15 flex items-center justify-center text-on-surface hover:border-primary-container/40 hover:text-primary-container transition-colors"
            :aria-expanded="menuOpen"
            aria-controls="mobile-menu"
            aria-label="Menu"
            @click="toggleMenu"
          >
            <span class="material-symbols-outlined">{{ menuOpen ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="lg:hidden w-full bg-surface/95 backdrop-blur-xl border-b border-white/10"
      >
        <div class="flex flex-col px-4 sm:px-6 py-2">
          <a
            v-for="link in links"
            :key="link.href"
            :href="link.href"
            class="font-label-caps text-label-caps uppercase italic tracking-[0.12em] px-2 py-3.5 border-b border-white/10 transition-colors"
            :class="
              isActive(link.href)
                ? 'text-primary-container'
                : 'text-on-surface-variant hover:text-primary-container'
            "
            @click="onNavClick"
          >
            {{ link.label }}
          </a>
        </div>
        <div class="px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-3">
          <a
            :href="content.contact.instagramUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 border border-white/15 text-on-surface-variant text-center py-3 font-label-caps text-label-caps uppercase italic tracking-[0.08em] hover:border-primary-container/40 hover:text-primary-container transition-colors"
            @click="closeMenu"
          >
            Instagram
          </a>
          <button
            type="button"
            class="flex-1 bg-primary-container text-on-primary-container py-3 font-label-caps text-label-caps font-bold uppercase italic tracking-[0.08em] shimmer-trigger"
            @click="onBook"
          >
            {{ content.nav.bookLabel }}
          </button>
        </div>
      </div>
    </Transition>
  </header>

  <div
    v-if="menuOpen"
    class="fixed inset-0 z-40 bg-surface-container-lowest/60 backdrop-blur-sm lg:hidden"
    @click="closeMenu"
  />
</template>
