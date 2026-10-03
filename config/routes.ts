import type { INavigationMenuItem, IPageSeo, IRouteMessages } from '@/interfaces'

export enum RoutePath {
  HOME = '/',
  CURRICULUM = '/curriculo',
  PROJECTS = '/projetos',
  BLOG = '/blog',
  BLOG_ARTICLE = '/blog/:year/:article',
}

export const getMenuItems = (): INavigationMenuItem[] =>
  ApplicationRouter.filter(link => link.menu)

/**
 * Metadata declared for a route, without the site-wide defaults applied.
 *
 * Only the fields that do not depend on a language live here: what text belongs
 * to a route is declared as a key prefix under `i18n` and resolved at runtime by
 * `usePageHead`. A string sitting in this file could never be translated, so
 * none does.
 *
 * Kept free of runtime imports: this module is also loaded by the Vite config
 * through `plugins/ssg.ts`, where `import.meta.env` is not available.
 */
export const getRouteSeo = (path: RoutePath): IPageSeo => {
  const route = ApplicationRouter.find(link => link.path === path)

  if (!route) {
    throw new Error(`[routes] No SEO metadata declared for route: ${path}`)
  }

  return route.seo
}

/**
 * Where a route reads its own text from, still unresolved.
 *
 * Split from `getRouteSeo` so that each returns exactly one thing: metadata that
 * is the same in every language, and keys that are not. Callers that only need
 * one of them should not have to pull the other along.
 */
export const getRouteMessages = (path: RoutePath): IRouteMessages => {
  const route = ApplicationRouter.find(link => link.path === path)

  if (!route) {
    throw new Error(`[routes] No i18n messages declared for route: ${path}`)
  }

  return route.i18n
}

export const ApplicationRouter: INavigationMenuItem[] = [
  {
    name: 'Homepage',
    label: 'general.nav.home',
    menu: true,
    path: RoutePath.HOME,
    icon: 'hugeicons:home-01',
    seo: {
      jsonLd: 'person'
    },
    i18n: {
      seo: 'general.routes.home'
    }
  },
  {
    name: 'Curriculum',
    label: 'general.nav.curriculum',
    menu: true,
    path: RoutePath.CURRICULUM,
    icon: 'hugeicons:profile-02',
    seo: {
      jsonLd: 'profile'
    },
    i18n: {
      seo: 'general.routes.curriculum'
    }
  },
  {
    name: 'Projects',
    label: 'general.nav.projects',
    menu: true,
    path: RoutePath.PROJECTS,
    icon: 'hugeicons:computer-video-call',
    seo: {
      jsonLd: 'collection'
    },
    i18n: {
      seo: 'general.routes.projects'
    }
  },
  {
    name: 'Blog',
    label: 'general.nav.blog',
    menu: true,
    path: RoutePath.BLOG,
    icon: 'hugeicons:quill-write-02',
    seo: {
      // The article reuses the blog copy and overrides everything else with the
      // post metadata.
    },
    i18n: {
      seo: 'general.routes.article'
    }
  },
  {
    menu: false,
    name: 'Posts - Single',
    // Never rendered in the menu, but declared so that every route carries a
    // complete set: a menu label is what a `menu: false` entry would show if it
    // were ever promoted, and an article belongs to the blog either way.
    label: 'general.nav.blog',
    icon: '',
    path: RoutePath.BLOG_ARTICLE,
    seo: {},
    i18n: {
      seo: 'general.routes.article'
    }
  }
]
