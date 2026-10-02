import './assets/main.css'

import { APP_CONFIG } from '@config/app'
import { bootstrapClient, bootstrapStatic } from '@/bootstrap'

if (APP_CONFIG.IS_DEV) {
  bootstrapClient()
}

/**
 * `vite-ssg build` imports this module and calls the `createApp` export once per
 * route to render it to static HTML, which is the only reason the export exists.
 *
 * It stays `undefined` while `vite` serves the source, a value the build never
 * reads. Outside `vite` the static branch is also the one that hydrates the
 * generated markup, so it is the only branch that reaches a browser in a built
 * site.
 */
export const createApp = APP_CONFIG.IS_DEV ? undefined : bootstrapStatic()
