<script setup>
import { RouterView } from 'vue-router'
import FooterFeature from '@/components/Shell/FooterFeature.vue'
import Navbar from '@/components/Shell/NavbarFeature.vue'
</script>

<template>
  <div :class="['relative', 'min-h-screen', 'overflow-x-clip', 'bg-base-100']">
    <div
      class="fixed inset-0 z-0 bg-linear-to-br from-primary/10 via-base-200/40 to-secondary/10 pointer-events-none"
    ></div>

    <Navbar />

    <main class="flex flex-col w-full min-h-screen justify-start relative z-10">
      <RouterView v-slot="{ Component, route }">
        <transition name="page" mode="in-out">
          <div :key="route.path" class="grow pb-10 transition-all min-h-screen">
            <component :is="Component" />
          </div>
        </transition>
      </RouterView>

      <FooterFeature />
    </main>
  </div>
</template>
