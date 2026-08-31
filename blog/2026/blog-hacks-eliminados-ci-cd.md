---
title: Hacks eliminados, CI/CD e o que vem pela frente
published: true
published_at: 2026-08-09
tags:
  - development
  - software
  - ci-cd
  - github-actions
  - github-pages
serie: Um blog caseiro em VueJS e Markdown
serie_part: 5
category: Programação
excerpt: "Última parte. A eliminação definitiva do hack do 404.html, o fluxo de deploy com GitHub Actions e o que ainda está por vir para o blog."
---

# Introdução

> Esta parte é razoavelmente técnica. Os arquivos citados estão no [repositório](https://github.com/andrepg/andrepg.github.io).

Na primeira parte vimos o hack do `404.html` que mantinha a SPA viva no GitHub Pages. Com o SSG, ele não é mais necessário — e foi eliminado por completo.

## Por que o hack morreu

Com cada rota gerada como um arquivo HTML real no build, o GitHub Pages encontra o arquivo correspondente a cada URL:

```text
dist
├── blog
│   ├── 2024
│   │   └── meu-post
│   │       └── index.html   # /blog/2024/meu-post
│   └── index.html           # /blog
├── index.html               # /
└── 404.html
```

Ao abrir `/blog/2024/meu-post` direto, o servidor entrega o `index.html` daquela pasta. Sem redirecionamentos, sem `sessionStorage`, sem `history.replaceState`. O link direto simplesmente funciona.

As mudanças no projeto foram:

- **`index.html`**: removido o script de recuperação de rota via `sessionStorage`
- **`public/404.html`**: removido o bloco de redirecionamento para `blog` e `curriculo`; restou apenas a página visual de erro e um `noscript`

O resultado é um site mais previsível: se uma URL existe, responde 200; se não existe, responde 404 de verdade — que é o comportamento correto.

## O deploy com GitHub Actions

O fluxo de publicação vive em [.github/workflows/gh-pages.yml](https://github.com/andrepg/andrepg.github.io/blob/main/.github/workflows/gh-pages.yml) e tem duas particularidades importantes.

### 1. As variáveis de ambiente do build

O `VITE_BASE_URL` e o `VITE_ENV` são definidos no ambiente do job:

```yaml
env:
  VITE_ENV: production
  VITE_BASE_URL: ${{ vars.VITE_BASE_URL || 'https://andrepg.github.io' }}
```

O `VITE_BASE_URL` alimenta o `base` do `vite-ssg` (visto na segunda parte) e o `APP_CONFIG`. No repositório há uma variable `VITE_BASE_URL` configurada com o domínio customizado — o fallback cobre a execução em forks.

O `VITE_ENV=production` é essencial: ele desliga o modo de desenvolvimento e obriga o código a rodar pelos caminhos de produção — incluindo o `bootstrapProductionMode` do `main.ts` e, por exemplo, inicializar a camada de analytics apenas no `onMounted`, para não tocar no `window` durante a pré-renderização.

### 2. Build determinístico

O `yarn.lock` está commitado no repositório, e o install é feito com `--frozen-lockfile`. Isso garante que o build local e o build do CI usem exatamente as mesmas versões de dependências — sem "funciona na minha máquina".

## O que vem pela frente

O blog ainda tem espaço para crescer:

- **Busca**: integração com Algolia, ou uma alternativa local, aproveitando o índice JSON já gerado pelo sitemap
- **Página de projetos**: os destaques do portfólio como páginas próprias
- **Currículo**: versão nova, agora como página estática indexável

E a série termina onde começou: um blog escrito em Markdown, hospedado no GitHub Pages, sem banco de dados e sem hacks — cada artigo gerando sua própria página automaticamente. Espero que tenha ajudado a entender como construir um blog estático, mas dinâmico, usando VueJS!
