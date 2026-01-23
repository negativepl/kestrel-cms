import type { CollectionConfig } from 'payload'

export const HeroSlides: CollectionConfig = {
  slug: 'hero-slides',
  labels: {
    singular: 'Hero Slide',
    plural: 'Hero Slides',
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
      label: 'Background Image',
      required: true,
      admin: {
        description: 'Recommended: 16:9 aspect ratio (e.g., 1920×1080px or 1280×720px). Images are displayed in a 3-column grid on desktop and carousel on mobile.',
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
      name: 'categoryId',
      type: 'number',
      label: 'Link to Category',
      admin: {
        description: 'Optional: Click on slide will go to this category',
        components: {
          Field: '@/components/PrestaShopCategoryField#PrestaShopCategoryField',
        },
      },
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
