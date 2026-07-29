<script setup lang="ts">
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import ServicesSection from './components/ServicesSection.vue'
import PortfolioSection from './components/PortfolioSection.vue'
import MaintenanceSection from './components/MaintenanceSection.vue'
import VouchersSection from './components/VouchersSection.vue'
import AboutSection from './components/AboutSection.vue'
import AppFooter from './components/AppFooter.vue'
import BookingModal from './components/BookingModal.vue'
import { useReveal } from './composables/useAnimations'

useReveal()
</script>

<template>
  <div class="custom-scroll overflow-x-hidden">
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
