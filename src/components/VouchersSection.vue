<script setup lang="ts">
import { LOGO_URL } from '../constants'
</script>

<template>
  <section id="vouchers" class="py-section-gap relative overflow-hidden bg-surface-container-lowest">
    <div
      class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-container/30 to-transparent"
    />

    <div class="container max-w-container-max mx-auto px-margin-page reveal">
      <div class="flex flex-col items-center text-center mb-16">
        <span class="font-label-caps text-label-caps text-primary-container mb-4">
          GIFT THE EXPERIENCE
        </span>
        <h2 class="font-headline-lg text-headline-lg">DÁRKOVÉ POUKAZY</h2>
      </div>

      <div class="flex justify-center">
        <div class="relative w-full max-w-3xl aspect-[1.8/1] group cursor-pointer perspective-1000">
          <div
            class="absolute inset-0 bg-gradient-to-br from-[#1a2324] to-[#080f10] border border-white/10 rounded-2xl shadow-2xl transition-all duration-500 rotate-x-12-hover group-hover:scale-105 p-12 flex flex-col justify-between overflow-hidden shimmer-trigger"
          >
            <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-container/5 rounded-full blur-[100px]" />

            <div class="flex justify-between items-start relative z-10">
              <div>
                <img :src="LOGO_URL" alt="FLEXICS Logo" class="w-16 h-16 object-contain mb-4" />
                <span class="font-label-caps text-label-caps tracking-[0.4em] opacity-40">
                  CAR CARE EXCELLENCE
                </span>
              </div>
              <div class="text-right">
                <span class="font-label-caps text-label-caps block opacity-40">VOUCHER ID</span>
                <span class="font-body-md font-bold tracking-widest">FLX-2024-883</span>
              </div>
            </div>

            <div class="relative z-10">
              <h3 class="font-display-xl text-headline-lg italic opacity-80 mb-2">
                ELITE DETAILING
              </h3>
              <p class="font-body-md text-on-surface-variant max-w-sm">
                Věnujte dokonalost. Poukaz na služby v libovolné hodnotě pro ty nejnáročnější.
              </p>
            </div>

            <div class="flex justify-between items-end relative z-10">
              <button
                class="bg-primary-container text-on-primary-container px-10 py-4 rounded-none font-label-caps text-label-caps font-bold hover:tracking-widest transition-all duration-500 shimmer-trigger"
              >
                Zakoupit poukaz
              </button>
              <div class="flex flex-col items-end">
                <div class="w-24 h-1 bg-primary-container mb-2" />
                <span class="font-label-caps text-[10px] opacity-30">
                  VALID WORLDWIDE AT FLEXICS STUDIOS
                </span>
              </div>
            </div>

            <div
              class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-20"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
