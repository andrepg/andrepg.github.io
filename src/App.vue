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
     <div class="fixed inset-0 bg-base-100/40 backdrop-blur-[120px] pointer-events-none z-0"></div>
    <div 
      class="fixed top-[-20%] left-[-20%] w-[70%] h-[70%] rounded-full blur-[120px] animate-pulse pointer-events-none mix-blend-multiply dark:mix-blend-soft-light transition-all duration-1000 bg-primary/40"
    ></div>
    <div 
      class="fixed bottom-[-20%] right-[-20%] w-[70%] h-[70%] rounded-full blur-[120px] animate-pulse pointer-events-none mix-blend-multiply dark:mix-blend-soft-light transition-all duration-1000 bg-secondary/40" 
      style="animation-delay: 2s;"
    ></div>
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
