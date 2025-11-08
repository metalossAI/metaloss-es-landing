import { NavbarClient } from './NavbarClient'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Navbar() {
  // Try both cached and direct approach for debugging
  const headerData: Header = await getCachedGlobal('header', 2)()
  
  // Also try direct payload call for debugging
  const payload = await getPayload({ config: configPromise })
  const directHeaderData = await payload.findGlobal({
    slug: 'header',
    depth: 2,
  })
  
  // Debug: Log both data sources
  console.log('Cached header data:', headerData)
  console.log('Direct header data:', directHeaderData)
  console.log('Cached navItems:', headerData?.navItems)
  console.log('Direct navItems:', directHeaderData?.navItems)
  
  // Use direct data if cached is empty, otherwise use cached
  const finalData = (headerData?.navItems && headerData.navItems.length > 0) ? headerData : directHeaderData
  
  return <NavbarClient data={finalData as Header} />
}
