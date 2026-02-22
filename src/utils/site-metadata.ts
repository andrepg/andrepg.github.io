import { UserConfig } from "@data/website";

interface IBaseOgParams {
    title: string,
    description: string,
    canonicalUrl?: string
}

interface ITwitterOgParams {
    card: string,
    title: string,
    description: string
}

interface ILinkTag {
    rel: string,
    href: string
}

interface IHeadTag {
    [key: `data-${string}`]: string | boolean | undefined;
    
    name: string,
    content: string
}

interface IPropertyTag {
    [key: `data-${string}`]: string | boolean | undefined;
    
    property: string,
    content: string
}

export const getPlainOg = ({
    title,
    description,
    canonicalUrl
}: IBaseOgParams): IPropertyTag[] => [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: canonicalUrl ?? UserConfig.website.url },
]

export const getTwitterOg = ({
    card,
    title,
    description
}: ITwitterOgParams): IHeadTag[] => ([
    { name: 'twitter:card', content: card },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
]);

export const getLinkTag = ({ rel, href }: ILinkTag): ILinkTag => ({ rel, href });