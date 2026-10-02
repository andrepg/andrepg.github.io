import { computed, ref } from 'vue';
import { usePreferredDark } from '@vueuse/core';

import { getDefaultThemeId, isSiteThemeId, SITE_THEMES, SiteThemeId } from '@config/themes';

const COOKIE_NAME = 'theme';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

/** Theme picked by the visitor, or `null` while there is no preference. */
const selectedTheme = ref<SiteThemeId | null>(null);

let isInitialized = false;

const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null;

  const value = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=');

  return value ? decodeURIComponent(value) : null;
};

const writeCookie = (name: string, value: string): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
};

const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return;

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
};

const applyTheme = (theme: SiteThemeId): void => {
  if (typeof document === 'undefined') return;

  document.documentElement.dataset.theme = theme;
};

/**
 * Restores the theme saved in the cookie before the app is mounted. A cookie
 * holding an unknown theme is discarded, leaving the document without
 * `data-theme` so the stylesheet falls back to the system preference.
 *
 * Called once from `main.ts`, which also runs during the static generation,
 * where it is a no-op because there is no document to theme.
 */
export const initializeTheme = (): void => {
  if (isInitialized || typeof document === 'undefined') return;

  isInitialized = true;

  const storedTheme = readCookie(COOKIE_NAME);

  if (!storedTheme) return;

  if (!isSiteThemeId(storedTheme)) {
    deleteCookie(COOKIE_NAME);
    return;
  }

  selectedTheme.value = storedTheme;
  applyTheme(storedTheme);
};

/**
 * Theme of the site: the palette chosen by the visitor, or the first palette of
 * the system scheme while there is no choice saved.
 *
 * @example
 * const { themes, currentTheme, selectTheme } = useTheme()
 */
export const useTheme = () => {
  const prefersDark = usePreferredDark();

  const currentTheme = computed<SiteThemeId>(
    () => selectedTheme.value ?? getDefaultThemeId(prefersDark.value ? 'dark' : 'light')
  );

  /** Saves the palette in the cookie and applies it to the document. */
  const selectTheme = (theme: SiteThemeId): void => {
    selectedTheme.value = theme;
    writeCookie(COOKIE_NAME, theme);
    applyTheme(theme);
  };

  return {
    themes: SITE_THEMES,
    currentTheme,
    selectTheme
  };
};