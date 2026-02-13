import './assets/main.css'

import { ViteSSG } from 'vite-ssg'

import App from './App.vue'
import { HomepageMenu } from '@data/NavigationMenu'

export const createApp = ViteSSG(App, { routes: HomepageMenu })