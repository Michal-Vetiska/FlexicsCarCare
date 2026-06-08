<script setup lang="ts">
import { ref } from 'vue'
import { HERO_IMAGE_URL } from '../constants'
import { useHeroParallax } from '../composables/useAnimations'

const heroImgRef = ref<HTMLImageElement | null>(null)
const kineticTextRef = ref<HTMLElement | null>(null)

useHeroParallax(heroImgRef, kineticTextRef)
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden">
    <div class="absolute inset-0 z-0 flex items-center justify-center opacity-10 select-none">
      <h1 ref="kineticTextRef" class="hero-headline font-display-xl kinetic-text">FLEXICS</h1>
    </div>

    <div
      class="container max-w-container-max mx-auto px-margin-page relative z-10 flex flex-col md:flex-row items-center gap-12"
    >
      <div class="w-full md:w-1/2 space-y-8">
        <div class="space-y-2 reveal active">
          <span class="font-label-caps text-label-caps text-primary-container tracking-widest block">
            PRECISION DETAILING
          </span>
          <h2 class="font-display-xl text-display-xl leading-none">
            ENGINEERED<br />FOR PERFECTION.
          </h2>
        </div>

        <p
          class="font-body-lg text-body-lg text-on-surface-variant max-w-md reveal active"
          style="transition-delay: 100ms"
        >
          Péče o váš vůz na nejvyšší úrovni. Překonáváme hranice standardního detailingu skrze
          technickou preciznost a umělecký cit.
        </p>

        <div class="flex items-center gap-6 reveal active" style="transition-delay: 200ms">
          <button
            class="bg-primary-container text-on-primary-container px-8 py-4 rounded-none font-label-caps text-label-caps font-bold hover:bg-primary transition-all duration-300 laser-glow relative group shimmer-trigger"
          >
            Rezervovat termín
            <span
              class="absolute -bottom-2 -right-2 w-full h-full border border-primary-container group-hover:bottom-0 group-hover:right-0 transition-all duration-300"
            />
          </button>
          <div class="flex flex-col">
            <span class="font-label-caps text-label-caps text-on-surface-variant">LOCATIONS</span>
            <span class="font-body-md text-body-md font-bold">PRAGUE &amp; BRNO</span>
          </div>
        </div>
      </div>

      <div class="w-full md:w-1/2 relative group reveal active" style="transition-delay: 300ms">
        <div
          class="absolute inset-0 bg-primary-container/20 blur-3xl -z-10 rounded-full scale-75 group-hover:scale-90 transition-transform duration-700"
        />

        <div
          class="hero-img-container relative overflow-hidden rounded-2xl border border-white/10 glass-panel p-2 hover:scale-[1.02] transition-transform duration-500"
        >
          <img
            ref="heroImgRef"
            :src="HERO_IMAGE_URL"
            alt="Luxury Car Detail"
            class="hero-parallax-img w-full aspect-[1.79] object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700 rounded-xl will-change-transform"
          />
        </div>

        <div
          class="absolute -bottom-6 -left-6 glass-panel p-6 border border-primary-container/30 hidden lg:block hover:scale-105 shimmer-trigger"
        >
          <div class="flex flex-col gap-2">
            <span class="font-label-caps text-[10px] text-primary-container">SCANNING...</span>
            <div class="w-32 h-1 bg-surface-container-highest">
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
