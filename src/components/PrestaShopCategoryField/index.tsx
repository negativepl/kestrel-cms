'use client'

import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'
import './styles.css'

type Category = {
  id: number
  name: string
  level: number
}

type CategoryTreeNode = {
  id: number
  name: string
  children: CategoryTreeNode[]
}

type Props = {
  path: string
  label?: string
  required?: boolean
}

export const PrestaShopCategoryField: React.FC<Props> = ({ path, label, required }) => {
  const { value, setValue } = useField<number>({ path })
  const [categories, setCategories] = useState<Category[]>([])
  const [tree, setTree] = useState<CategoryTreeNode[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/prestashop-categories')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setCategories(data.flatList || [])
        setTree(data.tree || [])
        setError(null)
      } catch (err) {
        setError('Failed to load categories')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchCategories()
  }, [])

  const toggleExpand = (id: number) => {
    const newExpanded = new Set(expandedIds)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedIds(newExpanded)
  }

  const renderTreeNode = (node: CategoryTreeNode, depth: number = 0): React.ReactNode => {
    const isExpanded = expandedIds.has(node.id)
    const hasChildren = node.children && node.children.length > 0
    const isSelected = value === node.id

    return (
      <div key={node.id} className="ps-category-tree__node">
        <div
          className={`ps-category-tree__item ${isSelected ? 'ps-category-tree__item--selected' : ''}`}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          {hasChildren && (
            <button
              type="button"
              className="ps-category-tree__toggle"
              onClick={() => toggleExpand(node.id)}
            >
              {isExpanded ? '▼' : '▶'}
            </button>
          )}
          {!hasChildren && <span className="ps-category-tree__spacer" />}
          <button
            type="button"
            className="ps-category-tree__label"
            onClick={() => setValue(node.id)}
          >
            {node.name}
            <span className="ps-category-tree__id">#{node.id}</span>
          </button>
        </div>
        {hasChildren && isExpanded && (
          <div className="ps-category-tree__children">
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    )
  }

  const selectedCategory = categories.find((c) => c.id === value)

  // Filter categories by search
  const filteredCategories = search
    ? categories.filter((cat) =>
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.id.toString().includes(search)
      )
    : []

  return (
    <div className="ps-category-field">
      <label className="ps-category-field__label">
        {label || 'PrestaShop Category'}
        {required && <span className="ps-category-field__required">*</span>}
      </label>

      {loading && <div className="ps-category-field__loading">Loading categories...</div>}
      {error && <div className="ps-category-field__error">{error}</div>}

      {!loading && !error && (
        <>
          <input
            type="text"
            className="ps-category-field__search"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Show filtered results when searching */}
          {search && (
            <div className="ps-category-tree">
              {filteredCategories.map((cat) => (
                <div
                  key={cat.id}
                  className={`ps-category-tree__item ${value === cat.id ? 'ps-category-tree__item--selected' : ''}`}
                >
                  <button
                    type="button"
                    className="ps-category-tree__label"
                    onClick={() => setValue(cat.id)}
                  >
                    {cat.name}
                    <span className="ps-category-tree__id">#{cat.id}</span>
                  </button>
                </div>
              ))}
              {filteredCategories.length === 0 && (
                <div className="ps-category-field__empty">No categories found</div>
              )}
            </div>
          )}

          {/* Show tree when not searching */}
          {!search && (
            <div className="ps-category-tree">
              {tree.map((node) => renderTreeNode(node))}
            </div>
          )}
        </>
      )}

      {selectedCategory && (
        <div className="ps-category-field__selected">
          Selected: <strong>{selectedCategory.name}</strong> (ID: {selectedCategory.id})
        </div>
      )}
    </div>
  )
}

export default PrestaShopCategoryField
