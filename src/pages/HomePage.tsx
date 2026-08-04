import Hero from '../components/Hero'
import CertMarquee from '../components/CertMarquee'
import ProblemSection from '../components/ProblemSection'
import BenefitsSection from '../components/BenefitsSection'
import MetricsStrip from '../components/MetricsStrip'
import ComplianceSection from '../components/ComplianceSection'
import HowItWorks from '../components/HowItWorks'
import SectorTabs from '../components/SectorTabs'
import WhyPhotocarb from '../components/WhyPhotocarb'
import FinalCTA from '../components/FinalCTA'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useLang } from '../i18n/LanguageContext'

export default function HomePage() {
  const { t } = useLang()
  useDocumentMeta(t('meta.home.title'), t('meta.home.desc'))

  return (
    <>
      <Hero />
      <CertMarquee />
      <ProblemSection />
      <BenefitsSection />
      <MetricsStrip />
      <ComplianceSection />
      <HowItWorks />
      <SectorTabs />
      <WhyPhotocarb />
      <FinalCTA />
    </>
  )
}
