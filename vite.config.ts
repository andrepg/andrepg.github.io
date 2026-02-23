import { fileURLToPath, URL } from 'node:url'
import os from 'node:os'

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { plugin as markdown } from 'vite-plugin-markdown'
import prismjsPlugin from 'vite-plugin-prismjs'

import { PrismJsConfig } from './plugins/primsjs.config'
import { MarkdownRenderConfig } from './plugins/markdown-render.config'
import {  getRouteConfig } from './plugins/ssg'

// Limit the number of CPUs reported to Node.js and libraries
const originalCpus = os.cpus;
os.cpus = () => {
  const cpus = originalCpus();
  return cpus.slice(0, 2);
};

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    markdown(MarkdownRenderConfig),
    prismjsPlugin(PrismJsConfig)
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
      '@blog': fileURLToPath(new URL('./blog', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
      '@config': fileURLToPath(new URL('./config', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./plugins', import.meta.url))
    }
  },

  ssgOptions: {
    concurrency: 2,
    includedRoutes() {
      return getRouteConfig()
    },
  },
} as UserConfig)
