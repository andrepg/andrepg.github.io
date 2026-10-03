import type { IPost } from '@/interfaces'
import type {
  JsonLdBuilder,
  JsonLdDocument,
  JsonLdInput,
  JsonLdKey,
  MessageResolver,
  PageContext
} from '@/types'

import { UserConfig } from '@data/website'
import { SocialMediaLinks } from '@data/social-media'
import { getTimeline } from '@data/curriculum'
import { getTecnologias } from '@data/experience'
import { getProjects } from '@data/projects'
import { canonicalUrl } from '@/utils/site-metadata'

const SCHEMA = 'https://schema.org'

const SITE_NAME = UserConfig.author.name
/** Absolute site address, without a trailing slash. */
const SITE_URL = canonicalUrl('/').replace(/\/+$/, '')
const SITE_IMAGE = UserConfig.website.image
const LOGO_URL = `${SITE_URL}/favicon-512x512.png`

/**
 * JSON-LD requires absolute URLs, so every path it emits goes through the same
 * builder as the canonical link, and a schema can never advertise an address the
 * page itself does not.
 */
const absoluteUrl = canonicalUrl

const sameAs = (): string[] =>
  SocialMediaLinks.filter((link) => link.target.startsWith('http')).map((link) => link.target)

const personNode = (t: MessageResolver) => ({
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: SITE_NAME,
  jobTitle: t('profile.role'),
  description: t('profile.biography'),
  url: SITE_URL,
  image: UserConfig.author.avatar,
  sameAs: sameAs()
})

const publisherNode = () => ({
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    '@type': 'ImageObject',
    url: LOGO_URL
  }
})

const webSiteNode = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: SITE_LANGUAGE,
  publisher: { '@id': `${SITE_URL}/#person` }
})

/**
 * Site language, declared literally.
 *
 * `en` and `es` are shipped and registered, but nothing selects them yet — the
 * site renders in Portuguese on every route — so `pt-BR` is still the whole
 * truth and this stays a constant.
 *
 * The moment a language selector exists, this stops being a property of the
 * site and becomes a property of the render: a `WebSite` node with a single
 * `inLanguage` would be claiming the whole site is Portuguese while the visitor
 * is reading Spanish. That is when it moves into `PageContext`, alongside the
 * translator, and the post-level `BlogPosting` nodes keep `pt-BR` — those
 * describe an article written in Portuguese whatever chrome it is rendered in.
 */
const SITE_LANGUAGE = 'pt-BR'

/** Homepage: who the author is, plus the site wrapper. */
export const personLd: JsonLdBuilder = ({ t }) => ({
  '@context': SCHEMA,
  '@graph': [personNode(t), webSiteNode()]
})

/** Curriculum: the profile page and the roles behind it. */
export const profileLd: JsonLdBuilder = ({ seo, t }) => ({
  '@context': SCHEMA,
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${absoluteUrl('/curriculo')}#webpage`,
      url: absoluteUrl('/curriculo'),
      name: seo.title ?? '',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        jobTitle: t('profile.role'),
        hasOccupation: getTimeline(t).map((item, index) => ({
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
})

/**
 * Projects index: the published projects as an ordered list.
 *
 * The page's own name and description come from the route's resolved text, so
 * the schema and the `<title>` can no longer say different things. The project
 * descriptions come from the same resolver the page renders them with, for the
 * same reason.
 */
export const collectionLd: JsonLdBuilder = ({ seo, t }) => ({
  '@context': SCHEMA,
  '@type': 'CollectionPage',
  '@id': `${absoluteUrl('/projetos')}#webpage`,
  url: absoluteUrl('/projetos'),
  name: seo.title ?? '',
  description: seo.description ?? '',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: getProjects(t).map((project, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: project.label,
      url: project.target,
      description: project.description
    }))
  }
})

/**
 * Blog index. Depends on the published posts, so it is built by the view and
 * handed over to `usePageHead` as a custom schema.
 *
 * Only the surrounding text is translated. The posts keep whatever language they
 * were written in, which is what makes them indistinguishable from the rest of
 * the page to a crawler that reads both.
 */
export const blogLd =
  (posts: IPost[]): JsonLdBuilder =>
  ({ t }) => ({
    '@context': SCHEMA,
    '@type': 'Blog',
    '@id': `${absoluteUrl('/blog')}#blog`,
    name: t('blog.ld.name', { site: SITE_NAME }),
    description: t('blog.ld.description', { site: SITE_NAME }),
    url: absoluteUrl('/blog'),
    inLanguage: SITE_LANGUAGE,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: publisherNode(),
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.published_at,
      url: absoluteUrl(post.path),
      author: { '@id': `${SITE_URL}/#person` },
      publisher: publisherNode(),
      image: SITE_IMAGE
    }))
  })

/** A single article. Built by the view, which owns the post metadata. */
export const blogPostingLd =
  (post: IPost, canonicalUrl: string): JsonLdBuilder =>
  () => ({
    '@context': SCHEMA,
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.published_at,
    inLanguage: SITE_LANGUAGE,
    image: post.cover ?? SITE_IMAGE,
    url: canonicalUrl,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: publisherNode(),
    isPartOf: { '@id': `${absoluteUrl('/blog')}#blog` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl }
  })

const JSON_LD_BUILDERS: Record<JsonLdKey, JsonLdBuilder> = {
  person: personLd,
  profile: profileLd,
  collection: collectionLd
}

/**
 * Normalizes the `jsonLd` page metadata into schema documents, expanding the
 * bundled schema keys used by the route declaration.
 *
 * `context` is the page's resolved text plus its translator, so every schema
 * describes the page in the language the page is being rendered in.
 */
export const resolveJsonLd = (
  input: JsonLdInput | undefined,
  context: PageContext
): JsonLdDocument[] => {
  if (!input) return []

  const items = Array.isArray(input) ? input : [input]

  return items.map((item) => {
    const builder = typeof item === 'string' ? JSON_LD_BUILDERS[item] : item

    if (!builder) {
      throw new Error(`[structured-data] Unknown JSON-LD key: ${item}`)
    }

    return builder(context)
  })
}
