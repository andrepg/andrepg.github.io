import APP_CONFIG from '@config/app';
import type { ResolvableMeta, ResolvableScript } from '@unhead/vue';
import { IBaseOgParams, ITwitterOgParams } from '@/interfaces';
import { UserConfig } from '../../data/website';

const SITE_NAME = UserConfig.author.name;
const SITE_LOCALE = 'pt_BR';

/**
 * Absolute URL of a path inside the deployed site, using the configured base.
 */
export const canonicalUrl = (path: string): string => `${APP_CONFIG.BASE_URL}${path}`;

/**
 * Builds the document title, appending the site name to every page except the
 * one that is the site name itself.
 */
export const buildPageTitle = (title?: string): string => {
  const page = title?.trim();

  if (!page || page === SITE_NAME) return SITE_NAME;

  return `${page} | ${SITE_NAME}`;
};

export const dtoPlainOg = ({
  title,
  description,
  canonicalUrl: url,
  image,
  type
}: IBaseOgParams): ResolvableMeta[] => [
  { property: 'og:type', content: type },
  { property: 'og:title', content: title },
  { property: 'og:description', content: description },
  { property: 'og:url', content: url },
  { property: 'og:image', content: image },
  { property: 'og:site_name', content: SITE_NAME },
  { property: 'og:locale', content: SITE_LOCALE }
];

export const dtoTwitterOg = ({
  card,
  title,
  description,
  image
}: ITwitterOgParams): ResolvableMeta[] => [
  { name: 'twitter:card', content: card },
  { name: 'twitter:title', content: title },
  { name: 'twitter:description', content: description },
  { name: 'twitter:image', content: image }
];

export const dtoKeywords = (keywords?: string[]): ResolvableMeta[] =>
  keywords?.length ? [{ name: 'keywords', content: keywords.join(', ') }] : [];

export const dtoRobots = (noIndex?: boolean): ResolvableMeta[] =>
  noIndex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [];

export const dtoArticle = (publishedTime?: string): ResolvableMeta[] =>
  publishedTime
    ? [
        { property: 'article:published_time', content: publishedTime },
        { property: 'article:author', content: SITE_NAME }
      ]
    : [];

export const dtoJsonLd = (schemas: Record<string, unknown>[]): ResolvableScript[] =>
  schemas.map(schema => ({
    type: 'application/ld+json',
    textContent: JSON.stringify(schema)
  }));