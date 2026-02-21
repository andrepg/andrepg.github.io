<script lang="ts" setup>
import BlogPageLayout from '@/components/Layout/BlogPageLayout.vue';


import PostTimelineFeature from '@/components/Blog/PostTimelineFeature.vue';

import APP_CONFIG from '@config/app';
import { getPublished } from '@/utils/blog-reader';
import { useHead } from '@unhead/vue';
import CardHeaderFeature from '@/components/CardHeaderFeature.vue';
import GlassCard from '@/components/GlassCard.vue';
import { Icon } from '@iconify/vue';
import { computed, ref } from 'vue';
import SearchBlogFeature from '@/components/Features/SearchBlogFeature.vue';

const posts = getPublished().sort(
  (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
);

const displayMode = ref<'grid' | 'list'>('list');

const toggleDisplayMode = () => {
  displayMode.value = displayMode.value === 'grid' ? 'list' : 'grid';
};

const isCompactMode = computed(() => displayMode.value === 'list');

useHead({
  title: "Blog | André Paul Grandsire",
  meta: [
    { name: 'description', content: 'Blog pessoal de André Paul Grandsire' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: "Blog | André Paul Grandsire" },
    { property: 'og:description', content: 'Blog pessoal de André Paul Grandsire' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: "Blog | André Paul Grandsire" },
    { name: 'twitter:description', content: 'Blog pessoal de André Paul Grandsire' },
  ],

  link: [
    { rel: 'canonical', href: `${APP_CONFIG.BASE_URL}/blog` }
  ],
  script: [
    {
      type: 'application/ld+json',
      textContent: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "Blog | André Paul Grandsire",
        "description": "Blog pessoal de André Paul Grandsire",
        "url": `${APP_CONFIG.BASE_URL}/blog`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": `${APP_CONFIG.BASE_URL}/blog`
        },
        "blogPost": posts.map((post) => ({
          "@type": "Blog",
          "headline": post.title,
          "datePublished": post.published_at,
          "author": {
            "@type": "Person",
            "name": "André Paul Grandsire"
          },
          "publisher": {
            "@type": "Organization",
            "name": "André Paul Grandsire",
            "logo": {
              "@type": "ImageObject",
              "url": `${APP_CONFIG.BASE_URL}/favicon-512x512.png`
            }
          },
          "url": `${APP_CONFIG.BASE_URL}/${post.path}`,
          "description": post.excerpt
        }))
      })
    }
  ]
});
</script>

<template>
  <BlogPageLayout>
    <template #header>
      <CardHeaderFeature tag="h1">
        <template #default>
          Todas as minhas publicações
        </template>
        <template #subtitle>
          Os registros do meu trabalho, notas relevantes e devaneios sobre a tecnologia.
        </template>
      </CardHeaderFeature>
    </template>

    <GlassCard class="flex flex-col px-5">
      <div class="flex flex-row flex-wrap justify-between items-center">
        <SearchBlogFeature />
  
        <button
          class="btn btn-soft btn-primary transition-all duration-300 min-w-40"
          @click="toggleDisplayMode"
        >
          <Transition name="fade" mode="out-in">
            <div :key="displayMode" class="flex items-center justify-center gap-2 whitespace-nowrap w-full">
              <Icon
                :icon="isCompactMode ? 'hugeicons:grid-view' : 'hugeicons:list-view'"
                class="text-lg"
              />
              <span>
                {{ isCompactMode ? 'Ver completo' : 'Ver simplificado' }}
              </span>
            </div>
          </Transition>
        </button>
      </div>

      <PostTimelineFeature
        :posts="posts"
        :is-loading="false"
        :compact-mode="displayMode === 'list'" />
    </GlassCard>
  </BlogPageLayout>
</template>



