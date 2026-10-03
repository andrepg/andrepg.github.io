import { readdirSync } from 'node:fs'
import path from 'node:path'

import { CONTENT_LOCALE, localizePath } from '../config/locales.ts'

/**
 * Recursively searches for all markdown files in a directory and returns them as formatted route paths.
 * Useful for Vite SSG to determine which routes to render during build.
 *
 * @param options - Configuration object for searching routes.
 * @param options.searchPath - The current directory to search within.
 * @param options.rootPath - The root blog directory used to calculate the relative path (defaults to searchPath).
 * @param options.fileList - The accumulator array for the discovered routes.
 * @returns An array of route strings (e.g., ['/blog/2024/my-post']).
 */
export const getMarkdownBlogRoutes = ({ searchPath, rootPath = searchPath, fileList = [] }: {
    searchPath: string,
    rootPath?: string,
    fileList?: string[]
}) => {
    const directoryContent = readdirSync(searchPath, { withFileTypes: true });

    directoryContent.forEach((item) => {
        const fullPath = path.join(searchPath, item.name);

        if (item.isDirectory()) {
            getMarkdownBlogRoutes({ searchPath: fullPath, rootPath, fileList });
            return;
        }

        if (item.isFile() && item.name.endsWith('.md')) {
            const relativePath = path.relative(rootPath, fullPath)
                .replaceAll(/\\/g, '/')
                .replace('.md', '');

            fileList.push(`/blog/${relativePath}`);
        }
    });

    return fileList;
}

/**
 * The pages of the blog, at the URL they are served at.
 *
 * A post is content the author wrote in one language, so it exists once: an
 * interface translated into another language has nothing to render it with, and
 * an article served under three URLs is the same text three times.
 */
export const getBlogRoutes = (): string[] => {
    const routes = getMarkdownBlogRoutes({
        searchPath: path.resolve(process.cwd(), 'blog'),
    });

    return routes.map((route) => localizePath(route, CONTENT_LOCALE));
};

/**
 * Orchestrates the collection of all routes for Static Site Generation (SSG).
 *
 * The site pages come from the route table `vite-ssg` hands over, already
 * expanded into one path per language, and only the posts — which no table can
 * know about — are discovered on disk.
 *
 * @param paths - Every path in the route table, as the router would match it.
 * @returns A unique array of all strings representing the routes to be pre-rendered.
 */
export const getRouteConfig = (paths: string[]) => {
    console.log(`[ssg] Preparing static routes`);

    const staticRoutes = paths.filter((route) => !route.includes(':') && !route.includes('*'));

    console.log(`[ssg] Found ${staticRoutes.length} static routes`);

    const blogRoutes = getBlogRoutes();

    console.log(`[ssg] Found ${blogRoutes.length} blog routes`);

    return Array.from(new Set([...staticRoutes, ...blogRoutes]));
}
