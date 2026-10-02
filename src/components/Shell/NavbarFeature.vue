<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import MainMenu from '@/components/Shell/MainMenu.vue'
import ThemeSelector from '@/components/Shell/ThemeSelector.vue'

const hasScrolled = ref(false)
const scrollReference = ref<HTMLElement | null>(null)

useIntersectionObserver(
  scrollReference,
  (entries) => {
    hasScrolled.value = !entries[0].isIntersecting
  },
  { threshold: 0 }
)
</script>

<template>
  <div ref="scrollReference" class="absolute top-0 left-0" />

  <nav
    :class="[
      'navbar rounded-4xl',
      'fixed z-50',
      'left-0 right-0 mx-auto',
      'transition-all duration-500',

      hasScrolled ? 'px-10' : 'px-5',
      hasScrolled ? 'top-5' : 'top-0',
      hasScrolled ? 'w-11/12' : 'w-12/12',
      hasScrolled && 'bg-primary text-primary-content',
      // !hasScrolled && 'px-5 w-12/12',
      // hasScrolled && 'bg-primary text-primary-content',
      // hasScrolled && 'w-11/12 mx-auto rounded-4xl px-10 top-5'
    ]"
  >
    <div class="navbar-start px-2">
      <span class="font-bold font-serif"> APG </span>
    </div>

    <div class="navbar-center">
      <MainMenu class="not-lg:hidden" orientation="horizontal" />
    </div>

    <div class="navbar-end gap-4">
      <div class="lg:hidden dropdown dropdown-bottom dropdown-end">
        <button tabIndex="{0}" class="btn btn-neutral text-neutral-content btn-soft btn-sm">
          <Icon icon="hugeicons:menu-01" class="text-base" />
          Menu
        </button>
        <MainMenu orientation="vertical" class="dropdown-content z-50 bg-base-100 rounded-box" />
      </div>

      <ThemeSelector />
    </div>
  </nav>
</template>
