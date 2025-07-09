import { createRouter, createWebHistory } from 'vue-router'
import AdminPage from '@/components/pages/AdminPage.vue'
import LoginPage from '@/components/pages/LoginPage.vue'
import { isAuthenticated } from '@/utils/auth.js'
import RegisterPage from '@/components/pages/RegisterPage.vue'

const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  {
    path: '/admin',
    component: AdminPage,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/admin') && !isAuthenticated()) {
    next('/login')
  } else if ((to.path === '/login' || to.path === '/register') && isAuthenticated()) {
    next('/admin')
  } else {
    next()
  }
})

export default router
