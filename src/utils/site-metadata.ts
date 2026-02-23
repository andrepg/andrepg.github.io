import { IBaseOgParams, IHtmlMetaTag, ITwitterOgParams } from "@/interfaces";
import { UserConfig } from "@data/website";

const defaultUrl = UserConfig.website.url;

export const dtoPlainOg = ({
    title,
    description,
    canonicalUrl
}: IBaseOgParams): IHtmlMetaTag[] => [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl ?? defaultUrl },
]

export const dtoTwitterOg = ({
    card,
    title,
    description
}: ITwitterOgParams): IHtmlMetaTag[] => ([
    { name: 'twitter:card', content: card },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
]);