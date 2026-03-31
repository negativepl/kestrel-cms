'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { useField } from '@payloadcms/ui'
import './styles.css'

const WP_API = 'https://blog.trkhspl.com/wp-json/wp/v2/posts'

type WPPost = {
  id: number
  title: string
  date: string
  link: string
}

type Props = {
  path: string
  label?: string
  required?: boolean
}

export const WordPressPostField: React.FC<Props> = ({ path, label, required }) => {
  const { value, setValue } = useField<number>({ path })
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  // Load initial posts + selected post title
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${WP_API}?per_page=20&orderby=date&order=desc&_fields=id,title,date,link`)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setPosts(data.map((p: any) => ({
          id: p.id,
          title: p.title.rendered.replace(/&#8211;/g, '–').replace(/&#8230;/g, '…').replace(/&amp;/g, '&'),
          date: new Date(p.date).toLocaleDateString('pl-PL'),
          link: p.link,
        })))
      } catch {
        setError('Nie udało się pobrać postów z WordPress')
      } finally {
        setLoading(false)
      }
    }
    fetchInitial()
  }, [])

  // Fetch selected post title if value set but not in loaded posts
  useEffect(() => {
    if (!value) {
      setSelectedTitle(null)
      return
    }
    const found = posts.find((p) => p.id === value)
    if (found) {
      setSelectedTitle(found.title)
      return
    }
    // Fetch single post
    fetch(`${WP_API}/${value}?_fields=id,title`)
      .then((r) => r.json())
      .then((p) => {
        if (p?.title?.rendered) {
          setSelectedTitle(p.title.rendered.replace(/&#8211;/g, '–').replace(/&#8230;/g, '…').replace(/&amp;/g, '&'))
        }
      })
      .catch(() => setSelectedTitle(`Post #${value}`))
  }, [value, posts])

  // Search posts
  const handleSearch = useCallback(async (query: string) => {
    setSearch(query)
    if (query.length < 2) return
    try {
      setLoading(true)
      const res = await fetch(`${WP_API}?search=${encodeURIComponent(query)}&per_page=10&_fields=id,title,date,link`)
      if (!res.ok) return
      const data = await res.json()
      setPosts(data.map((p: any) => ({
        id: p.id,
        title: p.title.rendered.replace(/&#8211;/g, '–').replace(/&#8230;/g, '…').replace(/&amp;/g, '&'),
        date: new Date(p.date).toLocaleDateString('pl-PL'),
        link: p.link,
      })))
    } catch {
      // ignore search errors
    } finally {
      setLoading(false)
    }
  }, [])

  const selectPost = (post: WPPost) => {
    setValue(post.id)
    setSelectedTitle(post.title)
    setIsOpen(false)
    setSearch('')
  }

  const clearSelection = () => {
    setValue(null as any)
    setSelectedTitle(null)
  }

  return (
    <div className="wp-post-field">
      <label className="wp-post-field__label">
        {label || 'WordPress Post ID'}
        {required && <span className="wp-post-field__required">*</span>}
      </label>

      <p className="wp-post-field__description">
        Pokaż banner tylko na tym poście. Puste = globalny (wszystkie posty).
      </p>

      {error && <div className="wp-post-field__error">{error}</div>}

      {/* Selected post display */}
      {value && selectedTitle ? (
        <div className="wp-post-field__selected">
          <span className="wp-post-field__selected-title">
            <strong>#{value}</strong> — {selectedTitle}
          </span>
          <button type="button" className="wp-post-field__clear" onClick={clearSelection}>✕</button>
        </div>
      ) : (
        <div className="wp-post-field__empty-hint">Brak — banner globalny (wszystkie posty)</div>
      )}

      {/* Toggle dropdown */}
      <button
        type="button"
        className="wp-post-field__toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? 'Zamknij' : 'Wybierz post z bloga'}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="wp-post-field__dropdown">
          <input
            type="text"
            className="wp-post-field__search"
            placeholder="Szukaj po tytule..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            autoFocus
          />

          {loading && <div className="wp-post-field__loading">Ładowanie...</div>}

          <div className="wp-post-field__list">
            {posts.map((post) => (
              <button
                key={post.id}
                type="button"
                className={`wp-post-field__item ${value === post.id ? 'wp-post-field__item--selected' : ''}`}
                onClick={() => selectPost(post)}
              >
                <span className="wp-post-field__item-title">{post.title}</span>
                <span className="wp-post-field__item-meta">#{post.id} · {post.date}</span>
              </button>
            ))}
            {!loading && posts.length === 0 && (
              <div className="wp-post-field__empty">Nie znaleziono postów</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default WordPressPostField
