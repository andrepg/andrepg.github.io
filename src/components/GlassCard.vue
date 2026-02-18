<script setup lang="ts">
/**
 * GlassCard Component
 * A reusable container with the "Liquid Glass" design language.
 */
interface Props {
  /**
   * Tailwind classes to add to the main container
   */
  class?: string;
  /**
   * Whether to show a shadow on hover
   */
  hoverable?: boolean;
  /**
   * Whether to use the base background instead of transparent glass
   */
  solid?: boolean;
}

withDefaults(defineProps<Props>(), {
  class: '',
  hoverable: false,
  solid: false,
});
</script>

<template>
  <section
    :class="[
      'rounded-2xl',
      'overflow-hidden',
      'transition-all',
      'duration-500',
      'border',
      'border-white/10',
      solid ? 'bg-base-100 shadow-xl' : 'glass bg-base-100/30 backdrop-blur-2xl shadow-lg',
      hoverable ? 'hover:shadow-2xl hover:border-white/20 hover:scale-[1.01] transform will-change-transform' : '',
      $props.class
    ]"
  >
    <slot />
  </section>
</template>

<style scoped>
/* Ensure glass effect from DaisyUI/Tailwind is clean */
.glass {
  background-image: none; /* Reset default glass gradient if any */
}
</style>
