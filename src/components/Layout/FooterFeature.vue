<script setup>
import AnalyticsScripts from "@/components/AnalyticsScripts.vue"
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from "vue";

const showFooter = ref(false);
const footerRef = ref(null);

useIntersectionObserver(
  footerRef,
  ([{ isIntersecting }]) => {
    showFooter.value = isIntersecting
  },
  { threshold: 0.1 }
)
</script>

<template>
<footer ref="footerRef">
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
      'z-10',
      'transition-opacity duration-500',
      showFooter ? 'opacity-100' : 'opacity-0',
    ]">
    <span>Made with 🤍 and VueJS</span>
    <span>Hosted by 🤖 GitHub Pages</span>

    <AnalyticsScripts />
  </div>
</footer>
</template>

<style scoped></style>