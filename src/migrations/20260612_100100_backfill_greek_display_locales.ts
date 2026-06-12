import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

const DISPLAY_TABLES = [
  'hero_slides_display_locales_b2_c',
  'hero_slides_display_locales_b2_b',
  'product_carousels_display_locales_b2_c',
  'product_carousels_display_locales_b2_b',
  'featured_categories_display_locales_b2_c',
  'featured_categories_display_locales_b2_b',
  'category_banners_display_locales_b2_c',
  'category_banners_display_locales_b2_b',
  'mega_menu_featured_display_locales_b2_c',
  'mega_menu_featured_display_locales_b2_b',
  'announcement_bars_display_locales_b2_c',
  'announcement_bars_display_locales_b2_b',
  'blog_banners_display_locales_b2_c',
  'blog_banners_display_locales_b2_b',
]

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Documents with all 6 pre-Greek locales selected mean "show everywhere",
  // so they also get 'el'. Narrowed selections stay untouched.
  for (const table of DISPLAY_TABLES) {
    await db.execute(sql.raw(`
      INSERT INTO "${table}" ("order", "parent_id", "value")
      SELECT MAX("order") + 1, "parent_id", 'el'
      FROM "${table}"
      GROUP BY "parent_id"
      HAVING COUNT(DISTINCT "value") = 6
    `))
  }
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  for (const table of DISPLAY_TABLES) {
    await db.execute(sql.raw(`DELETE FROM "${table}" WHERE "value" = 'el'`))
  }
}
