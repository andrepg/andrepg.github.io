import xml from 'xml';
import { saveFile } from './sitemap.file-io';
import { parseHtmlFile } from './sitemap.json';

export const generateXmlSitemap = (files: string[], directory: string): number => {
    const ROOT_HOSTNAMES = ['andrepg.github.io', 'andre.startap.dev'];

    const sitemapItems = files.map(file => {
        const data = parseHtmlFile(file);
        
        let isRoot = false;
        try {
            const hostname = new URL(data.path).hostname;
            isRoot = ROOT_HOSTNAMES.includes(hostname);
        } catch {
            // data.path is not a valid URL; treat as non-root
        }

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