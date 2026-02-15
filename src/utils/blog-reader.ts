import { PostMarkdown } from "@/interfaces";

/**
 * Carrega TODOS os markdowns no build
 */
export const BASE_URL = import.meta.env.BASE_URL;

export const blogModules: Record<string, PostMarkdown> = import.meta.glob('/blog/**/*.md', { eager: true });