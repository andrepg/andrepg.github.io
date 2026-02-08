<script setup>
import { nextTick, onBeforeMount, onMounted, ref, watch } from 'vue';
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

  nextTick(() => setTimeout(() => Prism.highlightAll(), 750))
})
</script>

<style scoped src="@/assets/blog.css" />

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
        'bg-primary/50',
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
      </section>
    </Transition>

    <article key="article" id="article-body" :class="[
      'text-base',
      'line-numbers',
      'break-all!',
      'opacity-0',
      'transition-all',
      'ease-in',
      !displayPost && 'opacity-0 delay-0 duration-200',
      displayPost && 'opacity-100 delay-1000 duration-1000',
    ]" v-html="postContent.html"></article>
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