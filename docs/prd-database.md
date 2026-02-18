# PRD Database — Versedroid Wiki

## Overview

Database layer Versedroid Wiki menggunakan **Supabase PostgreSQL** sebagai storage utama. Schema di-manage oleh **Payload CMS 3** via `@payloadcms/db-postgres` adapter — Payload auto-generate dan auto-migrate tabel berdasarkan collection config.

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Database | **Supabase PostgreSQL** (cloud-hosted) |
| ORM/Adapter | **Drizzle ORM** (via `@payloadcms/db-postgres`) |
| Migration | **Payload CMS auto-migration** |
| Media Storage | **Supabase Storage** (bucket untuk upload gambar) |

---

## Entity Relationship Diagram (ERD)

### Visual ERD

```
┌──────────────┐
│    users     │
├──────────────┤
│ id        PK │
│ email    UNQ │
│ password     │
│ name         │
│ role     ENUM│──┐
│ created_at   │  │
│ updated_at   │  │
└──────┬───────┘  │
       │          │
       │ 1:∞      │ 1:∞ (author)
       │          │
       ▼          │
┌──────────────┐  │    ┌──────────────┐
│  blog_posts  │  │    │  categories  │
├──────────────┤  │    ├──────────────┤
│ id        PK │  │    │ id        PK │
│ title        │  │    │ name         │
│ slug     UNQ │  │    │ slug     UNQ │
│ content  RTX │  │    │ description  │
│ excerpt      │  │    │ locale   ENUM│
│ cover_img FK─┼──┼──▶ media    │ created_at   │
│ author_id FK─┼──┘    │ updated_at   │
│ category  FK─┼──────▶│              │
│ status   ENUM│       └──────────────┘
│ locale   ENUM│
│ published_at │
│ reading_time │
│ created_at   │       ┌──────────────────┐
│ updated_at   │       │ blog_posts_tags  │
└──────┬───────┘       │   (junction)     │
       │ ∞:∞           ├──────────────────┤
       ├──────────────▶│ blog_post_id  FK │
       │               │ tag_id        FK │
       │               └────────┬─────────┘
       │                        │
       │                        ▼ ∞
       │               ┌──────────────┐
       │               │    tags      │
       │               ├──────────────┤
       │               │ id        PK │
       │               │ name         │
       │               │ slug     UNQ │
       │               │ created_at   │
       │               └──────────────┘

┌──────────────┐
│  faq_topics  │
├──────────────┤
│ id        PK │
│ title        │
│ slug     UNQ │
│ icon         │
│ description  │
│ content  RTX │
│ order    INT │
│ locale   ENUM│
│ status   ENUM│
│ author_id FK─┼──▶ users
│ created_at   │
│ updated_at   │
└──────────────┘

┌──────────────┐
│ tool_guides  │
├──────────────┤
│ id        PK │
│ title        │
│ slug     UNQ │
│ icon         │
│ overview RTX │
│ requirements │ JSON
│ download_url │
│ download_ver │
│ host_guide   │ RTX (Rich Text)
│ client_guide │ RTX (Rich Text)
│ troubleshoot │ RTX (Rich Text)
│ category ENUM│
│ order    INT │
│ locale   ENUM│
│ status   ENUM│
│ author_id FK─┼──▶ users
│ created_at   │
│ updated_at   │
└──────────────┘

┌──────────────┐
│    media     │
├──────────────┤
│ id        PK │
│ filename     │
│ mime_type    │
│ file_size    │
│ width        │ nullable
│ height       │ nullable
│ alt_text     │
│ url          │
│ thumbnail_url│ auto-generated
│ card_url     │ auto-generated
│ cover_url    │ auto-generated
│ created_at   │
│ updated_at   │
└──────────────┘
```

### Relasi Ringkas

| Relasi | Tipe | Deskripsi |
|--------|------|-----------|
| `users` → `blog_posts` | 1:∞ | Satu admin bisa punya banyak blog posts |
| `users` → `faq_topics` | 1:∞ | Satu admin bisa punya banyak FAQ topics |
| `users` → `tool_guides` | 1:∞ | Satu admin bisa punya banyak tool guides |
| `categories` → `blog_posts` | 1:∞ | Satu kategori bisa punya banyak blog posts |
| `blog_posts` ↔ `tags` | ∞:∞ | Many-to-many via junction table |
| `media` → `blog_posts` | 1:∞ | Satu media bisa jadi cover banyak blog posts |

---

## Detail Schema Per Tabel

### 1. `users`

| Column | Type | Constraint | Deskripsi |
|--------|------|------------|-----------|
| `id` | `SERIAL` | PK | Auto-increment |
| `email` | `VARCHAR(255)` | NOT NULL, UNIQUE | Login email |
| `password` | `VARCHAR(255)` | NOT NULL | Bcrypt hashed |
| `name` | `VARCHAR(100)` | NOT NULL | Display name |
| `role` | `VARCHAR(20)` | NOT NULL, DEFAULT 'editor' | `admin` atau `editor` |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |

### 2. `faq_topics`

| Column | Type | Constraint | Deskripsi |
|--------|------|------------|-----------|
| `id` | `SERIAL` | PK | |
| `title` | `VARCHAR(255)` | NOT NULL | Judul topik |
| `slug` | `VARCHAR(255)` | NOT NULL, UNIQUE | URL slug |
| `icon` | `VARCHAR(50)` | | Emoji/icon ID |
| `description` | `TEXT` | | Ringkasan singkat |
| `content` | `JSONB` | NOT NULL | Lexical rich text (structured JSON) |
| `order` | `INTEGER` | NOT NULL, DEFAULT 0 | Urutan di sidebar |
| `locale` | `VARCHAR(5)` | NOT NULL, DEFAULT 'id' | `id` atau `en` |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT 'draft' | `draft` atau `published` |
| `author_id` | `INTEGER` | FK → users(id) | Penulis |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |

**Indexes:**
- `UNIQUE(slug, locale)` — slug unik per bahasa
- `INDEX(status, locale)` — filter published + bahasa
- `INDEX(order)` — sorting sidebar

### 3. `tool_guides`

| Column | Type | Constraint | Deskripsi |
|--------|------|------------|-----------|
| `id` | `SERIAL` | PK | |
| `title` | `VARCHAR(255)` | NOT NULL | Nama tool |
| `slug` | `VARCHAR(255)` | NOT NULL, UNIQUE | URL slug |
| `icon` | `VARCHAR(50)` | | |
| `overview` | `JSONB` | NOT NULL | Rich text overview |
| `requirements` | `JSONB` | | `{ os, ram, disk, usb }` |
| `download_url` | `VARCHAR(500)` | | Link download resmi |
| `download_version` | `VARCHAR(50)` | | Versi terbaru |
| `host_guide` | `JSONB` | | Rich text panduan host |
| `client_guide` | `JSONB` | | Rich text panduan client |
| `troubleshooting` | `JSONB` | | Rich text troubleshoot |
| `category` | `VARCHAR(20)` | NOT NULL | `remote`, `android`, `utility` |
| `order` | `INTEGER` | NOT NULL, DEFAULT 0 | |
| `locale` | `VARCHAR(5)` | NOT NULL, DEFAULT 'id' | |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT 'draft' | |
| `author_id` | `INTEGER` | FK → users(id) | |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |

**Indexes:**
- `UNIQUE(slug, locale)`
- `INDEX(category, status, locale)`
- `INDEX(order)`

### 4. `blog_posts`

| Column | Type | Constraint | Deskripsi |
|--------|------|------------|-----------|
| `id` | `SERIAL` | PK | |
| `title` | `VARCHAR(255)` | NOT NULL | |
| `slug` | `VARCHAR(255)` | NOT NULL, UNIQUE | |
| `content` | `JSONB` | NOT NULL | Rich text body |
| `excerpt` | `TEXT` | | Ringkasan untuk card |
| `cover_image_id` | `INTEGER` | FK → media(id) | |
| `author_id` | `INTEGER` | FK → users(id) | |
| `category_id` | `INTEGER` | FK → categories(id) | |
| `status` | `VARCHAR(20)` | NOT NULL, DEFAULT 'draft' | |
| `locale` | `VARCHAR(5)` | NOT NULL, DEFAULT 'id' | |
| `published_at` | `TIMESTAMPTZ` | | Tanggal publish |
| `reading_time` | `INTEGER` | | Estimasi menit baca |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |

**Indexes:**
- `UNIQUE(slug, locale)`
- `INDEX(status, locale, published_at DESC)` — listing published posts sorted by date
- `INDEX(category_id)`
- `INDEX(author_id)`

### 5. `categories`

| Column | Type | Constraint | Deskripsi |
|--------|------|------------|-----------|
| `id` | `SERIAL` | PK | |
| `name` | `VARCHAR(100)` | NOT NULL | Nama kategori |
| `slug` | `VARCHAR(100)` | NOT NULL, UNIQUE | |
| `description` | `TEXT` | | |
| `locale` | `VARCHAR(5)` | NOT NULL, DEFAULT 'id' | |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |

### 6. `tags`

| Column | Type | Constraint | Deskripsi |
|--------|------|------------|-----------|
| `id` | `SERIAL` | PK | |
| `name` | `VARCHAR(100)` | NOT NULL | |
| `slug` | `VARCHAR(100)` | NOT NULL, UNIQUE | |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |

### 7. `blog_posts_tags` (Junction)

| Column | Type | Constraint |
|--------|------|------------|
| `blog_post_id` | `INTEGER` | FK → blog_posts(id), ON DELETE CASCADE |
| `tag_id` | `INTEGER` | FK → tags(id), ON DELETE CASCADE |

**PK:** `(blog_post_id, tag_id)`

### 8. `media`

| Column | Type | Constraint | Deskripsi |
|--------|------|------------|-----------|
| `id` | `SERIAL` | PK | |
| `filename` | `VARCHAR(255)` | NOT NULL | |
| `mime_type` | `VARCHAR(100)` | NOT NULL | |
| `file_size` | `INTEGER` | NOT NULL | Bytes |
| `width` | `INTEGER` | | Image only |
| `height` | `INTEGER` | | Image only |
| `alt_text` | `VARCHAR(255)` | | SEO alt text |
| `url` | `VARCHAR(500)` | NOT NULL | Full URL |
| `thumbnail_url` | `VARCHAR(500)` | | 400px variant |
| `card_url` | `VARCHAR(500)` | | 768px variant |
| `cover_url` | `VARCHAR(500)` | | 1200px variant |
| `created_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL, DEFAULT NOW() | |

---

## Localization Strategy

### Pendekatan: Row-per-locale

Setiap konten yang perlu diterjemahkan disimpan sebagai **row terpisah** per bahasa.

```
┌─────────────────────────────────────────────────────┐
│ faq_topics                                          │
├────┬───────────────────────┬────────┬───────────────┤
│ id │ title                 │ locale │ slug          │
├────┼───────────────────────┼────────┼───────────────┤
│  1 │ Unlock Bootloader     │ id     │ unlock-bl     │
│  2 │ Unlock Bootloader     │ en     │ unlock-bl     │
│  3 │ Root                  │ id     │ root          │
│  4 │ Root                  │ en     │ root          │
└────┴───────────────────────┴────────┴───────────────┘
```

**Kenapa row-per-locale:**
- Scalable: tambah bahasa baru tanpa alter schema
- Query sederhana: `WHERE locale = 'id'`
- Payload CMS native support untuk pattern ini
- Setiap bahasa bisa punya konten yang berbeda (tidak harus 1:1 translation)

**UNIQUE constraint:** `(slug, locale)` — slug sama boleh ada di 2 bahasa berbeda.

---

## Query Patterns

### Query yang Sering Digunakan

```sql
-- 1. Get all published FAQ topics (sidebar, sorted)
SELECT id, title, slug, icon, description, "order"
FROM faq_topics
WHERE status = 'published' AND locale = 'id'
ORDER BY "order" ASC;

-- 2. Get single FAQ topic by slug
SELECT *
FROM faq_topics
WHERE slug = 'unlock-bootloader' AND locale = 'id' AND status = 'published';

-- 3. Get published blog posts (paginated, newest first)
SELECT bp.*, c.name as category_name, u.name as author_name
FROM blog_posts bp
LEFT JOIN categories c ON bp.category_id = c.id
LEFT JOIN users u ON bp.author_id = u.id
WHERE bp.status = 'published' AND bp.locale = 'id'
ORDER BY bp.published_at DESC
LIMIT 10 OFFSET 0;

-- 4. Get blog post with tags
SELECT bp.*, array_agg(t.name) as tags
FROM blog_posts bp
LEFT JOIN blog_posts_tags bpt ON bp.id = bpt.blog_post_id
LEFT JOIN tags t ON bpt.tag_id = t.id
WHERE bp.slug = 'install-evolution-x-poco-f6' AND bp.locale = 'id'
GROUP BY bp.id;

-- 5. Get tool guides by category
SELECT id, title, slug, icon, category, "order"
FROM tool_guides
WHERE category = 'remote' AND status = 'published' AND locale = 'id'
ORDER BY "order" ASC;
```

> **Catatan:** Query di atas untuk referensi. Dalam praktiknya, Payload CMS mengabstraksi query via API — kita tidak menulis SQL langsung.

---

## Migration Strategy

| Aspek | Detail |
|-------|--------|
| Tool | Payload CMS auto-migration (Drizzle) |
| Process | Definisi collection di TypeScript → Payload generate migration → Apply ke Supabase |
| Rollback | Drizzle migration snapshots |
| Seed data | Custom script untuk initial content (FAQ topics, tool guides) |

### Seed Data

Untuk MVP, database akan di-seed dengan data awal:

| Collection | Data Awal |
|------------|-----------|
| Users | 1 admin account |
| FAQ Topics | 6 topik (UBL, Root, Custom ROM, Kernel, Recovery, Magisk) × 2 locale |
| Tool Guides | 4 tools (ADB, UltraViewer, TeamViewer, AnyDesk) × 2 locale |
| Categories | Tutorial, News, Tips & Tricks |
| Blog Posts | 1 artikel contoh: "Install EvolutionX POCO F6" |

---

## Supabase Configuration

| Setting | Value |
|---------|-------|
| Project region | Southeast Asia (Singapore) |
| Database | PostgreSQL 15+ |
| Connection | Direct: `postgresql://...` |
| Pooler | Transaction mode (untuk serverless Vercel) |
| Storage | Bucket `versedroid-media` (public read) |
| RLS | Disabled (Payload handles access control) |
| Auth | Not used (Payload has its own auth) |
| Realtime | Not used |

### Connection String

```
# Direct (migration)
postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres

# Pooler (application — Vercel serverless)
postgresql://postgres.[project-ref]:[password]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true
```

---

## Backup & Recovery

| Aspek | Detail |
|-------|--------|
| Automated backup | Supabase daily backups (free tier: 7 days retention) |
| Point-in-time | Supabase Pro plan (jika upgrade) |
| Export | `pg_dump` via Supabase dashboard |
| Media backup | Supabase Storage = separate backup cycle |
