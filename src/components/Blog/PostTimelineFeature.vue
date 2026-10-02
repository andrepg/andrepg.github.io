<script setup lang="ts">
import type { IPost } from '@/interfaces'
import PostSingleCardFeature from './PostSingleCardFeature.vue'
import AnimatedList from '@/components/Shell/AnimatedList.vue'

defineProps<{
  posts: IPost[]
  compactMode?: boolean
}>()
</script>

<template>
  <AnimatedList :items="posts" tag="ul" item-tag="li" list-class="list gap-4" :delay="150">
    <template #default="{ item }">
      <PostSingleCardFeature class="list-row" :post="item" />
    </template>
  </AnimatedList>
</template>
