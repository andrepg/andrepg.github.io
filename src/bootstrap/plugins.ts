import type { App } from 'vue'
import { createI18n } from 'vue-i18n'

import { DEFAULT_LOCALE, type AppLocale } from '@config/locales'
import { messages } from '@/utils/locale'

/**
 * Builds the i18n plugin instance, in one language.
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
 * The language is a parameter and not a module-level value because each render
 * is one language: the static build walks `/curriculo`, `/pt/curriculo` and
 * `/es/curriculo` through the very same boot, and only the path tells them
 * apart.
 *
 * The schema is deliberately not passed as a type parameter to `createI18n`: it
 * narrows nothing. See the note in `locale/schema.d.ts`.
 *
 * @see https://vue-i18n.intlify.dev/guide/essentials/optimization#bundle-size
 */
const createI18nPlugin = (locale: AppLocale) =>
  createI18n({
    globalInjection: true,
    allowComposition: true,
    fallbackLocale: DEFAULT_LOCALE,
    locale,
    messages
  })

/**
 * Registers the plugins every boot shares, in the language the page is served
 * in.
 *
 * This is the only place a plugin is installed, and both the `vite` and the
 * `ViteSSG` path go through it — a plugin added here reaches development, the
 * static generation and the hydration alike.
 *
 * The head is deliberately absent: `ViteSSG` installs the server-side variant of
 * the unhead plugin itself while it pre-renders, and installing a second one
 * would leave the generated HTML with a duplicated `<head>`.
 */
export const installAppPlugins = (app: App, locale: AppLocale): void => {
  app.use(createI18nPlugin(locale))
}
