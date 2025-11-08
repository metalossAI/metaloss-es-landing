'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { Logo, LogoText } from '@/components/Logo/Logo'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/utilities/useIsMobile'
import { Button } from '@payloadcms/ui'
import { useTheme } from '@/providers/Theme'
import { ProfessionalNavbar } from './ProfessionalNavbar'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40); // Adjust threshold as needed
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isMobile = useIsMobile();
  const width = isMobile
    ? scrolled ? "90%" : "95%" // mobile widths
    : scrolled ? "90%" : "100%"; // desktop widths

  const {theme} = useTheme()

  return (
    <motion.header
      className={`
        z-50 w-full rounded-xl self-center sticky top-2 py-1 md:px-5 max-w-full overflow-visible
        shadow-lg border border-border/20
        ${scrolled ? "bg-background/90 backdrop-blur-md shadow-xl" : "bg-background/60 backdrop-blur-sm"}
      `}
      animate={{
        width,
        top: scrolled ? "10px" : "5px",
      }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
    >
      <div className="py-1 flex justify-between items-center">
        <Link className="flex items-center gap-4" href="/">
          <Logo color={theme === 'dark' ? 'light' : 'dark'} loading="eager" priority="high" className="object-contain" />
          <LogoText color={theme === 'dark' ? 'light' : 'dark'}/>
        </Link>
        {/* Hamburger menu button: visible only on mobile */}
        <Button
          className="md:hidden p-2 rounded"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {/* Simple hamburger icon */}
          <svg
            className="w-7 h-7 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              // X icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </Button>
        {/* Desktop nav: hidden on mobile */}
        <div className="hidden md:flex">
          <ProfessionalNavbar data={data} onNavClick={() => setMenuOpen(false)} />
        </div>
        {/* Mobile nav dropdown: visible only when menuOpen is true */}
        {menuOpen && (
          <>
            {/* Backdrop to close menu on outside click */}
            <div
              className="fixed inset-0 z-30 md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            {/* Dropdown menu below header */}
            <motion.div
              id="mobile-nav-menu"
              className="absolute left-0 top-full w-full shadow-lg z-40 md:hidden max-w-full"
              role="menu"
              aria-label="Mobile navigation menu"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 180, damping: 20 }}
            >
              <div className="py-4 px-6 bg-background/95 backdrop-blur-md rounded-xl border border-border shadow-xl mx-2 overflow-hidden">
                <ProfessionalNavbar data={data} onNavClick={() => setMenuOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </div>
    </motion.header>
  )
}
