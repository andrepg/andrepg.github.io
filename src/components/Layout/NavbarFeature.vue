<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import MainMenu from '@/components/Layout/MainMenu.vue'
import ThemeSwitcher from '@/components/Layout/ThemeSwitcher.vue'
import { UserConfig } from '@data/website.ts'

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
      'navbar',
      'fixed top-0 z-50',
      'transition-all duration-200',
      hasScrolled && 'bg-neutral text-neutral-content'
    ]"
  >
    <div class="navbar-start px-2">
      <span class="font-bold font-serif">
        {{ UserConfig.author.name }}
      </span>
    </div>
    <div class="navbar-center">
      <MainMenu class="not-lg:hidden" orientation="horizontal" />
    </div>
    <div class="navbar-end gap-4">
      <div class="lg:hidden dropdown dropdown-bottom dropdown-end">
        <button
          tabIndex="{0}"
          class="btn btn-neutral text-neutral-content btn-soft btn-sm">
          <Icon icon="hugeicons:menu-01" class="text-base" />
          Menu
        </button>
        <MainMenu
          orientation="vertical"
          class="dropdown-content z-50 bg-base-100 text-neutral rounded-box"
        />
      </div>

      <ThemeSwitcher />
    </div>
  </nav>
  <!--  <div-->
  <!--    id="anchor-top"-->
  <!--    ref="scrollWatcher"-->
  <!--    class="absolute top-0 left-0 w-full h-px pointer-events-none z-0"-->
  <!--  />-->

  <!--  <nav-->
  <!--    :class="[-->
  <!--      'navbar transition-all duration-500',-->
  <!--      'fixed top-0 z-50',-->
  <!--      'py-2 px-4 w-full border-b',-->
  <!--      opaqueNavbar ? 'bg-base-100 border-base-300' : 'bg-transparent border-transparent'-->
  <!--    ]"-->
  <!--  >-->
  <!--    <div class="navbar-start">-->
  <!--      <span class="font-bold font-serif">André Paul Grandsire</span>-->
  <!--    </div>-->

  <!--    <div class="navbar-center">-->
  <!--      <MainMenu orientation="horizontal" />-->
  <!--    </div>-->

  <!--    <div class="navbar-end gap-5">-->
  <!--      <details className="dropdown">-->
  <!--        <summary className="btn m-1">open or close</summary>-->
  <!--        <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">-->
  <!--          <li><a>Item 1</a></li>-->
  <!--          <li><a>Item 2</a></li>-->
  <!--        </ul>-->
  <!--      </details>-->

  <!--      <button-->
  <!--        class="btn btn-neutral btn-sm btn-square btn-ghost"-->
  <!--        title="Alternar tema"-->
  <!--        @click="toggleTheme"-->
  <!--      >-->
  <!--        <transition name="fade" mode="out-in">-->
  <!--          <Icon-->
  <!--            :key="mode"-->
  <!--            :icon="mode === 'dark' ? 'hugeicons:sun-03' : 'hugeicons:moon-02'"-->
  <!--            class="size-5 text-neutral-content"-->
  <!--          />-->
  <!--        </transition>-->
  <!--      </button>-->
  <!--    </div>-->
  <!--  </nav>-->
</template>
