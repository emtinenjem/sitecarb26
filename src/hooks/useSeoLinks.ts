import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { LANG_ORDER, getBarePath, pathForLang } from '../i18n/LanguageContext'

const SITE_ORIGIN = 'https://photocarb.com'

function upsertLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let el = document.querySelector(selector) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * Keeps a self-referencing canonical tag and rel=alternate hreflang links (one per
 * language plus x-default) in sync with the current route. Each language's URL is
 * genuinely different, translated content — not a duplicate — so canonical points
 * to the current page itself, and hreflang tells search engines the other two
 * language versions exist so each can be indexed and ranked separately.
 *
 * Call once near the app root (inside the Router, so useLocation works).
 */
export function useSeoLinks() {
  const location = useLocation()

  useEffect(() => {
    const bare = getBarePath(location.pathname)

    upsertLink('canonical', `${SITE_ORIGIN}${location.pathname}`)

    for (const lang of LANG_ORDER) {
      upsertLink('alternate', `${SITE_ORIGIN}${pathForLang(bare, lang)}`, lang)
    }
    // x-default: the fallback for users/locales not covered above — English, the site's default.
    upsertLink('alternate', `${SITE_ORIGIN}${pathForLang(bare, 'en')}`, 'x-default')
  }, [location.pathname])
}
