import { useLang } from '../i18n/LanguageContext'
import { useJsonLd } from './useJsonLd'

const SITE_ORIGIN = 'https://photocarb.com'

/** Renders a BreadcrumbList JSON-LD block from a trail of {name, path} entries.
 *  `path` is the bare (English-shaped) app path — it gets localized and made
 *  absolute automatically, same as everywhere else in the app. */
export function useBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  const { localizePath } = useLang()

  useJsonLd('breadcrumb-jsonld', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_ORIGIN}${localizePath(item.path)}`,
    })),
  })
}
