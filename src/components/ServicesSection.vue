<script setup lang="ts">
import { ref } from 'vue'
import { HERO_IMAGE_URL } from '../constants'
import { SERVICES, type ServiceDetail } from '../data/services'
import ServiceDetailModal from './ServiceDetailModal.vue'

const selected = ref<ServiceDetail | null>(null)

function openService(service: ServiceDetail) {
  selected.value = service
}

function closeService() {
  selected.value = null
}
</script>

<template>
  <section id="services" class="py-section-gap px-margin-page bg-surface">
    <div class="max-w-container-max mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-element-gap gap-6 md:gap-8 reveal">
        <div class="max-w-xl">
          <span class="font-label-caps text-label-caps text-primary-container mb-4 block">
            PORTFOLIO SLUŽEB
          </span>
          <h2 class="font-headline-lg text-headline-lg">DEFINOVÁNÍ<br />ESTETIKY.</h2>
        </div>
        <p class="text-on-surface-variant font-body-md max-w-xs text-left md:text-right">
          Naše procesy jsou navrženy pro ty, kteří vyžadují absolutní dokonalost bez kompromisů.
          Klikněte na službu pro detail.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 md:gap-8 items-stretch">
        <template v-for="service in SERVICES" :key="service.id">
          <!-- Ruční mytí / wide -->
          <button
            v-if="service.layout === 'wide'"
            type="button"
            class="md:col-span-7 group relative overflow-hidden glass-panel p-6 sm:p-8 md:p-12 hover:border-primary-container/40 hover:-translate-y-2 shimmer-trigger reveal text-left cursor-pointer"
            @click="openService(service)"
          >
            <div class="relative z-10">
              <span class="font-label-caps text-label-caps text-primary-container mb-6 sm:mb-8 md:mb-12 block">
                {{ service.code }}
              </span>
              <h3 class="font-display-xl text-headline-lg mb-4">{{ service.title }}</h3>
              <p class="font-body-md text-on-surface-variant max-w-sm mb-6 sm:mb-8">{{ service.short }}</p>
              <div class="flex items-center justify-between gap-4 flex-wrap">
                <div class="flex items-baseline gap-3 sm:gap-4 flex-wrap">
                  <span class="font-label-caps text-label-caps opacity-50 uppercase">Starting at</span>
                  <span class="font-headline-md text-headline-md text-primary-container">
                    {{ service.price }}
                  </span>
                </div>
                <span
                  class="font-label-caps text-[10px] text-primary-container sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
                >
                  DETAIL →
                </span>
              </div>
            </div>
            <div
              class="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none group-hover:opacity-20 transition-opacity hidden sm:block"
            >
              <span
                class="font-display-xl text-[140px] md:text-[200px] leading-none select-none absolute top-1/2 -translate-y-1/2 right-[-50px]"
              >
                01
              </span>
            </div>
          </button>

          <!-- Leštění / narrow -->
          <button
            v-else-if="service.layout === 'narrow'"
            type="button"
            class="md:col-span-5 group glass-panel p-6 sm:p-8 md:p-10 flex flex-col justify-between border-l-4 border-l-primary-container hover:bg-white/5 hover:-translate-y-2 shimmer-trigger reveal text-left cursor-pointer"
            @click="openService(service)"
          >
            <div>
              <span class="font-label-caps text-label-caps text-primary-container mb-6 sm:mb-8 block">
                {{ service.code }}
              </span>
              <h3 class="font-headline-lg text-[28px] sm:text-[32px] mb-4">{{ service.title }}</h3>
              <p class="font-body-md text-on-surface-variant mb-8 sm:mb-12">{{ service.short }}</p>
            </div>
            <div class="flex justify-between items-center gap-4">
              <span class="font-headline-md text-headline-md">{{ service.price }}</span>
              <div
                class="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary-container group-hover:text-black transition-all shrink-0"
              >
                <span class="material-symbols-outlined">arrow_outward</span>
              </div>
            </div>
          </button>

          <!-- Keramická / featured -->
          <button
            v-else
            type="button"
            class="md:col-span-12 relative group bg-surface-container-low border border-primary-container/20 p-6 sm:p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-stretch md:items-center gap-8 md:gap-12 laser-glow reveal shimmer-trigger text-left cursor-pointer"
            @click="openService(service)"
          >
            <div
              class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,219,233,0.08),transparent_50%)]"
            />
            <div class="relative z-10 w-full md:w-1/2">
              <div
                class="inline-block bg-primary-container text-on-primary-container px-3 py-1 font-label-caps text-[10px] mb-4 sm:mb-6"
              >
                ULTIMATE PROTECTION
              </div>
              <h3 class="font-display-xl text-headline-lg mb-4 sm:mb-6 tracking-tight">{{ service.title }}</h3>
              <p class="font-body-lg text-body-lg text-on-surface-variant mb-6 sm:mb-8 max-w-md">
                {{ service.short }}
              </p>
              <div class="flex items-center gap-6 sm:gap-8 flex-wrap">
                <div class="flex flex-col">
                  <span class="font-label-caps text-label-caps opacity-50">INVESTMENT</span>
                  <span class="font-display-xl text-headline-md text-primary-container">
                    {{ service.price }}
                  </span>
                </div>
                <div class="h-12 w-px bg-outline-variant/30 hidden sm:block" />
                <div v-if="service.durability" class="flex flex-col">
                  <span class="font-label-caps text-label-caps opacity-50">DURABILITY</span>
                  <span class="font-display-xl text-headline-md">Up to 5 YEARS</span>
                </div>
                <span
                  class="font-label-caps text-[10px] text-primary-container sm:ml-auto opacity-80 sm:opacity-70 sm:group-hover:opacity-100 transition-opacity"
                >
                  ZOBRAZIT DETAIL →
                </span>
              </div>
            </div>
            <div class="w-full md:w-1/2 relative pointer-events-none">
              <div
                class="aspect-video glass-panel overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-1000"
              >
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent z-10"
                />
                <div
                  class="absolute top-0 left-0 w-[2px] h-full bg-primary-container shadow-[0_0_15px_#00f0ff] z-20 animate-scan-slow"
                />
                <img
                  :src="HERO_IMAGE_URL"
                  alt="Ceramic Coating Macro"
                  class="w-full h-full object-cover scale-125 translate-x-10 group-hover:translate-x-0 transition-transform duration-[2000ms]"
                />
              </div>
            </div>
          </button>
        </template>
      </div>
    </div>

    <ServiceDetailModal :service="selected" @close="closeService" />
  </section>
</template>
