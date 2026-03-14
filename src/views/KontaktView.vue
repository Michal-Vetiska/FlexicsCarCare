<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const address = {
  street: 'Poličná',
  city: '757 01 Valašské Meziříčí',
  label: 'Flexics Car Care',
}

const coords = { lat: 49.4686, lng: 17.9653 }

const mapLinks = [
  {
    name: 'Waze',
    href: `https://waze.com/ul?ll=${coords.lat},${coords.lng}&navigate=yes`,
    icon: 'waze',
    color: '#33ccff',
  },
  {
    name: 'Apple Maps',
    href: `https://maps.apple.com/?q=${coords.lat},${coords.lng}`,
    icon: 'apple',
    color: '#555',
  },
  {
    name: 'Google Maps',
    href: `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}`,
    icon: 'google',
    color: '#4285F4',
  },
]

const heroRef = ref(null)
const titleRef = ref(null)
const subRef = ref(null)
const addressRef = ref(null)
const mapWrapRef = ref(null)
const buttonsRef = ref(null)

onMounted(() => {
  const ctx = gsap.context(() => {
    gsap.fromTo(
      titleRef.value,
      { opacity: 0, y: 48 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.15 }
    )
    gsap.fromTo(
      subRef.value,
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.35 }
    )
    gsap.fromTo(
      addressRef.value,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.5 }
    )

    gsap.fromTo(
      mapWrapRef.value,
      { opacity: 0, scale: 0.96, y: 40 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: mapWrapRef.value, start: 'top 88%', toggleActions: 'play none none none' },
      }
    )

    const btns = buttonsRef.value?.querySelectorAll('.kontakt__map-btn')
    if (btns?.length) {
      gsap.fromTo(
        btns,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: buttonsRef.value, start: 'top 92%', toggleActions: 'play none none none' },
        }
      )
    }
  }, heroRef.value ?? document.body)
  return () => ctx.revert()
})
</script>

<template>
  <section ref="heroRef" class="kontakt">
    <div class="kontakt__bg">
      <div class="kontakt__bg-gradient kontakt__bg-gradient--1" />
      <div class="kontakt__bg-gradient kontakt__bg-gradient--2" />
      <div class="kontakt__bg-grid" />
    </div>

    <div class="kontakt__inner">
      <header class="kontakt__hero">
        <h1 ref="titleRef" class="kontakt__title">
          <span class="kontakt__title-text">Kde nás</span>
          <span class="kontakt__title-accent"> najdete</span>
        </h1>
        <p ref="subRef" class="kontakt__sub">
          Zastavte se u nás v Poličné — rádi vás přivítáme v našem studiu.
        </p>

        <div ref="addressRef" class="kontakt__address-block">
          <div class="kontakt__address-label">{{ address.label }}</div>
          <div class="kontakt__address-street">{{ address.street }}</div>
          <div class="kontakt__address-city">{{ address.city }}</div>
          <a href="tel:+420777721795" class="kontakt__phone">+420 777 721 795</a>
        </div>
      </header>

      <div ref="mapWrapRef" class="kontakt__map-wrap">
        <div class="kontakt__map-frame">
          <iframe
            class="kontakt__map-iframe"
            title="Mapa – Poličná, Valašské Meziříčí"
            :src="`https://www.openstreetmap.org/export/embed.html?bbox=${coords.lng - 0.015},${coords.lat - 0.01},${coords.lng + 0.015},${coords.lat + 0.01}&layer=mapnik&marker=${coords.lat},${coords.lng}`"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          />
          <div class="kontakt__map-overlay" aria-hidden="true" />
        </div>

        <p class="kontakt__map-hint">Přidejte si nás do mapy a vydejte se k nám:</p>
        <div ref="buttonsRef" class="kontakt__map-buttons">
          <a
            v-for="link in mapLinks"
            :key="link.name"
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="kontakt__map-btn"
            :class="`kontakt__map-btn--${link.icon}`"
          >
            <span class="kontakt__map-btn-icon" :class="`kontakt__map-btn-icon--${link.icon}`" aria-hidden="true">
              <template v-if="link.icon === 'waze'">W</template>
              <template v-else-if="link.icon === 'apple'">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </template>
              <template v-else>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </template>
            </span>
            <span class="kontakt__map-btn-label">{{ link.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.kontakt {
  position: relative;
  min-height: 100%;
  padding: clamp(1.5rem, 4vw, 3rem) 0;
}

.kontakt__bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.kontakt__bg-gradient {
  position: absolute;
  filter: blur(80px);
  opacity: 0.75;
  border-radius: 50%;
}

.kontakt__bg-gradient--1 {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.85), transparent 70%);
  top: -100px;
  left: -80px;
}

.kontakt__bg-gradient--2 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.7), transparent 72%);
  bottom: -120px;
  right: -100px;
}

.kontakt__bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(148, 163, 184, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(ellipse 80% 60% at 50% 30%, black, transparent 70%);
}

.kontakt__inner {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 clamp(1.25rem, 3vw, 2rem);
}

.kontakt__hero {
  text-align: center;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.kontakt__title {
  margin: 0 0 0.75rem;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #f9fafb;
}

.kontakt__title-text {
  display: block;
}

.kontakt__title-accent {
  color: #f97316;
  text-shadow: 0 0 40px rgba(249, 115, 22, 0.4);
}

.kontakt__sub {
  margin: 0 0 2rem;
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: rgba(226, 232, 240, 0.9);
  max-width: 28rem;
  margin-left: auto;
  margin-right: auto;
}

.kontakt__address-block {
  display: inline-block;
  text-align: left;
  padding: 1.25rem 1.75rem;
  border-radius: 16px;
  background: rgba(28, 28, 35, 0.6);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.kontakt__address-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #f97316;
  margin-bottom: 0.35rem;
}

.kontakt__address-street {
  font-size: 1.15rem;
  font-weight: 600;
  color: #f9fafb;
}

.kontakt__address-city {
  font-size: 1rem;
  color: rgba(226, 232, 240, 0.9);
  margin-bottom: 0.75rem;
}

.kontakt__phone {
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  color: #f97316;
  text-decoration: none;
  transition: color 0.2s ease, transform 0.2s ease;
}

.kontakt__phone:hover {
  color: #fb923c;
  transform: scale(1.02);
}

.kontakt__map-wrap {
  position: relative;
}

.kontakt__map-frame {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.06);
  margin-bottom: 1.5rem;
}

.kontakt__map-iframe {
  display: block;
  width: 100%;
  height: 380px;
  border: none;
  background: #1e293b;
}

.kontakt__map-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.06);
}

.kontakt__map-hint {
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: rgba(226, 232, 240, 0.85);
  text-align: center;
}

.kontakt__map-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.kontakt__map-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.35rem;
  border-radius: 14px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  color: #f9fafb;
  background: rgba(28, 28, 35, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(12px);
  transition: transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    box-shadow 0.25s ease,
    border-color 0.2s ease;
}

.kontakt__map-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
  border-color: rgba(255, 255, 255, 0.18);
}

.kontakt__map-btn--waze:hover {
  border-color: rgba(51, 204, 255, 0.5);
  box-shadow: 0 12px 28px rgba(51, 204, 255, 0.15);
}

.kontakt__map-btn--apple:hover {
  border-color: rgba(255, 255, 255, 0.25);
}

.kontakt__map-btn--google:hover {
  border-color: rgba(66, 133, 244, 0.5);
  box-shadow: 0 12px 28px rgba(66, 133, 244, 0.15);
}

.kontakt__map-btn-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
}

.kontakt__map-btn-icon--waze {
  background: #33ccff;
  color: #0f172a;
}

.kontakt__map-btn-icon--apple {
  background: rgba(255, 255, 255, 0.15);
  color: #f9fafb;
}

.kontakt__map-btn-icon--google {
  background: #4285F4;
  color: #fff;
}

.kontakt__map-btn-icon--google svg {
  width: 18px;
  height: 18px;
}
</style>
