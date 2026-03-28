import type { Field } from 'payload'

const LOCALE_OPTIONS = [
  { label: 'Polski', value: 'pl' },
  { label: 'English', value: 'en' },
  { label: 'Deutsch', value: 'de' },
  { label: 'Română', value: 'ro' },
  { label: 'Čeština', value: 'cs' },
  { label: 'Magyar', value: 'hu' },
]

const ALL_LOCALES = ['pl', 'en', 'de', 'ro', 'cs', 'hu']

/**
 * Per-store locale visibility fields.
 * Replaces the old displayLocales + displayStores pattern.
 * Empty selection = not shown on that store.
 * All selected (default) = shown for all languages on that store.
 */
export const storeVisibilityFields: Field[] = [
  {
    type: 'row',
    fields: [
      {
        name: 'displayLocalesB2C',
        type: 'select',
        label: 'B2C — Languages',
        hasMany: true,
        options: LOCALE_OPTIONS,
        defaultValue: ALL_LOCALES,
        admin: {
          description: 'Languages for B2C (Retail). Empty = hidden on B2C.',
          width: '50%',
        },
      },
      {
        name: 'displayLocalesB2B',
        type: 'select',
        label: 'B2B — Languages',
        hasMany: true,
        options: LOCALE_OPTIONS,
        defaultValue: ALL_LOCALES,
        admin: {
          description: 'Languages for B2B (Wholesale). Empty = hidden on B2B.',
          width: '50%',
        },
      },
    ],
  },
]
