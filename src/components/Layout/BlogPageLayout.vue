<script setup lang="ts">
/**
 * BlogPageLayout Component
 * Standard layout for blog-related pages (Index, Articles)
 */
</script>

<template>
  <div
    :class="[
      'flex',
      'flex-col',
      'w-full',
      'gap-10',
      'px-5',
      'lg:px-10',
      'max-w-10/12',
      'mx-auto',
      'not-2xl:max-w-11/12',
      'bg-base-100/80',
      'backdrop-blur-lg',
      'shadow-2xl',
      'min-h-screen',
      'pb-20',
      'rounded-b-lg',
      'z-10',
      'relative'
    ]"
  >
    <slot name="header" />
    
    <main class="grow">
      <slot />
    </main>

    <footer v-if="$slots.footer" class="mt-10">
      <slot name="footer" />
    </footer>
  </div>
</template>
