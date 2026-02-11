export interface Post {
  path: string;
  title: string;
  excerpt: string;
  category: string[];
  tags: string[];
  published_at: string;
  serie?: string;
}