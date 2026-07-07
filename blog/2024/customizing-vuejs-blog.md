---
title: Como construí este blog em VueJS + Markdown - Customizações e Dicas
published: true
published_at: 2024-12-18
tags:
  - development
  - software
  - vuejs
  - markdown
serie: Um blog feito em casa
serie_part: 3
category: Programação
excerpt: Finalizando a série com detalhes sobre renderização de posts, indexação e o hack de redirecionamento para o GitHub Pages.
---

# 📝 Customizações e Renderização

Chegamos à parte final da nossa série. Já temos o setup e a estrutura. Agora vamos ver como o blog realmente exibe os posts e como resolvemos problemas específicos de hospedagem.

## Post Index
🌐 https://github.com/andrepg/andrepg.github.io/blob/main/src/views/PostIndex.vue

Para o índice de postagens, a construção do mapa em formato JSON que vimos no artigo anterior permite a leitura nesta página. Para cumprir esta tarefa, fazemos uma requisição simples ao arquivo gerado:

```jsx
// Fetch do arquivo Sitemap.json, direto da raiz do site
const fetchPosts = () => fetch('/sitemap.json')
  .then(response => processPosts(response))

// Processamento da resposta da requisição e leitura
const processPosts = (response: Response) => response.json()
  .then(sitemap => posts.value = sitemap)
```

Note duas funções diferentes: a `fetchPosts` e a `processPosts`. Ao final, o valor de `sitemap` atribuído a `posts.value` conterá o mapa completo do site. Na renderização, utilizamos uma iteração sobre cada post obtido, usando componentes como o `PostSingleFeature`.

## Post Single
🌐 https://github.com/andrepg/andrepg.github.io/blob/main/src/views/PostSingle.vue

O `PostSingle` é o componente onde ocorre a leitura de cada artigo e a renderização. A mágica é feita pelo `vite-plugin-markdown` e o `PrismJS` para o highlight.

```javascript
import { nextTick, onMounted } from 'vue';
import Prism from 'prismjs';

onMounted(async () => {
  Prism.manual = true;

  content.value = await import(`@blog/${year}/${article}.md`);

  nextTick(() => {
    Prism.highlightAll()
  })
})
```

E no template, acessamos os atributos do FrontMatter:

```html
<h1 class="text-3xl font-semibold flex flex-col">
	<span class="font-serif"> {{ content.attributes.titulo }}</span>
	<small class="w-full font-normal text-base leading-snug flex-1">
		{{ content.attributes.serie }}
	</small>
</h1>
```

# 🟡 A limitação do GitHub Pages

O GitHub Pages tem problema com aplicações SPA e redirecionamentos para rotas (como `/blog/2024/meu-post`). Se o usuário recarregar a página, o GitHub retorna 404.

## O Hack do 404.html
📚 https://github.com/andrepg/andrepg.github.io/blob/main/public/404.html

Para contornar isso, usamos um arquivo `404.html` que redireciona de volta para a index, preservando a rota original. O código principal é:

```js
const resource = location.href;

if (resource.includes('blog')) {  
  sessionStorage.redirect = resource  
  
  refresh = document.createElement('meta')  
  refresh.content = '0;URL=\'/\''  
  refresh.httpEquiv = 'refresh'  
  
  document.head.append(refresh)  
}
```

Isso salva a URL na sessão e recarrega a Home. No `main.js` ou no Router, você pode verificar se existe um `sessionStorage.redirect` e navegar para lá.

# 💼 O projeto final

O projeto em sua forma final permite que eu escreva no Obsidian e publique no GitHub. Tenho histórico, backup e total controle.

## Minhas considerações e futuro

Ainda há tarefas pendentes para melhorar a experiência:

1. [x] O rodapé não aparece na página `404`
2. [ ] O redirecionamento `404 meta-refresh` causa uma piscadela
3. [ ] Uma transição entre as páginas seria bem-vinda
4. [ ] Busca com Algolia ou outro mecanismo local 
5. [ ] Postagens mais recentes na página inicial

Espero que essa série tenha ajudado a entender como construir um blog estático, mas dinâmico, usando VueJS! 😄
