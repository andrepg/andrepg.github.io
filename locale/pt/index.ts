/**
 * Catálogo de mensagens do português.
 *
 * Um arquivo por domínio, e cada arquivo é um namespace: `general.json`
 * responde a `general.nav.menu`, `projects.json` a `projects.title`.
 *
 * O que está aqui é a interface — o que o site diz sobre si, e a descrição de
 * cada projeto e entrada da timeline. O conteúdo que o autor escreveu não vem:
 * os posts do blog continuam em `blog/*.md`, no idioma em que foram escritos.
 *
 * Domínio novo é uma linha aqui e uma chave em `locale/schema.d.ts`. A ordem
 * não importa para o runtime, mas mantê-la alfabética deixa a diff legível
 * quando o segundo idioma entrar.
 */
export { default as blog } from './blog.json'
export { default as curriculum } from './curriculum.json'
export { default as general } from './general.json'
export { default as profile } from './profile.json'
export { default as projects } from './projects.json'
