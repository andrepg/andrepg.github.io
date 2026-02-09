import { slugify } from '@/utils/slugify';

/**
 * 
 * @param content string 
 * @returns string
 */
const parseCheckboxes = (content: string) => {
    if (!content.includes('[x]') && !content.includes('[ ]')) {
        return content;
    }

    const checkbox = `<input
        type="checkbox"
        class="mx-1 checkbox checkbox-sm checkbox-primary align-middle opacity-70"
        checked
        name="checkbox"
        disabled>`;

    return content
        .replace(/\[x\]/g, checkbox) //
        .replace(/\[ \]/g, checkbox.replace('checked', ''));
}

/**
 * 
 * @param content string 
 * @returns string
 */
const parseAnchors = (content: string) => {
    if (!content.includes('[[#')) {
        return content;
    }

    return content.replace(/\[\[#([^\]]+)\]\]/g, (_match: string, name: string) => {
        const slug = slugify(name);
        return `<a href="#${slug}">${name}</a>`;
    });
}

const parseHeaderIds = (content: string) => {
    return content.replace(/<(h[1-6])(.*?)>(.*?)<\/\1>/gi, (match: string, tag: string, attrs: string, text: string) => {
        if (attrs.includes('id=')) {
            return match;
        }

        const plainText = text.replace(/<[^>]*>?/gm, '');
        const id = slugify(plainText);

        return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
    });
}

export const transformContent = (content: string) => {
    let parsed = parseCheckboxes(content);
    parsed = parseAnchors(parsed);
    parsed = parseHeaderIds(parsed);

    return parsed;
}

