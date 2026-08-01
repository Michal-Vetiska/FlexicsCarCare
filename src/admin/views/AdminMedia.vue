<script setup lang="ts">
import { useAdminContent } from '../useAdminContent'

const { draft, upload } = useAdminContent()

async function onHeroFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !draft.value) return
  try {
    const url = await upload(file)
    draft.value.hero.imageUrl = url
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Upload selhal')
  } finally {
    input.value = ''
  }
}

async function onLogoFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !draft.value) return
  try {
    const url = await upload(file)
    draft.value.meta.logoUrl = url
  } catch (err) {
    alert(err instanceof Error ? err.message : 'Upload selhal')
  } finally {
    input.value = ''
  }
}
</script>

<template>
  <div v-if="draft" class="max-w-3xl space-y-6 sm:space-y-8">
    <div>
      <h2 class="text-xl font-bold tracking-tight sm:text-2xl">Média</h2>
      <p class="mt-1 text-sm text-slate-500 sm:text-base">Hero obrázek a logo webu.</p>
    </div>

    <section class="space-y-4 border border-slate-200 bg-white p-4 sm:p-5">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700">Hero obrázek</h3>
      <img :src="draft.hero.imageUrl" alt="Hero" class="w-full aspect-video object-cover border border-slate-200" />
      <label class="block text-xs font-semibold text-slate-500">
        Nahrát nový
        <input type="file" accept="image/jpeg,image/png,image/webp" class="mt-1 block w-full text-sm" @change="onHeroFile" />
      </label>
      <label class="block text-xs font-semibold text-slate-500">
        URL
        <input v-model="draft.hero.imageUrl" class="mt-1 w-full border border-slate-300 px-3 py-2 font-mono text-sm" />
      </label>
    </section>

    <section class="space-y-4 border border-slate-200 bg-white p-4 sm:p-5">
      <h3 class="text-sm font-bold uppercase tracking-wider text-slate-700">Logo</h3>
      <img :src="draft.meta.logoUrl" alt="Logo" class="w-24 h-24 object-contain border border-slate-200 bg-slate-900 p-2" />
      <label class="block text-xs font-semibold text-slate-500">
        Nahrát nové
        <input type="file" accept="image/jpeg,image/png,image/webp" class="mt-1 block w-full text-sm" @change="onLogoFile" />
      </label>
      <label class="block text-xs font-semibold text-slate-500">
        URL
        <input v-model="draft.meta.logoUrl" class="mt-1 w-full border border-slate-300 px-3 py-2 font-mono text-sm" />
      </label>
    </section>
  </div>
</template>
