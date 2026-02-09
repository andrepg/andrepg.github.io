<script setup>
import "@/assets/blog.css";

import { nextTick, onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import Prism from 'prismjs'

import { transformContent } from '@/config/MarkdownTransformers';
import BadgeElement from '@/components/BadgeElement.vue';
import { Icon } from '@iconify/vue';

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

const postContent = ref(null);

const postRelatedSeries = ref([]);

const loadArticle = async () => {
  const post = await import(`@blog/${year}/${article}.md`);

  postMetadata.value = {
    ...post.attributes,
    category: post.attributes.category[0] ?? '',
  };

  postContent.value = transformContent(post.html);

  nextTick(() => setTimeout(() => Prism.highlightAll(), 750))
}

const loadSeries = async () => fetch('/sitemap.json').then(res => res.json())
  .then(sitemap => {
    console.log(sitemap)

    const series = sitemap.filter(
      post => post.serie === postMetadata.value.serie
    );

    postRelatedSeries.value = series.sort(
      (a, b) => a.serie_part - b.serie_part
    );
  })
  .catch(err => console.error(err))


onMounted(() => {
  Prism.manual = true;

  loadArticle().finally(() => {
    displayPost.value = true;
  }).catch(() => {
    window.location.replace('/404.html')
  });

  loadSeries();
})
</script>

<template>
  <div class="w-full pt-20 pb-10 px-4 md:px-10">
    <Transition name="fade" mode="out-in" :duration="{ enter: 100, leave: 500 }">
      <div v-if="!displayPost" key="loading" :class="[
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

      <section v-else="displayPost" :class="[
        'card',
        'bg-neutral',
        'transition-all',
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

        <div v-if="postRelatedSeries.length > 1 && postMetadata.serie" :class="[
          'card',
          'card-body',
          'shadow-lg',
          'transition-all',
          'join',
          'join-vertical gap-0',
        ]">
        <div class="flex flex-col py-5 px-4 bg-base-100/30 join-item gap-2">
          <span class="text-sm font-semibold tracking-wide uppercase flex items-center gap-2">
            <Icon icon="hugeicons:book-open-02" class="inline-block text-xl" />
            {{ postMetadata.serie }}
          </span>

          <p class="text-sm font-light">
            Este post faz parte de uma série de posts chamada <strong>{{ postMetadata.serie }}</strong>. Aqui está a lista de todos os posts da série:
          </p>
        </div>

          <div v-for="post in postRelatedSeries" :key="post.path" :class="[
            'join-item',
            'collapse',
            'collapse-plus',
            'bg-base-100/50',
          ]">
            <input type="radio" name="my-accordion-3" />
            <div class="collapse-title font-semibold">{{ post.title }}</div>
            <div class="collapse-content indent-3 font-light">
              <p>{{ post.excerpt }}</p>
            </div>
          </div>
        </div>
      </section>
    </Transition>

    <article key="article" id="article-body" :class="[
      'text-base',
      'line-numbers',
      'break-all!',
      'opacity-0',
      'transition-all',
      'ease-in',
      'pt-12',
      'mt-4',
      !displayPost && 'opacity-0 delay-0 duration-200',
      displayPost && 'opacity-100 delay-1000 duration-1000',
    ]" v-html="postContent"></article>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>