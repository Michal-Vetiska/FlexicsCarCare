<script setup lang="ts">
import { FOOTER_LINKS } from '../constants'
</script>

<template>
  <footer
    id="about"
    class="w-full flex flex-col items-center gap-element-gap px-margin-page pt-section-gap pb-8 bg-surface-container-lowest border-t border-outline-variant/30"
  >
    <div
      class="w-full max-w-container-max flex flex-col md:flex-row justify-between items-start gap-12 reveal"
    >
      <div class="space-y-6">
        <span class="font-headline-lg text-headline-lg text-surface-variant opacity-20 block">
          FLEXICS
        </span>
        <p class="font-body-md text-on-surface-variant max-w-xs">
          Inženýrství čistoty. Umění detailu. Budoucnost péče o automobily začíná zde.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-x-16 gap-y-4">
        <a
          v-for="link in FOOTER_LINKS"
          :key="link"
          href="#"
          class="text-on-surface-variant font-label-caps text-label-caps hover:text-primary-fixed-dim transition-colors"
        >
          {{ link }}
        </a>
      </div>
    </div>

    <div
      class="w-full max-w-container-max flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 text-center reveal"
    >
      <span class="font-label-caps text-[10px] text-primary-fixed opacity-60">
        © 2024 FLEXICS CAR CARE. ENGINEERED FOR PERFECTION.
      </span>
      <div class="flex gap-6">
        <span
          class="material-symbols-outlined text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors"
        >
          language
        </span>
        <span
          class="material-symbols-outlined text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors"
        >
          shield
        </span>
        <span
          class="material-symbols-outlined text-on-surface-variant hover:text-primary-container cursor-pointer transition-colors"
        >
          bolt
        </span>
      </div>
    </div>
  </footer>
</template>
