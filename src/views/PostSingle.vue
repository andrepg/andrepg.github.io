<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Prism from 'prismjs'

import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';

import '@/assets/blog.css';
import { transformContent } from '@/config/MarkdownTransformers';
import BadgeElement from '@/components/BadgeElement.vue';

const { year, article } = useRoute().params;

const postMetadata = ref({
  path: '',
  title: '',
  excerpt: '',
  published_at: '',
  category: [],
  tags: [],
});

const displayPost = ref(false);

const postContent = ref({
  html: '',
});

onMounted(async () => {
  Prism.manual = true;

  const post = await import(`@blog/${year}/${article}.md`);

  postMetadata.value = {
    ...post.attributes,
    category: post.attributes.category[0] ?? '',
  };

  postContent.value = {
    html: transformContent(post.html),
  };

  displayPost.value = true;

  nextTick(() => {
    Prism.highlightAll()
  })
})
</script>

<style scoped src="@/assets/blog.css" />

<template>
  <div class="w-full pt-16 pb-10 px-4 md:px-10">
    <div :class="[
      'mx-auto',
      'py-12',
      'flex',
      'flex-col',
      'items-center',
      'gap-2',
      'justify-center',
    ]">
      <span class="loading loading-dots"></span>
      <p>Carregando conteúdo...</p>
    </div>

    <section :class="[
      'card',
      'bg-primary/50',
      'transition-all',
      'duration-300',
      'ease-in-out',
      'delay-100',
      postMetadata.title ? 'opacity-100' : 'opacity-0',
    ]">
      <div class="card-body">
        <div class="breadcrumbs">
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li v-if="postMetadata.category"><a href="#">{{ postMetadata.category }}</a></li>
          </ul>
        </div>

        <h1 class="leading-none">{{ postMetadata.title }}</h1>

        <hr class="opacity-20 my-1 text-base-content" />

        <small :class="[
          'text-base',
          'leading-tight',
          'md:max-w-9/12',
          'font-light'
        ]">
          {{ postMetadata.excerpt }}
        </small>

        <ul class="join join-horizontal flex-wrap gap-1 items-center my-2">
          <li v-for="tag in postMetadata.tags" :key="tag">
            <BadgeElement class="badge-sm badge-soft shadow-lg">
              {{ tag }}
            </BadgeElement>
          </li>
        </ul>
      </div>
    </section>

    <article id="article-body" :class="[
      'text-base',
      'line-numbers',
      'break-all!',
    ]" v-html="postContent.html"></article>
  </div>
</template>