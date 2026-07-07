# 💼 andrepg.github.io

My personal website, portfolio, and blog — built with **Vue 3 + Vite SSG** (Static Site Generation), powered by `vite-plugin-markdown` and PrismJS.

## 🧱 Architecture

This project uses **Vite SSG** (`vite-ssg`) to pre-render every route as static HTML at build time. Blog posts are written in Markdown (under `blog/`) and loaded at build time via Vite's glob import. The result is a fully static site deployable to GitHub Pages.

## 🤖 Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (disable Vetur) + [TypeScript Vue Plugin](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)
- Use the `.vscode/andrepg.code-workspace` file to open the project

## 🛠️ Project Setup

```sh
yarn install
```

### 💻 Development (Hot-Reload)

```sh
yarn dev
```

### 📤 Production Build (SSG)

```sh
yarn build
```

This runs `vite-ssg build` (generates static HTML) followed by `build-sitemap` (generates XML + JSON sitemaps).

### 🔍 Lint

```sh
yarn lint
```
