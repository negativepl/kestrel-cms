import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hero_slides_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_product_carousels_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_product_carousels_sort_by" AS ENUM('date', 'sales', 'name', 'price-asc', 'price-desc');
  CREATE TYPE "public"."enum_featured_categories_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_category_banners_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TABLE "hero_slides_display_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_hero_slides_display_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_carousels_display_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_product_carousels_display_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_carousels_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "menu_items_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_id" numeric NOT NULL,
  	"show_title" boolean DEFAULT true,
  	"visible_items_count" numeric DEFAULT 0
  );
  
  CREATE TABLE "menu_items_categories_locales" (
  	"title" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "menu_items" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"prestashop_category_id" numeric NOT NULL,
  	"is_visible" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "menu_items_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "navigation_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"menu_items_id" integer
  );
  
  CREATE TABLE "featured_categories_display_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_featured_categories_display_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "featured_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"category_id" numeric NOT NULL,
  	"category_slug" varchar NOT NULL,
  	"order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "featured_categories_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "category_banners_display_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_category_banners_display_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "category_banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_name" varchar NOT NULL,
  	"show_on_all_categories" boolean DEFAULT false,
  	"category_id" numeric,
  	"image_id" integer NOT NULL,
  	"link" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "category_banners_locales" (
  	"alt_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "hero_slides" DROP CONSTRAINT "hero_slides_mobile_image_id_media_id_fk";
  
  ALTER TABLE "product_carousels" ALTER COLUMN "carousel_type" SET DATA TYPE text;
  ALTER TABLE "product_carousels" ALTER COLUMN "carousel_type" SET DEFAULT 'product-ids'::text;
  DROP TYPE "public"."enum_product_carousels_carousel_type";
  CREATE TYPE "public"."enum_product_carousels_carousel_type" AS ENUM('product-ids', 'category', 'bestsellers', 'new-products');
  ALTER TABLE "product_carousels" ALTER COLUMN "carousel_type" SET DEFAULT 'product-ids'::"public"."enum_product_carousels_carousel_type";
  ALTER TABLE "product_carousels" ALTER COLUMN "carousel_type" SET DATA TYPE "public"."enum_product_carousels_carousel_type" USING "carousel_type"::"public"."enum_product_carousels_carousel_type";
  DROP INDEX "hero_slides_mobile_image_idx";
  ALTER TABLE "hero_slides_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "hero_slides" ADD COLUMN "internal_name" varchar NOT NULL;
  ALTER TABLE "hero_slides" ADD COLUMN "category_id" numeric;
  ALTER TABLE "product_carousels" ADD COLUMN "sort_by" "enum_product_carousels_sort_by" DEFAULT 'date';
  ALTER TABLE "product_carousels" ADD COLUMN "hide_out_of_stock" boolean DEFAULT false;
  ALTER TABLE "product_carousels" ADD COLUMN "show_badges" boolean DEFAULT true;
  ALTER TABLE "product_carousels" ADD COLUMN "show_prices" boolean DEFAULT true;
  ALTER TABLE "product_carousels" ADD COLUMN "show_add_to_cart" boolean DEFAULT true;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "menu_items_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "navigation_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "featured_categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "category_banners_id" integer;
  ALTER TABLE "hero_slides_display_locales" ADD CONSTRAINT "hero_slides_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_carousels_display_locales" ADD CONSTRAINT "product_carousels_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_carousels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_carousels_locales" ADD CONSTRAINT "product_carousels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_carousels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_categories" ADD CONSTRAINT "menu_items_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_categories_locales" ADD CONSTRAINT "menu_items_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "menu_items_locales" ADD CONSTRAINT "menu_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "featured_categories_display_locales" ADD CONSTRAINT "featured_categories_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."featured_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "featured_categories" ADD CONSTRAINT "featured_categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "featured_categories_locales" ADD CONSTRAINT "featured_categories_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."featured_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_banners_display_locales" ADD CONSTRAINT "category_banners_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."category_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_banners" ADD CONSTRAINT "category_banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "category_banners_locales" ADD CONSTRAINT "category_banners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."category_banners"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hero_slides_display_locales_order_idx" ON "hero_slides_display_locales" USING btree ("order");
  CREATE INDEX "hero_slides_display_locales_parent_idx" ON "hero_slides_display_locales" USING btree ("parent_id");
  CREATE INDEX "product_carousels_display_locales_order_idx" ON "product_carousels_display_locales" USING btree ("order");
  CREATE INDEX "product_carousels_display_locales_parent_idx" ON "product_carousels_display_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "product_carousels_locales_locale_parent_id_unique" ON "product_carousels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "menu_items_categories_order_idx" ON "menu_items_categories" USING btree ("_order");
  CREATE INDEX "menu_items_categories_parent_id_idx" ON "menu_items_categories" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "menu_items_categories_locales_locale_parent_id_unique" ON "menu_items_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "menu_items_updated_at_idx" ON "menu_items" USING btree ("updated_at");
  CREATE INDEX "menu_items_created_at_idx" ON "menu_items" USING btree ("created_at");
  CREATE UNIQUE INDEX "menu_items_locales_locale_parent_id_unique" ON "menu_items_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "navigation_slug_idx" ON "navigation" USING btree ("slug");
  CREATE INDEX "navigation_updated_at_idx" ON "navigation" USING btree ("updated_at");
  CREATE INDEX "navigation_created_at_idx" ON "navigation" USING btree ("created_at");
  CREATE INDEX "navigation_rels_order_idx" ON "navigation_rels" USING btree ("order");
  CREATE INDEX "navigation_rels_parent_idx" ON "navigation_rels" USING btree ("parent_id");
  CREATE INDEX "navigation_rels_path_idx" ON "navigation_rels" USING btree ("path");
  CREATE INDEX "navigation_rels_menu_items_id_idx" ON "navigation_rels" USING btree ("menu_items_id");
  CREATE INDEX "featured_categories_display_locales_order_idx" ON "featured_categories_display_locales" USING btree ("order");
  CREATE INDEX "featured_categories_display_locales_parent_idx" ON "featured_categories_display_locales" USING btree ("parent_id");
  CREATE INDEX "featured_categories_image_idx" ON "featured_categories" USING btree ("image_id");
  CREATE INDEX "featured_categories_updated_at_idx" ON "featured_categories" USING btree ("updated_at");
  CREATE INDEX "featured_categories_created_at_idx" ON "featured_categories" USING btree ("created_at");
  CREATE UNIQUE INDEX "featured_categories_locales_locale_parent_id_unique" ON "featured_categories_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "category_banners_display_locales_order_idx" ON "category_banners_display_locales" USING btree ("order");
  CREATE INDEX "category_banners_display_locales_parent_idx" ON "category_banners_display_locales" USING btree ("parent_id");
  CREATE INDEX "category_banners_image_idx" ON "category_banners" USING btree ("image_id");
  CREATE INDEX "category_banners_updated_at_idx" ON "category_banners" USING btree ("updated_at");
  CREATE INDEX "category_banners_created_at_idx" ON "category_banners" USING btree ("created_at");
  CREATE UNIQUE INDEX "category_banners_locales_locale_parent_id_unique" ON "category_banners_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navigation_fk" FOREIGN KEY ("navigation_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_featured_categories_fk" FOREIGN KEY ("featured_categories_id") REFERENCES "public"."featured_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_category_banners_fk" FOREIGN KEY ("category_banners_id") REFERENCES "public"."category_banners"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_menu_items_id_idx" ON "payload_locked_documents_rels" USING btree ("menu_items_id");
  CREATE INDEX "payload_locked_documents_rels_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("navigation_id");
  CREATE INDEX "payload_locked_documents_rels_featured_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("featured_categories_id");
  CREATE INDEX "payload_locked_documents_rels_category_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("category_banners_id");
  ALTER TABLE "hero_slides" DROP COLUMN "mobile_image_id";
  ALTER TABLE "product_carousels" DROP COLUMN "title";
  ALTER TABLE "product_carousels" DROP COLUMN "subtitle";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_product_carousels_carousel_type" ADD VALUE 'sale';
  ALTER TABLE "hero_slides_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_carousels_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_carousels_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_items_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_items_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "menu_items_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_categories_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_categories_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_banners_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_banners_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hero_slides_display_locales" CASCADE;
  DROP TABLE "product_carousels_display_locales" CASCADE;
  DROP TABLE "product_carousels_locales" CASCADE;
  DROP TABLE "menu_items_categories" CASCADE;
  DROP TABLE "menu_items_categories_locales" CASCADE;
  DROP TABLE "menu_items" CASCADE;
  DROP TABLE "menu_items_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_rels" CASCADE;
  DROP TABLE "featured_categories_display_locales" CASCADE;
  DROP TABLE "featured_categories" CASCADE;
  DROP TABLE "featured_categories_locales" CASCADE;
  DROP TABLE "category_banners_display_locales" CASCADE;
  DROP TABLE "category_banners" CASCADE;
  DROP TABLE "category_banners_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_menu_items_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_navigation_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_featured_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_category_banners_fk";
  
  DROP INDEX "payload_locked_documents_rels_menu_items_id_idx";
  DROP INDEX "payload_locked_documents_rels_navigation_id_idx";
  DROP INDEX "payload_locked_documents_rels_featured_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_category_banners_id_idx";
  ALTER TABLE "hero_slides_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "hero_slides" ADD COLUMN "mobile_image_id" integer;
  ALTER TABLE "product_carousels" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "product_carousels" ADD COLUMN "subtitle" varchar;
  ALTER TABLE "hero_slides" ADD CONSTRAINT "hero_slides_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "hero_slides_mobile_image_idx" ON "hero_slides" USING btree ("mobile_image_id");
  ALTER TABLE "hero_slides" DROP COLUMN "internal_name";
  ALTER TABLE "hero_slides" DROP COLUMN "category_id";
  ALTER TABLE "product_carousels" DROP COLUMN "sort_by";
  ALTER TABLE "product_carousels" DROP COLUMN "hide_out_of_stock";
  ALTER TABLE "product_carousels" DROP COLUMN "show_badges";
  ALTER TABLE "product_carousels" DROP COLUMN "show_prices";
  ALTER TABLE "product_carousels" DROP COLUMN "show_add_to_cart";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "menu_items_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "navigation_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "featured_categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "category_banners_id";
  DROP TYPE "public"."enum_hero_slides_display_locales";
  DROP TYPE "public"."enum_product_carousels_display_locales";
  DROP TYPE "public"."enum_product_carousels_sort_by";
  DROP TYPE "public"."enum_featured_categories_display_locales";
  DROP TYPE "public"."enum_category_banners_display_locales";`)
}
