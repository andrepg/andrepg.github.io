<script setup>
import { RouterView } from 'vue-router'
import Footer from "@/components/Layout/Footer.vue";
import Navbar from './views/partials/NavbarFeature.vue';
</script>

<template>
  <Navbar />

  <Suspense>
    <main class="flex flex-col w-full h-screen justify-between">
      <div class="flex flex-col w-full self-start">
        <RouterView />
      </div>
      <Footer />
    </main>
  </Suspense>
</template>
