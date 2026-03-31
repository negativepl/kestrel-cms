'use client'

import React, { useEffect, useState, useRef } from 'react'
import { useField } from '@payloadcms/ui'
import '../PrestaShopCategoryField/styles.css'

const WP_API = 'https://blog.trkhspl.com/wp-json/wp/v2/posts?lang=pl'

type WPPost = {
  id: number
  title: string
  date: string
}

type Props = {
  path: string
  label?: string
  required?: boolean
}

function decodeHtml(text: string): string {
  return text.replace(/&#8211;/g, '–').replace(/&#8230;/g, '…').replace(/&amp;/g, '&').replace(/&#8217;/g, "'")
}

function mapPosts(data: any[]): WPPost[] {
  return data.map((p) => ({
    id: p.id,
    title: decodeHtml(p.title.rendered),
    date: new Date(p.date).toLocaleDateString('pl-PL'),
  }))
}

export const WordPressPostField: React.FC<Props> = ({ path, label, required }) => {
  const { value, setValue } = useField<number>({ path })
  const [posts, setPosts] = useState<WPPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Load recent posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${WP_API}&per_page=30&orderby=date&order=desc&_fields=id,title,date`)
        if (!res.ok) throw new Error('Failed to fetch')
        setPosts(mapPosts(await res.json()))
        setError(null)
      } catch {
        setError('Failed to load posts from WordPress')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // Resolve selected post title
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
    fetch(`https://blog.trkhspl.com/wp-json/wp/v2/posts/${value}?_fields=id,title`)
      .then((r) => r.json())
      .then((p) => setSelectedTitle(p?.title?.rendered ? decodeHtml(p.title.rendered) : `Post #${value}`))
      .catch(() => setSelectedTitle(`Post #${value}`))
  }, [value, posts])

  // Search with debounce
  const handleSearchChange = (query: string) => {
    setSearch(query)

    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      if (query.length < 2) {
        // Reset to recent posts
        try {
          const res = await fetch(`${WP_API}&per_page=30&orderby=date&order=desc&_fields=id,title,date`)
          if (res.ok) setPosts(mapPosts(await res.json()))
        } catch { /* ignore */ }
        return
      }
      try {
        setLoading(true)
        // Fetch more results and filter by title client-side (WP search includes body matches)
        const res = await fetch(`${WP_API}&search=${encodeURIComponent(query)}&per_page=50&_fields=id,title,date`)
        if (res.ok) {
          const all = mapPosts(await res.json())
          const q = query.toLowerCase()
          const filtered = all.filter((p) => p.title.toLowerCase().includes(q))
          setPosts(filtered.length > 0 ? filtered : all.slice(0, 10))
        }
      } catch { /* ignore */ } finally {
        setLoading(false)
      }
    }, 400)
  }

  return (
    <div className="ps-category-field" style={{ marginBottom: 'calc(var(--base) * 2)' }}>
      <label className="ps-category-field__label">
        {label || 'Blog Post (optional)'}
        {required && <span className="ps-category-field__required">*</span>}
      </label>

      {value && selectedTitle && (
        <div className="ps-category-field__selected">
          Selected: <strong>{selectedTitle}</strong> (ID: {value})
          {' '}
          <button
            type="button"
            onClick={() => setValue(null as any)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline', fontSize: 'inherit', fontFamily: 'inherit' }}
          >
            Clear (show on all posts)
          </button>
        </div>
      )}

      {!value && (
        <div style={{ fontSize: 'calc(var(--font-body-size) * 0.9)', color: 'var(--theme-elevation-500)', marginBottom: 'calc(var(--base) / 2)' }}>
          None — banner shows on all posts
        </div>
      )}

      {error && <div className="ps-category-field__error">{error}</div>}

      {!error && (
        <>
          <input
            type="text"
            className="ps-category-field__search"
            placeholder="Search posts by title..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

          {loading && <div className="ps-category-field__loading">Loading posts...</div>}

          {!loading && (
            <div className="ps-category-tree">
              {posts.map((post) => (
                <div key={post.id} className="ps-category-tree__node">
                  <div
                    className={`ps-category-tree__item ${value === post.id ? 'ps-category-tree__item--selected' : ''}`}
                  >
                    <button
                      type="button"
                      className="ps-category-tree__label"
                      onClick={() => setValue(post.id)}
                    >
                      {post.title}
                      <span className="ps-category-tree__id">#{post.id} · {post.date}</span>
                    </button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && (
                <div className="ps-category-field__loading">No posts found</div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default WordPressPostField
