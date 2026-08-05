const formatterCache = new Map<string, Intl.DateTimeFormat>();

/**
 * Format a date string into a localized, human-readable format.
 * Formatters are cached per options to avoid re-instantiating Intl.DateTimeFormat.
 */
export const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {}): string => {
  const cacheKey = JSON.stringify(options);

  let formatter = formatterCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat('pt-BR', options);
    formatterCache.set(cacheKey, formatter);
  }

  return formatter.format(new Date(date));
};
