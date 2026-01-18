'use client'

import { useState } from 'react'
import { useDocumentInfo, useLocale, useTranslation } from '@payloadcms/ui'

const allLocales = ['pl', 'en', 'de', 'ro', 'cs', 'hu']

const localeLabels: Record<string, string> = {
  pl: '🇵🇱 Polski',
  en: '🇬🇧 English',
  de: '🇩🇪 Deutsch',
  ro: '🇷🇴 Română',
  cs: '🇨🇿 Čeština',
  hu: '🇭🇺 Magyar',
}

export const TranslateButton: React.FC = () => {
  const [isTranslating, setIsTranslating] = useState(false)
  const [status, setStatus] = useState<string | null>(null)
  const { id, collectionSlug } = useDocumentInfo()
  const { code: currentLocale } = useLocale()
  const { t } = useTranslation()

  const handleTranslate = async () => {
    if (!id || !collectionSlug) {
      setStatus('Save the document first')
      return
    }

    setIsTranslating(true)
    setStatus('Translating...')

    try {
      // Get current document data
      const docResponse = await fetch(`/api/${collectionSlug}/${id}?locale=${currentLocale}&depth=0`)
      const doc = await docResponse.json()

      // Find localized fields to translate (title, subtitle, buttonText)
      const fieldsToTranslate = ['title', 'subtitle', 'buttonText']
      const targetLocales = allLocales.filter(l => l !== currentLocale)

      for (const field of fieldsToTranslate) {
        const sourceText = doc[field]
        if (!sourceText) continue

        // Call translate endpoint
        const translateResponse = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: sourceText,
            sourceLocale: currentLocale,
            targetLocales,
          }),
        })

        if (!translateResponse.ok) {
          console.error(`Failed to translate ${field}`)
          continue
        }

        const { translations } = await translateResponse.json()

        // Update each locale
        for (const [locale, translatedText] of Object.entries(translations)) {
          if (locale === currentLocale) continue

          await fetch(`/api/${collectionSlug}/${id}?locale=${locale}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [field]: translatedText }),
          })
        }
      }

      setStatus('Translated to all languages!')
      setTimeout(() => setStatus(null), 3000)
    } catch (error) {
      console.error('Translation error:', error)
      setStatus('Translation failed')
    } finally {
      setIsTranslating(false)
    }
  }

  return (
    <div style={{
      padding: '16px',
      marginBottom: '16px',
      background: 'var(--theme-elevation-100)',
      borderRadius: '8px',
      border: '1px solid var(--theme-elevation-200)'
    }}>
      <div style={{
        marginBottom: '8px',
        fontWeight: '600',
        fontSize: '14px',
        color: 'var(--theme-text)'
      }}>
        AI Translation
      </div>
      <div style={{
        marginBottom: '12px',
        fontSize: '13px',
        color: 'var(--theme-elevation-500)',
        lineHeight: '1.4'
      }}>
        Translate from {localeLabels[currentLocale] || currentLocale} to all other languages.
      </div>
      <button
        onClick={handleTranslate}
        disabled={isTranslating}
        style={{
          padding: '10px 16px',
          background: isTranslating ? 'var(--theme-elevation-200)' : '#3b82f6',
          color: isTranslating ? 'var(--theme-elevation-500)' : '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: isTranslating ? 'not-allowed' : 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          width: '100%',
          transition: 'background 0.2s ease',
        }}
      >
        {isTranslating ? 'Translating...' : 'Translate to all languages'}
      </button>
      {status && (
        <div style={{
          marginTop: '10px',
          fontSize: '13px',
          padding: '8px 12px',
          borderRadius: '4px',
          background: status.includes('Translated') ? 'rgba(34, 197, 94, 0.15)' : status.includes('failed') ? 'rgba(239, 68, 68, 0.15)' : 'var(--theme-elevation-150)',
          color: status.includes('Translated') ? '#22c55e' : status.includes('failed') ? '#ef4444' : 'var(--theme-text)'
        }}>
          {status}
        </div>
      )}
    </div>
  )
}
