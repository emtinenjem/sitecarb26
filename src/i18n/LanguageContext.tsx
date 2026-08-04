import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { translations } from './translations'

export type Lang = 'en' | 'fr' | 'ar'

export const LANG_ORDER: Lang[] = ['en', 'fr', 'ar']
export const LANG_LABELS: Record<Lang, string> = { en: 'EN', fr: 'FR', ar: 'ع' }
export const LANG_NAMES: Record<Lang, string> = { en: 'English', fr: 'Français', ar: 'العربية' }

interface LanguageCtx {
  lang: Lang
  dir: 'ltr' | 'rtl'
  setLang: (l: Lang) => void
  toggle: () => void
  /** Translate a key. Falls back to English, then to the provided fallback, then the key itself. */
  t: (key: string, fallback?: string) => string
}

const Ctx = createContext<LanguageCtx | null>(null)

const STORAGE_KEY = 'pc-lang'

function readInitial(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'ar' || saved === 'en' || saved === 'fr') return saved
  } catch {
    /* ignore */
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readInitial)
  const dir: 'ltr' | 'rtl' = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang, dir])

  const setLang = (l: Lang) => setLangState(l)
  const toggle = () => setLangState(l => LANG_ORDER[(LANG_ORDER.indexOf(l) + 1) % LANG_ORDER.length])

  const t = (key: string, fallback?: string): string => {
    const dict = translations[lang] as Record<string, string>
    if (dict && key in dict) return dict[key]
    const en = translations.en as Record<string, string>
    if (en && key in en) return en[key]
    return fallback ?? key
  }

  return <Ctx.Provider value={{ lang, dir, setLang, toggle, t }}>{children}</Ctx.Provider>
}

export function useLang(): LanguageCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useLang must be used within LanguageProvider')
  return c
}
