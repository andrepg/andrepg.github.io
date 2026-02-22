<script setup>
import { nextTick, onMounted, ref } from "vue";
import PostTimelineFeature from "./PostTimelineFeature.vue";
import { Icon } from "@iconify/vue";
import { getPublished } from "@/utils/blog-reader";
import GlassCard from "../GlassCard.vue";
import SectionHeader from "@/components/SectionHeader.vue";


const posts = getPublished().sort(
  (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
).splice(0, 5)
</script>


<template>
  <GlassCard class="flex flex-col gap-4">
      <SectionHeader icon="hugeicons:quill-write-02" subtitle="As últimas postagens do meu blog pessoal, aqui neste mesmo site.">
        <template #title>
          Postagens Recentes
        </template>
      </SectionHeader>

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