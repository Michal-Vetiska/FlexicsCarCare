<script setup lang="ts">
import { newId, useAdminContent } from '../useAdminContent'
import type { ServiceCategory, ServiceDetail } from '../../types/content'

const { draft } = useAdminContent()

/** Rotating accent themes per category index */
const CATEGORY_THEMES = [
  {
    shell: 'border-cyan-300 bg-cyan-50/40',
    header: 'bg-cyan-100/80 border-cyan-200',
    badge: 'bg-cyan-700 text-white',
    accent: 'border-l-cyan-600',
    btn: 'border-cyan-400 text-cyan-800 hover:bg-cyan-100',
  },
  {
    shell: 'border-violet-300 bg-violet-50/40',
    header: 'bg-violet-100/80 border-violet-200',
    badge: 'bg-violet-700 text-white',
    accent: 'border-l-violet-600',
    btn: 'border-violet-400 text-violet-800 hover:bg-violet-100',
  },
  {
    shell: 'border-amber-300 bg-amber-50/40',
    header: 'bg-amber-100/80 border-amber-200',
    badge: 'bg-amber-700 text-white',
    accent: 'border-l-amber-600',
    btn: 'border-amber-400 text-amber-900 hover:bg-amber-100',
  },
  {
    shell: 'border-emerald-300 bg-emerald-50/40',
    header: 'bg-emerald-100/80 border-emerald-200',
    badge: 'bg-emerald-700 text-white',
    accent: 'border-l-emerald-600',
    btn: 'border-emerald-400 text-emerald-800 hover:bg-emerald-100',
  },
  {
    shell: 'border-rose-300 bg-rose-50/40',
    header: 'bg-rose-100/80 border-rose-200',
    badge: 'bg-rose-700 text-white',
    accent: 'border-l-rose-600',
    btn: 'border-rose-400 text-rose-800 hover:bg-rose-100',
  },
  {
    shell: 'border-sky-300 bg-sky-50/40',
    header: 'bg-sky-100/80 border-sky-200',
    badge: 'bg-sky-700 text-white',
    accent: 'border-l-sky-600',
    btn: 'border-sky-400 text-sky-800 hover:bg-sky-100',
  },
] as const

function theme(index: number) {
  return CATEGORY_THEMES[index % CATEGORY_THEMES.length]
}

function emptyService(prefix: string): ServiceDetail {
  return {
    id: newId(prefix),
    code: 'NEW',
    title: 'Nová služba',
    short: '',
    price: 'od 0 Kč',
    overview: '',
    includes: ['Položka'],
    process: ['Krok 1'],
    idealFor: '',
  }
}

function addCategory() {
  if (!draft.value) return
  const cat: ServiceCategory = {
    id: newId('cat'),
    label: 'NOVÁ KATEGORIE',
    code: String(draft.value.services.categories.length + 1).padStart(2, '0'),
    services: [emptyService('svc')],
  }
  draft.value.services.categories.push(cat)
}

function removeCategory(index: number) {
  draft.value?.services.categories.splice(index, 1)
}

function addService(catIndex: number) {
  draft.value?.services.categories[catIndex]?.services.push(emptyService('svc'))
}

function removeService(catIndex: number, svcIndex: number) {
  draft.value?.services.categories[catIndex]?.services.splice(svcIndex, 1)
}

function addAdditional() {
  draft.value?.services.additional.push(emptyService('add'))
}

function removeAdditional(index: number) {
  draft.value?.services.additional.splice(index, 1)
}

function includesText(list: string[]) {
  return list.join('\n')
}

function setIncludes(target: ServiceDetail, value: string) {
  target.includes = value
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}

function processText(list?: string[]) {
  return (list || []).join('\n')
}

function setProcess(target: ServiceDetail, value: string) {
  target.process = value
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
}
</script>

<template>
  <div v-if="draft" class="space-y-8 max-w-5xl">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Služby</h2>
        <p class="text-slate-500 mt-1">
          Každá kategorie má vlastní barvu. Uvnitř jsou karty služeb v bílém bloku.
        </p>
      </div>
      <button
        type="button"
        class="bg-cyan-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-cyan-800"
        @click="addCategory"
      >
        + Kategorie
      </button>
    </div>

    <section
      v-for="(category, catIndex) in draft.services.categories"
      :key="category.id"
      class="border-2 border-l-4 p-5 space-y-5 rounded-sm shadow-sm"
      :class="[theme(catIndex).shell, theme(catIndex).accent]"
    >
      <div
        class="flex flex-wrap items-end justify-between gap-3 border pb-4 p-4 -mx-1"
        :class="theme(catIndex).header"
      >
        <div class="flex items-start gap-3 flex-1 min-w-0">
          <span
            class="shrink-0 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-sm"
            :class="theme(catIndex).badge"
          >
            Kategorie
          </span>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            <label class="block text-xs font-semibold text-slate-600">
              Kód
              <input v-model="category.code" class="mt-1 w-full border border-slate-300 bg-white px-3 py-2" />
            </label>
            <label class="block text-xs font-semibold text-slate-600 sm:col-span-2">
              Název kategorie
              <input v-model="category.label" class="mt-1 w-full border border-slate-300 bg-white px-3 py-2" />
            </label>
          </div>
        </div>
        <div class="flex gap-2">
          <button
            type="button"
            class="border px-3 py-2 text-xs font-semibold uppercase transition-colors"
            :class="theme(catIndex).btn"
            @click="addService(catIndex)"
          >
            + Služba
          </button>
          <button
            type="button"
            class="border border-red-300 text-red-700 bg-white px-3 py-2 text-xs font-semibold uppercase hover:bg-red-50"
            @click="removeCategory(catIndex)"
          >
            Smazat kategorii
          </button>
        </div>
      </div>

      <div class="space-y-4 pl-0 sm:pl-2">
        <p class="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
          Služby v kategorii ({{ category.services.length }})
        </p>

        <div
          v-for="(service, svcIndex) in category.services"
          :key="service.id"
          class="border border-slate-200 border-l-4 border-l-slate-800 bg-white p-4 space-y-3 shadow-sm"
        >
          <div class="flex justify-between items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="bg-slate-800 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                Služba
              </span>
              <p class="text-xs font-bold uppercase tracking-wider text-slate-500">
                #{{ svcIndex + 1 }}
              </p>
            </div>
            <button
              type="button"
              class="text-xs text-red-600 font-semibold uppercase hover:underline"
              @click="removeService(catIndex, svcIndex)"
            >
              Smazat
            </button>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <label class="block text-xs font-semibold text-slate-500">Kód<input v-model="service.code" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
            <label class="block text-xs font-semibold text-slate-500 sm:col-span-2">Název<input v-model="service.title" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
            <label class="block text-xs font-semibold text-slate-500">Cena<input v-model="service.price" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
            <label class="block text-xs font-semibold text-slate-500 sm:col-span-2">Krátký popis<input v-model="service.short" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
          </div>
          <label class="block text-xs font-semibold text-slate-500">Overview<textarea v-model="service.overview" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
          <label class="block text-xs font-semibold text-slate-500">
            Includes (1 řádek = 1 položka)
            <textarea
              :value="includesText(service.includes)"
              rows="4"
              class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50 font-mono text-sm"
              @input="setIncludes(service, ($event.target as HTMLTextAreaElement).value)"
            />
          </label>
          <label class="block text-xs font-semibold text-slate-500">
            Process (1 řádek = 1 krok)
            <textarea
              :value="processText(service.process)"
              rows="3"
              class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50 font-mono text-sm"
              @input="setProcess(service, ($event.target as HTMLTextAreaElement).value)"
            />
          </label>
          <label class="block text-xs font-semibold text-slate-500">Ideální pro<input v-model="service.idealFor" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
        </div>
      </div>
    </section>

    <section class="border-2 border-indigo-300 border-l-4 border-l-indigo-600 bg-indigo-50/50 p-5 space-y-5 shadow-sm">
      <div class="flex items-center justify-between gap-3 flex-wrap bg-indigo-100/80 border border-indigo-200 p-4 -mx-1">
        <div class="flex items-center gap-2">
          <span class="bg-indigo-700 text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
            Doplňkové
          </span>
          <h3 class="font-bold text-sm uppercase tracking-wider text-indigo-900">
            Doplňkové služby
          </h3>
        </div>
        <button
          type="button"
          class="border border-indigo-400 text-indigo-900 bg-white px-3 py-2 text-xs font-semibold uppercase hover:bg-indigo-50"
          @click="addAdditional"
        >
          + Doplňková
        </button>
      </div>

      <div
        v-for="(service, index) in draft.services.additional"
        :key="service.id"
        class="border border-slate-200 border-l-4 border-l-indigo-900 bg-white p-4 space-y-3 shadow-sm"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <span class="bg-indigo-900 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Služba
            </span>
            <p class="text-xs font-bold uppercase text-slate-500">#{{ index + 1 }}</p>
          </div>
          <button type="button" class="text-xs text-red-600 font-semibold uppercase hover:underline" @click="removeAdditional(index)">
            Smazat
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <label class="block text-xs font-semibold text-slate-500">Kód<input v-model="service.code" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
          <label class="block text-xs font-semibold text-slate-500 sm:col-span-2">Název<input v-model="service.title" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
          <label class="block text-xs font-semibold text-slate-500">Cena<input v-model="service.price" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
          <label class="block text-xs font-semibold text-slate-500 sm:col-span-2">Krátký popis<input v-model="service.short" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
        </div>
        <label class="block text-xs font-semibold text-slate-500">Overview<textarea v-model="service.overview" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50" /></label>
        <label class="block text-xs font-semibold text-slate-500">
          Includes
          <textarea
            :value="includesText(service.includes)"
            rows="3"
            class="mt-1 w-full border border-slate-300 px-3 py-2 bg-slate-50 font-mono text-sm"
            @input="setIncludes(service, ($event.target as HTMLTextAreaElement).value)"
          />
        </label>
      </div>
    </section>
  </div>
</template>
