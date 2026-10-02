import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead, type ReactiveHead } from '@unhead/vue';

import { getRouteSeo, RoutePath } from '@config/routes';
import { IPageSeo } from '@/interfaces';
import { resolveJsonLd } from '@/utils/structured-data';
import {
  buildPageTitle,
  canonicalUrl,
  dtoArticle,
  dtoJsonLd,
  dtoKeywords,
  dtoPlainOg,
  dtoRobots,
  dtoTwitterOg
} from '@/utils/site-metadata';
import { UserConfig } from '../../data/website';

export type PageSeoOverrides = Partial<IPageSeo> | (() => Partial<IPageSeo>);

const resolveOverrides = (overrides?: PageSeoOverrides): Partial<IPageSeo> =>
  typeof overrides === 'function' ? overrides() : (overrides ?? {});

/**
 * Assembles the whole document head of a page: title, description, keywords,
 * canonical link, Open Graph, Twitter cards, robots and JSON-LD schemas.
 *
 * Pure: given the same metadata it always returns the same head.
 */
export const buildPageHead = (seo: IPageSeo, canonical: string): ReactiveHead => {
  const title = buildPageTitle(seo.title);
  const description = seo.description ?? UserConfig.author.shortBiography;
  const image = seo.image ?? UserConfig.website.image;
  const type = seo.type ?? 'website';
  const card = seo.card ?? 'summary';

  return {
    title,
    meta: [
      { name: 'description', content: description },
      ...dtoKeywords(seo.keywords),
      ...dtoRobots(seo.noIndex),
      ...dtoArticle(seo.publishedTime),
      ...dtoPlainOg({ title, description, image, type, canonicalUrl: canonical }),
      ...dtoTwitterOg({ card, title, description, image })
    ],
    link: [{ rel: 'canonical', href: canonical }],
    script: dtoJsonLd(resolveJsonLd(seo.jsonLd))
  };
};

/**
 * Single entry point for page metadata. The base metadata comes from the route
 * declaration in `@config/routes`, so views only declare what is specific to
 * them.
 *
 * @example
 * usePageHead(RoutePath.PROJECTS)
 *
 * @example
 * usePageHead(RoutePath.BLOG_ARTICLE, () => ({
 *   title: metadata.title,
 *   description: metadata.excerpt,
 *   canonicalUrl: canonical,
 *   jsonLd: blogPostingLd(metadata, canonical)
 * }))
 *
 * @param path - Route whose declared metadata should be used.
 * @param overrides - Fields to replace, or a getter for dynamic pages.
 */
export const usePageHead = (path: RoutePath, overrides?: PageSeoOverrides): void => {
  const route = useRoute();

  const seo = computed<IPageSeo>(() => ({
    ...getRouteSeo(path),
    ...resolveOverrides(overrides)
  }));

  // The concrete path is required for dynamic routes such as
  // `/blog/:year/:article`, where the declared path is only a pattern.
  const canonical = computed(() => seo.value.canonicalUrl ?? canonicalUrl(route.path));

  useHead(computed<ReactiveHead>(() => buildPageHead(seo.value, canonical.value)));
};