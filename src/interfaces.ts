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
}

export interface IBaseOgParams {
    title: string,
    description: string,
    canonicalUrl?: string
}

export interface ITwitterOgParams extends IBaseOgParams {
    card: string,
}