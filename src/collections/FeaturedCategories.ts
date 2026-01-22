import type { CollectionConfig } from 'payload'

export const FeaturedCategories: CollectionConfig = {
  slug: 'featured-categories',
  labels: {
    singular: 'Featured Category',
    plural: 'Featured Categories',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'categoryId', 'order', 'isActive', 'updatedAt'],
    description: 'Categories displayed on the homepage below the hero slider',
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
        description: 'Title shown below the category image',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Category Image',
      required: true,
      admin: {
        description: 'Square image recommended (e.g., 200x200 or 400x400)',
      },
    },
    {
      name: 'categoryId',
      type: 'number',
      label: 'PrestaShop Category ID',
      required: true,
      admin: {
        description: 'ID of the category in PrestaShop (found in PrestaShop admin URL)',
      },
    },
    {
      name: 'categorySlug',
      type: 'text',
      label: 'Category Slug',
      required: true,
      admin: {
        description: 'URL slug of the category (e.g., "etui-do-iphone-16")',
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
  ],
}
