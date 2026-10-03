import * as pt from '@locale/pt'
import * as en from '@locale/en'
import * as es from '@locale/es'

/**
 * Mensagens por idioma, para o `createI18n` de `src/bootstrap/plugins.ts`.
 *
 * Cada arquivo de `locale/<idioma>/` vira um namespace, então
 * `locale/pt/general.json` responde a `general.nav.menu` e
 * `locale/pt/projects.json` a `projects.title`. O nome da pasta é a chave em
 * que o idioma é registrado, e um idioma novo é uma pasta e uma linha aqui.
 *
 * Português vem primeiro porque é o fallback: é para ele que qualquer tradução
 * ausente cai, e é nele que o site é escrito. As traduções de `en` e `es` estão
 * completas e registradas, mas o site é renderizado em português — não existe
 * ainda uma forma de trocar de idioma em tempo de execução, então elas só
 * aparecem quando um seletor existir.
 *
 * ## Buraco de tradução
 *
 * Um idioma pode ficar com uma chave a menos que o português sem quebrar nada:
 * `createI18n` exige que todo idioma satisfaça `DefineLocaleMessage`, que é
 * declarado a partir de `pt`, e a checagem de tipo rejeita a pasta inteira. Isso
 * é de graça, e é a única garantia de shape que existe aqui.
 *
 * O que ela não cobre é o contrário — chave escrita à mão em `t()` ou `$t()`.
 * Ver a nota em `locale/schema.d.ts`.
 *
 * O conteúdo do blog também não faz parte disto: os posts são markdown em
 * português e não têm tradução, o que significa que um site em inglês exibiria a
 * interface traduzida sobre artigos em português.
 *
 * Import estático de propósito, e não `import.meta.glob`: um glob entregaria os
 * idiomas como strings e o tipo do dicionário se perderia.
 */
export const messages = { pt, en, es }

/** Idiomas com mensagens declaradas. */
export type AppLocale = keyof typeof messages

/**
 * Primeiro idioma do site, e para onde qualquer tradução ausente cai de volta.
 */
export const DEFAULT_LOCALE: AppLocale = 'pt'
