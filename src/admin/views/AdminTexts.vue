<script setup lang="ts">
import { useAdminContent } from '../useAdminContent'

const { draft } = useAdminContent()
</script>

<template>
  <div v-if="draft" class="space-y-8 max-w-4xl">
    <div>
      <h2 class="text-2xl font-bold tracking-tight">Texty & kontakt</h2>
      <p class="text-slate-500 mt-1">Navigace, hero texty, o nás, poukazy, footer a kontaktní údaje.</p>
    </div>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Navigace</h3>
      <div v-for="(link, i) in draft.nav.links" :key="i" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">
          Label
          <input v-model="link.label" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          Anchor
          <input v-model="link.href" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">
        Tlačítko rezervace
        <input v-model="draft.nav.bookLabel" class="mt-1 w-full border border-slate-300 px-3 py-2" />
      </label>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Kontakt</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">
          Telefon (zobrazení)
          <input v-model="draft.contact.phoneNumber" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          Telefon (tel:)
          <input v-model="draft.contact.phoneTel" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          E-mail
          <input v-model="draft.contact.email" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          Instagram URL
          <input v-model="draft.contact.instagramUrl" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          Instagram handle
          <input v-model="draft.contact.instagramHandle" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          Lokace (krátký label)
          <input v-model="draft.contact.location.shortLabel" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          Město
          <input v-model="draft.contact.location.name" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          PSČ + adresa
          <input v-model="draft.contact.location.postal" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          GPS lat
          <input v-model.number="draft.contact.location.lat" type="number" step="any" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
        <label class="block text-xs font-semibold text-slate-500">
          GPS lng
          <input v-model.number="draft.contact.location.lng" type="number" step="any" class="mt-1 w-full border border-slate-300 px-3 py-2" />
        </label>
      </div>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Hero</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Eyebrow<input v-model="draft.hero.eyebrow" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Kinetic text<input v-model="draft.hero.kineticText" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Headline 1<input v-model="draft.hero.headlineLine1" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Headline 2<input v-model="draft.hero.headlineLine2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Body<textarea v-model="draft.hero.body" rows="3" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">CTA<input v-model="draft.hero.cta" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Location eyebrow<input v-model="draft.hero.locationEyebrow" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Služby – nadpis sekce</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Eyebrow<input v-model="draft.services.eyebrow" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Additional title<input v-model="draft.services.additionalTitle" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title 1<input v-model="draft.services.titleLine1" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title 2<input v-model="draft.services.titleLine2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Intro<textarea v-model="draft.services.intro" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Portfolio – nadpis</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Eyebrow<input v-model="draft.portfolio.eyebrow" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">CTA<input v-model="draft.portfolio.ctaLabel" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title 1<input v-model="draft.portfolio.titleLine1" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title 2<input v-model="draft.portfolio.titleLine2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Intro<textarea v-model="draft.portfolio.intro" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Údržba – nadpis</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Eyebrow<input v-model="draft.maintenance.eyebrow" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title 1<input v-model="draft.maintenance.titleLine1" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title 2<input v-model="draft.maintenance.titleLine2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Intro<textarea v-model="draft.maintenance.intro" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Poukazy</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Eyebrow<input v-model="draft.vouchers.eyebrow" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title<input v-model="draft.vouchers.title" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Card tagline<input v-model="draft.vouchers.cardTagline" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Voucher ID<input v-model="draft.vouchers.voucherId" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Card title<input v-model="draft.vouchers.cardTitle" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">CTA<input v-model="draft.vouchers.cta" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Card body<textarea v-model="draft.vouchers.cardBody" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <label class="block text-xs font-semibold text-slate-500">Validity<input v-model="draft.vouchers.validity" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">O nás</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Eyebrow<input v-model="draft.about.eyebrow" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Title<input v-model="draft.about.title" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Studio label<input v-model="draft.about.studioLabel" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Map CTA<input v-model="draft.about.mapCta" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Body 1<textarea v-model="draft.about.body1" rows="3" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <label class="block text-xs font-semibold text-slate-500">Body 2<textarea v-model="draft.about.body2" rows="3" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <div v-for="(stat, i) in draft.about.stats" :key="i" class="grid grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Stat value<input v-model="stat.value" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Stat label<input v-model="stat.label" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Footer</h3>
      <label class="block text-xs font-semibold text-slate-500">Brand<input v-model="draft.footer.brand" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <label class="block text-xs font-semibold text-slate-500">Tagline<textarea v-model="draft.footer.tagline" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <label class="block text-xs font-semibold text-slate-500">Copyright suffix<input v-model="draft.footer.copyrightSuffix" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      <div v-for="(link, i) in draft.footer.links" :key="i" class="grid grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Link label<input v-model="link.label" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Href<input v-model="link.href" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Booking modal</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label class="block text-xs font-semibold text-slate-500">Title<input v-model="draft.booking.title" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
        <label class="block text-xs font-semibold text-slate-500">Submit<input v-model="draft.booking.submitLabel" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
      </div>
      <label class="block text-xs font-semibold text-slate-500">Subtitle<textarea v-model="draft.booking.subtitle" rows="2" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
    </section>

    <section class="bg-white border border-slate-200 p-5 space-y-4">
      <h3 class="font-bold text-sm uppercase tracking-wider text-slate-700">Meta</h3>
      <label class="block text-xs font-semibold text-slate-500">Title tabu<input v-model="draft.meta.title" class="mt-1 w-full border border-slate-300 px-3 py-2" /></label>
    </section>
  </div>
</template>
