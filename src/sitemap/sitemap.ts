import path from 'path';
import { fileURLToPath } from 'url';
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import FrontMatter from 'front-matter';

import { SitemapGenerator } from './SitemapGenerator';
import type { Post } from '../data/Posts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogRoot = path.join(__dirname, '../../blog/');
const sitemapXmlPath = path.join(__dirname, '../../public/sitemap.xml');
const sitemapJsonPath = path.join(__dirname, '../../public/sitemap.json');

const sitemap: Post[] = [];

function isArticle(filePath: string): boolean {
  return (
    lstatSync(path.join(blogRoot, filePath)).isFile() &&
    !filePath.toString().includes('.json')
  );
}

function getArticlesList(): string[] {
  return readdirSync(blogRoot, { recursive: true }).filter((item) =>
    isArticle(item as string)
  ) as string[];
}

function generateSitemapXml(posts: Post[]): string {
  return new SitemapGenerator({
    host: 'https://andrepg.github.io/',
  }).generateSitemap(posts);
}

function report(message: string): void {
  console.log(message);
}

function addArticleToSitemap(item: string): void {
  const content = readFileSync(path.join(blogRoot, item), 'utf8').toString();
  const fm = FrontMatter<Post>(content);

  sitemap.push({
    path: item.replace('.md', ''),
    ...fm.attributes,
  });

  report(`\tFile processed -> ${item}`);
}

function main(): void {
  report(`Building blog sitemap for ${blogRoot}`);
  const articleList = getArticlesList();

  report(
    `\t${articleList.length} articles found.\nCollecting front-matter properties.`
  );
  articleList.forEach(addArticleToSitemap);

  report('Generating JSON sitemap');
  writeFileSync(sitemapJsonPath, JSON.stringify(sitemap, null, 2), {
    encoding: 'utf-8',
  });

  report('Generating XML sitemap');
  const xmlContent = generateSitemapXml(sitemap);
  writeFileSync(sitemapXmlPath, xmlContent, { encoding: 'utf-8' });

  report(`Sitemap file generated at ${sitemapXmlPath} and ${sitemapJsonPath}`);
}

console.time('sitemap-build');
main();
console.timeEnd('sitemap-build');
