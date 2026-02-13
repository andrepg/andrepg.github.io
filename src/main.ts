import './assets/main.css'

import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { HomepageMenu } from '@data/NavigationMenu'

// TODO Maybe move this to a config file
export const BASE_URL = import.meta.env.BASE_URL;

export const createApp = ViteSSG(App, {
    routes: HomepageMenu,
    base: BASE_URL
})