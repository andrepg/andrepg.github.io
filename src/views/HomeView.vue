<script setup lang="ts">
import { RoutePath } from '@config/routes'
import { usePageHead } from '@/composables/usePageHead'

import HomeLayout from '@/layouts/HomeLayout.vue'
import ProfileHeroFeature from '@/components/Features/ProfileCardFeature.vue'
import HighlightedProjectsFeature from '@/components/Features/HighlightedProjectsFeature.vue'
import RecentPostsFeature from '@/components/Blog/RecentPostsFeature.vue'

usePageHead(RoutePath.HOME)
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