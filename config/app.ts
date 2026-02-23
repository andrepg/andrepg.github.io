/**
 * Centralized application configuration.
 * Reads from environment variables and provides sensible defaults.
 */

export const APP_CONFIG = {
    /**
     * The full base URL of the site, used for SEO and absolute links.
     * Defaults to Vite's internal BASE_URL if VITE_BASE_URL is not provided.
     */
    BASE_URL: (import.meta.env.VITE_BASE_URL ?? import.meta.env.BASE_URL ?? '') as string,

    /**
     * Example of other settings you might want to centralize
     */
    IS_DEV: import.meta.env.DEV,
    IS_PROD: import.meta.env.PROD,

    ALGOLIA: {
        APPLICATION_ID: import.meta.env.VITE_ALGOLIA_APPLICATION_ID,
        API_KEY: import.meta.env.VITE_ALGOLIA_API_KEY,
        INDEX_NAME: import.meta.env.VITE_ALGOLIA_INDEX_NAME,

        FIRST_KEY: import.meta.env.VITE_ALGOLIA_FIRST_KEY,
        SEC_KEY: import.meta.env.VITE_ALGOLIA_SEC_KEY,
        TER_KEY: import.meta.env.VITE_ALGOLIA_TER_KEY,
    } as const,
} as const;

export default APP_CONFIG;
