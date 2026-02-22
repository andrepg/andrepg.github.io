<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
  icon?: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-2 mb-4">
    <h2 class="text-2xl font-semibold flex items-center gap-2 mb-0">
      <Icon v-if="icon" :icon="icon" class="size-40 -right-8 rotate-5 top-0 absolute opacity-10 text-base-content" />
      <slot name="title" />
    </h2>
    
    <p v-if="subtitle || $slots.subtitle" class="opacity-70 font-normal font-md w-full max-w-prose leading-snug">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </div>
</template>
