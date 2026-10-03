/**
 * Shared object shapes, one `interface` per concept, prefixed with `I`.
 *
 * Unions, derived aliases and function types live in `src/types.ts`, which
 * must stay type-only — see the note at the top of that file.
 *
 * The two modules import each other by type (a page shape references `OgType`,
 * an override alias references `IPageSeo`), which is fine because neither
 * import reaches the runtime. Import with `import type` to keep it that way.
 */
import type { RoutePath } from '@config/routes'
import type { TimelineId } from '@data/curriculum'
import type { TechnologyId } from '@data/experience'
import type { ProjectId } from '@data/projects'
import type { JsonLdInput, OgType, ThemeScheme, TwitterCard } from './types'

/**
 * Application
 */
export interface IUserConfig {
  website: {
    name: string
    url: string
    description: string
    image: string
  }
  /**
   * Identidade do autor.
   *
   * Cargo e biografias são texto traduzível e foram para
   * `locale/<idioma>/profile.json`; o que fica aqui é o que não se traduz — o
   * nome é usado como nome do site nos metadados e nos schemas.
   */
  author: {
    name: string
    avatar: string
  }
}

/**
 * Blog entities
 */
export interface IPost {
  path: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  published_at: string
  serie?: string
  serie_part?: number
  cover?: string
  /** Front-matter flag. Present on every post and read by `getPublished`. */
  published?: boolean
}

export interface IPostMarkdown {
  attributes: IPost
  html: string
}

/**
 * A post after `blog-reader` derives the fields that come from its file path
 * rather than from the front-matter.
 */
export type IIndexedPost = IPost & {
  year: string
  slug: string
}

/**
 * Sitemap and HTML entities
 */
export interface ISitemapDto {
  path: string
  title: string
  description: string
  type: OgType
  keywords?: string[]
  publishedTime?: string
  modifiedTime?: string
}

export interface IHtmlMetaTag {
  name?: string
  property?: string
  content?: string
  [key: `data-${string}`]: string
}

/**
 * SEO / head management
 */
export interface IPageSeo {
  /**
   * Short page title. The site name is appended automatically, and pages
   * that leave it empty fall back to the site name alone.
   */
  title?: string
  /** Falls back to the author short biography. */
  description?: string
  /** Falls back to the site share image. */
  image?: string
  type?: OgType
  card?: TwitterCard
  keywords?: string[]
  noIndex?: boolean
  /** Overrides the canonical URL derived from the current route path. */
  canonicalUrl?: string
  /** Emits the `article:*` tags. */
  publishedTime?: string
  jsonLd?: JsonLdInput
}

export interface IBaseOgParams {
  title: string
  description: string
  canonicalUrl: string
  image: string
  type: OgType
}

export interface ITwitterOgParams {
  card: TwitterCard
  title: string
  description: string
  image: string
}

/**
 * Routing
 */
/**
 * Onde uma rota busca seus textos traduzidos.
 *
 * `seo` é um prefixo, não três chaves: `usePageHead` lê `{prefixo}.title`,
 * `{prefixo}.description` e `{prefixo}.keywords`. Um prefixo por rota é mais curto
 * de declarar e deixa visível, no mesmo lugar, que a página inteira se resolve a
 * partir de um único bloco do arquivo de mensagens.
 */
export interface IRouteMessages {
  seo: string
}

export interface INavigationMenuItem {
  /**
   * Identificador estável da rota: nome do registro no `vue-router` e chave do
   * `v-for`. Não é traduzido de propósito — trocar de idioma não pode renomear a
   * rota.
   */
  name: string
  /** Chave i18n do rótulo exibido no menu. */
  label: string
  menu: boolean
  icon: string
  path: RoutePath
  /** Metadados que não dependem de idioma. Os textos vêm de `i18n`. */
  seo: IPageSeo
  i18n: IRouteMessages
}

/**
 * Catalog data
 */
export interface ISiteTheme<TId extends string = string> {
  /** daisyUI theme name, written to the `data-theme` attribute. */
  id: TId
  /** Name shown in the theme selector. */
  label: string
  scheme: ThemeScheme
}

export interface ITechnology {
  id: TechnologyId
  label: string
  target: string
  icon: string
  /** Highlighted ones are surfaced in the profile card. */
  recommended: boolean
}

/**
 * Projeto como vive no catálogo: só o que não se traduz.
 *
 * `description` saiu daqui para `locale/<idioma>/projects.json` — veja
 * `getProjects`. `label` continua aqui porque nome de projeto é nome próprio.
 */
export interface IProjectMeta {
  id: ProjectId
  label: string
  target: string
  icon: string
  /** Destaques aparecem na home. */
  highlight: boolean
}

/** Projeto com o texto traduzido, como `getProjects` o devolve. */
export type IProject = IProjectMeta & {
  description: string
}

/**
 * Entrada da timeline como vive no catálogo: só o que não se traduz.
 *
 * `date`, `title` e `description` saíram daqui para
 * `locale/<idioma>/curriculum.json`; `company` continua aqui porque é nome
 * próprio.
 */
export interface ITimelineEntry {
  id: TimelineId
  company: string
  /** Ids from `Technologies`, resolved to full definitions by `getTecnologias`. */
  stack: TechnologyId[]
}

/** Entrada da timeline com os textos traduzidos, como `getTimeline` a devolve. */
export type ITimelineItem = ITimelineEntry & {
  date: string
  title: string
  description: string
}

/** A timeline entry with its technology ids already resolved for display. */
export type IResolvedTimelineItem = Omit<ITimelineItem, 'stack'> & {
  stack: ITechnology[]
}

export interface ISocialMediaLink {
  label: string
  icon: string
  target: string
  blank: '_blank' | ''
}
