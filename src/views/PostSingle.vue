<template>
  <article class="w-full min-h-screen">
    <section id="pattern" class="mt-3 py-12
          flex flex-col justify-center items-start px-2 sm:px-10
          text-purple-900">

      <ul class="flex flex-row flex-wrap gap-2 py-2">
        <BadgeElement v-for="tag in content.attributes.tags" key="tag">{{ tag }}</BadgeElement>
      </ul>

      <h1 class="text-2xl font-semibold flex flex-col lg:w-3/4 max-w-[70w]">
        {{ content.attributes.titulo }}

        <small class="text-purple-700 font-normal font-md w-full leading-snug flex-1">
          {{ content.attributes.serie }}
        </small>
      </h1>

      <ul>{{ content.attributes.categories }}</ul>
    </section>

    <section id="article-body" class="w-full" v-html="content.html"></section>
  </article>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import Prism from 'prismjs'
import BadgeElement from '@/components/BadgeElement.vue';

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