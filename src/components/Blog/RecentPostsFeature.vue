<script setup>
import { nextTick, onMounted, ref } from "vue";
import PostTimelineFeature from "./PostTimelineFeature.vue";
import { Icon } from "@iconify/vue";
import { getPublished } from "@/utils/blog-reader";
import GlassCard from "../GlassCard.vue";

// import { SitemapBridge } from "@/sitemap/sitemap.bridge";

const posts = getPublished().sort(
  (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
).splice(0, 5)
</script>


<template>
  <GlassCard>
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

      </div>
      <a
        href="/blog"
        :class="[
          'btn',
          'btn-block',
          'btn-soft btn-primary',
        ]"
      >
        Ver postagens mais antigas
      </a>
    </div>
  </GlassCard>
</template>