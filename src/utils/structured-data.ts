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

import { CONTENT_LOCALE, LOCALE_META, localizePath } from '@config/locales'
import { RoutePath } from '@config/routes'

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

/**
 * The blog as a whole, at the URL of the index that publishes it.
 *
 * Each index describes the blog from the outside, in its own language and at its
 * own address — so the node is identified by the page carrying it, and an article
 * belongs to the one written in the language the article is in. A single shared
 * identifier would instead put three different `url` values under one `@id`,
 * which is the same entity contradicting itself.
 *
 * The posts, though, are content the author wrote in a single language and are
 * served from a single URL, so they are listed and linked under that one
 * whichever index is being read.
 */
const BLOG_NODE_URL = absoluteUrl(localizePath(RoutePath.BLOG, CONTENT_LOCALE))

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

/**
 * Site wrapper.
 *
 * `inLanguage` lists every language the site is published in, because the node
 * describes the site and not the page being rendered: one language here would
 * claim the whole site is English while the visitor is reading Portuguese. Each
 * page node below carries the single language of its page.
 */
const webSiteNode = () => ({
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: Object.values(LOCALE_META).map((meta) => meta.htmlLang),
  publisher: { '@id': `${SITE_URL}/#person` }
})

/** Homepage: who the author is, plus the site wrapper. */
export const personLd: JsonLdBuilder = ({ t }) => ({
  '@context': SCHEMA,
  '@graph': [personNode(t), webSiteNode()]
})

/** Curriculum: the profile page and the roles behind it. */
export const profileLd: JsonLdBuilder = ({ seo, t, path, locale }) => ({
  '@context': SCHEMA,
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${absoluteUrl(path)}#webpage`,
      url: absoluteUrl(path),
      name: seo.title ?? '',
      inLanguage: LOCALE_META[locale].htmlLang,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: SITE_NAME,
        jobTitle: t('profile.role'),
        inLanguage: LOCALE_META[locale].htmlLang,
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
export const collectionLd: JsonLdBuilder = ({ seo, t, path, locale }) => ({
  '@context': SCHEMA,
  '@type': 'CollectionPage',
  '@id': `${absoluteUrl(path)}#webpage`,
  url: absoluteUrl(path),
  name: seo.title ?? '',
  description: seo.description ?? '',
  inLanguage: LOCALE_META[locale].htmlLang,
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
 * the page to a crawler that reads both — so this index exists in every language
 * and points at the single one the posts live in.
 */
export const blogLd =
  (posts: IPost[]): JsonLdBuilder =>
  ({ t, path, locale }) => ({
    '@context': SCHEMA,
    '@type': 'Blog',
    '@id': `${absoluteUrl(path)}#blog`,
    name: t('blog.ld.name', { site: SITE_NAME }),
    description: t('blog.ld.description', { site: SITE_NAME }),
    url: absoluteUrl(path),
    inLanguage: LOCALE_META[locale].htmlLang,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    publisher: publisherNode(),
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.published_at,
      inLanguage: LOCALE_META[CONTENT_LOCALE].htmlLang,
      url: absoluteUrl(localizePath(post.path, CONTENT_LOCALE)),
      author: { '@id': `${SITE_URL}/#person` },
      publisher: publisherNode(),
      image: SITE_IMAGE
    }))
  })

/**
 * A single article. Built by the view, which owns the post metadata.
 *
 * The article keeps the language it was written in whatever the interface around
 * it says — which here is the same language, since the article is served in one.
 */
export const blogPostingLd =
  (post: IPost, canonicalUrl: string): JsonLdBuilder =>
  () => ({
    '@context': SCHEMA,
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.published_at,
    inLanguage: LOCALE_META[CONTENT_LOCALE].htmlLang,
    image: post.cover ?? SITE_IMAGE,
    url: canonicalUrl,
    author: { '@id': `${SITE_URL}/#person` },
    publisher: publisherNode(),
    // The blog in the language this article is written in, whose index is the one
    // that lists it.
    isPartOf: { '@id': `${BLOG_NODE_URL}#blog` },
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
 * `context` is the page's resolved text, its translator and the page itself — its
 * path, its language, the other versions of it — so every schema describes the
 * page as it is being served.
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
