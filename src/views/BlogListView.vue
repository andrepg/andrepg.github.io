<script lang="ts" setup>
import BlogPageLayout from '@/components/Layout/BlogPageLayout.vue';


import PostTimelineFeature from '@/components/Blog/PostTimelineFeature.vue';



import { blogModules } from '@/utils/blog-reader';
import APP_CONFIG from '@config/app';
import { useHead } from '@unhead/vue';
import SectionWithHeader from '@/components/Layout/SectionWithHeader.vue';

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
      <SectionWithHeader>
        <h1 class="text-2xl font-semibold leading-tight">
          Todas as minhas publicações
        </h1>

        <small
          class="opacity-70 font-normal font-md w-full leading-tight flex-1"
        >
          Aqui eu escrevo meus devaneios, registro minhas aventuras de trabalho e compartilho
          experiências da profissão.
        </small>
      </SectionWithHeader>
    </template>

    <div class="max-w-5xl mx-auto md:px-5">
      <PostTimelineFeature :posts="posts" :is-loading="false" compact-mode />
    </div>
  </BlogPageLayout>
</template>



