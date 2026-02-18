<script setup lang="ts">
import GlassCard from './GlassCard.vue';

defineProps({
	class: {
		type: String,
		default: ''
	}
})
</script>

<template>
  <!-- <glass-card
    :class="[
      'relative',
      'py-16',
      'flex',
      'flex-col',
      'justify-center',
      'items-start',
      'px-2',
      'sm:px-10',
      'w-full', 
      'glass',
      'bg-base-100/60',
      'text-neutral',
      'dark:text-neutral-content',
      'backdrop-blur-lg',
      'shadow-lg',
      'rounded-b-lg',
      $attrs.class
    ]"
  >
    <slot />
</glass-card> -->
<GlassCard class="pt-16 px-5 rounded-t-none pb-5">
  <slot />
</GlassCard>
</template>