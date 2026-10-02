/**
 * Application
 */
export interface IUserConfig {
  website: {
    name: string;
    url: string;
    description: string;
    image: string;
  },
  author: {
    name: string;
    avatar: string;
    role: string;

    biography: string;
    shortBiography: string;
  }
}

export interface INavigationMenu {
  name: string;
  menu: boolean;
  icon: string;
  path: string;
  component: () => Promise<unknown>;
}

/**
 * Blog entities
 */
export interface IPost {
  path: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  published_at: string;
  serie?: string;
  serie_part?: number;
  cover?: string;
}

export interface IPostMarkdown {
  attributes: IPost;
  html: string;
}

/**
 * Sitemap and HTML entities
 */
export interface ISitemapDto {
  path: string;
  title: string;
  description: string;
  type: string;
  keywords?: string[];
  publishedTime?: string;
  modifiedTime?: string;
}

export interface IHtmlMetaTag {
  name?: string;
  property?: string;
  content?: string;
  [key: `data-${string}`]: string;
}

/**
 * SEO / head management
 */
export type OgType = 'website' | 'article' | 'profile';

export type TwitterCard = 'summary' | 'summary_large_image';

/** A schema.org document factory. Must return a plain serializable object. */
export type IJsonLdBuilder = () => Record<string, unknown>;

/** Identifiers of the schemas bundled in `@/utils/structured-data`. */
export type JsonLdKey = 'person' | 'profile' | 'collection';

/**
 * A schema reference: either a bundled schema key (used by the route
 * declaration, which cannot import runtime code) or a custom builder
 * (used by views that need per-page data, e.g. a blog post).
 */
export type IJsonLdInput =
  | JsonLdKey
  | IJsonLdBuilder
  | Array<JsonLdKey | IJsonLdBuilder>;

/**
 * Page level metadata declared in `@config/routes` and consumed by
 * `usePageHead`.
 */
export interface IPageSeo {
  /**
   * Short page title. The site name is appended automatically, and pages
   * that leave it empty fall back to the site name alone.
   */
  title?: string;
  /** Falls back to the author short biography. */
  description?: string;
  /** Falls back to the site share image. */
  image?: string;
  type?: OgType;
  card?: TwitterCard;
  keywords?: string[];
  noIndex?: boolean;
  /** Overrides the canonical URL derived from the current route path. */
  canonicalUrl?: string;
  /** Emits the `article:*` tags. */
  publishedTime?: string;
  jsonLd?: IJsonLdInput;
}

export interface IBaseOgParams {
  title: string;
  description: string;
  canonicalUrl: string;
  image: string;
  type: OgType;
}

export interface ITwitterOgParams {
  card: TwitterCard;
  title: string;
  description: string;
  image: string;
}