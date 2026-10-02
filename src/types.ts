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

/* JSON-LD */

/** A schema.org document. Plain and serializable, so it can be stringified. */
export type JsonLdDocument = Record<string, unknown>

/** A schema.org document factory. Must return a plain serializable object. */
export type JsonLdBuilder = () => JsonLdDocument

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
