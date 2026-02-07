<script setup>
import { RouterView } from 'vue-router'
import Footer from "@/components/Layout/Footer.vue";
import Navbar from './views/partials/NavbarFeature.vue';
</script>

<template>
  <Navbar />

  <Suspense>
    <main class="flex flex-col flex-1">
      <RouterView />
    </main>
  </Suspense>
  <Footer />
</template>
