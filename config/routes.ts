import type { INavigationMenuItem, IPageSeo } from '@/interfaces';

export enum RoutePath {
  HOME = '/',
  CURRICULUM = '/curriculo',
  PROJECTS = '/projetos',
  BLOG = '/blog',
  BLOG_ARTICLE = '/blog/:year/:article',
}

export const getMenuItems = (): INavigationMenuItem[] =>
  ApplicationRouter.filter(link => link.menu);

/**
 * Metadata declared for a route, without the site-wide defaults applied.
 * Kept free of runtime imports: this module is also loaded by the Vite config
 * through `plugins/ssg.ts`, where `import.meta.env` is not available.
 */
export const getRouteSeo = (path: RoutePath): IPageSeo => {
  const route = ApplicationRouter.find(link => link.path === path);

  if (!route) {
    throw new Error(`[routes] No SEO metadata declared for route: ${path}`);
  }

  return route.seo;
};

export const ApplicationRouter: INavigationMenuItem[] = [
  {
    name: 'Homepage',
    menu: true,
    path: RoutePath.HOME,
    icon: 'hugeicons:home-01',
    seo: {
      keywords: [
        'programador full stack',
        'desenvolvedor web',
        'freelancer',
        'vue',
        'php'
      ],
      jsonLd: 'person'
    }
  },
  {
    name: 'Curriculum',
    menu: true,
    icon: 'hugeicons:profile-02',
    path: RoutePath.CURRICULUM,
    seo: {
      title: 'Experiência e Projetos',
      description: 'Minha trajetória, experiência e ferramentas.',
      keywords: ['currículo', 'experiência', 'carreira', 'curriculo'],
      jsonLd: 'profile'
    }
  },
  {
    name: 'Projetos',
    menu: true,
    icon: 'hugeicons:computer-video-call',
    path: RoutePath.PROJECTS,
    seo: {
      title: 'Projetos',
      description: 'Meus projetos publicados mais relevantes.',
      keywords: ['projetos', 'portfólio', 'open source'],
      jsonLd: 'collection'
    }
  },
  {
    name: 'Blog',
    menu: true,
    icon: 'hugeicons:quill-write-02',
    path: RoutePath.BLOG,
    seo: {
      title: 'Blog',
      description: 'Os registros do meu trabalho, notas relevantes e devaneios sobre a tecnologia.',
      keywords: ['blog', 'artigos', 'posts', 'desenvolvimento']
    }
  },
  {
    menu: false,
    name: 'Posts - Single',
    icon: '',
    path: RoutePath.BLOG_ARTICLE,
    seo: {
      title: 'Blog',
      keywords: ['blog', 'artigos', 'posts']
    }
  },
];