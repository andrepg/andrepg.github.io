<script setup lang="ts">
import PostTimelineFeature from './PostTimelineFeature.vue'
import { getRecentPosts } from '@/utils/blog-reader'
import AnimatedListFeature from '@/components/Features/AnimatedListFeature.vue'
import { RoutePath } from '@config/routes'
import { useLocaleRouting } from '@/composables/useLocaleRouting'

const posts = getRecentPosts(5)

const { localize } = useLocaleRouting()
</script>

<template>
  <AnimatedListFeature
    :title="$t('blog.recentPosts.title')"
    :see-more-target="localize(RoutePath.BLOG)"
    :see-more-text="$t('blog.recentPosts.seeMore')"
  >
    <PostTimelineFeature v-if="posts.length" :posts="posts" />
  </AnimatedListFeature>
</template>
