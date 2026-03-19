import { createRouter, createWebHistory } from 'vue-router'
import LandingView from './views/LandingView.vue'
import PricingView from './views/PricingView.vue'
import VouchersView from './views/VouchersView.vue'
import BookingView from './views/BookingView.vue'
import KontaktView from './views/KontaktView.vue'

const routes = [
  { path: '/', name: 'home', component: LandingView },
  { path: '/cenik', name: 'pricing', component: PricingView },
  { path: '/darkove-poukazy', name: 'vouchers', component: VouchersView },
  { path: '/rezervace', name: 'booking', component: BookingView },
  { path: '/kontakt', name: 'kontakt', component: KontaktView },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

