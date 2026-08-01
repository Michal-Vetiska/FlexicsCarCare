<script setup lang="ts">
import { computed } from 'vue'
import { mapEmbedUrl, mapsUrl, useContent } from '../composables/useContent'

const { content } = useContent()
const about = computed(() => content.value!.about)
const location = computed(() => content.value!.contact.location)
</script>

<template>
  <section v-if="content" id="about" class="py-section-gap px-margin-page bg-surface relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,219,233,0.06),transparent_55%)] pointer-events-none"
    />

    <div class="max-w-container-max mx-auto relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div class="lg:col-span-5 space-y-6 sm:space-y-8 reveal">
          <div>
            <span class="font-label-caps text-label-caps text-primary-container mb-4 block">
              {{ about.eyebrow }}
            </span>
            <h2 class="font-headline-lg text-headline-lg">{{ about.title }}</h2>
          </div>
          <p class="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            {{ about.body1 }}
          </p>
          <p class="font-body-md text-on-surface-variant max-w-md">
            {{ about.body2 }}
          </p>
        </div>

        <div class="lg:col-span-7 reveal">
          <div
            class="glass-panel overflow-hidden hover:border-primary-container/40 transition-all h-full flex flex-col"
          >
            <div class="p-6 sm:p-8 md:p-10 pb-6">
              <span class="font-label-caps text-label-caps text-primary-container mb-6 block">
                {{ about.studioLabel }}
              </span>
              <h3 class="font-display-xl text-headline-lg mb-3">{{ location.name }}</h3>
              <p class="font-body-md text-on-surface mb-2">{{ location.postal }}</p>
              <p class="font-label-caps text-[10px] text-primary-container tracking-wider mb-6">
                {{ location.lat }}, {{ location.lng }}
              </p>
              <a
                :href="mapsUrl(location.lat, location.lng)"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 font-label-caps text-label-caps text-primary-container hover:tracking-widest transition-all"
              >
                {{ about.mapCta }}
                <span class="material-symbols-outlined text-base">arrow_outward</span>
              </a>
            </div>
            <div class="relative aspect-[16/9] border-t border-white/5">
              <iframe
                :src="mapEmbedUrl(location.lat, location.lng)"
                :title="`Flexics studio – ${location.name}`"
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
        <div v-for="stat in about.stats" :key="stat.label" class="flex flex-col gap-2">
          <span class="font-display-xl text-headline-lg text-primary-container">{{ stat.value }}</span>
          <span class="font-label-caps text-label-caps text-on-surface-variant">{{ stat.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
