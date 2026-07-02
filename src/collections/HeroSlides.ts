import { revalidateAfterChange, revalidateAfterDelete } from '@/hooks/revalidateFrontend'
import { storeVisibilityFields } from './fields/storeVisibility'
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
      name: 'slideLink',
      type: 'text',
      label: 'Slide Link (external URL)',
      admin: {
        description: 'Optional: clicking the entire slide opens this URL. Overrides "Link to Category". Use for external pages (e.g. https://inpost.pl).',
      },
    },
    {
      name: 'slideNoFollow',
      type: 'checkbox',
      label: 'Add nofollow to slide link',
      defaultValue: true,
      admin: {
        description: 'Adds rel="nofollow noopener noreferrer" — recommended for external/paid links.',
        condition: (data) => Boolean(data?.slideLink),
      },
    },
    {
      name: 'brandId',
      type: 'number',
      label: 'Link to Brand (Manufacturer)',
      admin: {
        description: 'Optional: Click on slide will go to this brand page (used only if Slide Link is empty; takes precedence over Link to Category)',
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
        readOnly: true,
      },
    },
    {
      name: 'categoryId',
      type: 'number',
      label: 'Link to Category',
      admin: {
        description: 'Optional: Click on slide will go to this category (used only if Slide Link and Brand are empty)',
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
    ...storeVisibilityFields,
  ],
}
