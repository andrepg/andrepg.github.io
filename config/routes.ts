import { INavigationMenu } from '@/interfaces.ts';

export enum RoutePath {
  HOME = '/',
  CURRICULUM = '/curriculo',
  PROJECTS = '/projetos',
  BLOG = '/blog',
  BLOG_ARTICLE = '/blog/:year/:article',
}

export type RouteMeta = Omit<INavigationMenu, 'component'> & { path: RoutePath };

export const getMenuItems = (): RouteMeta[] =>
  ApplicationRouter.filter(link => link.menu);

export const ApplicationRouter: RouteMeta[] = [
  {
    name: 'Homepage',
    menu: true,
    path: RoutePath.HOME,
    icon: 'hugeicons:home-01',
  },
  {
    name: 'Curriculum',
    menu: true,
    icon: 'hugeicons:profile-02',
    path: RoutePath.CURRICULUM,
  },
  {
    name: 'Projetos',
    menu: true,
    icon: 'hugeicons:computer-video-call',
    path: RoutePath.PROJECTS,
  },
  {
    name: 'Blog',
    menu: true,
    icon: 'hugeicons:quill-write-02',
    path: RoutePath.BLOG,
  },
  {
    menu: false,
    name: 'Posts - Single',
    icon: '',
    path: RoutePath.BLOG_ARTICLE,
  },
];
