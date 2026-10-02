<script setup lang="ts">
import '@/assets/blog.css'

import { onMounted, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { transformContent } from '@plugins/transformers'
import Prism from 'prismjs'
import { blogModules, getPostsBySerie } from '@/utils/blog-reader'
import { Icon } from '@iconify/vue'
import { slugify } from '@/utils/slugify'
import CardHeaderFeature from '@/components/Features/CardHeaderFeature.vue'
import ContentLayout from '@/layouts/ContentLayout.vue'
import { RoutePath } from '@config/routes'
import { usePageHead } from '@/composables/usePageHead'
import { canonicalUrl } from '@/utils/site-metadata'
import { blogPostingLd } from '@/utils/structured-data'
import SectionHeader from '@/components/SectionHeader.vue'
import GlassCard from '@/components/GlassCard.vue'

const route = useRoute()

/**
 * Resolve post metadata and content
 */
const post = blogModules[`/blog/${route.params.year}/${route.params.article}.md`]

if (!post) {
  throw new Error(`Blog post not found: /blog/${route.params.year}/${route.params.article}`)
}

const metadata = post.attributes

const sanitizedContent = transformContent(post.html)

const articleUrl = canonicalUrl(route.path)

const postsRelatedBySeries = getPostsBySerie(metadata.serie, articleUrl)

/**
 * Head tags — executa durante SSG
 */
usePageHead(RoutePath.BLOG_ARTICLE, () => ({
  title: metadata.title,
  description: metadata.excerpt,
  type: 'article',
  canonicalUrl: articleUrl,
  publishedTime: metadata.published_at,
  keywords: [metadata.category, ...metadata.tags].filter(Boolean),
  jsonLd: blogPostingLd(metadata, articleUrl)
}))

/**
 * Highlight code blocks after the article renders.
 * Scoped to the article to avoid touching the rest of the page,
 * and guarded against double-highlighting when the auto-init already ran.
 */
const articleRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()

  const article = articleRef.value
  if (!article) return

  if (article.querySelector('code .token')) return

  Prism.highlightAllUnder(article)
})
</script>

<template>
  <ContentLayout>
    <template #header>
      <CardHeaderFeature tag="div">
        <template #default>
          <div class="breadcrumbs text-sm font-normal">
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li v-if="metadata.category">
                <a :href="`/blog?category=${slugify(metadata.category)}`">{{
                  metadata.category
                }}</a>
              </li>
            </ul>
          </div>
          <h1 class="leading-tight mb-1">{{ metadata.title }}</h1>
        </template>

        <template v-if="metadata.excerpt" #subtitle>
          <p class="leading-tight font-normal">{{ metadata.excerpt }}</p>
        </template>

        <template v-if="metadata.tags" #actions>
          <ul class="join join-horizontal flex-wrap gap-2 items-center my-2">
            <li v-for="tag in metadata.tags" :key="tag">
              <span class="badge shadow-lg badge-sm font-bold badge-primary">
                {{ tag }}
              </span>
            </li>
          </ul>
        </template>
      </CardHeaderFeature>
    </template>

    <article id="article-body" ref="articleRef" v-html="sanitizedContent"></article>

    <template v-if="metadata.serie" #footer>
      <GlassCard class="flex flex-col gap-3 reading-column">
        <SectionHeader>
          <template #title>
            <Icon icon="hugeicons:book-open-02" class="size-7 inline-block" />
            Mais postagens desta série
          </template>

          <template #subtitle>
            Esta postagem faz parte da série <a class="link">{{ metadata.serie }}</a
            >. Veja a série completa abaixo
          </template>
        </SectionHeader>

        <ul class="list bg-base-100 rounded-md overflow-clip">
          <li
            v-for="(postFromSerie, index) in postsRelatedBySeries"
            :key="postFromSerie.path"
            data-tip="Este post"
            :class="[
              'transition-all duration-500',
              'list-row rounded-none',
              postFromSerie.path !== route.path && 'hover:indent-2 hover:bg-base-200/50',
              postFromSerie.path === route.path && 'bg-accent text-accent-content opacity-80'
            ]"
          >
            <a
              class="list-col-grow"
              :href="(postFromSerie.path !== route.path && postFromSerie.path) || undefined"
            >
              <span class="text-2xl font-thin opacity-30 tabular-nums me-3">{{ index + 1 }}</span>
              {{ postFromSerie.title }}
            </a>

            <span
              v-if="postFromSerie.path === route.path"
              class="badge badge-soft badge-sm self-center badge-neutral"
              >Este post</span
            >
          </li>
        </ul>
      </GlassCard>
    </template>
  </ContentLayout>
</template>
