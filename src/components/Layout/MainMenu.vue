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
    :class="['menu menu-sm', menuOrientation, 'transition-all duration-700 gap-2', 'not-lg:hidden']"
  >
    <li v-for="link in menuItems" :key="link.name" class="py-1.5">
      <a
        :href="link.path"
        :class="['flex items-center gap-2', 'uppercase font-bold', 'transition-all duration-500']"
      >
        <Icon :icon="link.icon" class="text-base" />
        {{ link.name }}
      </a>
    </li>
  </ul>
</template>
