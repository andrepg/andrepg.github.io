<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useHead } from '@unhead/vue'

import FooterFeature from '@/components/Shell/FooterFeature.vue'
import Navbar from '@/components/Shell/NavbarFeature.vue'
import { useLocaleRouting } from '@/composables/useLocaleRouting'
import { documentLanguage } from '@/utils/site-metadata'

const { locale } = useLocaleRouting()

/**
 * The language of the document, which is the language of its text.
 *
 * Declared here rather than in `usePageHead` because it describes the document
 * and not the head of one page: it is what a screen reader reads first, what a
 * translator extension picks up, and what a crawler reads before it reads
 * anything else. The static build copies `index.html` to every page, so this is
 * also what replaces the single `lang` written there.
 */
useHead(computed(() => ({ htmlAttrs: { lang: documentLanguage(locale.value) } })))
</script>

<template>
  <div :class="['relative', 'min-h-screen', 'overflow-x-clip', 'bg-base-100']">
    <div
      class="fixed inset-0 z-0 bg-linear-to-br from-primary/10 via-base-200/40 to-secondary/10 pointer-events-none"
    ></div>

    <Navbar />

    <main class="flex flex-col w-full min-h-screen justify-start relative z-10">
      <RouterView v-slot="{ Component, route }">
        <transition name="page" mode="in-out">
          <div :key="route.path" class="grow pb-10 transition-all min-h-screen">
            <component :is="Component" />
          </div>
        </transition>
      </RouterView>

      <FooterFeature />
    </main>
  </div>
</template>
