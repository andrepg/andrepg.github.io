import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Mode, plugin as markdown } from 'vite-plugin-markdown'
import prismjsPlugin from 'vite-plugin-prismjs'

import { PrismJsLanguages, PrismJsPlugins } from './src/data/settings'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    markdown({
      mode: [Mode.HTML, Mode.TOC, Mode.VUE]
    }),

    prismjsPlugin({
      css: true,
      theme: 'tomorrow',
      languages: PrismJsLanguages,
      plugins: PrismJsPlugins
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@blog': fileURLToPath(new URL('./blog', import.meta.url))
    }
  }
})
