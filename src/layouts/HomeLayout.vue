<script setup lang="ts">
import BaseLayout from './BaseLayout.vue'
</script>

<template>
  <BaseLayout class="pt-24 pb-20" max-width="w-full">
    <div
      class="grid grid-cols-1 lg:grid-cols-[20rem_minmax(0,1fr)] xl:grid-cols-[40rem_minmax(0,1fr)] gap-10 lg:gap-16"
    >
      <aside class="lg:sticky lg:top-28 lg:self-start h-fit px-10">
        <slot name="sidebar" />
      </aside>

      <div class="flex flex-col gap-24 min-w-0 px-10">
        <slot />
      </div>
    </div>
  </BaseLayout>
</template>
