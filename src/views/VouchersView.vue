<script setup>
const vouchers = [
  {
    name: 'Detailing balíček',
    value: '2 000 Kč',
    description: 'Ideální dárek pro rychlé osvěžení vozu a péči o interiér i exteriér.',
  },
  {
    name: 'Prémiový zážitek',
    value: '5 000 Kč',
    description: 'Pro ty, kteří chtějí dopřát autu kompletní proměnu a keramickou ochranu.',
  },
  {
    name: 'Hodnotový poukaz',
    value: 'libovolná částka',
    description: 'Zvolte si přesnou částku, obdarovaný si balíček vybere sám.',
  },
]
</script>

<template>
  <section class="section">
    <header class="section__header">
      <h1>Dárkové poukazy</h1>
      <p>
        Elegantní způsob, jak darovat zážitek z perfektně vyčištěného a ochráněného vozu. Vhodné pro
        rodinu, přátele i firemní partnery.
      </p>
    </header>

    <div class="vouchers">
      <article v-for="voucher in vouchers" :key="voucher.name" class="vouchers__card">
        <div class="vouchers__chip">Dárkový poukaz</div>
        <h2>{{ voucher.name }}</h2>
        <div class="vouchers__value">{{ voucher.value }}</div>
        <p class="vouchers__description">{{ voucher.description }}</p>
        <p class="vouchers__hint">
          Poukaz vystavíme na jméno, včetně unikátního kódu a platnosti 12 měsíců.
        </p>
      </article>
    </div>

    <div class="section__note">
      Pro objednání poukazu nás kontaktujte telefonicky nebo e-mailem. Připravíme vám
      elektronickou variantu nebo tištěný poukaz k osobnímu předání.
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
  max-width: 36rem;
  font-size: 0.98rem;
  color: rgba(209, 213, 219, 0.9);
}

.vouchers {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}

.vouchers__card {
  position: relative;
  border-radius: 20px;
  padding: 1.6rem 1.5rem;
  background: radial-gradient(circle at top, rgba(236, 72, 153, 0.3), transparent 60%),
    linear-gradient(to bottom right, rgba(15, 23, 42, 0.98), rgba(15, 23, 42, 0.93));
  border: 1px solid rgba(248, 250, 252, 0.12);
  box-shadow:
    0 20px 60px rgba(15, 23, 42, 0.98),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.vouchers__chip {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.7rem;
  border-radius: 999px;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: 1px solid rgba(248, 250, 252, 0.18);
  color: rgba(248, 250, 252, 0.9);
  margin-bottom: 0.7rem;
}

.vouchers__value {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.4rem;
  color: #fbbf24;
}

.vouchers__description {
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.9);
}

.vouchers__hint {
  margin-top: 0.7rem;
  font-size: 0.8rem;
  color: rgba(148, 163, 184, 0.95);
}

.section__note {
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.85);
}

@media (max-width: 960px) {
  .vouchers {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .vouchers {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
