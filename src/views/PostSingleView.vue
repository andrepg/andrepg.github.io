<script setup lang="ts">
import "@/assets/blog.css";
import { computed, nextTick, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import Prism from 'prismjs'

import { transformContent } from '@/config/MarkdownTransformers';
import BadgeElement from '@/components/BadgeElement.vue';
import { Icon } from '@iconify/vue';
import { SitemapBridge } from '@/router/sitemap';
import { slugify } from '@/utils/slugify';
import type { Post } from '@/interfaces';

const { year, article } = useRoute().params;

const sitemapBridge = SitemapBridge.getInstance();

const postMetadata = ref<Post>({
  path: '',
  title: '',
  excerpt: '',
  published_at: '',
  category: [],
  tags: [],
});

const displayPost = ref(false);

const sanitizedHtmlPostContent = ref<string | null>(null);

const postRelatedSeries = ref<Post[]>([]);

const seriesUrl = computed(() => {
  if (!postMetadata.value.serie) return '';
  return `/blog/series/${slugify(postMetadata.value.serie)}`;
})

const loadArticle = async () => {
  const post = await import(`@blog/${year}/${article}.md`);

  postMetadata.value = {
    ...post.attributes,
    category: post.attributes.category[0] ?? '',
  };

  sanitizedHtmlPostContent.value = transformContent(post.html);

  nextTick(() => setTimeout(() => Prism.highlightAll(), 750))
}

const loadSeries = async () => {
  await sitemapBridge.load();
  postRelatedSeries.value = sitemapBridge.bySeries(postMetadata.value?.serie ?? '');
}


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
    <Transition
      name="fade"
      mode="out-in"
      :duration="{ enter: 100, leave: 500 }"
    >
      <div
        v-if="!displayPost"
        key="loading"
        :class="[
          'mx-auto',
          'py-12',
          'flex',
          'flex-col',
          'items-center',
          'gap-2',
          'justify-center',
        ]"
      >
        <span class="loading loading-dots" />
        <p>Carregando conteúdo...</p>
      </div>

      <section
        v-else
        :class="[
          'card',
          'bg-neutral',
          'transition-all',
        ]"
      >
        <div class="card-body">
          <div class="breadcrumbs">
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li v-if="postMetadata.category">
                <a href="#">{{ postMetadata.category }}</a>
              </li>
            </ul>
          </div>

          <h1 class="leading-none">
            {{ postMetadata.title }}
          </h1>

          <hr class="opacity-20 my-1 text-base-content">

          <small
            :class="[
              'text-base',
              'leading-tight',
              'md:max-w-9/12',
              'font-light'
            ]"
          >
            {{ postMetadata.excerpt }}
          </small>

          <ul class="join join-horizontal flex-wrap gap-1 items-center my-2">
            <li
              v-for="tag in postMetadata.tags"
              :key="tag"
            >
              <BadgeElement class="badge-sm badge-soft shadow-lg">
                {{ tag }}
              </BadgeElement>
            </li>
          </ul>
        </div>

        <div
          v-if="postRelatedSeries.length > 1 && postMetadata.serie"
          :class="[
            'card',
            'card-body',
            'shadow-lg',
            'transition-all',
            'join',
            'join-vertical gap-0',
          ]"
        >
          <div class="flex flex-col py-5 px-4 bg-base-100/30 join-item gap-2">
            <a
              :href="seriesUrl"
              class="text-sm font-semibold tracking-wide uppercase flex items-center gap-2 link link-hover hover:text-accent"
            >
              <Icon
                icon="hugeicons:book-open-02"
                class="inline-block text-xl"
              />
              {{ postMetadata.serie }}
            </a>

            <p class="text-sm font-light">
              Este post faz parte de uma série de posts chamada <strong>{{ postMetadata.serie }}</strong>. Aqui está a lista de todos os posts da série:
            </p>
          </div>

          <div
            v-for="post in postRelatedSeries"
            :key="post.path"
            :class="[
              'join-item',
              'collapse',
              'collapse-plus',
              'bg-base-100/50',
            ]"
          >
            <input
              type="radio"
              name="my-accordion-3"
            >
            <div class="collapse-title font-semibold text-pretty">
              {{ post.title }}
            </div>
            <div class="collapse-content font-light">
              <p class="mb-4 ms-2">
                {{ post.excerpt }}
              </p>

              <div class="flex justify-start">
                <a
                  :href="`/blog/${post.path}`"
                  class="btn btn-xs btn-ghost gap-2 group"
                >
                  Ler mais
                  <Icon
                    icon="hugeicons:arrow-right-01"
                    class="transition-transform group-hover:translate-x-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Transition>

    <!-- eslint-disable-next-line vue/no-v-html -->
    <article
      id="article-body"
      :class="[
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
      ]"
      v-html="sanitizedHtmlPostContent"
    />
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