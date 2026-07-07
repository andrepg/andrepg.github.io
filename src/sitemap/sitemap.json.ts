import { IHtmlMetaTag, ISitemapDto } from "@/interfaces";
import { parseHtmlHeader, saveFile } from "./sitemap.file-io";

const formatMetaTag = (item: HTMLElement): IHtmlMetaTag => ({
    name: item.getAttribute('name') ?? item.getAttribute('property') ?? '',
    content: item.getAttribute('content') ?? '',
})

const getMetaTagContent = (tags: IHtmlMetaTag[], name: string) => tags.find(
    tag => tag.name === name
)?.content ?? '';

const parseMetaTags = (head: HTMLElement[]): IHtmlMetaTag[] => head
    .flatMap(item => formatMetaTag(item))
    .filter(item => !!item.name)

const sitemapDto = (tags: IHtmlMetaTag[], canonical: string): ISitemapDto => ({
    path: canonical,
    title: getMetaTagContent(tags, 'og:title'),
    description: getMetaTagContent(tags, 'description'),
    type: getMetaTagContent(tags, 'og:type'),
    keywords: getMetaTagContent(tags, 'keywords').split(','),
    publishedTime: getMetaTagContent(tags, 'article:published_time'),
    modifiedTime: '',
    // TODO Add more tags to HTML and here. We can feed from JSON ld as well
})

export const parseHtmlFile = (file: string): ISitemapDto => {
    const head = parseHtmlHeader(file);
    const children = head?.querySelectorAll('meta');

    const metaTags = parseMetaTags(
        children as unknown as HTMLElement[]
    )

    const canonical = head?.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';

    return sitemapDto(metaTags, canonical);
}

export const generateJsonSitemap = (files: string[], directory: string): number => {
    const parsedFiles = files.map(parseHtmlFile);

    saveFile(
        JSON.stringify(parsedFiles),
        `${directory}/sitemap.json`
    );

    return parsedFiles.length;
}