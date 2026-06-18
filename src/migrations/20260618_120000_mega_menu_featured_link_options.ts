import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add new link types to the existing enum (Postgres can only ADD enum values).
  await db.execute(sql.raw(`ALTER TYPE "public"."enum_mega_menu_featured_link_type" ADD VALUE IF NOT EXISTS 'brand'`))
  await db.execute(sql.raw(`ALTER TYPE "public"."enum_mega_menu_featured_link_type" ADD VALUE IF NOT EXISTS 'page'`))

  // Enum for the predefined "Page" link option (mirrors the collection's linkPage options).
  await db.execute(sql.raw(`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_mega_menu_featured_link_page" AS ENUM(
        '/', '/new-products', '/bestsellers', '/sale', '/fastshipping', '/blog',
        '/brands', '/contact', '/faq', '/about', '/shipping', '/returns',
        '/payments', '/terms', '/privacy', '/b2b/nowosci', '/delivery-news',
        '/new-brands', '/zamowienia-publiczne', '/integrations'
      );
    EXCEPTION
      WHEN duplicate_object THEN null;
    END $$;
  `))

  // New columns for brand + page links.
  await db.execute(sql`
    ALTER TABLE "mega_menu_featured"
      ADD COLUMN IF NOT EXISTS "brand_id" numeric,
      ADD COLUMN IF NOT EXISTS "brand_name" varchar,
      ADD COLUMN IF NOT EXISTS "link_page" "enum_mega_menu_featured_link_page";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "mega_menu_featured"
      DROP COLUMN IF EXISTS "brand_id",
      DROP COLUMN IF EXISTS "brand_name",
      DROP COLUMN IF EXISTS "link_page";
  `)
  await db.execute(sql.raw(`DROP TYPE IF EXISTS "public"."enum_mega_menu_featured_link_page"`))
  // Note: Postgres cannot remove values from an enum, so the 'brand' and 'page'
  // values added to enum_mega_menu_featured_link_type are left in place.
}
