import { slugify } from '@/utils/slugify';

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

const parseAnchors = (content: string) => {
    if (!content.includes('[[#')) {
        return content;
    }

    return content.replace(/\[\[#([^\]]+)\]\]/g, (_, name) => {
        const slug = slugify(name);
        return `<a href="#${slug}">${name}</a>`;
    });
}

const parseHeaderIds = (content: string) => {
    return content.replace(/<(h[1-6])(.*?)>(.*?)<\/\1>/gi, (match, tag, attrs, text) => {
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

