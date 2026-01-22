import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Collections
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { HeroSlides } from './src/collections/HeroSlides'
import { ProductCarousels } from './src/collections/ProductCarousels'
import { Navigation } from './src/collections/Navigation'
import { MenuItems } from './src/collections/MenuItems'
import { FeaturedCategories } from './src/collections/FeaturedCategories'

// Globals
import { SiteSettings } from './src/globals/SiteSettings'

// Endpoints
import { translateHandler } from './src/endpoints/translate'
import { getPrestashopCategories } from './src/endpoints/prestashopCategories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    fallbackLanguage: 'en',
    supportedLanguages: { en },
  },
  localization: {
    locales: [
      { label: 'Polski', code: 'pl' },
      { label: 'English', code: 'en' },
      { label: 'Deutsch', code: 'de' },
      { label: 'Română', code: 'ro' },
      { label: 'Čeština', code: 'cs' },
      { label: 'Magyar', code: 'hu' },
    ],
    defaultLocale: 'pl',
    fallback: true,
  },
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' | Kestrel CMS',
    },
  },
  collections: [
    Users,
    Media,
    HeroSlides,
    ProductCarousels,
    MenuItems,
    Navigation,
    FeaturedCategories,
  ],
  globals: [
    SiteSettings,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
    push: true, // Auto-push schema changes without prompts
  }),
  sharp,
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://presta.trkhspl.com',
    'https://cms.presta.trkhspl.com',
  ],
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://presta.trkhspl.com',
    'https://cms.presta.trkhspl.com',
  ],
  endpoints: [
    {
      path: '/translate',
      method: 'post',
      handler: translateHandler,
    },
    {
      path: '/prestashop-categories',
      method: 'get',
      handler: getPrestashopCategories,
    },
  ],
})
