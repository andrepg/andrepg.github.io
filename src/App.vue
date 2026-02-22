<script setup>
import { RouterView } from 'vue-router'
import FooterFeature from "@/components/Layout/FooterFeature.vue";
import Navbar from '@/components/Layout/NavbarFeature.vue';
import BubblesAnimation from '@/components/BubblesAnimation.vue';
</script>

<template>
  <div
    :class="[
      'relative',
      'min-h-screen',
      'overflow-x-hidden',
      'bg-linear-to-br',
      'from-primary/20',
      'via-base-100',
      'to-secondary/20',
    ]"
  >
    <Navbar />

    <Suspense>
      <main class="flex flex-col w-full min-h-screen justify-start relative z-10">
        <RouterView v-slot="{ Component, route }">
          <transition name="page" mode="out-in">
            <div :key="route.path" class="grow pb-10 transition-all min-h-screen">
              <component :is="Component" />
            </div>
          </transition>
        </RouterView>

        <FooterFeature />
      </main>
    </Suspense>

    <!-- Global Liquid Animation -->
    <BubblesAnimation />

    <!-- Decorative Liquid Blobs -->
     <div class="fixed bg-primary/35 top-0 bottom-0 left-0 right-0 pointer-events-none"></div>
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style="animation-delay: 2s;"></div>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.page-enter-from {
  transform: translateY(10px);
}

.page-leave-to {
  transform: translateY(-10px);
}
</style>
