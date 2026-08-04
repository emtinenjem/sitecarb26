import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage from './pages/AboutPage'
import CompliancePage from './pages/CompliancePage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'
import { LanguageProvider, LANG_PREFIX } from './i18n/LanguageContext'

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// Bare (English-shaped) route paths. Each one is mounted three times below —
// once unprefixed (English, the default) and once under /fr and /ar — so every
// page has its own distinct, crawlable URL per language instead of one URL
// whose content silently changes based on client-side state.
const PAGE_ROUTES: { path: string; element: ReactNode }[] = [
  { path: '/', element: <HomePage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/services/:slug', element: <ServiceDetailPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/compliance', element: <CompliancePage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/legal/:slug', element: <LegalPage /> },
]

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        {Object.values(LANG_PREFIX).flatMap(prefix =>
          PAGE_ROUTES.map(({ path, element }) => (
            <Route
              key={`${prefix}${path}`}
              path={path === '/' ? prefix || '/' : `${prefix}${path}`}
              element={<PageTransition>{element}</PageTransition>}
            />
          )),
        )}
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <div className="min-h-screen">
          <Nav />
          <AnimatedRoutes />
          <Footer />
        </div>
      </LanguageProvider>
    </BrowserRouter>
  )
}
