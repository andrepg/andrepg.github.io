<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { IPost } from '@/interfaces'
import GlassCard from '@/components/GlassCard.vue'

interface Props {
  post: IPost;
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

const getFullDate = (date: string) => new Date(Date.parse(date)).toLocaleDateString('pt-BR', {
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

</script>

<template>
<GlassCard
  tag="a"
  hoverable
  solid
  :class="[
    'list-row group',
    'flex flex-row gap-6',
    'ease-[cubic-bezier(0.34,1.56,0.64,1)]',
    compactMode ? 'py-0! px-4!' : 'py-2! px-6!',
    compactMode ? 'rounded-sm' : 'rounded-xl',
  ]"
  :href="post.path">
  <Transition
    tag="div"
    class="stat not-md:hidden w-fit gap-0"
    :appear="!compactMode"
    name="fade"
    :duration="{ enter: 500, leave: 200 }">
    <div v-if="!compactMode" class="stat not-md:hidden w-fit gap-0 leading-tight">
      <Icon
        icon="mdi:calendar-blank-outline"
        :class="[
          'z-0 absolute left-0 top-2',
          'h-10/12 w-auto',
          'transition-all',
          'duration-500',
          '',
          'translate-x-full group-hover:translate-x-0',
          'opacity-0 group-hover:opacity-5',
        ]" />

      <span class="z-10 stat-title">{{ getPostMonth(post.published_at) }} </span>
      <span class="z-10 stat-value">{{ getPostDay(post.published_at) }}</span>
      <span class="z-10 stat-desc">{{ getPostYear(post.published_at) }}</span>
    </div>
  </Transition>

  <component
    :is="tag"
    :class="[
      'flex',
      'flex-col',
      'text-lg',
      'font-light',
      'transition-all',
      'duration-1000',
      'gap-0',
      'leading-tight',
    ]">
    <div class="flex flex-row gap-2 text-sm font-light md:hidden">
      <Icon icon="hugeicons:calendar-04" class="" />

      <span>{{ getFullDate(post.published_at) }}</span>
    </div>

    <span v-if="post.serie" class="text-xs opacity-80 font-bold uppercase tracking-tight leading-none">{{ post.serie }}</span>

    <span class="font-normal mt-1 mb-2">{{  post.title }}</span>

    <Transition
      name="fade"
      :duration="{ enter: 700, leave: 200 }"
    >
      <small v-if="!compactMode" class="opacity-70">{{ post.excerpt }}</small>
    </Transition>
  </component>
</GlassCard>
</template>