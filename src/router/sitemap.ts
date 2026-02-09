export interface Post {
  path: string;
  title: string;
  published: boolean;
  published_at: string;
  tags: string[];
  serie?: string;
  serie_part?: number;
  category: string[];
  excerpt: string;
}

export class SitemapBridge {
  private static instance: SitemapBridge;
  private posts: Post[] = [];
  private isLoaded: boolean = false;

  private constructor() {}

  public static getInstance(): SitemapBridge {
    if (!SitemapBridge.instance) {
      SitemapBridge.instance = new SitemapBridge();
    }
    return SitemapBridge.instance;
  }

  public async load(): Promise<Post[]> {
    if (this.isLoaded) return this.posts;

    try {
      const response = await fetch('/sitemap.json');
      this.posts = await response.json();
      this.isLoaded = true;
      return this.posts;
    } catch (error) {
      console.error('Failed to load sitemap:', error);
      return [];
    }
  }

  public all(): Post[] {
    return this.posts;
  }

  public published(): Post[] {
    return this.posts.filter(post => post.published);
  }

  public bySeries(serieName: string): Post[] {
    return this.posts
      .filter(post => post.serie === serieName)
      .sort((a, b) => (a.serie_part || 0) - (b.serie_part || 0));
  }

  public byCategory(category: string): Post[] {
    return this.posts.filter(post => post.category.includes(category));
  }
}
