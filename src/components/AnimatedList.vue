<script setup lang="ts">
import { ref } from 'vue';
import { useIntersectionObserver } from '@vueuse/core';

interface Props {
  /** The list of items to render */
  items: any[];
  /** The delay in milliseconds between each item appearance (staggering) */
  delay?: number;
  /** IntersectionObserver threshold (0 to 1) */
  threshold?: number;
  /** CSS classes for the container element */
  listClass?: string;
  /** CSS classes for each item wrapper */
  itemClass?: string;
  /** HTML tag for the container (default: 'ul') */
  tag?: string;
  /** HTML tag for each item wrapper (default: 'li') */
  itemTag?: string;
}

const props = withDefaults(defineProps<Props>(), {
  delay: 50,
  threshold: 0.1,
  tag: 'ul',
  itemTag: 'li',
  listClass: '',
  itemClass: '',
});

const isVisible = ref(false);
const containerRef = ref<HTMLElement | null>(null);

/**
 * Uses IntersectionObserver to trigger the reveal animation
 * when the container enters the viewport.
 */
useIntersectionObserver(
  containerRef,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      isVisible.value = true;
    }
  },
  { threshold: props.threshold }
);
</script>

<template>
  <component :is="tag" ref="containerRef" :class="listClass">
    <component
      :is="itemTag"
      v-for="(item, index) in items"
      :key="index"
      class="transition-all duration-700 ease-out"
      :class="[
        itemClass,
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      ]"
      :style="{ transitionDelay: `${index * delay}ms` }"
    >
      <slot :item="item" :index="index" />
    </component>
  </component>
</template>
