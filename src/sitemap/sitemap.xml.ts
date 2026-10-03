import xml from 'xml'
import { saveFile } from './sitemap.file-io'
import { parseHtmlFile } from './sitemap.json.ts'

/** The XHTML namespace the alternate links of a multilingual sitemap live in. */
const XHTML_NAMESPACE = 'http://www.w3.org/1999/xhtml'

/** The origins the site is published on, matched to recognise the root pages. */
const ROOT_HOSTNAMES = ['andrepg.github.io', 'andre.startap.dev']

/** Day precision, the shape a date takes in the sitemap protocol. */
const W3C_DATE = /^\d{4}-\d{2}-\d{2}/

/**
 * The `<lastmod>` entry of a URL, or nothing at all when the page said nothing
 * about its own date.
 *
 * A page that did not publish one — every page that is not a post — gets no
 * element rather than an empty one, because `<lastmod></lastmod>` is exactly the
 * form the protocol cannot read. Falling back to the build time instead would be
 * worse than silence: every build would then claim that every page changed, which
 * is the one value a search engine is documented to discount as unverifiable.
 */
const lastModEntry = (value?: string): { lastmod: string }[] => {
  const day = W3C_DATE.exec(value ?? '')?.[0]

  return day ? [{ lastmod: day }] : []
}

const isRootUrl = (url: string): boolean => {
  try {
    return ROOT_HOSTNAMES.includes(new URL(url).hostname)
  } catch {
    return false
  }
}

export const generateXmlSitemap = (files: string[], directory: string): number => {
  const sitemapItems = files.map((file) => {
    const data = parseHtmlFile(file)

    // A `<url>` without a `<loc>` is not a URL the protocol can read, so a page
    // that lost its canonical link is a build failure rather than a record to
    // skip: silently dropping it would hide the page from the sitemap entirely.
    if (!data.path) {
      throw new Error(`[sitemap] ${file} has no canonical link to be listed under`)
    }

    return {
      url: [
        { loc: data.path },
        ...lastModEntry(data.publishedTime),
        { changefreq: 'monthly' },
        { priority: isRootUrl(data.path) ? 1.0 : 0.5 },
        // Every language the page declares itself in, which is how a crawler
        // finds the version written in the language it is searching for instead
        // of the same page repeated under three URLs. Read from the page, so a
        // language the site stops publishing disappears from here by itself, and
        // always including the page itself, which is what the protocol asks of a
        // multilingual entry.
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
