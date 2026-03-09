<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
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
  { name: 'Rezervace', path: '/rezervace' },
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

onMounted(() => {
  document.addEventListener('click', onDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', onDocumentClick)
})
</script>

<template>
  <div class="app">
    <div class="app-bg">
      <div class="app-bg__gradient app-bg__gradient--blue" />
      <div class="app-bg__gradient app-bg__gradient--purple" />
      <div class="app-bg__grid" />
    </div>

    <header class="shell shell--header">
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

        <RouterLink to="/rezervace" class="cta">
          Rezervovat termín
        </RouterLink>
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
      <div class="shell__inner shell__inner--main">
        <RouterView />
      </div>
    </main>

    <footer class="shell shell--footer">
      <div class="shell__inner shell__inner--footer">
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
            <a href="https://instagram.com/flexic_cars" target="_blank" rel="noopener noreferrer">@flexic_cars
            </a>
          </div>
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

.app-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
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
  gap: 1.5rem;
}

.shell__inner--main {
  padding-top: 1.5rem;
  padding-bottom: 3rem;
}

.shell__inner--footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid rgba(148, 163, 184, 0.35);
  padding-top: 1.5rem;
  padding-bottom: 2rem;
}

.shell--header {
  backdrop-filter: blur(24px);
  background: linear-gradient(to bottom, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.4));
  border-bottom: 1px solid rgba(148, 163, 184, 0.3);
  position: sticky;
  top: 0;
  z-index: 10;
}

.shell--footer {
  margin-top: auto;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.85));
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.brand__mark {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: radial-gradient(circle at 30% 20%, #f97316, #e11d48);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-size: 0.95rem;
  box-shadow:
    0 0 0 1px rgba(15, 23, 42, 0.8),
    0 18px 45px rgba(15, 23, 42, 0.9),
    0 0 18px rgba(248, 113, 113, 0.7);
}

.brand__text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.brand__title {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 0.8rem;
  color: #e5e7eb;
}

.brand__subtitle {
  font-size: 0.75rem;
  color: #9ca3af;
}

.nav {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-left: auto;
  font-size: 0.9rem;
}

.nav__item {
  position: relative;
  padding: 0.4rem 0.85rem;
  border-radius: 999px;
  color: #e5e7eb;
  text-decoration: none;
  opacity: 0.8;
  transition:
    opacity 150ms ease-out,
    color 150ms ease-out,
    background-color 150ms ease-out,
    transform 150ms ease-out,
    box-shadow 150ms ease-out;
}

.nav__item::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle at top, rgba(251, 191, 36, 0.5), transparent 60%);
  opacity: 0;
  transition: opacity 150ms ease-out;
  pointer-events: none;
}

.nav__item:hover {
  opacity: 1;
  transform: translateY(-1px);
}

.nav__item--active {
  background: rgba(15, 23, 42, 0.95);
  box-shadow:
    0 0 0 1px rgba(148, 163, 184, 0.6),
    0 14px 30px rgba(15, 23, 42, 0.9);
  opacity: 1;
}

.nav__item--active::after {
  opacity: 1;
}

.cta {
  margin-left: 1rem;
  padding: 0.55rem 1.3rem;
  border-radius: 999px;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  color: #0b1120;
  background: linear-gradient(135deg, #fbbf24, #f97316, #ec4899);
  box-shadow:
    0 0 0 1px rgba(248, 250, 252, 0.2),
    0 20px 40px rgba(15, 23, 42, 0.95),
    0 0 30px rgba(249, 115, 22, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  cursor: pointer;
  transition:
    transform 160ms ease-out,
    box-shadow 160ms ease-out,
    filter 160ms ease-out;
}

.cta:hover {
  transform: translateY(-1px) scale(1.01);
  filter: brightness(1.05);
  box-shadow:
    0 0 0 1px rgba(248, 250, 252, 0.3),
    0 22px 50px rgba(15, 23, 42, 1),
    0 0 38px rgba(249, 115, 22, 1);
}

.cta:active {
  transform: translateY(0) scale(0.99);
  box-shadow:
    0 0 0 1px rgba(248, 250, 252, 0.2),
    0 14px 28px rgba(15, 23, 42, 0.9),
    0 0 22px rgba(249, 115, 22, 0.7);
}

/* Košík v headeru */
.cart {
  position: relative;
  margin-left: 0.5rem;
}

.cart__trigger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.4);
  background: rgba(15, 23, 42, 0.8);
  color: #e5e7eb;
  font-size: 0.9rem;
  cursor: pointer;
  transition: border-color 0.2s ease, background 0.2s ease;
}

.cart__trigger:hover,
.cart__trigger--active {
  border-color: rgba(251, 191, 36, 0.6);
  background: rgba(30, 41, 59, 0.95);
}

.cart__icon {
  font-size: 1.1rem;
}

.cart__badge {
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.35rem;
  border-radius: 999px;
  background: #f97316;
  color: #0f172a;
  font-size: 0.75rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.cart__total {
  font-weight: 600;
  color: #fbbf24;
  font-size: 0.85rem;
}

.cart__dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 320px;
  max-width: 90vw;
  border-radius: 16px;
  background: linear-gradient(to bottom, rgba(30, 41, 59, 0.98), rgba(15, 23, 42, 0.98));
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.6);
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
  border-bottom: 1px solid rgba(148, 163, 184, 0.2);
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
  border-radius: 50%;
  background: rgba(248, 113, 113, 0.3);
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
  border-top: 1px solid rgba(148, 163, 184, 0.3);
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
  padding: 0.6rem 1rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  color: #0f172a;
  background: linear-gradient(135deg, #fbbf24, #f97316);
  transition: transform 0.15s ease, filter 0.15s ease;
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
  .shell__inner {
    padding-inline: 1.1rem;
  }

  .shell__inner--footer {
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
