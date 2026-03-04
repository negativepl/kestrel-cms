'use client'

import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'
import './styles.css'

type MenuItem = {
  id: number
  label: string
  prestashopCategoryId: number
  isVisible: boolean
}

type Props = {
  path: string
  label?: string
}

export const NavCategorySelector: React.FC<Props> = ({ path, label }) => {
  const { value, setValue } = useField<number[]>({ path })
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const selectedIds: number[] = Array.isArray(value) ? value : []

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/menu-items?limit=100&sort=label')
        if (!res.ok) throw new Error('Failed to fetch menu items')
        const data = await res.json()
        setMenuItems(
          (data.docs || []).filter((item: MenuItem) => item.isVisible)
        )
        setError(null)
      } catch (err) {
        setError('Failed to load navigation categories')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchMenuItems()
  }, [])

  const toggleCategory = (categoryId: number) => {
    const newSelected = selectedIds.includes(categoryId)
      ? selectedIds.filter((id) => id !== categoryId)
      : [...selectedIds, categoryId]
    setValue(newSelected.length > 0 ? newSelected : null)
  }

  const selectAll = () => {
    setValue(menuItems.map((item) => item.prestashopCategoryId))
  }

  const clearAll = () => {
    setValue(null)
  }

  return (
    <div className="nav-cat-selector">
      <label className="nav-cat-selector__label">
        {label || 'Show for Nav Categories'}
      </label>
      <p className="nav-cat-selector__description">
        Select which mega menu categories should display this featured item. Leave empty to show for ALL categories (global).
      </p>

      {loading && <div className="nav-cat-selector__loading">Loading navigation categories...</div>}
      {error && <div className="nav-cat-selector__error">{error}</div>}

      {!loading && !error && (
        <>
          <div className="nav-cat-selector__actions">
            <button type="button" onClick={selectAll} className="nav-cat-selector__action-btn">
              Select all
            </button>
            <button type="button" onClick={clearAll} className="nav-cat-selector__action-btn">
              Clear (global)
            </button>
          </div>

          <div className="nav-cat-selector__list">
            {menuItems.map((item) => {
              const isChecked = selectedIds.includes(item.prestashopCategoryId)
              return (
                <label
                  key={item.id}
                  className={`nav-cat-selector__item ${isChecked ? 'nav-cat-selector__item--selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(item.prestashopCategoryId)}
                    className="nav-cat-selector__checkbox"
                  />
                  <span className="nav-cat-selector__item-label">{item.label}</span>
                  <span className="nav-cat-selector__item-id">#{item.prestashopCategoryId}</span>
                </label>
              )
            })}
          </div>

          {selectedIds.length > 0 && (
            <div className="nav-cat-selector__summary">
              Showing for {selectedIds.length} {selectedIds.length === 1 ? 'category' : 'categories'}
            </div>
          )}
          {selectedIds.length === 0 && (
            <div className="nav-cat-selector__summary nav-cat-selector__summary--global">
              Global — showing for all categories
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default NavCategorySelector
