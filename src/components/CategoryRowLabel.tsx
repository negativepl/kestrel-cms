'use client'

import React, { useEffect, useState } from 'react'
import { useRowLabel } from '@payloadcms/ui'

type Category = {
  id: number
  name: string
}

export const CategoryRowLabel: React.FC = () => {
  const { data } = useRowLabel<{ categoryId?: number; title?: string }>()
  const [categoryName, setCategoryName] = useState<string>('')

  useEffect(() => {
    if (data?.title) {
      setCategoryName(data.title)
      return
    }

    if (data?.categoryId) {
      // Fetch category name
      fetch('/api/prestashop-categories')
        .then((res) => res.json())
        .then((result) => {
          const cat = result.flatList?.find((c: Category) => c.id === data.categoryId)
          if (cat) {
            setCategoryName(cat.name)
          }
        })
        .catch(() => {
          setCategoryName(`Category #${data.categoryId}`)
        })
    }
  }, [data?.categoryId, data?.title])

  if (!data?.categoryId) {
    return <span>New Category</span>
  }

  return (
    <span>
      {categoryName || `Category #${data.categoryId}`}
    </span>
  )
}

export default CategoryRowLabel
