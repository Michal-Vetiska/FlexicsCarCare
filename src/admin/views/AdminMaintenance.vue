<script setup lang="ts">
import { newId, useAdminContent } from '../useAdminContent'
import type { MaintenancePlan } from '../../types/content'

const { draft } = useAdminContent()

function emptyPlan(): MaintenancePlan {
  return {
    id: newId('plan'),
    code: 'NEW',
    name: 'NOVÝ PROGRAM',
    interval: 'měsíčně',
    price: '0 Kč',
    desc: '',
    features: ['Položka'],
    featured: false,
    overview: '',
    includes: ['Položka'],
    schedule: ['Krok 1'],
    idealFor: '',
    commitment: '',
  }
}

function addPlan() {
  draft.value?.maintenance.plans.push(emptyPlan())
}

function removePlan(index: number) {
  draft.value?.maintenance.plans.splice(index, 1)
}

function lines(list: string[]) {
  return list.join('\n')
}

function setLines(value: string, assign: (next: string[]) => void) {
  assign(
    value
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean),
  )
}
</script>

<template>
  <div v-if="draft" class="space-y-8 max-w-5xl">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Údržbové programy</h2>
        <p class="text-slate-500 mt-1">Správa předplatných / maintenance plánů.</p>
      </div>
      <button
        type="button"
        class="bg-cyan-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider"
        @click="addPlan"
      >
        + Program
      </button>
    </div>

    <section
      v-for="(plan, index) in draft.maintenance.plans"
      :key="plan.id"
      class="bg-white border border-slate-200 p-5 space-y-4"
    >
      <div class="flex justify-between items-center">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-600">Program #{{ index + 1 }}</p>
        <button type="button" class="text-xs text-red-600 font-semibold uppercase" @click="removePlan(index)">
          Smazat
        </button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Kód<input v-model="plan.code" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Název<input v-model="plan.name" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Interval<input v-model="plan.interval" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Cena<input v-model="plan.price" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-6">
          <input v-model="plan.featured" type="checkbox" class="size-4" />
          Recommended
        </label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Krátký popis<textarea v-model="plan.desc" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <label class="block text-xs font-semibold text-slate-500">Overview<textarea v-model="plan.overview" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <label class="block text-xs font-semibold text-slate-500">
        Features
        <textarea
          :value="lines(plan.features)"
          rows="3"
          class="mt-1 w-full border border-slate-300 px-3 py-2 font-mono text-sm"
          @input="setLines(($event.target as HTMLTextAreaElement).value, (n) => (plan.features = n))"
        />
      </label>
      <label class="block text-xs font-semibold text-slate-500">
        Includes
        <textarea
          :value="lines(plan.includes)"
          rows="4"
          class="mt-1 w-full border border-slate-300 px-3 py-2 font-mono text-sm"
          @input="setLines(($event.target as HTMLTextAreaElement).value, (n) => (plan.includes = n))"
        />
      </label>
      <label class="block text-xs font-semibold text-slate-500">
        Schedule
        <textarea
          :value="lines(plan.schedule)"
          rows="3"
          class="mt-1 w-full border border-slate-300 px-3 py-2 font-mono text-sm"
          @input="setLines(($event.target as HTMLTextAreaElement).value, (n) => (plan.schedule = n))"
        />
      </label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Ideální pro<input v-model="plan.idealFor" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Závazek<input v-model="plan.commitment" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
    </section>
  </div>
</template>
