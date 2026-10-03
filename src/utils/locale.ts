import * as en from '@locale/en'
import * as pt from '@locale/pt'
import * as es from '@locale/es'

import { localeFromPath, type AppLocale } from '@config/locales'
import { stripBasePath } from '@/utils/site-metadata'
import { writeCookie } from '@/utils/cookie'

/**
 * Mensagens por idioma, para o `createI18n` de `src/bootstrap/plugins.ts`.
 *
 * Cada arquivo de `locale/<idioma>/` vira um namespace, então
 * `locale/en/general.json` responde a `general.nav.menu` e
 * `locale/en/projects.json` a `projects.title`. O nome da pasta é a chave em
 * que o idioma é registrado, e um idioma novo é uma pasta, uma linha aqui e uma
 * linha em `LOCALES`.
 *
 * A lista de idiomas vive em `@config/locales` e não aqui, porque o build
 * estático a lê sem bundler — e o que este módulo acrescenta é justamente o que
 * só o app pode ter: os catálogos.
 *
 * ## Buraco de tradução
 *
 * A anotação abaixo é a garantia de forma que existe, e cobre os dois defeitos
 * possíveis: um idioma declarado em `LOCALES` sem catálogo aqui é erro de
 * compilação, e um idioma com uma chave a menos que o inglês — a forma de
 * `DefineLocaleMessage`, derivada de `locale/en` — também é. Ver a nota em
 * `locale/schema.d.ts` para o que ela não cobre.
 *
 * O conteúdo do blog também não faz parte disto: os posts são markdown em
 * português e não têm tradução, e é por isso que existem em um idioma só.
 *
 * Import estático de propósito, e não `import.meta.glob`: um glob entregaria os
 * idiomas como strings e o tipo do dicionário se perderia.
 */
export const messages: Record<AppLocale, typeof en> = { en, pt, es }

export type { AppLocale }

/**
 * O idioma da página que o navegador está mostrando.
 *
 * É o que decide a instância de i18n no boot: o idioma vem da URL, e a URL é a
 * única fonte que o render do servidor e a hidratação leem igualmente. Uma
 * preferência guardada em cookie as divergiria, e o texto trocaria embaixo do
 * markup já gerado — por isso ela não entra aqui, e sim no redirecionamento de
 * quem chega a uma página sem prefixo, que roda antes do app subir (o script
 * inline em `index.html`).
 */
export const localeFromLocation = (): AppLocale =>
  localeFromPath(stripBasePath(window.location.pathname))

const LOCALE_COOKIE = 'locale'

/**
 * Guarda o idioma escolhido no seletor, para a próxima visita.
 *
 * Como todo idioma vive sob seu próprio prefixo, um link para `/pt/curriculo`
 * já é a navegação completa e não precisa de estado no cliente. O que a
 * preferência acrescenta é o caso que a URL não resolve: um link compartilhado
 * sem prefixo, uma aba antiga, o próprio domínio digitado.
 */
export const saveLocalePreference = (locale: AppLocale): void => writeCookie(LOCALE_COOKIE, locale)
