<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContent } from '../composables/useContent'
import type { ServiceDetail } from '../types/content'
import ServiceDetailModal from './ServiceDetailModal.vue'

const { content } = useContent()
const services = computed(() => content.value!.services)
const selected = ref<ServiceDetail | null>(null)

function openService(service: ServiceDetail) {
  selected.value = service
}

function closeService() {
  selected.value = null
}
</script>

<template>
  <section v-if="content" id="services" class="py-section-gap px-margin-page bg-surface">
    <div class="max-w-container-max mx-auto">
      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-end mb-element-gap gap-6 md:gap-8 reveal"
      >
        <div class="max-w-xl">
          <span class="font-label-caps text-label-caps text-primary-container mb-4 block">
            {{ services.eyebrow }}
          </span>
          <h2 class="font-headline-lg text-headline-lg">
            {{ services.titleLine1 }}<br />{{ services.titleLine2 }}
          </h2>
        </div>
        <p class="text-on-surface-variant font-body-md max-w-xs text-left md:text-right">
          {{ services.intro }}
        </p>
      </div>

      <div class="space-y-14 sm:space-y-16 md:space-y-20">
        <div
          v-for="category in services.categories"
          :key="category.id"
          class="reveal"
        >
          <div class="flex items-baseline gap-4 mb-6 sm:mb-8">
            <span class="font-label-caps text-label-caps text-primary-container">
              {{ category.code }}
            </span>
            <h3 class="font-headline-lg text-[28px] sm:text-[32px] md:text-headline-lg">
              {{ category.label }}
            </h3>
          </div>

          <div
            class="grid gap-5 sm:gap-6 md:gap-8"
            :class="
              category.services.length === 1
                ? 'grid-cols-1 max-w-2xl'
                : 'grid-cols-1 md:grid-cols-2'
            "
          >
            <button
              v-for="service in category.services"
              :key="service.id"
              type="button"
              class="group glass-panel p-6 sm:p-8 md:p-10 flex flex-col justify-between text-left cursor-pointer hover:border-primary-container/40 hover:-translate-y-1 shimmer-trigger transition-all"
              @click="openService(service)"
            >
              <div>
                <span class="font-label-caps text-label-caps text-primary-container mb-5 sm:mb-6 block">
                  {{ service.code }}
                </span>
                <h4 class="font-headline-md text-headline-md mb-3 sm:mb-4">
                  {{ service.title }}
                </h4>
                <p class="font-body-md text-on-surface-variant mb-6">
                  {{ service.short }}
                </p>
                <ul class="space-y-2.5 mb-8">
                  <li
                    v-for="item in service.includes"
                    :key="item"
                    class="flex items-start gap-3 font-body-md text-on-surface-variant"
                  >
                    <span class="text-primary-container shrink-0 leading-none mt-0.5">✓</span>
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="flex justify-between items-center gap-4 border-t border-white/5 pt-5 sm:pt-6">
                <div class="flex flex-col">
                  <span class="font-label-caps text-[10px] opacity-50 mb-1">CENA</span>
                  <span class="font-headline-md text-headline-md text-primary-container">
                    {{ service.price }}
                  </span>
                </div>
                <div
                  class="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary-container group-hover:text-black transition-all shrink-0"
                >
                  <span class="material-symbols-outlined">arrow_outward</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        <div v-if="services.additional.length" class="reveal">
          <div class="flex items-baseline gap-4 mb-6 sm:mb-8">
            <span class="font-label-caps text-label-caps text-primary-container">04</span>
            <h3 class="font-headline-lg text-[28px] sm:text-[32px] md:text-headline-lg">
              {{ services.additionalTitle }}
            </h3>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <button
              v-for="service in services.additional"
              :key="service.id"
              type="button"
              class="group glass-panel p-5 sm:p-6 flex items-center justify-between gap-4 text-left cursor-pointer hover:border-primary-container/40 hover:-translate-y-1 shimmer-trigger transition-all"
              @click="openService(service)"
            >
              <div class="min-w-0">
                <span class="font-label-caps text-[10px] text-primary-container mb-2 block">
                  {{ service.code }}
                </span>
                <h4 class="font-headline-md text-base sm:text-lg leading-snug">
                  {{ service.title }}
                </h4>
              </div>
              <div
                class="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary-container group-hover:text-black transition-all shrink-0"
              >
                <span class="material-symbols-outlined text-lg">arrow_outward</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

    <ServiceDetailModal :service="selected" @close="closeService" />
  </section>
</template>
