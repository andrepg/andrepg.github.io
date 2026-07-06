---
title: Como construí este blog em VueJS + Markdown - Estrutura e Sitemap
published: true
published_at: 2024-12-18
tags:
  - development
  - software
  - vuejs
  - markdown
serie: Um blog feito em casa
serie_part: 2
category: Programação
excerpt: Segunda parte explorando como organizei a estrutura de pastas e automatizei a geração do sitemap para o blog.
---

# 📝 A estrutura de blog

Uma vez com extensões instaladas, configurações feitas e uma página inicial capaz de ler um conteúdo básico, partimos para a estrutura do blog e outras criações para possibilitar isto.

No artigo anterior vimos o setup básico. Agora, vamos falar sobre a organização dos arquivos e a automação do sitemap.

Copiando estruturas básicas de outros sistemas de blog, a decisão foi feita em prol de uma pasta `blogs` (que no projeto atual é `blog/`), contendo os artigos agrupados por ano. Assim, seria possível organizar melhor o repositório. A estrutura de pastas ficaria:

```text
blog
|
 _[ 2024 ]
  |--- artigo-1.md
  |--- artigo-2.md
  |--- artigo-3.md
 /
 _[ 2023 ]
  |--- artigo-1.md
  |--- artigo-2.md
  |--- artigo-3.md
```

Com esta estrutura em mente, é preciso lembrar que um blog tem certos requisitos básicos para existir: um mapa de links, um índice, uma página de post e uma busca. 

## Publicações e organizações

Seguindo a premissa de pastas e requisitos, o primeiro passo seria a construção do sitemap, responsável por alimentar tanto o índice quanto robôs leitores de conteúdo. Em dois formatos: JSON e XML. Fazer esse controle manual é humanamente impossível depois de alguns poucos artigos. Automatizar é a chave.

## Sitemap
> 📚  [`Sitemap Generator`](https://github.com/andrepg/andrepg.github.io/blob/main/src/SitemapGenerator.js) e gatilho [`sitemap.js`](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.js)

Para a construção do mapa, a premissa é básica: ler as pastas e arquivos dentro de `blog` e gerar os arquivos necessários. Em partes, o `sitemap.js` tem um ponto de entrada `main()`, responsável pelos processos básicos. 

```js
function main() {
	let references = getArticlesList()	
	references.forEach(readArticleProperties)	
	
	writeFileSync(__sitemapJson, JSON.stringify(sitemap), { encoding: 'utf-8' })
	sitemap = generateSitemap(sitemap)	
	writeFileSync(__sitemap, sitemap, { encoding: 'utf-8' })
}
```

Informações básicas: `writeFileSync` é uma função específica da plataforma para escrever arquivos no sistema. Estas duas linhas geram os arquivos XML e JSON, baseadas em seus próprios parâmetros. Nesta configuração, os arquivos serão exportados para `/public` no projeto. As funções `generateSitemap` e o combo `getArticlesList`/`readArticleProperties` estão no mesmo arquivo.

Estas três tem funções muito específicas:
* [`getArticlesList`](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.js) busca os arquivos na pasta de blog, somente arquivos
* [`readArticleProperties`](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.js) faz a leitura do arquivo `.md` e implementa as propriedades do FrontMatter 
* [`generateSitemap`](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.js) utiliza a classe `SitemapGenerator` para estruturar a versão XML do mapa

Este calhamaço de informação fica armazenado numa variável global `sitemap`, inicializada como um `array` vazio, logo no início do código. Esta variável é a mesma que aparece no corpo da `main()`, exportada pelo `writeFileSync`.

No próximo artigo, veremos como renderizamos esses posts e como lidamos com as limitações do GitHub Pages.
