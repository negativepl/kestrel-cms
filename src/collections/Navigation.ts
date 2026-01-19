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
          label: 'PrestaShop Category ID',
          required: true,
          admin: {
            description: 'Main category ID from PrestaShop (used for "View All" link)',
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
            {
              name: 'title',
              type: 'text',
              label: 'Column Title (optional)',
              localized: true,
              admin: {
                description: 'Header text for this column (leave empty to use category name)',
              },
            },
            {
              name: 'categoryId',
              type: 'number',
              label: 'PrestaShop Category ID',
              required: true,
              admin: {
                description: 'Category ID - subcategories will be fetched automatically',
              },
            },
            {
              name: 'visibleItemsCount',
              type: 'number',
              label: 'Widoczne elementy',
              defaultValue: 10,
              admin: {
                description: 'Ile elementów pokazać domyślnie (reszta pod "Starsze modele")',
              },
            },
            {
              name: 'showTitle',
              type: 'checkbox',
              label: 'Show column title',
              defaultValue: true,
            },
            {
              name: 'order',
              type: 'number',
              label: 'Order',
              defaultValue: 0,
            },
            // TODO: featuredProductIds - wyróżnione produkty w kolumnie
            // TODO: featuredImage - obrazek promocyjny w kolumnie
            // TODO: customLinks - własne linki zamiast kategorii PS
          ],
        },
      ],
    },
  ],
}
