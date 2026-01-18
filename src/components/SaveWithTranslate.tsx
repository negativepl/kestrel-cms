'use client'

import { useState } from 'react'
import { Button, SaveButton, useDocumentInfo, useLocale, toast } from '@payloadcms/ui'

const allLocales = ['pl', 'en', 'de', 'ro', 'cs', 'hu']

export const SaveWithTranslate: React.FC = () => {
  const [isTranslating, setIsTranslating] = useState(false)
  const { id, collectionSlug } = useDocumentInfo()
  const { code: currentLocale } = useLocale()

  const handleTranslate = async () => {
    if (!id || !collectionSlug) {
      toast.error('Save the document first')
      return
    }

    setIsTranslating(true)

    try {
      const docResponse = await fetch(`/api/${collectionSlug}/${id}?locale=${currentLocale}&depth=0`)
      const doc = await docResponse.json()

      console.log('Source document:', doc)

      const fieldsToTranslate = ['title', 'subtitle', 'buttonText']
      const targetLocales = allLocales.filter(l => l !== currentLocale)

      for (const field of fieldsToTranslate) {
        const sourceText = doc[field]
        if (!sourceText) {
          console.log(`Field ${field} is empty, skipping`)
          continue
        }

        console.log(`Translating field ${field}: "${sourceText}"`)

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
          console.error(`Translation API failed for ${field}:`, await translateResponse.text())
          continue
        }

        const { translations } = await translateResponse.json()
        console.log(`Translations for ${field}:`, translations)

        for (const [locale, translatedText] of Object.entries(translations)) {
          if (locale === currentLocale) continue

          console.log(`Saving ${field} to locale ${locale}: "${translatedText}"`)

          const patchResponse = await fetch(`/api/${collectionSlug}/${id}?locale=${locale}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ [field]: translatedText }),
          })

          if (!patchResponse.ok) {
            console.error(`PATCH failed for ${field} locale ${locale}:`, await patchResponse.text())
          } else {
            console.log(`Saved ${field} to ${locale}`)
          }
        }
      }

      toast.success('Translated to all languages!')
      setIsTranslating(false)
      // window.location.reload()
    } catch (error) {
      console.error('Translation error:', error)
      toast.error('Translation failed')
      setIsTranslating(false)
    }
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button
        type="button"
        onClick={handleTranslate}
        disabled={isTranslating || !id}
        buttonStyle="pill"
        size="medium"
      >
        {isTranslating ? 'Translating...' : 'Translate'}
      </Button>
      <SaveButton />
    </div>
  )
}
