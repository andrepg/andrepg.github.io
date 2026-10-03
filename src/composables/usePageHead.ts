import { computed, type ComputedRef } from 'vue'
import { useRoute } from 'vue-router'
import { useHead, type ReactiveHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'

import { getRouteMessages, getRouteSeo, type RoutePath } from '@config/routes'
import type { IPageSeo } from '@/interfaces'
import type { PageContext, PageMessages, PageSeoOverrides } from '@/types'
import { resolveJsonLd } from '@/utils/structured-data'
import { UserConfig } from '@data/website'
import {
  alternateLinks,
  buildPageTitle,
  canonicalUrl,
  dtoAlternates,
  dtoArticle,
  dtoJsonLd,
  dtoKeywords,
  dtoPlainOg,
  dtoRobots,
  dtoTwitterOg
} from '@/utils/site-metadata'

const resolveOverrides = (overrides?: PageSeoOverrides): Partial<IPageSeo> =>
  typeof overrides === 'function' ? overrides() : (overrides ?? {})

/**
 * Assembles the whole document head of a page: title, description, keywords,
 * canonical link, Open Graph, Twitter cards, robots and JSON-LD schemas.
 *
 * Pure: given the same metadata and the same translator it always returns the
 * same head. `context.seo` carries the route's own text already translated, and
 * `context.t` is what the schemas read for content only they enumerate — a
 * timeline entry, a project — which the route declaration cannot know about.
 *
 * The language comes from the same context rather than from a constant: the head
 * describes the page as it is being served, and the page is served in the
 * language its path carries.
 */
export const buildPageHead = (
  seo: IPageSeo,
  canonical: string,
  context: PageContext
): ReactiveHead => {
  const title = buildPageTitle(seo.title)
  const description = seo.description ?? context.t('profile.shortBiography')
  const image = seo.image ?? UserConfig.website.image
  const type = seo.type ?? 'website'
  const card = seo.card ?? 'summary'

  return {
    title,
    meta: [
      { name: 'description', content: description },
      ...dtoKeywords(seo.keywords),
      ...dtoRobots(seo.noIndex),
      ...dtoArticle(seo.publishedTime),
      ...dtoPlainOg({
        title,
        description,
        image,
        type,
        canonicalUrl: canonical,
        locale: context.locale,
        alternates: context.alternates
      }),
      ...dtoTwitterOg({ card, title, description, image })
    ],
    link: [{ rel: 'canonical', href: canonical }, ...dtoAlternates(context.alternates)],
    script: dtoJsonLd(resolveJsonLd(seo.jsonLd, context))
  }
}

/**
 * Single entry point for page metadata. The base metadata comes from the route
 * declaration in `@config/routes`, so views only declare what is specific to
 * them.
 *
 * @example
 * const seo = usePageHead(RoutePath.PROJECTS)
 *
 * @example
 * usePageHead(RoutePath.BLOG_ARTICLE, () => ({
 *   title: metadata.title,
 *   description: metadata.excerpt,
 *   canonicalUrl: canonical,
 *   jsonLd: blogPostingLd(metadata, canonical)
 * }))
 *
 * @param path - Route whose declared metadata should be used.
 * @param overrides - Fields to replace, or a getter for dynamic pages.
 * @returns The resolved metadata, for views that show part of it on the page —
 *   reading the copy from here is what keeps what the visitor reads and what
 *   the search engine reads from being the same string written twice.
 */
export const usePageHead = (
  path: RoutePath,
  overrides?: PageSeoOverrides
): ComputedRef<IPageSeo> => {
  const route = useRoute()
  const { t, tm, te } = useI18n()

  /**
   * The page's own text, read from the key prefix the route declares.
   *
   * `te` guards the two string fields: the homepage declares no title and no
   * description — it falls back to the biography — and asking for a key that
   * does not exist makes vue-i18n warn on every route of the static build, for a
   * field that is absent by design.
   *
   * Keywords cannot be guarded the same way, and the reason is worth knowing:
   * `te` does not resolve a leaf whose message is an array, so it reports `false`
   * for a `keywords` that exists and reads perfectly well through `tm`. The
   * absence is detected by value instead — `tm` echoes the key back when there
   * is nothing there.
   */
  const routeMessages = computed<PageMessages>(() => {
    const prefix = getRouteMessages(path).seo

    const read = (field: string): string | undefined => {
      const key = `${prefix}.${field}`
      return te(key) ? t(key) : undefined
    }

    const keywordsKey = `${prefix}.keywords`
    const rawKeywords = tm(keywordsKey)
    const keywords = Array.isArray(rawKeywords) ? rawKeywords.map(String) : []

    return {
      title: read('title'),
      description: read('description'),
      keywords: keywords.includes(keywordsKey) ? undefined : keywords
    }
  })

  const seo = computed<IPageSeo>(() => ({
    ...getRouteSeo(path),
    ...routeMessages.value,
    ...resolveOverrides(overrides)
  }))

  /**
   * The language this page is served in, taken from the route record it matched
   * — the same declaration that decided whether the record exists at all.
   */
  const locale = computed(() => route.meta.locale)

  /**
   * The concrete path is required for dynamic routes such as
   * `/blog/:year/:article`, where the declared path is only a pattern. The
   * prefix is part of it: the canonical of the Portuguese page is the Portuguese
   * URL, not the English one.
   */
  const canonical = computed(() => seo.value.canonicalUrl ?? canonicalUrl(route.path))

  /** Where the same page lives in the other languages it is published in. */
  const alternates = computed(() => alternateLinks(route.path))

  // Handed to the schemas rather than read from the i18n instance directly, so
  // that `structured-data` keeps no dependency on the plugin.
  const context = computed<PageContext>(() => ({
    seo: routeMessages.value,
    t,
    path: route.path,
    locale: locale.value,
    alternates: alternates.value
  }))

  useHead(computed<ReactiveHead>(() => buildPageHead(seo.value, canonical.value, context.value)))

  return seo
}
