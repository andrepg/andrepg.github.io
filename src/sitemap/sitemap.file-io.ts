import fs from 'node:fs'
import { parse } from 'node-html-parser';

export function isDirectory(path: string): boolean {
    return fs.statSync(path).isDirectory();
}

export function readDirectory(directory: string): string[] {
    return fs.readdirSync(directory);
}

export function fileExists(path: string): boolean {
    return fs.existsSync(path);
}

export function readFile(path: string): string {
    return fs.readFileSync(path, 'utf-8');
}

export function saveFile(content: string, path: string) {
    fs.writeFileSync(path, content);
}

export const parseHtmlHeader = (file: string) => (
    parse(readFile(file))
).querySelector('head')