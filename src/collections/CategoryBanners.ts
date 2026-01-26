import type { CollectionConfig } from 'payload'

export const CategoryBanners: CollectionConfig = {
  slug: 'category-banners',
  labels: {
    singular: 'Category Banner',
    plural: 'Category Banners',
  },
  admin: {
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'categoryId', 'isActive', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'internalName',
      type: 'text',
      label: 'Internal Name',
      required: true,
      admin: {
        description: 'For admin panel only - e.g., "iPhone 17 Pro Max - Promo Banner"',
      },
    },
    {
      name: 'showOnAllCategories',
      type: 'checkbox',
      label: 'Show on all categories',
      defaultValue: false,
      admin: {
        description: 'If enabled, this banner will appear on ALL category pages',
      },
    },
    {
      name: 'categoryId',
      type: 'number',
      label: 'PrestaShop Category',
      admin: {
        description: 'Banner will be displayed on this specific category page',
        condition: (data) => !data?.showOnAllCategories,
        components: {
          Field: '@/components/PrestaShopCategoryField#PrestaShopCategoryField',
        },
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner Image',
      required: true,
      admin: {
        description: 'Recommended: Square image (1:1 aspect ratio), e.g., 400×400px or 600×600px',
      },
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL',
      admin: {
        description: 'Optional: Where to go when banner is clicked',
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
    {
      name: 'displayLocales',
      type: 'select',
      label: 'Display for languages',
      hasMany: true,
      options: [
        { label: 'Polski', value: 'pl' },
        { label: 'English', value: 'en' },
        { label: 'Deutsch', value: 'de' },
        { label: 'Română', value: 'ro' },
        { label: 'Čeština', value: 'cs' },
        { label: 'Magyar', value: 'hu' },
      ],
      defaultValue: ['pl', 'en', 'de', 'ro', 'cs', 'hu'],
      admin: {
        description: 'Select languages where this banner should be displayed.',
      },
    },
  ],
}
