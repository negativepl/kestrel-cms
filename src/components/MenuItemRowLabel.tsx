'use client'

import { useRowLabel } from '@payloadcms/ui'

export const MenuItemRowLabel: React.FC = () => {
  const { data } = useRowLabel<{ label?: string; prestashopCategoryId?: number; isVisible?: boolean }>()

  const label = data?.label || 'New Item'
  const categoryId = data?.prestashopCategoryId
  const isVisible = data?.isVisible !== false

  return (
    <span style={{ opacity: isVisible ? 1 : 0.5 }}>
      {label}
      {categoryId && <span style={{ color: '#666', marginLeft: '8px' }}>(ID: {categoryId})</span>}
      {!isVisible && <span style={{ color: '#999', marginLeft: '8px' }}>[hidden]</span>}
    </span>
  )
}
