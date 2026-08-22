<script setup lang="ts">

interface Props {
  subtitle?: string;
}

defineProps<Props>();
</script>

<template>
  <div class="relative flex flex-col gap-2 mb-4">
    <h2 class="text-2xl font-semibold flex items-center gap-2 mb-0">
      <slot name="title" />
    </h2>
    
    <p v-if="subtitle || $slots.subtitle" class="font-normal font-md w-full max-w-prose leading-snug">
      <slot name="subtitle">{{ subtitle }}</slot>
    </p>
  </div>
</template>
