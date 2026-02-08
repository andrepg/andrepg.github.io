<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Prism from 'prismjs'

import BadgeElement from '@/components/BadgeElement.vue';
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';

import '@/assets/blog.css';
import { transformContent } from '@/config/MarkdownTransformers';

const { year, article } = useRoute().params;

const content = ref({
  attributes: {},
  html: '',
});

onMounted(async () => {
  Prism.manual = true;

  const post = await import(`@blog/${year}/${article}.md`);

  content.value = {
    ...post,
    html: transformContent(post.html),
  };

  nextTick(() => {
    Prism.highlightAll()
  })
})
</script>

<style scoped src="@/assets/blog.css" />

<template>
  <article class="flex flex-col gap-10 lg:max-w-10/12 mx-auto" v-if="content">
    <SectionWithHeader class="pb-0! w-full">
      <h1 class="flex flex-col">
        {{ content.attributes.title }}

        <small :class="[
          'leading-tight',
          'max-w-9/12',
          'font-light'
        ]">
          {{ content.attributes.excerpt }}
        </small>
      </h1>

    </SectionWithHeader>

    <div class="alert alert-primary alert-soft w-full gap-1" v-if="content.attributes.serie">
      Este post faz parte da série
      <span class="font-semibold">{{ content.attributes.serie }}</span>

      <a :class="[
        'link',
        'no-underline',
        'text-sm',
        'font-light'
      ]" :href="`/blog/series/${content.attributes.serie}`">Ver todos os posts da série</a>
    </div>

    <section id="article-body" :class="[
      'text-base',
      'line-numbers',
    ]" v-html="content.html"></section>

    <ul v-if="content.attributes.tags" class="menu menu-horizontal flex-wrap gap-2">
      <li class="menu-title">Tags:</li>

      <li v-for="tag in content.attributes.tags" :key="tag" :class="[
        'items-center',
        'self-center',
      ]">
        <BadgeElement class="badge-soft">
          {{ tag }}
        </BadgeElement>
      </li>
    </ul>
  </article>
</template>