import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hero_slides_display_locales_b2_c" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_hero_slides_display_locales_b2_b" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_product_carousels_display_locales_b2_c" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_product_carousels_display_locales_b2_b" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_featured_categories_display_locales_b2_c" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_featured_categories_display_locales_b2_b" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_category_banners_display_locales_b2_c" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_category_banners_display_locales_b2_b" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_category_banners_target_type" AS ENUM('category', 'page');
  CREATE TYPE "public"."enum_category_banners_page_slug" AS ENUM('bestsellers', 'new-products', 'sale', 'fastshipping');
  CREATE TYPE "public"."enum_category_banners_position" AS ENUM('sidebar', 'above-products', 'between-products');
  CREATE TYPE "public"."enum_mega_menu_featured_display_locales_b2_c" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_mega_menu_featured_display_locales_b2_b" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_mega_menu_featured_link_type" AS ENUM('category', 'custom');
  CREATE TYPE "public"."enum_announcement_bars_display_locales_b2_c" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_announcement_bars_display_locales_b2_b" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_announcement_bars_link_type" AS ENUM('none', 'page', 'custom');
  CREATE TYPE "public"."enum_announcement_bars_link_page" AS ENUM('/', '/new-products', '/bestsellers', '/sale', '/fastshipping', '/blog', '/brands', '/contact', '/faq', '/about', '/shipping', '/returns', '/payments', '/terms', '/privacy', '/b2b/nowosci', '/zamowienia-publiczne', '/integrations');
  CREATE TYPE "public"."enum_announcement_bars_background_color" AS ENUM('primary', 'secondary', 'accent', 'muted', 'card', 'destructive', '#000000', '#ffffff');
  CREATE TYPE "public"."enum_announcement_bars_text_color" AS ENUM('primary-foreground', 'secondary-foreground', 'foreground', 'muted-foreground', '#ffffff', '#000000');
  CREATE TYPE "public"."enum_blog_banners_display_locales_b2_c" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_blog_banners_display_locales_b2_b" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_branding_logo_type" AS ENUM('text', 'image', 'icon-text');
  CREATE TABLE "hero_slides_display_locales_b2_c" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_hero_slides_display_locales_b2_c",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "hero_slides_display_locales_b2_b" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_hero_slides_display_locales_b2_b",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_carousels_display_locales_b2_c" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_product_carousels_display_locales_b2_c",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "product_carousels_display_locales_b2_b" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_product_carousels_display_locales_b2_b",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "featured_categories_display_locales_b2_c" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_featured_categories_display_locales_b2_c",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "featured_categories_display_locales_b2_b" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_featured_categories_display_locales_b2_b",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "category_banners_display_locales_b2_c" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_category_banners_display_locales_b2_c",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "category_banners_display_locales_b2_b" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_category_banners_display_locales_b2_b",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mega_menu_featured_display_locales_b2_c" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_mega_menu_featured_display_locales_b2_c",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mega_menu_featured_display_locales_b2_b" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_mega_menu_featured_display_locales_b2_b",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "mega_menu_featured" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link_type" "enum_mega_menu_featured_link_type" DEFAULT 'category',
  	"category_id" numeric,
  	"category_slug" varchar,
  	"custom_url" varchar,
  	"show_for_category_ids" jsonb,
  	"order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "mega_menu_featured_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "announcement_bars_display_locales_b2_c" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_announcement_bars_display_locales_b2_c",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "announcement_bars_display_locales_b2_b" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_announcement_bars_display_locales_b2_b",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "announcement_bars" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_name" varchar NOT NULL,
  	"link_type" "enum_announcement_bars_link_type" DEFAULT 'none',
  	"link_page" "enum_announcement_bars_link_page",
  	"link_custom" varchar,
  	"background_color" "enum_announcement_bars_background_color" DEFAULT 'primary',
  	"text_color" "enum_announcement_bars_text_color" DEFAULT 'primary-foreground',
  	"order" numeric DEFAULT 0,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "announcement_bars_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "blog_banners_display_locales_b2_c" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_blog_banners_display_locales_b2_c",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_banners_display_locales_b2_b" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_blog_banners_display_locales_b2_b",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "blog_banners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"internal_name" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"insert_after_paragraph" numeric DEFAULT 3 NOT NULL,
  	"wordpress_post_id" numeric,
  	"link" varchar,
  	"open_in_new_tab" boolean DEFAULT false,
  	"is_active" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "blog_banners_locales" (
  	"alt_text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "payload_mcp_api_keys" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"user_id" integer NOT NULL,
  	"label" varchar,
  	"description" varchar,
  	"hero_slides_find" boolean DEFAULT false,
  	"hero_slides_create" boolean DEFAULT false,
  	"hero_slides_update" boolean DEFAULT false,
  	"hero_slides_delete" boolean DEFAULT false,
  	"product_carousels_find" boolean DEFAULT false,
  	"product_carousels_create" boolean DEFAULT false,
  	"product_carousels_update" boolean DEFAULT false,
  	"product_carousels_delete" boolean DEFAULT false,
  	"menu_items_find" boolean DEFAULT false,
  	"menu_items_create" boolean DEFAULT false,
  	"menu_items_update" boolean DEFAULT false,
  	"menu_items_delete" boolean DEFAULT false,
  	"featured_categories_find" boolean DEFAULT false,
  	"featured_categories_create" boolean DEFAULT false,
  	"featured_categories_update" boolean DEFAULT false,
  	"featured_categories_delete" boolean DEFAULT false,
  	"category_banners_find" boolean DEFAULT false,
  	"category_banners_create" boolean DEFAULT false,
  	"category_banners_update" boolean DEFAULT false,
  	"category_banners_delete" boolean DEFAULT false,
  	"mega_menu_featured_find" boolean DEFAULT false,
  	"mega_menu_featured_create" boolean DEFAULT false,
  	"mega_menu_featured_update" boolean DEFAULT false,
  	"mega_menu_featured_delete" boolean DEFAULT false,
  	"announcement_bars_find" boolean DEFAULT false,
  	"announcement_bars_create" boolean DEFAULT false,
  	"announcement_bars_update" boolean DEFAULT false,
  	"announcement_bars_delete" boolean DEFAULT false,
  	"blog_banners_find" boolean DEFAULT false,
  	"blog_banners_create" boolean DEFAULT false,
  	"blog_banners_update" boolean DEFAULT false,
  	"blog_banners_delete" boolean DEFAULT false,
  	"media_find" boolean DEFAULT false,
  	"media_create" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  CREATE TABLE "branding" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_type" "enum_branding_logo_type" DEFAULT 'text',
  	"logo_id" integer,
  	"logo_dark_id" integer,
  	"logo_b2_b_id" integer,
  	"logo_b2_b_dark_id" integer,
  	"favicon_id" integer,
  	"favicon_b2_b_id" integer,
  	"site_name" varchar DEFAULT 'Home Screen' NOT NULL,
  	"site_name_b2_b" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "branding_locales" (
  	"tagline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "hero_slides_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_carousels_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_categories_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_banners_display_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_payment_icons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hero_slides_display_locales" CASCADE;
  DROP TABLE "product_carousels_display_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "navigation_rels" CASCADE;
  DROP TABLE "featured_categories_display_locales" CASCADE;
  DROP TABLE "category_banners_display_locales" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings_payment_icons" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_navigation_fk";
  
  DROP INDEX "payload_locked_documents_rels_navigation_id_idx";
  ALTER TABLE "featured_categories" ALTER COLUMN "category_slug" DROP NOT NULL;
  ALTER TABLE "hero_slides" ADD COLUMN "slide_link" varchar;
  ALTER TABLE "hero_slides" ADD COLUMN "slide_no_follow" boolean DEFAULT true;
  ALTER TABLE "menu_items" ADD COLUMN "order" numeric DEFAULT 0;
  ALTER TABLE "category_banners" ADD COLUMN "target_type" "enum_category_banners_target_type" DEFAULT 'category' NOT NULL;
  ALTER TABLE "category_banners" ADD COLUMN "page_slug" "enum_category_banners_page_slug";
  ALTER TABLE "category_banners" ADD COLUMN "position" "enum_category_banners_position" DEFAULT 'sidebar';
  ALTER TABLE "category_banners" ADD COLUMN "inline_after_position" numeric DEFAULT 8;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "mega_menu_featured_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "announcement_bars_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "blog_banners_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "payload_mcp_api_keys_id" integer;
  ALTER TABLE "hero_slides_display_locales_b2_c" ADD CONSTRAINT "hero_slides_display_locales_b2_c_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "hero_slides_display_locales_b2_b" ADD CONSTRAINT "hero_slides_display_locales_b2_b_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_carousels_display_locales_b2_c" ADD CONSTRAINT "product_carousels_display_locales_b2_c_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_carousels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_carousels_display_locales_b2_b" ADD CONSTRAINT "product_carousels_display_locales_b2_b_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_carousels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "featured_categories_display_locales_b2_c" ADD CONSTRAINT "featured_categories_display_locales_b2_c_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."featured_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "featured_categories_display_locales_b2_b" ADD CONSTRAINT "featured_categories_display_locales_b2_b_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."featured_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_banners_display_locales_b2_c" ADD CONSTRAINT "category_banners_display_locales_b2_c_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."category_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_banners_display_locales_b2_b" ADD CONSTRAINT "category_banners_display_locales_b2_b_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."category_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mega_menu_featured_display_locales_b2_c" ADD CONSTRAINT "mega_menu_featured_display_locales_b2_c_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."mega_menu_featured"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mega_menu_featured_display_locales_b2_b" ADD CONSTRAINT "mega_menu_featured_display_locales_b2_b_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."mega_menu_featured"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "mega_menu_featured" ADD CONSTRAINT "mega_menu_featured_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "mega_menu_featured_locales" ADD CONSTRAINT "mega_menu_featured_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."mega_menu_featured"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bars_display_locales_b2_c" ADD CONSTRAINT "announcement_bars_display_locales_b2_c_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."announcement_bars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bars_display_locales_b2_b" ADD CONSTRAINT "announcement_bars_display_locales_b2_b_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."announcement_bars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcement_bars_locales" ADD CONSTRAINT "announcement_bars_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcement_bars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_banners_display_locales_b2_c" ADD CONSTRAINT "blog_banners_display_locales_b2_c_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_banners_display_locales_b2_b" ADD CONSTRAINT "blog_banners_display_locales_b2_b_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_banners" ADD CONSTRAINT "blog_banners_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_banners_locales" ADD CONSTRAINT "blog_banners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_mcp_api_keys" ADD CONSTRAINT "payload_mcp_api_keys_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_logo_dark_id_media_id_fk" FOREIGN KEY ("logo_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_logo_b2_b_id_media_id_fk" FOREIGN KEY ("logo_b2_b_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_logo_b2_b_dark_id_media_id_fk" FOREIGN KEY ("logo_b2_b_dark_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding" ADD CONSTRAINT "branding_favicon_b2_b_id_media_id_fk" FOREIGN KEY ("favicon_b2_b_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "branding_locales" ADD CONSTRAINT "branding_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."branding"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "hero_slides_display_locales_b2_c_order_idx" ON "hero_slides_display_locales_b2_c" USING btree ("order");
  CREATE INDEX "hero_slides_display_locales_b2_c_parent_idx" ON "hero_slides_display_locales_b2_c" USING btree ("parent_id");
  CREATE INDEX "hero_slides_display_locales_b2_b_order_idx" ON "hero_slides_display_locales_b2_b" USING btree ("order");
  CREATE INDEX "hero_slides_display_locales_b2_b_parent_idx" ON "hero_slides_display_locales_b2_b" USING btree ("parent_id");
  CREATE INDEX "product_carousels_display_locales_b2_c_order_idx" ON "product_carousels_display_locales_b2_c" USING btree ("order");
  CREATE INDEX "product_carousels_display_locales_b2_c_parent_idx" ON "product_carousels_display_locales_b2_c" USING btree ("parent_id");
  CREATE INDEX "product_carousels_display_locales_b2_b_order_idx" ON "product_carousels_display_locales_b2_b" USING btree ("order");
  CREATE INDEX "product_carousels_display_locales_b2_b_parent_idx" ON "product_carousels_display_locales_b2_b" USING btree ("parent_id");
  CREATE INDEX "featured_categories_display_locales_b2_c_order_idx" ON "featured_categories_display_locales_b2_c" USING btree ("order");
  CREATE INDEX "featured_categories_display_locales_b2_c_parent_idx" ON "featured_categories_display_locales_b2_c" USING btree ("parent_id");
  CREATE INDEX "featured_categories_display_locales_b2_b_order_idx" ON "featured_categories_display_locales_b2_b" USING btree ("order");
  CREATE INDEX "featured_categories_display_locales_b2_b_parent_idx" ON "featured_categories_display_locales_b2_b" USING btree ("parent_id");
  CREATE INDEX "category_banners_display_locales_b2_c_order_idx" ON "category_banners_display_locales_b2_c" USING btree ("order");
  CREATE INDEX "category_banners_display_locales_b2_c_parent_idx" ON "category_banners_display_locales_b2_c" USING btree ("parent_id");
  CREATE INDEX "category_banners_display_locales_b2_b_order_idx" ON "category_banners_display_locales_b2_b" USING btree ("order");
  CREATE INDEX "category_banners_display_locales_b2_b_parent_idx" ON "category_banners_display_locales_b2_b" USING btree ("parent_id");
  CREATE INDEX "mega_menu_featured_display_locales_b2_c_order_idx" ON "mega_menu_featured_display_locales_b2_c" USING btree ("order");
  CREATE INDEX "mega_menu_featured_display_locales_b2_c_parent_idx" ON "mega_menu_featured_display_locales_b2_c" USING btree ("parent_id");
  CREATE INDEX "mega_menu_featured_display_locales_b2_b_order_idx" ON "mega_menu_featured_display_locales_b2_b" USING btree ("order");
  CREATE INDEX "mega_menu_featured_display_locales_b2_b_parent_idx" ON "mega_menu_featured_display_locales_b2_b" USING btree ("parent_id");
  CREATE INDEX "mega_menu_featured_image_idx" ON "mega_menu_featured" USING btree ("image_id");
  CREATE INDEX "mega_menu_featured_updated_at_idx" ON "mega_menu_featured" USING btree ("updated_at");
  CREATE INDEX "mega_menu_featured_created_at_idx" ON "mega_menu_featured" USING btree ("created_at");
  CREATE UNIQUE INDEX "mega_menu_featured_locales_locale_parent_id_unique" ON "mega_menu_featured_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "announcement_bars_display_locales_b2_c_order_idx" ON "announcement_bars_display_locales_b2_c" USING btree ("order");
  CREATE INDEX "announcement_bars_display_locales_b2_c_parent_idx" ON "announcement_bars_display_locales_b2_c" USING btree ("parent_id");
  CREATE INDEX "announcement_bars_display_locales_b2_b_order_idx" ON "announcement_bars_display_locales_b2_b" USING btree ("order");
  CREATE INDEX "announcement_bars_display_locales_b2_b_parent_idx" ON "announcement_bars_display_locales_b2_b" USING btree ("parent_id");
  CREATE INDEX "announcement_bars_updated_at_idx" ON "announcement_bars" USING btree ("updated_at");
  CREATE INDEX "announcement_bars_created_at_idx" ON "announcement_bars" USING btree ("created_at");
  CREATE UNIQUE INDEX "announcement_bars_locales_locale_parent_id_unique" ON "announcement_bars_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "blog_banners_display_locales_b2_c_order_idx" ON "blog_banners_display_locales_b2_c" USING btree ("order");
  CREATE INDEX "blog_banners_display_locales_b2_c_parent_idx" ON "blog_banners_display_locales_b2_c" USING btree ("parent_id");
  CREATE INDEX "blog_banners_display_locales_b2_b_order_idx" ON "blog_banners_display_locales_b2_b" USING btree ("order");
  CREATE INDEX "blog_banners_display_locales_b2_b_parent_idx" ON "blog_banners_display_locales_b2_b" USING btree ("parent_id");
  CREATE INDEX "blog_banners_image_idx" ON "blog_banners" USING btree ("image_id");
  CREATE INDEX "blog_banners_updated_at_idx" ON "blog_banners" USING btree ("updated_at");
  CREATE INDEX "blog_banners_created_at_idx" ON "blog_banners" USING btree ("created_at");
  CREATE UNIQUE INDEX "blog_banners_locales_locale_parent_id_unique" ON "blog_banners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "payload_mcp_api_keys_user_idx" ON "payload_mcp_api_keys" USING btree ("user_id");
  CREATE INDEX "payload_mcp_api_keys_updated_at_idx" ON "payload_mcp_api_keys" USING btree ("updated_at");
  CREATE INDEX "payload_mcp_api_keys_created_at_idx" ON "payload_mcp_api_keys" USING btree ("created_at");
  CREATE INDEX "branding_logo_idx" ON "branding" USING btree ("logo_id");
  CREATE INDEX "branding_logo_dark_idx" ON "branding" USING btree ("logo_dark_id");
  CREATE INDEX "branding_logo_b2_b_idx" ON "branding" USING btree ("logo_b2_b_id");
  CREATE INDEX "branding_logo_b2_b_dark_idx" ON "branding" USING btree ("logo_b2_b_dark_id");
  CREATE INDEX "branding_favicon_idx" ON "branding" USING btree ("favicon_id");
  CREATE INDEX "branding_favicon_b2_b_idx" ON "branding" USING btree ("favicon_b2_b_id");
  CREATE UNIQUE INDEX "branding_locales_locale_parent_id_unique" ON "branding_locales" USING btree ("_locale","_parent_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_mega_menu_featured_fk" FOREIGN KEY ("mega_menu_featured_id") REFERENCES "public"."mega_menu_featured"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_announcement_bars_fk" FOREIGN KEY ("announcement_bars_id") REFERENCES "public"."announcement_bars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_banners_fk" FOREIGN KEY ("blog_banners_id") REFERENCES "public"."blog_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk" FOREIGN KEY ("payload_mcp_api_keys_id") REFERENCES "public"."payload_mcp_api_keys"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_mega_menu_featured_id_idx" ON "payload_locked_documents_rels" USING btree ("mega_menu_featured_id");
  CREATE INDEX "payload_locked_documents_rels_announcement_bars_id_idx" ON "payload_locked_documents_rels" USING btree ("announcement_bars_id");
  CREATE INDEX "payload_locked_documents_rels_blog_banners_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_banners_id");
  CREATE INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_mcp_api_keys_id");
  CREATE INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx" ON "payload_preferences_rels" USING btree ("payload_mcp_api_keys_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "navigation_id";
  DROP TYPE "public"."enum_hero_slides_display_locales";
  DROP TYPE "public"."enum_product_carousels_display_locales";
  DROP TYPE "public"."enum_featured_categories_display_locales";
  DROP TYPE "public"."enum_category_banners_display_locales";
  DROP TYPE "public"."enum_site_settings_social_links_platform";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_hero_slides_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_product_carousels_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_featured_categories_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_category_banners_display_locales" AS ENUM('pl', 'en', 'de', 'ro', 'cs', 'hu');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('facebook', 'instagram', 'tiktok', 'youtube', 'twitter', 'pinterest');
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
  
  CREATE TABLE "category_banners_display_locales" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_category_banners_display_locales",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_payment_icons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"name" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"logo_white_id" integer,
  	"favicon_id" integer,
  	"site_name" varchar DEFAULT 'Kestrel',
  	"tagline" varchar,
  	"announcement_bar_enabled" boolean DEFAULT false,
  	"announcement_bar_text" varchar,
  	"announcement_bar_link" varchar,
  	"announcement_bar_background_color" varchar DEFAULT '#000000',
  	"announcement_bar_text_color" varchar DEFAULT '#ffffff',
  	"free_shipping_threshold" numeric DEFAULT 200,
  	"free_shipping_text" varchar DEFAULT 'Free shipping from {amount} PLN',
  	"footer_text" varchar,
  	"default_meta_title" varchar,
  	"default_meta_description" varchar,
  	"og_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "hero_slides_display_locales_b2_c" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "hero_slides_display_locales_b2_b" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_carousels_display_locales_b2_c" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_carousels_display_locales_b2_b" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_categories_display_locales_b2_c" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "featured_categories_display_locales_b2_b" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_banners_display_locales_b2_c" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_banners_display_locales_b2_b" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mega_menu_featured_display_locales_b2_c" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mega_menu_featured_display_locales_b2_b" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mega_menu_featured" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "mega_menu_featured_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_bars_display_locales_b2_c" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_bars_display_locales_b2_b" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_bars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "announcement_bars_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_banners_display_locales_b2_c" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_banners_display_locales_b2_b" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_banners" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "blog_banners_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_mcp_api_keys" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "branding" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "branding_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "hero_slides_display_locales_b2_c" CASCADE;
  DROP TABLE "hero_slides_display_locales_b2_b" CASCADE;
  DROP TABLE "product_carousels_display_locales_b2_c" CASCADE;
  DROP TABLE "product_carousels_display_locales_b2_b" CASCADE;
  DROP TABLE "featured_categories_display_locales_b2_c" CASCADE;
  DROP TABLE "featured_categories_display_locales_b2_b" CASCADE;
  DROP TABLE "category_banners_display_locales_b2_c" CASCADE;
  DROP TABLE "category_banners_display_locales_b2_b" CASCADE;
  DROP TABLE "mega_menu_featured_display_locales_b2_c" CASCADE;
  DROP TABLE "mega_menu_featured_display_locales_b2_b" CASCADE;
  DROP TABLE "mega_menu_featured" CASCADE;
  DROP TABLE "mega_menu_featured_locales" CASCADE;
  DROP TABLE "announcement_bars_display_locales_b2_c" CASCADE;
  DROP TABLE "announcement_bars_display_locales_b2_b" CASCADE;
  DROP TABLE "announcement_bars" CASCADE;
  DROP TABLE "announcement_bars_locales" CASCADE;
  DROP TABLE "blog_banners_display_locales_b2_c" CASCADE;
  DROP TABLE "blog_banners_display_locales_b2_b" CASCADE;
  DROP TABLE "blog_banners" CASCADE;
  DROP TABLE "blog_banners_locales" CASCADE;
  DROP TABLE "payload_mcp_api_keys" CASCADE;
  DROP TABLE "branding" CASCADE;
  DROP TABLE "branding_locales" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_mega_menu_featured_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_announcement_bars_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_blog_banners_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_mcp_api_keys_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_payload_mcp_api_keys_fk";
  
  DROP INDEX "payload_locked_documents_rels_mega_menu_featured_id_idx";
  DROP INDEX "payload_locked_documents_rels_announcement_bars_id_idx";
  DROP INDEX "payload_locked_documents_rels_blog_banners_id_idx";
  DROP INDEX "payload_locked_documents_rels_payload_mcp_api_keys_id_idx";
  DROP INDEX "payload_preferences_rels_payload_mcp_api_keys_id_idx";
  ALTER TABLE "featured_categories" ALTER COLUMN "category_slug" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "navigation_id" integer;
  ALTER TABLE "hero_slides_display_locales" ADD CONSTRAINT "hero_slides_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."hero_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_carousels_display_locales" ADD CONSTRAINT "product_carousels_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_carousels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_rels" ADD CONSTRAINT "navigation_rels_menu_items_fk" FOREIGN KEY ("menu_items_id") REFERENCES "public"."menu_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "featured_categories_display_locales" ADD CONSTRAINT "featured_categories_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."featured_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_banners_display_locales" ADD CONSTRAINT "category_banners_display_locales_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."category_banners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_payment_icons" ADD CONSTRAINT "site_settings_payment_icons_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_payment_icons" ADD CONSTRAINT "site_settings_payment_icons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_white_id_media_id_fk" FOREIGN KEY ("logo_white_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_favicon_id_media_id_fk" FOREIGN KEY ("favicon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_og_image_id_media_id_fk" FOREIGN KEY ("og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "hero_slides_display_locales_order_idx" ON "hero_slides_display_locales" USING btree ("order");
  CREATE INDEX "hero_slides_display_locales_parent_idx" ON "hero_slides_display_locales" USING btree ("parent_id");
  CREATE INDEX "product_carousels_display_locales_order_idx" ON "product_carousels_display_locales" USING btree ("order");
  CREATE INDEX "product_carousels_display_locales_parent_idx" ON "product_carousels_display_locales" USING btree ("parent_id");
  CREATE UNIQUE INDEX "navigation_slug_idx" ON "navigation" USING btree ("slug");
  CREATE INDEX "navigation_updated_at_idx" ON "navigation" USING btree ("updated_at");
  CREATE INDEX "navigation_created_at_idx" ON "navigation" USING btree ("created_at");
  CREATE INDEX "navigation_rels_order_idx" ON "navigation_rels" USING btree ("order");
  CREATE INDEX "navigation_rels_parent_idx" ON "navigation_rels" USING btree ("parent_id");
  CREATE INDEX "navigation_rels_path_idx" ON "navigation_rels" USING btree ("path");
  CREATE INDEX "navigation_rels_menu_items_id_idx" ON "navigation_rels" USING btree ("menu_items_id");
  CREATE INDEX "featured_categories_display_locales_order_idx" ON "featured_categories_display_locales" USING btree ("order");
  CREATE INDEX "featured_categories_display_locales_parent_idx" ON "featured_categories_display_locales" USING btree ("parent_id");
  CREATE INDEX "category_banners_display_locales_order_idx" ON "category_banners_display_locales" USING btree ("order");
  CREATE INDEX "category_banners_display_locales_parent_idx" ON "category_banners_display_locales" USING btree ("parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");
  CREATE INDEX "site_settings_payment_icons_order_idx" ON "site_settings_payment_icons" USING btree ("_order");
  CREATE INDEX "site_settings_payment_icons_parent_id_idx" ON "site_settings_payment_icons" USING btree ("_parent_id");
  CREATE INDEX "site_settings_payment_icons_icon_idx" ON "site_settings_payment_icons" USING btree ("icon_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "site_settings_logo_white_idx" ON "site_settings" USING btree ("logo_white_id");
  CREATE INDEX "site_settings_favicon_idx" ON "site_settings" USING btree ("favicon_id");
  CREATE INDEX "site_settings_og_image_idx" ON "site_settings" USING btree ("og_image_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navigation_fk" FOREIGN KEY ("navigation_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_navigation_id_idx" ON "payload_locked_documents_rels" USING btree ("navigation_id");
  ALTER TABLE "hero_slides" DROP COLUMN "slide_link";
  ALTER TABLE "hero_slides" DROP COLUMN "slide_no_follow";
  ALTER TABLE "menu_items" DROP COLUMN "order";
  ALTER TABLE "category_banners" DROP COLUMN "target_type";
  ALTER TABLE "category_banners" DROP COLUMN "page_slug";
  ALTER TABLE "category_banners" DROP COLUMN "position";
  ALTER TABLE "category_banners" DROP COLUMN "inline_after_position";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "mega_menu_featured_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "announcement_bars_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "blog_banners_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_mcp_api_keys_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "payload_mcp_api_keys_id";
  DROP TYPE "public"."enum_hero_slides_display_locales_b2_c";
  DROP TYPE "public"."enum_hero_slides_display_locales_b2_b";
  DROP TYPE "public"."enum_product_carousels_display_locales_b2_c";
  DROP TYPE "public"."enum_product_carousels_display_locales_b2_b";
  DROP TYPE "public"."enum_featured_categories_display_locales_b2_c";
  DROP TYPE "public"."enum_featured_categories_display_locales_b2_b";
  DROP TYPE "public"."enum_category_banners_display_locales_b2_c";
  DROP TYPE "public"."enum_category_banners_display_locales_b2_b";
  DROP TYPE "public"."enum_category_banners_target_type";
  DROP TYPE "public"."enum_category_banners_page_slug";
  DROP TYPE "public"."enum_category_banners_position";
  DROP TYPE "public"."enum_mega_menu_featured_display_locales_b2_c";
  DROP TYPE "public"."enum_mega_menu_featured_display_locales_b2_b";
  DROP TYPE "public"."enum_mega_menu_featured_link_type";
  DROP TYPE "public"."enum_announcement_bars_display_locales_b2_c";
  DROP TYPE "public"."enum_announcement_bars_display_locales_b2_b";
  DROP TYPE "public"."enum_announcement_bars_link_type";
  DROP TYPE "public"."enum_announcement_bars_link_page";
  DROP TYPE "public"."enum_announcement_bars_background_color";
  DROP TYPE "public"."enum_announcement_bars_text_color";
  DROP TYPE "public"."enum_blog_banners_display_locales_b2_c";
  DROP TYPE "public"."enum_blog_banners_display_locales_b2_b";
  DROP TYPE "public"."enum_branding_logo_type";`)
}
