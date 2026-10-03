import xml from 'xml'
import { saveFile } from './sitemap.file-io'
import { parseHtmlFile } from './sitemap.json.ts'

/** The XHTML namespace the alternate links of a multilingual sitemap live in. */
const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml'

export const generateXmlSitemap = (files: string[], directory: string): number => {
  const ROOT_HOSTNAMES = ['andrepg.github.io', 'andre.startap.dev']

  const sitemapItems = files.map((file) => {
    const data = parseHtmlFile(file)

    let isRoot = false
    try {
      const hostname = new URL(data.path).hostname
      isRoot = ROOT_HOSTNAMES.includes(hostname)
    } catch {
      // data.path is not a valid URL; treat as non-root
    }

    return {
      url: [
        { loc: data.path },
        { lastmod: data.publishedTime ?? new Date().toISOString() },
        { changefreq: 'monthly' },
        { priority: isRoot ? 1.0 : 0.5 },
        // Every language the page declares itself in, which is how a crawler
        // finds the version written in the language it is searching for instead
        // of the same page repeated under three URLs. Read from the page, so a
        // language the site stops publishing disappears from here by itself.
        ...(data.alternates ?? []).map((alternate) => ({
          'xhtml:link': {
            _attr: {
              rel: 'alternate',
              hreflang: alternate.hreflang,
              href: alternate.href
            }
          }
        }))
      ]
    }
  })

  const sitemapObject = {
    urlset: [
      {
        _attr: {
          xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
          'xmlns:xhtml': XHTML_NAMESPACE
        }
      },
      ...sitemapItems
    ]
  }

  const sitemapXml = '<?xml version="1.0" encoding="UTF-8" ?>\n' + xml(sitemapObject)
  saveFile(sitemapXml, `${directory}/sitemap.xml`)

  return sitemapItems.length
}
