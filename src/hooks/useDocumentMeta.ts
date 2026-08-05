import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

const SITE_ORIGIN = 'https://photocarb.com'
const OG_LOCALE: Record<string, string> = { en: 'en_US', fr: 'fr_FR', ar: 'ar_TN' }

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Sets the document title plus per-page description and Open Graph/Twitter tags
 *  (client-side SPA meta) — so each page and each language shares links correctly
 *  instead of every page showing the same site-wide og:title. */
export function useDocumentMeta(title: string, description?: string) {
  const location = useLocation()
  const { lang } = useLang()

  useEffect(() => {
    document.title = title
    upsertMeta('property', 'og:title', title)
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('property', 'og:url', `${SITE_ORIGIN}${location.pathname}`)
    upsertMeta('property', 'og:locale', OG_LOCALE[lang] ?? 'en_US')

    if (description) {
      upsertMeta('name', 'description', description)
      upsertMeta('property', 'og:description', description)
      upsertMeta('name', 'twitter:description', description)
    }
  }, [title, description, lang, location.pathname])
}
