<script setup>

import { PageLayoutType } from '@/enumerators';

import { useHead } from '@unhead/vue';
import APP_CONFIG from '@config/app';

import PageLayout from '@/components/Layout/PageLayout.vue';
import MyProfile from '@/components/Features/ProfileCardFeature.vue';
import RecomendationsFeature from '@/components/Features/RecomendationsFeature.vue';
import RecentPostsFeature from '@/components/Blog/RecentPostsFeature.vue';

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
  <PageLayout :type="PageLayoutType.HOME">
    <!-- Profile with enhanced glass effect wrapper if needed, 
           but components already have glass. Let's make the gap larger for better visual breathing -->
    <Transition appear name='fade'>
      <MyProfile />
    </Transition>

    <!-- Recomendations -->
    <Transition appear name='fade' class="delay-100!">
      <RecomendationsFeature />
    </Transition>

    <!-- Recent posts -->
    <Transition appear name='fade' class="delay-200!">
      <RecentPostsFeature />
    </Transition>
  </PageLayout>
</template>
