'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { TrendingUp, Users, Shield, Handshake, Star, Anchor, Globe, BookOpen } from 'lucide-react'
import PageHeader from '@/components/ui/PageHeader'
import Container from '@/components/ui/Container'

export default function AboutClient() {
  const t = useTranslations('About')
  const v = useTranslations('Features.items')

  const valueIcons = [TrendingUp, Users, Shield, Handshake, Star, Anchor]

  return (
    <main className="min-h-screen bg-white">
      {/* Mission & Vision */}
      <PageHeader
        label={t('sectionLabel')}
        title={t('heading')}
        description={t('whoWeAre')}
        breadcrumbs={[{ label: t('breadcrumb') }]}
      />

      {/* Mission Section */}
      <section className="section border-t border-border">
        <Container className="container-editorial">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label text-secondary mb-6 block">{t('missionLabel')}</span>
              <h2 className="text-4xl lg:text-5xl font-display mb-8">{t('missionTitle')}</h2>
              <div className="prose prose-xl text-muted-foreground leading-relaxed">
                <p>{t('missionDescription')}</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-12 rounded-[3rem] border border-border">
              <BookOpen className="w-20 h-20 text-primary mb-8 mx-auto" />
              <blockquote className="text-2xl font-display italic text-primary text-center leading-snug">
                {t('missionQuote')}
              </blockquote>
            </div>
          </div>
        </Container>
      </section>

      {/* Heritage & Identity */}
      <section className="section border-t border-border">
        <Container className="container-editorial">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-px w-10 bg-secondary" aria-hidden="true" />
                <span className="section-label text-secondary">{t('originsLabel')}</span>
              </div>
              <h2 className="mb-8">{t('heritageTitle')}</h2>
              <div className="prose prose-xl text-muted-foreground">
                <p>{t('heritageDescription')}</p>
              </div>
            </div>
            <div className="lg:col-span-5 flex items-center">
              <aside className="p-10 bg-paper-50 rounded-[2.5rem] border border-border">
                <Globe className="w-10 h-10 text-secondary mb-6" />
                <p className="text-2xl font-display italic text-primary leading-snug">{t('heritageQuote')}</p>
              </aside>
            </div>
          </div>
        </Container>
      </section>

      {/* Core Values */}
      <section className="section bg-paper-50 border-t border-border">
        <Container className="container-editorial">
          <div className="mb-16">
            <span className="section-label text-secondary block mb-4">{t('valuesLabel')}</span>
            <h2 className="max-w-3xl">{t('valuesTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(['empowerment', 'community', 'integrity', 'collaboration', 'excellence', 'resilience'] as const).map((id, index) => {
              const Icon = valueIcons[index]
              return (
                <motion.div 
                  key={id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-10 rounded-[2rem] border border-border transition-colors hover:border-secondary"
                >
                  <Icon className="w-8 h-8 text-secondary mb-6" />
                  <h3 className="text-2xl font-display text-primary mb-4">{v(`${id}.title` as any)}</h3>
                  <p className="text-muted-foreground leading-relaxed">{v(`${id}.description` as any)}</p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>
    </main>
  )
}
