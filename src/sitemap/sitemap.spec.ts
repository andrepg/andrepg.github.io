import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'

import { generateXmlSitemap } from './sitemap.xml'

/**
 * The sitemap a search engine has to be able to parse.
 *
 * The build is not exercised here — only what this module makes of a page that
 * is already rendered, which is the part that silently produced a file no
 * Googlebot could read.
 */

const ORIGIN = 'https://andrepg.github.io'

const workingDirectories: string[] = []

afterEach(() => {
  for (const directory of workingDirectories.splice(0)) {
    fs.rmSync(directory, { recursive: true, force: true })
  }
})

const renderPage = ({
  path: pagePath,
  lang = 'en-US',
  alternates = [],
  publishedTime
}: {
  path: string
  lang?: string
  alternates?: { hreflang: string; href: string }[]
  publishedTime?: string
}): string => `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta name="description" content="A page of the site." />
    <meta property="og:title" content="A page" />
    <meta property="og:type" content="website" />
    ${publishedTime ? `<meta property="article:published_time" content="${publishedTime}" />` : ''}
    <link rel="canonical" href="${ORIGIN}${pagePath}" />
    ${alternates.map(({ hreflang, href }) => `<link rel="alternate" hreflang="${hreflang}" href="${href}" />`).join('\n    ')}
  </head>
  <body></body>
</html>
`

/** Renders pages into a temporary directory and returns the sitemap built from them. */
const buildSitemap = (pages: Parameters<typeof renderPage>[0][]): string => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'sitemap-'))
  workingDirectories.push(directory)

  const files = pages.map((page, index) => {
    const file = path.join(directory, `${index}.html`)
    fs.writeFileSync(file, renderPage(page))
    return file
  })

  generateXmlSitemap(files, directory)

  return fs.readFileSync(path.join(directory, 'sitemap.xml'), 'utf-8')
}

/** Every `<url>` block, as the pairs a reader has to reconcile. */
const urlEntries = (sitemap: string) =>
  [...sitemap.matchAll(/<url>(.*?)<\/url>/g)].map(([, block]) => ({
    loc: /<loc>(.*?)<\/loc>/.exec(block)?.[1] ?? '',
    links: [...block.matchAll(/hreflang="([^"]+)" href="([^"]+)"/g)].map(([, hreflang, href]) => ({
      hreflang,
      href
    }))
  }))

const trilingual = [
  { hreflang: 'en-US', href: `${ORIGIN}/curriculo` },
  { hreflang: 'pt-BR', href: `${ORIGIN}/pt/curriculo` },
  { hreflang: 'es-ES', href: `${ORIGIN}/es/curriculo` },
  { hreflang: 'x-default', href: `${ORIGIN}/curriculo` }
]

describe('generateXmlSitemap', () => {
  it('leaves <lastmod> out of a page that published no date', () => {
    const sitemap = buildSitemap([{ path: '/curriculo', alternates: trilingual }])

    expect(sitemap).not.toContain('<lastmod>')
  })

  it('writes the date of a page that published one at day precision', () => {
    const sitemap = buildSitemap([
      { path: '/pt/blog/2026/post', publishedTime: '2026-08-06T00:00:00.000Z' }
    ])

    expect(sitemap).toContain('<lastmod>2026-08-06</lastmod>')
  })

  it('never writes an empty element', () => {
    const sitemap = buildSitemap([
      { path: '/curriculo', alternates: trilingual },
      { path: '/pt/blog/2026/post', publishedTime: '2026-08-06T00:00:00.000Z' }
    ])

    expect(sitemap).not.toMatch(/<([\w:]+)\s*><\/\1>/)
  })

  it('lists every URL as an alternate of itself', () => {
    const sitemap = buildSitemap([
      { path: '/curriculo', alternates: trilingual },
      { path: '/pt/curriculo', alternates: trilingual },
      // A post is written in one language, so its entry lists only that one.
      {
        path: '/pt/blog/2026/post',
        publishedTime: '2026-08-06T00:00:00.000Z',
        alternates: [
          { hreflang: 'pt-BR', href: `${ORIGIN}/pt/blog/2026/post` },
          { hreflang: 'x-default', href: `${ORIGIN}/pt/blog/2026/post` }
        ]
      }
    ])

    for (const { loc, links } of urlEntries(sitemap)) {
      expect(links.map(({ href }) => href)).toContain(loc)
    }
  })

  it('fails the build on a page with no canonical link', () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'sitemap-'))
    workingDirectories.push(directory)

    const file = path.join(directory, 'orphan.html')
    fs.writeFileSync(file, '<!DOCTYPE html><html lang="en-US"><head></head><body></body></html>')

    expect(() => generateXmlSitemap([file], directory)).toThrow(/canonical/)
  })
})
