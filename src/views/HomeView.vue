<script setup>
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue'
import MyProfile from './partials/ProfileCardFeature.vue';
import RecentPostsFeature from './partials/RecentPostsFeature.vue';
import RecomendationsFeature from './partials/RecomendationsFeature.vue';
</script>

<template>
  <div class="px-4 pt-16 space-y-5 z-10">
    <!-- Profile -->
    <MyProfile />

    <!-- Recomendations -->
    <RecomendationsFeature  />
    <!-- Content -->
    <RecentPostsFeature />
  </div>

  <BubblesAnimation></BubblesAnimation>
</template>
