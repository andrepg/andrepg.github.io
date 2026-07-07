import path from "node:path";

import { getFileTree } from "src/sitemap/sitemap.generator";
import { generateJsonSitemap } from "./sitemap/sitemap.json";
import { generateXmlSitemap } from "./sitemap/sitemap.xml";

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

if (fileTree.length > 0) {
  log(`- Found ${fileTree.length} pages`);
}

log('Generating JSON sitemap');
const jsonRecordsProcessed = generateJsonSitemap(fileTree, DIST_DIR);

if (jsonRecordsProcessed > 0) {
  log(`- Generated ${jsonRecordsProcessed} JSON objects`);
}

log('Generating XML sitemap');
const xmlRecordsProcessed = generateXmlSitemap(fileTree, DIST_DIR);

if (xmlRecordsProcessed > 0) {
  log(`- Generated ${xmlRecordsProcessed} XML entries`);
}

log('Sitemap generation completed');