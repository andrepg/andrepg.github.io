<script setup>
import { RouterView } from 'vue-router'
import FooterFeature from "@/components/Layout/FooterFeature.vue";
import Navbar from '@/components/Layout/NavbarFeature.vue';
import BubblesAnimation from '@/components/BubblesAnimation.vue';
import LoadingScreen from '@/components/LoadingScreen.vue';

const blobBaseClasses = [
  'fixed',
  'w-[70%]',
  'h-[70%]',
  'rounded-full',
  'blur-[120px]',
  'animate-pulse',
  'pointer-events-none',
  'mix-blend-multiply',
  'dark:mix-blend-soft-light',
  'transition-all',
  'duration-1000',
  'delay-1000',
];
</script>

<template>
  <div
    :class="[
      'relative',
      'min-h-screen',
      'overflow-x-hidden',
      'bg-linear-to-br',
      'from-primary/30',
      'via-primary/20',
      'to-secondary/30',
    ]"
  >
    <Navbar />

    <main class="flex flex-col w-full min-h-screen justify-start relative z-10">
        <RouterView v-slot="{ Component, route }">
          <transition name="page" mode="default">
            <div :key="route.path" class="grow pb-10 transition-all min-h-screen">
              <component :is="Component" />
            </div>
          </transition>
        </RouterView>

        <FooterFeature />
      </main>

    <!-- Global Liquid Animation -->
    <BubblesAnimation />

    <!-- Decorative Liquid Blobs -->
    <div class="fixed inset-0 bg-neutral/20 backdrop-blur-[120px] pointer-events-none z-0"></div>
    <div 
      :class="[
        ...blobBaseClasses,
        'top-[-20%]',
        'left-[-20%]',
        'bg-primary/40'
      ]"
    ></div>
    <div 
      :class="[
        ...blobBaseClasses,
        'bottom-[-20%]',
        'right-[-20%]',
        'bg-secondary/40'
      ]"
    ></div>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.25s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-from {
  transform: translateX(10px);
}

.page-leave-to {
  transform: translateX(-10px);
}
</style>
