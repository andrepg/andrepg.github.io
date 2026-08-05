<script setup lang="ts">
import "@/assets/blog.css";

import { onMounted, nextTick, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { transformContent } from '@plugins/transformers'
import Prism from 'prismjs'
import { blogModules, getPostsBySerie } from "@/utils/blog-reader";
import { getSinglePostTags } from "@/utils/blog-metadata";
import { Icon } from "@iconify/vue";
import { slugify } from "@/utils/slugify";
import CardHeaderFeature from "@/components/CardHeaderFeature.vue";
import PageLayout from "@/components/Layout/PageLayout.vue";
import { PageLayoutType } from "@/enumerators";
import APP_CONFIG from "@config/app";


const route = useRoute()

/**
 * Resolve post metadata and content
 */
const post = blogModules[`/blog/${route.params.year}/${route.params.article}.md`];

if (!post) {
  throw new Error(`Blog post not found: /blog/${route.params.year}/${route.params.article}`);
}

const metadata = post.attributes;

const sanitizedContent = transformContent(post.html);

const canonicalUrl = `${APP_CONFIG.BASE_URL}${route.path}`

const postsRelatedBySeries = getPostsBySerie(metadata.serie, canonicalUrl);

/**
 * Head tags — executa durante SSG
 */
useHead(getSinglePostTags(metadata, canonicalUrl))

/**
 * Highlight code blocks after the article renders.
 * Scoped to the article to avoid touching the rest of the page,
 * and guarded against double-highlighting when the auto-init already ran.
 */
const articleRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await nextTick();

  const article = articleRef.value;
  if (!article) return;

  if (article.querySelector('code .token')) return;

  Prism.highlightAllUnder(article);
});
</script>

<template>
  <PageLayout :type="PageLayoutType.BLOG">
    <template #header>
      <CardHeaderFeature tag="div">
        <template #default>
          <div class="breadcrumbs text-sm font-normal">
            <ul>
              <li><a href="/blog">Blog</a></li>
              <li v-if="metadata.category">
                <a :href="`/blog?category=${slugify(metadata.category)}`">{{ metadata.category }}</a>
              </li>
            </ul>
          </div>
          <h1 class="leading-tight mb-1">{{ metadata.title }}</h1>
        </template>

        <template
          v-if="metadata.excerpt" 
          #subtitle>
          <p class=" leading-tight font-normal">{{ metadata.excerpt }}</p>
        </template>

        <template 
          v-if="metadata.tags"
          #actions>
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
      <section class="flex flex-col gap-3 reading-column">
        <p class="flex items-center gap-2 text-lg">
          <Icon icon="hugeicons:book-open-02" class="size-7 inline-block" />
          <span>Este post faz parte da serie 
            <a 
            :href="`/blog?series=${slugify(metadata.serie)}`" 
            class="link link-primary uppercase font-bold text-sm">{{ metadata.serie }}</a>.
            Veja os outros artigos:</span>
        </p>

        <ul class="flex flex-col gap-2 list-none">
          <li
            v-for="(postFromSerie, index) in postsRelatedBySeries"
            :key="postFromSerie.path"
            data-tip="Este post"
            :class="[
              'flex items-baseline gap-3',
              'p-2 rounded-lg transition-all duration-500',
              postFromSerie.path === route.path && 'bg-primary/20 opacity-70',
              postFromSerie.path !== route.path && 'hover:bg-base-200/60 hover:text-primary',
            ]"
          >
            <span class="w-fit font-extralight">{{ index+1 }}</span>
            <a
              :href="postFromSerie.path === route.path ? undefined : postFromSerie.path"
            >
              {{ postFromSerie.title }}
            </a>
          </li>
        </ul>
      </section>
    </template>
  </PageLayout>
</template>

