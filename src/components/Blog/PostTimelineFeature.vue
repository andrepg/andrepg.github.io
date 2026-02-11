<script setup lang="ts">
import type { Post } from '@/interfaces';
import PostSingleCardFeature from './PostSingleCardFeature.vue';

defineProps<{
  posts: Post[];
}>();
</script>

<template>
  <ul class="list">
    <li
      v-for="post in posts"
      :key="post.path"
      class="p-0 not-sm:p-2 my-4"
    >
      <PostSingleCardFeature :post="post" />
    </li>
  </ul>
</template>
