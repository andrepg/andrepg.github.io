/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  import type { ComponentOptions, ComponentCustomOptions } from 'vue'
  const component: ComponentOptions & ComponentCustomOptions
  export default component
  export const attributes: any
  export const html: string
  export const toc: { level: string, content: string, slug: string }[]
}

interface ImportMetaEnv {
  /** Base URL of the application */
  readonly VITE_BASE_URL: string

  /** Algolia application ID */
  readonly VITE_ALGOLIA_APPLICATION_ID: string
  /** Algolia API key */
  readonly VITE_ALGOLIA_API_KEY: string
  /** Algolia index name */
  readonly VITE_ALGOLIA_INDEX_NAME: string

  /** First key to match at Algolia Search */
  readonly VITE_ALGOLIA_FIRST_KEY: string
  /** Second key to match at Algolia Search */
  readonly VITE_ALGOLIA_SEC_KEY: string
  /** Third key to match at Algolia Search */
  readonly VITE_ALGOLIA_TER_KEY: string

  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
