<script setup>
import { RouterView } from 'vue-router'
import MainHeader from "@/components/Layout/MainHeader.vue";
import Footer from "@/components/Layout/Footer.vue";
</script>

<template>
  <MainHeader />
  <Suspense>
    <main class="flex flex-col flex-1">
      <RouterView />
    </main>
  </Suspense>
  <Footer />
</template>
