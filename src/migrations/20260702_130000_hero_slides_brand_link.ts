import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "hero_slides"
      ADD COLUMN IF NOT EXISTS "brand_id" numeric,
      ADD COLUMN IF NOT EXISTS "brand_name" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "hero_slides"
      DROP COLUMN IF EXISTS "brand_id",
      DROP COLUMN IF EXISTS "brand_name";
  `)
}
