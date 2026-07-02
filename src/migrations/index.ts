import * as migration_20260118_173458 from './20260118_173458';
import * as migration_20260122_visible_items_infinity from './20260122_visible_items_infinity';
import * as migration_20260128_080710 from './20260128_080710';
import * as migration_20260407_124033_blog_banners from './20260407_124033_blog_banners';
import * as migration_20260416_120000_blog_banners_visibility_dates from './20260416_120000_blog_banners_visibility_dates';
import * as migration_20260612_100000_add_greek_locale from './20260612_100000_add_greek_locale';
import * as migration_20260612_100100_backfill_greek_display_locales from './20260612_100100_backfill_greek_display_locales';
import * as migration_20260618_120000_mega_menu_featured_link_options from './20260618_120000_mega_menu_featured_link_options';
import * as migration_20260702_130000_hero_slides_brand_link from './20260702_130000_hero_slides_brand_link';

export const migrations = [
  {
    up: migration_20260118_173458.up,
    down: migration_20260118_173458.down,
    name: '20260118_173458',
  },
  {
    up: migration_20260122_visible_items_infinity.up,
    down: migration_20260122_visible_items_infinity.down,
    name: '20260122_visible_items_infinity',
  },
  {
    up: migration_20260128_080710.up,
    down: migration_20260128_080710.down,
    name: '20260128_080710',
  },
  {
    up: migration_20260407_124033_blog_banners.up,
    down: migration_20260407_124033_blog_banners.down,
    name: '20260407_124033_blog_banners'
  },
  {
    up: migration_20260416_120000_blog_banners_visibility_dates.up,
    down: migration_20260416_120000_blog_banners_visibility_dates.down,
    name: '20260416_120000_blog_banners_visibility_dates',
  },
  {
    up: migration_20260612_100000_add_greek_locale.up,
    down: migration_20260612_100000_add_greek_locale.down,
    name: '20260612_100000_add_greek_locale',
  },
  {
    up: migration_20260612_100100_backfill_greek_display_locales.up,
    down: migration_20260612_100100_backfill_greek_display_locales.down,
    name: '20260612_100100_backfill_greek_display_locales',
  },
  {
    up: migration_20260618_120000_mega_menu_featured_link_options.up,
    down: migration_20260618_120000_mega_menu_featured_link_options.down,
    name: '20260618_120000_mega_menu_featured_link_options',
  },
  {
    up: migration_20260702_130000_hero_slides_brand_link.up,
    down: migration_20260702_130000_hero_slides_brand_link.down,
    name: '20260702_130000_hero_slides_brand_link',
  },
];
