import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_banners"
      ADD COLUMN "visible_from" timestamp(3) with time zone,
      ADD COLUMN "visible_to"   timestamp(3) with time zone;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "blog_banners"
      DROP COLUMN "visible_from",
      DROP COLUMN "visible_to";
  `)
}
