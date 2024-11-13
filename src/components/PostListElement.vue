<script setup>
import CalendarIcon from '@/assets/CalendarIcon.vue'
import NewspaperIcon from '@/assets/NewspaperIcon.vue'

defineProps({
  post: {
    type: {
      path: String,
      title: String,
      excerpt: String,
      category: Array,
      tags: Array,
      published_at: String,
    }
  }
})

const getBlogUrl = (path) => '/blog/'.concat(path)

const formatDate = (date) => new Date(Date.parse(date)).toLocaleDateString()

</script>

<template>
  <a :href="getBlogUrl(post.path)" class="group">
    <div class="flex flex-col gap-0">
      <span class="text-sm text-gray-600 dark:text-gray-500">{{ formatDate(post.published_at) }}</span>

      <h2 class="flex flex-row flex-wrap gap-2 leading-tight text-gray-700 dark:text-gray-400 mt-0
        items-center justify-start transition duration-500">
        {{ post.title }}

        <NewspaperIcon class="transition duration-500 size-5
          opacity-0 scale-0 -translate-x-10
          group-hover:scale-100 group-hover:opacity-100 group-hover:translate-x-0" />
      </h2>

      <p class="text-sm text-gray-600 dark:text-gray-400 transition duration-500">{{ post.excerpt }}</p>
    </div>
  </a>
</template>