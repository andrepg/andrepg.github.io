/**
 * Shared type aliases: string unions, derived unions, function types and
 * utility wrappers. Object shapes live in `src/interfaces.ts`.
 *
 * This module is deliberately type-only and must stay that way. Two consumers
 * load it outside the bundler:
 *
 *   - `config/routes.ts` is loaded by `vite.config.ts` through `plugins/ssg.ts`,
 *     where `import.meta.env` is not available.
 *   - `src/sitemap/*` runs under `tsx`, with no Vite pipeline at all.
 *
 * An `enum`, a `const` or any runtime import added here would turn those
 * imports into real module loads and break both paths. Keep every declaration
 * below erased at compile time, and import across the two type modules with
 * `import type` so the cycle between them never reaches the runtime.
 */
import type { IPageSeo } from '@/interfaces'

/* SEO / head */

/** `og:type` values emitted for the pages. */
export type OgType = 'website' | 'article' | 'profile'

/** `twitter:card` values emitted for the pages. */
export type TwitterCard = 'summary' | 'summary_large_image'

/**
 * Page metadata a view replaces on top of what its route declares, either as a
 * plain object or as a getter for pages whose metadata is dynamic.
 */
export type PageSeoOverrides = Partial<IPageSeo> | (() => Partial<IPageSeo>)

/* i18n */

/**
 * Resolve uma chave pontilhada de mensagem, com os mesmos parâmetros de `t`.
 *
 * Existe para que os catálogos de `data/` e a camada de JSON-LD leiam texto
 * traduzido sem importarem o vue-i18n: quem sabe o que é uma mensagem é
 * `usePageHead`, que recebe o `t` da instância ativa e o repassa. O bom efeito
 * colateral é o fallback — chave ausente avisa no console em vez de virar
 * `undefined` dentro de um `<script type="application/ld+json">`, que ninguém
 * enxerga.
 */
export type MessageResolver = (key: string, named?: Record<string, unknown>) => string

/**
 * Textos de uma página já resolvidos, no formato que o head e os schemas
 * JSON-LD esperam.
 *
 * Tudo opcional de propósito: uma rota pode declarar só `title`, e o que faltar
 * continua caindo no fallback site-wide (a biografia curta, o nome do site).
 */
export interface PageMessages {
  title?: string
  description?: string
  keywords?: string[]
}

/**
 * O que a camada de head entrega para quem monta uma página: os textos da rota,
 * já traduzidos, e o resolvedor para o conteúdo que a própria página enumera.
 *
 * Separar os dois não é preciosismo — os textos da rota podem ser resolvidos
 * antes, porque a rota é quem declara a chave; já as descrições de um projeto ou
 * de uma entrada da timeline só podem ser lidas por quem itera o catálogo, já que
 * a rota não sabe quantos existem.
 */
export interface PageContext {
  seo: PageMessages
  t: MessageResolver
}

/* JSON-LD */

/** A schema.org document. Plain and serializable, so it can be stringified. */
export type JsonLdDocument = Record<string, unknown>

/**
 * A schema.org document factory. Must return a plain serializable object.
 *
 * Takes the page's resolved text and its translator, because a schema describes
 * the page in the page's language: what the visitor reads is also what the
 * crawler should read. The dependency arrives as a parameter so this module
 * keeps no import of the plugin.
 */
export type JsonLdBuilder = (context: PageContext) => JsonLdDocument

/** Identifiers of the schemas bundled in `@/utils/structured-data`. */
export type JsonLdKey = 'person' | 'profile' | 'collection'

/**
 * A schema reference: either a bundled schema key (used by the route
 * declaration, which cannot import runtime code) or a custom builder
 * (used by views that need per-page data, e.g. a blog post).
 */
export type JsonLdInput = JsonLdKey | JsonLdBuilder | Array<JsonLdKey | JsonLdBuilder>

/* Themes */

/** Palette group. Decides the default picked when the visitor has no choice. */
export type ThemeScheme = 'light' | 'dark'

/* Curriculum timeline */

/** daisyUI timeline modifiers, used as markers and as side of the entry. */
export type TimelinePosition = 'timeline-start' | 'timeline-middle' | 'timeline-end'
