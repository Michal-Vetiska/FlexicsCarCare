<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { LOGO_URL, NAV_LINKS } from '../constants'
import { useActiveSection, useSmoothScroll } from '../composables/useAnimations'
import { useBookingModal } from '../composables/useBookingModal'

const { handleClick } = useSmoothScroll()
const { open: openBooking } = useBookingModal()

const menuOpen = ref(false)

const sectionIds = NAV_LINKS.map((link) => link.href.slice(1))
const { activeSection } = useActiveSection(sectionIds)

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
  <header class="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 mt-3 sm:mt-4">
    <nav
      class="flex justify-between items-center gap-3 px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 bg-surface/10 backdrop-blur-xl rounded-full mx-auto w-full max-w-container-max border border-white/10 shadow-[0_0_30px_rgba(0,219,233,0.1)]"
    >
      <a href="#" class="flex items-center gap-2 sm:gap-3 min-w-0 shrink" @click="closeMenu">
        <img :src="LOGO_URL" alt="FLEXICS Logo" class="w-8 h-8 sm:w-10 sm:h-10 object-contain shrink-0" />
        <span
          class="font-headline-md text-lg sm:text-headline-md tracking-tighter text-primary-container truncate"
        >
          <span class="lg:hidden">Flexic's</span>
          <span class="hidden lg:inline">Flexic's Car Care</span>
        </span>
      </a>

      <div class="hidden lg:flex items-center gap-6 xl:gap-8">
        <a
          v-for="link in NAV_LINKS"
          :key="link.href"
          :href="link.href"
          class="font-label-caps text-label-caps transition-all duration-300 hover:scale-105"
          :class="
            isActive(link.href)
              ? 'text-primary-container font-bold border-b-laser-stroke border-primary-container'
              : 'text-on-surface-variant font-medium hover:text-primary-container'
          "
          @click="handleClick"
        >
          {{ link.label }}
        </a>
      </div>

      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          class="hidden sm:inline-flex bg-primary-container text-on-primary-container px-4 lg:px-6 py-2 rounded-full font-label-caps text-label-caps font-bold hover:scale-105 active:scale-95 transition-all duration-300 shimmer-trigger"
          @click="onBook"
        >
          Rezervovat
        </button>

        <button
          type="button"
          class="lg:hidden w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-on-surface hover:text-primary-container hover:border-primary-container/40 transition-colors"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          aria-label="Menu"
          @click="toggleMenu"
        >
          <span class="material-symbols-outlined">{{ menuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
    </nav>

    <!-- Mobile / tablet menu -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="menuOpen"
        id="mobile-menu"
        class="lg:hidden mt-3 mx-auto w-full max-w-container-max rounded-3xl border border-white/10 bg-surface-container-lowest/95 backdrop-blur-xl p-5 sm:p-6 shadow-[0_0_40px_rgba(0,219,233,0.08)]"
      >
        <div class="flex flex-col gap-1">
          <a
            v-for="link in NAV_LINKS"
            :key="link.href"
            :href="link.href"
            class="font-label-caps text-label-caps px-4 py-3 rounded-xl transition-colors"
            :class="
              isActive(link.href)
                ? 'text-primary-container bg-primary-container/10'
                : 'text-on-surface-variant hover:text-primary-container hover:bg-white/5'
            "
            @click="onNavClick"
          >
            {{ link.label }}
          </a>
        </div>
        <button
          type="button"
          class="mt-4 w-full bg-primary-container text-on-primary-container px-6 py-3.5 rounded-full font-label-caps text-label-caps font-bold shimmer-trigger"
          @click="onBook"
        >
          Rezervovat
        </button>
      </div>
    </Transition>
  </header>

  <div
    v-if="menuOpen"
    class="fixed inset-0 z-40 bg-surface-container-lowest/50 backdrop-blur-sm lg:hidden"
    @click="closeMenu"
  />
</template>
