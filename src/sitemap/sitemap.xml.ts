import xml from 'xml';
import { saveFile } from './sitemap.file-io';
import { parseHtmlFile } from './sitemap.json';

export const generateXmlSitemap = (files: string[], directory: string): number => {
    const sitemapItems = files.map(file => {
        const data = parseHtmlFile(file);
        
        // Priority logic: 1.0 for root index, 0.5 for everything else.
        // Assuming data.path is the canonical URL. If it ends exactly with the host, it's the root.
        const isRoot = data.path.endsWith('andrepg.github.io') || data.path.endsWith('andrepg.github.io/');

        return {
            url: [
                { loc: data.path },
                { lastmod: data.publishedTime ?? new Date().toISOString() },
                { changefreq: 'monthly' },
                { priority: isRoot ? 1.0 : 0.5 },
            ],
        };
    });

    const sitemapObject = {
        urlset: [
            {
                _attr: {
                    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
                },
            },
            ...sitemapItems,
        ],
    };

    const sitemapXml = '<?xml version="1.0" encoding="UTF-8" ?>\n' + xml(sitemapObject);
    saveFile(sitemapXml, `${directory}/sitemap.xml`);

    return sitemapItems.length;
}