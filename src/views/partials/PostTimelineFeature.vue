<script setup lang="ts">
import PostSingleFeature from '@/components/PostSingleFeature.vue';
import { Icon } from '@iconify/vue';

defineProps<{
	posts: any[];
	showLabels: boolean
}>()
</script>

<template>
	<ul class="timeline timeline-vertical timeline-snap-icon timeline-compact">
      <li v-if="showLabels">
        <h2 class="timeline-start badge badge-soft mb-1 font-light badge-xl flex flex-row gap-2 items-center justify-start -translate-x-4">
          <Icon icon="hugeicons:stop" class="size-5" />
          Início da linha do tempo
        </h2>
      </li>

      <li v-for="post in posts" :key="post.path" class="">
        <hr />
        <PostSingleFeature :post="post" />
        <hr class="bg-neutral-300 rounded-full" />
      </li>

      <li v-if="showLabels">
        <div class="timeline-start badge badge-soft my-2 font-light badge-xl flex flex-row gap-2 items-center justify-start -translate-x-4">
          <Icon icon="hugeicons:stop" class="size-5" />
          Sem mais artigos por enquanto
        </div>
      </li>
    </ul>
</template>
