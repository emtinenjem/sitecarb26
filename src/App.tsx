import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import AboutPage from './pages/AboutPage'
import CompliancePage from './pages/CompliancePage'
import ContactPage from './pages/ContactPage'
import LegalPage from './pages/LegalPage'

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

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/"             element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/services"     element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/services/:slug" element={<PageTransition><ServiceDetailPage /></PageTransition>} />
        <Route path="/about"        element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/compliance"   element={<PageTransition><CompliancePage /></PageTransition>} />
        <Route path="/contact"      element={<PageTransition><ContactPage /></PageTransition>} />
        <Route path="/legal/:slug"  element={<PageTransition><LegalPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Nav />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  )
}
