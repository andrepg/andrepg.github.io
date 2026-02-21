<script setup lang="ts">
import { Post } from '@/interfaces';
import PostSingleCardFeature from './PostSingleCardFeature.vue';
import AnimatedList from '@/components/AnimatedList.vue';

const props = defineProps<{
  posts: Post[],
  isLoading?: boolean,
  compactMode?: boolean
}>()
</script>

<template>
  <AnimatedList
    :items="posts"
    list-class="list"
    item-class="p-0 not-sm:p-2 my-4 transition-all duration-0 ease md:transition-all duration-500 ease"
    :delay="150"
  >
    <template #default="{ item }">
      <PostSingleCardFeature tag="h2" :post="item" :compact-mode="compactMode" />
    </template>
  </AnimatedList>
</template>

