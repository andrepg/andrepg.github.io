<script setup>

import { PageLayoutType } from '@/enumerators';

import { useHead } from '@unhead/vue';
import APP_CONFIG from '@config/app';
import { UserConfig } from "@data/website";

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
    { property: 'og:image', content: UserConfig.website.image },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: 'André Paul Grandsire | Software Engineer' },
    { name: 'twitter:description', content: 'Explore o portfólio e blog de André Paul Grandsire, desenvolvedor de software focado em Vue.js e PHP.' },
    { name: 'twitter:image', content: UserConfig.website.image },
  ],
  link: [
    { rel: 'canonical', href: APP_CONFIG.BASE_URL }
  ]
})
</script>


<template>
  <PageLayout :type="PageLayoutType.HOME">
    <!-- Header -->
    <Transition appear name='fade'>
      <MyProfile />
    </Transition>

    <!-- Projects & Blog posts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
      <Transition appear name='fade' class="delay-100!">
        <RecomendationsFeature class="h-full" />
      </Transition>

      <Transition appear name='fade' class="delay-200!">
        <RecentPostsFeature class="h-full" />
      </Transition>
    </div>
  </PageLayout>
</template>
