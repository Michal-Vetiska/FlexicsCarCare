<script setup>
const highlights = [
  'Keramická ochrana laku až na 5 let',
  'Precizní čištění interiéru včetně ozónu',
  'Bezkompromisní péče o detaily a lak',
]
</script>

<template>
  <section class="hero">
    <div class="hero__content">
      <p class="hero__eyebrow">Car detailing • Praha a okolí</p>
      <h1 class="hero__title">
        Profesionální detailing,
        <span>který udělá z vašeho auta výstavní kus.</span>
      </h1>
      <p class="hero__subtitle">
        Ruční péče, hluboké vyčištění a dlouhodobá ochrana laku pro ty, kteří chtějí víc
        než jen umýt auto.
      </p>

      <div class="hero__actions">
        <RouterLink to="/rezervace" class="hero__primary">Rezervovat termín</RouterLink>
        <RouterLink to="/cenik" class="hero__secondary">Prohlédnout ceník</RouterLink>
      </div>

      <ul class="hero__highlights">
        <li v-for="item in highlights" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="hero__visual">
      <div class="hero__card">
        <div class="hero__car" />
        <div class="hero__reflection" />
        <div class="hero__badge">Showroom finish</div>
        <div class="hero__gradient" />
      </div>
    </div>
  </section>

  <section class="section section--split">
    <div class="section__card">
      <h2>Proč Flexics Car Care</h2>
      <p>
        Pracujeme tak, jako bychom se starali o vlastní auto. Používáme špičkovou chemii, precizní
        postupy a dáváme si záležet na každém detailu – od laku až po poslední šev na sedačkách.
      </p>
      <div class="section__grid">
        <div class="section__item">
          <h3>Individuální přístup</h3>
          <p>Balíček vždy přizpůsobíme stavu a typu vašeho vozu.</p>
        </div>
        <div class="section__item">
          <h3>Prémiová kosmetika</h3>
          <p>Pracujeme s ověřenými značkami, které šetří lak i interiér.</p>
        </div>
        <div class="section__item">
          <h3>Transparentní ceník</h3>
          <p>Žádné skryté poplatky, jasně dané balíčky i doplňkové služby.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 3rem;
  align-items: center;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero__eyebrow {
  font-size: 0.85rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(148, 163, 184, 0.9);
}

.hero__title {
  font-size: clamp(2.4rem, 3.1vw, 3.4rem);
  line-height: 1.05;
  font-weight: 700;
}

.hero__title span {
  display: block;
  background: linear-gradient(135deg, #fbbf24, #f97316, #ec4899);
  -webkit-background-clip: text;
  color: transparent;
}

.hero__subtitle {
  font-size: 1.05rem;
  color: rgba(209, 213, 219, 0.9);
  max-width: 34rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero__primary,
.hero__secondary {
  border-radius: 999px;
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
}

.hero__primary {
  background: linear-gradient(135deg, #fbbf24, #f97316, #ec4899);
  color: #020617;
}

.hero__secondary {
  border: 1px solid rgba(148, 163, 184, 0.6);
  color: #e5e7eb;
  background: rgba(15, 23, 42, 0.8);
}

.hero__highlights {
  display: grid;
  gap: 0.35rem;
  margin-top: 0.5rem;
  padding-left: 1rem;
  font-size: 0.9rem;
  color: rgba(209, 213, 219, 0.9);
}

.hero__highlights li::marker {
  color: #f97316;
}

.hero__visual {
  display: flex;
  justify-content: flex-end;
}

.hero__card {
  position: relative;
  width: 100%;
  max-width: 360px;
  aspect-ratio: 4 / 3;
  border-radius: 24px;
  overflow: hidden;
  background: radial-gradient(circle at top, #0f172a 0, #020617 60%, #000 100%);
  box-shadow:
    0 24px 80px rgba(15, 23, 42, 0.95),
    0 0 0 1px rgba(148, 163, 184, 0.35);
}

.hero__car {
  position: absolute;
  inset: 14% 6% 22%;
  border-radius: 999px;
  background: linear-gradient(135deg, #020617, #0b1120 30%, #111827 60%, #f97316 120%);
  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.hero__reflection {
  position: absolute;
  inset: 18% 14% 40% 10%;
  border-radius: 999px;
  background: linear-gradient(120deg, rgba(248, 250, 252, 0.7), transparent 55%);
  opacity: 0.9;
}

.hero__badge {
  position: absolute;
  bottom: 1.2rem;
  left: 1.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  font-size: 0.7rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(15, 23, 42, 0.88);
  color: #e5e7eb;
  border: 1px solid rgba(148, 163, 184, 0.7);
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.hero__badge::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.35);
}

.hero__gradient {
  position: absolute;
  inset: auto -20% -25%;
  height: 60%;
  background: radial-gradient(ellipse at top, rgba(59, 130, 246, 0.7), transparent 65%);
  opacity: 0.7;
}

.section {
  margin-top: 3.5rem;
}

.section__card {
  border-radius: 24px;
  padding: 1.9rem 1.8rem 1.8rem;
  background: radial-gradient(circle at top left, rgba(30, 64, 175, 0.4), transparent 55%),
    linear-gradient(to bottom right, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.86));
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow:
    0 24px 70px rgba(15, 23, 42, 0.95),
    0 0 0 1px rgba(15, 23, 42, 0.9);
}

.section__card h2 {
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
}

.section__card p {
  font-size: 0.95rem;
  color: rgba(209, 213, 219, 0.9);
}

.section__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.4rem;
  margin-top: 1.4rem;
}

.section__item h3 {
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
}

.section__item p {
  font-size: 0.88rem;
  color: rgba(209, 213, 219, 0.85);
}

@media (max-width: 960px) {
  .hero {
    grid-template-columns: minmax(0, 1fr);
  }

  .hero__visual {
    justify-content: flex-start;
  }

  .hero__card {
    max-width: 320px;
    margin-top: 0.5rem;
  }
}

@media (max-width: 720px) {
  .section__grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
