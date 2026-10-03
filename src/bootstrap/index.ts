import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'

import RootApp from '@/App.vue'
import { createAppRouter, createStaticRouterOptions } from '@/router'
import { installAppPlugins } from '@/bootstrap/plugins'
import { initializeTheme } from '@/composables/useTheme'
import { localeFromLocation } from '@/utils/locale'
import { localeFromPath, type AppLocale } from '@config/locales'

const MOUNT_TARGET = '#app'

/**
 * The language the app starts in, and where it comes from.
 *
 * `ViteSSG` hands the path it is about to render to the setup, and the browser
 * has the very same path in the address bar — the static build renders each route
 * by calling this boot once per route, and the hydration of a page rendered by
 * one of those calls has to agree with it character by character, or Vue would
 * find a text that changed under the markup it is hydrating.
 *
 * On the client the path carries the base the site is served from, hence the
 * strip; in the build the route paths are already relative to it.
 */
const bootLocale = (routePath?: string): AppLocale =>
  import.meta.env.SSR ? localeFromPath(routePath ?? '/') : localeFromLocation()

/**
 * Boots the app straight from source, the way `vite` serves it: a client-only
 * render behind a web history, with the head handled by the browser plugin.
 */
export const bootstrapClient = (): void => {
  initializeTheme()

  const app = createApp(RootApp).use(createAppRouter()).use(createHead())

  installAppPlugins(app, bootLocale())

  app.mount(MOUNT_TARGET)
}

/**
 * Boots the app the way the built site runs it: `vite-ssg` renders every route
 * to static HTML, then the very same call hydrates that markup in the browser.
 *
 * `initializeTheme` is called here as well because this branch is not build-only
 * — it also runs in the browser after hydration, where the stored palette has to
 * be restored before the mount. The head is left to `ViteSSG`, which installs the
 * server-side variant of the plugin while it pre-renders.
 */
export const bootstrapStatic = (): ReturnType<typeof ViteSSG> => {
  initializeTheme()

  return ViteSSG(RootApp, createStaticRouterOptions(), ({ app, routePath }) =>
    installAppPlugins(app, bootLocale(routePath))
  )
}
