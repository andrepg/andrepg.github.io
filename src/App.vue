<script setup>
import { RouterView } from 'vue-router'
import FooterFeature from "@/components/Layout/FooterFeature.vue";
import Navbar from '@/components/NavbarFeature.vue';
import BubblesAnimation from '@/components/Layout/BubblesAnimation.vue';
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
        <div class="grow pb-10">
          <RouterView />
        </div>

        <FooterFeature />
      </main>
    </Suspense>

    <!-- Global Liquid Animation -->
    <BubblesAnimation />
    
    <!-- Decorative Liquid Blobs -->
    <div class="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[100px] animate-pulse pointer-events-none"></div>
    <div class="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/20 rounded-full blur-[100px] animate-pulse pointer-events-none" style="animation-delay: 2s;"></div>
  </div>
</template>

