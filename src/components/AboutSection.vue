<script setup lang="ts">
import {
  STUDIO_LOCATION,
  STUDIO_MAP_EMBED_URL,
  STUDIO_MAPS_URL,
} from '../constants'
</script>

<template>
  <section id="about" class="py-section-gap px-margin-page bg-surface relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,219,233,0.06),transparent_55%)] pointer-events-none"
    />

    <div class="max-w-container-max mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div class="lg:col-span-5 space-y-6 sm:space-y-8 reveal">
          <div>
            <span class="font-label-caps text-label-caps text-primary-container mb-4 block">
              THE STUDIO
            </span>
            <h2 class="font-headline-lg text-headline-lg">O NÁS.</h2>
          </div>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Flexics vznikl z přesvědčení, že péče o automobil je disciplína na pomezí inženýrství a
            umění. Pracujeme výhradně s certifikovanými procesy a materiály, které obstojí v čase.
          </p>
          <p class="font-body-md text-on-surface-variant max-w-md">
            Každý vůz prochází diagnostikou povrchu, přesným workflow a finální kontrolou pod
            spektrálním osvětlením. Bez kompromisů. Bez zkratů.
          </p>
        </div>

        <div class="lg:col-span-7 reveal">
          <div
            class="glass-panel overflow-hidden hover:border-primary-container/40 transition-all h-full flex flex-col"
          >
            <div class="p-6 sm:p-8 md:p-10 pb-6">
              <span class="font-label-caps text-label-caps text-primary-container mb-6 block">
                DETAILING STUDIO
              </span>
              <h3 class="font-display-xl text-headline-lg mb-3">{{ STUDIO_LOCATION.name }}</h3>
              <p class="font-body-md text-on-surface mb-2">{{ STUDIO_LOCATION.postal }}</p>
              <p class="font-label-caps text-[10px] text-primary-container tracking-wider mb-6">
                {{ STUDIO_LOCATION.lat }}, {{ STUDIO_LOCATION.lng }}
              </p>
              <a
                :href="STUDIO_MAPS_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary-container hover:tracking-widest transition-all"
              >
                Navigovat v mapách
                <span class="material-symbols-outlined text-base">arrow_outward</span>
              </a>
            </div>
            <div class="relative aspect-[16/9] border-t border-white/5">
              <iframe
                :src="STUDIO_MAP_EMBED_URL"
                title="Flexics studio – Hustopeče nad Bečvou"
                class="absolute inset-0 w-full h-full grayscale-[0.3] contrast-125 opacity-90"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-white/5 pt-10 sm:pt-12 reveal"
      >
        <div class="flex flex-col gap-2">
          <span class="font-display-xl text-headline-lg text-primary-container">12+</span>
          <span class="font-label-caps text-label-caps text-on-surface-variant">LET EXPERIENCE</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-display-xl text-headline-lg text-primary-container">9H+</span>
          <span class="font-label-caps text-label-caps text-on-surface-variant">CERAMIC HARDNESS</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="font-display-xl text-headline-lg text-primary-container">1</span>
          <span class="font-label-caps text-label-caps text-on-surface-variant">STUDIO CZ</span>
        </div>
      </div>
    </div>
  </section>
</template>
