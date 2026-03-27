import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateFrontend'
import type { CollectionConfig } from 'payload'

export const CategoryBanners: CollectionConfig = {
  slug: 'category-banners',
  labels: {
    singular: 'Banner',
    plural: 'Banners',
  },
  admin: {
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'targetType', 'position', 'isActive', 'updatedAt'],
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
        description: 'For admin panel only - e.g., "iPhone 17 Pro Max - Promo Banner"',
      },
    },
    {
      name: 'targetType',
      type: 'select',
      label: 'Target Type',
      defaultValue: 'category',
      required: true,
      options: [
        { label: 'Category Page', value: 'category' },
        { label: 'Special Page', value: 'page' },
      ],
      admin: {
        description: 'Where should this banner be displayed?',
      },
    },
    {
      name: 'showOnAllCategories',
      type: 'checkbox',
      label: 'Show on all categories',
      defaultValue: false,
      admin: {
        description: 'If enabled, this banner will appear on ALL category pages',
        condition: (data) => data?.targetType === 'category',
      },
    },
    {
      name: 'categoryId',
      type: 'number',
      label: 'PrestaShop Category',
      admin: {
        description: 'Banner will be displayed on this specific category page',
        condition: (data) => data?.targetType === 'category' && !data?.showOnAllCategories,
        components: {
          Field: '@/components/PrestaShopCategoryField#PrestaShopCategoryField',
        },
      },
    },
    {
      name: 'pageSlug',
      type: 'select',
      label: 'Page',
      options: [
        { label: 'Bestsellers', value: 'bestsellers' },
        { label: 'New Products', value: 'new-products' },
        { label: 'Sale', value: 'sale' },
        { label: 'Fast Shipping', value: 'fastshipping' },
      ],
      admin: {
        description: 'Select which special page this banner should appear on',
        condition: (data) => data?.targetType === 'page',
      },
    },
    {
      name: 'position',
      type: 'select',
      label: 'Position',
      defaultValue: 'sidebar',
      options: [
        { label: 'Sidebar (square)', value: 'sidebar' },
        { label: 'Above Products (wide)', value: 'above-products' },
        { label: 'Between Products (wide)', value: 'between-products' },
      ],
      admin: {
        description: 'Sidebar = square (400×400px). Above Products / Between Products = wide (1200×300px, 4:1 ratio).',
      },
    },
    {
      name: 'inlineAfterPosition',
      type: 'number',
      label: 'Show after product #',
      defaultValue: 8,
      min: 1,
      admin: {
        description: 'Banner appears after this many products (e.g. 8 = after 8th product)',
        condition: (data) => data?.position === 'between-products',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Banner Image',
      required: true,
      admin: {
        description: 'Sidebar: square (400×400px). Above Products / Between Products: wide (1200×300px, 4:1 ratio).',
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
    {
      name: 'displayStores',
      type: 'select',
      label: 'Display for Stores',
      hasMany: true,
      options: [
        { label: 'B2C (Retail)', value: 'b2c' },
        { label: 'B2B (Wholesale)', value: 'b2b' },
      ],
      defaultValue: ['b2c', 'b2b'],
      admin: {
        description: 'Select stores where this banner should be displayed.',
      },
    },
  ],
}
