---
title: "Gerando o site no build: a virada para o SSG com Vite"
published: true
published_at: 2026-08-05
tags:
  - development
  - software
  - vite
  - vuejs
  - ssg
  - markdown
serie: Um blog caseiro em VueJS e Markdown
serie_part: 2
category: Programação
excerpt: "Segunda parte. Como o Vite SSG pré-renderiza o site no build: configuração dos plugins de Markdown e PrismJS, aliases de importação e a descoberta automática das rotas de blog."
---

# Introdução

> Esta parte é razoavelmente técnica e pressupõe um conhecimento básico de VueJS e do Vite. Links para as documentações e para o [código do repositório](https://github.com/andrepg/andrepg.github.io) são oferecidos como referência.

Na primeira parte vimos o problema: uma SPA não funciona bem no GitHub Pages. A solução foi transformar o site em uma aplicação gerada estaticamente no build — um SSG.

## O que é SSG

Um Static Site Generator transforma os componentes em HTML puro no momento do build. O resultado é um conjunto de arquivos HTML completos, prontos para qualquer hospedagem estática — incluindo o GitHub Pages.

Usamos o [vite-ssg](https://github.com/antfu-collective/vite-ssg), que aproveita toda a configuração do Vite e adiciona a etapa de pré-renderização das rotas. Depois do build, cada rota vira um arquivo `dist/<rota>/index.html` com o conteúdo completo.

## O coração da configuração: vite.config.ts

O arquivo [vite.config.ts](https://github.com/andrepg/andrepg.github.io/blob/main/vite.config.ts) concentra três responsabilidades: os plugins, os aliases de importação e as opções do SSG.

```ts
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    markdown(MarkdownRenderConfig),
    prismjsPlugin(PrismJsConfig),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@data': path.resolve(__dirname, 'src/data'),
      '@blog': path.resolve(__dirname, 'blog'),
      '@public': path.resolve(__dirname, 'public'),
      '@config': path.resolve(__dirname, 'config'),
      '@plugins': path.resolve(__dirname, 'plugins'),
    },
  },
  ssgOptions: {
    includedRoutes: getRouteConfig,
    concurrency: 2,
  },
})
```

### O plugin de Markdown

O [markdown-render.config.ts](https://github.com/andrepg/andrepg.github.io/blob/main/plugins/markdown-render.config.ts) define como os arquivos `.md` são lidos:

```ts
export const MarkdownRenderConfig = {
  mode: [Mode.HTML, Mode.TOC, Mode.VUE],
  markdownIt: {
    typographer: true,
    linkify: true,
    html: true,
    xhtmlOut: true,
  },
}
```

Os três modos ativados resolvem cenários diferentes:

- `Mode.HTML`: converte o Markdown em HTML (disponível em `post.html`)
- `Mode.TOC`: gera a tabela de conteúdo
- `Mode.VUE`: permite importar o `.md` como componente Vue

Com o `vite-plugin-markdown`, cada arquivo importado expõe os atributos do frontmatter e o HTML renderizado — é exatamente disso que as views do blog precisam.

### O plugin do PrismJS

O [primsjs.config.ts](https://github.com/andrepg/andrepg.github.io/blob/main/plugins/primsjs.config.ts) configura o highlight de código:

```ts
export const PrismJsConfig = {
  css: true,
  theme: 'tomorrow',
  languages: SupportedLanguages,
  plugins: SupportedPlugins,
}
```

São 20 linguagens declaradas explicitamente (evita inflar o bundle com tudo) e três plugins: `show-language`, `line-numbers` e `match-braces`.

## O bootstrap duplo em main.ts

O arquivo [src/main.ts](https://github.com/andrepg/andrepg.github.io/blob/main/src/main.ts) precisa funcionar em dois cenários:

- **Desenvolvimento**: um router clássico com `createRouter` e `createWebHistory`
- **Produção/build**: o `ViteSSG` fazendo a pré-renderização

```ts
const scrollBehavior = () => ({ top: 0 })

const bootstrapDevelopmentMode = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: ApplicationRouter,
    scrollBehavior,
  })

  createVueApp(App).use(router).use(createHead()).mount('#app')
}

const bootstrapProductionMode = () =>
  ViteSSG(App, {
    routes: ApplicationRouter,
    base: APP_CONFIG.BASE_URL ? new URL(APP_CONFIG.BASE_URL).pathname : '/',
    scrollBehavior,
  })

if (APP_CONFIG.IS_DEV) {
  bootstrapDevelopmentMode()
} else {
  vueApp = bootstrapProductionMode()
}
```

O `base` é derivado da URL configurada (`APP_CONFIG.BASE_URL`), o que permite hospedar tanto no domínio customizado quanto no path do GitHub Pages.

## Descobrindo as rotas automaticamente

A parte mais interessante: em vez de declarar cada rota de post manualmente, o SSG varre o diretório `blog/` durante o build. O [plugins/ssg.ts](https://github.com/andrepg/andrepg.github.io/blob/main/plugins/ssg.ts) tem três funções:

```ts
export const getMarkdownBlogRoutes = ({ searchPath, rootPath = searchPath, fileList = [] }) => {
  const directoryContent = readdirSync(searchPath, { withFileTypes: true })

  directoryContent.forEach((item) => {
    const fullPath = path.join(searchPath, item.name)

    if (item.isDirectory()) {
      getMarkdownBlogRoutes({ searchPath: fullPath, rootPath, fileList })
      return
    }

    if (item.isFile() && item.name.endsWith('.md')) {
      const relativePath = path.relative(rootPath, fullPath)
        .replaceAll(/\\/g, '/')
        .replace('.md', '')

      fileList.push(`/blog/${relativePath}`)
    }
  })

  return fileList
}
```

`getMarkdownBlogRoutes` percorre as pastas recursivamente e devolve rotas como `/blog/2024/meu-post`. `getWebsiteRoutes` filtra apenas as rotas estáticas do roteador (sem parâmetros `:`). E `getRouteConfig` une as duas listas:

```ts
export const getRouteConfig = () => {
  const blogRoutes = getMarkdownBlogRoutes({
    searchPath: path.resolve(process.cwd(), 'blog'),
  })

  const staticRoutes = getWebsiteRoutes()

  return Array.from(new Set([...staticRoutes, ...blogRoutes]))
}
```

O `concurrency: 2` limita a renderização paralela de rotas: cada processo de build gasta CPU significativa com o PrismJS e o processamento de Markdown, e os runners do GitHub Actions têm poucos núcleos.

## O resultado

Rodando `yarn build`, o `vite-ssg` gera um arquivo HTML completo para cada rota. Na terceira parte, veremos a estrutura de pastas, o frontmatter e a automação do sitemap.
