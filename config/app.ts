/**
 * Centralized application configuration.
 * Reads from environment variables and provides sensible defaults.
 */

export const APP_CONFIG = {
  /**
   * Origin the site is published at, as scheme and host with no trailing slash
   * (e.g. `https://andrepg.github.io`). Deployment knowledge no build tool can
   * infer, injected at build time by Vite.
   */
  ORIGIN: ((import.meta.env.VITE_BASE_URL ?? '') as string).replace(/\/+$/, ''),

  /**
   * Path the site is served from, as resolved by Vite from its `base` option:
   * `/` at a domain root, `/repo` on a project page.
   *
   * Deliberately kept apart from `ORIGIN`. Absolute links are built by joining
   * the two, so moving the repository under a subpath only means changing the
   * Vite base — and, more importantly, the router and the canonical links can no
   * longer disagree about where the site lives. Folding the path into the origin
   * is what let the two drift apart and emit canonical URLs that 404.
   */
  BASE_PATH: import.meta.env.BASE_URL,

  /**
   * Environment variables to build the application
   */
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,

  /**
   * Analytics configuration.
   * Values are injected at build time via GitHub Actions variables.
   */
  ANALYTICS: {
    /** Google Tag Manager container ID */
    GTM_ID: import.meta.env.VITE_GTM_ID,
    /** Google Analytics 4 measurement ID */
    GA4_ID: import.meta.env.VITE_GA4_ID,
    /** Microsoft Clarity project ID */
    CLARITY_ID: import.meta.env.VITE_CLARITY_ID
  } as const,

  /**
   * Algolia configuration
   */
  ALGOLIA: {
    APPLICATION_ID: import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
    API_KEY: import.meta.env.VITE_ALGOLIA_API_KEY,
    INDEX_NAME: import.meta.env.VITE_ALGOLIA_INDEX_NAME,

    FIRST_KEY: import.meta.env.VITE_ALGOLIA_FIRST_KEY,
    SEC_KEY: import.meta.env.VITE_ALGOLIA_SEC_KEY,
    TER_KEY: import.meta.env.VITE_ALGOLIA_TER_KEY
  } as const
} as const

export default APP_CONFIG
