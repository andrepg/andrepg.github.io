<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { Icon } from '@iconify/vue'
import { APP_ICONS } from '@config/icons.ts'

const { locale } = useI18n()

const locales = [
  { lang: 'pt', label: 'Português', icon: 'circle-flags:br' },
  { lang: 'es', label: 'Español', icon: 'circle-flags:es' },
  { lang: 'en', label: 'English', icon: 'circle-flags:us' }
]

const isCurrentLocale = (lang: string) => locale.value == lang
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
      <li v-for="item in locales" :key="item.lang">
        <button
          type="button"
          :aria-current="isCurrentLocale(item.lang)"
          :class="[
            'flex justify-between items-center gap-3 text-base-content',
            isCurrentLocale(item.lang) && 'bg-neutral text-neutral-content'
          ]"
          @click="() => {}"
        >
          <span class="flex flex-row items-center gap-2">
            <Icon :icon="item.icon" class="text-lg" />
            <span class="flex-1 text-left">{{ item.label }}</span>
          </span>

          <Icon
            v-if="isCurrentLocale(item.lang)"
            :icon="APP_ICONS.themeSwitcher.selected"
            class="text-base"
          />
        </button>
      </li>
    </ul>
  </div>
</template>
