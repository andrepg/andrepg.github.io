/**
 * Centralized application configuration.
 * Reads from environment variables and provides sensible defaults.
 */

export const APP_CONFIG = {
  /**
   * The full base URL of the site, used for SEO and absolute links.
   * Defaults to Vite's internal BASE_URL if VITE_BASE_URL is not provided.
   */
  BASE_URL: (import.meta.env.VITE_BASE_URL ?? '') as string,

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
