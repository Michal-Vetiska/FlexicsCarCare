<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { logoutAdmin } from '../api/client'
import { useAdminContent } from './useAdminContent'

const router = useRouter()
const { draft, saving, saveMessage, loadError, load, save } = useAdminContent()

const navItems = [
  { to: '/admin/texts', label: 'Texty & kontakt', icon: 'edit_note' },
  { to: '/admin/services', label: 'Služby', icon: 'build' },
  { to: '/admin/maintenance', label: 'Údržba', icon: 'calendar_month' },
  { to: '/admin/portfolio', label: 'Portfolio', icon: 'photo_library' },
  { to: '/admin/media', label: 'Média / Hero', icon: 'image' },
]

onMounted(() => {
  void load()
})

async function onLogout() {
  await logoutAdmin()
  await router.replace('/admin/login')
}
</script>

<template>
  <div class="min-h-screen bg-slate-100 text-slate-900 flex">
    <aside class="w-64 shrink-0 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen">
      <div class="px-5 py-6 border-b border-slate-200">
        <p class="text-[10px] font-bold tracking-[0.2em] uppercase text-cyan-700">Flexic's</p>
        <h1 class="text-lg font-bold mt-1">Admin panel</h1>
      </div>

      <nav class="flex-1 p-3 space-y-1">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors"
          active-class="bg-cyan-50 text-cyan-800 border-l-2 border-cyan-600"
          exact-active-class="bg-cyan-50 text-cyan-800 border-l-2 border-cyan-600"
        >
          <span class="material-symbols-outlined text-[20px]">{{ item.icon }}</span>
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="p-4 border-t border-slate-200 space-y-2">
        <a
          href="/"
          target="_blank"
          class="block text-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-cyan-700 py-2"
        >
          Otevřít web ↗
        </a>
        <button
          type="button"
          class="w-full border border-slate-300 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-slate-50"
          @click="onLogout"
        >
          Odhlásit
        </button>
      </div>
    </aside>

    <div class="flex-1 min-w-0 flex flex-col">
      <header class="sticky top-0 z-10 bg-white/90 backdrop-blur border-b border-slate-200 px-6 py-3 flex items-center justify-between gap-4">
        <p class="text-sm text-slate-500">Úpravy se projeví na webu po uložení.</p>
        <div class="flex items-center gap-3">
          <span v-if="saveMessage" class="text-sm font-medium" :class="saveMessage === 'Uloženo' ? 'text-emerald-600' : 'text-red-600'">
            {{ saveMessage }}
          </span>
          <button
            type="button"
            class="bg-slate-900 text-white px-5 py-2 text-sm font-semibold uppercase tracking-wider hover:bg-slate-800 disabled:opacity-50"
            :disabled="saving || !draft"
            @click="save"
          >
            {{ saving ? 'Ukládám…' : 'Uložit změny' }}
          </button>
        </div>
      </header>

      <main class="flex-1 p-6 lg:p-8">
        <p v-if="loadError" class="text-red-600 mb-4">{{ loadError }}</p>
        <p v-else-if="!draft" class="text-slate-500">Načítám obsah…</p>
        <RouterView v-else />
      </main>
    </div>
  </div>
</template>
