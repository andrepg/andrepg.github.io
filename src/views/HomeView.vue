<script setup>
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue'
import MyProfile from '@/components/ProfileCardFeature.vue';
import RecentPostsFeature from '@/components/Blog/RecentPostsFeature.vue';
import RecomendationsFeature from '@/components/RecomendationsFeature.vue';
</script>

<template>
  <div
    :class="[
      'flex',
      'flex-col',
      'pt-16',
      'pb-0',
      'px-5',
      'gap-5',
      'z-10',
    ]"
  >
    <!-- Profile -->
    <MyProfile />

    <!-- Recomendations -->
    <RecomendationsFeature />
  </div>

  <BubblesAnimation />
</template>
