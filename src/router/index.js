import { createRouter, createWebHistory } from 'vue-router'
import { HomepageMenu } from '@/data/HomepageMenu.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: HomepageMenu
})

export default router
