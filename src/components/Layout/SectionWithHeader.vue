<template>
  <section class="relative py-16 flex flex-col justify-center items-start px-2 sm:px-10">
    <div v-if="showPattern" class="dark:opacity-20 opacity-5 z-0 absolute w-full h-full left-0 top-0" id="pattern" />
    <div v-if="showPattern" class="bg-linear-to-b from-transparent to-white dark:to-gray-900 to-95% z-10 absolute w-full h-full left-0 top-0" />

    <div class="z-20">
      <slot />
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  showPattern: false
})
</script>