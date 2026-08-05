import { useEffect } from 'react'

/** Injects/updates a <script type="application/ld+json"> tag identified by `id`.
 *  Pass `data: null` (e.g. while a page is still resolving its content) to skip
 *  rendering without violating the Rules of Hooks. Removes the tag on unmount so
 *  structured data never lingers for the wrong page. */
export function useJsonLd(id: string, data: object | null) {
  const json = data ? JSON.stringify(data) : null

  useEffect(() => {
    if (!json) return
    let el = document.getElementById(id) as HTMLScriptElement | null
    if (!el) {
      el = document.createElement('script')
      el.id = id
      el.type = 'application/ld+json'
      document.head.appendChild(el)
    }
    el.textContent = json
    return () => { el?.remove() }
  }, [id, json])
}
