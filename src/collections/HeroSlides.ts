import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  labels: {
    singular: 'Hero Slide',
    plural: 'Hero Slides',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'isActive', 'order', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'translateButton',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/TranslateButton#TranslateButton',
        },
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Slide Title',
      required: true,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Subtitle',
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
    },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Image (optional)',
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      localized: true,
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
    },
    {
      name: 'textColor',
      type: 'select',
      label: 'Text Color',
      options: [
        { label: 'White', value: 'white' },
        { label: 'Black', value: 'black' },
      ],
      defaultValue: 'white',
    },
    {
      name: 'textPosition',
      type: 'select',
      label: 'Text Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'left',
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
