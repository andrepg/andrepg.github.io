import { DEFAULT_LOCALE, LOCALE_META, type AppLocale } from '@config/locales'

const formatterCache = new Map<string, Intl.DateTimeFormat>()

/**
 * Format a date string into a localized, human-readable format.
 *
 * The language is a parameter and not a constant because a date on an English
 * page has to read as an English date: "Dec 22" is a date, "22 de dez." is a
 * sentence in Portuguese, and a visitor reading the first has to not be shown the
 * second. It defaults to the site's default language, which is what a caller with
 * no page in hand — a build, a test — wants.
 *
 * Formatters are cached per language and options to avoid re-instantiating
 * `Intl.DateTimeFormat`, which is expensive enough to be worth a map.
 */
export const formatDate = (
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {},
  locale: AppLocale = DEFAULT_LOCALE
): string => {
  const cacheKey = `${locale}${JSON.stringify(options)}`

  let formatter = formatterCache.get(cacheKey)
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(LOCALE_META[locale].htmlLang, options)
    formatterCache.set(cacheKey, formatter)
  }

  return formatter.format(new Date(date))
}
