import './assets/main.css'

import { createApp as createVueApp } from 'vue'
import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { ApplicationRouter, RoutePath } from '@config/routes'
import { createRouter, createWebHistory } from 'vue-router'

type RouteComponent = () => Promise<unknown>;

const routeComponents: Record<RoutePath, RouteComponent> = {
    [RoutePath.HOME]: () => import('@/views/HomeView.vue'),
    [RoutePath.CURRICULUM]: () => import('@/views/AboutView.vue'),
    [RoutePath.PROJECTS]: () => import('@/views/ProjectsView.vue'),
    [RoutePath.BLOG]: () => import('@/views/BlogListView.vue'),
    [RoutePath.BLOG_ARTICLE]: () => import('@/views/BlogArticleView.vue'),
}

const routes = ApplicationRouter.map(route => ({
    ...route,
    component: routeComponents[route.path],
}))
import { createHead } from '@unhead/vue/client'
import { APP_CONFIG } from '@config/app'

const scrollBehavior = () => ({ top: 0 });

const bootstrapDevelopmentMode = () => {
    const router = createRouter({
        history: createWebHistory(),
        routes,
        scrollBehavior,
    })

    createVueApp(App)
        .use(router)
        .use(createHead())
        .mount('#app')
}

const bootstrapProductionMode = () => ViteSSG(App, {
    routes,
    base: APP_CONFIG.BASE_URL ? new URL(APP_CONFIG.BASE_URL).pathname : '/',
    scrollBehavior,
})

let vueApp;

if (APP_CONFIG.IS_DEV) {
    bootstrapDevelopmentMode()
} else {
    vueApp = bootstrapProductionMode()
}

export const createApp = vueApp;