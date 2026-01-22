import * as migration_20260118_173458 from './20260118_173458';
import * as migration_20260122_visible_items_infinity from './20260122_visible_items_infinity';

export const migrations = [
  {
    up: migration_20260118_173458.up,
    down: migration_20260118_173458.down,
    name: '20260118_173458'
  },
  {
    up: migration_20260122_visible_items_infinity.up,
    down: migration_20260122_visible_items_infinity.down,
    name: '20260122_visible_items_infinity'
  },
];
