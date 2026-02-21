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
      'gap-5',
      'mx-auto',
      'max-w-10/12',
      'not-2xl:max-w-11/12',
      'z-10',
      'relative',
    ]">
    <slot name="header" />

    <div
      :class="[
        'flex',
        'flex-col',
        'w-full',
        'gap-10',
        'h-fit',
        'pb-20',
      ]"
    >
      <slot />

      <footer v-if="$slots.footer" class="mt-10">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>
