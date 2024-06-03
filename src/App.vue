<script setup>
import {RouterView} from 'vue-router'
import MainHeader from "@/components/Layout/MainHeader.vue";
import Footer from "@/components/Layout/Footer.vue";
</script>

<template>
  <MainHeader/>
  <main class="flex flex-col flex-1">
    <RouterView />
  </main>
  <Footer />
</template>

