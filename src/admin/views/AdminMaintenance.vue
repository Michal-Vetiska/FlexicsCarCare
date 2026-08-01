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
  <div v-if="draft" class="max-w-5xl space-y-6 sm:space-y-8">
    <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-4">
      <div class="min-w-0">
        <h2 class="text-xl font-bold tracking-tight sm:text-2xl">Údržbové programy</h2>
        <p class="mt-1 text-sm text-slate-500 sm:text-base">Správa předplatných / maintenance plánů.</p>
      </div>
      <button
        type="button"
        class="min-h-11 w-full bg-cyan-700 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-white sm:w-auto"
        @click="addPlan"
      >
        + Program
      </button>
    </div>

    <section
      v-for="(plan, index) in draft.maintenance.plans"
      :key="plan.id"
      class="space-y-4 border border-slate-200 bg-white p-4 sm:p-5"
    >
      <div class="flex items-center justify-between gap-3">
        <p class="text-xs font-bold uppercase tracking-wider text-slate-600">Program #{{ index + 1 }}</p>
        <button type="button" class="min-h-10 px-2 text-xs font-semibold uppercase text-red-600" @click="removePlan(index)">
          Smazat
        </button>
      </div>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <label class="block text-xs font-semibold text-slate-500">Kód<input v-model="plan.code" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Název<input v-model="plan.name" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Interval<input v-model="plan.interval" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Cena<input v-model="plan.price" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="flex min-h-11 items-center gap-2 text-xs font-semibold text-slate-500 sm:mt-6">
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
