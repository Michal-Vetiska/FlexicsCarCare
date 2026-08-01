import { createRouter, createWebHistory } from 'vue-router'
import { checkAdminSession } from '../api/client'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/admin/login',
      name: 'admin-login',
      component: () => import('../admin/AdminLogin.vue'),
      meta: { guest: true },
    },
    {
      path: '/admin',
      component: () => import('../admin/AdminLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: { name: 'admin-texts' } },
        {
          path: 'texts',
          name: 'admin-texts',
          component: () => import('../admin/views/AdminTexts.vue'),
        },
        {
          path: 'services',
          name: 'admin-services',
          component: () => import('../admin/views/AdminServices.vue'),
        },
        {
          path: 'maintenance',
          name: 'admin-maintenance',
          component: () => import('../admin/views/AdminMaintenance.vue'),
        },
        {
          path: 'portfolio',
          name: 'admin-portfolio',
          component: () => import('../admin/views/AdminPortfolio.vue'),
        },
        {
          path: 'media',
          name: 'admin-media',
          component: () => import('../admin/views/AdminMedia.vue'),
        },
      ],
    },
  ],
  scrollBehavior(to) {
    if (to.path.startsWith('/admin')) return false
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach(async (to, from) => {
  const needsAuth = to.matched.some((r) => r.meta.requiresAuth)
  const isGuest = to.matched.some((r) => r.meta.guest)

  if (!needsAuth && !isGuest) return true

  // Už jsme uvnitř adminu → nepovoluj další /me roundtrip
  if (needsAuth && from.matched.some((r) => r.meta.requiresAuth)) {
    return true
  }

  const ok = await checkAdminSession()

  if (needsAuth && !ok) {
    return { name: 'admin-login', query: { redirect: to.fullPath } }
  }

  if (isGuest && ok) {
    return { name: 'admin-texts' }
  }

  return true
})

export default router
