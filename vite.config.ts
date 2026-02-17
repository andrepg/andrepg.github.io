import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { plugin as markdown } from 'vite-plugin-markdown'
import prismjsPlugin from 'vite-plugin-prismjs'

import { PrismJsConfig } from './plugins/primsjs.config'
import { MarkdownRenderConfig } from './plugins/markdown-render.config'
import { getMarkdownBlogRoutes } from './src/utils/ssg'

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
      '@data': fileURLToPath(new URL('./data', import.meta.url)),
      '@blog': fileURLToPath(new URL('./blog', import.meta.url)),
      '@public': fileURLToPath(new URL('./public', import.meta.url)),
      '@config': fileURLToPath(new URL('./config', import.meta.url))
    }
  },

  // @ts-expect-error This will be handled by Vite SSG wrapper
  ssgOptions: {
    includedRoutes() {
      return getMarkdownBlogRoutes({ 
        searchPath: path.resolve(__dirname, './blog'),
      });
    }
  },
})
