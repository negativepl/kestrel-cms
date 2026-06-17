import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateFrontend'
import { storeVisibilityFields } from './fields/storeVisibility'
import type { CollectionConfig } from 'payload'

export const AnnouncementBars: CollectionConfig = {
  slug: 'announcement-bars',
  labels: {
    singular: 'Announcement Bar',
    plural: 'Announcement Bars',
  },
  admin: {
    useAsTitle: 'internalName',
    defaultColumns: ['internalName', 'isActive', 'order', 'updatedAt'],
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
      name: 'internalName',
      type: 'text',
      label: 'Internal Name',
      required: true,
      admin: {
        description: 'For admin panel only - not displayed on website',
      },
    },
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
      localized: true,
      admin: {
        description: 'Announcement text displayed in the bar',
      },
    },
    {
      name: 'linkType',
      type: 'select',
      label: 'Link Type',
      defaultValue: 'none',
      options: [
        { label: 'No link', value: 'none' },
        { label: 'Page (localized)', value: 'page' },
        { label: 'Custom URL', value: 'custom' },
      ],
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
        condition: (data, siblingData) => siblingData?.linkType === 'page',
        description: 'Link will be automatically translated to the correct URL for each language.',
      },
    },
    {
      name: 'linkCustom',
      type: 'text',
      label: 'Custom URL',
      admin: {
        condition: (data, siblingData) => siblingData?.linkType === 'custom',
        description: 'Full URL (e.g. https://example.com) or path (e.g. /my-page)',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Background Color',
      defaultValue: 'primary',
      options: [
        { label: 'Primary (theme)', value: 'primary' },
        { label: 'Secondary (theme)', value: 'secondary' },
        { label: 'Accent (theme)', value: 'accent' },
        { label: 'Muted (theme)', value: 'muted' },
        { label: 'Card (theme)', value: 'card' },
        { label: 'Destructive (theme)', value: 'destructive' },
        { label: 'Black', value: '#000000' },
        { label: 'White', value: '#ffffff' },
      ],
      admin: {
        description: 'Theme colors adapt to light/dark mode automatically.',
      },
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      defaultValue: 'primary-foreground',
      options: [
        { label: 'Primary Foreground (theme)', value: 'primary-foreground' },
        { label: 'Secondary Foreground (theme)', value: 'secondary-foreground' },
        { label: 'Foreground (theme)', value: 'foreground' },
        { label: 'Muted Foreground (theme)', value: 'muted-foreground' },
        { label: 'White', value: '#ffffff' },
        { label: 'Black', value: '#000000' },
      ],
      admin: {
        description: 'Theme colors adapt to light/dark mode automatically.',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Order',
      defaultValue: 0,
      admin: {
        description: 'Lower number = higher priority. First active match for current store is displayed.',
      },
    },
    {
      name: 'marquee',
      type: 'checkbox',
      label: 'Marquee (scrolling ticker)',
      defaultValue: false,
      admin: {
        description: 'When enabled, the text scrolls horizontally across the bar instead of being truncated.',
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
