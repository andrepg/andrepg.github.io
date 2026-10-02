import {
  IJsonLdBuilder,
  IJsonLdInput,
  IPost,
  JsonLdKey
} from '@/interfaces';
import { UserConfig } from '../../data/website';
import { SocialMediaLinks } from '../../data/social-media';
import { timeline } from '../../data/curriculum';
import { getTecnologias } from '../../data/experience';
import { Projects } from '../../data/projects';

const SCHEMA = 'https://schema.org';

const SITE_NAME = UserConfig.author.name;
const SITE_URL = UserConfig.website.url.replace(/\/+$/, '');
const SITE_IMAGE = UserConfig.website.image;
const LOGO_URL = `${SITE_URL}/favicon-512x512.png`;

/**
 * JSON-LD requires absolute URLs, so it is anchored on the production origin
 * instead of the build-time base URL.
 */
const absoluteUrl = (path: string): string => `${SITE_URL}${path}`;

const sameAs = (): string[] =>
  SocialMediaLinks.filter(link => link.target.startsWith('http')).map(
    link => link.target
  );

const personNode = () => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_NAME,
  jobTitle: UserConfig.author.role,
  description: UserConfig.author.biography,
  url: SITE_URL,
  image: UserConfig.author.avatar,
  sameAs: sameAs()
});

const publisherNode = () => ({
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL
  }
});

const webSiteNode = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: 'pt-BR',
  publisher: { '@id': `${SITE_URL}/#person` }
});

/** Homepage: who the author is, plus the site wrapper. */
export const personLd: IJsonLdBuilder = () => ({
  '@context': SCHEMA,
  '@graph': [personNode(), webSiteNode()]
});

/** Curriculum: the profile page and the roles behind it. */
export const profileLd: IJsonLdBuilder = () => ({
  '@context': SCHEMA,
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${absoluteUrl('/curriculo')}#webpage`,
      url: absoluteUrl('/curriculo'),
      name: 'Currículo',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        jobTitle: UserConfig.author.role,
        hasOccupation: timeline.map((item, index) => ({
          '@type': 'Occupation',
          position: index + 1,
          name: item.title,
          description: item.description,
          skills: getTecnologias(item.stack).map((tecnologia) => tecnologia.label),
          worksFor: { '@type': 'Organization', name: item.company }
        }))
      }
    }
  ]
});

/** Projects index: the published projects as an ordered list. */
export const collectionLd: IJsonLdBuilder = () => ({
  '@context': SCHEMA,
  '@type': 'CollectionPage',
  '@id': `${absoluteUrl('/projetos')}#webpage`,
  url: absoluteUrl('/projetos'),
  name: 'Projetos',
  description: 'Meus projetos publicados mais relevantes.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: Projects.map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.label,
      url: project.target,
      description: project.description
    }))
  }
});

/**
 * Blog index. Depends on the published posts, so it is built by the view and
 * handed over to `usePageHead` as a custom schema.
 */
export const blogLd =
  (posts: IPost[]): IJsonLdBuilder =>
    () => ({
      '@context': SCHEMA,
      '@type': 'Blog',
      '@id': `${absoluteUrl('/blog')}#blog`,
      name: `Blog de ${SITE_NAME}`,
      description: `Publicações e notas de ${SITE_NAME}.`,
      url: absoluteUrl('/blog'),
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: publisherNode(),
      blogPost: posts.map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.published_at,
        url: absoluteUrl(post.path),
        author: { '@id': `${SITE_URL}/#person` },
        publisher: publisherNode(),
        image: SITE_IMAGE
      }))
    });

/** A single article. Built by the view, which owns the post metadata. */
export const blogPostingLd =
  (post: IPost, canonicalUrl: string): IJsonLdBuilder =>
    () => ({
      '@context': SCHEMA,
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.published_at,
      dateModified: post.published_at,
      inLanguage: 'pt-BR',
      image: post.cover ?? SITE_IMAGE,
      url: canonicalUrl,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: publisherNode(),
      isPartOf: { '@id': `${absoluteUrl('/blog')}#blog` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl }
    });

const JSON_LD_BUILDERS: Record<JsonLdKey, IJsonLdBuilder> = {
  person: personLd,
  profile: profileLd,
  collection: collectionLd
};

/**
 * Normalizes the `jsonLd` page metadata into schema documents, expanding the
 * bundled schema keys used by the route declaration.
 */
export const resolveJsonLd = (input?: IJsonLdInput): Record<string, unknown>[] => {
  if (!input) return [];

  const items = Array.isArray(input) ? input : [input];

  return items.map(item => {
    const builder = typeof item === 'string' ? JSON_LD_BUILDERS[item] : item;

    if (!builder) {
      throw new Error(`[structured-data] Unknown JSON-LD key: ${item}`);
    }

    return builder();
  });
};