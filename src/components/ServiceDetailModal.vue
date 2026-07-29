<script setup lang="ts">
import { onMounted, onUnmounted, watch, type PropType } from 'vue'
import type { ServiceDetail } from '../data/services'
import { useBookingModal } from '../composables/useBookingModal'

const props = defineProps({
  service: {
    type: Object as PropType<ServiceDetail | null>,
    default: null,
  },
})

const emit = defineEmits<{ close: [] }>()

const { open: openBooking } = useBookingModal()

function close() {
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.service) close()
}

function bookService() {
  close()
  openBooking()
}

watch(
  () => props.service,
  (value) => {
    document.body.style.overflow = value ? 'hidden' : ''
  },
)

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
        v-if="service"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`service-${service.id}-title`"
      >
        <div class="absolute inset-0 bg-surface-container-lowest/80 backdrop-blur-md" @click="close" />

        <div
          class="relative w-full max-w-2xl max-h-[90svh] overflow-y-auto custom-scroll glass-panel border border-primary-container/20 p-5 sm:p-8 md:p-10 shadow-[0_0_60px_rgba(0,219,233,0.12)]"
        >
          <button
            type="button"
            class="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-on-surface-variant hover:text-primary-container hover:border-primary-container/40 transition-colors z-10"
            aria-label="Zavřít"
            @click="close"
          >
            <span class="material-symbols-outlined">close</span>
          </button>

          <div class="mb-8 pr-10">
            <span class="font-label-caps text-label-caps text-primary-container mb-3 block">
              {{ service.code }}
            </span>
            <h2
              :id="`service-${service.id}-title`"
              class="font-headline-lg text-[28px] md:text-headline-lg leading-tight mb-4"
            >
              {{ service.title }}
            </h2>
            <p class="font-body-md text-on-surface-variant">{{ service.overview }}</p>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            <div class="border border-white/10 p-4 bg-surface/40">
              <span class="font-label-caps text-[10px] text-on-surface-variant block mb-2">CENA</span>
              <span class="font-headline-md text-headline-md text-primary-container">
                {{ service.price }}
              </span>
            </div>
            <div v-if="service.duration" class="border border-white/10 p-4 bg-surface/40">
              <span class="font-label-caps text-[10px] text-on-surface-variant block mb-2">
                DOBA
              </span>
              <span class="font-body-md font-bold">{{ service.duration }}</span>
            </div>
            <div
              v-if="service.durability"
              class="border border-white/10 p-4 bg-surface/40 col-span-2 md:col-span-1"
            >
              <span class="font-label-caps text-[10px] text-on-surface-variant block mb-2">
                VÝDRŽ
              </span>
              <span class="font-body-md font-bold">{{ service.durability }}</span>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="font-label-caps text-label-caps text-primary-container mb-4">
              CO JE V CENĚ
            </h3>
            <ul class="space-y-3">
              <li
                v-for="item in service.includes"
                :key="item"
                class="flex items-start gap-3 font-body-md text-on-surface-variant"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-primary-container shrink-0 mt-2" />
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="mb-8">
            <h3 class="font-label-caps text-label-caps text-primary-container mb-4">PROCES</h3>
            <ol class="space-y-3">
              <li
                v-for="(step, index) in service.process"
                :key="step"
                class="flex items-start gap-4 font-body-md text-on-surface-variant"
              >
                <span class="font-label-caps text-label-caps text-primary-container shrink-0">
                  {{ String(index + 1).padStart(2, '0') }}
                </span>
                {{ step }}
              </li>
            </ol>
          </div>

          <div class="mb-8 p-5 border border-primary-container/20 bg-primary-container/5">
            <span class="font-label-caps text-[10px] text-primary-container block mb-2">
              IDEÁLNÍ PRO
            </span>
            <p class="font-body-md text-on-surface">{{ service.idealFor }}</p>
          </div>

          <button
            type="button"
            class="w-full bg-primary-container text-on-primary-container px-8 py-4 font-label-caps text-label-caps font-bold hover:bg-primary transition-all duration-300 shimmer-trigger laser-glow"
            @click="bookService"
          >
            Rezervovat tuto službu
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
