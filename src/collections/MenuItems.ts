import type { CollectionConfig } from 'payload'

export const MenuItems: CollectionConfig = {
  slug: 'menu-items',
  labels: {
    singular: 'Menu Item',
    plural: 'Menu Items',
  },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'prestashopCategoryId', 'isVisible', 'updatedAt'],
    description: 'Individual menu items (e.g., Apple, Samsung) with their category structure',
    group: 'Navigation',
  },
  access: {
    read: () => true,
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
      label: 'Main PrestaShop Category',
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
    // Categories shown in mega menu (directly, no columns wrapper)
    {
      name: 'categories',
      type: 'array',
      label: 'Mega Menu Categories',
      labels: {
        singular: 'Category',
        plural: 'Categories',
      },
      admin: {
        initCollapsed: false,
        description: 'Categories displayed in the mega menu for this item',
        components: {
          RowLabel: '@/components/CategoryRowLabel#CategoryRowLabel',
        },
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
          label: 'Custom Title (optional)',
          localized: true,
          admin: {
            description: 'Leave empty to use category name from PrestaShop',
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
          defaultValue: 0,
          admin: {
            description: '0 = show all, or enter a number to limit (rest under "More...")',
          },
        },
      ],
    },
    // Sidebar for preview
    {
      name: 'preview',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/MenuItemPreview#MenuItemPreview',
        },
      },
    },
  ],
}
