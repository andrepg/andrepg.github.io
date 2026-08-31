---
title: Estrutura, frontmatter e o sitemap automático
published: true
published_at: 2026-08-07
tags:
  - development
  - software
  - vite
  - sitemap
  - markdown
serie: Um blog caseiro em VueJS e Markdown
serie_part: 3
category: Programação
excerpt: "Terceira parte. A organização dos artigos em pastas por ano, os atributos de frontmatter que alimentam a interface e a geração automática dos sitemaps JSON e XML a partir do build."
---

# Introdução

> Esta parte é razoavelmente técnica. Os arquivos citados estão no [repositório](https://github.com/andrepg/andrepg.github.io).

Já temos o build gerando HTML estático. Agora: como os artigos são organizados, lidos e indexados.

## A estrutura de pastas

Copiando estruturas básicas de outros sistemas de blog, a decisão foi agrupar os artigos por ano:

```text
blog
├── 2024
│   ├── artigo-1.md
│   └── artigo-2.md
└── 2026
    ├── artigo-3.md
    └── artigo-4.md
```

O ano da pasta vira o primeiro segmento da URL (`/blog/2024/artigo-1`). Isso mantém o repositório organizado e dá contexto temporal aos posts.

## O frontmatter

Cada arquivo começa com um bloco de atributos que alimenta a interface, os metadados de SEO e o sitemap:

```yaml
---
title: Como construí este blog
published: true
published_at: 2026-08-05
category: Programação
tags:
  - development
  - software
  - vuejs
serie: Um blog caseiro em VueJS e Markdown
serie_part: 1
excerpt: Resumo exibido nos cards e nos metadados.
---
```

O `serie` e o `serie_part` permitem agrupar artigos em séries e ordená-los na seção "restante da série" — é assim que esta série é montada.

## Lendo os artigos: blog-reader.ts

O [src/utils/blog-reader.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/utils/blog-reader.ts) é o ponto único de leitura. A chave é o `import.meta.glob` do Vite, que carrega todos os arquivos `.md` de forma síncrona:

```ts
export const blogModules: Record<string, IPostMarkdown> =
  import.meta.glob('/blog/**/*.md', { eager: true })

export const allPosts: IPost[] = Object.entries(blogModules)
  .map(([fullPath, mod]) => {
    const cleanPath = fullPath.replace('/blog/', '').replace('.md', '')
    const [year, slug] = cleanPath.split('/')

    return {
      path: `/blog/${year}/${slug}`,
      year,
      slug,
      title: mod.attributes.title,
      excerpt: mod.attributes.excerpt,
      serie: mod.attributes.serie,
      serie_part: mod.attributes.serie_part,
      tags: mod.attributes.tags,
      category: mod.attributes.category,
      published_at: mod.attributes.published_at,
    }
  })
  .sort((a, b) => (b.published_at ?? '').localeCompare(a.published_at ?? ''))
```

A partir dessa lista, três funções atendem os cenários da interface:

- `getPublished()`: filtra apenas os posts com `published_at` definido
- `getRecentPosts(count)`: os mais recentes, para a página inicial
- `getPostsBySerie(serie, excludePath)`: os demais posts de uma série, ordenados por `serie_part`

## O sitemap automático

Para os robôs e para a indexação, o blog gera dois sitemaps: JSON e XML. E aqui vem uma decisão importante: em vez de ler os arquivos `.md` na raiz do projeto, o gerador **caminha pelo diretório `dist/`** — o build já fez o trabalho de processar o conteúdo.

O [src/sitemap.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.ts) é o orquestrador:

```ts
const DIST_DIR = path.resolve(process.cwd(), 'dist')

const fileTree = getFileTree(DIST_DIR)
const jsonRecordsProcessed = generateJsonSitemap(fileTree, DIST_DIR)
const xmlRecordsProcessed = generateXmlSitemap(fileTree, DIST_DIR)
```

### A leitura recursiva

O [sitemap.generator.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap/sitemap.generator.ts) caminha pelas pastas ignorando o que não interessa:

```ts
const IGNORED = [
  '.vite',
  '404.html',
  'sitemap.xml',
  'sitemap.json',
  'assets',
  'site.webmanifest',
]

export const getFileTree = (currentDirectory) => {
  if (!fileExists(currentDirectory)) return []

  let tree = readDirectory(currentDirectory)
  tree = filterOutIgnoredFiles(tree).map(item => path.join(currentDirectory, item))
  tree = tree.flatMap(item => isDirectory(item) ? getFileTree(item) : item)

  return filterFilesByExtension(tree, ['.html'])
}
```

### Módulos com responsabilidade única

- [sitemap.file-io.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap/sitemap.file-io.ts): leitura e escrita de arquivos, nada mais
- [sitemap.json.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap/sitemap.json.ts): gera o `sitemap.json` a partir da árvore de arquivos
- [sitemap.xml.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap/sitemap.xml.ts): gera o `sitemap.xml` a partir da árvore de arquivos

Um pequeno, mas importante detalhe: `sitemap.xml.ts` lê os resultados gerados por `sitemap.json.ts` para economizar tempo computacional — o JSON carrega os metadados (título, descrição, datas) e o XML apenas reescreve no formato esperado pelos robôs.

O comando roda depois do build:

```json
"scripts": {
  "build": "vite-ssg build && yarn build-sitemap",
  "build-sitemap": "tsx src/sitemap.ts"
}
```

### Um detalhe do Node

Os módulos do sitemap são executados fora do Vite (via `tsx`), então as importações precisam de extensões explícitas: no Node com ESM, `./sitemap.json.ts` não pode ser importado como `./sitemap.json`. No [sitemap.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.ts) a importação é feita com o sufixo completo:

```ts
import { generateXmlSitemap } from "./sitemap/sitemap.xml.ts";
```

## Conclusão

Com a estrutura de pastas, o frontmatter e o sitemap automáticos, o blog se mantém sozinho: escrevo o Markdown, publico e os mapas são atualizados no build. Na quarta parte, veremos como cada post é renderizado e como os metadados de SEO são gerados por arquivo.
