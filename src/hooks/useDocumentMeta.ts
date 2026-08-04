import { useEffect } from 'react'

/** Sets the document title and meta description for the current page (client-side SPA meta). */
export function useDocumentMeta(title: string, description?: string) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    const prevDescription = meta?.getAttribute('content') ?? null

    if (description) {
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', 'description')
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', description)
    }

    return () => {
      document.title = prevTitle
      if (meta && prevDescription !== null) meta.setAttribute('content', prevDescription)
    }
  }, [title, description])
}
