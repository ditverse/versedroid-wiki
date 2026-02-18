# PRD Frontend — Versedroid Wiki

## Overview
Website wiki edukasi seputar *oprek* Android untuk bisnis Versedroid. Fokus pada konten edukatif dengan pendekatan **silent selling**.

## Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Framework | **Next.js 16** (App Router, latest) |
| Styling | **Tailwind CSS** + **shadcn/ui** |
| Font | **Plus Jakarta Sans** (Google Fonts) |
| i18n | **next-intl** (Bahasa Indonesia + English) |
| Deploy | **Vercel** (domain default) |

---

## Design System

### Color Palette (Dark Theme)

| Token | Warna | Penggunaan |
|-------|-------|------------|
| `--bg-primary` | `#0A0A0F` | Background utama |
| `--bg-secondary` | `#12121A` | Card, sidebar, panel |
| `--bg-tertiary` | `#1A1A27` | Hover, selected items |
| `--border` | `#2A2A3A` | Border, separator |
| `--text-primary` | `#EAEAF0` | Teks utama |
| `--text-secondary` | `#8888A0` | Teks pendukung |
| `--accent` | `#00E599` | Accent (hijau elektrik Android) |
| `--accent-glow` | `#00E599` + blur | Glow effect |
| `--danger` | `#FF4D6A` | Warning, risiko |
| `--info` | `#3B82F6` | Info callout |
| `--warning` | `#F59E0B` | Caution callout |

### Typography

| Penggunaan | Spec |
|------------|------|
| Logo | Plus Jakarta Sans, Bold, monospace-look "versedroid." |
| Headings | Plus Jakarta Sans, Bold (700/800) |
| Body | Plus Jakarta Sans, Regular (400) |
| Code/Command | JetBrains Mono |

### Animasi & Micro-interactions

| Elemen | Animasi |
|--------|---------|
| Page load | Content fade-in + stagger (50ms delay) |
| Scroll reveal | Sections slide-up saat masuk viewport |
| Sidebar active | Smooth accent bar slide |
| TOC scroll spy | Smooth highlight transition |
| Cards hover | Subtle lift (-2px) + border accent |
| Code blocks | Copy button → "Copied ✓" feedback |
| Callout boxes | Left border + subtle background tint |
| Accordion FAQ | Smooth height + rotate chevron |
| Nav link hover | Underline slide-in dari kiri |

---

## Halaman & Layout

### Navbar (Global)

```
┌────────────────────────────────────────────────────────────┐
│  versedroid.          FAQ   Tools   Blog          🌐 ID/EN │
└────────────────────────────────────────────────────────────┘
```

- Logo text "versedroid." di kiri
- Nav links: FAQ, Tools, Blog
- Language switcher (ID/EN) di kanan
- Sticky on scroll, backdrop blur

### Footer (Global)

```
┌────────────────────────────────────────────────────────────┐
│  versedroid.                                               │
│                                                            │
│  FAQ                    Blog           Social              │
│  • Unlock Bootloader    • Terbaru      • Instagram         │
│  • Root                 • Popular      • YouTube           │
│  • Custom ROM                                              │
│  • Custom Kernel                                           │
│                                                            │
│  © 2026 versedroid. All rights reserved.                   │
└────────────────────────────────────────────────────────────┘
```

---

### 1. Landing Page (`/`)

**Konsep:** Dark, immersive, scroll-driven. Silent selling — murni edukatif.

**Sections (4 total):**

#### Hero Section
```
│  Unlock the Full Potential                               │
│      of Your Android.                                    │
│                                                          │
│  Pelajari seni oprek Android — dari unlock bootloader    │
│  hingga custom ROM, dengan panduan lengkap               │
│  dan tools yang tepat.                                   │
│                                                          │
│  [📖 Mulai Belajar]  [🛠 Lihat Tools]                    │
│                                                          │
│  ░░░░░░▓▓▓▓▓▓░░░░░░  ← gradient glow                   │
```
- Tagline besar, 2 CTA button (link ke FAQ & Tools)
- Background gradient glow effect

#### Apa Itu Oprek?
- Penjelasan edukatif dalam card/block teks
- Copywriting singkat dan accessible

#### Before & After
```
│  ┌─────────────────┐    ┌─────────────────┐             │
│  │  ❌ BEFORE OPREK │    │  ✅ AFTER OPREK  │             │
│  │  • Bloatware    │    │  • Bersih       │             │
│  │  • Baterai boros│    │  • Baterai awet │             │
│  │  • Lambat       │    │  • Optimal      │             │
│  │  • Terbatas     │    │  • Tak terbatas │             │
│  │  • Tidak update │    │  • Update terus │             │
│  └─────────────────┘    └─────────────────┘             │
```
- 2 cards: merah (before) vs hijau/glow (after)
- Slide-in animation saat scroll

#### Jenis Oprek
```
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │ 🔓 UBL   │ │ 🌱 Root  │ │ 💿 ROM   │ │ ⚡ Kernel│   │
│  │ Langkah  │ │ Akses    │ │ Ganti OS │ │ Optimasi │   │
│  │ pertama  │ │ penuh    │ │ Android  │ │ hardware │   │
│  │ Baca →   │ │ Baca →   │ │ Baca →   │ │ Baca →   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
```
- 4 cards, link ke FAQ pages masing-masing
- Hover: lift + accent border glow

---

### 2. FAQ Pages — Wiki Documentation Style

**Layout:** 3-kolom (Next.js docs style)

#### FAQ Index (`/faq`)
- Grid cards semua topik FAQ
- Setiap card: icon, judul, deskripsi singkat, link

#### FAQ Detail (`/faq/[slug]`)
```
┌───────────┬──────────────────────────────┬────────────┐
│           │                              │            │
│ SIDEBAR   │  KONTEN UTAMA                │ ON THIS    │
│           │                              │ PAGE (TOC) │
│ Dasar     │  # Unlock Bootloader         │            │
│ ├ Oprek?  │                              │ • Apa itu  │
│ └ Istilah │  ## Apa itu UBL?             │ • Cara     │
│           │  Penjelasan...               │   kerja    │
│ Topik     │                              │ • Kelebihan│
│ ┝━ UBL ━━━│  ┌──────────────────────┐    │ • Risiko   │
│ ├ Root    │  │ 💡 INFO              │    │ • FAQ      │
│ ├ Custom  │  │ Setiap brand...      │    │            │
│ │ ROM     │  └──────────────────────┘    │ ← scroll   │
│ ├ Custom  │                              │   spy      │
│ │ Kernel  │  ## Kelebihan                │   active   │
│ ├ Recovery│  - Bisa install custom ROM   │   heading  │
│ └ Magisk  │  - Bisa root perangkat       │            │
│           │                              │            │
│           │  ## Risiko                   │            │
│           │  ┌──────────────────────┐    │            │
│           │  │ ⚠️ WARNING           │    │            │
│           │  │ UBL menghapus data   │    │            │
│           │  └──────────────────────┘    │            │
│           │                              │            │
│           │  ## FAQ (accordion)          │            │
│           │  ▶ Apakah UBL bisa relock?   │            │
│           │                              │            │
│           │  ┌──────────┬──────────┐     │            │
│           │  │ ← Prev   │ Next →   │     │            │
│           │  └──────────┴──────────┘     │            │
└───────────┴──────────────────────────────┴────────────┘
```

**Komponen khusus FAQ:**
- Sidebar navigasi (sticky, collapsible categories)
- Table of Contents / "On This Page" (sticky, scroll spy)
- Breadcrumbs (`Home > FAQ > Unlock Bootloader`)
- Callout boxes (Info 💡, Warning ⚠️, Danger 🚨, Tip ✅)
- FAQ accordion (expand/collapse)
- Prev/Next article navigation

---

### 3. Tools Pages — Wiki Documentation Style

**Layout:** Sama 3-kolom seperti FAQ

#### Tools Index (`/tools`)
- Grid cards semua tools
- Grouped by category (Remote Tools, Android Tools)

#### Tools Detail (`/tools/[slug]`)
Sama seperti FAQ detail, dengan elemen tambahan:

| Elemen Khusus | Detail |
|---------------|--------|
| Specs table | System requirements (OS, RAM, disk) |
| Download button | Prominent, dengan versi |
| Step-by-step cards | Numbered steps + vertical connector |
| Host/Client tabs | Tab switcher untuk 2 sisi panduan |
| Code blocks | Terminal commands + copy button |

```
│  ## Penggunaan                               │
│                                              │
│  ┌──────────┬──────────┐                     │
│  │ 🖥 HOST  │ 📱CLIENT │  ← tab switcher     │
│  ├──────────┴──────────┤                     │
│  │ Panduan sisi Host   │                     │
│  │ atau Client...      │                     │
│  └─────────────────────┘                     │
```

---

### 4. Blog Pages

#### Blog Index (`/blog`)
```
│  # Blog                                                  │
│  [Semua │ Tutorial │ News │ Tips & Tricks]  ← filter     │
│                                                          │
│  ┌────────────────────────┐  ┌──────────────────┐       │
│  │ Cover Image (wide)     │  │ 📌 FEATURED      │       │
│  │ Tutorial • 8 min read  │  │ ┌────────────┐   │       │
│  │ Title artikel utama    │  │ │ Cover      │   │       │
│  │ Excerpt...             │  │ └────────────┘   │       │
│  │ Feb 2026 • versedroid  │  │ Title...         │       │
│  └────────────────────────┘  └──────────────────┘       │
│  ┌───────────┐ ┌───────────┐                            │
│  │ Card      │ │ Card      │  ← grid cards              │
│  └───────────┘ └───────────┘                            │
```

#### Blog Detail (`/blog/[slug]`)
- Cover image header
- Meta info (author, date, reading time, tags)
- Auto-generated TOC
- Rich content (gambar, code blocks, callouts)
- Share buttons
- Related posts section

---

## Responsive Breakpoints

| Breakpoint | Perubahan |
|------------|-----------|
| Desktop (>1280px) | Full 3-kolom layout |
| Tablet (768-1280px) | 2-kolom (sidebar + content), TOC jadi dropdown |
| Mobile (<768px) | 1-kolom, sidebar jadi hamburger, TOC hidden |

---

## Komponen shadcn/ui yang Digunakan

| Komponen | Penggunaan |
|----------|------------|
| `Button` | CTA, download, navigasi |
| `Card` | Content cards, jenis oprek |
| `Accordion` | FAQ collapsible |
| `Tabs` | Host/Client switcher, blog filter |
| `Badge` | Tags, categories, status |
| `Sheet` | Mobile sidebar |
| `Breadcrumb` | Navigation breadcrumbs |
| `NavigationMenu` | Navbar |
| `DropdownMenu` | Language switcher |
| `Separator` | Content dividers |

---

## Internasionalisasi (i18n)

| Aspek | Detail |
|-------|--------|
| Library | `next-intl` |
| Bahasa | Bahasa Indonesia (`id`), English (`en`) |
| Default | Bahasa Indonesia |
| URL Pattern | `/id/faq/...`, `/en/faq/...` |
| Switcher | Dropdown di navbar |
| Content | Konten CMS: locale per entry di database |
| UI Strings | File JSON: `messages/id.json`, `messages/en.json` |

---

## SEO Requirements

| Aspek | Implementasi |
|-------|-------------|
| Meta tags | Title, description, og:image per halaman |
| Structured data | JSON-LD: `FAQPage`, `HowTo`, `Article` schema |
| Sitemap | Auto-generated `sitemap.xml` via Next.js |
| Robots | `robots.txt` configuration |
| Performance | ISR/SSG, image optimization via `next/image` |
| URL | Clean slugs, canonical URLs |
| Heading | Single H1 per page, proper H2-H6 hierarchy |
| Internal linking | Cross-link FAQ ↔ Tools ↔ Blog |
