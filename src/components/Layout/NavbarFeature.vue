<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { getMenuItems } from '@config/routes'
import { ref } from 'vue'
import { useColorMode, useIntersectionObserver } from '@vueuse/core'

const menuItems = getMenuItems()

const opaqueNavbar = ref(false)
const scrollWatcher = ref<HTMLElement | null>(null)

const mode = useColorMode({
  attribute: 'data-theme',
  modes: {
    fantasy: 'fantasy',
    dark: 'dark'
  }
})

const toggleTheme = () => {
  const newMode = mode.value === 'dark' ? 'fantasy' : 'dark'

  // Verifica se o navegador suporta View Transitions
  if (!document.startViewTransition) {
    mode.value = newMode
    return
  }

  // Executa a transição suave
  document.startViewTransition(() => {
    mode.value = newMode
  })
}

useIntersectionObserver(
  scrollWatcher,
  (entries) => {
    opaqueNavbar.value = !entries[0].isIntersecting
  },
  { threshold: 0 }
)
</script>

<template>
  <div
    id="anchor-top"
    ref="scrollWatcher"
    class="absolute top-0 left-0 w-full h-px pointer-events-none z-0"
  />

  <nav
    :class="[
      'navbar transition-all duration-500',
      'fixed top-0 z-50',
      'py-2 px-4 w-full border-b',
      opaqueNavbar ? 'bg-base-100 border-base-300' : 'bg-transparent border-transparent'
    ]"
  >
    <div class="navbar-start">André Paul Grandsire</div>

    <div class="navbar-center">
      <ul
        tabindex="-1"
        :class="[
          'menu menu-sm menu-horizontal rounded-xl',
          'transition-all duration-700 gap-2',
          !opaqueNavbar && 'bg-neutral/50 py-0'
        ]"
      >
        <li v-for="link in menuItems" :key="link.name" class="py-1.5">
          <a
            :href="link.path"
            :class="[
              'flex items-center gap-2',
              'uppercase font-bold',
              'transition-all duration-500'
            ]"
          >
            <Icon :icon="link.icon" class="text-xl" />
            {{ link.name }}
          </a>
        </li>
      </ul>
    </div>

    <div class="navbar-end">
      <button
        class="btn btn-primary btn-soft btn-sm btn-square"
        title="Alternar tema"
        @click="toggleTheme"
      >
        <transition name="fade" mode="out-in">
          <Icon
            :key="mode"
            :icon="mode === 'dark' ? 'hugeicons:sun-03' : 'hugeicons:moon-02'"
            class="size-5"
          />
        </transition>
      </button>
    </div>
  </nav>
</template>
