/**
 * MSNC PageHeader — Editorial v3
 * Fix: Removed nested <li> by pulling Separator out of BreadcrumbItem
 */

import React from 'react' // Import React for Fragment
import { Link } from '@/navigation'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Home } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface PageHeaderProps {
  label?: string
  title: string
  titleItalic?: string
  description?: string
  breadcrumbs?: Array<{ label: string; href?: string }>
}

export default function PageHeader({ label, title, titleItalic, description, breadcrumbs }: PageHeaderProps) {
  const t = useTranslations('Breadcrumbs')

  return (
    <section className="border-b border-border bg-white pt-28 md:pt-36 pb-10 md:pb-14">
      <div className="container-editorial">
        {/* Breadcrumb */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex items-center gap-1.5">
                    <Home className="h-3 w-3" />
                    <span className="sr-only">{t('home')}</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((crumb, i) => (
                  <React.Fragment key={i}>
                    {/* HCI Principle: Visual Feedback 
                        The separator is a bridge, not a container. 
                    */}
                    <BreadcrumbSeparator />
                    
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      ) : (
                        <span className="text-primary font-bold" aria-current="page">
                          {crumb.label}
                        </span>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </nav>
        )}

        {/* Label */}
        {label && (
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px w-10 bg-secondary" aria-hidden="true" />
            <span className="section-label text-secondary">{label}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="mb-6 max-w-4xl tracking-tighter">
          {title}
          {titleItalic && (
            <>
              {' '}
              <em className="font-display font-normal not-italic text-secondary">
                {titleItalic}
              </em>
            </>
          )}
        </h1>

        {/* Description */}
        {description && (
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}