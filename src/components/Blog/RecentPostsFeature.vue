<script setup>
import PostTimelineFeature from './PostTimelineFeature.vue'
import { Icon } from '@iconify/vue'
import { getRecentPosts } from '@/utils/blog-reader'
import SectionHeader from '@/components/SectionHeader.vue'
import AnimatedListFeature from '@/components/Features/AnimatedListFeature.vue'

const posts = getRecentPosts(5)
</script>

<template>
  <AnimatedListFeature
    title="Postagens Recentes"
    see-more-target="/blog"
    see-more-text="Ver postagens mais antigas"
  >
    <PostTimelineFeature v-if="posts.length" :posts="posts" />
  </AnimatedListFeature>
</template>