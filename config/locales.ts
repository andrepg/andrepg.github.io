/**
 * The languages of the site, and how a path is spelled in each of them.
 *
 * This is the one place that knows the list, and it is loaded by three very
 * different consumers: the router, the static generation (`plugins/ssg.ts`, read
 * by the Vite config) and the sitemap. Two of those have no bundler behind them
 * and no `import.meta.env`, which is why this module declares its own data
 * instead of importing the message catalogs — those live in `locale/<idioma>/`,
 * and only the app can load them.
 */

/** Every language the site is published in. */
export const LOCALES = ['en', 'pt', 'es'] as const

/** A language the site is published in. */
export type AppLocale = (typeof LOCALES)[number]

/**
 * The language a URL is served in when it carries no prefix, and the one every
 * unprefixed path stands for: `/` is English, `/pt/` is Portuguese.
 *
 * It is also the fallback any missing translation falls back to, which is why
 * it is also the language `locale/schema.d.ts` derives the message shape from.
 */
export const DEFAULT_LOCALE: AppLocale = 'en'

/**
 * The language the content the author wrote is in — today, the blog markdown.
 *
 * The interface is translated into every language, the posts are not, so a post
 * exists in one URL only (`/pt/blog/...`) and the indexes of the other
 * languages link across to it.
 */
export const CONTENT_LOCALE: AppLocale = 'pt'

/**
 * How a language is named in the metadata of a page.
 *
 * `label` and `icon` are the *endonym*: the name a language has for itself,
 * which is the same in every language of the site and therefore data rather than
 * a translation. It lives here so that the selector, the alternate links and the
 * static build all read the same list.
 */
type LocaleDescriptor = {
  /** BCP 47 tag, for `<html lang>` and `hreflang`. */
  htmlLang: string
  /** Same tag as Open Graph spells it, for `og:locale`. */
  ogLocale: string
  /** The language's name for itself, as shown in the selector. */
  label: string
  icon: string
}

export const LOCALE_META: Record<AppLocale, LocaleDescriptor> = {
  en: { htmlLang: 'en-US', ogLocale: 'en_US', label: 'English', icon: 'circle-flags:us' },
  pt: { htmlLang: 'pt-BR', ogLocale: 'pt_BR', label: 'Português', icon: 'circle-flags:br' },
  es: { htmlLang: 'es-ES', ogLocale: 'es_ES', label: 'Español', icon: 'circle-flags:es' }
}

/** Narrows an arbitrary string — a URL segment, a cookie — to a known language. */
export const isAppLocale = (value: string): value is AppLocale =>
  (LOCALES as readonly string[]).includes(value)

/**
 * The path segment that marks a page as being in a language.
 *
 * Empty for the default one: its pages are served unprefixed, so that the
 * language the site is written in is also the shortest URL, and so that a
 * crawler reaching an old link to `/curriculo` gets the canonical English
 * version instead of a redirect.
 */
export const localePrefix = (locale: AppLocale): string =>
  locale === DEFAULT_LOCALE ? '' : `/${locale}`

/**
 * Where a page lives in a given language.
 *
 * @example
 * localizePath('/', 'en')             // '/'
 * localizePath('/', 'pt')             // '/pt'
 * localizePath('/curriculo', 'es')    // '/es/curriculo'
 * localizePath('/blog/:year/:article', 'pt')  // '/pt/blog/:year/:article'
 */
export const localizePath = (path: string, locale: AppLocale): string => {
  const suffix = path === '/' ? '' : path

  return `${localePrefix(locale)}${suffix}` || '/'
}

/**
 * The language a path is in, read from its first segment.
 *
 * Anything that is not a language prefix — `/curriculo`, `/blog/2024/post` —
 * answers the default one, which is exactly what those paths are.
 */
export const localeFromPath = (path: string): AppLocale => {
  const segment = path.replace(/^\//, '').split('/')[0]

  return isAppLocale(segment) ? segment : DEFAULT_LOCALE
}

/**
 * The same page in another language, found by swapping the prefix.
 *
 * The inverse of `localizePath` — which is what lets the alternate links of a
 * page be built without knowing anything about the page: the page is the path
 * it is served at, and the prefix is the only part that changes.
 *
 * @example
 * switchPath('/pt/curriculo', 'en')   // '/curriculo'
 * switchPath('/', 'es')               // '/es'
 * switchPath('/pt', 'es')             // '/es'
 */
export const switchPath = (path: string, target: AppLocale): string => {
  const segments = path.replace(/^\//, '').split('/')
  const rest = isAppLocale(segments[0]) ? segments.slice(1) : segments

  return localizePath(rest.length ? `/${rest.join('/')}` : '/', target)
}
