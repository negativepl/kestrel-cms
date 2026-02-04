import * as migration_20260118_173458 from './20260118_173458';
import * as migration_20260122_visible_items_infinity from './20260122_visible_items_infinity';
import * as migration_20260128_080710 from './20260128_080710';

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
    name: '20260128_080710'
  },
];
