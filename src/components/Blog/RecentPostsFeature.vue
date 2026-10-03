<script setup>
import PostTimelineFeature from './PostTimelineFeature.vue'
import { getRecentPosts } from '@/utils/blog-reader'
import AnimatedListFeature from '@/components/Features/AnimatedListFeature.vue'

const posts = getRecentPosts(5)
</script>

<template>
  <AnimatedListFeature
    :title="$t('blog.recentPosts.title')"
    see-more-target="/blog"
    :see-more-text="$t('blog.recentPosts.seeMore')"
  >
    <PostTimelineFeature v-if="posts.length" :posts="posts" />
  </AnimatedListFeature>
</template>
