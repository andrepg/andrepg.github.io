<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  src: string;
  alt: string;
}

defineProps<Props>();

const isLoaded = ref(false);
</script>

<template>
  <div class="relative overflow-hidden w-full h-full">
    <div
      v-show="!isLoaded"
      class="skeleton absolute inset-0 size-full z-0"
    ></div>
    <img
      :src="src"
      :alt="alt"
      class="relative z-10 transition-opacity duration-500 w-full h-full object-cover"
      :class="isLoaded ? 'opacity-100' : 'opacity-0'"
      @load="isLoaded = true"
    >
  </div>
</template>
