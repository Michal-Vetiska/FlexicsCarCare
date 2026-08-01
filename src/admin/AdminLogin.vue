<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loginAdmin } from '../api/client'

const password = ref('')
const error = ref('')
const loading = ref(false)
const router = useRouter()
const route = useRoute()

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await loginAdmin(password.value)
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/admin/texts'
    await router.replace(redirect)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Přihlášení selhalo'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-6">
    <form
      class="w-full max-w-sm space-y-6 border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
      @submit.prevent="onSubmit"
    >
      <div>
        <p class="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-700">Admin</p>
        <h1 class="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Flexic's CMS</h1>
        <p class="mt-2 text-sm text-slate-500">Zadejte heslo pro správu webu.</p>
      </div>

      <div>
        <label class="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-500" for="admin-password">
          Heslo
        </label>
        <input
          id="admin-password"
          v-model="password"
          type="password"
          required
          autofocus
          autocomplete="current-password"
          class="w-full border border-slate-300 px-3 py-3 text-base text-slate-900 outline-none focus:border-cyan-600 sm:py-2.5 sm:text-sm"
          placeholder="••••••••"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <button
        type="submit"
        class="min-h-11 w-full bg-slate-900 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-slate-800 disabled:opacity-60"
        :disabled="loading"
      >
        {{ loading ? 'Přihlašuji…' : 'Přihlásit se' }}
      </button>
    </form>
  </div>
</template>
