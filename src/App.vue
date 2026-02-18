<script setup>
import { RouterView } from 'vue-router'
import FooterFeature from "@/components/Layout/FooterFeature.vue";
import Navbar from '@/components/NavbarFeature.vue';
</script>

<template>
  <Navbar />

  <Suspense>
    <main class="flex flex-col w-full min-h-screen justify-start">
      <div class="grow">
        <RouterView />
      </div>

      <FooterFeature />
    </main>
  </Suspense>
</template>
