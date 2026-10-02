<script setup lang="ts">
import { IPost } from '@/interfaces'
import { formatDate } from '@/utils/date'

defineProps<{
  post: IPost
}>()
</script>

<template>
  <a
    rel="noopener noreferrer"
    :href="post.path"
    :class="['group/project-item', 'items-start']"
  >
    <div class="my-auto text-lg flex flex-col leading-none">
      <span>{{ formatDate(post.published_at, { day: '2-digit' }) }}</span>
      <span>{{ formatDate(post.published_at, { month: 'short' }) }}</span>
    </div>

    <h3 class="flex flex-col m-0">
      {{ post.title }}

      <small class="font-light text-sm font-sans">
        {{ post.excerpt }}
      </small>
    </h3>
  </a>
</template>
