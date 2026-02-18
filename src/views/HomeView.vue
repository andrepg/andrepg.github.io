<script setup>

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
      'pt-24',
      'pb-20',
      'px-5',
      'gap-10',
      'relative',
      'z-10',
      'max-w-5xl',
      'mx-auto'
    ]"
  >
    <!-- Profile with enhanced glass effect wrapper if needed, 
           but components already have glass. Let's make the gap larger for better visual breathing -->
    <section class="animate-fade-in-up">
      <MyProfile />
    </section>

    <!-- Recomendations -->
    <section class="animate-fade-in-up delay-150">
      <RecomendationsFeature />
    </section>
  </div>
</template>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}

.delay-150 {
  animation-delay: 0.15s;
}
</style>
