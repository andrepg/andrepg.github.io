import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import { DEFAULT_LOCALE, messages } from '@/utils/locale'

/**
 * Builds the i18n plugin instance.
 *
 * `legacy: false` is what enables the Composition API — without it `useI18n` is
 * unavailable inside `<script setup>`, which is how every component here is
 * written. `globalInjection` keeps `$t` available in templates.
 *
 * The instance is rebuilt per app instead of shared on purpose: the static
 * generation builds a fresh app for each of its routes, and a plugin carrying
 * per-app state across those instances is exactly what the legacy option used to
 * do. `allowComposition: true` lets `useI18n()` outside a component fall back to
 * that global instance, which is what SSR setup code needs.
 *
 * The schema is deliberately not passed as a type parameter to `createI18n`: it
 * narrows nothing. See the note in `locale/schema.d.ts`.
 *
 * @see https://vue-i18n.intlify.dev/guide/essentials/optimization#bundle-size
 */
const createI18nPlugin = () =>
  createI18n({
    globalInjection: true,
    allowComposition: true,
    fallbackLocale: DEFAULT_LOCALE,
    locale: DEFAULT_LOCALE,
    messages
  })

/**
 * Registers the plugins every boot shares.
 *
 * This is the only place a plugin is installed, and both the `vite` and the
 * `ViteSSG` path go through it — a plugin added here reaches development, the
 * static generation and the hydration alike.
 *
 * The head is deliberately absent: `ViteSSG` installs the server-side variant of
 * the unhead plugin itself while it pre-renders, and installing a second one
 * would leave the generated HTML with a duplicated `<head>`.
 */
export const installAppPlugins = (app: App): void => {
  app.use(createI18nPlugin())
}
