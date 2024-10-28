import path from 'path'
import { fileURLToPath } from 'url'
import { lstatSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import FrontMatter from 'front-matter'

import { SitemapGenerator } from './SitemapGenerator.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const __blogRoot = `${__dirname}/../blog/`
const __sitemap = `${__dirname}/../public/sitemap.xml`

let sitemap = []

function isArticle(path) {
  return lstatSync(__blogRoot + path).isFile()
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

function readArticleProperties(item) {
  const content = readFileSync(__blogRoot + item, 'utf8').toString()

  sitemap.push({
    path: item,
    ...FrontMatter(content).attributes
  })

  report(`\tFile processed ->> ${item}`)
}

function main() {
  report(`Building blog sitemap for ${__blogRoot}`)
  let references = getArticlesList()

  report(`\t${references.length} articles found.\nCollecting front-matter properties.`)
  references.forEach(readArticleProperties)

  report('Generating sitemap file')
  sitemap = generateSitemap(sitemap)
  writeFileSync(__sitemap, sitemap, { encoding: 'utf-8' })

  report(`Sitemap file generated at ${__sitemap}`)
}

console.time('sitemap-build')
main()
console.timeEnd('sitemap-build')
