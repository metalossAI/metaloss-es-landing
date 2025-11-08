'use client'

import React from 'react'

import type { Header } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export interface HeaderNavProps {
  data: Header;
  mode: "dropdown" | "inline";
  onNavClick?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ data, mode = 'inline' }) => {
  const navItems = data?.navItems || [];

  if (mode === 'dropdown') {
    return (
      <nav className="flex flex-col gap-1 py-2 px-3 bg-background rounded-xl shadow-lg border min-w-[180px]">
        <ul className="flex flex-col gap-1">
          {navItems.map(({ navigationItem }, i) => {
            const link = navigationItem?.link;
            if (!link) return null;
            return (
              <li key={i}>
                <CMSLink
                  {...link}
                  appearance="outline"
                  className="w-full text-left px-4 py-2 rounded hover:bg-background/70 transition-colors font-medium text-lg"
                />
              </li>
            );
          })}
        </ul>
        <Link href="/search" className="mt-3">
          <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded font-bold shadow transition-colors">
            <SearchIcon className="w-5 h-5" />
            <span>Search</span>
          </button>
        </Link>
      </nav>
    );
  }

  // Inline (desktop)
  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ navigationItem }, i) => {
        const link = navigationItem?.link;
        if (!link) return null;
        return <CMSLink key={i} {...link} appearance="link" />;
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>
    </nav>
  );
}

