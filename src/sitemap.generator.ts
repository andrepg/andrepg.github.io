import fs from 'node:fs';
import path from 'node:path';
import xml from 'xml';

/**
 * Sitemap generator that crawls the dist directory for HTML files
 * and produces a sitemap.xml.
 */

const HOST = "https://andrepg.com.br";
const DIST_DIR = path.resolve(process.cwd(), 'dist');

function walkSync(dir: string, fileList: string[] = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walkSync(filePath, fileList);
    } else {
      if (file.endsWith('.html')) {
        fileList.push(filePath);
      }
    }
  });
  return fileList;
}

function generateSitemapRow(file: string) {
  const relativePath = path.relative(DIST_DIR, file)
    .replaceAll(/\\/g, '/')
    .replace('index.html', '')
    .replace('.html', '');

  // Clean up trailing slash
  const urlPath = relativePath.endsWith('/')
    ? relativePath
  :   (relativePath ? `${relativePath}` : '');

  const fileContent = fs.readFileSync(file, 'utf-8');

  const lastmod = RegExp(
    /<meta\s+property="article:published_time"\s+content="([^"]+)"/i
  ).exec(fileContent)?.[1];

  return {
    url: [
      { loc: `${HOST}/${urlPath}` },
      { lastmod },
      { changefreq: 'monthly' },
      { priority: relativePath === '' ? 1.0 : 0.5 },
    ],
  };
}

function generateSitemap() {
  console.log('Crawling dist directory for HTML files...');
  const files = walkSync(DIST_DIR);

  const sitemapItems = files.map(generateSitemapRow);

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

  const sitemapXml = '<?xml version="1.0" encoding="UTF-8" ?>' + xml(sitemapObject);

  fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);

  console.log(`Sitemap generated successfully in ${path.join(DIST_DIR, 'sitemap.xml')}`);
  console.log(`Total URLs: ${sitemapItems.length}`);
}

generateSitemap();