import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateFrontend'
import { storeVisibilityFields } from './fields/storeVisibility'
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
        description: 'Aspect ratio 3:2 (e.g. 900×600px). Image scales responsively without cropping or stretching. 1 card = full width, 2 cards = stacked vertically.',
      },
    },
    {
      name: 'linkType',
      type: 'select',
      label: 'Link Type',
      defaultValue: 'category',
      options: [
        { label: 'Category', value: 'category' },
        { label: 'Brand', value: 'brand' },
        { label: 'Page', value: 'page' },
        { label: 'Custom URL', value: 'custom' },
      ],
      admin: {
        description: 'Choose what this card links to',
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
      name: 'brandId',
      type: 'number',
      label: 'Brand (Manufacturer)',
      admin: {
        description: 'Pick a brand from PrestaShop',
        condition: (data) => data.linkType === 'brand',
        components: {
          Field: '@/components/PrestaShopBrandField#PrestaShopBrandField',
        },
      },
    },
    {
      name: 'brandName',
      type: 'text',
      label: 'Brand Name',
      admin: {
        description: 'Auto-filled from the selected brand; used to build the URL (e.g. "/brands/143-torras").',
        condition: (data) => data.linkType === 'brand',
        readOnly: true,
      },
    },
    {
      name: 'linkPage',
      type: 'select',
      label: 'Page',
      options: [
        { label: 'Homepage', value: '/' },
        { label: 'New Products', value: '/new-products' },
        { label: 'Bestsellers', value: '/bestsellers' },
        { label: 'Sale', value: '/sale' },
        { label: 'Fast Shipping', value: '/fastshipping' },
        { label: 'Blog', value: '/blog' },
        { label: 'Brands', value: '/brands' },
        { label: 'Contact', value: '/contact' },
        { label: 'FAQ', value: '/faq' },
        { label: 'About', value: '/about' },
        { label: 'Shipping Info', value: '/shipping' },
        { label: 'Returns', value: '/returns' },
        { label: 'Payments', value: '/payments' },
        { label: 'Terms', value: '/terms' },
        { label: 'Privacy', value: '/privacy' },
        { label: "B2B What's New", value: '/b2b/nowosci' },
        { label: 'Delivery News (B2B)', value: '/delivery-news' },
        { label: 'New Brands (B2B)', value: '/new-brands' },
        { label: 'Public Procurement', value: '/zamowienia-publiczne' },
        { label: 'Integrations', value: '/integrations' },
      ],
      admin: {
        condition: (data) => data.linkType === 'page',
        description: 'Link will be automatically translated to the correct URL for each language.',
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
      label: 'Show for Nav Categories',
      admin: {
        description: 'Select which mega menu categories should display this item. Leave empty for global display.',
        components: {
          Field: '@/components/NavCategorySelector#NavCategorySelector',
        },
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
