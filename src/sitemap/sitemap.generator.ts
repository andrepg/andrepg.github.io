import path from 'node:path'
import { fileExists, isDirectory, readDirectory } from './sitemap.file-io';

const IGNORED = [
    '.vite',
    '404.html',
    'sitemap.xml',
    'sitemap.json',
    'assets',
    'site.webmanifest',
];

export const getFileTree = (
    currentDirectory: string
): string[] => {
    if (!fileExists(currentDirectory)) return [];

    let tree: string[] = readDirectory(currentDirectory);

    tree = filterOutIgnoredFiles(tree).map(
        item => path.join(currentDirectory, item)
    );

    // Search and process each folder recursively
    tree = tree.flatMap(item => isDirectory(item) ? getFileTree(item) : item);

    // Filter only HTML files
    return filterFilesByExtension(tree, ['.html']);
};

const filterOutIgnoredFiles = (files: string[]): string[] => files.filter(
    file => !IGNORED.includes(path.basename(file))
);

const filterFilesByExtension = (
    files: string[],
    extensions: string[]
): string[] => files.filter(
    file => extensions.includes(path.extname(file))
);