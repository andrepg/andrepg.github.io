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

const formatDate = (date) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'short',
  year: 'numeric'
})

</script>

<template>
  <div class="timeline-start">
    <span class="text-sm leading-none text-neutral-500">{{ formatDate(post.published_at) }}</span>
  </div>

  <div class="timeline-middle">
    <CalendarIcon class="h-5 w-5" />
  </div>

  <div class="timeline-end timeline-box w-full">
    <a :href="getBlogUrl(post.path)" class="group/post-single-feature">
      <div class="flex flex-col gap-0">
        <!-- mb-1 flex flex-row flex-wrap gap-2 leading-tight text-gray-700 dark:text-gray-400 mt-0
        items-center justify-start transition duration-500 -->
        <h3 class="
          flex flex-row gap-2 items-center justify-start my-0">
          <span class="
            group-hover/post-single-feature:text-primary
            transition-all duration-500">
            {{ post.title }}
          </span>

          <NewspaperIcon class="transition duration-500 size-5
          opacity-0 scale-0 -translate-x-10
          group-hover/post-single-feature:scale-100
          group-hover/post-single-feature:opacity-100
          group-hover/post-single-feature:translate-x-0" />
        </h3>

        <p class="text-sm text-gray-600 dark:text-gray-400 transition duration-500">{{ post.excerpt }}</p>
      </div>
    </a>
  </div>
</template>