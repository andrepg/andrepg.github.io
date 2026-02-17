import { Post, PostMarkdown } from "@/interfaces";
import { APP_CONFIG } from "@config/app";

/**
 * The base URL of the application, retrieved from the centralized config.
 */
export const BASE_URL = APP_CONFIG.BASE_URL;

/**
 * A collection of all blog post modules found in the /blog directory.
 * Uses Vite's glob import to eagerly load all .md files.
 * The keys are the relative file paths, and the values contain the post's
 * frontmatter metadata and HTML content.
 */
export const blogModules: Record<string, PostMarkdown> = import.meta.glob('/blog/**/*.md', {
    eager: true
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
export const getHeadTags = (
    metadata: PostMarkdown['attributes'],
    canonicalUrl: string
) => ({
  title: metadata.title,
  meta: [
    { name: 'description', content: metadata.excerpt || 'Blog de André Paul Grandsire' },

    // Open Graph
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: metadata.title },
    { property: 'og:description', content: metadata.excerpt || 'Blog de André Paul Grandsire' },
    { property: 'og:url', content: canonicalUrl },

    // Twitter
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:title', content: metadata.title },
    { name: 'twitter:description', content: metadata.excerpt || 'Blog de André Paul Grandsire' },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl }
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": metadata.title,
        "author": {
          "@type": "Person",
          "name": "André Paul Grandsire" // TODO Change this to author from build in the future
        },
        "publisher": {
          "@type": "Organization",
          "name": "andrepg.dev",
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
      })
    }
  ]
})


export const allPosts: Post[] = Object.entries(blogModules)
  .map(([fullPath, mod]) => {
    const cleanPath = fullPath
      .replace('/blog/', '')
      .replace('.md', '')

    const [year, slug] = cleanPath.split('/')

    return {
      path: `/blog/${year}/${slug}`,
      year,
      slug,
      title: mod.attributes.title,
      excerpt: mod.attributes.excerpt,
      serie: mod.attributes.serie,
      serie_part: mod.attributes.serie_part,
      tags: mod.attributes.tags,
      category: mod.attributes.category,
      published_at: mod.attributes.published_at,
    }
  })
  .sort((a, b) =>
    (b.published_at ?? '').localeCompare(a.published_at ?? '')
  )

  export function getPostByPath(path: string) {
  return allPosts.find(p => p.path === path)
}

export function getPostsBySerie(
  serie?: string,
  excludePath?: string
) {
  if (!serie) return []

  return allPosts
    .filter(p => p.serie === serie && p.path !== excludePath)
    .sort((a, b) => (a.serie_part ?? 0) - (b.serie_part ?? 0))
}

export function getPostsByTag(tag: string) {
  return allPosts.filter(p => p.tags?.includes(tag))
}

export function getPostsByCategory(category: string) {
  return allPosts.filter(p => p.category?.includes(category))
}
