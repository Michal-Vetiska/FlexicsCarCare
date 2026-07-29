<script setup lang="ts">
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, PORTFOLIO_ITEMS } from '../constants'
</script>

<template>
  <section id="portfolio" class="py-section-gap px-margin-page bg-surface-container-lowest">
    <div class="max-w-container-max mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-element-gap gap-6 md:gap-8 reveal">
        <div class="max-w-xl">
          <span class="font-label-caps text-label-caps text-primary-container mb-4 block">
            FROM INSTAGRAM
          </span>
          <h2 class="font-headline-lg text-headline-lg">PORTFOLIO<br />PRÁCÍ.</h2>
        </div>
        <div class="flex flex-col items-start md:items-end gap-4">
          <p class="text-on-surface-variant font-body-md max-w-xs md:text-right">
            Vybrané realizace. Celý feed najdete na našem Instagramu.
          </p>
          <a
            :href="INSTAGRAM_URL"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary-container hover:tracking-widest transition-all duration-300"
          >
            {{ INSTAGRAM_HANDLE }}
            <span class="material-symbols-outlined text-base">arrow_outward</span>
          </a>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 auto-rows-auto md:auto-rows-[240px] lg:auto-rows-[260px]">
        <a
          v-for="(item, index) in PORTFOLIO_ITEMS"
          :key="item.src + index"
          :href="INSTAGRAM_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="group relative overflow-hidden glass-panel shimmer-trigger reveal block"
          :class="item.span"
          :style="{ transitionDelay: `${index * 60}ms` }"
        >
          <img
            :src="item.src"
            :alt="item.alt"
            class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[0.25] group-hover:grayscale-0"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent opacity-80"
          />
          <div class="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
            <span
              class="font-label-caps text-[10px] text-primary-container bg-surface/60 backdrop-blur-sm px-2 py-1 w-fit border border-primary-container/20"
            >
              {{ item.label }}
            </span>
            <div
              class="flex justify-between items-end opacity-100 sm:opacity-0 translate-y-0 sm:translate-y-2 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-300"
            >
              <span class="font-label-caps text-label-caps text-on-surface">View on IG</span>
              <span
                class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-primary-container text-on-primary-container"
              >
                <span class="material-symbols-outlined text-lg">arrow_outward</span>
              </span>
            </div>
          </div>
        </a>
      </div>

      <div class="mt-12 flex justify-center reveal">
        <a
          :href="INSTAGRAM_URL"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-primary-container text-on-primary-container px-6 sm:px-10 py-3.5 sm:py-4 rounded-none font-label-caps text-label-caps font-bold hover:tracking-widest transition-all duration-500 shimmer-trigger laser-glow w-full sm:w-auto text-center"
        >
          Sledovat {{ INSTAGRAM_HANDLE }}
        </a>
      </div>
    </div>
  </section>
</template>
