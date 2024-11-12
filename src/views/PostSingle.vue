<template>
  <article class="w-full min-h-screen">
    <SectionWithHeader :showPattern="true">

      <ul class="flex flex-row flex-wrap gap-2 py-2 px-0">
        <BadgeElement v-for="tag in content.attributes.tags" key="tag">{{ tag }}</BadgeElement>
      </ul>

      <h1 class="text-3xl font-semibold flex flex-col max-w-[70w]">
        <span class="font-serif"> {{ content.attributes.titulo }}</span>

        <small class="w-full font-normal text-base leading-snug flex-1">
          {{ content.attributes.serie }}
        </small>
      </h1>

      <ul>{{ content.attributes.categories }}</ul>
    </SectionWithHeader>

    <section id="article-body" class="w-full text-base line-numbers dark:text-gray-300" v-html="content.html"></section>
  </article>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Prism from 'prismjs'

import BadgeElement from '@/components/BadgeElement.vue';
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';

const { year, article } = useRoute().params;

const content = ref({
  attributes: {},
  html: '',
});

onMounted(async () => {
  Prism.manual = true;

  content.value = await import(`@blog/${year}/${article}.md`);

  nextTick(() => {
    Prism.highlightAll()
  })
})
</script>