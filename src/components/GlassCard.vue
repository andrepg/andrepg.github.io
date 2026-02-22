<script setup lang="ts">
/**
 * GlassCard Component
 * A reusable container with the "Liquid Glass" design language.
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
      'py-4 px-5 md:px-8 md:py-6',
      'rounded-2xl',
      'overflow-hidden',
      'transition-all',
      'duration-500',
      'border-t border-l',
      'shadow-xl',
      !solid && 'backdrop-blur-xl bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 shadow-black/5',
      hoverable && 'transform will-change-transform',
      hoverable && 'hover:shadow-2xl hover:bg-base-100/70',
      solid && 'bg-base-200/85 backdrop-blur-lg',
      solid && 'text-base-content border-white/10',
      $props.class
    ]"
  >
    <slot />
  </component>
</template>
