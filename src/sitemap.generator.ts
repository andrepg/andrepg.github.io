import path from "node:path";

import { getFileTree } from "src/sitemap/sitemap.generator";
import { generateJsonSitemap } from "./sitemap/sitemap.json";

/**
 * Sitemap generator that crawls the dist directory for HTML files
 * and produces a sitemap.xml.
 */

const DIST_DIR = path.resolve(process.cwd(), 'dist');
export const log = (message: string) => {
    console.log(`[sitemap] ${message}`)
}

log('Starting sitemap generation');

log('Reading exported HTML files');
const fileTree = getFileTree(DIST_DIR);

log('Generating JSON sitemap');
const jsonRecordsProcessed = generateJsonSitemap(fileTree, DIST_DIR);

log('Generating XML sitemap');
// const xmlRecordsProcessed = generateXmlSitemap(fileTree);

log('Sitemap generation completed');

if (fileTree.length > 0) {
  log(`- Found ${fileTree.length} pages`);
}

if (jsonRecordsProcessed > 0) {
  log(`- Generated ${jsonRecordsProcessed} JSON objects`);
}

// log(`- Found ${xmlRecordsProcessed} blog articles`);

// function isDirectory(filePath: string) {
//   return fs.statSync(filePath).isDirectory();
// }

// function searchHtmlFilesRecursive(dir: string, initialList: string[] = []) {
//   if (!fileExists(dir)) return initialList;

//   const files = fs.readdirSync(dir);

//   files.forEach(iteration => {
//     const filePath = path.join(dir, iteration);

//     if (isDirectory(fiyarn lePath)) {
//       searchHtmlFilesRecursive(filePath, initialList);
//       return;
//     }

//     if (filePath.endsWith('.html')) {
//       initialList.push(filePath);
//     }
//   });
  
//   console.log(initialList);

//   return initialList;
// }

// function generateSitemapRow(file: string) {
//   const relativePath = path.relative(DIST_DIR, file)
//     .replaceAll(/\\/g, '/')
//     .replace('index.html', '')
//     .replace('.html', '');

//   // Clean up trailing slash
//   const urlPath = relativePath.endsWith('/')
//     ? relativePath
//     : (relativePath ? `${relativePath}` : '');

//   const fileContent = fs.readFileSync(file, 'utf-8');

//   const lastmod = RegExp(
//     /<meta\s+property="article:published_time"\s+content="([^"]+)"/i
//   ).exec(fileContent)?.[1];

//   return {
//     url: [
//       { loc: `${HOST}/${urlPath}` },
//       { lastmod },
//       { changefreq: 'monthly' },
//       { priority: relativePath === '' ? 1.0 : 0.5 },
//     ],
//   };
// }

// function generateSitemap() {
//   console.log('Crawling dist directory for HTML files...');
//   const files = searchHtmlFilesRecursive(DIST_DIR);

//   // const sitemapItems = files.map(generateSitemapRow);

//   // const sitemapObject = {
//   //   urlset: [
//   //     {
//   //       _attr: {
//   //         xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
//   //       },
//   //     },
//   //     ...sitemapItems,
//   //   ],
//   // };

//   // const sitemapXml = '<?xml version="1.0" encoding="UTF-8" ?>' + xml(sitemapObject);

//   // fs.writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), sitemapXml);

//   // console.log(`Sitemap generated successfully in ${path.join(DIST_DIR, 'sitemap.xml')}`);
//   // console.log(`Total URLs: ${sitemapItems.length}`);
// }

// generateSitemap();