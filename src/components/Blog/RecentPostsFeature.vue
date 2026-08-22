<script setup>
import PostTimelineFeature from "./PostTimelineFeature.vue";
import { Icon } from "@iconify/vue";
import { getRecentPosts } from "@/utils/blog-reader";
import SectionHeader from "@/components/SectionHeader.vue";


const posts = getRecentPosts(5)
</script>


<template>
  <section class="flex flex-col gap-4">
      <SectionHeader subtitle="As últimas postagens do meu blog pessoal, aqui neste mesmo site.">
        <template #title>
          Postagens Recentes
        </template>
      </SectionHeader>

      <PostTimelineFeature
        v-if="posts.length"
        :posts="posts"
      />

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
  </section>
</template>