import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import { ViteSSG } from 'vite-ssg'

import RootApp from '@/App.vue'
import { createAppRouter, createStaticRouterOptions } from '@/router'
import { installAppPlugins } from '@/bootstrap/plugins'
import { initializeTheme } from '@/composables/useTheme'

const MOUNT_TARGET = '#app'

/**
 * Boots the app straight from source, the way `vite` serves it: a client-only
 * render behind a web history, with the head handled by the browser plugin.
 */
export const bootstrapClient = (): void => {
  initializeTheme()

  const app = createApp(RootApp).use(createAppRouter()).use(createHead())

  installAppPlugins(app)

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

  return ViteSSG(RootApp, createStaticRouterOptions(), ({ app }) => installAppPlugins(app))
}
