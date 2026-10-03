<script setup lang="ts">
import { Icon } from '@iconify/vue'

import { APP_ICONS } from '@config/icons.ts'
import { LOCALES, LOCALE_META, type AppLocale } from '@config/locales'
import { useLocaleRouting } from '@/composables/useLocaleRouting'

/**
 * Language of the current page, and the languages it exists in — one, for a post
 * written in a single language, which has no version to switch to.
 */
const { locale, locales, switchTo, chooseLocale } = useLocaleRouting()

/**
 * The page in a language, offered only where that version exists.
 */
const isPublished = (lang: AppLocale): boolean => locales.value.includes(lang)

const isCurrentLocale = (lang: AppLocale): boolean => locale.value === lang
</script>

<template>
  <div class="dropdown dropdown-end">
    <button
      tabindex="0"
      role="button"
      :aria-label="$t('general.nav.selectLanguage')"
      :data-tip="$t('general.nav.selectLanguage')"
      class="btn btn-sm btn-square btn-ghost tooltip tooltip-left"
    >
      <Icon :icon="APP_ICONS.translation" class="text-base" />
    </button>

    <ul
      tabindex="-1"
      class="dropdown-content menu bg-base-100 z-50 mt-2 w-56 rounded-box p-2 shadow-lg"
    >
      <li v-for="lang in LOCALES.filter(isPublished)" :key="lang">
        <!--
          A real navigation, not a client-side switch: the page in another
          language is a different document, already rendered at its own URL, and
          that URL is what identifies it.

          The click records the choice while the browser follows the link, so a
          later visit to a page without a prefix — a shared link, a bookmark, the
          bare domain — opens in the language the visitor picked here.
        -->
        <a
          :href="switchTo(lang)"
          :aria-current="isCurrentLocale(lang)"
          :class="[
            'flex justify-between items-center gap-3 text-base-content',
            isCurrentLocale(lang) && 'bg-neutral text-neutral-content'
          ]"
          @click="chooseLocale(lang)"
        >
          <span class="flex flex-row items-center gap-2">
            <Icon :icon="LOCALE_META[lang].icon" class="text-lg" />
            <span class="flex-1 text-left">{{ LOCALE_META[lang].label }}</span>
          </span>

          <Icon
            v-if="isCurrentLocale(lang)"
            :icon="APP_ICONS.themeSwitcher.selected"
            class="text-base"
          />
        </a>
      </li>
    </ul>
  </div>
</template>
