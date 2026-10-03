/**
 * Cookies the site stores in the browser: the palette and the language the
 * visitor chose.
 *
 * Shared because both are written the same way and read the same way — from a
 * document that may not exist, since the static generation runs these modules in
 * Node. Every function is a no-op there instead of throwing, which is what lets
 * the boot call them unconditionally.
 */

/** One year, in seconds. Long enough that a preference survives a returning visit. */
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365

/** A stored value, or `null` while the cookie is absent. */
export const readCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null

  const value = document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=')

  return value ? decodeURIComponent(value) : null
}

export const writeCookie = (name: string, value: string): void => {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`
}

export const deleteCookie = (name: string): void => {
  if (typeof document === 'undefined') return

  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`
}
