<script setup lang="ts">
import { computed } from 'vue'
import { useContent } from '../composables/useContent'

const { content } = useContent()
const footer = computed(() => content.value!.footer)
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    v-if="content"
    class="w-full flex flex-col items-center gap-element-gap px-margin-page pt-section-gap pb-8 bg-surface-container-lowest border-t border-outline-variant/30"
  >
    <div
      class="w-full max-w-container-max flex flex-col md:flex-row justify-between items-start gap-12 reveal"
    >
      <div class="space-y-6">
        <span class="font-headline-lg text-headline-lg text-surface-variant opacity-20 block break-all">
          {{ footer.brand }}
        </span>
        <p class="font-body-md text-on-surface-variant max-w-xs">
          {{ footer.tagline }}
        </p>
      </div>
      <div class="grid grid-cols-2 gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-4">
        <a
          v-for="link in footer.links"
          :key="link.label"
          :href="link.href"
          class="text-on-surface-variant font-label-caps text-label-caps hover:text-primary-fixed-dim transition-colors"
        >
          {{ link.label }}
        </a>
      </div>
    </div>

    <div
      class="w-full max-w-container-max flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-6 text-center reveal"
    >
      <div class="flex flex-col items-center md:items-start gap-2">
        <span class="font-label-caps text-[10px] text-primary-fixed opacity-60">
          © {{ currentYear }} {{ footer.copyrightSuffix }}
        </span>
        <p class="font-label-caps text-[10px] text-on-surface-variant">
          Web od
          <a
            :href="footer.creditUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-container hover:text-primary transition-colors"
          >
            {{ footer.creditName }}
          </a>
          ·
          <a
            :href="footer.creditUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-on-surface-variant hover:text-primary-container transition-colors"
          >
            michalvetiska.com
          </a>
        </p>
      </div>
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
