<script lang="ts" setup>
import ContentLayout from '@/layouts/ContentLayout.vue'

import PostTimelineFeature from '@/components/Blog/PostTimelineFeature.vue'

import { getPublished } from '@/utils/blog-reader'
import CardHeaderFeature from '@/components/Features/CardHeaderFeature.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { slugify } from '@/utils/slugify'
import { RoutePath } from '@config/routes'
import { usePageHead } from '@/composables/usePageHead'
import { blogLd } from '@/utils/structured-data'

const route = useRoute()

const posts = getPublished()

const filteredPosts = computed(() => {
  const { series, category, tag } = route.query

  if (!series && !category && !tag) {
    return posts
  }

  return posts.filter((post) => {
    const matchesSeries = !series || slugify(post.serie || '') === series
    const matchesCategory = !category || slugify(post.category || '') === category
    const matchesTag = !tag || (post.tags && post.tags.some((t) => slugify(t) === tag))

    return matchesSeries && matchesCategory && matchesTag
  })
})

usePageHead(RoutePath.BLOG, { jsonLd: blogLd(posts) })
</script>

<template>
  <ContentLayout>
    <template #header>
      <CardHeaderFeature tag="h1">
        <template #default> Todas as minhas publicações </template>
        <template #subtitle>
          Os registros do meu trabalho, notas relevantes e devaneios sobre a tecnologia.
        </template>
      </CardHeaderFeature>
    </template>

    <div class="flex flex-col gap-4">
      <PostTimelineFeature :posts="filteredPosts" />
    </div>
  </ContentLayout>
</template>
