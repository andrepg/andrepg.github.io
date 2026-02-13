import { readdirSync } from 'node:fs'
import path from 'node:path'

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