const parseCheckboxes = (content: string) => {

    if (!content.includes('[x]') && !content.includes('[ ]')) {
        return content;
    }

    const checkbox = `<input
        type="checkbox"
        class="mx-2 checkbox checkbox-xs checkbox-primary align-middle opacity-100"
        checked
        disabled>`;

    return content
        .replace(/\[x\]/g, checkbox) //
        .replace(/\[ \]/g, checkbox.replace('checked', ''));
}

export const transformContent = (content: string) => {
    let parsed = parseCheckboxes(content);

    return parsed;
}

