# PRD: versedroid.my.id — Full Site Redesign
Version : 2.0
Tanggal : April 2026
Scope   : Landing Page · /faq · /tools · /blog
Stack   : Next.js · CMS-driven content · Tailwind CSS


---
## 1. Konteks & Tujuan
---

versedroid.my.id adalah wiki oprek Android berbahasa Indonesia. Situs
dibangun di Next.js dengan CMS sebagai sumber konten — artinya layout
dan komponen harus adaptif terhadap data yang masuk, bukan hardcoded.

Redesign ini bertujuan untuk:
  - Menerapkan visual identity baru yang clean dan typography-first
  - Menyeragamkan struktur dan tone di semua halaman
  - Memastikan semua halaman siap menerima konten CMS secara dinamis
  - Tidak mengubah CMS schema, routing, atau infrastruktur yang ada


---
## 2. Design System
---

Design system ini berlaku global untuk semua halaman.

### 2.1 Warna
  Background utama : #0C0C0C
  Surface / card   : #0F0F0F
  Border           : #1A1A1A
  Border hover     : #2A2A2A
  Teks primer      : #F0EEE6
  Teks sekunder    : #888888
  Teks muted       : #555555
  Accent           : #4CAF6A
  Accent surface   : #1A2E1A
  Warning          : #CA8A04
  Warning surface  : #2E2A1A
  Neutral badge    : #1E1E1E / #666

### 2.2 Tipografi
  Display  : DM Serif Display — headline section, hero, card title besar
  Body     : DM Sans — semua body copy, label, UI teks
  Mono     : DM Mono — terminal block, code snippet, command

  Hierarchy:
    H1 (hero)       : DM Serif Display, ~52px, letter-spacing -0.03em
    H2 (section)    : DM Serif Display, ~36px, letter-spacing -0.025em
    H3 (card title) : DM Serif Display, ~18px
    Body            : DM Sans 300–400, 14–15px, line-height 1.7
    Label / eyebrow : DM Sans 500, 11px, uppercase, letter-spacing 0.1em
    Mono            : DM Mono 400, 12.5px

### 2.3 Komponen Global

  Navbar (sticky)
    - Brand wordmark: "versedroid." dengan titik accent hijau
    - Nav links: Home · FAQ · Tools · Blog
    - Active state: warna #F0EEE6, sisanya #666
    - Language toggle di ujung kanan
    - Background #0C0C0C dengan border-bottom #1A1A1A

  Announcement Bar
    - CMS-driven: jika tidak ada data, tidak dirender
    - Dismissable dengan localStorage
    - Pill badge "Baru" + teks pendek

  Footer
    - 4 kolom: Brand tagline · FAQ links · Blog links · Social links
    - Border-top #1A1A1A
    - Copyright + "Made in Bandung." di bawah

  Card style standar
    - Background #0F0F0F, border 1px solid #1A1A1A
    - Border-radius 12px
    - Hover: border-color #2A2A2A
    - Padding 24px

  Badge / pill
    - Wajib Pertama : bg #1A2E1A, color #4CAF6A
    - Lanjutan      : bg #2E2A1A, color #CA8A04
    - Opsional      : bg #1E1E1E, color #666
    - Kategori blog : style serupa, per topik

  Divider antar section: border-top 1px solid #1A1A1A, margin horizontal 40px

  Spacing section: padding vertikal 72px desktop, 48px mobile

### 2.4 Responsive Breakpoints
  Mobile  < 768px  : 1 kolom, hero stacked
  Tablet  768–1024 : 2 kolom adaptif
  Desktop > 1024px : layout penuh, max-width 1100px centered


---
## 3. Landing Page ( / )
---

### Urutan Section
  [1] Announcement Bar — CMS-driven, dismissable
  [2] Navbar
  [3] Hero
  [4] Kenapa Oprek? — 4 benefit cards
  [5] Pilih Jalur — 5 route cards
  [6] Artikel Terbaru — 3 card dari Blog CMS
  [7] Footer

### Hero (2-kolom: copy kiri, terminal kanan)
  Eyebrow   : "Wiki Oprek Android" — uppercase, accent green
  Headline  : "Kuasai Potensi Penuh Android Kamu."
               — italic emphasis pada kata "Penuh", accent green
  Subline   : "Panduan oprek terstruktur — dari Unlock Bootloader sampai
               Custom ROM. Ditulis untuk manusia, bukan robot."
  CTA       : Primary "Mulai Oprek →" + Ghost "Download Tools"
  Brand strip: "Tersedia untuk" + pills: Xiaomi · Samsung · Pixel ·
               Realme · OnePlus

  Terminal block (kanan):
    - Dark card dengan dot bar (merah/kuning/hijau muted)
    - Menampilkan simulasi ADB + fastboot command
    - Cursor blink animation CSS
    - Font DM Mono

### Section Kenapa Oprek?
  Label   : "Kenapa Oprek?"
  Judul   : "Ambil kembali kendali perangkatmu."
  Subtext : 1 kalimat konteks singkat
  Grid    : 4 kolom, border-gapped (1px background trick)

  Cards (4):
    Performa : "CPU & GPU Tanpa Throttle"
    Privasi  : "Kontrol Penuh Data"
    Baterai  : "Battery Life Optimal"
    Fitur    : "OS Terbaru, Hardware Lama"
  Tiap card: SVG icon 16px (no emoji), judul, deskripsi 1–2 kalimat

### Section Pilih Jalur
  Label  : "Mulai dari Mana?"
  Judul  : "Pilih titik mulaimu."
  Grid   : 3-kolom, Unlock Bootloader span 2 kolom (featured)

  Cards (5): judul · badge difficulty · deskripsi 1 kalimat · CTA link
    Unlock Bootloader : badge "Wajib Pertama", featured (span 2)
    Root Access       : badge "Lanjutan"
    Custom ROM        : badge "Lanjutan"
    Custom Kernel     : badge "Lanjutan"
    Magisk Modules    : badge "Opsional"

  Jika halaman tujuan belum ada: CTA di-disable + tooltip "Segera hadir"

### Section Artikel Terbaru
  Label  : "Dari Blog"
  Judul  : "Artikel terbaru."
  Grid   : 3 card horizontal
  Data   : Fetch 3 artikel terbaru dari CMS Blog (judul, tanggal,
           kategori, reading time)
  Jika CMS kosong: section tidak dirender (conditional render)

  Card: thumbnail placeholder berupa colored surface · kategori badge
        · tanggal & reading time · judul · excerpt singkat


---
## 4. FAQ ( /faq )
---

### Tujuan Halaman
  Hub navigasi panduan — user datang lalu diarahkan ke artikel yang
  tepat berdasarkan level dan topik, bukan listing flat tanpa konteks.

### Urutan Section
  [1] Navbar
  [2] Page Header
  [3] Filter / Kategori
  [4] Article Grid
  [5] Footer

### Page Header
  Eyebrow : "Panduan"
  Judul   : "Dari mana kamu mau mulai?"
  Subtext : "Bingung mulai dari mana? Mulai dari Unlock Bootloader —
             satu langkah yang membuka semua pintu modifikasi."

### Filter / Kategori
  Pill tabs horizontal: Semua · Pemula · Lanjutan · Per Brand
  State aktif: bg #4CAF6A, text #0C0C0C
  State default: border #1A1A1A, text #666
  Filter ini bekerja secara client-side (tidak butuh reload)

### Article Grid
  Layout  : 3-kolom desktop, 2-kolom tablet, 1-kolom mobile
  Card    : icon atau emoji kategori · judul · deskripsi 1 kalimat
            · badge difficulty · "Baca →"
  Data    : CMS-driven, semua artikel dari CMS FAQ tampil di sini
  Sorting : Urutkan artikel "Wajib Pertama" muncul di atas secara default

### Empty State
  Jika CMS FAQ kosong: tampilkan ilustrasi minimal + teks
  "Panduan sedang ditulis. Cek lagi sebentar."


---
## 5. Tools ( /tools )
---

### Tujuan Halaman
  Direktori tools yang dibutuhkan untuk oprek — user bisa langsung
  tahu apa yang perlu didownload berdasarkan kebutuhan dan OS mereka.

### Urutan Section
  [1] Navbar
  [2] Page Header
  [3] Filter OS
  [4] Tools Grid per Kategori
  [5] Footer

### Page Header
  Eyebrow : "Tools"
  Judul   : "Semua yang kamu butuhkan untuk mulai."
  Subtext : "Dari ADB sampai flashing tool. Dikelompokkan berdasarkan
             fungsi, bukan urutan abjad."

### Filter OS
  Pill tabs: Semua · Windows · macOS · Linux
  Client-side filter, tidak reload

### Tools Grid per Kategori
  Kategori dipisah dengan section label (eyebrow style):
    - Android Tools (ADB, Fastboot, Magisk, TWRP, dll)
    - Remote / Flashing Tools (MTK Client, Odin, SP Flash Tool, dll)
    - Online Tools (Android Flash Tool, dll)

  Card tiap tool:
    - Judul tool
    - Deskripsi fungsi 1 kalimat
    - OS badge (Windows · macOS · Linux — bisa kombinasi)
    - Versi terakhir + tanggal update (CMS-driven)
    - Tombol "Download" atau "Buka" (link eksternal)

  Data: CMS-driven sepenuhnya. Section kategori tetap dirender
  meski kosong hanya jika ada header — jika tidak ada data di
  kategori tersebut, section tidak dirender.

### Empty State per Kategori
  Jika tidak ada tool di kategori: section dihide, bukan ditampilkan
  kosong.


---
## 6. Blog ( /blog )
---

### Tujuan Halaman
  Index artikel — user bisa browse, filter, dan menemukan artikel
  yang relevan. Desain harus mendukung satu artikel sampai puluhan
  artikel tanpa pecah layoutnya.

### Urutan Section
  [1] Navbar
  [2] Featured Article (artikel pertama / pinned)
  [3] Filter Kategori
  [4] Article Grid
  [5] Footer

### Featured Article
  Ambil 1 artikel terbaru atau yang di-pin di CMS
  Layout full-width: thumbnail surface besar · kategori badge
  · judul besar (DM Serif Display, ~32px) · excerpt · meta
  Jika tidak ada artikel: section ini tidak dirender

### Filter Kategori
  Pill tabs: Semua · Tutorial · Tips & Tricks · News
  Client-side filter

### Article Grid
  Layout : 3-kolom desktop, 2-kolom tablet, 1-kolom mobile
  Card   : thumbnail surface · kategori badge · tanggal · reading time
           · judul · excerpt 2 baris

  Thumbnail: jika CMS menyediakan gambar, tampilkan. Jika tidak,
  gunakan colored surface dengan label kategori sebagai fallback —
  jangan broken image.

### Empty State
  Jika CMS Blog kosong: teks "Belum ada artikel. Segera hadir."
  tanpa menampilkan grid kosong.

### Bug yang harus difix sebelum redesign
  Footer saat ini render sebelum konten blog karena masalah DOM
  order di RSC streaming. Fix ini adalah prerequisite — cek
  urutan Suspense boundary atau layout.tsx.


---
## 7. Acceptance Criteria Global
---

  [AC-01] Semua halaman menggunakan font DM Serif Display + DM Sans + DM Mono
  [AC-02] Warna dan spacing konsisten dengan design system di §2
  [AC-03] Navbar sticky dengan active state yang visible di semua halaman
  [AC-04] Announcement bar tidak dirender jika CMS tidak ada data
  [AC-05] Semua card dan section grid adaptif terhadap jumlah konten CMS
  [AC-06] Empty state tersedia di semua halaman yang data-nya dari CMS
  [AC-07] Tidak ada broken link ke halaman yang belum ada
  [AC-08] DOM order bug di /blog difix sebelum redesign diterapkan
  [AC-09] Semua halaman responsif di tiga breakpoint (§2.4)
  [AC-10] Tidak ada emoji di markup — gunakan SVG icon atau badge

---
## 8. Out of Scope
---

  - Halaman baru (/brands, /getting-started) — backlog terpisah
  - SEO teknikal (sitemap, structured data, meta dinamis)
  - Performa & bundle optimization
  - Fitur baru (search, auth, komentar)
  - Perubahan CMS schema

---
EOF