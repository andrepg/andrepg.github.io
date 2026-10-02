/**
 * Theme catalog shared by the daisyUI themes declared in
 * `src/assets/base-styles.css` and by the theme selector.
 *
 * Order matters: the first light theme is the site default and the first dark
 * theme is the one applied when the system prefers dark, so new themes should
 * be appended to the end of their group.
 */
import type { ISiteTheme } from '@/interfaces';
import type { ThemeScheme } from '@/types';

export const SITE_THEMES = [
  { id: 'iced-penguin', label: 'Iced Penguin', scheme: 'light' },
  { id: 'white-fox', label: 'White Fox', scheme: 'light' },
  { id: 'green-seal', label: 'Green Seal', scheme: 'dark' },
  { id: 'purple-squirrel', label: 'Purple Squirrel', scheme: 'dark' }
] as const satisfies readonly ISiteTheme[]

/** Identifier of one of the themes of the catalog. */
export type SiteThemeId = (typeof SITE_THEMES)[number]['id']

/**
 * A catalog entry narrowed to the ids the catalog actually declares, so a
 * theme coming from `SITE_THEMES` is not typed as any string.
 */
export type SiteTheme = ISiteTheme<SiteThemeId>

export const isSiteThemeId = (value: unknown): value is SiteThemeId =>
  SITE_THEMES.some((theme) => theme.id === value)

/**
 * Theme used when the visitor has no preference: the first theme of the given
 * scheme, matching the `--default` and `--prefersdark` flags in the stylesheet.
 */
export const getDefaultThemeId = (scheme: ThemeScheme): SiteThemeId =>
  SITE_THEMES.find((theme) => theme.scheme === scheme)?.id ?? SITE_THEMES[0].id
