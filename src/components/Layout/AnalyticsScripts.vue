<script setup lang="ts">
import { onMounted } from 'vue'
import { APP_CONFIG } from '@config/app'

const { GTM_ID, GA4_ID, CLARITY_ID } = APP_CONFIG.ANALYTICS

declare global {
  interface Window {
    dataLayer: unknown[][]
    gtag: (...args: unknown[]) => void
    clarity: {
      (...args: unknown[]): void
      q?: unknown[][]
    }
  }
}

function injectScript(src: string): void {
  const tag = document.createElement('script')
  tag.async = true
  tag.src = src
  document.head.appendChild(tag)
}

function loadGoogleTagManager(): void {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

  window.gtag = function gtag(...args: unknown[]): void {
    window.dataLayer.push(args)
  }

  window.gtag('js', new Date())
  window.gtag('config', GA4_ID)

  injectScript(`https://www.googletagmanager.com/gtm.js?id=${GTM_ID}&l=dataLayer`)
  injectScript(`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`)
}

function loadClarity(): void {
  window.clarity =
    window.clarity ||
    function clarity(...args: unknown[]): void {
      ;(window.clarity.q = window.clarity.q || []).push(args)
    }

  injectScript(`https://www.clarity.ms/tag/${CLARITY_ID}`)
}

if (APP_CONFIG.IS_PROD) {
  onMounted(() => {
    loadGoogleTagManager()
    loadClarity()
  })
}
</script>

<template>
  <div></div>
</template>
