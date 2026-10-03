<script setup lang="ts">
import { getMenuItems } from '@config/routes'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useLocaleRouting } from '@/composables/useLocaleRouting'

const menuItems = getMenuItems()

const { localize } = useLocaleRouting()

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
  <ul tabindex="-1" :class="['menu menu-sm', menuOrientation]">
    <li v-for="link in menuItems" :key="link.path">
      <a
        :href="localize(link.path)"
        :class="[
          'flex items-center gap-2',
          'uppercase font-bold',
          'transition-all duration-100',
          'not-lg:py-2'
        ]"
      >
        <Icon :icon="link.icon" class="text-base" />
        {{ $t(link.label) }}
      </a>
    </li>
  </ul>
</template>
