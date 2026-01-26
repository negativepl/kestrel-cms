import type { CollectionConfig } from 'payload'

export const ProductCarousels: CollectionConfig = {
  slug: 'product-carousels',
  labels: {
    singular: 'Product Carousel',
    plural: 'Product Carousels',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'location', 'isActive', 'order'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle (optional)',
    },
    {
      name: 'location',
      type: 'select',
      label: 'Display Location',
      options: [
        { label: 'Homepage - Top', value: 'home-top' },
        { label: 'Homepage - Middle', value: 'home-middle' },
        { label: 'Homepage - Bottom', value: 'home-bottom' },
        { label: 'Below Hero', value: 'below-hero' },
      ],
      required: true,
    },
    {
      name: 'carouselType',
      type: 'select',
      label: 'Carousel Type',
      options: [
        { label: 'PrestaShop Product IDs', value: 'product-ids' },
        { label: 'PrestaShop Category', value: 'category' },
        { label: 'Bestsellers', value: 'bestsellers' },
        { label: 'New Products', value: 'new-products' },
        { label: 'Sale', value: 'sale' },
      ],
      required: true,
      defaultValue: 'product-ids',
    },
    {
      name: 'productIds',
      type: 'text',
      label: 'Product IDs (comma separated)',
      admin: {
        condition: (data) => data?.carouselType === 'product-ids',
        description: 'e.g. 123, 456, 789',
      },
    },
    {
      name: 'categoryId',
      type: 'number',
      label: 'PrestaShop Category',
      admin: {
        condition: (data) => data?.carouselType === 'category',
        components: {
          Field: '@/components/PrestaShopCategoryField#PrestaShopCategoryField',
        },
      },
    },
    {
      name: 'sortBy',
      type: 'select',
      label: 'Sort By',
      options: [
        { label: 'Newest', value: 'date' },
        { label: 'Bestsellers', value: 'sales' },
        { label: 'Name (A-Z)', value: 'name' },
        { label: 'Price (Low to High)', value: 'price-asc' },
        { label: 'Price (High to Low)', value: 'price-desc' },
      ],
      defaultValue: 'date',
      admin: {
        condition: (data) => data?.carouselType === 'category' || data?.carouselType === 'product-ids',
      },
    },
    {
      name: 'limit',
      type: 'number',
      label: 'Product Limit',
      defaultValue: 12,
      min: 1,
      max: 50,
    },
    {
      name: 'showViewAllButton',
      type: 'checkbox',
      label: 'Show "View All" Button',
      defaultValue: true,
    },
    {
      name: 'viewAllLink',
      type: 'text',
      label: '"View All" Link',
      admin: {
        condition: (data) => data?.showViewAllButton,
      },
    },
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Background Color (CSS)',
      defaultValue: 'transparent',
      admin: {
        description: 'e.g. #f5f5f5, white, transparent',
      },
    },
    // Display Options
    {
      type: 'collapsible',
      label: 'Display Options',
      admin: {
        initCollapsed: true,
      },
      fields: [
        {
          name: 'hideOutOfStock',
          type: 'checkbox',
          label: 'Hide Out of Stock Products',
          defaultValue: false,
        },
        {
          name: 'showBadges',
          type: 'checkbox',
          label: 'Show Product Badges (New, Sale, etc.)',
          defaultValue: true,
        },
        {
          name: 'showPrices',
          type: 'checkbox',
          label: 'Show Prices',
          defaultValue: true,
        },
        {
          name: 'showAddToCart',
          type: 'checkbox',
          label: 'Show Add to Cart Button',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Active',
      defaultValue: true,
    },
  ],
}
