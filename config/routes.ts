import type { INavigationMenuItem, IPageSeo, IRouteMessages } from '@/interfaces'

import { CONTENT_LOCALE, DEFAULT_LOCALE, LOCALES, switchPath, type AppLocale } from './locales'

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
    //
    // The one route that is not translated: the posts are markdown written in a
    // single language, so there is nothing for a translated interface to sit on
    // top of. Declaring it here is what keeps the router from generating
    // `/en/blog/2024/post`, the alternate links from advertising it, and the
    // indexes of the other languages from listing a page in them.
    label: 'general.nav.blog',
    icon: '',
    path: RoutePath.BLOG_ARTICLE,
    locales: [CONTENT_LOCALE],
    seo: {},
    i18n: {
      seo: 'general.routes.article'
    }
  }
]

/**
 * Whether a route exists in a language, defaulting to every language.
 *
 * @param route - Route declaration to read.
 */
export const getRouteLocales = (route: INavigationMenuItem): readonly AppLocale[] =>
  route.locales ?? LOCALES

/**
 * Matches a declared pattern against a concrete path, `:param` standing for any
 * single segment.
 *
 * Both sides keep the empty first segment `/x` splits into, so the counts line
 * up without any special case for the root.
 */
const matchesPath = (pattern: string, path: string): boolean => {
  const segments = pattern.split('/')
  const parts = path.split('/')

  return (
    segments.length === parts.length &&
    segments.every((segment, index) => segment.startsWith(':') || segment === parts[index])
  )
}

/**
 * The route a concrete path was served by, so that a URL is enough to know
 * which route it belongs to — and, through it, in which languages it exists.
 *
 * The path is read without its language prefix: a declaration describes a page,
 * not a page in one language of it, so `/blog/2024/post`, `/pt/blog/2024/post`
 * and `/es/blog/2024/post` are all the same route answering `['pt']`. Matching
 * the prefix instead would make every prefixed dynamic path look undeclared, and
 * a page would advertise every language as its own.
 *
 * @param path - Concrete path, as the browser or the static build has it.
 */
export const findRoute = (path: string): INavigationMenuItem | undefined => {
  const unprefixed = switchPath(path, DEFAULT_LOCALE)

  return ApplicationRouter.find((route) => matchesPath(route.path, unprefixed))
}

/**
 * The languages a page at this path is published in.
 *
 * @param path - Concrete path, as the browser or the static build has it.
 */
export const availableLocales = (path: string): AppLocale[] => {
  const route = findRoute(path)

  return [...(route ? getRouteLocales(route) : LOCALES)]
}
