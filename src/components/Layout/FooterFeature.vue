<script setup>
import AnalyticsScripts from "@/components/AnalyticsScripts.vue"
</script>

<template>
<footer>
  <div
    :class="[
      'flex',
      'flex-col',
      'text-xs',
      'py-5',
      'px-3',
      'bg-neutral',
      'text-neutral-content',
      'w-full',
      'justify-center',
      'shadow-inner',
      'z-10'
    ]">
    <span>Made with 🤍 and VueJS</span>
    <span>Hosted by 🤖 GitHub Pages</span>

    <AnalyticsScripts />
  </div>
</footer>
</template>

<style scoped></style>