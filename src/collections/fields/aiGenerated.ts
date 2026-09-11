import type { Field } from 'payload'

/**
 * Marks a banner whose graphics/copy were produced with AI.
 * The storefront renders an "AI" badge with an info popover on such banners
 * (transparency disclosure), so the notice no longer has to be baked into the image.
 */
export const aiGeneratedField: Field = {
  name: 'aiGenerated',
  type: 'checkbox',
  label: 'AI-generated content',
  defaultValue: false,
  admin: {
    description:
      'Shows an "AI" badge with a disclosure popover on the banner in the storefront. Tick when the graphic or copy was created with AI.',
  },
}
