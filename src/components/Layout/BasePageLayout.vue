<script setup lang="ts">
/**
 * BasePageLayout Component
 * Standard layout for institutional pages (About, Projects, etc.)
 */
interface Props {
  maxWidth?: string;
}

withDefaults(defineProps<Props>(), {
  maxWidth: 'max-w-5/6',
});
</script>

<template>
  <div
    :class="[
      'flex',
      'flex-col',
      'gap-10',
      'px-4',
      'w-full',
      'mx-auto',
      'z-10',
      'relative',
      maxWidth
    ]"
  >
    <slot name="header" />
    <slot />
  </div>
</template>
