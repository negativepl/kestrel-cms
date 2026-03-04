import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    components: {
      elements: {
        SaveButton: '@/components/SaveWithTranslate#SaveWithTranslate',
      },
    },
  },
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
                { label: 'Text (Store Name only)', value: 'text' },
                { label: 'Image (Logo only)', value: 'image' },
                { label: 'Icon + Text (Icon with Store Name)', value: 'icon-text' },
              ],
              defaultValue: 'text',
              admin: {
                description: 'Choose how to display the logo in header',
              },
            },
            // B2C Logo
            {
              name: 'logo',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo B2C (Light Mode)',
              admin: {
                condition: (data) => data?.logoType === 'image' || data?.logoType === 'icon-text',
                description: 'Logo/icon for B2C store on light backgrounds',
              },
            },
            {
              name: 'logoDark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo B2C (Dark Mode)',
              admin: {
                condition: (data) => data?.logoType === 'image' || data?.logoType === 'icon-text',
                description: 'Optional: Logo/icon for B2C on dark backgrounds (falls back to main)',
              },
            },
            // B2B Logo
            {
              name: 'logoB2B',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo B2B (Light Mode)',
              admin: {
                condition: (data) => data?.logoType === 'image' || data?.logoType === 'icon-text',
                description: 'Optional: Different logo/icon for B2B store (falls back to B2C logo)',
              },
            },
            {
              name: 'logoB2BDark',
              type: 'upload',
              relationTo: 'media',
              label: 'Logo B2B (Dark Mode)',
              admin: {
                condition: (data) => data?.logoType === 'image' || data?.logoType === 'icon-text',
                description: 'Optional: Logo/icon for B2B on dark backgrounds',
              },
            },
            // Favicons
            {
              name: 'favicon',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon B2C',
              admin: {
                description: 'Browser tab icon for B2C (recommended: 32x32 PNG or ICO)',
              },
            },
            {
              name: 'faviconB2B',
              type: 'upload',
              relationTo: 'media',
              label: 'Favicon B2B',
              admin: {
                description: 'Optional: Different favicon for B2B store',
              },
            },
            // Store Names
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
              name: 'announcements',
              type: 'array',
              label: 'Announcement Bars',
              admin: {
                description: 'Add multiple announcement bars for different stores/languages. First active match is displayed.',
              },
              fields: [
                {
                  name: 'enabled',
                  type: 'checkbox',
                  label: 'Enabled',
                  defaultValue: true,
                },
                {
                  name: 'text',
                  type: 'text',
                  label: 'Text',
                  required: true,
                  localized: true,
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
                    { label: 'B2B What\'s New', value: '/b2b/nowosci' },
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
                  name: 'displayStores',
                  type: 'select',
                  label: 'Display for Stores',
                  hasMany: true,
                  options: [
                    { label: 'B2C (Retail)', value: 'b2c' },
                    { label: 'B2B (Wholesale)', value: 'b2b' },
                  ],
                  defaultValue: ['b2c', 'b2b'],
                  admin: {
                    description: 'Select which stores should display this announcement.',
                  },
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
