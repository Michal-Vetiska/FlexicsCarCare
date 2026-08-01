<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import AppNav from '../components/AppNav.vue'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import PortfolioSection from '../components/PortfolioSection.vue'
import MaintenanceSection from '../components/MaintenanceSection.vue'
import VouchersSection from '../components/VouchersSection.vue'
import AboutSection from '../components/AboutSection.vue'
import AppFooter from '../components/AppFooter.vue'
import BookingModal from '../components/BookingModal.vue'
import { useReveal } from '../composables/useAnimations'
import { useContent } from '../composables/useContent'

const { content, loading, error, load } = useContent()
const { observe } = useReveal()

onMounted(() => {
  void load(true)
})

watch(
  content,
  async (value) => {
    if (!value) return
    document.title = value.meta.title
    await nextTick()
    observe()
  },
  { immediate: true },
)
</script>

<template>
  <div v-if="loading && !content" class="min-h-screen flex items-center justify-center bg-surface text-on-surface">
    <p class="font-label-caps text-label-caps text-primary-container">Načítám…</p>
  </div>

  <div
    v-else-if="error && !content"
    class="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface text-on-surface px-6 text-center"
  >
    <p class="font-body-md text-on-surface-variant">{{ error }}</p>
    <button
      type="button"
      class="bg-primary-container text-on-primary-container px-6 py-3 font-label-caps text-label-caps"
      @click="load(true)"
    >
      Zkusit znovu
    </button>
  </div>

  <div v-else-if="content" class="custom-scroll overflow-x-hidden">
    <div class="particle w-64 h-64 blur-3xl opacity-10" style="top: 10%; left: 5%" />
    <div
      class="particle w-96 h-96 blur-3xl opacity-10"
      style="top: 60%; right: 10%; animation-delay: -5s"
    />

    <AppNav />
    <HeroSection />
    <ServicesSection />
    <PortfolioSection />
    <MaintenanceSection />
    <VouchersSection />
    <AboutSection />
    <AppFooter />
    <BookingModal />
  </div>
</template>
