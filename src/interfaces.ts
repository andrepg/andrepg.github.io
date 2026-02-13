export interface NavigationMenu {
  name: string;
  menu: boolean;
  icon: string;
  path: string;
  component: () => Promise<unknown>;
}


export interface Post {
  path: string;
  title: string;
  excerpt: string;
  category: string[];
  tags: string[];
  published_at: string;
  serie?: string;
}