import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Branding',
          fields: [
            {
              name: 'logoType',
              type: 'select',
              label: 'Logo Type',
              options: [
                { label: 'Text (Store Name)', value: 'text' },
                { label: 'Image', value: 'image' },
              ],
              defaultValue: 'text',
              admin: {
                description: 'Choose whether to display logo as text or image',
              },
            },
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Main Logo',
              admin: {
                condition: (data) => data?.logoType === 'image',
                description: 'Logo for light backgrounds (recommended: PNG with transparency)',
              },
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo for Dark Mode',
              admin: {
                condition: (data) => data?.logoType === 'image',
                description: 'Logo for dark backgrounds (optional, falls back to main logo)',
              },
            },
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon',
            },
            {
              name: 'siteName',
              type: 'text',
              label: 'Store Name (B2C)',
              defaultValue: 'Home Screen',
              required: true,
              admin: {
                description: 'Store name displayed in header, footer, and browser tab',
              },
            },
            {
              name: 'siteNameB2B',
              type: 'text',
              label: 'Store Name (B2B)',
              admin: {
                description: 'Optional: Different name for B2B store. Leave empty to use main name.',
              },
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
              localized: true,
              admin: {
                description: 'Short description shown below logo or in SEO',
              },
            },
          ],
        },
        {
          label: 'Header',
          fields: [
            {
              name: 'announcementBar',
              type: 'group',
              label: 'Announcement Bar',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enabled',
                  defaultValue: false,
                },
                {
                  name: 'text',
                  type: 'text',
                  label: 'Text',
                },
                {
                  name: 'link',
                  type: 'text',
                  label: 'Link (optional)',
                },
                {
                  name: 'backgroundColor',
                  type: 'text',
                  label: 'Background Color',
                  defaultValue: '#000000',
                },
                {
                  name: 'textColor',
                  type: 'text',
                  label: 'Text Color',
                  defaultValue: '#ffffff',
                },
              ],
            },
            {
              name: 'freeShippingThreshold',
              type: 'number',
              label: 'Free Shipping Threshold (PLN)',
              defaultValue: 200,
            },
            {
              name: 'freeShippingText',
              type: 'text',
              label: 'Free Shipping Text',
              defaultValue: 'Free shipping from {amount} PLN',
            },
          ],
        },
        {
          label: 'Footer',
          fields: [
            {
              name: 'footerText',
              type: 'textarea',
              label: 'Footer Text',
            },
            {
              name: 'socialLinks',
              type: 'array',
              label: 'Social Media Links',
              fields: [
                {
                  name: 'platform',
                  type: 'select',
                  options: [
                    { label: 'Facebook', value: 'facebook' },
                    { label: 'Instagram', value: 'instagram' },
                    { label: 'TikTok', value: 'tiktok' },
                    { label: 'YouTube', value: 'youtube' },
                    { label: 'Twitter/X', value: 'twitter' },
                    { label: 'Pinterest', value: 'pinterest' },
                  ],
                  required: true,
                },
                {
                  name: 'url',
                  type: 'text',
                  label: 'URL',
                  required: true,
                },
              ],
            },
            {
              name: 'paymentIcons',
              type: 'array',
              label: 'Payment Icons',
              fields: [
                {
                  name: 'icon',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Icon',
                  required: true,
                },
                {
                  name: 'name',
                  type: 'text',
                  label: 'Name (alt)',
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: 'Homepage',
          fields: [
            {
              name: 'latestCategories',
              type: 'group',
              label: 'Latest Categories Section',
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Show Latest Categories',
                  defaultValue: true,
                },
                {
                  name: 'displayStores',
                  type: 'select',
                  label: 'Display for Stores',
                  hasMany: true,
                  options: [
                    { label: 'B2C (Retail)', value: 'b2c' },
                    { label: 'B2B (Wholesale)', value: 'b2b' },
                  ],
                  defaultValue: ['b2b'],
                  admin: {
                    description: 'Select stores where this section should be displayed. Empty = show everywhere.',
                  },
                },
                {
                  name: 'limit',
                  type: 'number',
                  label: 'Number of categories to show',
                  defaultValue: 20,
                  min: 1,
                  max: 50,
                },
                {
                  name: 'title',
                  type: 'text',
                  label: 'Section Title (optional override)',
                  admin: {
                    description: 'Leave empty to use default translation',
                  },
                },
                {
                  name: 'subtitle',
                  type: 'text',
                  label: 'Section Subtitle (optional override)',
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              label: 'Default Meta Title',
              localized: true,
              admin: {
                description: 'Browser tab title for homepage. Use {siteName} as placeholder.',
              },
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              label: 'Default Meta Description',
              localized: true,
              admin: {
                description: 'SEO description for homepage',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default OG Image',
              admin: {
                description: 'Image shown when sharing on social media (recommended: 1200x630px)',
              },
            },
          ],
        },
      ],
    },
  ],
}
