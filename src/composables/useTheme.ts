import { computed, ref } from 'vue'
import { usePreferredDark } from '@vueuse/core'
import { getDefaultThemeId, isSiteThemeId, SITE_THEMES, type SiteThemeId } from '@config/themes'
import { deleteCookie, readCookie, writeCookie } from '@/utils/cookie'

const COOKIE_NAME = 'theme'

/** Theme picked by the visitor, or `null` while there is no preference. */
const selectedTheme = ref<SiteThemeId | null>(null)

let isInitialized = false

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Writes the palette to the document root, wrapped in a View Transition so the
 * page cross-fades instead of snapping. The effect and its 200ms timing live in
 * `src/assets/base-styles.css`.
 *
 * Falls back to an instant swap when the browser lacks the API or when the
 * visitor asked for less motion.
 *
 * @param animate Set to `false` to swap without animating, used while restoring
 * the stored theme on load, where there is nothing to fade from.
 */
const applyTheme = (theme: SiteThemeId, animate = true): void => {
  if (typeof document === 'undefined') return

  const setTheme = (): void => {
    document.documentElement.dataset.theme = theme
  }

  const canAnimate =
    animate && typeof document.startViewTransition === 'function' && !prefersReducedMotion()

  if (!canAnimate) {
    setTheme()
    return
  }

  // The update callback cannot fail, but a transition superseded by a faster one
  // (two quick clicks on the selector) rejects `ready` as aborted, which would
  // otherwise surface as an unhandled rejection.
  document.startViewTransition(setTheme).ready.catch(() => {})
}

/**
 * Restores the theme saved in the cookie before the app is mounted. A cookie
 * holding an unknown theme is discarded, leaving the document without
 * `data-theme` so the stylesheet falls back to the system preference.
 *
 * Called once from `main.ts`, which also runs during the static generation,
 * where it is a no-op because there is no document to theme.
 */
export const initializeTheme = (): void => {
  if (isInitialized || typeof document === 'undefined') return

  isInitialized = true

  const storedTheme = readCookie(COOKIE_NAME)

  if (!storedTheme) return

  if (!isSiteThemeId(storedTheme)) {
    deleteCookie(COOKIE_NAME)
    return
  }

  selectedTheme.value = storedTheme
  applyTheme(storedTheme, false)
}

/**
 * Theme of the site: the palette chosen by the visitor, or the first palette of
 * the system scheme while there is no choice saved.
 *
 * @example
 * const { themes, currentTheme, selectTheme } = useTheme()
 */
export const useTheme = () => {
  const prefersDark = usePreferredDark()

  const currentTheme = computed<SiteThemeId>(
    () => selectedTheme.value ?? getDefaultThemeId(prefersDark.value ? 'dark' : 'light')
  )

  /** Saves the palette in the cookie and applies it to the document, animating the swap. */
  const selectTheme = (theme: SiteThemeId): void => {
    selectedTheme.value = theme
    writeCookie(COOKIE_NAME, theme)
    applyTheme(theme)
  }

  return {
    themes: SITE_THEMES,
    currentTheme,
    selectTheme
  }
}
