<script setup lang="ts">
import { newId, useAdminContent } from '../useAdminContent'
import type { PortfolioItem } from '../../types/content'

const { draft, upload } = useAdminContent()

const defaultSpan =
  'col-span-1 sm:col-span-1 md:col-span-4 min-h-[200px] sm:min-h-0'

function emptyItem(): PortfolioItem {
  return {
    id: newId('pf'),
    src: '/images/hero-car.jpg',
    alt: 'Portfolio',
    span: defaultSpan,
    label: 'NEW',
  }
}

function addItem() {
  draft.value?.portfolio.items.push(emptyItem())
}

function removeItem(index: number) {
  draft.value?.portfolio.items.splice(index, 1)
}

async function onFile(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !draft.value) return
  try {
    const url = await upload(file)
    draft.value.portfolio.items[index].src = url
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Upload selhal')
  } finally {
    input.value = ''
  }
}
</script>

<template>
  <div v-if="draft" class="space-y-8 max-w-5xl">
    <div class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold tracking-tight">Portfolio</h2>
        <p class="text-slate-500 mt-1">Přidávejte fotky a popisky galerie.</p>
      </div>
      <button
        type="button"
        class="bg-cyan-700 text-white px-4 py-2 text-sm font-semibold uppercase tracking-wider"
        @click="addItem"
      >
        + Položka
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <section
        v-for="(item, index) in draft.portfolio.items"
        :key="item.id"
        class="bg-white border border-slate-200 p-4 space-y-3"
      >
        <div class="flex justify-between items-start gap-3">
          <p class="text-xs font-bold uppercase tracking-wider text-slate-600">#{{ index + 1 }}</p>
          <button type="button" class="text-xs text-red-600 font-semibold uppercase" @click="removeItem(index)">
            Smazat
          </button>
        </div>
        <img :src="item.src" :alt="item.alt" class="w-full aspect-video object-cover border border-slate-200" />
        <label class="block text-xs font-semibold text-slate-500">
          Nahrát obrázek
          <input type="file" accept="image/jpeg,image/png,image/webp" class="mt-1 block w-full text-sm" @change="onFile(index, $event)" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">Label<input v-model="item.label" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Alt<input v-model="item.alt" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">URL / cesta<input v-model="item.src" class="mt-1 w-full border border-slate-300 px-3 py-2 font-mono text-sm" /></label>
        <label class="block text-xs font-semibold text-slate-500">Grid span classes<input v-model="item.span" class="mt-1 w-full border border-slate-300 px-3 py-2 font-mono text-xs" /></label>
      </section>
    </div>
  </div>
</template>
