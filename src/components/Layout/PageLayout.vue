<script setup lang="ts">
import { computed } from 'vue';
import { PageLayoutType } from '@/enumerators';

interface Props {
  type?: PageLayoutType;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: PageLayoutType.BASE,
  maxWidth: 'page-container'
});

const layoutClasses = computed(() => {
  if (props.type === PageLayoutType.HOME) {
    return [
      'pt-24',
      'pb-20',
      'gap-10',
      'page-container'
    ];
  }
  
  if (props.type === PageLayoutType.BLOG) {
    return [
      'gap-10',
      'page-container',
    ];
  }

  // BASE
  return [
    'gap-10',
    props.maxWidth || 'page-container'
  ];
});

const bodyClasses = computed(() => {
  if (props.type === PageLayoutType.BLOG) {
    return [
      'gap-10',
      'h-fit',
      'pb-20',
    ];
  }

  return [];
});
</script>

<template>
  <div
    :class="[
      'flex',
      'flex-col',
      'z-10',
      'relative',
      ...layoutClasses
    ]"
  >
    <slot name="header" />

    <div
      v-if="type === PageLayoutType.BLOG"
      :class="['flex', 'flex-col', 'w-full', ...bodyClasses]"
    >
      <slot />

      <footer v-if="$slots.footer" class="mt-10">
        <slot name="footer" />
      </footer>
    </div>
    
    <template v-else>
      <slot />
    </template>
  </div>
</template>
