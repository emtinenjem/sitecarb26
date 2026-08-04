import { forwardRef } from 'react'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

/**
 * Drop-in replacement for react-router-dom's <Link>. Automatically prefixes
 * internal (English-shaped) paths with the current language segment, e.g.
 * '/services' -> '/fr/services' when the current page is under /fr. Every
 * page in the app links to bare paths; this is the only place that needs to
 * know about the /fr and /ar URL prefixes.
 */
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ to, ...props }, ref) {
  const { localizePath } = useLang()
  const href = typeof to === 'string' ? localizePath(to) : to
  return <RouterLink ref={ref} to={href} {...props} />
})
