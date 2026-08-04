import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { IconCheck, IconPin, IconPhone, IconMail, IconClock } from '../components/icons'
import { QatarFlag, TunisiaFlag } from '../components/Flags'
import { SERVICES, localizeService } from '../data/services'
import { useLang } from '../i18n/LanguageContext'

const PALETTE = ['var(--color-primary)', 'var(--color-lime)', 'var(--color-violet)', 'var(--color-info)']

const EXPECT_RANGES = ['1–10', '10–25', '25–40', '40–45']

// Available call slots: Monday–Friday, 09:30–12:30 and 13:30–16:30 (Tunisia time)
const TIME_SLOTS = ['09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00']

function formatSlot(slot: string) {
  const [h, m] = slot.split(':').map(Number)
  const period = h < 12 ? 'AM' : 'PM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}:${String(m).padStart(2, '0')} ${period}`
}

function isWeekday(dateStr: string) {
  if (!dateStr) return true
  const day = new Date(`${dateStr}T00:00:00`).getDay()
  return day >= 1 && day <= 5
}

function todayISO() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

const OFFICES = [
  {
    Flag: TunisiaFlag,
    countryKey: 'contact.tunisia',
    labelKey: 'contact.headquarters',
    cityKey: 'contact.sousse',
    addressKey: 'contact.tunisiaAddress',
    phone: '+216 58 56 10 00',
    email: 'contact@photocarb.com',
    hoursKey: 'contact.tunisiaHours',
    color: 'var(--color-tunisia)',
    tint: 'var(--color-tunisia-tint)',
  },
  {
    Flag: QatarFlag,
    countryKey: 'contact.qatar',
    labelKey: 'contact.engineeringCentre',
    cityKey: 'contact.doha',
    addressKey: 'contact.qatarAddress',
    phone: '+974 4014 1000',
    email: 'contact@photocarb.qa',
    hoursKey: 'contact.qatarHours',
    color: 'var(--color-qatar)',
    tint: 'var(--color-qatar-tint)',
  },
]

const GENERAL_CONTACTS = [
  { labelKey: 'contact.general', email: 'contact@photocarb.com' },
  { labelKey: 'contact.pressMedia', email: 'info@photocarb.com' },
  { labelKey: 'contact.partnership', email: 'info@photocarb.com' },
  { labelKey: 'contact.careers', email: 'internship@photocarb.com' },
]

export default function ContactPage() {
  const { t } = useLang()
  useDocumentMeta(t('meta.contact.title'), t('meta.contact.desc'))

  return (
    <>
      <ContactHero />
      <WhatToExpect />
      <BookingFormSection />
      <DirectContact />
      <ObjectionFAQ />
    </>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function ContactHero() {
  const { t } = useLang()
  return (
    <section className="pt-32 pb-24 bg-[var(--color-bg)] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(circle at 78% 20%, color-mix(in srgb, var(--color-primary) 9%, transparent) 0%, transparent 50%), radial-gradient(circle at 15% 85%, color-mix(in srgb, var(--color-violet) 7%, transparent) 0%, transparent 45%)' }}
      />
      {/* Decorative hex outline field */}
      <svg className="absolute -top-10 right-[4%] w-[360px] h-[360px] opacity-[0.06] pointer-events-none hidden lg:block" viewBox="0 0 300 300">
        {Array.from({ length: 12 }).map((_, i) => {
          const col = i % 4
          const row = Math.floor(i / 4)
          const ox = col * 78 + (row % 2) * 39
          const oy = row * 68
          return (
            <polygon
              key={i}
              points={`${ox + 39},${oy} ${ox + 78},${oy + 19} ${ox + 78},${oy + 57} ${ox + 39},${oy + 76} ${ox},${oy + 57} ${ox},${oy + 19}`}
              fill="none" stroke="var(--color-primary)" strokeWidth="1"
            />
          )
        })}
      </svg>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className="max-w-[760px]">
          <span
            className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-5 block"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            — {t('contactPage.eyebrow')}
          </span>
          <h1
            className="text-[44px] lg:text-[58px] leading-[1.08] text-[var(--color-text-primary)] mb-6"
            style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.025em' }}
          >
            {t('contactPage.title')}{' '}
            <em className="italic font-normal text-[var(--color-primary)]">{t('contactPage.titleAccent')}</em>
          </h1>
          <p
            className="text-[17px] leading-relaxed text-[var(--color-text-secondary)] max-w-[620px] mb-8"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {t('contactPage.subtitle')}
          </p>

          {/* Binational presence chip */}
          <div
            className="inline-flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] pl-2 pr-4 py-2 shadow-sm"
          >
            <div className="flex items-center -space-x-1.5">
              <TunisiaFlag width={24} height={17} className="ring-2 ring-[var(--color-surface)]" />
              <QatarFlag width={24} height={17} className="ring-2 ring-[var(--color-surface)]" />
            </div>
            <span className="text-[12.5px] font-medium text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>
              {t('contactPage.onGround')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── What to expect ─────────────────────────────────────────────────────────────

function WhatToExpect() {
  const { ref, visible } = useInView(0.15)
  const { t } = useLang()
  const steps = EXPECT_RANGES.map((range, i) => ({ range, title: t(`contact.expect${i + 1}.title`), desc: t(`contact.expect${i + 1}.desc`) }))

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[900px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-14 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>
            {t('contact.whatToExpect')}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('contact.expectTitle')}{' '}
            <em className="italic font-normal text-[var(--color-text-secondary)]">{t('contact.expectTitleAccent')}</em>
          </h2>
        </div>

        <div className="relative">
          <div
            className="absolute left-[27px] top-2 bottom-2 w-[2px] hidden sm:block"
            style={{ background: `linear-gradient(to bottom, ${PALETTE.join(', ')})`, opacity: 0.35 }}
          />
          <div className="space-y-6">
            {steps.map((step, i) => {
              const color = PALETTE[i % PALETTE.length]
              return (
                <div key={i} className={`group relative flex gap-5 fade-up ${visible ? 'visible' : ''} stagger-${i + 1}`}>
                  <div
                    className="hidden sm:flex w-14 h-14 rounded-full items-center justify-center shrink-0 border-4 border-[var(--color-bg-secondary)] font-bold text-[12px] relative z-10 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: color, color: 'white', fontFamily: 'var(--font-body)', boxShadow: `0 6px 16px color-mix(in srgb, ${color} 35%, transparent)` }}
                  >
                    <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{step.range}</span>
                  </div>
                  <div className="flex-1 card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-6">
                    <div className="sm:hidden text-[12px] font-bold mb-1.5" style={{ color, fontFamily: 'var(--font-body)' }}>{t('contact.minutes')} <span dir="ltr" style={{ unicodeBidi: 'isolate' }}>{step.range}</span></div>
                    <h3 className="text-[17px] font-bold text-[var(--color-text-primary)] mb-2" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
                    <p className="text-[14px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Booking form ─────────────────────────────────────────────────────────────

function BookingFormSection() {
  const { ref, visible } = useInView(0.1)
  const { t, lang } = useLang()
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [interests, setInterests] = useState<Set<string>>(new Set())
  const [callDate, setCallDate] = useState('')
  const [dateError, setDateError] = useState<string | null>(null)
  const expectTitles = EXPECT_RANGES.map((_, i) => t(`contact.expect${i + 1}.title`))
  const interestOptions = [...SERVICES.map(s => localizeService(s, lang).title), t('contact.fullPlatform'), t('contact.other')]

  const toggleInterest = (label: string) => {
    setInterests(prev => {
      const next = new Set(prev)
      next.has(label) ? next.delete(label) : next.add(label)
      return next
    })
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setCallDate(value)
    setDateError(isWeekday(value) ? null : t('contact.callDateWeekendError'))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (callDate && !isWeekday(callDate)) {
      setDateError(t('contact.callDateWeekendError'))
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    const callTimeSlot = String(data.get('callTimeSlot') || '')
    const callTime = callDate && callTimeSlot ? `${callDate} ${callTimeSlot} (Tunisia time)` : ''
    const payload = {
      firstName: String(data.get('firstName') || ''),
      lastName: String(data.get('lastName') || ''),
      company: String(data.get('company') || ''),
      jobTitle: String(data.get('jobTitle') || ''),
      email: String(data.get('email') || ''),
      phone: String(data.get('phone') || ''),
      sector: String(data.get('sector') || ''),
      companySize: String(data.get('companySize') || ''),
      interests: [...interests],
      language: String(data.get('language') || ''),
      callTime,
      referral: String(data.get('referral') || ''),
      context: String(data.get('context') || ''),
      website: String(data.get('website') || ''), // honeypot
    }

    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || t('contact.submitError'))
      }
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('contact.submitError'))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className={`grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start fade-up ${visible ? 'visible' : ''}`}>
          {/* Reassurance panel */}
          <div className="lg:sticky lg:top-28">
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>
              {t('contact.bookEyebrow')}
            </span>
            <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)] mb-6" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
              {t('contact.bookTitle')}
            </h2>

            <div className="rounded-3xl p-7" style={{ background: 'linear-gradient(160deg, var(--color-tint-teal), var(--color-bg-secondary))' }}>
              <div className="space-y-4 mb-7">
                {expectTitles.map((title, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[9px] font-bold shrink-0 mt-0.5"
                      style={{ background: PALETTE[i % PALETTE.length], fontFamily: 'var(--font-body)' }}
                    >
                      {i + 1}
                    </div>
                    <span className="text-[13.5px] text-[var(--color-text-primary)] font-medium leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{title}</span>
                  </div>
                ))}
              </div>
              <div className="h-px bg-[var(--color-border)] mb-6" />
              <div className="flex flex-wrap gap-2">
                {['ISO 14064', lang === 'fr' ? 'Prêt MACF' : 'CBAM Ready', 'IFRS S2', t('contact.qatarPdpl')].map(b => (
                  <span
                    key={b}
                    className="text-[10.5px] font-medium text-[var(--color-text-secondary)] border border-[var(--color-border)] px-2.5 py-1 rounded-full bg-[var(--color-surface)]"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Form card */}
          <div className={`relative rounded-3xl p-[1.5px] fade-up ${visible ? 'visible' : ''} stagger-1`} style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-violet), var(--color-info))' }}>
            <div className="bg-[var(--color-surface)] rounded-[calc(1.5rem-1.5px)] p-8 lg:p-10">
              {submitted ? (
                <div className="text-center py-14">
                  <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-5">
                    <IconCheck size={24} strokeWidth={2.4} />
                  </div>
                  <h3 className="text-[24px] text-[var(--color-text-primary)] mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    {t('contact.submittedTitle')}
                  </h3>
                  <p className="text-[15px] text-[var(--color-text-secondary)] max-w-[420px] mx-auto" style={{ fontFamily: 'var(--font-body)' }}>
                    {t('contact.submittedDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Honeypot — hidden from real users, catches simple bots */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('contact.firstName')} name="firstName" required />
                    <Field label={t('contact.lastName')} name="lastName" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('contact.emailAddress')} name="email" type="email" required />
                    <Field label={t('contact.phoneNumber')} name="phone" type="tel" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label={t('contact.company')} name="company" required />
                    <Field label={t('contact.jobTitle')} name="jobTitle" required />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <SelectField label={t('contact.sector')} name="sector" options={t('contact.sectors').split('|')} />
                    <SelectField label={t('contact.companySize')} name="companySize" options={t('contact.sizes').split('|')} />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold text-[var(--color-text-secondary)] mb-2.5 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
                      {t('contact.primaryInterest')}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map(label => {
                        const active = interests.has(label)
                        return (
                          <button
                            key={label}
                            type="button"
                            onClick={() => toggleInterest(label)}
                            aria-pressed={active}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-full border text-[13px] font-medium transition-colors"
                            style={{
                              fontFamily: 'var(--font-body)',
                              borderColor: active ? 'var(--color-primary)' : 'var(--color-border)',
                              background: active ? 'var(--color-tint-teal)' : 'transparent',
                              color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                            }}
                          >
                            {active && <IconCheck size={13} strokeWidth={2.6} />}
                            {label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-5">
                    <SelectField label={t('contact.preferredLanguage')} name="language" options={['English', 'العربية', t('contact.langBoth')]} />
                    <div>
                      <label className="block text-[12px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
                        {t('contact.callDate')}
                      </label>
                      <input
                        type="date"
                        name="callDate"
                        value={callDate}
                        min={todayISO()}
                        onChange={handleDateChange}
                        className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] text-[var(--color-text-primary)] bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-primary)]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      />
                      {dateError && (
                        <p className="text-[11.5px] mt-1.5" style={{ color: 'var(--color-danger)', fontFamily: 'var(--font-body)' }}>{dateError}</p>
                      )}
                    </div>
                    <SelectField label={t('contact.callTime')} name="callTimeSlot" options={TIME_SLOTS.map(formatSlot)} />
                  </div>
                  <p className="text-[11.5px] text-[var(--color-text-secondary)] -mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                    {t('contact.callHoursNote')}
                  </p>

                  <SelectField label={t('contact.referral')} name="referral" options={t('contact.referrals').split('|')} />

                  <div>
                    <label className="block text-[12px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
                      {t('contact.questionsLabel')}
                    </label>
                    <textarea
                      name="context"
                      rows={4}
                      className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] text-[var(--color-text-primary)] bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-primary)] resize-none"
                      style={{ fontFamily: 'var(--font-body)' }}
                      placeholder={t('contact.questionsPlaceholder')}
                    />
                  </div>

                  {error && (
                    <p className="text-[13px] text-center rounded-xl px-4 py-3" style={{ color: 'var(--color-danger)', background: 'var(--color-danger-bg)', fontFamily: 'var(--font-body)' }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[var(--color-primary)] text-white font-semibold px-8 py-4 rounded-full hover:bg-[var(--color-primary-deep)] transition-colors duration-200 text-[15px] disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {submitting ? '…' : t('contact.submitBtn')}
                  </button>

                  <p className="text-[11.5px] text-[var(--color-text-secondary)] leading-relaxed text-center" style={{ fontFamily: 'var(--font-body)' }}>
                    {t('contact.privacyNote')}
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type = 'text', required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] text-[var(--color-text-primary)] bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-primary)]"
        style={{ fontFamily: 'var(--font-body)' }}
      />
    </div>
  )
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  const { t } = useLang()
  return (
    <div>
      <label className="block text-[12px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
        {label}
      </label>
      <select
        name={name}
        className="w-full border border-[var(--color-border)] rounded-xl px-4 py-3 text-[14px] text-[var(--color-text-primary)] bg-[var(--color-bg)] focus:outline-none focus:border-[var(--color-primary)]"
        style={{ fontFamily: 'var(--font-body)' }}
        defaultValue=""
      >
        <option value="" disabled>{t('contact.selectPlaceholder')}</option>
        {options.map(o => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

// ─── Direct contact ─────────────────────────────────────────────────────────────

function DirectContact() {
  const { ref, visible } = useInView(0.15)
  const { t } = useLang()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg-secondary)] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>
            {t('contact.directContact')}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('contact.directTitle')}
          </h2>
        </div>

        <div className={`grid lg:grid-cols-2 gap-6 mb-8 fade-up ${visible ? 'visible' : ''} stagger-1`}>
          {OFFICES.map(office => (
            <div key={office.cityKey} className="card-hover relative overflow-hidden bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl">
              <div className="h-[5px]" style={{ background: office.color }} />
              <div
                className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
                style={{ background: office.tint, opacity: 0.7 }}
              />
              <div className="relative p-7">
                <div className="flex items-center gap-3.5 mb-5">
                  <office.Flag width={42} height={30} />
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ color: office.color, fontFamily: 'var(--font-body)' }}>{t(office.labelKey)}</div>
                    <h3 className="text-[19px] font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>{t(office.cityKey)}, {t(office.countryKey)}</h3>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <ContactRow icon={IconPin} color={office.color}>{t(office.addressKey)}</ContactRow>
                  <ContactRow icon={IconPhone} color={office.color}><a dir="ltr" href={`tel:${office.phone.replace(/\s/g, '')}`} className="hover:underline inline-block" style={{ unicodeBidi: 'isolate' }}>{office.phone}</a></ContactRow>
                  <ContactRow icon={IconMail} color={office.color}><a dir="ltr" href={`mailto:${office.email}`} className="hover:underline inline-block" style={{ unicodeBidi: 'isolate' }}>{office.email}</a></ContactRow>
                  <ContactRow icon={IconClock} color={office.color}>{t(office.hoursKey)}</ContactRow>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-4 fade-up ${visible ? 'visible' : ''} stagger-2`}>
          {GENERAL_CONTACTS.map(c => (
            <a
              key={c.labelKey}
              href={`mailto:${c.email}`}
              className="card-hover bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-5 no-underline block"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] mb-1.5" style={{ fontFamily: 'var(--font-body)' }}>{t(c.labelKey)}</div>
              <div className="text-[13.5px] font-semibold text-[var(--color-primary)]" style={{ fontFamily: 'var(--font-body)', unicodeBidi: 'isolate' }}>{c.email}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, color, children }: { icon: typeof IconPin; color: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon size={15} strokeWidth={1.8} style={{ color, marginTop: 2 }} className="shrink-0" />
      <span className="text-[13.5px] text-[var(--color-text-secondary)] leading-snug" style={{ fontFamily: 'var(--font-body)' }}>{children}</span>
    </div>
  )
}

// ─── Objection-handling FAQ ─────────────────────────────────────────────────────

function ObjectionFAQ() {
  const { ref, visible } = useInView(0.1)
  const { t } = useLang()
  const [open, setOpen] = useState<number | null>(0)
  const faqs = [1, 2, 3, 4, 5, 6, 7, 8].map(n => ({ q: t(`contact.faq${n}.q`), a: t(`contact.faq${n}.a`) }))

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="bg-[var(--color-bg)] py-16">
      <div className="max-w-[840px] mx-auto px-6 lg:px-12">
        <div className={`text-center mb-12 fade-up ${visible ? 'visible' : ''}`}>
          <span className="text-[11px] font-semibold tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 block" style={{ fontFamily: 'var(--font-body)' }}>
            {t('contact.beforeBook')}
          </span>
          <h2 className="text-[32px] leading-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)', letterSpacing: '-0.02em' }}>
            {t('contact.faqTitle')}
          </h2>
        </div>

        <div className={`space-y-3 fade-up ${visible ? 'visible' : ''} stagger-1`}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            const color = PALETTE[i % PALETTE.length]
            return (
              <div key={faq.q} className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
                >
                  <span className="flex items-center gap-3.5">
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: `color-mix(in srgb, ${color} 14%, transparent)`, color, fontFamily: 'var(--font-body)' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[15px] font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-body)' }}>{faq.q}</span>
                  </span>
                  <svg
                    width="14" height="14" viewBox="0 0 12 12" fill="none" className="shrink-0 transition-transform duration-200"
                    style={{ color: 'var(--color-primary)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 pl-[58px] text-[14px] leading-relaxed text-[var(--color-text-secondary)]" style={{ fontFamily: 'var(--font-body)' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
