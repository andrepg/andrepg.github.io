<script setup>
import { nextTick, onMounted, ref } from "vue";
import PostTimelineFeature from "./PostTimelineFeature.vue";

const posts = ref([])

const fetchPosts = () => fetch('/sitemap.json')
  .then(response => processPosts(response))

const processPosts = (response) => response.json()
  .then(sitemap => posts.value = sitemap.filter(post => post.published && post.path.includes('blog')).slice(0, 5))

onMounted(() => {
  nextTick(fetchPosts)
})
</script>


<template>
  <div class="card bg-base-300/85">
    <div class="card-body">
      <h2 class="card-title m-0">Postagens Recentes</h2>

      <PostTimelineFeature :showLabels="false" v-if="posts.length" :posts="posts" />

      <a href="/blog" class="btn btn-primary btn-sm btn-soft">Ver mais</a>
    </div>
  </div>
</template>