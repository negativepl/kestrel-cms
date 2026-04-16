# Blog Banners — Harmonogram widoczności

**Data:** 2026-04-16  
**Status:** Zaakceptowany  

## Problem

Redaktorzy muszą ręcznie pamiętać o wyłączeniu banneru po zakończeniu promocji. Brak mechanizmu dat powoduje, że przeterminowane bannery pozostają widoczne.

## Cel

Dodać opcjonalne pola daty "widoczny od" i "widoczny do" do kolekcji `blog-banners`. Filtrowanie odbywa się automatycznie na poziomie Payload API — bez zmian po stronie front-endu.

## Podejście: Filtr na poziomie Payload API (Opcja B)

Filtrowanie odbywa się w hooku `beforeOperation` na operację `find` w kolekcji `BlogBanners`. Zapytania spoza Admin Panelu automatycznie otrzymują warunki dat. Admin Panel pomija filtr — redaktorzy widzą wszystkie bannery.

## Schemat danych

Dwa nowe pola w `BlogBanners.ts`, oba opcjonalne:

| Pole         | Typ Payload | Kolumna SQL    | Opis                                    |
|--------------|-------------|----------------|-----------------------------------------|
| `visibleFrom` | `date`     | `visible_from` | Widoczny od (włącznie). Brak = od zawsze |
| `visibleTo`   | `date`     | `visible_to`   | Widoczny do (włącznie). Brak = bez końca |

**Walidacja:** jeśli podano obie daty, `visibleFrom` musi być wcześniej niż `visibleTo`.

**UI:** Pola pogrupowane w osobnym `collapsible` o nazwie "Harmonogram widoczności" w formularzu Admin Panelu.

## Logika filtrowania

Hook `beforeOperation` (typ: `find`) sprawdza czy zapytanie pochodzi spoza panelu admin (`!req.user`). Jeśli tak, dorzuca do `where`:

```
(visibleFrom IS NULL  OR  visibleFrom <= now)
AND
(visibleTo   IS NULL  OR  visibleTo   >= now)
```

Payload obsługuje te warunki natywnie przez składnię `where` — bez surowego SQL.

**Zachowanie isActive:** Pole `isActive` pozostaje bez zmian i działa niezależnie. Banner jest widoczny tylko gdy: `isActive = true` AND daty są w zakresie.

## Migracja bazy danych

Nowa migracja Payload dodaje dwie nullable kolumny do tabeli `blog_banners`:

```sql
ALTER TABLE blog_banners ADD COLUMN visible_from timestamp with time zone;
ALTER TABLE blog_banners ADD COLUMN visible_to   timestamp with time zone;
```

Istniejące bannery bez dat działają jak dotychczas.

Migracja `down` usuwa obie kolumny.

## Cache revalidacja

Bez zmian — `revalidateAfterChange` i `revalidateAfterDelete` działają jak dotychczas. Zmiana dat banneru czyści cache na front-endzie.

## Poza zakresem

- Powiadomienia email o wygasających bannerach
- Harmonogram dla innych kolekcji (HeroSlides, AnnouncementBars, CategoryBanners)
- Cron job do auto-deaktywacji `isActive`
