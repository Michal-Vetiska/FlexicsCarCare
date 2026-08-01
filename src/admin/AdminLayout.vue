<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { logoutAdmin } from '../api/client'
import { useAdminContent } from './useAdminContent'

const router = useRouter()
const route = useRoute()
const { draft, saving, saveMessage, loadError, load, save } = useAdminContent()

const menuOpen = ref(false)

const navItems = [
  { path: '/admin/texts', label: 'Texty & kontakt', icon: 'edit_note' },
  { path: '/admin/services', label: 'Služby', icon: 'build' },
  { path: '/admin/maintenance', label: 'Údržba', icon: 'calendar_month' },
  { path: '/admin/portfolio', label: 'Portfolio', icon: 'photo_library' },
  { path: '/admin/media', label: 'Média / Hero', icon: 'image' },
]

const pageTitle = computed(
  () => navItems.find((item) => route.path.startsWith(item.path))?.label ?? 'Admin',
)

function isActive(path: string) {
  return route.path === path
}

function linkClass(path: string) {
  const base =
    'flex w-full min-h-11 items-center gap-3 px-3 py-2.5 text-left text-sm font-medium transition-colors'
  return isActive(path)
    ? `${base} border-l-2 border-cyan-600 bg-cyan-50 text-cyan-800`
    : `${base} text-slate-800 hover:bg-slate-50`
}

onMounted(() => {
  void load()
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
})

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

async function navigate(path: string) {
  menuOpen.value = false
  document.body.style.overflow = ''
  if (route.path !== path) {
    await router.push(path)
  }
}

async function onLogout() {
  menuOpen.value = false
  document.body.style.overflow = ''
  await logoutAdmin()
  await router.replace('/admin/login')
}
</script>

<template>
  <div class="flex min-h-screen bg-slate-100 text-slate-900">
    <!-- Desktop / tablet sidebar -->
    <aside
      class="sticky top-0 z-20 hidden h-svh w-56 shrink-0 flex-col overflow-hidden border-r border-slate-200 bg-white md:flex lg:w-64"
    >
      <div class="shrink-0 border-b border-slate-200 px-4 py-4 lg:px-5">
        <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Flexic's</p>
        <h1 class="mt-1 text-lg font-bold">Admin panel</h1>
      </div>

      <!-- min-h-0 je nutný, jinak spodní odkazy (Portfolio, Média) překryje patička -->
      <nav class="relative z-10 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3">
        <a
          v-for="item in navItems"
          :key="item.path"
          :href="item.path"
          :class="linkClass(item.path)"
          @click.prevent="navigate(item.path)"
        >
          <span class="material-symbols-outlined pointer-events-none text-[20px]">{{ item.icon }}</span>
          <span class="pointer-events-none">{{ item.label }}</span>
        </a>
      </nav>

      <div class="relative z-0 shrink-0 space-y-2 border-t border-slate-200 bg-white p-3">
        <a
          href="/"
          target="_blank"
          class="block py-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-cyan-700"
        >
          Otevřít web ↗
        </a>
        <button
          type="button"
          class="min-h-10 w-full border border-slate-300 py-2 text-xs font-semibold uppercase tracking-wider hover:bg-slate-50"
          @click="onLogout"
        >
          Odhlásit
        </button>
      </div>
    </aside>

    <!-- Mobile drawer -->
    <template v-if="menuOpen">
      <div
        class="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
        @click="menuOpen = false"
      />
      <aside
        class="fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] flex-col overflow-hidden bg-white shadow-2xl md:hidden"
      >
        <div class="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-5 py-4">
          <div>
            <p class="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-700">Flexic's</p>
            <h1 class="mt-1 text-lg font-bold">Admin panel</h1>
          </div>
          <button
            type="button"
            class="inline-flex size-10 items-center justify-center border border-slate-200"
            aria-label="Zavřít"
            @click="menuOpen = false"
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav class="relative z-10 flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-3">
          <a
            v-for="item in navItems"
            :key="item.path"
            :href="item.path"
            :class="linkClass(item.path)"
            @click.prevent="navigate(item.path)"
          >
            <span class="material-symbols-outlined pointer-events-none text-[20px]">{{ item.icon }}</span>
            <span class="pointer-events-none">{{ item.label }}</span>
          </a>
        </nav>

        <div class="relative z-0 shrink-0 space-y-2 border-t border-slate-200 bg-white p-3">
          <a
            href="/"
            target="_blank"
            class="block py-2 text-center text-xs font-semibold uppercase tracking-wider text-slate-500"
            @click="menuOpen = false"
          >
            Otevřít web ↗
          </a>
          <button
            type="button"
            class="min-h-10 w-full border border-slate-300 py-2 text-xs font-semibold uppercase tracking-wider"
            @click="onLogout"
          >
            Odhlásit
          </button>
        </div>
      </aside>
    </template>

    <div class="flex min-w-0 flex-1 flex-col">
      <header class="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div class="flex items-center gap-2 px-3 py-2.5 sm:px-4 md:px-5">
          <button
            type="button"
            class="inline-flex size-10 items-center justify-center border border-slate-200 md:hidden"
            aria-label="Menu"
            @click="menuOpen = true"
          >
            <span class="material-symbols-outlined">menu</span>
          </button>

          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold md:hidden">{{ pageTitle }}</p>
            <p class="hidden text-sm text-slate-500 md:block">Úpravy se projeví na webu po uložení.</p>
          </div>

          <button
            type="button"
            class="min-h-10 bg-slate-900 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-white disabled:opacity-50 sm:px-5 sm:text-sm"
            :disabled="saving || !draft"
            @click="save"
          >
            {{ saving ? 'Ukládám…' : 'Uložit' }}
            <span class="hidden sm:inline"> změny</span>
          </button>
        </div>
        <p
          v-if="saveMessage"
          class="border-t border-slate-100 px-3 py-1.5 text-xs font-medium"
          :class="saveMessage === 'Uloženo' ? 'text-emerald-600' : 'text-red-600'"
        >
          {{ saveMessage }}
        </p>
      </header>

      <main class="admin-main flex-1 p-3 sm:p-5 lg:p-8">
        <p v-if="loadError" class="mb-4 text-red-600">{{ loadError }}</p>
        <p v-if="!draft && !loadError" class="text-slate-500">Načítám obsah…</p>

        <!-- RouterView vždy v DOM — jinak se child routy nepřepínají spolehlivě -->
        <div v-show="!!draft">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.admin-main :deep(input:not([type='checkbox']):not([type='file'])),
.admin-main :deep(textarea),
.admin-main :deep(select) {
  font-size: 16px;
  min-height: 2.75rem;
}

@media (min-width: 640px) {
  .admin-main :deep(input:not([type='checkbox']):not([type='file'])),
  .admin-main :deep(textarea),
  .admin-main :deep(select) {
    font-size: 0.875rem;
    min-height: 0;
  }
}
</style>
