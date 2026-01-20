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
    description: 'Configure mega menu structure - which categories appear where',
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
      type: 'array',
      label: 'Menu Items (Top Level)',
      labels: {
        singular: 'Menu Item',
        plural: 'Menu Items',
      },
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/MenuItemRowLabel#MenuItemRowLabel',
        },
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          required: true,
          localized: true,
          admin: {
            description: 'Display text (e.g. "Apple", "Samsung")',
          },
        },
        {
          name: 'prestashopCategoryId',
          type: 'number',
          label: 'PrestaShop Category',
          required: true,
          admin: {
            description: 'Main category from PrestaShop (used for "View All" link)',
            components: {
              Field: '@/components/PrestaShopCategoryField#PrestaShopCategoryField',
            },
          },
        },
        {
          name: 'isVisible',
          type: 'checkbox',
          label: 'Visible',
          defaultValue: true,
        },
        // Mega Menu Columns
        {
          name: 'columns',
          type: 'array',
          label: 'Mega Menu Columns',
          labels: {
            singular: 'Column',
            plural: 'Columns',
          },
          admin: {
            initCollapsed: true,
            description: 'Define columns that appear in the mega menu dropdown',
          },
          fields: [
            // Categories in this column (stacked vertically)
            {
              name: 'categories',
              type: 'array',
              label: 'Categories in Column',
              labels: {
                singular: 'Category Section',
                plural: 'Category Sections',
              },
              admin: {
                initCollapsed: false,
                description: 'Add multiple categories to stack them vertically in this column',
              },
              fields: [
                {
                  name: 'categoryId',
                  type: 'number',
                  label: 'PrestaShop Category',
                  required: true,
                  admin: {
                    description: 'Category - subcategories will be fetched automatically',
                    components: {
                      Field: '@/components/PrestaShopCategoryField#PrestaShopCategoryField',
                    },
                  },
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title (optional)',
                  localized: true,
                  admin: {
                    description: 'Header text (leave empty to use category name)',
                  },
                },
                {
                  name: 'showTitle',
                  type: 'checkbox',
                  label: 'Show title',
                  defaultValue: true,
                },
                {
                  name: 'visibleItemsCount',
                  type: 'number',
                  label: 'Visible Items',
                  defaultValue: 10,
                  admin: {
                    description: 'How many items to show (rest under "Older models")',
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
