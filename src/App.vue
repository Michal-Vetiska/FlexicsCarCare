<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { useCart } from './composables/useCart.js'
import { useInactivity } from './composables/useInactivity.js'

const route = useRoute()
const { items, count, total, removeItem } = useCart()
const { showDialog, hideDialog } = useInactivity()

const navItems = [
  { name: 'Úvod', path: '/' },
  { name: 'Ceník', path: '/cenik' },
  { name: 'Dárkové poukazy', path: '/darkove-poukazy' },
]

const cartOpen = ref(false)

function toggleCart() {
  cartOpen.value = !cartOpen.value
}

function closeCart() {
  cartOpen.value = false
}

function formatPrice(n) {
  return new Intl.NumberFormat('cs-CZ').format(n) + ' Kč'
}

function onDocumentClick(e) {
  if (!cartOpen.value) return
  const el = document.querySelector('.cart')
  if (el && !el.contains(e.target)) closeCart()
}

function setLandingPageClass(on) {
  const appEl = document.getElementById('app')
  if (on) {
    document.documentElement.classList.add('landing-page')
    document.body.classList.add('landing-page')
    appEl?.classList.add('landing-page')
  } else {
    document.documentElement.classList.remove('landing-page')
    document.body.classList.remove('landing-page')
    appEl?.classList.remove('landing-page')
  }
}

watch(
  () => route.path,
  (path) => setLandingPageClass(path === '/'),
  { immediate: true }
)

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
  setLandingPageClass(false)
})
</script>

<template>
  <div class="app" :class="{ 'app--landing': route.path === '/' }">
    <div class="app-bg">
      <div class="app-bg__gradient app-bg__gradient--blue" />
      <div class="app-bg__gradient app-bg__gradient--purple" />
      <div class="app-bg__grid" />
    </div>

    <header class="shell shell--header" :class="{ 'shell--header-landing': route.path === '/' }">
      <div class="shell__inner shell__inner--header">
        <div class="brand">
          <div class="brand__mark">F</div>
          <div class="brand__text">
            <div class="brand__title">Flexics Car Care</div>
            <div class="brand__subtitle">Premium Detailing Studio</div>
          </div>
        </div>

        <nav class="nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav__item"
            :class="{ 'nav__item--active': route.path === item.path }"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <RouterLink
          to="/kontakt"
          class="nav__item nav__item--contact"
          :class="{ 'nav__item--active': route.path === '/kontakt' }"
        >
          Kontakt
        </RouterLink>

        <div class="cart" @click.stop>
          <button
            type="button"
            class="cart__trigger"
            :class="{ 'cart__trigger--active': cartOpen }"
            aria-label="Košík"
            @click="toggleCart"
          >
            <span class="cart__icon" aria-hidden="true">🛒</span>
            <span v-if="count > 0" class="cart__badge">{{ count }}</span>
            <span v-if="count > 0" class="cart__total">{{ formatPrice(total) }}</span>
          </button>
          <Transition name="cart-drop">
            <div v-show="cartOpen" class="cart__dropdown">
              <div v-if="items.length === 0" class="cart__empty">
                Košík je prázdný. Vyberte služby v ceníku.
              </div>
              <template v-else>
                <ul class="cart__list">
                  <li
                    v-for="(item, i) in items"
                    :key="i"
                    class="cart__row"
                  >
                    <span class="cart__row-name">{{ item.name }}</span>
                    <span class="cart__row-price">{{ formatPrice(item.price) }}</span>
                    <button
                      type="button"
                      class="cart__remove"
                      aria-label="Odebrat"
                      @click="removeItem(i)"
                    >
                      ×
                    </button>
                  </li>
                </ul>
                <div class="cart__footer">
                  <span class="cart__sum">Celkem: {{ formatPrice(total) }}</span>
                  <RouterLink to="/rezervace" class="cart__cta" @click="closeCart">
                    Pokračovat k rezervaci
                  </RouterLink>
                </div>
              </template>
            </div>
          </Transition>
        </div>
      </div>
    </header>

    <!-- Dialog po neaktivitě -->
    <Transition name="dialog">
      <div v-if="showDialog" class="inactivity-overlay" @click.self="hideDialog">
        <div class="inactivity-dialog">
          <h3>Potřebujete poradit?</h3>
          <p>Zavolejte nám, rádi vám pomůžeme s výběrem služeb.</p>
          <a href="tel:+420777721795" class="inactivity-dialog__btn">Zavolat</a>
          <button type="button" class="inactivity-dialog__close" @click="hideDialog">
            Zavřít
          </button>
        </div>
      </div>
    </Transition>

    <main class="shell">
      <div class="shell__inner shell__inner--main" :class="{ 'shell__inner--full': route.path === '/' }">
        <RouterView />
      </div>
    </main>

    <footer v-if="route.path !== '/'" class="shell shell--footer">
      <div class="shell__inner shell__inner--footer">
        <div class="footer__main">
          <div class="footer__left">
            <div class="footer__title">Flexics Car Care</div>
            <div class="footer__text">Detailing, který vašemu autu vrátí emoce.</div>
            <div class="footer__location">Lokalita: Poličná u Valašského Meziříčí</div>
          </div>
          <div class="footer__center">
            <div class="footer__label">Pracovní doba</div>
            <div class="footer__hours">
              <span>Po – Pá 8:00 – 18:00</span>
              <span>So 9:00 – 16:00</span>
              <span>Ne Zavřeno</span>
            </div>
          </div>
          <div class="footer__right">
            <div class="footer__row">
              <span>Tel:</span>
              <a href="tel:+420777000000">+420 777 721 795</a>
            </div>
            <div class="footer__row">
              <span>E-mail:</span>
              <a href="mailto:info@flexicscarcare.cz">flexicscarecare@gmail.com</a>
            </div>
            <div class="footer__row">
              <span>📷 Instagram</span>
              <a href="https://instagram.com/flexic_cars" target="_blank" rel="noopener noreferrer">@flexic_cars</a>
            </div>
          </div>
        </div>
        <div class="footer__credit">
          Made by <a href="https://michalvetiska.site" target="_blank" rel="noopener noreferrer">Michal Vetiška</a>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
:root {
  color-scheme: dark;
}

.app {
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  color: #f9fafb;
  background: radial-gradient(circle at top left, #020617 0, #020617 40%, #000 100%);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  position: relative;
  overflow-x: hidden;
}

/* Úvodní stránka: jeden scroll jen uvnitř landingu, main zabírá celý viewport, header plave nad obsahem */
.app.app--landing {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000;
}

/* Na landingu je header fixed – panely scrollují pod ním, pozadí za navbarem je vždy aktuální panel */
.app.app--landing .shell--header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.app.app--landing main.shell {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  margin-top: 0;
}

.app.app--landing .shell__inner--full {
  height: 100%;
  min-height: 0;
}

.app-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.app.app--landing .app-bg {
  /* na úvodní stránce nechceme modré „glowy“ pozadí za navbar – necháme jen fotky */
  display: none;
}

.app-bg__gradient {
  position: absolute;
  filter: blur(80px);
  opacity: 0.8;
}

.app-bg__gradient--blue {
  width: 420px;
  height: 420px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.9), transparent 70%);
  top: -120px;
  left: -80px;
}

.app-bg__gradient--purple {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(147, 51, 234, 0.8), transparent 75%);
  bottom: -180px;
  right: -120px;
}

.app-bg__grid {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(to right, rgba(148, 163, 184, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
  background-size: 40px 40px;
  mask-image: radial-gradient(circle at center, black, transparent 70%);
}

.shell {
  position: relative;
  z-index: 1;
}

.shell__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 1.5rem clamp(1.25rem, 3vw, 2rem);
}

.shell__inner--header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0.6rem clamp(1.25rem, 3vw, 2rem);
}

.shell__inner--main {
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}

.shell__inner--full {
  padding: 0;
  max-width: none;
}

.shell__inner--footer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
  padding-top: 1.5rem;
  padding-bottom: 2rem;
}

.footer__main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

.footer__credit {
  text-align: center;
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.85);
  padding-top: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
}

.footer__credit a {
  color: #e5e7eb;
  text-decoration: none;
}

.footer__credit a:hover {
  text-decoration: underline;
}

/* Na všech stránkách kromě úvodní: navbar fixed, aby při scrollování zůstal nahoře */
.shell--header {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 0.75rem clamp(1rem, 4vw, 2rem) 0;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
}

.app:not(.app--landing) .shell--header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.app:not(.app--landing) main.shell {
  padding-top: 5.25rem;
}

/* Apple-style frosted glass: silný blur, nízká krytí, jemný světlý okraj nahoře */
.shell__inner--header {
  border-radius: 14px;
  backdrop-filter: blur(40px) saturate(1.8);
  -webkit-backdrop-filter: blur(40px) saturate(1.8);
  background: rgba(28, 28, 35, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.08) inset,
    0 8px 32px rgba(0, 0, 0, 0.18),
    0 2px 8px rgba(0, 0, 0, 0.08);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.shell--header-landing .shell__inner--header {
  /* dynamické pozadí: velmi průhledný bar, aby přes něj prosvítalo to, co je za ním (aktuální panel) */
  background: rgba(18, 18, 22, 0.18);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.03) inset,
    0 1px 0 0 rgba(255, 255, 255, 0.05) inset,
    0 8px 32px rgba(0, 0, 0, 0.15),
    0 2px 8px rgba(0, 0, 0, 0.08);
}

.shell--footer {
  margin-top: auto;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.85));
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.brand__mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(145deg, #f97316, #ea580c);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: -0.02em;
  font-size: 0.85rem;
  color: #fff;
  box-shadow: 0 2px 8px rgba(249, 115, 22, 0.35);
}

.brand__text {
  display: flex;
  flex-direction: column;
  gap: 0.02rem;
}

.brand__title {
  font-weight: 600;
  letter-spacing: -0.01em;
  font-size: 0.95rem;
  color: #f9fafb;
}

.brand__subtitle {
  font-size: 0.68rem;
  color: rgba(148, 163, 184, 0.88);
  letter-spacing: 0.01em;
  font-weight: 500;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.1rem;
  margin-left: auto;
  font-size: 0.8125rem;
  font-weight: 500;
}

.nav__item {
  padding: 0.5rem 0.85rem;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.82);
  text-decoration: none;
  transition: color 0.2s ease, background 0.2s ease, opacity 0.2s ease;
  letter-spacing: -0.01em;
}

.nav__item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.nav__item--active {
  color: #fff;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.08);
}

.cta {
  margin-left: 0.6rem;
  padding: 0.5rem 1.1rem;
  border-radius: 10px;
  border: none;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  color: #0f172a;
  background: linear-gradient(180deg, #fbbf24 0%, #f97316 100%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.2) inset,
    0 2px 8px rgba(249, 115, 22, 0.3);
}

.cta:hover {
  transform: scale(1.02);
  filter: brightness(1.06);
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.25) inset,
    0 4px 16px rgba(249, 115, 22, 0.4);
}

.cta:active {
  transform: scale(0.98);
}

/* Košík v headeru – frosted tlačítko ve stylu baru */
.cart {
  position: relative;
  margin-left: 0.4rem;
}

.cart__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.4rem 0.7rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.cart__trigger:hover,
.cart__trigger--active {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.12);
}

.cart__icon {
  font-size: 1.1rem;
}

.cart__badge {
  min-width: 1.15rem;
  height: 1.15rem;
  padding: 0 0.3rem;
  border-radius: 6px;
  background: #f97316;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cart__total {
  font-weight: 600;
  color: #fbbf24;
  font-size: 0.8rem;
}

.cart__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 320px;
  max-width: 90vw;
  border-radius: 14px;
  background: rgba(28, 28, 35, 0.88);
  backdrop-filter: blur(40px) saturate(1.5);
  -webkit-backdrop-filter: blur(40px) saturate(1.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.05) inset,
    0 12px 40px rgba(0, 0, 0, 0.25),
    0 4px 12px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  z-index: 100;
}

.cart-drop-enter-active,
.cart-drop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.cart-drop-enter-from,
.cart-drop-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.cart__empty {
  padding: 1.5rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
}

.cart__list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 50vh;
  overflow-y: auto;
}

.cart__row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.cart__row-name {
  flex: 1;
  font-size: 0.9rem;
  color: #e5e7eb;
}

.cart__row-price {
  font-weight: 600;
  color: #fbbf24;
  font-size: 0.88rem;
}

.cart__remove {
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 6px;
  background: rgba(248, 113, 113, 0.25);
  color: #fca5a5;
  font-size: 1.1rem;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease;
}

.cart__remove:hover {
  background: rgba(248, 113, 113, 0.5);
}

.cart__footer {
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.cart__sum {
  font-weight: 600;
  color: #f9fafb;
  font-size: 1rem;
}

.cart__cta {
  display: block;
  text-align: center;
  padding: 0.55rem 1rem;
  border-radius: 10px;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  text-decoration: none;
  color: #0f172a;
  background: linear-gradient(180deg, #fbbf24 0%, #f97316 100%);
  box-shadow: 0 1px 0 0 rgba(255, 255, 255, 0.2) inset, 0 2px 8px rgba(249, 115, 22, 0.25);
  transition: transform 0.2s ease, filter 0.2s ease;
}

.cart__cta:hover {
  filter: brightness(1.05);
  transform: scale(1.02);
}

/* Dialog neaktivity */
.inactivity-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
}

.inactivity-dialog {
  background: linear-gradient(to bottom, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 24px;
  padding: 2rem;
  max-width: 360px;
  text-align: center;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
}

.inactivity-dialog h3 {
  margin: 0 0 0.5rem;
  font-size: 1.35rem;
  color: #f9fafb;
}

.inactivity-dialog p {
  margin: 0 0 1.25rem;
  font-size: 0.95rem;
  color: rgba(209, 213, 219, 0.9);
}

.inactivity-dialog__btn {
  display: inline-block;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  color: #0f172a;
  background: linear-gradient(135deg, #fbbf24, #f97316);
  margin-bottom: 0.75rem;
  transition: transform 0.15s ease, filter 0.15s ease;
}

.inactivity-dialog__btn:hover {
  filter: brightness(1.08);
  transform: scale(1.03);
}

.inactivity-dialog__close {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border: none;
  background: transparent;
  color: #9ca3af;
  font-size: 0.88rem;
  cursor: pointer;
}

.inactivity-dialog__close:hover {
  color: #e5e7eb;
}

.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.25s ease;
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
}

.dialog-enter-active .inactivity-dialog,
.dialog-leave-active .inactivity-dialog {
  transition: transform 0.25s ease;
}

.dialog-enter-from .inactivity-dialog,
.dialog-leave-to .inactivity-dialog {
  transform: scale(0.95);
}

.footer__left {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.footer__title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #e5e7eb;
}

.footer__text {
  font-size: 0.8rem;
  color: #9ca3af;
}

.footer__location {
  font-size: 0.8rem;
  color: #9ca3af;
  margin-top: 0.25rem;
}

.footer__center {
  font-size: 0.8rem;
  color: #9ca3af;
}

.footer__label {
  font-weight: 600;
  color: #e5e7eb;
  margin-bottom: 0.35rem;
}

.footer__hours {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.footer__right {
  font-size: 0.8rem;
  color: #9ca3af;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.footer__row {
  display: flex;
  gap: 0.4rem;
}

.footer__row a {
  color: #e5e7eb;
  text-decoration: none;
}

.footer__row a:hover {
  text-decoration: underline;
}

@media (max-width: 820px) {
  .shell__inner--header {
    flex-wrap: wrap;
    row-gap: 1rem;
  }

  .nav {
    width: 100%;
    justify-content: center;
    margin-left: 0;
    order: 3;
    flex-wrap: wrap;
  }

  .cta {
    margin-left: auto;
  }
}

@media (max-width: 640px) {
  .shell--header {
    padding: 0.5rem 1rem 0;
  }

  .shell__inner {
    padding-inline: 1.1rem;
  }

  .shell__inner--footer {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer__main {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.4rem;
  }
}
</style>
