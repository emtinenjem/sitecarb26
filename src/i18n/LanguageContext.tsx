import { createContext, useContext, useEffect, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { translations } from './translations'

export type Lang = 'en' | 'fr' | 'ar'

export const LANG_ORDER: Lang[] = ['en', 'fr', 'ar']
export const LANG_LABELS: Record<Lang, string> = { en: 'EN', fr: 'FR', ar: 'ع' }
export const LANG_NAMES: Record<Lang, string> = { en: 'English', fr: 'Français', ar: 'العربية' }

/** URL prefix per language. English is the default and carries no prefix, so
 *  existing /services, /about, etc. links keep working as the canonical English URLs. */
export const LANG_PREFIX: Record<Lang, string> = { en: '', fr: '/fr', ar: '/ar' }

interface LanguageCtx {
  lang: Lang
  dir: 'ltr' | 'rtl'
  setLang: (l: Lang) => void
  toggle: () => void
  /** Translate a key. Falls back to English, then to the provided fallback, then the key itself. */
  t: (key: string, fallback?: string) => string
  /** Prefixes a bare (English-shaped) app path with the current language, e.g. '/services' -> '/fr/services'. */
  localizePath: (path: string) => string
}

const Ctx = createContext<LanguageCtx | null>(null)

/** Strips a leading /fr or /ar segment, returning the bare English-shaped path. */
export function getBarePath(pathname: string): string {
  for (const l of ['fr', 'ar'] as const) {
    const prefix = LANG_PREFIX[l]
    if (pathname === prefix) return '/'
    if (pathname.startsWith(`${prefix}/`)) return pathname.slice(prefix.length)
  }
  return pathname
}

/** Derives the active language purely from the URL — no client storage involved,
 *  so every crawl (and every render) is deterministic for a given path. */
export function detectLang(pathname: string): Lang {
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr'
  if (pathname === '/ar' || pathname.startsWith('/ar/')) return 'ar'
  return 'en'
}

/** Builds the URL for a bare (English-shaped) path under the given language. Exported
 *  so non-context consumers (e.g. the SEO hreflang hook) can compute all three
 *  language variants of the current page without duplicating the prefix logic. */
export function pathForLang(barePath: string, lang: Lang): string {
  const prefix = LANG_PREFIX[lang]
  if (barePath === '/') return prefix || '/'
  return `${prefix}${barePath}`
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = detectLang(location.pathname)
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [lang, dir])

  const localizePath = (path: string): string => {
    if (!path.startsWith('/')) return path
    return pathForLang(getBarePath(path), lang)
  }

  const setLang = (l: Lang) => {
    if (l === lang) return
    const bare = getBarePath(location.pathname)
    navigate(`${pathForLang(bare, l)}${location.search}${location.hash}`)
  }

  const toggle = () => setLang(LANG_ORDER[(LANG_ORDER.indexOf(lang) + 1) % LANG_ORDER.length])

  const t = (key: string, fallback?: string): string => {
    const dict = translations[lang] as Record<string, string>
    if (dict && key in dict) return dict[key]
    const en = translations.en as Record<string, string>
    if (en && key in en) return en[key]
    return fallback ?? key
  }

  return <Ctx.Provider value={{ lang, dir, setLang, toggle, t, localizePath }}>{children}</Ctx.Provider>
}

export function useLang(): LanguageCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useLang must be used within LanguageProvider')
  return c
}
