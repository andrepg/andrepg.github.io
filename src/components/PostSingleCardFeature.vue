<script setup>
import CalendarIcon from '@/assets/CalendarIcon.vue'
import { Icon } from '@iconify/vue'

defineProps({
  post: {
    required: true,
    type: {
      path: String,
      title: String,
      excerpt: String,
      published_at: String,
      category: String,
      tags: Array,
    }
  }
})

const getBlogUrl = (path) => '/blog/'.concat(path)

const getPostDay = (date) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  day: 'numeric',
})

const getPostMonth = (date) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  month: 'long'
})

const getPostYear = (date) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  year: 'numeric'
})

</script>

<template>
  <!-- Line row -->
  <a :href="getBlogUrl(post.path)" :class="[
    'flex',
    'flex-col',
    'gap-3',
    'group/post-single',
    'transition-all duration-0 ease',
    'md:flex-row',
    'md:gap-4',
    'md:justify-center',
    'md:rounded-lg',
    'md:shadow-lg',
    'md:bg-primary/5',
    'md:hover:text-primary',
    'lg:gap-6',
  ]">
    <!-- Metadata square -->
    <div :class="[
      'flex flex-row',
      'opacity-50',
      'alert alert-soft',
      'justify-start',
      'md:w-1/6',
      'md:flex-col',
      'md:justify-center',
      'md:items-center',
      'md:gap-1',
      'transition-all ease',
      'delay-0 duration-500',
      'group-hover/post-single:opacity-100',
      'group-hover/post-single:alert-info',
    ]">
      <div :class="[
        'flex flex-row',
        'gap-2',
        'md:gap-1',
        'items-center',
      ]">
        <Icon icon='hugeicons:calendar-02' :class="[
          'size-5 opacity-70',
          'transform transition duration-700 delay-500 ease',
          'md:group-hover/post-single:scale-200',
          'md:group-hover/post-single:-rotate-12',
          'md:group-hover/post-single:-translate-x-full',
          // 'md:group-hover/post-single:translate-y-full',
          'md:group-hover/post-single:opacity-0',
          'md:group-hover/post-single:delay-0',
          'md:group-hover/post-single:duration-500',
        ]" />

        <span :class="[
          'text-lg',
          'md:text-xl',
          'font-semibold',
          'md:font-light',
          'leading-none',
          'text-base-content',
          'transform transition duration-700 delay-0 ease-out',
          'md:group-hover/post-single:-translate-x-2/3',
          'md:group-hover/post-single:scale-120',
          'md:group-hover/post-single:delay-300'
        ]">
          {{ getPostDay(post.published_at) }}
        </span>
      </div>

      <div class="flex flex-col text-start md:text-center">
        <span class="text-xs font-light">{{ getPostMonth(post.published_at) }}</span>
        <span class="text-xs font-light">{{ getPostYear(post.published_at) }}</span>
      </div>
    </div>

    <div :class="[
      'md:w-5/6',
      'self-start',
      'flex',
      'flex-col',
      'gap-2',
      'py-2',
      'md:py-3',
      'md:my-3',
      'lg:self-center',
    ]">
      <small v-if="post.serie" class="text-xs font-semibold tracking-wide uppercase">{{ post.serie }}</small>

      <h3 class="leading-none my-0">{{ post.title }}</h3>
      <p class="leading-tight">{{ post.excerpt }}</p>
    </div>
  </a>
</template>