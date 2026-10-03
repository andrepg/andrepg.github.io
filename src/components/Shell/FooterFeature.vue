<script setup lang="ts">
import AnalyticsScripts from '@/components/Shell/AnalyticsScripts.vue'
import SocialMediaShortcuts from '@/components/SocialMediaShortcuts.vue'
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useIntersectionObserver } from '@vueuse/core'
import { UserConfig } from '@data/website'
import { APP_ICONS } from '@config/icons.ts'
import { useLocaleRouting } from '@/composables/useLocaleRouting'
import { formatDate } from '@/utils/date'

const showFooter = ref(false)
const footerRef = ref<HTMLElement | null>(null)

// Informações de build (em um projeto real poderiam vir de variáveis de ambiente do Vite)
const appVersion = '0.0.3'

const { locale } = useLocaleRouting()

/** Spelled in the language of the page, so the footer reads as part of it. */
const buildDate = computed(() =>
  formatDate(new Date(), { day: '2-digit', month: '2-digit', year: 'numeric' }, locale.value)
)

useIntersectionObserver(
  footerRef,
  (entries) => {
    // if (showFooter.value) return;
    showFooter.value = entries[0].isIntersecting
  },
  { threshold: 0.1 }
)
</script>

<template>
  <footer ref="footerRef" class="relative mt-20">
    <div
      :class="[
        'py-12 px-6 md:px-12 lg:px-24',
        'z-10',
        'transition-all duration-1000',
        'bg-base-300 text-base-content'
      ]"
    >
      <div class="footer sm:footer-horizontal gap-10">
        <aside v-if="showFooter" class="flex flex-col gap-4">
          <div class="flex items-start gap-4">
            <div class="flex flex-col gap-0">
              <h5 class="text-xl font-light tracking-tight">{{ UserConfig.author.name }}</h5>

              <p class="max-w-xs opacity-70 leading-relaxed text-sm">
                {{ $t('profile.shortBiography') }}
              </p>
            </div>
          </div>
        </aside>

        <Transition name="fade">
          <nav v-if="showFooter" style="transition-delay: 500ms">
            <h6 class="footer-title opacity-100 mb-4">{{ $t('general.footer.connect') }}</h6>
            <SocialMediaShortcuts />
          </nav>
        </Transition>
      </div>

      <Transition name="fade">
        <div
          v-if="showFooter"
          class="mt-12 pt-8 border-t border-primary-content/25 flex flex-wrap gap-x-8 gap-y-3 opacity-60 text-xs tracking-wide transition-all duration-1000"
          style="transition-delay: 750ms"
        >
          <div class="flex items-center gap-2">
            <Icon :icon="APP_ICONS.footer.gitBranch" class="size-3.5" />
            <span>{{ $t('general.footer.version', { version: appVersion }) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon :icon="APP_ICONS.footer.buildDate" class="size-3.5" />
            <span>{{ $t('general.footer.updatedAt', { date: buildDate }) }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon :icon="APP_ICONS.footer.hosting" class="size-3.5" />
            <span>{{ $t('general.footer.hostedOn') }}</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon :icon="APP_ICONS.footer.madeWith" class="size-3.5" />
            <span>{{ $t('general.footer.madeWith') }}</span>
          </div>
        </div>
      </Transition>
    </div>

    <AnalyticsScripts />
  </footer>
</template>
