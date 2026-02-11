<script setup lang="ts">
import type { Post } from '@/interfaces';
import PostSingleCardFeature from './PostSingleCardFeature.vue';
import { TransitionGroup } from 'vue';

defineProps<{
  posts: Post[];
  isLoading?: boolean;
}>();
</script>

<template>
  <TransitionGroup
    name="fade"
    tag="ul"
    class="list"
  >
    <li
      v-for="(post, index) in posts"
      :key="post.path"
      class="p-0 not-sm:p-2 my-4"
      :style="{ transitionDelay: `${index * 100}ms` }"
    >
      <PostSingleCardFeature :post="post" />
    </li>
  </TransitionGroup>
</template>
