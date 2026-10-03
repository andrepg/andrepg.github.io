import fs from 'node:fs'
import { parse } from 'node-html-parser'

export function isDirectory(path: string): boolean {
  return fs.statSync(path).isDirectory()
}

export function readDirectory(directory: string): string[] {
  return fs.readdirSync(directory)
}

export function fileExists(path: string): boolean {
  return fs.existsSync(path)
}

export function readFile(path: string): string {
  return fs.readFileSync(path, 'utf-8')
}

export function saveFile(content: string, path: string) {
  fs.writeFileSync(path, content)
}

/**
 * A generated page, parsed.
 *
 * The wrapper is synthetic and the `<html>` element is its only child, which is
 * why the document language — written on that element by the build — is read
 * through `querySelector('html')` and not off the root.
 */
export const parseHtmlDocument = (file: string) => parse(readFile(file))
