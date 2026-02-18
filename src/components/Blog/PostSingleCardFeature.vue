<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Post } from '@/interfaces'

interface Props {
  post: Post;
  tag: string;
  compactMode?: boolean;
}

withDefaults(defineProps<Props>(), {
  compactMode: false,
});


const getPostDay = (date: string) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  day: 'numeric',
})

const getPostMonth = (date: string) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  month: 'long'
})

const getPostYear = (date: string) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  year: 'numeric'
})

</script>

<template>
  <!-- Line row -->
  <a
    :href="post.path"
    :class="[
      'flex',
      'flex-col',
      'gap-3',
      'group/post-single',
      'transition-all duration-500 ease-out',
      'md:flex-row',
      'md:gap-4',
      'md:justify-center',
      'md:rounded-xl',
      'bg-base-200/80',
      'backdrop-blur-2xl',
      'border',
      'border-white/10',
      'shadow-xl',
      'hover:shadow-primary/30',
      'hover:border-primary/40',
      'hover:bg-primary/10',
      'text-base-content',
      'lg:gap-6',
      'overflow-hidden',
      'transform will-change-transform',

    ]"
  >
    <!-- Metadata square -->
    <div
      :class="[
        'flex flex-row',
        'backdrop-blur-md',
        'justify-start',
        'p-4',
        'md:w-1/6',
        'md:flex-col',
        'md:justify-center',
        'md:items-center',
        'md:gap-1',
        'transition-all ease-in-out',
        'duration-500',
        'group-hover/post-single:opacity-100',
        'group-hover/post-single:bg-primary/80',
        'group-hover/post-single:text-primary-content',
      ]"
    >

      <div
        :class="[
          'flex flex-row',
          'gap-2',
          'md:gap-1',
          'items-center',
        ]"
      >
        <Icon
          icon="hugeicons:calendar-02"
          :class="[
            'size-5 opacity-70',
            'transform transition duration-700 delay-500 ease',
            'md:group-hover/post-single:scale-200',
            'md:group-hover/post-single:-rotate-12',
            'md:group-hover/post-single:-translate-x-full',
            'md:group-hover/post-single:opacity-0',
            'md:group-hover/post-single:delay-0',
            'md:group-hover/post-single:duration-500',
          ]"
        />

        <span
          :class="[
            'text-lg',
            'md:text-xl',
            'font-semibold',
            'md:font-light',
            'leading-none',
            'transform transition duration-700 ease-out',
            'md:group-hover/post-single:-translate-x-2/3',
            'md:group-hover/post-single:scale-120',
          ]"
        >
          {{ getPostDay(post.published_at) }}
        </span>
      </div>

      <div class="flex flex-col text-start md:text-center">
        <span class="text-xs font-light">{{ getPostMonth(post.published_at) }}</span>
        <span class="text-xs font-light">{{ getPostYear(post.published_at) }}</span>
      </div>
    </div>

    <div
      :class="[
        'md:w-5/6',
        'flex',
        'flex-col',
        'py-2',
        'px-4',
        'md:py-3',
        'md:my-3',
        'lg:self-center',
        'gap-2',
        compactMode && 'self-center',
        !compactMode && 'self-start',
      ]"
    >
      <small
        v-if="post.serie && !compactMode"
        class="text-xs font-bold tracking-widest uppercase text-primary/70 group-hover/post-single:text-primary transition-colors duration-500"
      >{{ post.serie }}</small>

      <component
        :is="tag"
        :class="[
          compactMode ? 'text-lg' : 'text-xl',
          'font-bold leading-tight my-0 transition-colors duration-500 group-hover/post-single:text-primary'
        ]"
      >
        {{ post.title }}
      </component>
      <p 
        v-if="!compactMode"
        class="text-sm leading-relaxed opacity-80 group-hover/post-single:opacity-100 transition-opacity duration-500 line-clamp-2"
      >
        {{ post.excerpt }}
      </p>
    </div>

  </a>
</template>