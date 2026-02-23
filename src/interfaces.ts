export interface INavigationMenu {
  name: string;
  menu: boolean;
  icon: string;
  path: string;
  component: () => Promise<unknown>;
}

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

export interface IApplicationConfig {
  website: {
    name: string;
    url: string;
    description: string;
  },
  author: {
    name: string;
    avatar: string;

    biography: string;
    shortBiography: string;
    
  }
}

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
  content: string;
}