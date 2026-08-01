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
  <div class="min-h-screen bg-slate-100 flex items-center justify-center p-6">
    <form
      class="w-full max-w-sm bg-white border border-slate-200 shadow-sm p-8 space-y-6"
      @submit.prevent="onSubmit"
    >
      <div>
        <p class="text-xs font-semibold tracking-[0.15em] uppercase text-cyan-700 mb-2">Admin</p>
        <h1 class="text-2xl font-bold text-slate-900 tracking-tight">Flexic's CMS</h1>
        <p class="text-sm text-slate-500 mt-2">Zadejte heslo pro správu webu.</p>
      </div>

      <div>
        <label class="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2" for="admin-password">
          Heslo
        </label>
        <input
          id="admin-password"
          v-model="password"
          type="password"
          required
          autofocus
          class="w-full border border-slate-300 px-3 py-2.5 text-slate-900 outline-none focus:border-cyan-600"
          placeholder="••••••••"
        />
      </div>

      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

      <button
        type="submit"
        class="w-full bg-slate-900 text-white py-3 text-sm font-semibold uppercase tracking-wider hover:bg-slate-800 disabled:opacity-60"
        :disabled="loading"
      >
        {{ loading ? 'Přihlašuji…' : 'Přihlásit se' }}
      </button>
    </form>
  </div>
</template>
