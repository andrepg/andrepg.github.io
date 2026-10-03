/**
 * Catálogo de mensagens do espanhol.
 *
 * Mesma forma do português — os arquivos são os mesmos, um por domínio, e cada
 * um é um namespace. O que muda é o texto.
 *
 * Dois nomes não são traduzíveis, por mais que o idioma mude:
 *
 * `serie` é o nome do placeholder dentro de `article.serie.subtitle`, e quem o
 * preenche é o slot `#serie` em `BlogArticleView.vue`. Um `{series}` aqui
 * quebraria a interpolação sem nenhum aviso.
 *
 * `artLens` e `abilityContabil` continuam com descrição vazia, como em
 * português: são entradas sem texto, não traduções faltando.
 *
 * @see ../pt/index.ts
 */
export { default as blog } from './blog.json'
export { default as curriculum } from './curriculum.json'
export { default as general } from './general.json'
export { default as profile } from './profile.json'
export { default as projects } from './projects.json'
