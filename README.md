# Vue 3 + Vite + Tailwind CSS

Ultra-modern landing page pro FLEXICS Car Care.

## Stack

- **Vue 3** — komponentová architektura
- **Vite** — rychlý dev server a build
- **Tailwind CSS v4** — utility-first styling s design tokeny ze Stitch
- **TypeScript** — typová bezpečnost

## Spuštění

```bash
npm install
npm run dev
```

Aplikace běží na [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Struktura

```
src/
├── components/
│   ├── AppNav.vue
│   ├── HeroSection.vue
│   ├── ServicesSection.vue
│   ├── VouchersSection.vue
│   └── AppFooter.vue
├── composables/
│   └── useAnimations.ts   # parallax, scroll reveal, smooth scroll
├── assets/
│   └── main.css           # Tailwind theme + custom efekty
├── constants.ts
└── App.vue
```
