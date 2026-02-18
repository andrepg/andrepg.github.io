<script lang="ts" setup>
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';
import PostTimelineFeature from '@/components/Blog/PostTimelineFeature.vue';

import { Post, PostMarkdown } from '@/interfaces';
import { blogModules } from '@/utils/blog-reader';
import APP_CONFIG from '@config/app';
import { useHead } from '@unhead/vue';

const posts = Object.entries(blogModules)
  .map(([path, mod]) => {
    const match = /\/blog\/(\d+)\/(.+)\.md$/.exec(path);

    if (!match) return null;

    mod.attributes.path = path.replace('.md', '');

    return mod.attributes;
  })
  .filter(post => !!post)
  .filter(post => post?.published_at)
  .sort((a, b) =>
    new Date(b?.published_at || 0).getTime() -
    new Date(a?.published_at || 0).getTime()
  );

useHead({
  title: "Blog | André Paul Grandsire",  // TODO Change to the environment variable
  meta: [
    { name: 'description', content: 'Blog pessoal de André Paul Grandsire' },
    { property: 'og:type', content: 'website' },
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
  <SectionWithHeader>
    <h1 class="text-2xl font-semibold leading-tight">
      Todos as minhas publicações
    </h1>

    <small
      class="opacity-70 font-normal font-md w-full leading-tight flex-1"
    >
      Aqui eu escrevo meus devaneios, registro minhas aventuras de trabalho e compartilho
      experiências da profissão.
    </small>
  </SectionWithHeader>

  <div class="max-w-5xl mx-auto md:px-5">
    <PostTimelineFeature :posts="posts" :is-loading="false" />
  </div>
</template>
