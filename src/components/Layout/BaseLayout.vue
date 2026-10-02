<script setup lang="ts">
/**
 * Generic page shell.
 *
 * Owns the structural classes shared by every page (stacking, spacing and
 * content width) and exposes three slots:
 *
 * - `header`: rendered before the main content
 * - default: the page content
 * - `footer`: rendered after the main content, only when provided
 *
 * Width variants (`page-container`, `reading-column`, etc.) are defined as
 * utilities in `src/assets/base-styles.css` and passed via `maxWidth`.
 */
interface Props {
  maxWidth?: string
}

withDefaults(defineProps<Props>(), {
  maxWidth: 'page-container'
})
</script>

<template>
  <div :class="['flex', 'flex-col', 'z-10', 'relative', 'gap-10', maxWidth]">
    <slot name="header" />

    <slot />

    <footer v-if="$slots.footer" class="mt-10">
      <slot name="footer" />
    </footer>
  </div>
</template>