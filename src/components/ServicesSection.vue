<script setup lang="ts">
import { HERO_IMAGE_URL } from '../constants'
</script>

<template>
  <section id="services" class="py-section-gap px-margin-page bg-surface">
    <div class="max-w-container-max mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end mb-element-gap gap-8 reveal">
        <div class="max-w-xl">
          <span class="font-label-caps text-label-caps text-primary-container mb-4 block">
            PORTFOLIO SLUŽEB
          </span>
          <h2 class="font-headline-lg text-headline-lg">DEFINOVÁNÍ<br />ESTETIKY.</h2>
        </div>
        <p class="text-on-surface-variant font-body-md max-w-xs text-right">
          Naše procesy jsou navrženy pro ty, kteří vyžadují absolutní dokonalost bez kompromisů.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <!-- Ruční mytí -->
        <div
          class="md:col-span-7 group relative overflow-hidden glass-panel p-12 hover:border-primary-container/40 hover:-translate-y-2 shimmer-trigger reveal"
        >
          <div class="relative z-10">
            <span class="font-label-caps text-label-caps text-primary-container mb-12 block">
              S01 // BASIC CARE
            </span>
            <h3 class="font-display-xl text-headline-lg mb-4">RUČNÍ MYTÍ</h3>
            <p class="font-body-md text-on-surface-variant max-w-sm mb-8">
              Šetrnost a preciznost v každém detailu. Používáme výhradně pH neutrální chemii a
              vícestupňovou filtrační technologii vody.
            </p>
            <div class="flex items-baseline gap-4">
              <span class="font-label-caps text-label-caps opacity-50 uppercase">Starting at</span>
              <span class="font-headline-md text-headline-md text-primary-container">
                od 1 500 Kč
              </span>
            </div>
          </div>
          <div
            class="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none group-hover:opacity-20 transition-opacity"
          >
            <span
              class="font-display-xl text-[200px] leading-none select-none absolute top-1/2 -translate-y-1/2 right-[-50px]"
            >
              01
            </span>
          </div>
        </div>

        <!-- Leštění laku -->
        <div
          class="md:col-span-5 glass-panel p-10 flex flex-col justify-between border-l-4 border-l-primary-container hover:bg-white/5 hover:-translate-y-2 shimmer-trigger reveal"
        >
          <div>
            <span class="font-label-caps text-label-caps text-primary-container mb-8 block">
              S02 // CORRECTION
            </span>
            <h3 class="font-headline-lg text-[32px] mb-4">LEŠTĚNÍ LAKU</h3>
            <p class="font-body-md text-on-surface-variant mb-12">
              Obnova lesku a hloubky laku pomocí víceúrovňového stroje. Odstranění mikroškrábanců a
              oxidace pro zrcadlový efekt.
            </p>
          </div>
          <div class="flex justify-between items-center">
            <span class="font-headline-md text-headline-md">od 5 000 Kč</span>
            <div
              class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-primary-container group-hover:text-black transition-all"
            >
              <span class="material-symbols-outlined">arrow_outward</span>
            </div>
          </div>
        </div>

        <!-- Keramická ochrana -->
        <div
          id="portfolio"
          class="md:col-span-12 relative group bg-surface-container-low border border-primary-container/20 p-12 overflow-hidden flex flex-col md:flex-row items-center gap-12 laser-glow reveal shimmer-trigger"
        >
          <div
            class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,219,233,0.08),transparent_50%)]"
          />
          <div class="relative z-10 w-full md:w-1/2">
            <div
              class="inline-block bg-primary-container text-on-primary-container px-3 py-1 font-label-caps text-[10px] mb-6"
            >
              ULTIMATE PROTECTION
            </div>
            <h3 class="font-display-xl text-headline-lg mb-6 tracking-tight">KERAMICKÁ OCHRANA</h3>
            <p class="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
              Dlouhodobá ochrana s tvrdostí 9H+. Vytváří neviditelný štít proti UV záření,
              chemikáliím a mechanickému poškození s extrémní hydrofobitou.
            </p>
            <div class="flex items-center gap-8">
              <div class="flex flex-col">
                <span class="font-label-caps text-label-caps opacity-50">INVESTMENT</span>
                <span class="font-display-xl text-headline-md text-primary-container">
                  od 12 000 Kč
                </span>
              </div>
              <div class="h-12 w-px bg-outline-variant/30" />
              <div class="flex flex-col">
                <span class="font-label-caps text-label-caps opacity-50">DURABILITY</span>
                <span class="font-display-xl text-headline-md">Up to 5 YEARS</span>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 relative">
            <div
              class="aspect-video glass-panel overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-1000"
            >
              <div
                class="absolute inset-0 bg-gradient-to-tr from-surface-container-low to-transparent z-10"
              />
              <div
                class="absolute top-0 left-0 w-[2px] h-full bg-primary-container shadow-[0_0_15px_#00f0ff] z-20 animate-scan-slow"
              />
              <img
                :src="HERO_IMAGE_URL"
                alt="Ceramic Coating Macro"
                class="w-full h-full object-cover scale-125 translate-x-10 hover:translate-x-0 transition-transform duration-[2000ms]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
