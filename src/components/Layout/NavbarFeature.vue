<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ApplicationRouter } from '@config/routes';
import { ref } from 'vue';
import SocialMediaShortcuts from '@/components/SocialMediaShortcuts.vue';
import { useIntersectionObserver } from '@/composables/useIntersectionObserver';
import { useColorMode } from '@vueuse/core';

const opaqueNavbar = ref(false);
const topSentinel = ref(null);

const mode = useColorMode({
  attribute: 'data-theme',
  modes: {
    fantasy: 'fantasy',
    dark: 'dark',
  },
});

const toggleTheme = () => {
  const newMode = mode.value === 'dark' ? 'fantasy' : 'dark';

  // Verifica se o navegador suporta View Transitions
  if (!document.startViewTransition) {
    mode.value = newMode;
    return;
  }

  // Executa a transição suave
  document.startViewTransition(() => {
    mode.value = newMode;
  });
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

useIntersectionObserver(
topSentinel,
(entries) => {
  opaqueNavbar.value = !entries[0].isIntersecting;
},
{ threshold: 0 }
);
</script>

<template>
  <div ref="topSentinel" class="absolute top-0 left-0 w-full h-px pointer-events-none z-0"></div>
  <nav
  :class="[
  'navbar',
  'fixed',
  'top-0',
  'z-50',
  'py-2',
  'px-4',
  'w-full',
  'transition-all',
  opaqueNavbar ? 'bg-neutral/50 backdrop-blur-lg' : 'bg-neutral/0'
  ]"
  >
  <div class="flex-none flex items-center gap-2">
    <div class="drawer">
      <input id="my-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        <label
        for="my-drawer"
        :class="[
        'duration-1000 ease',
        'drawer-button',
        'btn btn-primary btn-soft btn-sm',
        ]"
        >
        <Icon
        icon="hugeicons:menu-collapse"
        class="size-5 rotate-180"
        />
        Menu
      </label>
    </div>
    
    <div class="drawer-side">
      <label
      for="my-drawer"
      aria-label="close sidebar"
      class="drawer-overlay"
      />
      
      <section class="flex flex-col gap-5 justify-between bg-primary/50 backdrop-blur-md text-primary-content min-h-full w-80 px-3 py-4 lg:py-8">
        <ul class="menu menu-vertical w-full">
          <li class="menu-title text-primary-content w-full text-left">
            Navegação
          </li>
          
          <li
          v-for="link in ApplicationRouter.filter(link => link.menu)"
          :key="link.name"
          class="py-1.5"
          >
            <a
              :href="link.path"
              class="uppercase text-xs font-bold tracking-wider w-full text-left flex items-center gap-3 transition-all duration-500 hover:bg-primary rounded-lg hover:shadow-lg px-4 py-2"
            >
              <Icon :icon="link.icon" class="text-xl" />{{ link.name }}
            </a>
          </li>
        </ul>
      
        <div class="px-4">
          <SocialMediaShortcuts />
        </div>
      </section>
    </div>
  </div>

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

<div class="grow"> </div>

<div class="flex-none">
  <button
  title="Voltar ao topo"
  :class="[
  'btn',
  'btn-secondary',
  'btn-soft',
  'btn-square',
  'ease transition-all',
  opaqueNavbar ? 'delay-250' : 'delay-100',
  opaqueNavbar ? 'opacity-100' : 'opacity-0',
  opaqueNavbar ? 'duration-250' : 'duration-500',
  ]"
  @click="scrollToTop"
  >
  <Icon
  icon="mdi:arrow-up"
  class="size-5"
  />
</button>
</div>
</nav>
</template>
