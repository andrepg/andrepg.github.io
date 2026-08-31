---
title: Renderização dos posts, metadados automáticos e SEO
published: true
published_at: 2026-08-08
tags:
  - development
  - software
  - vuejs
  - seo
  - markdown
serie: Um blog caseiro em VueJS e Markdown
serie_part: 4
category: Programação
excerpt: "Quarta parte. Como cada artigo vira uma página completa: resolução do módulo Markdown, transformação do HTML, highlight de código escopado e os metadados de SEO (OpenGraph, canonical e JSON-LD) gerados por arquivo."
---

# Introdução

> Esta parte é razoavelmente técnica. Os arquivos citados estão no [repositório](https://github.com/andrepg/andrepg.github.io).

Nas partes anteriores vimos o build SSG e a leitura dos posts. Agora a peça central: a página que renderiza cada artigo.

## A página do artigo: BlogArticleView

O [src/views/BlogArticleView.vue](https://github.com/andrepg/andrepg.github.io/blob/main/src/views/BlogArticleView.vue) resolve o post diretamente do mapa de módulos, usando os parâmetros da rota:

```ts
const route = useRoute()

const post = blogModules[`/blog/${route.params.year}/${route.params.article}.md`]

if (!post) {
  throw new Error(`Blog post not found: /blog/${route.params.year}/${route.params.article}`)
}

const metadata = post.attributes
const sanitizedContent = transformContent(post.html)
```

Se o arquivo não existe, a view falha na renderização — durante o SSG isso vira um erro de build, impedindo que uma rota quebrada chegue ao ar.

### A transformação do HTML

O HTML gerado pelo Markdown ainda passa por um pós-processamento no [plugins/transformers.ts](https://github.com/andrepg/andrepg.github.io/blob/main/plugins/transformers.ts), que:

- transforma `[x]` e `[ ]` em checkboxes reais no estilo da interface
- converte `[[#Seção]]` em links de âncora com slug
- adiciona um `id` slugificado a títulos sem `id` (base para as âncoras)
- adiciona `data-tip` aos `<abbr>`, para o tooltip

### O highlight de código escopado

O PrismJS precisa rodar depois que o HTML do artigo está no DOM. O detalhe importante é o **escopo**: `highlightAllUnder` só processa o conteúdo do artigo, sem tocar no resto da página, e o guard evita processar duas vezes:

```ts
const articleRef = ref<HTMLElement | null>(null)

onMounted(async () => {
  await nextTick()

  const article = articleRef.value
  if (!article) return
  if (article.querySelector('code .token')) return

  Prism.highlightAllUnder(article)
})
```

## Metadados de SEO por arquivo

O melhor da migração para o SSG: cada post agora tem seus próprios metadados, gerados automaticamente a partir do frontmatter. O [src/utils/blog-metadata.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/utils/blog-metadata.ts) monta o objeto completo para o `useHead`:

- `title` e `description` vindos do frontmatter
- `article:published_time`
- Open Graph (para Facebook e LinkedIn)
- Twitter Card
- `<link rel="canonical">` com a URL completa do post
- JSON-LD `BlogPosting` (schema.org)

```ts
export const getSinglePostTags = (metadata, canonicalUrl): ReactiveHead => ({
  title: metadata.title,
  meta: [
    { name: 'description', content: metadata.excerpt || BLOG_TITLE },
    { property: 'article:published_time', content: metadata.published_at || new Date().toISOString() },
    ...dtoPlainOg({
      title: metadata.title,
      description: metadata.excerpt || BLOG_TITLE,
      canonicalUrl,
    }),
    { property: 'og:image', content: UserConfig.website.image },
    ...dtoTwitterOg({
      card: 'summary',
      title: metadata.title,
      description: metadata.excerpt || BLOG_TITLE,
    }),
  ],
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: [{
    type: 'application/ld+json',
    textContent: getBlogPostingLdJson(metadata, canonicalUrl),
  }],
})
```

O `useHead` executa durante o build do SSG — as meta tags e o JSON-LD já saem gravados no HTML estático, sem depender de JavaScript para existirem.

## O índice de posts: BlogListView

O [src/views/BlogListView.vue](https://github.com/andrepg/andrepg.github.io/blob/main/src/views/BlogListView.vue) lista os posts publicados e permite filtrar por série, categoria e tag via query string:

```ts
const filteredPosts = computed(() => {
  const { series, category, tag } = route.query
  if (!series && !category && !tag) return posts

  return posts.filter(post => {
    const matchesSeries = !series || slugify(post.serie || '') === series
    const matchesCategory = !category || slugify(post.category || '') === category
    const matchesTag = !tag || (post.tags && post.tags.some(t => slugify(t) === tag))
    return matchesSeries && matchesCategory && matchesTag
  })
})
```

Os links gerados no artigo (por exemplo, para uma categoria) usam o mesmo formato de query, então a filtragem é profunda: o índice é apenas uma URL com parâmetros.

## O rodapé da série

Quando um post pertence a uma série, o rodapé lista os demais artigos usando `getPostsBySerie`:

```ts
const postsRelatedBySeries = getPostsBySerie(metadata.serie, canonicalUrl)
```

A ordenação pelo `serie_part` garante que a leitura siga a ordem certa — é isso que mantém esta série navegável.

## Conclusão

Cada artigo é uma página completa, com metadados próprios e highlight de código, tudo gerado no build. Na quinta e última parte, veremos o que mudou no deploy: a eliminação do hack do 404 e o fluxo de CI/CD.
