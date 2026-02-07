<script setup>
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue'
import MyProfile from './partials/ProfileCardFeature.vue';
import RecentPostsFeature from './partials/RecentPostsFeature.vue';
import RecomendationsFeature from './partials/RecomendationsFeature.vue';
</script>

<template>
  <div :class="[
    'flex',
    'flex-col',
    'md:grid',
    'md:grid-cols-11',
    'md:grid-rows-auto',
    'md:justify-start',
    'gap-5',
    'px-4',
    'pt-16',
    'space-y-5',
    'z-10',
  ]">
    <!-- Profile -->
    <MyProfile :class="[
      'md:row-start-1',
      'md:row-end-1',
      'md:col-start-1',
      'md:col-end-12',
    ]" />

    <!-- Recomendations -->
    <RecomendationsFeature :class="[
      'md:col-start-1',
      'md:col-span-5',
      'md:row-start-2',
      'md:h-fit'
    ]" />

    <!-- Content -->
    <RecentPostsFeature :class="[
      'md:col-start-6',
      'md:col-span-6',
      'md:row-start-2',
      'md:h-fit'
    ]" />
  </div>

  <BubblesAnimation></BubblesAnimation>
</template>
