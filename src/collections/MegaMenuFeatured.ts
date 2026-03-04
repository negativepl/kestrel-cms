import type { CollectionConfig } from 'payload'

export const MegaMenuFeatured: CollectionConfig = {
  slug: 'mega-menu-featured',
  labels: {
    singular: 'Mega Menu Featured Item',
    plural: 'Mega Menu Featured Items',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categoryId', 'order', 'isActive', 'updatedAt'],
    description: 'Featured category cards displayed in the mega menu "Polecane" section',
    group: 'Navigation',
    components: {
      edit: {
        SaveButton: '@/components/SaveWithTranslate#SaveWithTranslate',
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Display Title',
      required: true,
      localized: true,
      admin: {
        description: 'Title shown on the featured card (e.g. "Nowości", "Bestsellery")',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Card Image',
      required: true,
      admin: {
        description: 'Background image for the card (recommended: 600x400 or similar landscape)',
      },
    },
    {
      name: 'linkType',
      type: 'select',
      label: 'Link Type',
      defaultValue: 'category',
      options: [
        { label: 'Category', value: 'category' },
        { label: 'Custom URL', value: 'custom' },
      ],
      admin: {
        description: 'Choose whether to link to a category or a custom URL',
      },
    },
    {
      name: 'categoryId',
      type: 'number',
      label: 'PrestaShop Category ID',
      admin: {
        description: 'ID of the category in PrestaShop',
        condition: (data) => data.linkType === 'category',
        components: {
          Field: '@/components/PrestaShopCategoryField#PrestaShopCategoryField',
        },
      },
    },
    {
      name: 'categorySlug',
      type: 'text',
      label: 'Category Slug',
      admin: {
        description: 'URL slug of the category (e.g., "nowosci", "bestsellery")',
        condition: (data) => data.linkType === 'category',
      },
    },
    {
      name: 'customUrl',
      type: 'text',
      label: 'Custom URL',
      admin: {
        description: 'Full URL path (e.g., "/bestsellers" or "/new-products")',
        condition: (data) => data.linkType === 'custom',
      },
    },
    {
      name: 'showForCategoryIds',
      type: 'json',
      label: 'Show for Nav Categories (IDs)',
      admin: {
        description: 'Array of parent category IDs from the mega menu where this item should appear. Example: [1550, 424]. Leave empty to show for ALL categories (global).',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: {
        description: 'Lower number = displays first',
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
        description: 'Select languages where this item should be displayed.',
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
        description: 'Select stores where this item should be displayed.',
      },
    },
  ],
}
