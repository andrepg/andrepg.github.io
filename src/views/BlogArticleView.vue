<script setup lang="ts">
import "@/assets/blog.css";

import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { transformContent } from '@/utils/transformers'
import Prism from 'prismjs'
import { blogModules, getHeadTags, getPostsBySerie } from "@/utils/blog-reader";
import BadgeElement from "@/components/BadgeElement.vue";
import { Icon } from "@iconify/vue";
import { slugify } from "@/utils/slugify";
import SectionWithHeader from "@/components/Layout/SectionWithHeader.vue";
import APP_CONFIG from "@config/app";

const route = useRoute()

/**
 * Resolve post metadata and content
 */
const post = blogModules[`/blog/${route.params.year}/${route.params.article}.md`] ?? null

const metadata = post.attributes;

const sanitizedContent = transformContent(post.html);

const canonicalUrl = `${APP_CONFIG.BASE_URL}${route.path}`

const postsRelatedBySeries = getPostsBySerie(metadata.serie, canonicalUrl);

/**
 * Head tags — executa durante SSG
 */
useHead(getHeadTags(metadata, canonicalUrl))

/**
 * Highlight code blocks
 */
onMounted(() => Prism.highlightAll())
</script>

<template>
  <div
    :class="[
    'flex',
    'flex-col',
    'w-full',
    'gap-10',
    'px-5',
    'lg:px-10',
    'max-w-9/12',
    'mx-auto',
    'not-2xl:max-w-11/12'
  ]"
  >
    <SectionWithHeader 
      :class="[
      'glass',
      'bg-accent',
      'text-accent-content',
      'shadow-lg',
      'rounded-b-xl',
    ]">
      <div class="breadcrumbs text-sm">
        <ul>
          <li><a href="/blog">Blog</a></li>
          <li v-if="metadata.category">
            <a :href="`/blog/category/${slugify(metadata.category)}`">{{ metadata.category }}</a>
          </li>
        </ul>
      </div>

      <h1 class="leading-tight">{{ metadata.title }}</h1>
      <p class="text-base leading-tight">{{ metadata.excerpt }}</p>

      <ul class="join join-horizontal flex-wrap gap-2 items-center my-2">
        <li v-for="tag in metadata.tags" :key="tag">
          <BadgeElement class="shadow-lg badge-soft">
            {{ tag }}
          </BadgeElement>
        </li>
      </ul>
    </SectionWithHeader>

    <article id="article-body" v-html="sanitizedContent"></article>

    <hr class="border-base-300">

    <ul
      v-if="metadata.serie"
      class="menu menu-vertical w-full bg-base-300 rounded-lg shadow-xl backdrop-blur-lg">
      <li class="menu-title flex items-center gap-2 text-lg">
        <Icon icon="hugeicons:book-open-02" class="size-7 inline-block" />
        <span>Este post faz parte de uma série. Veja os outros artigos:</span>
      </li>
      <li
        v-for="postFromSerie in postsRelatedBySeries"
        :key="postFromSerie.path"
        class="p-0 hover:text-primary"
      >
        <a
          :href="postFromSerie.path"
          class=""
        >
          {{ postFromSerie.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
