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
