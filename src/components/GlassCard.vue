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
      'backdrop-blur-xl',
      hoverable && 'transform will-change-transform',
      hoverable && 'hover:shadow-2xl hover:bg-base-100/70',

      !solid && 'bg-base-200/40 border-base-200/50',
      !solid && 'dark:bg-base-100/40 dark:border-base-300/50',

      solid && 'bg-base-200/85 backdrop-blur-lg',
      solid && 'text-base-content border-white/10',
      typeof $props.class === 'string' ? $props.class : $props.class.join(' ')
    ]"
  >
    <slot />
  </component>
</template>
