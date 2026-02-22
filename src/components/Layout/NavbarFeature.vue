<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { ApplicationRouter } from '@data/ApplicationRouter';
import { ref } from 'vue';
import { useScrollWatcher, getPosition, pastThreeshold } from '@/utils/scroll-watcher';
import SocialMediaShortcuts from '@/components/SocialMediaShortcuts.vue';

const opaqueNavbar = ref(false);

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

useScrollWatcher(() => {
  opaqueNavbar.value = pastThreeshold(getPosition(), 100);
});
</script>

<template>
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
    <div class="flex-none">
      <div class="drawer">
        <input
          id="my-drawer"
          type="checkbox"
          class="drawer-toggle"
        >
        <div class="drawer-content">
          <label
            for="my-drawer"
            :class="[
              'duration-1000 ease',
              'drawer-button',
              'btn',
              'btn-primary',
              'btn-square',
              'not-dark:btn-soft',
              'dark:btn-primary',
            ]"
          >
            <Icon
              icon="mdi:hamburger"
              class="size-5"
            />
          </label>
        </div>

        <div class="drawer-side">
          <label
            for="my-drawer"
            aria-label="close sidebar"
            class="drawer-overlay"
          />

          <section class="flex flex-col gap-5 justify-center bg-primary/60 backdrop-blur-md text-primary-content min-h-full w-80 p-4">
            <ul class="menu menu-vertical w-full">
              <li class="menu-title text-primary-content w-full text-left">
                Navegação
              </li>

              <li
                v-for="link in ApplicationRouter.filter(link => link.menu)"
                :key="link.name"
                class="py-1.5 transition-all duration-500 hover:menu-active rounded-lg hover:bg-primary"
              >
                <a :href="link.path" class="w-full text-left flex items-center gap-3">
                  <Icon :icon="link.icon" class="text-lg" />
                  {{ link.name }}
                </a>
              </li>
            </ul>

            <div class="divider divider-neutral px-4"></div>

            <div class="px-4">
               <SocialMediaShortcuts />
            </div>
          </section>
        </div>
      </div>
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
          'duration-1000 ease transition-all',
          'delay-250',
          opaqueNavbar ? 'opacity-100' : 'opacity-0'
        ]"
        @click="scrollToTop"
      >
        <Icon
          icon="mdi:arrow-up"
          class="dark:text-neutral-content text-primary size-5"
        />
      </button>
    </div>
  </nav>
</template>
