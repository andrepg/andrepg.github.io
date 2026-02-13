<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { BASE_URL } from '@/main'

const route = useRoute()

/**
 * Carrega TODOS os markdowns no build
 */
const modules = import.meta.glob('/blog/**/*.md', { eager: true }) as Record<
  string,
  {
    attributes: any
    html: string
  }
>

/**
 * Resolve o path real do markdown baseado na rota
 */
const postPath = computed(() => {
  return `/blog/${route.params.year}/${route.params.article}.md`
})

const post = computed(() => {
  return modules[postPath.value] ?? null
})

if (!post.value) {
  throw new Error(`Post not found: ${postPath.value}`)
}

const metadata = post.value.attributes
const content = post.value.html

const canonicalUrl = computed(() => {
  return `${BASE_URL}${route.path}`
})

/**
 * Head tags — executa durante SSG
 */
useHead({
  title: metadata.title,
  meta: [
    { name: 'description', content: metadata.excerpt },

    // Open Graph
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: metadata.title },
    { property: 'og:description', content: metadata.excerpt },
    { property: 'og:url', content: canonicalUrl.value },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: metadata.title },
    { name: 'twitter:description', content: metadata.excerpt },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl.value }
  ]
})
</script>

<template>
  <article>
    <h1>{{ metadata.title }}</h1>
    <p><small>{{ metadata.published_at }}</small></p>

    <div v-html="content"></div>
  </article>
</template>
