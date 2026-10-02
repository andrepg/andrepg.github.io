import {
  createRouter,
  createWebHistory,
  type RouteRecordSingleView,
  type Router,
  type RouterOptions,
  type RouterScrollBehavior
} from 'vue-router'

import { ApplicationRouter, RoutePath } from '@config/routes'
import { APP_CONFIG } from '@config/app'

/** A view as `createRouter` accepts one in a route record. */
type ViewComponent = NonNullable<RouteRecordSingleView['component']>

/**
 * Options handed to `ViteSSG`, which is the one that builds the `history`: a
 * memory history while it pre-renders, a web history once it hydrates. Since
 * `createRouter` spreads these options *after* its own, a `history` set here
 * would win over that choice — hence its absence.
 *
 * `base` is missing from the router options in vue-router 5 because the path
 * became a parameter of the history factory; `ViteSSG` forwards it to both.
 */
export type StaticRouterOptions = Omit<RouterOptions, 'history'> & { base: string }

/**
 * View rendered by each declared route, loaded on demand.
 *
 * Typed as a `Record<RoutePath, ...>` so the compiler rejects this file as soon
 * as `RoutePath` gains a member that has no view bound to it.
 *
 * The registry cannot live in `@config/routes`: that module is also loaded by
 * the Vite config and by `tsx` for the sitemap, where a dynamic `import()` of a
 * `.vue` file has no bundler behind it to resolve.
 */
const routeComponents: Record<RoutePath, ViewComponent> = {
  [RoutePath.HOME]: () => import('@/views/HomeView.vue'),
  [RoutePath.CURRICULUM]: () => import('@/views/AboutView.vue'),
  [RoutePath.PROJECTS]: () => import('@/views/ProjectsView.vue'),
  [RoutePath.BLOG]: () => import('@/views/BlogListView.vue'),
  [RoutePath.BLOG_ARTICLE]: () => import('@/views/BlogArticleView.vue')
}

/**
 * Route table: the navigation and SEO declaration of `@config/routes`, joined to
 * the lazy view each entry renders.
 */
export const routes: RouteRecordSingleView[] = ApplicationRouter.map((route) => ({
  ...route,
  component: routeComponents[route.path]
}))

/**
 * Path the app is served from, read from the same `APP_CONFIG.BASE_PATH` the
 * canonical links are built on.
 *
 * Sourcing it from the shared config is what keeps the routes this router
 * serves and the absolute URLs advertised in the head from drifting apart, and
 * replacing it by hand is no longer possible: there is one value to change.
 */
export const base = APP_CONFIG.BASE_PATH

/**
 * Restores the offset of a back/forward navigation, jumps to the target of an
 * in-page link, and otherwise opens every page at the top.
 */
export const scrollBehavior: RouterScrollBehavior = (to, _from, savedPosition) =>
  savedPosition ?? (to.hash ? { el: to.hash } : { top: 0 })

/**
 * Options for the static boot. `createAppRouter` spells its own history out
 * instead of reusing this, so that the dev path never inherits the `base` key
 * that `createRouter` would not understand.
 */
export const createStaticRouterOptions = (): StaticRouterOptions => ({
  base,
  routes,
  scrollBehavior
})

/**
 * Router for `vite` serving the app from source, where nothing is pre-rendered
 * and the URL is always handled by the browser.
 */
export const createAppRouter = (): Router =>
  createRouter({ history: createWebHistory(base), routes, scrollBehavior })
