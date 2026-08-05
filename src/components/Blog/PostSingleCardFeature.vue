<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { IPost } from '@/interfaces'
import GlassCard from '@/components/GlassCard.vue'
import { formatDate } from '@/utils/date'

interface Props {
  post: IPost;
  tag: string;
  compactMode?: boolean;
}

withDefaults(defineProps<Props>(), {
  compactMode: false,
});

</script>

<template>
<GlassCard
  tag="a"
  hoverable
  solid
  class="group flex flex-row items-start gap-4 md:gap-6"
  :href="post.path">

  <div v-if="!compactMode" class="hidden md:flex flex-col items-center gap-0 w-16 shrink-0 border-r border-base-300/60 pr-4">
    <span class="text-xs uppercase tracking-wide opacity-60">{{ formatDate(post.published_at, { month: 'short' }) }}</span>
    <span class="text-2xl font-semibold leading-none my-1">{{ formatDate(post.published_at, { day: 'numeric' }) }}</span>
    <span class="text-xs opacity-60">{{ formatDate(post.published_at, { year: 'numeric' }) }}</span>
  </div>

  <div class="flex flex-col gap-1 min-w-0">
    <div class="flex flex-row flex-wrap items-center gap-2 text-sm opacity-70 md:hidden">
      <Icon icon="hugeicons:calendar-04" />
      <span>{{ formatDate(post.published_at, { day: 'numeric', month: 'long', year: 'numeric' }) }}</span>
    </div>

    <span v-if="post.serie" class="text-xs font-bold uppercase tracking-tight opacity-80 leading-none">{{ post.serie }}</span>

    <component :is="tag" class="text-lg font-semibold leading-snug mb-0">{{ post.title }}</component>

    <small v-if="!compactMode" class="font-sans text-sm opacity-70 leading-relaxed line-clamp-2">{{ post.excerpt }}</small>
  </div>
</GlassCard>
</template>
