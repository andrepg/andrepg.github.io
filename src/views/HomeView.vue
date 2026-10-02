<script setup>
import { useHead } from '@unhead/vue'
import APP_CONFIG from '@config/app'
import { UserConfig } from '@data/website'

import HomeLayout from '@/components/Layout/HomeLayout.vue'
import ProfileHeroFeature from '@/components/Features/ProfileCardFeature.vue'
import HighlightedProjectsFeature from '@/components/Features/HighlightedProjectsFeature.vue'
import RecentPostsFeature from '@/components/Blog/RecentPostsFeature.vue'

const generalOg = [
  { property: 'og:type', content: 'website' },
  { property: 'og:title', content: UserConfig.author.name },
  { property: 'og:description', content: UserConfig.author.shortBiography },
  { property: 'og:image', content: UserConfig.website.image }
]

const twitterOg = [
  { name: 'twitter:card', content: 'summary' },
  { name: 'twitter:title', content: UserConfig.author.name },
  { name: 'twitter:description', content: UserConfig.author.shortBiography },
  { name: 'twitter:image', content: UserConfig.website.image }
]

useHead({
  title: UserConfig.author.name,
  meta: [
    { name: 'description', content: UserConfig.author.shortBiography },
    ...generalOg,
    ...twitterOg
  ],
  link: [{ rel: 'canonical', href: APP_CONFIG.BASE_URL }]
})
</script>

<template>
  <HomeLayout>
    <template #sidebar>
      <ProfileHeroFeature />
    </template>

    <HighlightedProjectsFeature class="h-full" />
    <RecentPostsFeature class="h-full" />
  </HomeLayout>
</template>
