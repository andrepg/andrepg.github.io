<script setup>
import { nextTick, onMounted, ref } from "vue";
import PostTimelineFeature from "./PostTimelineFeature.vue";
import { Icon } from "@iconify/vue";

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
      <h2 class="card-title m-0 flex flex-row items-center gap-2">
        <Icon icon="hugeicons:quill-write-02" class="text-2xl" />
        Postagens Recentes
      </h2>

      <div class="list gap-8">
        <PostTimelineFeature :showLabels="false" v-if="posts.length" :posts="posts" />

        <a href="/blog" :class="[
          'btn',
          'btn-sm',
          'btn-soft',
          'w-fit',
          'mx-auto',
          'hover:btn-primary',
        ]">
          Ver postagens mais antigas
        </a>
      </div>

    </div>
  </div>
</template>