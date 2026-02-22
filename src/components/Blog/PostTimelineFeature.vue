<script setup lang="ts">
import { IPost } from '@/interfaces';
import PostSingleCardFeature from './PostSingleCardFeature.vue';
import AnimatedList from '@/components/AnimatedList.vue';

const props = defineProps<{
  posts: IPost[],
  compactMode?: boolean
}>()
</script>

<template>
  <AnimatedList
    :items="posts"
    tag="ul"
    item-tag="li"
    list-class="list gap-4 my-4"
    :delay="150"
  >
    <template #default="{ item }">
      <PostSingleCardFeature tag="h2" :post="item" :compact-mode="compactMode" />
    </template>
  </AnimatedList>
</template>

