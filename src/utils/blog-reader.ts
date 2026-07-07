import { IPost, IPostMarkdown } from "@/interfaces";

/**
 * A collection of all blog post modules found in the /blog directory.
 * Uses Vite's glob import to eagerly load all .md files.
 * The keys are the relative file paths, and the values contain the post's
 * frontmatter metadata and HTML content.
 */
export const blogModules: Record<string, IPostMarkdown> = import.meta.glob('/blog/**/*.md', {
    eager: true
});

export const allPosts: IPost[] = Object.entries(blogModules)
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

export function getPublished(): IPost[] {
  return allPosts.filter(post => post.published_at);
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


