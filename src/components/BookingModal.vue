<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { CONTACT_EMAIL, PHONE_NUMBER, PHONE_TEL } from '../constants'
import { useBookingModal } from '../composables/useBookingModal'

const { isOpen, close } = useBookingModal()

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const sent = ref(false)

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}

function submitForm() {
  const subject = encodeURIComponent(`Flexics – rezervace od ${form.name || 'zákazník'}`)
  const body = encodeURIComponent(
    `Jméno: ${form.name}\nE-mail: ${form.email}\n\nZpráva:\n${form.message}`,
  )
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  sent.value = true
}

function resetAndClose() {
  form.name = ''
  form.email = ''
  form.message = ''
  sent.value = false
  close()
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <div class="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-md" @click="close" />

        <div
          class="relative w-full max-w-lg max-h-[90svh] overflow-y-auto custom-scroll glass-panel border border-primary-container/20 p-5 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(0,219,233,0.12)]"
        >
          <button
            type="button"
            class="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:border-primary-container/40 transition-colors"
            aria-label="Zavřít"
            @click="close"
          >
            <span class="material-symbols-outlined">close</span>
          </button>

          <div class="mb-8">
            <span class="font-label-caps text-label-caps text-primary-container mb-3 block">
              BOOK SESSION
            </span>
            <h2 id="booking-title" class="font-headline-lg text-[28px] md:text-headline-lg leading-tight">
              Rezervace termínu
            </h2>
            <p class="font-body-md text-on-surface-variant mt-3">
              Zavolejte nám, nebo napište e-mail — ozveme se co nejdřív.
            </p>
          </div>

          <a
            :href="`tel:${PHONE_TEL}`"
            class="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 mb-6 sm:mb-8 border border-primary-container/30 bg-primary-container/5 hover:bg-primary-container/10 transition-colors group"
          >
            <div
              class="w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-primary-container/40 flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-on-primary-container transition-all shrink-0"
            >
              <span class="material-symbols-outlined">call</span>
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-label-caps text-label-caps text-on-surface-variant">TELEFON</span>
              <span
                class="font-headline-md text-lg sm:text-headline-md text-primary-container tracking-tight break-all"
              >
                {{ PHONE_NUMBER }}
              </span>
            </div>
          </a>

          <div v-if="!sent">
            <div class="flex items-center gap-3 mb-6">
              <span class="material-symbols-outlined text-primary-container text-xl">mail</span>
              <div class="flex flex-col">
                <span class="font-label-caps text-label-caps text-on-surface-variant">E-MAIL</span>
                <a
                  :href="`mailto:${CONTACT_EMAIL}`"
                  class="font-body-md text-on-surface hover:text-primary-container transition-colors"
                >
                  {{ CONTACT_EMAIL }}
                </a>
              </div>
            </div>

            <form class="space-y-4" @submit.prevent="submitForm">
              <div>
                <label class="font-label-caps text-[10px] text-on-surface-variant mb-2 block" for="booking-name">
                  Jméno
                </label>
                <input
                  id="booking-name"
                  v-model="form.name"
                  type="text"
                  required
                  autocomplete="name"
                  class="w-full bg-surface-container-low border border-white/10 px-4 py-3 font-body-md text-on-surface outline-none focus:border-primary-container/50 transition-colors"
                  placeholder="Vaše jméno"
                />
              </div>
              <div>
                <label class="font-label-caps text-[10px] text-on-surface-variant mb-2 block" for="booking-email">
                  Váš e-mail
                </label>
                <input
                  id="booking-email"
                  v-model="form.email"
                  type="email"
                  required
                  autocomplete="email"
                  class="w-full bg-surface-container-low border border-white/10 px-4 py-3 font-body-md text-on-surface outline-none focus:border-primary-container/50 transition-colors"
                  placeholder="vas@email.cz"
                />
              </div>
              <div>
                <label class="font-label-caps text-[10px] text-on-surface-variant mb-2 block" for="booking-message">
                  Zpráva
                </label>
                <textarea
                  id="booking-message"
                  v-model="form.message"
                  required
                  rows="4"
                  class="w-full bg-surface-container-low border border-white/10 px-4 py-3 font-body-md text-on-surface outline-none focus:border-primary-container/50 transition-colors resize-none"
                  placeholder="Jaký vůz, jaká služba, preferovaný termín…"
                />
              </div>
              <button
                type="submit"
                class="w-full bg-primary-container text-on-primary-container px-8 py-4 font-label-caps text-label-caps font-bold hover:bg-primary transition-all duration-300 shimmer-trigger laser-glow"
              >
                Odeslat e-mail
              </button>
            </form>
          </div>

          <div v-else class="text-center py-6 space-y-4">
            <span class="material-symbols-outlined text-primary-container text-4xl">check_circle</span>
            <p class="font-body-md text-on-surface-variant">
              Otevřel se váš e-mailový klient. Po odeslání se ozveme.
            </p>
            <button
              type="button"
              class="font-label-caps text-label-caps text-primary-container hover:tracking-widest transition-all"
              @click="resetAndClose"
            >
              Zavřít
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
