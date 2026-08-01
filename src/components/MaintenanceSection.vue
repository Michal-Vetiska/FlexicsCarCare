<script setup lang="ts">
import { computed, ref } from 'vue'
import { useContent } from '../composables/useContent'
import type { MaintenancePlan } from '../types/content'
import MaintenanceDetailModal from './MaintenanceDetailModal.vue'

const { content } = useContent()
const maintenance = computed(() => content.value!.maintenance)
const selected = ref<MaintenancePlan | null>(null)

function openPlan(plan: MaintenancePlan) {
  selected.value = plan
}

function closePlan() {
  selected.value = null
}
</script>

<template>
  <section v-if="content" id="maintenance" class="py-section-gap px-margin-page bg-surface-container-low">
    <div class="max-w-container-max mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-element-gap gap-6 md:gap-8 reveal">
        <div class="max-w-xl">
          <span class="font-label-caps text-label-caps text-primary-container mb-4 block">
            {{ maintenance.eyebrow }}
          </span>
          <h2 class="font-headline-lg text-headline-lg">
            {{ maintenance.titleLine1 }}<br />{{ maintenance.titleLine2 }}
          </h2>
        </div>
        <p class="text-on-surface-variant font-body-md max-w-xs text-left md:text-right">
          {{ maintenance.intro }}
        </p>
      </div>

      <div
        class="grid gap-5 sm:gap-6 md:gap-8"
        :class="
          maintenance.plans.length === 1
            ? 'grid-cols-1 max-w-md'
            : maintenance.plans.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        "
      >
        <button
          v-for="plan in maintenance.plans"
          :key="plan.code"
          type="button"
          class="group glass-panel p-6 sm:p-8 md:p-10 flex flex-col justify-between hover:-translate-y-2 shimmer-trigger reveal text-left cursor-pointer"
          :class="
            plan.featured
              ? 'border-primary-container/40 laser-glow relative sm:col-span-2 lg:col-span-1'
              : 'hover:border-primary-container/40'
          "
          @click="openPlan(plan)"
        >
          <div
            v-if="plan.featured"
            class="absolute top-0 right-0 bg-primary-container text-on-primary-container px-3 py-1 font-label-caps text-[10px]"
          >
            RECOMMENDED
          </div>

          <div>
            <span class="font-label-caps text-label-caps text-primary-container mb-8 block">
              {{ plan.code }} // {{ plan.interval.toUpperCase() }}
            </span>
            <h3 class="font-headline-lg text-[28px] sm:text-[32px] mb-4">{{ plan.name }}</h3>
            <p class="font-body-md text-on-surface-variant mb-6 sm:mb-8">{{ plan.desc }}</p>
            <ul class="space-y-3 mb-8 sm:mb-10">
              <li
                v-for="feature in plan.features"
                :key="feature"
                class="flex items-center gap-3 font-body-md text-on-surface-variant"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0" />
                {{ feature }}
              </li>
            </ul>
          </div>

          <div class="flex justify-between items-end border-t border-white/5 pt-6">
            <div class="flex flex-col">
              <span class="font-label-caps text-label-caps opacity-50">FROM</span>
              <span class="font-headline-md text-headline-md text-primary-container">
                {{ plan.price }}
              </span>
            </div>
            <div
              class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary-container group-hover:text-black transition-all"
            >
              <span class="material-symbols-outlined">arrow_outward</span>
            </div>
          </div>
        </button>
      </div>
    </div>

    <MaintenanceDetailModal :plan="selected" @close="closePlan" />
  </section>
</template>
