'use client'

import { NavbarClient } from '@/components/Navbar/NavbarClient'
import type { Header } from '@/payload-types'

interface NavbarPreviewProps {
  data: Header
}

export function NavbarPreview({ data }: NavbarPreviewProps) {
  return <NavbarClient data={data} />
}
