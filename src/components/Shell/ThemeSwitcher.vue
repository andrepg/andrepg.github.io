<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

enum ThemeMode {
  dark = 'dark',
  light = 'light'
}

enum ProjectTheme {
  light = 'fantasy',
  dark = 'dark'
}

enum SwitchIcon {
  fantasy = 'hugeicons:moon-02',
  dark = 'hugeicons:sun-03'
}

const theme = useColorMode({
  attribute: 'data-theme',
  modes: {
    light: ProjectTheme.light,
    dark: ProjectTheme.dark
  }
})

const currentTheme = computed(() => theme.value as ThemeMode)

const switchButton = computed<{
  icon: String
  label: String
}>(() => {
  const icon = currentTheme.value == ThemeMode.light ? SwitchIcon.fantasy : SwitchIcon.dark
  const label = currentTheme.value == ThemeMode.light ? 'Modo escuro' : 'Modo claro'

  return { icon, label }
})

const switchTheme = () => {
  const newMode = currentTheme.value == ThemeMode.light ? ThemeMode.dark : ThemeMode.light

  const setTheme = () => (theme.value = newMode)

  try {
    document.startViewTransition(setTheme)
  } catch {
    setTheme()
  }
}
</script>

<template>
  <button
    class="btn btn-sm btn-square btn-soft btn-neutral text-neutral-content tooltip tooltip-left"
    :data-tip="switchButton.label"
    @click="switchTheme"
  >
    <Icon :icon="switchButton.icon.toString()" class="text-base" />
  </button>
</template>

<style scoped></style>
