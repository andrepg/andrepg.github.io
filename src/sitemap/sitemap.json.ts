import type { HTMLElement } from 'node-html-parser'
import type { IAlternateLink, IHtmlMetaTag, ISitemapDto } from '@/interfaces'
import type { OgType } from '@/types'
import { parseHtmlDocument, saveFile } from './sitemap.file-io'

const OG_TYPES: readonly OgType[] = ['website', 'article', 'profile']

const formatMetaTag = (item: HTMLElement): IHtmlMetaTag => ({
  name: item.getAttribute('name') ?? item.getAttribute('property') ?? '',
  content: item.getAttribute('content') ?? ''
})

const getMetaTagContent = (tags: IHtmlMetaTag[], name: string) =>
  tags.find((tag) => tag.name === name)?.content ?? ''

/**
 * The scraped `og:type` is whatever the prerendered HTML happened to contain, so
 * it is narrowed against the values the site emits and falls back to `website`.
 */
const parseOgType = (content: string): OgType =>
  OG_TYPES.find((type) => type === content) ?? 'website'

const parseMetaTags = (head: HTMLElement[]): IHtmlMetaTag[] =>
  head.flatMap((item) => formatMetaTag(item)).filter((item) => !!item.name)

/**
 * The other languages a page declares itself in, read from the head the build
 * wrote.
 *
 * Scraped rather than recomputed: the page already knows which languages it
 * exists in — it had to, to emit the links — and asking the file is what keeps
 * the sitemap from ever advertising an address the pages do not have.
 */
const parseAlternates = (head: HTMLElement[]): IAlternateLink[] =>
  head.flatMap((item) => {
    const href = item.getAttribute('href')
    const hreflang = item.getAttribute('hreflang')

    return href && hreflang ? [{ hreflang, href }] : []
  })

const sitemapDto = (
  tags: IHtmlMetaTag[],
  canonical: string,
  alternates: IAlternateLink[]
): ISitemapDto => ({
  path: canonical,
  title: getMetaTagContent(tags, 'og:title'),
  description: getMetaTagContent(tags, 'description'),
  type: parseOgType(getMetaTagContent(tags, 'og:type')),
  keywords: getMetaTagContent(tags, 'keywords').split(','),
  publishedTime: getMetaTagContent(tags, 'article:published_time'),
  modifiedTime: '',
  alternates
  // TODO Add more tags to HTML and here. We can feed from JSON ld as well
})

export const parseHtmlFile = (file: string): ISitemapDto => {
  const page = parseHtmlDocument(file)
  const head = page.querySelector('head')

  const metaTags = parseMetaTags(head?.querySelectorAll('meta') ?? [])
  const alternates = parseAlternates(head?.querySelectorAll('link') ?? [])
  const canonical = head?.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? ''

  return {
    ...sitemapDto(metaTags, canonical, alternates),
    locale: page.querySelector('html')?.getAttribute('lang') ?? ''
  }
}

export const generateJsonSitemap = (files: string[], directory: string): number => {
  const parsedFiles = files.map(parseHtmlFile)

  saveFile(JSON.stringify(parsedFiles), `${directory}/sitemap.json`)

  return parsedFiles.length
}
