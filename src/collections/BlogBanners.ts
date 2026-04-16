import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateFrontend'
import { storeVisibilityFields } from './fields/storeVisibility'
import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload'

const filterByVisibilityDates: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation === 'find' && !req.user) {
    const now = new Date().toISOString()
    const existingWhere = args.where
    args.where = {
      and: [
        ...(existingWhere ? [existingWhere] : []),
        {
          or: [
            { visibleFrom: { equals: null } },
            { visibleFrom: { less_than_equal: now } },
          ],
        },
        {
          or: [
            { visibleTo: { equals: null } },
            { visibleTo: { greater_than_equal: now } },
          ],
        },
      ],
    }
  }
  return args
}

export const BlogBanners: CollectionConfig = {
  slug: 'blog-banners',
  labels: {
    singular: 'Blog Banner',
    plural: 'Blog Banners',
  },
  admin: {
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'wordpressPostId', 'isActive', 'visibleTo', 'updatedAt'],
    description: 'Promotional banners displayed inline within blog posts',
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeOperation: [filterByVisibilityDates],
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'internalName',
      type: 'text',
      label: 'Internal Name',
      required: true,
      admin: {
        description: 'For admin panel only - e.g., "Warehouse Sale Spring 2026"',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner Image',
      required: true,
      admin: {
        description: 'Wide banner: 1200×300px (4:1 ratio). Displayed full-width inside blog post.',
      },
    },
    {
      name: 'insertAfterParagraph',
      type: 'number',
      label: 'Insert after paragraph #',
      required: true,
      defaultValue: 3,
      min: 1,
      admin: {
        description: 'Banner appears after this paragraph (e.g. 3 = after 3rd paragraph). If post has fewer paragraphs, banner shows at the end.',
      },
    },
    {
      name: 'wordpressPostId',
      type: 'number',
      label: 'WordPress Post ID (optional)',
      admin: {
        components: {
          Field: '@/components/WordPressPostField#WordPressPostField',
        },
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
      admin: {
        description: 'Optional: Where to go when banner is clicked (e.g. /sale or full URL)',
      },
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      label: 'Open in New Tab',
      defaultValue: false,
    },
    {
      name: 'altText',
      type: 'text',
      label: 'Alt Text (SEO)',
      localized: true,
      admin: {
        description: 'Describe the image for accessibility and SEO',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
    },
    ...storeVisibilityFields,
    {
      type: 'collapsible',
      label: 'Visibility Schedule',
      admin: {
        initCollapsed: true,
        description: 'Leave empty to show banner without time restrictions.',
      },
      fields: [
        {
          name: 'visibleFrom',
          type: 'date',
          label: 'Visible From',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'dd.MM.yyyy HH:mm',
            },
            description: 'Banner starts showing at this date/time. Leave empty = visible immediately.',
          },
        },
        {
          name: 'visibleTo',
          type: 'date',
          label: 'Visible To',
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
              displayFormat: 'dd.MM.yyyy HH:mm',
            },
            description: 'Banner stops showing after this date/time. Leave empty = no expiry.',
          },
          validate: (value: Date | string | null | undefined, { siblingData }: { siblingData: Record<string, unknown> }) => {
            if (value && siblingData?.visibleFrom && new Date(value as string) <= new Date(siblingData.visibleFrom as string)) {
              return 'Visible To must be later than Visible From'
            }
            return true
          },
        },
      ],
    },
  ],
}
