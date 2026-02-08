<script setup lang="ts">
import PostSingleFeature from './PostSingleCardFeature.vue';

defineProps<{
	posts: any[];
}>()
</script>

<template>
	<ul class="list">
      <li v-for="post in posts" :key="post.path" class="p-0 not-sm:p-2 my-4">
        <PostSingleFeature :post="post" />
      </li>
    </ul>
</template>
