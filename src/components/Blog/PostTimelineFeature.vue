<script setup lang="ts">
import { Post } from '@/interfaces';
import { TransitionGroup } from 'vue';
import PostSingleCardFeature from './PostSingleCardFeature.vue';

const props = defineProps<{
  posts: Post[],
  isLoading?: boolean,
  compactMode?: boolean
}>()
</script>

<template>
  <TransitionGroup
    name="fade"
    appear
    tag="ul"
    class="list"
  >
    <li
      v-for="(post, index) in posts"
      :key="index"
      :style="{ transitionDelay: `${index * 150}ms` }"
      :class="[
        'p-0',
        'not-sm:p-2',
        'my-4',
        'transition-all duration-0 ease',
        'md:transition-all duration-500 ease',
      ]"
    >
      <PostSingleCardFeature tag="h2" :post="post" :compact-mode="compactMode" />
    </li>
  </TransitionGroup>
</template>

