<script setup lang="ts">
/**
 * GlassCard Component
 * A reusable container with a soft, flat surface design.
 */
interface Props {
  tag?: string;
  /**
   * Tailwind classes to add to the main container
   */
  class?: string|string[];

  /**
   * Whether to define solid style
   */
  solid?: boolean;

  /**
   * Whether to show a shadow on hover
   */
  hoverable?: boolean;
}

withDefaults(defineProps<Props>(), {
  tag: 'section',
  class: '',
  hoverable: false,
  solid: false,
});
</script>

<template>
  <component 
    :is="tag"
    :class="[
      'relative',
      'py-4 px-5 md:px-8 md:py-6',
      'rounded-2xl',
      'overflow-hidden',
      'transition-all',
      'duration-500',
      'border',
      'shadow-sm',
      hoverable && 'transform will-change-transform',
      hoverable && 'hover:shadow-lg hover:bg-base-100/80',

      !solid && 'bg-base-200/60 border-base-300/60',
      !solid && 'dark:bg-base-200/50 dark:border-base-300/50',

      solid && 'bg-base-200/90',
      solid && 'text-base-content border-base-300/60',
      typeof $props.class === 'string' ? $props.class : $props.class.join(' ')
    ]"
  >
    <slot />
  </component>
</template>
