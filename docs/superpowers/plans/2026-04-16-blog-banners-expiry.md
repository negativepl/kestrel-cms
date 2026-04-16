# Blog Banners — Harmonogram widoczności — Plan implementacji

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dodać opcjonalne pola `visibleFrom` / `visibleTo` do kolekcji `blog-banners` oraz filtr na poziomie Payload API, który automatycznie ukrywa bannery spoza zakresu dat w zapytaniach spoza Admin Panelu.

**Architecture:** Dwa nowe pola `date` w kolekcji `BlogBanners`. Hook `beforeOperation` na `find` dorzuca warunki dat do `args.where` gdy `req.user` jest pusty (niezalogowany = zapytanie z front-endu). Migracja dodaje dwie nullable kolumny `timestamp with time zone` do tabeli `blog_banners`.

**Tech Stack:** Payload CMS v3.80, TypeScript, PostgreSQL (drizzle adapter)

---

## Mapa plików

| Plik | Akcja | Co się zmienia |
|------|-------|----------------|
| `src/collections/BlogBanners.ts` | Modyfikacja | Dodanie pól `visibleFrom`, `visibleTo` w grupie `collapsible` + hook `beforeOperation` |
| `src/migrations/20260416_120000_blog_banners_visibility_dates.ts` | Tworzenie | Migracja SQL dodająca dwie kolumny |
| `src/migrations/index.ts` | Modyfikacja | Rejestracja nowej migracji |
| `payload-types.ts` | Generowanie | Automatycznie po `npm run generate:types` |

---

## Task 1: Dodaj pola i hook do BlogBanners.ts

**Files:**
- Modify: `src/collections/BlogBanners.ts`

- [ ] **Krok 1.1: Dodaj import typu hooka**

Na początku pliku `src/collections/BlogBanners.ts`, zmień import:

```typescript
import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload'
```

- [ ] **Krok 1.2: Dodaj funkcję hooka filtrującą po datach**

Bezpośrednio po importach, przed `export const BlogBanners`, dodaj:

```typescript
const filterByVisibilityDates: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (operation === 'find' && !req.user) {
    const now = new Date().toISOString()
    const existingWhere = args.where
    args.where = {
      and: [
        ...(existingWhere ? [existingWhere] : []),
        {
          or: [
            { visibleFrom: { equals: null } },
            { visibleFrom: { less_than_equal: now } },
          ],
        },
        {
          or: [
            { visibleTo: { equals: null } },
            { visibleTo: { greater_than_equal: now } },
          ],
        },
      ],
    }
  }
  return args
}
```

- [ ] **Krok 1.3: Zarejestruj hook w konfiguracji kolekcji**

W sekcji `hooks` w `BlogBanners`, dodaj `beforeOperation`:

```typescript
hooks: {
  beforeOperation: [filterByVisibilityDates],
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
},
```

- [ ] **Krok 1.4: Dodaj pole `visibleTo` do `defaultColumns` w admin**

Zmień `defaultColumns` aby admini od razu widzieli datę wygaśnięcia na liście:

```typescript
admin: {
  useAsTitle: 'internalName',
  defaultColumns: ['internalName', 'wordpressPostId', 'isActive', 'visibleTo', 'updatedAt'],
  description: 'Promotional banners displayed inline within blog posts',
},
```

- [ ] **Krok 1.5: Dodaj grupę pól `collapsible` z `visibleFrom` i `visibleTo`**

Na końcu tablicy `fields`, przed zamykającym `]`, dodaj (po `...storeVisibilityFields`):

```typescript
{
  type: 'collapsible',
  label: 'Visibility Schedule',
  admin: {
    initCollapsed: true,
    description: 'Leave empty to show banner without time restrictions.',
  },
  fields: [
    {
      name: 'visibleFrom',
      type: 'date',
      label: 'Visible From',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm',
        },
        description: 'Banner starts showing at this date/time. Leave empty = visible immediately.',
      },
    },
    {
      name: 'visibleTo',
      type: 'date',
      label: 'Visible To',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'dd.MM.yyyy HH:mm',
        },
        description: 'Banner stops showing after this date/time. Leave empty = no expiry.',
      },
      validate: (value: string | null | undefined, { siblingData }: { siblingData: Record<string, unknown> }) => {
        if (value && siblingData?.visibleFrom && new Date(value) <= new Date(siblingData.visibleFrom as string)) {
          return 'Visible To must be later than Visible From'
        }
        return true
      },
    },
  ],
},
```

- [ ] **Krok 1.6: Sprawdź TypeScript**

```bash
cd /Users/marcinbaszewski/Projekty/kestrel-cms && npx tsc --noEmit 2>&1 | head -30
```

Oczekiwany wynik: brak błędów TypeScript (lub tylko pre-istniejące ostrzeżenia).

- [ ] **Krok 1.7: Commit**

```bash
git add src/collections/BlogBanners.ts
git commit -m "feat(blog-banners): add visibleFrom/visibleTo fields with API-level date filter"
```

---

## Task 2: Migracja bazy danych

**Files:**
- Create: `src/migrations/20260416_120000_blog_banners_visibility_dates.ts`
- Modify: `src/migrations/index.ts`

- [ ] **Krok 2.1: Utwórz plik migracji**

Utwórz plik `src/migrations/20260416_120000_blog_banners_visibility_dates.ts`:

```typescript
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
```

- [ ] **Krok 2.2: Zarejestruj migrację w index.ts**

Edytuj `src/migrations/index.ts`:

```typescript
import * as migration_20260118_173458 from './20260118_173458';
import * as migration_20260122_visible_items_infinity from './20260122_visible_items_infinity';
import * as migration_20260128_080710 from './20260128_080710';
import * as migration_20260407_124033_blog_banners from './20260407_124033_blog_banners';
import * as migration_20260416_120000_blog_banners_visibility_dates from './20260416_120000_blog_banners_visibility_dates';

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
    name: '20260407_124033_blog_banners',
  },
  {
    up: migration_20260416_120000_blog_banners_visibility_dates.up,
    down: migration_20260416_120000_blog_banners_visibility_dates.down,
    name: '20260416_120000_blog_banners_visibility_dates',
  },
];
```

- [ ] **Krok 2.3: Uruchom migrację**

```bash
cd /Users/marcinbaszewski/Projekty/kestrel-cms && npm run payload migrate
```

Oczekiwany wynik: `Migration 20260416_120000_blog_banners_visibility_dates ran successfully` (lub podobny komunikat bez błędów).

- [ ] **Krok 2.4: Commit**

```bash
git add src/migrations/20260416_120000_blog_banners_visibility_dates.ts src/migrations/index.ts
git commit -m "feat(migrations): add visible_from + visible_to columns to blog_banners"
```

---

## Task 3: Wygeneruj typy i zweryfikuj

**Files:**
- Generate: `payload-types.ts`

- [ ] **Krok 3.1: Wygeneruj typy TypeScript**

```bash
cd /Users/marcinbaszewski/Projekty/kestrel-cms && npm run generate:types
```

Oczekiwany wynik: plik `payload-types.ts` zaktualizowany bez błędów.

- [ ] **Krok 3.2: Sprawdź że typy zostały dodane**

```bash
grep -A 5 "visibleFrom" payload-types.ts
```

Oczekiwany wynik:
```
visibleFrom?: string | null;
visibleTo?: string | null;
```

- [ ] **Krok 3.3: Sprawdź TypeScript po generowaniu typów**

```bash
npx tsc --noEmit 2>&1 | head -30
```

Oczekiwany wynik: brak nowych błędów.

- [ ] **Krok 3.4: Commit**

```bash
git add payload-types.ts
git commit -m "chore: regenerate payload types with visibleFrom/visibleTo on blog-banners"
```

---

## Task 4: Weryfikacja manualna

- [ ] **Krok 4.1: Uruchom dev server**

```bash
cd /Users/marcinbaszewski/Projekty/kestrel-cms && npm run dev
```

- [ ] **Krok 4.2: Sprawdź Admin Panel**

Otwórz `http://localhost:3001/admin/collections/blog-banners/1`. Sprawdź:
- Widać sekcję "Visibility Schedule" (zwiniętą domyślnie)
- Po rozwinięciu: dwa pola date picker `Visible From` i `Visible To`
- Kolumna `Visible To` widoczna na liście `/admin/collections/blog-banners`

- [ ] **Krok 4.3: Sprawdź filtrowanie API**

Ustaw na istniejącym bannerze `visibleTo` = wczorajsza data, zapisz. Następnie:

```bash
curl -s "http://localhost:3001/api/blog-banners" | python3 -m json.tool | grep -E '"id"|"visibleTo"'
```

Oczekiwany wynik: banner z przeszłą datą `visibleTo` NIE pojawia się w wynikach.

- [ ] **Krok 4.4: Zresetuj testową datę**

Usuń testową datę `visibleTo` z banneru (zostaw puste) lub ustaw datę w przyszłości.
