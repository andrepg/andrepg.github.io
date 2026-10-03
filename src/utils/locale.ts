import * as pt from '@locale/pt'

/**
 * Mensagens por idioma, para o `createI18n` de `src/bootstrap/plugins.ts`.
 *
 * Cada arquivo de `locale/<idioma>/` vira um namespace, então `locale/pt/general.json`
 * responde a `general.nav.menu` e `locale/pt/projects.json` a `projects.title`.
 * O idioma do site é a única pasta do dicionário, e o nome da pasta é a chave
 * em que as mensagens são registradas.
 *
 * Import estático de propósito, e não `import.meta.glob`: um glob entregaria os
 * domínios como strings, e o tipo do dicionário — que é o que ao menos descreve
 * o formato das mensagens — se perderia. Ver a nota em `locale/schema.d.ts`
 * sobre o quanto essa checagem realmente renderiza.
 */
export const messages = { pt }

/** Idiomas com mensagens declaradas. */
export type AppLocale = keyof typeof messages

/**
 * Primeiro idioma do site, e para onde qualquer tradução ausente cai de volta.
 */
export const DEFAULT_LOCALE: AppLocale = 'pt'
