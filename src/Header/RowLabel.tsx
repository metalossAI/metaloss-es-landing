'use client'
import { Header } from '@/payload-types'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<NonNullable<Header['navItems']>[number]>()

  const navLabel = data?.data?.navigationItem?.label
  const label = navLabel
    ? `Nav item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${navLabel}`
    : 'Row'

  return <div>{label}</div>
}
