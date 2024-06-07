import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Mode, plugin as markdown } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    markdown({
      mode: [Mode.HTML, Mode.TOC, Mode.VUE]
    }),
    // https://github.com/hmsk/vite-plugin-markdown
  ],  
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@blog': fileURLToPath(new URL('./blog', import.meta.url)),
    },    
  },  
})
