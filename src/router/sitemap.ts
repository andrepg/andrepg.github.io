import { slugify } from '@/utils/slugify';

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
  private _posts: Post[] = [];
  private isLoaded: boolean = false;

  private constructor() {}

  public static getInstance(): SitemapBridge {
    if (!SitemapBridge.instance) {
      SitemapBridge.instance = new SitemapBridge();
    }
    return SitemapBridge.instance;
  }

  /**
   * Loads the sitemap from the public directory.
   * Returns the full list of posts.
   */
  public async load(): Promise<Post[]> {
    if (this.isLoaded) return this._posts;

    try {
      const response = await fetch('/sitemap.json');
      this._posts = await response.json();
      this.isLoaded = true;
      return this._posts;
    } catch (error) {
      console.error('Failed to load sitemap:', error);
      return [];
    }
  }

  // --- Core Methods ---

  public all(): Post[] {
    return this.sortByDate(this._posts);
  }

  public published(): Post[] {
    return this.sortByDate(this._posts.filter(post => post.published));
  }

  // --- Filtering Methods ---

  public bySeries(serieName: string): Post[] {
    return this._posts
      .filter(post => post.serie === serieName)
      .sort((a, b) => (a.serie_part || 0) - (b.serie_part || 0));
  }

  public bySeriesSlug(slug: string): Post[] {
    return this._posts
      .filter(post => post.serie && slugify(post.serie) === slug)
      .sort((a, b) => (a.serie_part || 0) - (b.serie_part || 0));
  }

  public byCategory(category: string): Post[] {
    return this.sortByDate(
      this._posts.filter(post => post.category.includes(category))
    );
  }

  public byTag(tag: string): Post[] {
    return this.sortByDate(
      this._posts.filter(post => post.tags.includes(tag))
    );
  }

  // --- Utility Methods ---

  /**
   * Sorts posts by publication date, descending (newest first).
   */
  private sortByDate(posts: Post[]): Post[] {
    return [...posts].sort((a, b) => 
      new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );
  }

  /**
   * Helper to proxy the slugify utility.
   */
  public slugify(text: string): string {
    return slugify(text);
  }
}
