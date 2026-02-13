import { readdirSync } from 'node:fs'
import path from 'node:path'

/**
 * Searches for all markdown files in a directory and returns them as formatted route paths.
 * 
 * @param baseDir - The directory where the markdown files are located.
 * @param routePrefix - The prefix to add to the returned routes (e.g., '/blog').
 * @returns An array of route strings.
 */

// function walk(dir, fileList = []) {
//   const files = readdirSync(dir, { withFileTypes: true })

//   for (const file of files) {
//     const fullPath = path.join(dir, file.name)

//     if (file.isDirectory()) {
//       walk(fullPath, fileList)
//     } else if (file.name.endsWith('.md')) {
//       const relative = path.relative(blogDir, fullPath)
//       const normalized = relative.replace(/\\/g, '/')
//       const routePath = normalized.replace('.md', '')

//       fileList.push(`/blog/${routePath}`)
//     }
//   }

//   return fileList
// }

export const getMarkdownBlogRoutes = ({ searchPath, fileList = [] }: {
    searchPath: string,
    fileList: string[]
}) => {
    const directoryContent = readdirSync(searchPath, { withFileTypes: true });

    directoryContent.forEach((item) => {
        const fullPath = path.join(searchPath, item.name);

        if (item.isDirectory()) {
            getMarkdownBlogRoutes({ searchPath: fullPath, fileList });
            return;
        }

        if (item.isFile() && item.name.endsWith('.md')) {
            const relativePath = path.relative(searchPath, fullPath)
                .replaceAll(/\\/g, '/')
                .replace('.md', '');

            fileList.push(`/blog/${relativePath}`);
        }
    });

    return fileList;
}