<script setup>
import { RouterView } from 'vue-router'
import FooterFeature from "@/components/Layout/FooterFeature.vue";
import Navbar from '@/components/NavbarFeature.vue';
</script>

<template>
  <Navbar />

  <Suspense>
    <main class="flex flex-col w-full h-screen justify-between">
      <div class="flex flex-col w-full self-start">
        <RouterView />
      </div>
      <FooterFeature />
    </main>
  </Suspense>
</template>
