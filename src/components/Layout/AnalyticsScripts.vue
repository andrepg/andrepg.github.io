<script setup>
import { useScriptTag } from '@vueuse/core';

const enabled = import.meta.env.VITE_ENV === 'production';

if (enabled) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });

  useScriptTag('https://www.googletagmanager.com/gtm.js?id=GTM-M3XF5L6', undefined, { async: true });
  useScriptTag('https://www.clarity.ms/tag/mm8qkhz9hd', undefined, { async: true });
}
</script>

<template>
  <div></div>
</template>
