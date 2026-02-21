<script setup>
import { nextTick, onMounted, ref } from "vue";
import PostTimelineFeature from "./PostTimelineFeature.vue";
import { Icon } from "@iconify/vue";
import { getPublished } from "@/utils/blog-reader";
import GlassCard from "../GlassCard.vue";


const posts = getPublished().sort(
  (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
).splice(0, 5)
</script>


<template>
  <GlassCard class="flex flex-col gap-4">
      <h2 class="text-xl font-semibold flex items-center gap-2 mb-0">
        <Icon icon="hugeicons:quill-write-02" class="text-2xl" />
        Postagens Recentes
      </h2>

     <p class="opacity-70 font-normal font-md w-full leading-snug">
        As últimas postagens do meu blog pessoal, aqui neste mesmo site.
      </p>

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
          'btn-wide',
          'mx-auto',
          'btn-soft btn-primary',
        ]"
      >
        Ver postagens mais antigas
      </a>
  </GlassCard>
</template>