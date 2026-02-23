import './assets/main.css'

import { createApp as createVueApp } from 'vue'
import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { ApplicationRouter } from '@data/ApplicationRouter'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@unhead/vue/client'
import { APP_CONFIG } from '@config/app'

const bootstrapDevelopmentMode = () => {
    const router = createRouter({
        history: createWebHistory(),
        routes: ApplicationRouter,
    })

    createVueApp(App)
        .use(router)
        .use(createHead())
        .mount('#app')
}

const bootstrapProductionMode = () => ViteSSG(App, {
    routes: ApplicationRouter,
    base: APP_CONFIG.BASE_URL,
})

let vueApp;

if (APP_CONFIG.IS_DEV) {
    bootstrapDevelopmentMode()
} else {
    vueApp = bootstrapProductionMode()
}

export const createApp = vueApp;