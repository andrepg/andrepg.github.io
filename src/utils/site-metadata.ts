import APP_CONFIG from '@config/app'
import type { ResolvableLink, ResolvableMeta, ResolvableScript } from '@unhead/vue'
import type { IAlternateLink, IBaseOgParams, ITwitterOgParams } from '@/interfaces'
import type { JsonLdDocument } from '@/types'
import { UserConfig } from '@data/website'

import { DEFAULT_LOCALE, LOCALE_META, switchPath, type AppLocale } from '@config/locales'
import { availableLocales } from '@config/routes'

const SITE_NAME = UserConfig.author.name

/**
 * Absolute URL of a path inside the published site.
 *
 * Joins the three pieces that decide where a page lives: the origin it is
 * deployed to, the path Vite serves it from, and the path itself. Taking the
 * base path from Vite rather than folding it into the origin is what keeps the
 * result correct when the site is served from a subpath, and keeps it in step
 * with the router that serves the very same pages.
 *
 * Also the single place absolute links are built: the JSON-LD documents consume
 * it so that a schema can never point at an address the canonical tag does not.
 */
export const canonicalUrl = (path: string): string => {
  const routePath = path.startsWith('/') ? path : `/${path}`
  const basePath = APP_CONFIG.BASE_PATH.replace(/\/+$/, '')

  return `${APP_CONFIG.ORIGIN}${basePath}${routePath}`
}

/**
 * The inverse of the base path join: the path as the router sees it, without the
 * path the site is served from.
 *
 * Read from the browser, a path arrives with the base in front of it, and every
 * decision about it — which language it is in — is a decision about the path the
 * router matches, not about where the site happens to be hosted.
 *
 * @example
 * stripBasePath('/andrepg/pt/curriculo')  // '/pt/curriculo'
 */
export const stripBasePath = (path: string): string => {
  const basePath = APP_CONFIG.BASE_PATH.replace(/\/+$/, '')

  if (!basePath || !path.startsWith(basePath)) return path

  return path.slice(basePath.length) || '/'
}

/**
 * The same page in every language it is published in.
 *
 * Built from the path alone: a page *is* the path it is served at, and switching
 * the prefix is the only difference between one language and another. A page that
 * exists in a single language — a blog post, whose markdown was written in one —
 * answers with just that language plus the fallback, so no alternate link ever
 * advertises a URL that does not exist.
 *
 * `x-default` is the version to index when the language does not match: the
 * default one where there is one, and the only one where there is not.
 */
export const alternateLinks = (path: string): IAlternateLink[] => {
  const locales = availableLocales(path)

  const links = locales.map((locale) => ({
    hreflang: LOCALE_META[locale].htmlLang,
    href: canonicalUrl(switchPath(path, locale))
  }))

  const fallback = locales.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : locales[0]

  return [...links, { hreflang: 'x-default', href: canonicalUrl(switchPath(path, fallback)) }]
}

/**
 * Builds the document title, appending the site name to every page except the
 * one that is the site name itself.
 */
export const buildPageTitle = (title?: string): string => {
  const page = title?.trim()

  if (!page || page === SITE_NAME) return SITE_NAME

  return `${page} | ${SITE_NAME}`
}

export const dtoPlainOg = ({
  title,
  description,
  canonicalUrl: url,
  image,
  type,
  locale,
  alternates
}: IBaseOgParams): ResolvableMeta[] => [
  { property: 'og:type', content: type },
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:url', content: url },
  { property: 'og:image', content: image },
  { property: 'og:site_name', content: SITE_NAME },
  { property: 'og:locale', content: LOCALE_META[locale].ogLocale },
  ...alternates
    .filter(
      (link) => link.hreflang !== 'x-default' && link.hreflang !== LOCALE_META[locale].htmlLang
    )
    .map((link) => ({
      property: 'og:locale:alternate',
      content: link.hreflang.replace('-', '_')
    }))
]

/** The `rel="alternate"` links a page declares for the other languages. */
export const dtoAlternates = (alternates: IAlternateLink[]): ResolvableLink[] =>
  alternates.map(({ hreflang, href }) => ({ rel: 'alternate', hreflang, href }))

export const dtoTwitterOg = ({
  card,
  title,
  description,
  image
}: ITwitterOgParams): ResolvableMeta[] => [
  { name: 'twitter:card', content: card },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
  { name: 'twitter:image', content: image }
]

export const dtoKeywords = (keywords?: string[]): ResolvableMeta[] =>
  keywords?.length ? [{ name: 'keywords', content: keywords.join(', ') }] : []

export const dtoRobots = (noIndex?: boolean): ResolvableMeta[] =>
  noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []

export const dtoArticle = (publishedTime?: string): ResolvableMeta[] =>
  publishedTime
    ? [
        { property: 'article:published_time', content: publishedTime },
        { property: 'article:author', content: SITE_NAME }
      ]
    : []

export const dtoJsonLd = (schemas: JsonLdDocument[]): ResolvableScript[] =>
  schemas.map((schema) => ({
    type: 'application/ld+json',
    textContent: JSON.stringify(schema)
  }))

/** Language of a page, for the tags that name a region: `<html lang>`, hreflang. */
export const documentLanguage = (locale: AppLocale): string => LOCALE_META[locale].htmlLang
