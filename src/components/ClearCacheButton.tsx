'use client'

import { useState } from 'react'

export const ClearCacheButton = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleClearCache = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (data.success) {
        setMessage('✓ Cache cleared!')
      } else {
        setMessage('✗ Failed to clear cache')
      }
    } catch (error) {
      setMessage('✗ Error clearing cache')
    } finally {
      setLoading(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  return (
    <div style={{ padding: '0 16px', marginBottom: '8px' }}>
      <button
        onClick={handleClearCache}
        disabled={loading}
        style={{
          width: '100%',
          padding: '10px 16px',
          backgroundColor: loading ? '#6b7280' : '#4f46e5',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: loading ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'background-color 0.2s',
        }}
        onMouseOver={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = '#4338ca'
        }}
        onMouseOut={(e) => {
          if (!loading) e.currentTarget.style.backgroundColor = '#4f46e5'
        }}
      >
        {loading ? (
          <>
            <span style={{ 
              width: '16px', 
              height: '16px', 
              border: '2px solid white',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }} />
            Clearing...
          </>
        ) : (
          <>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            Clear Frontend Cache
          </>
        )}
      </button>
      {message && (
        <div style={{
          marginTop: '8px',
          padding: '8px',
          backgroundColor: message.startsWith('✓') ? '#dcfce7' : '#fee2e2',
          color: message.startsWith('✓') ? '#166534' : '#991b1b',
          borderRadius: '4px',
          fontSize: '13px',
          textAlign: 'center',
        }}>
          {message}
        </div>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default ClearCacheButton
