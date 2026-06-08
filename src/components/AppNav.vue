<script setup lang="ts">
import { LOGO_URL, NAV_LINKS } from '../constants'
import { useSmoothScroll } from '../composables/useAnimations'

const { handleClick } = useSmoothScroll()
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-3 bg-surface/10 backdrop-blur-xl rounded-full mt-4 mx-auto w-[95%] max-w-container-max border border-white/10 shadow-[0_0_30px_rgba(0,219,233,0.1)]"
  >
    <div class="flex items-center gap-4">
      <img :src="LOGO_URL" alt="FLEXICS Logo" class="w-10 h-10 object-contain" />
      <span class="font-headline-md text-headline-md tracking-tighter text-primary-container">
        FLEXICS
      </span>
    </div>

    <div class="hidden md:flex items-center gap-8">
      <a
        v-for="link in NAV_LINKS"
        :key="link.href"
        :href="link.href"
        class="font-label-caps text-label-caps transition-all duration-300 hover:scale-105"
        :class="
          link.active
            ? 'text-primary-container font-bold border-b-laser-stroke border-primary-container'
            : 'text-on-surface-variant font-medium hover:text-primary-container'
        "
        @click="handleClick"
      >
        {{ link.label }}
      </a>
    </div>

    <button
      class="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-label-caps text-label-caps font-bold hover:scale-105 active:scale-95 transition-all duration-300 shimmer-trigger"
    >
      Book Session
    </button>
  </nav>
</template>
