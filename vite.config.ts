import { fileURLToPath, URL } from 'node:url'
import path from 'node:path'
import os from 'node:os'

// Limit the number of CPUs reported to Node.js and libraries
const originalCpus = os.cpus;
os.cpus = () => {
    const cpus = originalCpus();
    return cpus.slice(0, 2);
};

import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { plugin as markdown } from 'vite-plugin-markdown'
import prismjsPlugin from 'vite-plugin-prismjs'

import { PrismJsConfig } from './plugins/primsjs.config'
import { MarkdownRenderConfig } from './plugins/markdown-render.config'
import { getMarkdownBlogRoutes } from './plugins/ssg'
import { ApplicationRouter } from './data/ApplicationRouter'

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
      '@config': fileURLToPath(new URL('./config', import.meta.url)),
      '@plugins': fileURLToPath(new URL('./plugins', import.meta.url))
    }
  },

  ssgOptions: {
    concurrency: 2,
    includedRoutes() {
      console.log(`[ssg] Preparing static routes`);

      const blogRoutes = getMarkdownBlogRoutes({ 
        searchPath: path.resolve(__dirname, './blog'),
      });

      console.log(`[ssg] Found ${blogRoutes.length} blog routes`);

      const staticRoutes = ApplicationRouter
        .filter(route => !route.path.includes(':'))
        .map(route => route.path);

      console.log(`[ssg] Found ${staticRoutes.length} static routes`);

      return Array.from(new Set([...staticRoutes, ...blogRoutes]));
    },
  },
} as UserConfig)
