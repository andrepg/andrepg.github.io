import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Homepage',
      path: '/',
      component: HomeView
    },

    // All () => import() routes are code-splitting by route.
    // This generates a separate chunk (Component.[hash].js) for each route,
    // which is lazy-loaded when the route is visited.
    {
      name: 'About me',
      path: '/about',
      component: () => import('@/views/AboutView.vue')
    },
    {
      name: 'Posts - Index',
      path: '/blog',
      component: () => import('@/views/PostIndex.vue')
    },

    {
      name: 'Posts - Single',
      path: '/blog/:year/:article',
      component: () => import('@/views/PostSingle.vue')
    }
  ]
})

export default router
