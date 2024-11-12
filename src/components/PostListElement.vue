<script setup>
defineProps({
  post: {
    type: {
      path: String,
      title: String,
      excerpt: String,
      category: Array,
      tags: Array,
      published_at: String,
    }
  }
})
</script>

<template>
  <a :href="'/blog/'.concat(post.path)" class="">
    <h2>{{ post.title }}</h2>
    <p>{{ post.excerpt }}</p>
  </a>
</template>