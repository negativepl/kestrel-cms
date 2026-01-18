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
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Main Logo',
            },
            {
              name: 'logoWhite',
              type: 'upload',
              relationTo: 'media',
              label: 'White Logo (for dark backgrounds)',
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
              label: 'Store Name',
              defaultValue: 'Kestrel',
            },
            {
              name: 'tagline',
              type: 'text',
              label: 'Tagline',
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
          label: 'SEO',
          fields: [
            {
              name: 'defaultMetaTitle',
              type: 'text',
              label: 'Default Meta Title',
            },
            {
              name: 'defaultMetaDescription',
              type: 'textarea',
              label: 'Default Meta Description',
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Default OG Image',
            },
          ],
        },
      ],
    },
  ],
}
