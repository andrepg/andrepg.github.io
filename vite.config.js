import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { Mode, plugin as markdown } from 'vite-plugin-markdown'
import prismjsPlugin from 'vite-plugin-prismjs'

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
      theme: 'default',
      languages: [
        'docker',
        'dockerfile',
        'gitignore',
        'ignore',
        'json',
        'markup',
        'css',
        'html',
        'javascript',
        'jsx',
        'tsx',
        'typescript',
        'php',
        'regex',
        'sql',
        'dart',
        'git',
        'yaml',
        'bash',
        'sh',
        'shell'
      ]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@blog': fileURLToPath(new URL('./blog', import.meta.url))
    }
  }
})
