import xml from 'xml'

export class SitemapGenerator {
  #xmlAttribute = {
    _attr: {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
    }
  }

  #encoding = '<?xml version="1.0" encoding="UTF-8" ?>'

  constructor({ outFile, host }) {
    this.host = host
  }

  #generateSitemapItem(page) {
    return {
      url: [
        { loc: this.host + page.path },
        { lastmod: page.modificado || page.publicado || Date.now() },
        { changefreq: 'monthly' },
        { priority: 0.5 }
      ]
    }
  }

  #generateUrlSet(pages) {
    return [
      this.#xmlAttribute,
      ...pages.map((page) => {
        return this.#generateSitemapItem(page)
      })
    ]
  }

  generateSitemap(pages) {
    let sitemap = {
      urlset: this.#generateUrlSet(pages)
    }

    return this.#encoding + xml(sitemap)
  }
}
