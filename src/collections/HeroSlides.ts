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
    components: {
      edit: {
        SaveButton: '@/components/SaveWithTranslate#SaveWithTranslate',
      },
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Slide Title',
      required: false,
      localized: true,
      admin: {
        description: 'Leave empty for image-only slide (no overlay)',
      },
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
      label: 'Background Image (Desktop)',
      required: true,
      admin: {
        description: 'Recommended: 1920×800px (2.4:1 ratio). Image will be cropped to fit.',
      },
    },
    {
      name: 'mobileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Mobile Image (optional)',
      admin: {
        description: 'Recommended: 768×600px (~1.3:1 ratio). Shown on screens < 768px width.',
      },
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
    {
      name: 'displayLocales',
      type: 'select',
      label: 'Display for languages',
      hasMany: true,
      options: [
        { label: 'Polski', value: 'pl' },
        { label: 'English', value: 'en' },
        { label: 'Deutsch', value: 'de' },
        { label: 'Română', value: 'ro' },
        { label: 'Čeština', value: 'cs' },
        { label: 'Magyar', value: 'hu' },
      ],
      defaultValue: ['pl', 'en', 'de', 'ro', 'cs', 'hu'],
      admin: {
        description: 'Select languages where this slide should be displayed. Leave all selected to show everywhere.',
      },
    },
  ],
}
