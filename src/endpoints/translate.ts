import type { PayloadHandler } from 'payload'

const OPENAI_API_KEY = process.env.OPENAI_API_KEY

const languageNames: Record<string, string> = {
  pl: 'Polish',
  en: 'English',
  de: 'German',
  ro: 'Romanian',
  cs: 'Czech',
  hu: 'Hungarian',
}

export const translateHandler: PayloadHandler = async (req) => {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 })
  }

  if (!OPENAI_API_KEY) {
    return Response.json({ error: 'OpenAI API key not configured' }, { status: 500 })
  }

  try {
    const body = await req.json?.()
    const { text, sourceLocale, targetLocales } = body as {
      text: string
      sourceLocale: string
      targetLocales: string[]
    }

    if (!text || !sourceLocale || !targetLocales?.length) {
      return Response.json({ error: 'Missing required fields: text, sourceLocale, targetLocales' }, { status: 400 })
    }

    const sourceLang = languageNames[sourceLocale] || sourceLocale
    const translations: Record<string, string> = {}

    for (const targetLocale of targetLocales) {
      if (targetLocale === sourceLocale) {
        translations[targetLocale] = text
        continue
      }

      const targetLang = languageNames[targetLocale] || targetLocale

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `You are a professional translator. Translate the following text from ${sourceLang} to ${targetLang}. Only return the translated text, nothing else. Keep the same tone and style. If the text contains brand names or technical terms, keep them as is.`,
            },
            {
              role: 'user',
              content: text,
            },
          ],
          temperature: 0.3,
          max_tokens: 1000,
        }),
      })

      if (!response.ok) {
        const error = await response.text()
        console.error(`OpenAI error for ${targetLocale}:`, error)
        translations[targetLocale] = text // Fallback to original
        continue
      }

      const data = await response.json()
      translations[targetLocale] = data.choices[0]?.message?.content?.trim() || text
    }

    return Response.json({ translations })
  } catch (error) {
    console.error('Translation error:', error)
    return Response.json({ error: 'Translation failed' }, { status: 500 })
  }
}
