'use client'

import React, { useEffect, useState } from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import './MenuItemPreview.css'

type Category = {
  id: number
  name: string
  children?: Category[]
}

type CategoryTreeNode = {
  id: number
  name: string
  children: CategoryTreeNode[]
}

type CategoryData = {
  categoryId?: number
  title?: string
  visibleItemsCount?: number
}

export const MenuItemPreview: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [tree, setTree] = useState<CategoryTreeNode[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  // Get form field values
  const label = useFormFields(([fields]) => fields.label?.value as string)
  const menuCategories = useFormFields(([fields]) => fields.categories?.value as CategoryData[] | undefined)

  useEffect(() => {
    fetch('/api/prestashop-categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.flatList || [])
        setTree(data.tree || [])
      })
      .catch(console.error)
  }, [])

  const findCategoryInTree = (id: number, nodes: CategoryTreeNode[]): CategoryTreeNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node
      if (node.children) {
        const found = findCategoryInTree(id, node.children)
        if (found) return found
      }
    }
    return null
  }

  const getCategoryName = (id: number): string => {
    const cat = categories.find((c) => c.id === id)
    return cat?.name || `#${id}`
  }

  const getCategoryChildren = (id: number): CategoryTreeNode[] => {
    const cat = findCategoryInTree(id, tree)
    return cat?.children || []
  }

  // Ensure menuCategories is an array
  const categoriesArray = Array.isArray(menuCategories) ? menuCategories : []

  if (categoriesArray.length === 0) {
    return (
      <div className="menu-preview">
        <h4 className="menu-preview__title">Menu Preview</h4>
        <p className="menu-preview__empty">Add categories to see preview</p>
      </div>
    )
  }

  const activeCategory = selectedCategory !== null
    ? categoriesArray.find((c) => c.categoryId === selectedCategory)
    : categoriesArray[0]

  const activeCategoryId = activeCategory?.categoryId
  const activeCategoryChildren = activeCategoryId ? getCategoryChildren(activeCategoryId) : []
  const visibleCount = activeCategory?.visibleItemsCount || 10

  return (
    <div className="menu-preview">
      <h4 className="menu-preview__title">Menu Preview</h4>

      <div className="menu-preview__container">
        {/* Header */}
        <div className="menu-preview__header">
          <span className="menu-preview__label">{label || 'Menu Item'}</span>
        </div>

        <div className="menu-preview__content">
          {/* Left column - Categories */}
          <div className="menu-preview__column menu-preview__column--left">
            {categoriesArray.map((cat) => {
              if (!cat.categoryId) return null
              const isActive = activeCategoryId === cat.categoryId
              const name = cat.title || getCategoryName(cat.categoryId)

              return (
                <div
                  key={cat.categoryId}
                  className={`menu-preview__item ${isActive ? 'menu-preview__item--active' : ''}`}
                  onMouseEnter={() => setSelectedCategory(cat.categoryId!)}
                >
                  {name}
                </div>
              )
            })}
          </div>

          {/* Right column - Subcategories */}
          <div className="menu-preview__column menu-preview__column--right">
            {activeCategoryId && (
              <>
                <div className="menu-preview__subcategory-title">
                  {activeCategory?.title || getCategoryName(activeCategoryId)}
                </div>
                {activeCategoryChildren.slice(0, visibleCount).map((child) => (
                  <div key={child.id} className="menu-preview__subitem">
                    {child.name}
                  </div>
                ))}
                {activeCategoryChildren.length > visibleCount && (
                  <div className="menu-preview__more">
                    + {activeCategoryChildren.length - visibleCount} more...
                  </div>
                )}
                {activeCategoryChildren.length === 0 && (
                  <div className="menu-preview__empty-sub">No subcategories</div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuItemPreview
