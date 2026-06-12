/**
 * Startup migration runner.
 * Runs pending SQL migrations before the Next.js server starts.
 * Uses pg directly so it works in the standalone Docker build without Payload CLI.
 */
const { Pool } = require('pg')

const pool = new Pool({ connectionString: process.env.DATABASE_URI })

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

const DISPLAY_TABLES = LOCALE_ENUMS
  .filter((name) => name !== '_locales')
  .map((name) => name.replace(/^enum_/, ''))

const MIGRATIONS = [
  {
    name: '20260416_120000_blog_banners_visibility_dates',
    up: `
      ALTER TABLE "blog_banners"
        ADD COLUMN IF NOT EXISTS "visible_from" timestamp(3) with time zone,
        ADD COLUMN IF NOT EXISTS "visible_to"   timestamp(3) with time zone;
    `,
  },
  {
    name: '20260612_100000_add_greek_locale',
    // ALTER TYPE ... ADD VALUE must run as standalone statements (outside a
    // multi-statement implicit transaction), hence the array form.
    up: LOCALE_ENUMS.map(
      (name) => `ALTER TYPE "public"."${name}" ADD VALUE IF NOT EXISTS 'el';`
    ),
  },
  {
    name: '20260612_100100_backfill_greek_display_locales',
    // Documents with all 6 pre-Greek locales selected mean "show everywhere",
    // so they also get 'el'. Narrowed selections stay untouched.
    up: DISPLAY_TABLES.map(
      (table) => `
        INSERT INTO "${table}" ("order", "parent_id", "value")
        SELECT MAX("order") + 1, "parent_id", 'el'
        FROM "${table}"
        GROUP BY "parent_id"
        HAVING COUNT(DISTINCT "value") = 6;
      `
    ),
  },
]

async function run() {
  const client = await pool.connect()
  try {
    for (const migration of MIGRATIONS) {
      const { rows } = await client.query(
        `SELECT name FROM payload_migrations WHERE name = $1`,
        [migration.name]
      )
      if (rows.length > 0) {
        console.log(`[migrate] skip (already applied): ${migration.name}`)
        continue
      }

      const statements = Array.isArray(migration.up) ? migration.up : [migration.up]
      for (const statement of statements) {
        await client.query(statement)
      }

      await client.query(
        `INSERT INTO payload_migrations (name, batch)
         VALUES ($1, (SELECT COALESCE(MAX(CASE WHEN batch > 0 THEN batch END), 0) + 1 FROM payload_migrations))`,
        [migration.name]
      )
      console.log(`[migrate] applied: ${migration.name}`)
    }
  } finally {
    client.release()
    await pool.end()
  }
}

run().catch((err) => {
  console.error('[migrate] fatal:', err.message)
  process.exit(1)
})
