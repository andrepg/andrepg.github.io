<script setup lang="ts">
import type { IPost } from '@/interfaces'
import { formatDate } from '@/utils/date'
import { useLocaleRouting } from '@/composables/useLocaleRouting'
import { CONTENT_LOCALE, localizePath } from '@config/locales'

defineProps<{
  post: IPost
}>()

const { locale } = useLocaleRouting()

/**
 * Where the post lives, which is not necessarily where the page listing it is.
 *
 * A post is written in one language and served from one URL, so a card on the
 * English home links to the Portuguese article instead of to an English article
 * that was never written.
 */
const postUrl = (path: string): string => localizePath(path, CONTENT_LOCALE)
</script>

<template>
  <a
    rel="noopener noreferrer"
    :href="postUrl(post.path)"
    :class="['group/project-item', 'items-start']"
  >
    <div class="my-auto text-lg flex flex-col leading-none">
      <span>{{ formatDate(post.published_at, { day: '2-digit' }, locale) }}</span>
      <span>{{ formatDate(post.published_at, { month: 'short' }, locale) }}</span>
    </div>

    <h3 class="flex flex-col m-0">
      {{ post.title }}

      <small class="font-light text-sm font-sans">
        {{ post.excerpt }}
      </small>
    </h3>
  </a>
</template>
