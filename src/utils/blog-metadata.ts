import { IPost, IPostMarkdown } from "@/interfaces";
import APP_CONFIG from "@config/app";
import { ReactiveHead } from "@unhead/vue";
import { getPlainOg, getTwitterOg } from "./site-metadata";
import { UserConfig } from "@data/website";

const BLOG_TITLE = `Blog de ${UserConfig.author.name}`

const getBlogPostingLdJson = (
    metadata: IPostMarkdown['attributes'],
    canonicalUrl: string
): string => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": metadata.title,
    "author": {
        "@type": "Person",
        "name": UserConfig.author.name,
    },
    "publisher": {
        "@type": "Organization",
        "name": UserConfig.author.name,
        "logo": {
            "@type": "ImageObject",
            "url": `${APP_CONFIG.BASE_URL}/favicon-512x512.png`
        }
    },
    "datePublished": metadata.published_at,
    "dateModified": metadata.published_at,
    "description": metadata.excerpt,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": canonicalUrl
    }
});

const getBlogIndexLdJson = (posts: IPost[]) => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": `Blog | ${UserConfig.author.name}`,
    "description": BLOG_TITLE,
    "url": `${APP_CONFIG.BASE_URL}/blog`,
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `${APP_CONFIG.BASE_URL}/blog`
    },
    "blogPost": posts.map((post) => ({
        "@type": "Blog",
        "headline": post.title,
        "datePublished": post.published_at,
        "author": {
            "@type": "Person",
            "name": UserConfig.author.name,
        },
        "publisher": {
            "@type": "Organization",
            "name": UserConfig.author.name,
            "logo": {
                "@type": "ImageObject",
                "url": `${APP_CONFIG.BASE_URL}/favicon-512x512.png`
            }
        },
        "url": `${APP_CONFIG.BASE_URL}/${post.path}`,
        "description": post.excerpt
    }))
});

/**
 * Generates SEO head tags (title, meta, and social media tags) for a blog post.
 *
 * This function takes the post metadata and a canonical URL to produce an object
 * compatible with Vue's useHead or similar head management libraries.
 * It includes standard meta description, Open Graph tags for Facebook/LinkedIn,
 * and Twitter Card tags.
 *
 * @param metadata - The blog post's frontmatter attributes (title, excerpt, etc.)
 * @param canonicalUrl - The full, unique URL for this specific blog post
 * @returns An object containing title, meta array, and link array for SEO headers
 */
export const getSinglePostTags = (
    metadata: IPostMarkdown['attributes'],
    canonicalUrl: string
): ReactiveHead => ({
  title: metadata.title,
  meta: [
    { name: 'description', content: metadata.excerpt || BLOG_TITLE },
    { property: 'article:published_time', content: metadata.published_at || new Date().toISOString() },

    // Open Graph
    ...getPlainOg({
      title: metadata.title,
      description: metadata.excerpt || BLOG_TITLE,
      canonicalUrl
    }),

    // Twitter
    ...getTwitterOg({
      card: 'summary',
      title: metadata.title,
      description: metadata.excerpt || BLOG_TITLE
    })
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      textContent: getBlogPostingLdJson(metadata, canonicalUrl),
    }
  ]
})

export const getBlogIndexTags = (posts: IPost[]): ReactiveHead => ({
  title: BLOG_TITLE,
  meta: [
    { name: 'description', content: BLOG_TITLE },
    ...getPlainOg({
      title: `Postagens |  ${BLOG_TITLE}`,
      description: `Postagens |  ${BLOG_TITLE}`,
      canonicalUrl: `${APP_CONFIG.BASE_URL}/blog`
    }),
    ...getTwitterOg({
      card: 'summary',
      title: `Postagens |  ${BLOG_TITLE}`,
      description: `Postagens |  ${BLOG_TITLE}`,
    })
  ],

  link: [
    { rel: 'canonical', href: `${APP_CONFIG.BASE_URL}/blog` }
  ],
  script: [
    {
      type: 'application/ld+json',
      textContent: getBlogIndexLdJson(posts),
    }
  ]
})