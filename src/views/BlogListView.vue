<script lang="ts" setup>
import BlogPageLayout from '@/components/Layout/BlogPageLayout.vue';


import PostTimelineFeature from '@/components/Blog/PostTimelineFeature.vue';

import APP_CONFIG from '@config/app';
import { getPublished } from '@/utils/blog-reader';
import { useHead } from '@unhead/vue';
import CardHeaderFeature from '@/components/CardHeaderFeature.vue';
import GlassCard from '@/components/GlassCard.vue';

const posts = getPublished().sort(
  (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
);

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

    <GlassCard class="px-5">
      <PostTimelineFeature :posts="posts" :is-loading="false" compact-mode />
    </GlassCard>
  </BlogPageLayout>
</template>



