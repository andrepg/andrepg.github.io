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
import BlogPageLayout from "@/components/Layout/BlogPageLayout.vue";
import APP_CONFIG from "@config/app";
import GlassCard from "@/components/Layout/GlassCard.vue";


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
  <BlogPageLayout>
    <template #header>
      <SectionWithHeader>
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
    </template>

    <article id="article-body" v-html="sanitizedContent"></article>

    <template v-if="metadata.serie" #footer>
      <GlassCard>
        <ul
          :class="[
            'menu',
            'menu-vertical',
            'w-full',
            'rounded-lg',
            'shadow-xl',
            'backdrop-blur-lg'
          ]"
        >
          <li class="menu-title flex items-center gap-2 text-lg">
            <Icon icon="hugeicons:book-open-02" class="size-7 inline-block" />
            <span>Este post faz parte de uma série. Veja os outros artigos:</span>
          </li>
          <li
            v-for="postFromSerie in postsRelatedBySeries"
            :key="postFromSerie.path"
            :class="[
              'p-2',
              'transition-all',
              'duration-500',
              'backdrop-blur-lg',
              'rounded-lg',
              postFromSerie.path === route.path ? 'menu-active disabled' : '',
              postFromSerie.path !== route.path ? 'hover:indent-2 hover:text-primary' : '',
            ]"
          >
            <a 
              :href="postFromSerie.path === route.path ? undefined : postFromSerie.path"
            >
              {{ postFromSerie.title }}
            </a>
          </li>
        </ul>
      </GlassCard>
    </template>
  </BlogPageLayout>
</template>

