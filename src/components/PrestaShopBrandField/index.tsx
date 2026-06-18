'use client'

import React, { useEffect, useState } from 'react'
import { useField } from '@payloadcms/ui'
// Reuse the category field styles (same look & feel)
import '../PrestaShopCategoryField/styles.css'

type Brand = {
  id: number
  name: string
}

type Props = {
  path: string
  label?: string
  required?: boolean
}

export const PrestaShopBrandField: React.FC<Props> = ({ path, label, required }) => {
  const { value, setValue } = useField<number>({ path })
  // Sibling field that stores the brand name (used to build the frontend URL).
  const namePath = path.replace(/[^.]+$/, 'brandName')
  const { setValue: setBrandName } = useField<string>({ path: namePath })

  const [brands, setBrands] = useState<Brand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/prestashop-manufacturers')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setBrands(data.flatList || [])
        setError(null)
      } catch (err) {
        setError('Failed to load brands')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBrands()
  }, [])

  const selectBrand = (brand: Brand) => {
    setValue(brand.id)
    setBrandName(brand.name)
  }

  const selectedBrand = brands.find((b) => b.id === value)

  const filteredBrands = search
    ? brands.filter(
        (b) =>
          b.name.toLowerCase().includes(search.toLowerCase()) ||
          b.id.toString().includes(search)
      )
    : brands

  return (
    <div className="ps-category-field">
      <label className="ps-category-field__label">
        {label || 'PrestaShop Brand'}
        {required && <span className="ps-category-field__required">*</span>}
      </label>

      {loading && <div className="ps-category-field__loading">Loading brands...</div>}
      {error && <div className="ps-category-field__error">{error}</div>}

      {!loading && !error && (
        <>
          <input
            type="text"
            className="ps-category-field__search"
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="ps-category-tree">
            {filteredBrands.map((brand) => (
              <div
                key={brand.id}
                className={`ps-category-tree__item ${value === brand.id ? 'ps-category-tree__item--selected' : ''}`}
              >
                <button
                  type="button"
                  className="ps-category-tree__label"
                  onClick={() => selectBrand(brand)}
                >
                  {brand.name}
                  <span className="ps-category-tree__id">#{brand.id}</span>
                </button>
              </div>
            ))}
            {filteredBrands.length === 0 && (
              <div className="ps-category-field__empty">No brands found</div>
            )}
          </div>
        </>
      )}

      {selectedBrand && (
        <div className="ps-category-field__selected">
          Selected: <strong>{selectedBrand.name}</strong> (ID: {selectedBrand.id})
        </div>
      )}
    </div>
  )
}

export default PrestaShopBrandField
