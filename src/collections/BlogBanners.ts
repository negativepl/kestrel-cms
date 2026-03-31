import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateFrontend'
import { storeVisibilityFields } from './fields/storeVisibility'
import type { CollectionConfig } from 'payload'

export const BlogBanners: CollectionConfig = {
  slug: 'blog-banners',
  labels: {
    singular: 'Blog Banner',
    plural: 'Blog Banners',
  },
  admin: {
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'wordpressPostId', 'isActive', 'updatedAt'],
    description: 'Promotional banners displayed inline within blog posts',
  },
  access: {
    read: () => true,
  },
  hooks: {
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
  ],
}
