import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const LOCALE_ENUMS = [
  '_locales',
  'enum_hero_slides_display_locales_b2_c',
  'enum_hero_slides_display_locales_b2_b',
  'enum_product_carousels_display_locales_b2_c',
  'enum_product_carousels_display_locales_b2_b',
  'enum_featured_categories_display_locales_b2_c',
  'enum_featured_categories_display_locales_b2_b',
  'enum_category_banners_display_locales_b2_c',
  'enum_category_banners_display_locales_b2_b',
  'enum_mega_menu_featured_display_locales_b2_c',
  'enum_mega_menu_featured_display_locales_b2_b',
  'enum_announcement_bars_display_locales_b2_c',
  'enum_announcement_bars_display_locales_b2_b',
  'enum_blog_banners_display_locales_b2_c',
  'enum_blog_banners_display_locales_b2_b',
]

const LOCALIZED_TABLES = [
  'hero_slides_locales',
  'product_carousels_locales',
  'menu_items_locales',
  'menu_items_categories_locales',
  'featured_categories_locales',
  'category_banners_locales',
  'mega_menu_featured_locales',
  'announcement_bars_locales',
  'blog_banners_locales',
  'branding_locales',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  for (const enumName of LOCALE_ENUMS) {
    await db.execute(sql.raw(`ALTER TYPE "public"."${enumName}" ADD VALUE IF NOT EXISTS 'el'`))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Postgres cannot remove a value from an enum; we only delete Greek data
  // and leave the unused 'el' value in place.
  for (const table of LOCALIZED_TABLES) {
    await db.execute(sql.raw(`DELETE FROM "${table}" WHERE "_locale" = 'el'`))
  }
  for (const enumName of LOCALE_ENUMS) {
    if (enumName === '_locales') continue
    const table = enumName.replace(/^enum_/, '')
    await db.execute(sql.raw(`DELETE FROM "${table}" WHERE "value" = 'el'`))
  }
}
