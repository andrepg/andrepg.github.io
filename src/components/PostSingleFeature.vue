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
    <span class="badge badge-soft badge-sm">
      {{ formatDate(post.published_at) }}
    </span>
  </div>

  <div class="timeline-middle p-2 rounded-full bg-primary/20">
    <CalendarIcon class="size-5 text-primary" />
  </div>

  <div :class="[
    'timeline-end',
    'timeline-box',
    'card',
    'w-full',
    'bg-primary/5'
  ]">
    <a :href="getBlogUrl(post.path)" class="card-body group/post-single-feature relative overflow-clip">
      <NewspaperIcon :class="[
        'absolute',
        'top-0',
        'right-0',
        'transition',
        'duration-500',
        'size-24',
        'z-0',
        'opacity-0',
        'translate-x-full',
        'group-hover/post-single-feature:translate-x-0',
        'group-hover/post-single-feature:opacity-5',
      ]" />

      <div class="flex flex-col gap-1 relative z-10">
        <h3 :class="[
          'card-title',
          'flex',
          'flex-row',
          'gap-2',
          'items-center',
          'justify-start',
          'my-0',
          'leading-tight'
        ]">
          <span :class="[
            'group-hover/post-single-feature:text-primary',
            'transition-all',
            'duration-500',
          ]">
            {{ post.title }}
          </span>
        </h3>

        <p :class="[
          'text-sm',
          'opacity-70',
          'transition',
          'duration-500',
          'md:max-w-3xl'
        ]">{{ post.excerpt }}</p>
      </div>
    </a>
  </div>
</template>