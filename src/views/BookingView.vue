<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getAllBookableServices } from '../data/cenik.js'
import { useCart } from '../composables/useCart.js'

const services = getAllBookableServices()
const route = useRoute()
const { items, total, clear } = useCart()

const hasCartItems = computed(() => items.value.length > 0)

const form = ref({
  name: '',
  email: '',
  phone: '',
  serviceId: services[0]?.id ?? '',
  date: '',
  time: '',
  note: '',
})

const submitted = ref(false)

function formatPrice(n) {
  return new Intl.NumberFormat('cs-CZ').format(n) + ' Kč'
}

onMounted(() => {
  const sluzba = route.query.sluzba
  if (sluzba && services.some((s) => s.id === sluzba)) {
    form.value.serviceId = sluzba
  }
})

const handleSubmit = () => {
  submitted.value = true
  if (hasCartItems.value) clear()
}
</script>

<template>
  <section class="section">
    <header class="section__header">
      <h1>Rezervace termínu</h1>
      <p>
        Vyberte službu, která vás zajímá, a zanechte nám na sebe kontakt. Do 24 hodin se vám ozveme s
        potvrzením přesného termínu.
      </p>
    </header>

    <div v-if="hasCartItems" class="booking-cart">
      <h2>Váš výběr</h2>
      <ul class="booking-cart__list">
        <li v-for="(item, i) in items" :key="i" class="booking-cart__row">
          <span>{{ item.name }}</span>
          <span class="booking-cart__price">{{ formatPrice(item.price) }}</span>
        </li>
      </ul>
      <p class="booking-cart__total">Celková cena: <strong>{{ formatPrice(total) }}</strong></p>
    </div>

    <div class="booking">
      <form class="booking__form" @submit.prevent="handleSubmit">
        <div class="form__group">
          <label for="name">Jméno a příjmení</label>
          <input id="name" v-model="form.name" type="text" required placeholder="Jan Novák" />
        </div>

        <div class="form__group">
          <label for="email">E-mail</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            placeholder="jan.novak@example.cz"
          />
        </div>

        <div class="form__group">
          <label for="phone">Telefon</label>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            required
            placeholder="+420 777 000 000"
          />
        </div>

        <div class="form__group">
          <label for="service">Vybraný balíček / služba</label>
          <select id="service" v-model="form.serviceId" :required="!hasCartItems">
            <option value="">— vyberte službu —</option>
            <option v-for="service in services" :key="service.id" :value="service.id">
              {{ service.name }}
            </option>
          </select>
          <p v-if="hasCartItems" class="form__hint">Máte vybrané služby z košíku výše. Pole slouží pro doplnění další služby.</p>
        </div>

        <div class="form__row">
          <div class="form__group">
            <label for="date">Preferované datum</label>
            <input id="date" v-model="form.date" type="date" />
          </div>
          <div class="form__group">
            <label for="time">Preferovaný čas</label>
            <input id="time" v-model="form.time" type="time" />
          </div>
        </div>

        <div class="form__group">
          <label for="note">Poznámka (stav vozu, speciální přání)</label>
          <textarea
            id="note"
            v-model="form.note"
            rows="3"
            placeholder="Např. intenzivní znečištění interiéru, auto garážované, atd."
          />
        </div>

        <button type="submit" class="form__submit">Odeslat nezávaznou poptávku</button>

        <p v-if="submitted" class="form__success">
          Děkujeme za poptávku. V nejbližší době se vám ozveme s potvrzením termínu.
        </p>
      </form>

      <aside class="booking__aside">
        <div class="booking__panel">
          <h2>Jak rezervace probíhá</h2>
          <ol>
            <li>Vyplníte základní údaje o sobě a vyberete službu.</li>
            <li>Do 24 hodin se vám ozveme telefonicky nebo e-mailem.</li>
            <li>Společně doladíme přesný termín a rozsah služeb.</li>
          </ol>
          <p>
            Rezervace přes tento formulář je nezávazná. Termín je potvrzený až po našem zpětném
            kontaktu.
          </p>
        </div>
        <div class="booking__panel booking__panel--hours">
          <h2>Pracovní doba</h2>
          <dl class="hours">
            <div class="hours__row">
              <dt>Pondělí – Pátek</dt>
              <dd>8:00 – 18:00</dd>
            </div>
            <div class="hours__row">
              <dt>Sobota</dt>
              <dd>9:00 – 16:00</dd>
            </div>
            <div class="hours__row">
              <dt>Neděle</dt>
              <dd>Zavřeno</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.section__header h1 {
  font-size: 1.8rem;
  margin-bottom: 0.4rem;
}

.section__header p {
  max-width: 40rem;
  font-size: 0.98rem;
  color: rgba(209, 213, 219, 0.9);
}

.booking-cart {
  border-radius: 20px;
  padding: 1.35rem 1.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(165deg, rgba(34, 197, 94, 0.2), rgba(15, 23, 42, 0.95));
  border: 1px solid rgba(34, 197, 94, 0.4);
}

.booking-cart h2 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  color: #f9fafb;
}

.booking-cart__list {
  list-style: none;
  padding: 0;
  margin: 0 0 0.5rem;
}

.booking-cart__row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.35rem 0;
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.95);
}

.booking-cart__price {
  font-weight: 600;
  color: #4ade80;
}

.booking-cart__total {
  margin: 0;
  font-size: 1rem;
  color: #e5e7eb;
}

.booking-cart__total strong {
  color: #fbbf24;
}

.form__hint {
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.95);
}

.booking {
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
  gap: 1.8rem;
}

.booking__form {
  border-radius: 20px;
  padding: 1.7rem 1.6rem;
  background: radial-gradient(circle at top left, rgba(37, 99, 235, 0.35), transparent 60%),
    linear-gradient(to bottom right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.92));
  border: 1px solid rgba(148, 163, 184, 0.55);
  box-shadow:
    0 20px 60px rgba(15, 23, 42, 0.98),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.form__group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.9rem;
}

.form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

label {
  font-size: 0.85rem;
  color: rgba(209, 213, 219, 0.96);
}

input,
select,
textarea {
  border-radius: 0.9rem;
  border: 1px solid rgba(148, 163, 184, 0.6);
  background: rgba(15, 23, 42, 0.9);
  padding: 0.6rem 0.8rem;
  color: #f9fafb;
  font: inherit;
}

textarea {
  resize: vertical;
  min-height: 90px;
}

.form__submit {
  margin-top: 0.4rem;
  border-radius: 999px;
  border: none;
  padding: 0.75rem 1.6rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  cursor: pointer;
  color: #020617;
  background: linear-gradient(135deg, #fbbf24, #f97316, #ec4899);
  box-shadow:
    0 0 0 1px rgba(248, 250, 252, 0.16),
    0 18px 46px rgba(15, 23, 42, 0.98),
    0 0 28px rgba(249, 115, 22, 0.9);
}

.form__success {
  margin-top: 0.8rem;
  font-size: 0.88rem;
  color: #bbf7d0;
}

.booking__aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.booking__panel {
  border-radius: 20px;
  padding: 1.5rem 1.4rem;
  background: radial-gradient(circle at top right, rgba(251, 191, 36, 0.4), transparent 60%),
    linear-gradient(to bottom right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.93));
  border: 1px solid rgba(248, 250, 252, 0.12);
  box-shadow:
    0 20px 60px rgba(15, 23, 42, 0.98),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.booking__panel h2 {
  font-size: 1.1rem;
  margin-bottom: 0.7rem;
}

.hours {
  display: grid;
  gap: 0.35rem;
  margin: 0;
}

.hours__row {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.9);
}

.hours__row dt {
  font-weight: 500;
  color: #e5e7eb;
}

.hours__row dd {
  margin: 0;
  color: #fbbf24;
}

.booking__panel ol {
  padding-left: 1.1rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.9);
}

.booking__panel li::marker {
  color: #f97316;
}

.booking__panel p {
  font-size: 0.88rem;
  color: rgba(209, 213, 219, 0.9);
}

@media (max-width: 960px) {
  .booking {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
