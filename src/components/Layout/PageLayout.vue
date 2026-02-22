<script setup lang="ts">
import { computed } from 'vue';
import { PageLayoutType } from '@/enumerators';

interface Props {
  type?: PageLayoutType;
  maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
  type: PageLayoutType.BASE,
  maxWidth: 'max-w-11/12 xl:m-w-5/6'
});

const layoutClasses = computed(() => {
  if (props.type === PageLayoutType.HOME) {
    return [
      'pt-24',
      'pb-20',
      'px-5',
      'max-w-5xl'
    ];
  }
  
  if (props.type === PageLayoutType.BLOG) {
    return [
      'gap-5',
      'max-w-10/12',
      'not-2xl:max-w-11/12',
    ];
  }

  // BASE
  return [
    'gap-10',
    'px-4',
    props.maxWidth || 'max-w-11/12 xl:m-w-5/6'
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
      'w-full',
      'mx-auto',
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
