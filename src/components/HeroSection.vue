<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContent } from '../composables/useContent'
import { useHeroParallax } from '../composables/useAnimations'
import { useBookingModal } from '../composables/useBookingModal'

const { content } = useContent()
const hero = computed(() => content.value!.hero)
const location = computed(() => content.value!.contact.location)

const heroImgRef = ref<HTMLImageElement | null>(null)
const kineticTextRef = ref<HTMLElement | null>(null)
const { open: openBooking } = useBookingModal()

useHeroParallax(heroImgRef, kineticTextRef)
</script>

<template>
  <section
    v-if="content"
    class="relative min-h-[100svh] flex items-center justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 overflow-hidden"
  >
    <div class="absolute inset-0 z-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
      <h1 ref="kineticTextRef" class="hero-headline font-display-xl kinetic-text">
        {{ hero.kineticText }}
      </h1>
    </div>

    <div
      class="w-full max-w-container-max mx-auto px-margin-page relative z-10 flex flex-col lg:flex-row items-center gap-10 lg:gap-12"
    >
      <div class="w-full lg:w-1/2 space-y-6 sm:space-y-8 min-w-0 relative z-20 text-center lg:text-left">
        <div class="space-y-2 reveal active">
          <span class="font-label-caps text-label-caps text-primary-container tracking-widest block">
            {{ hero.eyebrow }}
          </span>
          <h2
            class="font-display-xl leading-[0.95] tracking-tighter text-[clamp(2.25rem,8vw,5rem)]"
          >
            {{ hero.headlineLine1 }}<br />{{ hero.headlineLine2 }}
          </h2>
        </div>

        <p
          class="font-body-lg text-body-lg text-on-surface-variant max-w-md mx-auto lg:mx-0 reveal active"
          style="transition-delay: 100ms"
        >
          {{ hero.body }}
        </p>

        <div
          class="flex flex-col sm:flex-row items-center sm:items-stretch justify-center lg:justify-start gap-5 sm:gap-6 reveal active"
          style="transition-delay: 200ms"
        >
          <button
            type="button"
            class="bg-primary-container text-on-primary-container px-6 sm:px-8 py-3.5 sm:py-4 rounded-none font-label-caps text-label-caps font-bold hover:bg-primary transition-all duration-300 laser-glow relative group shimmer-trigger w-full sm:w-auto"
            @click="openBooking"
          >
            {{ hero.cta }}
            <span
              class="absolute -bottom-2 -right-2 w-full h-full border border-primary-container group-hover:bottom-0 group-hover:right-0 transition-all duration-300 hidden sm:block"
            />
          </button>
          <div class="flex flex-col text-center sm:text-left">
            <span class="font-label-caps text-label-caps text-on-surface-variant">
              {{ hero.locationEyebrow }}
            </span>
            <span class="font-body-md text-body-md font-bold leading-snug">
              {{ location.shortLabel }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="w-full lg:w-1/2 relative group reveal active min-w-0 z-10"
        style="transition-delay: 300ms"
      >
        <div
          class="absolute inset-0 bg-primary-container/20 blur-3xl -z-10 rounded-full scale-75 group-hover:scale-90 transition-transform duration-700"
        />

        <div
          class="hero-img-container relative overflow-hidden rounded-xl sm:rounded-2xl border border-white/10 glass-panel p-1.5 sm:p-2 hover:scale-[1.02] transition-transform duration-500"
        >
          <img
            ref="heroImgRef"
            :src="hero.imageUrl"
            alt="Luxury Car Detail"
            class="hero-parallax-img w-full aspect-[4/3] sm:aspect-[1.79] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 rounded-lg sm:rounded-xl will-change-transform"
          />
        </div>

        <div
          class="absolute -bottom-4 -left-2 sm:-bottom-6 sm:-left-6 glass-panel p-4 sm:p-6 border border-primary-container/30 hidden md:block hover:scale-105 shimmer-trigger"
        >
          <div class="flex flex-col gap-2">
            <span class="font-label-caps text-[10px] text-primary-container">SCANNING...</span>
            <div class="w-28 sm:w-32 h-1 bg-surface-container-highest">
              <div
                class="h-full bg-primary-container w-2/3 shadow-[0_0_10px_#00f0ff] animate-scan"
              />
            </div>
            <span class="font-label-caps text-label-caps">SURFACE ANALYSIS: 99.8%</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
