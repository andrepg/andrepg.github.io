/**
 * The language a route record was generated for, read by everything that has to
 * adapt to the page: the document language, the alternate links, the JSON-LD.
 *
 * Augmenting the router's own interface is what makes `route.meta.locale` typed
 * as a language instead of `unknown` — and it is always set, because the records
 * are generated from the locales declared per route in `@config/routes`.
 *
 * It lives in the app project rather than next to the other shared types
 * (`src/interfaces.ts`, `src/types.ts`) because an augmentation is only
 * recognized for a module the compiling program actually contains: those two are
 * also part of the Node project — the one that reads the Vite config — where
 * nothing imports the router, and the declaration would be rejected as a module
 * that does not exist.
 */
import type { AppLocale } from '@config/locales'

declare module 'vue-router' {
  interface RouteMeta {
    locale: AppLocale
  }
}
