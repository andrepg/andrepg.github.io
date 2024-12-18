---
title: Como construí este blog em VueJS + Markdown puro!
published: true
published_at: 2024-12-18
tags:
  - development
  - software
  - git
  - vuejs
  - markdown
serie: Um blog feito em casa
category:
  - Programação
excerpt: Depois de inúmeras tentativas de construir e manter um blog, decidi reinventar a roda e manter a minha própria aplicação.
---
# 💡Introdução

> 🟨 O texto a seguir é razoavelmente técnico e pressupõe um conhecimento básico de programação. Alguns documentos e links são oferecidos como referência, além de todo o código do [meu repositório GitHub](https://github.com/andrepg/andrepg.github.io). 


Começamos pelas razões e objetivos principais: *ter um blog simples, junto ao meu cartão de visitas online*. Muitas tentativas foram feitas: Jekyll, HTML básico, WordPress, VueJS. Por fim, resolvi seguir o caminho do SPA VueJS e Markdown. Algumas circunstâncias foram importantes para esta decisão e, no futuro, estão passíveis de revisão: 

1. A hospedagem inicial é feita pelo GitHub Pages e, portanto, não há banco de dados
2. Já existia um SPA com meu cartão de visitas, e o VuePress parecia complexo para adoção em projetos existentes
3. Sem banco de dados é impossível construir algo com WordPress — e são recursos demais para um simples blog.
4. O uso do SPA + GitHub me permitiu ter os arquivos em Markdown (e já os escrevo no Obsidian neste mesmo formato)

# 🛠 Pacotes para instalar
Algumas dependências e pacotes são básicas para o funcionamento do framework; aprofundar neste quesito não é o foco do artigo. Vale a pena mencionar, no entanto. Isso dá contexto a diferentes classes e configurações utilizadas ao longo deste texto.

## O básico para começar
Aqui temos a composição da espinha dorsal do projeto, com suas respectivas páginas de documentação. Minha recomendação é ler com atenção as documentações e instruções de cada uma destas para ambientar-se no projeto.

* [Vite](https://vite.dev/)
* [VueJS](https://vuejs.org/) e [Vue Router](https://router.vuejs.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [Node](https://nodejs.org/) e [Yarn](https://yarnpkg.com/) (ou NPM se preferir)

## O plugin para ler Markdown
🌐 https://www.npmjs.com/package/vite-plugin-markdown

Com um papel importante no projeto, o plugin Vite Markdown permite a importação de arquivos `.md` e seus atributos de *FrontMatter* ([🔍 pesquise um pouco](https://www.google.com/search?q=atributos+frontmatter)). Estes atributos permitem categorizar, definir títulos, datas e outras informações úteis para a renderização. 

Para instalar o plugin, basta um comando: `yarn add vite-plugin-markdown`. As configurações faremos depois, no arquivo específico alguns parágrafos à frente. 

## O plugin para formatar código-fonte
🌐 https://prismjs.com/

Existe um conceito chamado **[🔍 Codefence](https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/creating-and-highlighting-code-blocks)**: um trecho de código formatado especialmente, conforme a linguagem, para facilitar a leitura do código. Este comportamento envolve muito código para reinventar a roda. Assim, a decisão foi por adotar uma extensão para esta formatação.

O PrismJS inclui os arquivos JavaScript, folhas de estilo, e outras necessidades para correta formatação, gerando o código visto na seção **[[#Configurações do Vite]]**. Algumas personalizações foram necessárias e estão disponíveis no arquivo [📚 settings.jsx](https://github.com/andrepg/andrepg.github.io/blob/main/src/data/settings.jsx) do repositório.

São detalhes relacionados a linguagens suportadas pela extensão, bem como adicionais de formatação, numeração e outros.

## Configurações do Vite
Extensões instaladas, agora as configurações: para `Markdown` e `PrismJS`. O trecho abaixo ativa os modos HTML, <abbr title="Tabela de conteúdo">TOC</abbr> e Vue para leitura de arquivos `.md`.

```javascript
	// mais em https://github.com/andrepg/andrepg.github.io/blob/main/vite.config.js
    markdown({
      mode: [Mode.HTML, Mode.TOC, Mode.VUE]
    }),
```

Já este trecho permite configurar o PrismJS com injeção de CSS, tema e linguagens, configurados anteriormente no `settings.jsx`.

```js
    prismjsPlugin({
      css: true,
      theme: 'tomorrow',
      languages: PrismJsLanguages,
      plugins: PrismJsPlugins
    })
```

Com isto é possível integrar tudo que instalamos e avançar para a mão no código. 

> 🟡 Fique atento! Nesta fase ainda não é possível ver nenhum tipo de integração funcionando. Apenas instalação e configurações foram feitas.

# 📝 A página inicial

> Esta seção serve apenas para apresentar meu website, e introduzir um pouco da estrutura básica. Se preferir, você pode pular para a seção [[#📝 A estrutura de blog]]

Seguindo os passos de um desenvolvimento natural de website, o ponto de partida é a **página inicial**. Um desenho básico (que pode ser visto [aqui](https://andrepg.github.io)). Esta página está construída em VueJS e Tailwind, utilizando conceitos básicos. Também não entrarei em muitos detalhes, apenas dois: a geração automática de seções:

## Os botões & seções adicionais
Para renderizar alguns botões e redirecionar o visitante (já que esta página serve apenas para isto) existe a estrutura de leitura de objetos simples e renderização de botões. O arquivo [📚 homepageLinks](https://github.com/andrepg/andrepg.github.io/blob/main/src/data/homepageLinks.js) possui configurações para cada um dos botões renderizados. Cada botão tem as seguintes propriedades:

```json
{
	label: 'GitHub',
	icon: 'hugeicons:github',
	target: 'https://github.com/andrepg'
}
```

E para renderizar os botões, utilizamos o seguinte código na [HomeView.vue](https://github.com/andrepg/andrepg.github.io/blob/db998354a4bcd5cc123bd10aaf9c954494f1db97/src/views/HomeView.vue):

```jsx
<PrimaryButton 
	v-for="button in HomepageLinks" 
	:key="button.target"
    :icon="button.icon" 
    :target="button.target">
    {{ button.label }}
</PrimaryButton>
```

Com isto conseguimos a estrutura de gerar botões e adicionar quantos necessários, sem a que seja preciso modificar o código a cada novo link. Estas modificações são feitas no arquivo `homepageLinks.js`.

---
# 📝 A estrutura de blog,

Uma vez com extensões instaladas, configurações feitas e uma página inicial capaz de ler um conteúdo básico, partimos para a estrutura do blog e outras criações para possibilitar isto.

No início comentei que parecia trabalho demais instalar o VitePress. Isso porque não pude encontrar nenhuma documentação clara suficiente sobre o assunto, apenas sobre instalações em sub-páginas, separadas. Isso traz a obrigação de ter um pipeline a mais, e cria mais complexidade para o projeto.

Copiando estruturas básicas de outros sistemas de blog, a decisão foi feita em prol de uma pasta `blogs`, contendo os artigos agrupados por ano. Assim, seria possível organizar melhor o repositório (já que a frequência de postagens não é, assim, tão grande). A estrutura de pastas ficaria:

```
blogs
|
 \_[ 2024 ]
  |--- artigo-1.md
  |--- artigo-2.md
  |--- artigo-3.md
 /
 \_[ 2023 ]
  |--- artigo-1.md
  |--- artigo-2.md
  |--- artigo-3.md
```

Com esta estrutura em mente, é preciso lembrar que um blog tem certos requisitos básicos para existir: um mapa de links, um índice, uma página de post e uma busca. Os recursos serão construídos ao longo do tempo e fazem parte da evolução natural do projeto.

## Publicações e organizações

Seguindo a premissa de pastas e requisitos, o primeiro passo seria a construção do sitemap, responsável por alimentar tanto o índice quanto robôs leitores de conteúdo. Em dois formatos: JSON e XML. Fazer esse controle manual é humanamente impossível depois de alguns poucos artigos. Automatizar é a chave.

## Sitemap
> 📚  [`Sitemap Generator`](https://github.com/andrepg/andrepg.github.io/blob/main/src/SitemapGenerator.js) e gatilho [`sitemap.js`](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.js)

Para a construção do mapa, a premissa é básica: ler as pastas e arquivos dentro de `blog` e gerar os arquivos necessários. Em partes, o `sitemap.js` tem um ponto de entrada `main()`, responsável pelos processos básicos. Para fins de apresentação, não há comentários e registros de log. 

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
* [`getArticlesList`](https://github.com/andrepg/andrepg.github.io/blob/db998354a4bcd5cc123bd10aaf9c954494f1db97/src/sitemap.js#L21) busca os arquivos na pasta de blog, somente arquivos
* [`readArticleProperties`](https://github.com/andrepg/andrepg.github.io/blob/db998354a4bcd5cc123bd10aaf9c954494f1db97/src/sitemap.js#L33-L42) faz a leitura do arquivo `.md` e implementa as propriedades do FrontMatter 
* [`generateSitemap`](https://github.com/andrepg/andrepg.github.io/blob/db998354a4bcd5cc123bd10aaf9c954494f1db97/src/sitemap.js#L25-L27) utiliza a classe `SitemapGenerator` para estruturar a versão XML do mapa

Este calhamaço de informação fica armazenado numa variável global `sitemap`, inicializada como um `array` vazio, logo no início do código. Esta variável é a mesma que aparece no corpo da `main()`, exportada pelo `writeFileSync` — note que `__sitemapJson` e `__sitemap` são outras variáveis, contendo o caminho de exportação dos arquivos.

## Post Index
🌐 https://github.com/andrepg/andrepg.github.io/blob/main/src/views/PostIndex.vue

Para o índice de postagens, metade do serviço já foi feito. A construção do mapa em formato JSON permite leitura nesta página, e oferece informação suficiente para montagem da interface de usuário. Para cumprir esta tarefa, apenas uma requisição simples:

```jsx
// Fetch do arquivo Sitemap.json, direto da raiz do site
const fetchPosts = () => fetch('/sitemap.json')
  .then(response => processPosts(response))

// Processamento da resposta da requisição e leitura
const processPosts = (response: Response) => response.json()
  .then(sitemap => posts.value = sitemap)
```

Note duas funções diferentes: a `fetchPosts` e a `processPosts`. Isso porque `response.json()` retorna um objeto `Promise`, que não permite a leitura imediata. Para evitar um aninhamento de `.then` no código, dividir a responsabilidade parece boa ideia. 

Ao final, o valor de `sitemap` atribuído a `posts.value` conterá o mapa completo do site, conforme gerado pela automatização. Este arquivo é público aqui no site, e qualquer um pode [consultá-lo aqui](https://github.com/andrepg/andrepg.github.io/blob/main/src/sitemap.js). Na renderização, qualquer layout é possível, baseando uma iteração sobre cada post obtido.

Assim, uma listagem de artigos é possível com poucas linhas de código e um componente extra recebendo informações da postagem, como o [`PostListElement`](https://github.com/andrepg/andrepg.github.io/blob/main/src/components/PostListElement.vue) e sua aplicação no [índice de artigos](https://github.com/andrepg/andrepg.github.io/blob/db998354a4bcd5cc123bd10aaf9c954494f1db97/src/views/PostIndex.vue#L44-L48).

## Post Single
🌐 https://github.com/andrepg/andrepg.github.io/blob/main/src/views/PostSingle.vue

O `PostSingle` é o componente onde a mágica acontece. Nele ocorre a leitura de cada artigo deste blog e a renderização de todos os componentes necessários. Na verdade, a mágica está toda por baixo do capô. Aqui o trabalho é feito _quase todo_ pelo [[#O plugin para ler Markdown|vite-plugin-markdown]].

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


```javascript
<ul class="flex flex-row flex-wrap gap-2 py-2 px-0">
	<BadgeElement v-for="tag in content.attributes.tags" key="tag">
		{{ tag }}
	</BadgeElement>
</ul>

<h1 class="text-3xl font-semibold flex flex-col max-w-[70w]">
	<span class="font-serif"> {{ content.attributes.titulo }}</span>
	<small class="w-full font-normal text-base leading-snug flex-1">
		{{ content.attributes.serie }}
	</small>
</h1>

<ul>{{ content.attributes.categories }}</ul>
```

# 🟡 A limitação do GitHub Pages

Antes de continuar, preciso deixar um aviso: o GitHub Pages tem problema com aplicações SPA e redirecionamentos para rotas. Um pequeno *hack* é necessário para funcionar corretamente. **O que acontece**: caso não exista um arquivo HTML com o mesmo nome (`minha-url-buscada`) o GitHub retorna um erro 404 do servidor. 

Para contornar este problema, é preciso criar um arquivo 404.html customizado e verificar se um redirecionamento é necessário. Este passo é **muito** importante. E eu coletei algumas referências sobre o assunto para aprofundar a pesquisa depois:

* 📚 [W3C: Using meta refresh to create an instant client-side redirect](https://www.w3.org/TR/WCAG20-TECHS/H76.html)
* 📚 [What is meta refresh?](https://help.ahrefs.com/en/articles/2433739-what-is-meta-refresh-redirect-and-why-is-it-considered-a-critical-issue)
* 📚 [Fragmento CodePen](https://codepen.io/akashrajendra/pen/JKKRvQ)
* 🌐 [Single page hack with GitHub Pages](https://www.smashingmagazine.com/2016/08/sghpa-single-page-app-hack-github-pages/)
* 🌐 [Modelo de arquivo 404 - 1](https://github.com/csuwildcat/sghpa/blob/master/index.html)
* 🌐 [Modelo de arquivo 404 - 2](https://gist.github.com/leonsilicon/1278d429d7c915a9866bc6ea73453d9a)

## O código que importa
📚 https://github.com/andrepg/andrepg.github.io/blob/main/public/404.html

Para resumir, o código mais importante é o trecho abaixo:

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

Estas linhas são responsáveis por verificar se a URL visitada contém o fragmento `blog` e executar uma série de ações necessárias:

1. Salva a URL atual na sessão para consulta futura
2. Cria um elemento `meta` para gerenciar o documento
3. Atribui `/` como destino do redirecionamento, com tempo de 0 segundos
4. Atribui `refresh` à propriedade `httpEquiv`, para informar ao navegador a razão desta tag
5. Adiciona ao documento ao cabeçalho da página

Quando esta tag `meta` é adicionada ao cabeçalho o navegador poderá interpretar a ordem de redirecionamento e processar a URL do blog. 

# 💼 O projeto final

O projeto em sua forma final é este, no qual o artigo foi publicado. Perdi as contas de quantas vezes tentei começar um blog e não foi adiante. Os problemas eram inúmeros: não gostava do domínio ou da ferramenta (alô WordPress), perdia o banco de dados, a hospedagem vencia, ou preguiça.

Agora tenho meus arquivos em Markdown onde escrevo — no Obsidian — e publico no meu repositório GitHub. Assim, tenho histórico e duplo backup para meus artigos publicados. Algumas considerações existem, pois ainda há tarefas pendentes.

Elas estão listadas abaixo, e serão atualizadas à medida que forem concluídas. Por enquanto, fico por aqui, e agradeço a leitura caso tenha chegado ao final com atenção. 😄

## Minhas considerações 

Ainda falta para chegar onde quero. Melhorias para implementar e correções a serem feitas. Minha lista e este artigos serão atualizados com o tempo. Estes problemas serão rastreados através do painel de *issues* do repositório também.

- [ ] O rodapé não aparece na página `404`, tirando-a do padrão do website
- [ ] O redirecionamento `404 meta-refresh` para qualquer outra página causa uma piscadela durante o carregamento (em parte pelo rodapé não existente e a falta de um *loading*)
- [ ] Uma transição entre as páginas seria bem-vinda
- [ ] Um carregamento antecipado da imagem de perfil pode acelerar a página
- [ ] Busca com Algolia ou outro mecanismo Javascript local 
- [ ] Postagens mais recentes na página inicial do site
- [ ] Adaptar os cartões da página inicial para modo escuro
