---
title: "Um blog caseiro no GitHub Pages: o cenário e o problema"
published: true
published_at: 2026-08-05
tags:
  - development
  - software
  - github-pages
  - vuejs
  - seo
serie: Um blog caseiro em VueJS e Markdown
serie_part: 1
category: Programação
excerpt: "Primeira parte da série. Por que manter um blog em Markdown hospedado no GitHub Pages e os dois problemas que a abordagem SPA trouxe: links diretos quebrados e SEO praticamente inexistente."
---

# Introdução

> O texto a seguir é razoavelmente técnico e pressupõe um conhecimento básico de programação. Todo o código está disponível no [meu repositório GitHub](https://github.com/andrepg/andrepg.github.io).

Esta é a primeira parte de uma série onde conto como este blog funciona hoje: estático, gerado no build, sem banco de dados e sem hacks para enganar o servidor do GitHub Pages.

Começamos pelo começo: por que um blog caseiro, e por que a primeira tentativa — uma SPA — não era a resposta.

## O cenário de trabalho

Um site de portfólio com blog, hospedado no GitHub Pages desde o início e já com URL divulgada. O conteúdo do blog é escrito em Markdown e armazenado junto ao código do projeto.

Isso simplifica o fluxo: escrevo localmente, adiciono o arquivo ao repositório e publico. A proposta sempre foi simples — cada artigo deve gerar sua própria página automaticamente.

Algumas circunstâncias foram importantes para esta decisão:

1. A hospedagem é feita pelo GitHub Pages e, portanto, não há banco de dados
2. Já existia um SPA com meu cartão de visitas online
3. Sem banco de dados é impossível algo como WordPress — são recursos demais para um simples blog
4. Os arquivos em Markdown já fazem parte do meu fluxo de escrita (Obsidian)

## A solução anterior: SPA com VueJS

O site era um SPA clássico: um único `index.html` carregando o JavaScript responsável por renderizar as páginas dinamicamente com base na URL.

Esse modelo funciona bem em praticamente qualquer ambiente — **menos no GitHub Pages**.

### Particularidades do GitHub Pages

O GitHub Pages é excelente para conteúdo estático. Aplicações SPA **não são páginas estáticas**: dependem de um manejo no servidor para redirecionar as requisições ao `index.html`, sempre.

O problema aparece quando abro uma página direto, pela URL. Em vez de deixar o Vue tomar conta, o servidor tenta localizar um arquivo HTML correspondente à URL. Como não existe redirecionamento nativo para `index.html`, o resultado é erro 404.

Isso quebrava o fluxo completo de navegação.

## O hack do 404.html

Para contornar, implementei um hack via `404.html`, capturando a rota original e redirecionando manualmente:

```js
/**
 * public/404.html
 */
const resource = location.href

if (resource.includes('blog') || resource.includes('curriculo')) {
  // Salva como `redirect` a página atual, que resultou em 404
  sessionStorage.setItem('redirect', resource)

  // Cria um elemento meta refresh para redirecionar
  // o usuário à homepage, sem delay
  const refresh = document.createElement('meta')
  refresh.content = "0;URL='/'"
  refresh.httpEquiv = 'refresh'

  document.head.appendChild(refresh)
  window.location.replace('/')
}
```

Do lado do `index.html`, outro trecho de script recuperava a rota salva e a restaurava na URL:

```js
/**
 * index.html
 */
const redirect = sessionStorage.getItem('redirect')

// Remove valor persistido e limpa histórico do usuário
if (redirect !== location.href) {
  sessionStorage.removeItem('redirect')
  history.replaceState(null, null, redirect)
}
```

Funciona? **Sim**. É bonito? **Não**. Frágil? **Também**.

## Os problemas dessa abordagem

- **SEO praticamente inexistente**: nenhuma página possuía metadados adequados (OpenGraph, `<head>` correto, etc). Para robôs e mecanismos de pesquisa, todas as páginas eram iguais: mesmo título, mesma descrição, mesma data de publicação.
- **Redirecionamento frágil**: o `meta refresh` causa uma piscadela visível, o estado salvo em `sessionStorage` depende do fluxo exato de sessão e qualquer mudança no servidor quebra o mecanismo.
- **Conteúdo dependente de JavaScript**: sem JS, o visitante (ou o robô de busca) não vê nada além da casca vazia da aplicação.

## O que vem a seguir

A solução foi simples e direta: em vez de depender do Vue no navegador, gerar tudo no build. É isso que veremos na segunda parte — a migração para o SSG com Vite.
