# Kestrel CMS

[![Payload CMS](https://img.shields.io/badge/Payload-3.78-000000?logo=payloadcms&logoColor=white)](https://payloadcms.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)

Content management system for the [Kestrel](https://github.com/negativepl/kestrel) e-commerce storefront. Built with Payload CMS 3, manages homepage content, navigation, banners, and promotional elements displayed on the frontend.

---

## Table of Contents

- [Quick Start](#quick-start)
- [Collections](#collections)
- [Architecture](#architecture)
- [Localization](#localization)
- [MCP Integration](#mcp-integration)
- [Custom Endpoints](#custom-endpoints)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [License](#license)

---

## Quick Start

```bash
# Install dependencies
npm install

# Development (port 3001)
npm run dev

# Production build
npm run build && npm run start

# Generate TypeScript types
npm run generate:types

# Regenerate import map
npm run generate:importmap
```

Open [http://localhost:3001/admin](http://localhost:3001/admin) to access the admin panel.

---

## Collections

### Navigation

| Collection | Description |
|------------|-------------|
| **Navigation** | Top-level menu configurations (e.g. "Main Menu") with ordered menu items |
| **Menu Items** | Individual menu entries (e.g. "Apple", "Samsung") with mega menu category mappings |
| **Mega Menu Featured** | Featured cards in the mega menu "Polecane" section. Image: 3:2 aspect ratio (900x600px) |

### Homepage

| Collection | Description |
|------------|-------------|
| **Hero Slides** | Homepage hero carousel. Image: 16:9 (1920x1080px). Supports text overlay, CTA buttons, per-store/locale display |
| **Product Carousels** | Product sliders by type (bestsellers, new, category, manual IDs). Configurable location, sorting, limits |
| **Featured Categories** | Category tiles with icons. Image: square (400x400px). Links to PrestaShop categories |

### Banners

| Collection | Description |
|------------|-------------|
| **Category Banners** | Banners on category/special pages. Sidebar (400x400px) or wide (1200x300px). Supports inline positioning between products |

### System

| Collection | Description |
|------------|-------------|
| **Media** | Image uploads with Sharp processing |
| **Users** | Admin users |

### Globals

| Global | Description |
|--------|-------------|
| **Site Settings** | Global site configuration |

---

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│                      KESTREL CMS                           │
│               (Payload CMS 3 + Next.js 15)                 │
├────────────────────────────────────────────────────────────┤
│  Admin Panel (/admin)     │  REST API (/api)               │
│  ─────────────────────    │  ────────────────               │
│  • Collection CRUD        │  • /api/hero-slides             │
│  • Media uploads          │  • /api/product-carousels       │
│  • Localized fields       │  • /api/menu-items              │
│  • Auto-translate (GPT)   │  • /api/navigation              │
│                           │  • /api/featured-categories     │
│                           │  • /api/category-banners        │
│                           │  • /api/mega-menu-featured      │
│                           │  • /api/media                   │
├───────────────────────────┴────────────────────────────────┤
│  Custom Endpoints         │  Plugins                       │
│  ─────────────────────    │  ───────────                   │
│  • /api/translate         │  • MCP Plugin (AI management)  │
│  • /api/prestashop-cats   │  • S3 Storage                  │
│  • /api/revalidate        │                                │
└──────────┬─────────────────────────────┬───────────────────┘
           │                             │
           ▼                             ▼
┌──────────────────┐          ┌──────────────────────┐
│   PostgreSQL     │          │   KESTREL FRONTEND   │
│  ──────────────  │          │  ──────────────────  │
│  • Collections   │          │  Fetches CMS data    │
│  • Media refs    │          │  via REST API with   │
│  • Versions      │          │  Next.js revalidation│
│  • Locales       │          │  caching (60s)       │
└──────────────────┘          └──────────────────────┘
```

### Data Flow

1. Content editors manage data via Payload admin panel
2. Kestrel frontend fetches collections via REST API (`/api/{collection}`)
3. Frontend caches responses with Next.js `revalidate: 60`
4. On content change, CMS calls `/api/revalidate` to bust frontend cache

---

## Localization

All user-facing content supports 6 languages:

| Code | Language |
|------|----------|
| `pl` | Polish (default) |
| `en` | English |
| `de` | German |
| `ro` | Romanian |
| `cs` | Czech |
| `hu` | Hungarian |

Auto-translation is available via the "Save & Translate" button, which uses GPT to translate localized fields from the current locale to all others.

---

## MCP Integration

The CMS includes [Payload MCP Plugin](https://payloadcms.com/docs/plugins/mcp) for AI-powered content management via Claude Code or other MCP clients.

**Enabled collections:** Hero Slides, Product Carousels, Menu Items, Navigation, Featured Categories, Category Banners, Mega Menu Featured, Media (read-only).

---

## Custom Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/translate` | POST | Auto-translate localized fields via GPT |
| `/api/prestashop-categories` | GET | Fetch PrestaShop category tree for admin selectors |
| `/api/revalidate` | POST | Bust Next.js frontend cache on content changes |

---

## Configuration

### Environment Variables

```env
# Database
DATABASE_URI=postgresql://user:password@localhost:5432/kestrel_cms

# Payload
PAYLOAD_SECRET=your-secret-key

# S3 Storage (media uploads)
S3_BUCKET=your-bucket
S3_REGION=eu-central-1
S3_ACCESS_KEY_ID=your-access-key
S3_SECRET_ACCESS_KEY=your-secret-key
S3_ENDPOINT=https://s3.eu-central-1.amazonaws.com

# PrestaShop (for category selector)
PRESTASHOP_API_URL=https://presta.example.com
PRESTASHOP_API_KEY=your-api-key

# OpenAI (auto-translate)
OPENAI_API_KEY=your-openai-key

# Frontend revalidation
FRONTEND_URL=https://your-frontend.com
FRONTEND_REVALIDATE_TOKEN=your-revalidate-token
```

---

## Project Structure

```
kestrel-cms/
├── payload.config.ts              # Payload configuration
├── src/
│   ├── collections/               # Collection definitions
│   │   ├── HeroSlides.ts          # Homepage hero carousel
│   │   ├── ProductCarousels.ts    # Product slider sections
│   │   ├── MenuItems.ts           # Navigation menu entries
│   │   ├── Navigation.ts          # Menu configurations
│   │   ├── FeaturedCategories.ts  # Category tiles
│   │   ├── CategoryBanners.ts     # Category page banners
│   │   ├── MegaMenuFeatured.ts    # Mega menu featured cards
│   │   ├── Media.ts               # Media uploads
│   │   └── Users.ts               # Admin users
│   ├── globals/
│   │   └── SiteSettings.ts        # Global settings
│   ├── endpoints/
│   │   ├── translate.ts           # GPT auto-translation
│   │   ├── prestashopCategories.ts # PS category tree
│   │   └── revalidate.ts          # Frontend cache bust
│   ├── components/                # Admin UI components
│   │   ├── SaveWithTranslate.tsx  # Save + translate button
│   │   ├── TranslateButton.tsx    # Manual translate trigger
│   │   ├── PrestaShopCategoryField/ # Category picker
│   │   ├── NavCategorySelector/   # Nav category multi-select
│   │   ├── CategoryRowLabel.tsx   # Admin list labels
│   │   └── MenuItemRowLabel.tsx   # Admin list labels
│   ├── migrations/                # Database migrations
│   └── app/                       # Next.js app (admin + API)
├── media/                         # Local media storage
└── docker-compose.yml             # Docker setup
```

---

## Deployment

Deployed via Docker on Coolify. The `docker-compose.yml` includes PostgreSQL.

```bash
# Build Docker image
docker build -t kestrel-cms .

# Run with docker-compose
docker-compose up -d
```

---

## License

Private - All rights reserved.

---

<p align="center">
  Built with <a href="https://payloadcms.com/">Payload CMS</a> and <a href="https://claude.ai/claude-code">Claude Code</a>
</p>
