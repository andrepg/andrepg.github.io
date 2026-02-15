import './assets/main.css'

import { createApp as createVueApp } from 'vue'
import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { HomepageMenu } from '@data/NavigationMenu'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { BASE_URL } from './utils/blog-reader'

// TODO Maybe move this to a config file
const bootstrapDevelopmentMode = () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: HomepageMenu,
    })

    createVueApp(App)
        .use(router)
        .use(createHead())
        .mount('#app')
}

const bootstrapProductionMode = () => ViteSSG(App, {
    routes: HomepageMenu,
    base: BASE_URL
})

let vueApp;

if (import.meta.env.DEV) {
    bootstrapDevelopmentMode()
} else {
    vueApp = bootstrapProductionMode()
}

export const createApp = vueApp;