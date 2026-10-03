import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { DEFAULT_LOCALE, localizePath, switchPath, type AppLocale } from '@config/locales'
import { availableLocales } from '@config/routes'
import { saveLocalePreference } from '@/utils/locale'

export interface ILocaleRouting {
  /** Language the current page is served in. */
  locale: ComputedRef<AppLocale>
  /** Languages this page exists in — one, for content written in a single one. */
  locales: ComputedRef<AppLocale[]>
  /** Where a site path lives in the current language. */
  localize: (path: string) => string
  /** Where the current page lives in another language. */
  switchTo: (target: AppLocale) => string
  /**
   * Chooses a language for good: moves to that version of the page and records
   * the choice, which is what a later visit to a page without a prefix follows.
   */
  chooseLocale: (target: AppLocale) => void
}

/**
 * The language of the current page, and the paths that language spells.
 *
 * The source of truth is the route record, not the i18n instance: the record is
 * what the URL resolved to, which is also what the static generation rendered
 * and what the head announced. The i18n instance only ever agrees with it — it is
 * created from the same prefix at boot.
 *
 * Every link a template writes goes through `localize`, so a page in a language
 * links to the pages of that language and a link can no longer be right in one
 * page and wrong in another.
 *
 * @example
 * const { localize, switchTo } = useLocaleRouting()
 *
 * @example
 * <a :href="localize(RoutePath.BLOG)">Blog</a>
 */
export const useLocaleRouting = (): ILocaleRouting => {
  const route = useRoute()
  const { locale: activeLocale } = useI18n()

  const locale = computed<AppLocale>(
    () => route.meta.locale ?? (activeLocale.value as AppLocale) ?? DEFAULT_LOCALE
  )

  const locales = computed(() => availableLocales(route.path))

  const localize = (path: string): string => localizePath(path, locale.value)

  const switchTo = (target: AppLocale): string => switchPath(route.path, target)

  const chooseLocale = (target: AppLocale): void => saveLocalePreference(target)

  return { locale, locales, localize, switchTo, chooseLocale }
}
