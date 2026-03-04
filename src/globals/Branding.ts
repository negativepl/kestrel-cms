import type { GlobalConfig } from 'payload'

export const Branding: GlobalConfig = {
  slug: 'branding',
  label: 'Branding',
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
}
