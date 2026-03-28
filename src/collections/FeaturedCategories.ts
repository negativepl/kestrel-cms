import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateFrontend'
import { storeVisibilityFields } from './fields/storeVisibility'
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
    components: {
      edit: {
        SaveButton: '@/components/SaveWithTranslate#SaveWithTranslate',
      },
    },
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
      label: 'Category Slug (fallback)',
      admin: {
        description: 'Optional fallback slug. The storefront resolves localized slugs automatically from PrestaShop by categoryId.',
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
    ...storeVisibilityFields,
  ],
}
