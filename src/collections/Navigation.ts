import type { CollectionConfig } from 'payload'

export const Navigation: CollectionConfig = {
  slug: 'navigation',
  labels: {
    singular: 'Navigation Menu',
    plural: 'Navigation Menus',
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'isActive', 'updatedAt'],
    description: 'Configure mega menu structure - assign menu items to menus',
    group: 'Navigation',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Menu Name',
      required: true,
      admin: {
        description: 'e.g. "Main Menu"',
      },
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      unique: true,
      admin: {
        description: 'e.g. "main-menu" - used to fetch this menu in frontend',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'menu-items' as 'media', // Type assertion - menu-items is valid but not yet in generated types
      hasMany: true,
      label: 'Menu Items',
      admin: {
        description: 'Select and order menu items (e.g., Apple, Samsung, Xiaomi)',
        isSortable: true,
      },
    },
  ],
}
