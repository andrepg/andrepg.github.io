<script setup lang="ts">
import { Icon } from '@iconify/vue'

import type { SiteThemeId } from '@config/themes'
import { useTheme } from '@/composables/useTheme'

const { themes, currentTheme, selectTheme } = useTheme()

const isCurrentTheme = (theme: SiteThemeId) => theme === currentTheme.value

const chooseTheme = (theme: SiteThemeId) => {
  selectTheme(theme)

  // Focus dropdowns stay open while focused, so the selection is closed by hand.
  // ;(document.activeElement as HTMLElement | null)?.blur()
}
</script>

<template>
  <div class="dropdown dropdown-end">
    <button
      tabindex="0"
      role="button"
      aria-label="Selecionar tema"
      data-tip="Tema"
      class="btn btn-sm btn-square tooltip tooltip-left"
    >
      <Icon icon="hugeicons:palette" class="text-base" />
    </button>

    <ul
      tabindex="-1"
      class="dropdown-content menu bg-base-100 z-50 mt-2 w-56 rounded-box p-2 shadow-lg"
    >
      <li v-for="theme in themes" :key="theme.id">
        <button
          type="button"
          :aria-current="isCurrentTheme(theme.id)"
          :class="[
            'flex items-center gap-3 text-base-content',
            isCurrentTheme(theme.id) && 'bg-primary text-primary-content'
          ]"
          @click="chooseTheme(theme.id)"
        >
          <span :data-theme="theme.id" class="flex items-center gap-0.5 p-1 rounded-box">
            <span class="size-2.5 rounded-full bg-primary" />
            <span class="size-2.5 rounded-full bg-secondary" />
            <span class="size-2.5 rounded-full bg-accent" />
            <span class="size-2.5 rounded-full bg-neutral" />
          </span>

          <span class="flex-1 text-left">{{ theme.label }}</span>

          <Icon v-if="isCurrentTheme(theme.id)" icon="hugeicons:tick-01" class="text-base" />
        </button>
      </li>
    </ul>
  </div>
</template>
