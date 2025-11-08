'use client'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo, LogoText } from '@/components/Logo/Logo'
import { useTheme } from '@/providers/Theme'

export function FooterClient({ data }: { data: Footer }) {
  const footerData: Footer = data
  const {theme} = useTheme()
  // Company info fields (replace with actual fields from Footer type if available)
  const companyName = footerData?.businessName || '';
  const companyCIF = footerData?.businessCIF
  const companyAddress = footerData?.businessAddress || '';
  const companyEmail = footerData?.businessEmail
  const companyPhone = footerData?.businessPhone || '';

  const navItems = footerData?.socials || [];

  return (
    <footer className="w-full mt-auto border-t border-border bg-background text-foreground">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        {/* Left: Company Info */}
        <div className="flex flex-col gap-2 max-w-xs">
          <Link className="flex items-center mb-2" href="/">
            <Logo color={theme === 'dark' ? 'light' : 'dark'} className='object-contain'/>
            <LogoText color={theme === 'dark' ? 'light' : 'dark'}/>
          </Link>
          <div className="text-sm">
            <div className="font-semibold">{companyName}</div>
            <div>{companyCIF}</div>
            <div>{companyAddress}</div>
            <div>
              <a href={`mailto:${companyEmail}`} className="underline hover:text-primary transition-colors">{companyEmail}</a>
            </div>
            <div>
              <a href={`tel:${companyPhone}`} className="underline hover:text-primary transition-colors">{companyPhone}</a>
            </div>
          </div>
        </div>
        {/* Right: Navigation and Theme Selector */}
        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => (
              <CMSLink className="text-foreground" key={i} {...link} />
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
