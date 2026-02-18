<script setup>
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue'
import MyProfile from '@/components/ProfileCardFeature.vue';


import RecomendationsFeature from '@/components/RecomendationsFeature.vue';
import { useHead } from '@unhead/vue';
import APP_CONFIG from '@config/app';

useHead({
  title: 'André Paul Grandsire | Software Engineer',
  meta: [
    { name: 'description', content: 'Explore o portfólio e blog de André Paul Grandsire, desenvolvedor de software focado em Vue.js e PHP.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'André Paul Grandsire | Software Engineer' },
    { property: 'og:description', content: 'Explore o portfólio e blog de André Paul Grandsire, desenvolvedor de software focado em Vue.js e PHP.' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'André Paul Grandsire | Software Engineer' },
    { name: 'twitter:description', content: 'Explore o portfólio e blog de André Paul Grandsire, desenvolvedor de software focado em Vue.js e PHP.' },
  ],
  link: [
    { rel: 'canonical', href: APP_CONFIG.BASE_URL }
  ]
})
</script>


<template>
  <div
    :class="[
      'flex',
      'flex-col',
      'pt-16',
      'pb-0',
      'px-5',
      'gap-5',
      'z-10',
    ]"
  >
    <!-- Profile -->
    <MyProfile />

    <!-- Recomendations -->
    <RecomendationsFeature />
  </div>

  <BubblesAnimation />
</template>
