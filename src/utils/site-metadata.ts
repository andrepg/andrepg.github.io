import APP_CONFIG from '@config/app'
import type { ResolvableMeta, ResolvableScript } from '@unhead/vue'
import type { IBaseOgParams, ITwitterOgParams } from '@/interfaces'
import type { JsonLdDocument } from '@/types'
import { UserConfig } from '@data/website'

const SITE_NAME = UserConfig.author.name
const SITE_LOCALE = 'pt_BR'

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
  type
}: IBaseOgParams): ResolvableMeta[] => [
  { property: 'og:type', content: type },
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:url', content: url },
  { property: 'og:image', content: image },
  { property: 'og:site_name', content: SITE_NAME },
  { property: 'og:locale', content: SITE_LOCALE }
]

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
