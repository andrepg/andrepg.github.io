import { fileURLToPath, URL } from 'node:url'
import os from 'node:os'

import { defineConfig, type UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { plugin as markdown } from 'vite-plugin-markdown'
import prismjsPlugin from 'vite-plugin-prismjs'

import { PrismJsConfig } from './plugins/primsjs.config.ts'
import { MarkdownRenderConfig } from './plugins/markdown-render.config.ts'
import { getRouteConfig } from './plugins/ssg.ts'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

// Limit the number of CPUs reported to Node.js and libraries
const originalCpus = os.cpus
os.cpus = () => {
  const cpus = originalCpus()
  return cpus.slice(0, 2)
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    markdown(MarkdownRenderConfig),
    prismjsPlugin(PrismJsConfig),
    VueI18nPlugin({ ssr: true })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@data': fileURLToPath(new URL('./data', import.meta.url)),
      '@blog': fileURLToPath(new URL('./blog', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
      '@config': fileURLToPath(new URL('./config', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./plugins', import.meta.url)),
      '@locale': fileURLToPath(new URL('./locale', import.meta.url))
    }
  },

  ssgOptions: {
    concurrency: 2,
    includedRoutes() {
      return getRouteConfig()
    }
  }
} as UserConfig)
