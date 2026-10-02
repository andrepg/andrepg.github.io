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
import type { RoutePath } from '@config/routes';
import type { TechnologyId } from '@data/experience';
import type { JsonLdInput, OgType, ThemeScheme, TwitterCard } from './types';

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
  /** Front-matter flag. Present on every post and read by `getPublished`. */
  published?: boolean;
}

export interface IPostMarkdown {
  attributes: IPost;
  html: string;
}

/**
 * A post after `blog-reader` derives the fields that come from its file path
 * rather than from the front-matter.
 */
export type IIndexedPost = IPost & {
  year: string;
  slug: string;
};

/**
 * Sitemap and HTML entities
 */
export interface ISitemapDto {
  path: string;
  title: string;
  description: string;
  type: OgType;
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
  jsonLd?: JsonLdInput;
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

/**
 * Routing
 */
export interface INavigationMenuItem {
  name: string;
  menu: boolean;
  icon: string;
  path: RoutePath;
  seo: IPageSeo;
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
  target: string;
  icon: string;
  /** Highlighted ones are surfaced in the profile card. */
  recommended: boolean;
}

export interface IProject {
  label: string
  target: string;
  icon: string;
  highlight: boolean;
  description: string;
}

export interface ITimelineItem {
  title: string
  company: string
  date: string;
  description: string;
  /** Ids from `Technologies`, resolved to full definitions by `getTecnologias`. */
  stack: TechnologyId[];
}

/** A timeline entry with its technology ids already resolved for display. */
export type IResolvedTimelineItem = Omit<ITimelineItem, 'stack'> & {
  stack: ITechnology[];
};

export interface ISocialMediaLink {
  label: string;
  icon: string;
  target: string;
  blank: '_blank' | '';
}