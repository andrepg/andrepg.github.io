import xml from 'xml';
import type { Post } from '../data/Posts';

export interface SitemapItem {
  url: [
    { loc: string },
    { lastmod: string | number },
    { changefreq: string },
    { priority: number }
  ];
}

export class SitemapGenerator {
  private xmlAttribute = {
    _attr: {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
    },
  };

  private encoding = '<?xml version="1.0" encoding="UTF-8" ?>';

  private host: string;

  constructor({ host }: { host: string }) {
    this.host = host;
  }

  private generateSitemapItem(page: Post): SitemapItem {
    const lastmod = page.published_at 
      ? (typeof page.published_at === 'string' ? page.published_at : new Date(page.published_at).toISOString())
      : new Date().toISOString();

    return {
      url: [
        { loc: this.host + page.path },
        { lastmod },
        { changefreq: 'monthly' },
        { priority: 0.5 },
      ],
    };
  }

  private generateUrlSet(pages: Post[]) {
    const items = pages.map((page) => this.generateSitemapItem(page));
    return [this.xmlAttribute, ...items];
  }

  public generateSitemap(pages: Post[]): string {
    const sitemap = {
      urlset: this.generateUrlSet(pages),
    };

    return this.encoding + xml(sitemap);
  }
}
