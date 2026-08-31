<script setup lang="ts">
import { getMenuItems } from '@config/routes.ts'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const menuItems = getMenuItems()

const props = defineProps({
  orientation: {
    type: String,
    default: 'horizontal',
    validator: (value: unknown): boolean => ['horizontal', 'vertical'].includes(value as string)
  }
})

const menuOrientation = computed(() => `menu-${props.orientation}`)
</script>

<template>
  <ul
    tabindex="-1"
    :class="['menu menu-sm', menuOrientation]"
  >
    <li v-for="link in menuItems" :key="link.name">
      <a
        :href="link.path"
        :class="[
          'flex items-center gap-2',
          'uppercase font-bold',
          'transition-all duration-500',
          'not-lg:py-2'
        ]"
      >
        <Icon :icon="link.icon" class="text-base" />
        {{ link.name }}
      </a>
    </li>
  </ul>
</template>
