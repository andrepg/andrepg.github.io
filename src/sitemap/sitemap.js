import path from 'path'
import { fileURLToPath } from 'url'
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import FrontMatter from 'front-matter'

import { SitemapGenerator } from './SitemapGenerator.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const __blogRoot = `${__dirname}/../../blog/`
const __sitemap = `${__dirname}/../../public/sitemap.xml`
const __sitemapJson = `${__dirname}/../../public/sitemap.json`

let sitemap = []

function isArticle(path) {
  return lstatSync(__blogRoot + path).isFile() && !path.toString().includes('.json')
}

function getArticlesList() {
  return readdirSync(__blogRoot, { recursive: true }).filter((item) => isArticle(item))
}

function generateSitemap(sitemap) {
  return new SitemapGenerator({ host: 'https://andrepg.github.io/' }).generateSitemap(sitemap)
}

function report(message) {
  console.log(message)
}

function addArticleToSitemap(item) {
  const content = readFileSync(__blogRoot + item, 'utf8').toString()

  sitemap.push({
    path: item.replace('.md', ''),
    ...FrontMatter(content).attributes
  })

  report(`\tFile processed -> ${item}`)
}

function main() {
  report(`Building blog sitemap for ${__blogRoot}`)
  let articleList = getArticlesList()

  report(`\t${articleList.length} articles found.\nCollecting front-matter properties.`)
  articleList.forEach(addArticleToSitemap)

  report("Generating JSON sitemap")
  writeFileSync(__sitemapJson, JSON.stringify(sitemap), { encoding: 'utf-8' })

  report('Generating XML sitemap')
  sitemap = generateSitemap(sitemap)
  writeFileSync(__sitemap, sitemap, { encoding: 'utf-8' })

  report(`Sitemap file generated at ${__sitemap} and ${__sitemapJson}`)
}

console.time('sitemap-build')
main()
console.timeEnd('sitemap-build')
