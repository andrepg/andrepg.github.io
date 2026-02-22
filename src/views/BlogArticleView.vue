<script setup lang="ts">
import "@/assets/blog.css";

import { onMounted } from 'vue'
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
import GlassCard from "@/components/GlassCard.vue";


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
useHead(getSinglePostTags(metadata, canonicalUrl))

/**
 * Highlight code blocks
 */
onMounted(() => Prism.highlightAll())
</script>

<template>
  <PageLayout :type="PageLayoutType.BLOG">
    <template #header>
      <CardHeaderFeature tag="div">
        <div class="breadcrumbs text-sm font-normal">
          <ul>
            <li><a href="/blog">Blog</a></li>
            <li v-if="metadata.category">
              <a :href="`/blog?category=${slugify(metadata.category)}`">{{ metadata.category }}</a>
            </li>
          </ul>
        </div>

        <h1 class="leading-tight">{{ metadata.title }}</h1>
        <p class=" leading-tight font-normal">{{ metadata.excerpt }}</p>

        <ul class="join join-horizontal flex-wrap gap-2 items-center my-2">
          <li v-for="tag in metadata.tags" :key="tag">
            <span class="badge shadow-lg font-bold badge-primary">
              {{ tag }}
            </span>
          </li>
        </ul>
      </CardHeaderFeature>
    </template>

    <article id="article-body" v-html="sanitizedContent"></article>

    <template v-if="metadata.serie" #footer>
      <GlassCard>
        <p class="py-3 flex items-center gap-2 text-lg">
          <Icon icon="hugeicons:book-open-02" class="size-7 inline-block" />
          <span>Este post faz parte da serie 
            <a 
            :href="`/blog?series=${slugify(metadata.serie)}`" 
            class="link link-primary uppercase font-bold text-sm">{{ metadata.serie }}</a>.
            Veja os outros artigos:</span>
        </p>

        <ul
          :class="[
            'list',
            'list-vertical',
            'p-3',
            'shadow-lg',
            'w-full',
            'rounded-lg',
            'backdrop-blur-lg'
          ]"
        >
          <li
            v-for="(postFromSerie, index) in postsRelatedBySeries"
            :key="postFromSerie.path"
            data-tip="Este post"
            :class="[
              'p-2',
              'transition-all',
              'duration-500',
              'backdrop-blur-lg',
              'rounded-lg',
              'list-item',
              postFromSerie.path === route.path && 'tooltip',
              postFromSerie.path === route.path && 'bg-primary/20 disabled opacity-70',
              postFromSerie.path !== route.path && 'hover:indent-2 hover:text-primary',
            ]"
          >
            <span class="w-fit me-2 font-extralight ">{{ index+1 }}</span>
            <a
              :href="postFromSerie.path === route.path ? undefined : postFromSerie.path"
            >
              {{ postFromSerie.title }}
            </a>
          </li>
        </ul>
      </GlassCard>
    </template>
  </PageLayout>
</template>

