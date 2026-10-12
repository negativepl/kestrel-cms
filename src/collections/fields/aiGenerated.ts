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

export type AiBadgePosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * Corner of the banner where the "AI" badge sits, so it can be moved off a logo
 * or headline baked into the graphic. Only shown when `aiGenerated` is ticked.
 * Empty (older documents) falls back to the storefront's default for that banner.
 */
export const aiBadgePositionField = (defaultValue: AiBadgePosition = 'top-left'): Field => ({
  name: 'aiBadgePosition',
  type: 'select',
  label: 'AI badge position',
  defaultValue,
  options: [
    { label: 'Top left', value: 'top-left' },
    { label: 'Top right', value: 'top-right' },
    { label: 'Bottom left', value: 'bottom-left' },
    { label: 'Bottom right', value: 'bottom-right' },
  ],
  admin: {
    condition: (data) => Boolean(data?.aiGenerated),
    description: 'Corner where the "AI" badge is placed. Pick one that does not cover a logo or text on the graphic.',
  },
})
