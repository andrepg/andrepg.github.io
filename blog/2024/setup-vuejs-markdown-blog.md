---
title: Como construí este blog em VueJS + Markdown - O Setup
published: true
published_at: 2024-12-18
tags:
  - development
  - software
  - vuejs
  - markdown
serie: Um blog feito em casa
serie_part: 1
category:
  - Programação
excerpt: Início da série sobre como construí meu blog, focando nas ferramentas, pacotes iniciais e configurações do Vite.
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

Com um papel importante no projeto, o plugin Vite Markdown permite a importação de arquivos `.md` e seus atributos de *FrontMatter* ([🔍 pesquise um pouco](https://www.google.com/search?q=atributos+frontmatter)). Estas atributos permitem categorizar, definir títulos, datas e outras informações úteis para a renderização. 

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
