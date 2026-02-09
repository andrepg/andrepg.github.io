<script setup>
import { nextTick, onMounted, ref } from "vue";
import PostTimelineFeature from "./PostTimelineFeature.vue";
import { Icon } from "@iconify/vue";

import { SitemapBridge } from "@/router/sitemap";

const posts = ref([])
const sitemapBridge = SitemapBridge.getInstance()

const fetchPosts = async () => {
  await sitemapBridge.load()
  posts.value = sitemapBridge.published()
    .filter(post => post.path.includes('blog'))
    .slice(0, 5)
}

onMounted(() => {
  nextTick(fetchPosts)
})
</script>


<template>
  <div class="card bg-base-300/85">
    <div class="card-body">
      <h2 class="card-title m-0 flex flex-row items-center gap-2">
        <Icon
          icon="hugeicons:quill-write-02"
          class="text-2xl"
        />
        Postagens Recentes
      </h2>

      <div class="gap-8">
        <PostTimelineFeature
          v-if="posts.length"
          :posts="posts"
        />

        <a
          href="/blog"
          :class="[
            'btn',
            'btn-sm',
            'btn-block',
            'btn-outline',
            'hover:btn-primary',
          ]"
        >
          Ver postagens mais antigas
        </a>
      </div>
    </div>
  </div>
</template>