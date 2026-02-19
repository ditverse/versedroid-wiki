/**
 * Seed script: Migrates hardcoded data.ts content into Supabase database.
 * 
 * Run: npx tsx scripts/seed.ts
 * 
 * Requires: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as path from "path";

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
}

// Use service role to bypass RLS
const supabase = createClient(supabaseUrl, serviceRoleKey);

// ─────────────────────────────────────────────────────
// FAQ Data (copied from src/features/faq/data.ts)
// ─────────────────────────────────────────────────────

const faqCategorySeed = [
    {
        key: "dasar",
        sort_order: 0,
        translations: {
            id: "Dasar",
            en: "Basic",
        },
    },
    {
        key: "topik",
        sort_order: 1,
        translations: {
            id: "Topik",
            en: "Topics",
        },
    },
];

const faqArticleSeed = [
    {
        slug: "apa-itu-oprek",
        icon: "📱",
        category_key: "dasar",
        sort_order: 0,
        translations: {
            id: {
                title: "Apa itu Oprek?",
                description: "Pengenalan dunia oprek Android dan manfaatnya.",
                content: [
                    { type: "heading", text: "Apa itu Oprek Android?", id: "pengertian" },
                    { type: "paragraph", text: "Oprek Android adalah istilah yang digunakan untuk mendeskripsikan proses modifikasi perangkat Android melampaui batasan yang ditetapkan produsen. Ini meliputi unlock bootloader, root, install custom ROM, kernel, dan berbagai modifikasi lainnya." },
                    { type: "heading", text: "Apakah Oprek Legal?", id: "legalitas" },
                    { type: "paragraph", text: "Di Indonesia, oprek Android tidak melanggar hukum. Kamu memiliki hak untuk memodifikasi perangkat yang kamu beli. Namun, oprek dapat membatalkan garansi resmi dari produsen." },
                ],
                faq_items: [
                    { question: "Apakah oprek berbahaya?", answer: "Jika dilakukan dengan benar dan mengikuti panduan, risiko minimal. Yang penting: selalu backup data, gunakan tools yang terpercaya, dan ikuti instruksi dengan teliti." },
                ],
            },
            en: {
                title: "What is Modding?",
                description: "Introduction to the world of Android modding and its benefits.",
                content: [
                    { type: "heading", text: "What is Android Modding?", id: "pengertian" },
                    { type: "paragraph", text: "Android modding is a term used to describe the process of modifying an Android device beyond the limitations set by the manufacturer. This includes unlocking the bootloader, rooting, installing custom ROMs, kernels, and various other modifications." },
                    { type: "heading", text: "Is Modding Legal?", id: "legalitas" },
                    { type: "paragraph", text: "In Indonesia, modding Android is not against the law. You have the right to modify the device you purchased. However, modding may void the official warranty from the manufacturer." },
                ],
                faq_items: [
                    { question: "Is modding dangerous?", answer: "If done correctly and following guides, the risk is minimal. The important things: always backup your data, use trusted tools, and follow instructions carefully." },
                ],
            },
        },
    },
    {
        slug: "istilah-oprek",
        icon: "📖",
        category_key: "dasar",
        sort_order: 1,
        translations: {
            id: {
                title: "Istilah Oprek",
                description: "Glosarium istilah-istilah penting dalam oprek Android.",
                content: [
                    { type: "heading", text: "Glosarium Istilah Oprek", id: "glosarium" },
                    { type: "list", items: ["Bootloader — program pertama yang berjalan saat perangkat menyala", "Root — akses superuser ke sistem Android", "ROM — Read-Only Memory, merujuk pada firmware/OS", "Kernel — inti sistem operasi yang mengelola hardware", "Recovery — mode khusus untuk maintenance sistem", "Flash — proses menulis firmware/file ke penyimpanan perangkat", "Brick — kondisi perangkat tidak bisa boot (soft brick vs hard brick)", "Nandroid — full backup partisi sistem", "ADB — Android Debug Bridge, tool komunikasi PC-Android", "Fastboot — protokol untuk modifikasi partisi saat bootloader aktif"] },
                ],
                faq_items: [
                    { question: "Apa bedanya soft brick dan hard brick?", answer: "Soft brick: perangkat masih bisa masuk recovery/fastboot dan bisa diperbaiki. Hard brick: perangkat sama sekali tidak merespon — sangat jarang terjadi dan biasanya butuh metode advanced untuk diperbaiki." },
                ],
            },
            en: {
                title: "Modding Terms",
                description: "Glossary of important terms in Android modding.",
                content: [
                    { type: "heading", text: "Modding Terms Glossary", id: "glosarium" },
                    { type: "list", items: ["Bootloader — the first program that runs when the device powers on", "Root — superuser access to the Android system", "ROM — Read-Only Memory, refers to firmware/OS", "Kernel — the core of the operating system that manages hardware", "Recovery — special mode for system maintenance", "Flash — the process of writing firmware/files to device storage", "Brick — a condition where the device cannot boot (soft brick vs hard brick)", "Nandroid — full backup of system partitions", "ADB — Android Debug Bridge, PC-Android communication tool", "Fastboot — protocol for modifying partitions when bootloader is active"] },
                ],
                faq_items: [
                    { question: "What's the difference between soft brick and hard brick?", answer: "Soft brick: the device can still enter recovery/fastboot and can be repaired. Hard brick: the device doesn't respond at all — very rare and usually requires advanced methods to fix." },
                ],
            },
        },
    },
    {
        slug: "unlock-bootloader",
        icon: "🔓",
        category_key: "topik",
        sort_order: 2,
        translations: {
            id: {
                title: "Unlock Bootloader",
                description: "Langkah pertama membuka akses modifikasi perangkat Android.",
                content: [
                    { type: "heading", text: "Apa itu Unlock Bootloader?", id: "apa-itu-ubl" },
                    { type: "paragraph", text: "Unlock Bootloader (UBL) adalah proses membuka kunci keamanan pada bootloader perangkat Android. Bootloader adalah program pertama yang berjalan saat perangkat dinyalakan, dan secara default dikunci oleh produsen untuk mencegah modifikasi sistem." },
                    { type: "heading", text: "Cara Kerja Bootloader", id: "cara-kerja" },
                    { type: "paragraph", text: "Bootloader memverifikasi integritas sistem operasi sebelum memuatnya. Ketika bootloader dikunci, hanya firmware resmi yang diizinkan untuk boot. Dengan membuka kunci, kamu memungkinkan perangkat untuk menjalankan firmware custom." },
                    { type: "callout", variant: "info", title: "Perlu Diketahui", text: "Setiap brand memiliki prosedur UBL yang berbeda. Xiaomi memerlukan permohonan melalui Mi Unlock Tool, Samsung menggunakan mode OEM Unlock, dan Google Pixel bisa langsung via fastboot." },
                    { type: "heading", text: "Kelebihan Unlock Bootloader", id: "kelebihan" },
                    { type: "list", items: ["Bisa install custom recovery (TWRP, OrangeFox)", "Bisa install custom ROM", "Bisa melakukan root dengan Magisk", "Bisa memodifikasi partisi sistem", "Kontrol penuh atas perangkat"] },
                    { type: "heading", text: "Risiko", id: "risiko" },
                    { type: "callout", variant: "warning", title: "Peringatan", text: "Proses unlock bootloader akan menghapus semua data (factory reset). Pastikan backup data penting sebelum memulai." },
                    { type: "list", items: ["Garansi resmi bisa hangus", "Perangkat lebih rentan terhadap malware jika tidak hati-hati", "Beberapa aplikasi banking mungkin tidak berjalan (bisa diatasi dengan Magisk Hide)", "Risiko brick jika proses gagal"] },
                    { type: "heading", text: "Langkah-langkah UBL", id: "langkah-langkah" },
                    { type: "paragraph", text: "Berikut langkah umum untuk unlock bootloader. Detail spesifik berbeda per brand." },
                    { type: "code", language: "bash", code: "# Aktifkan Developer Options\n# Settings > About Phone > Tap Build Number 7x\n\n# Aktifkan OEM Unlocking\n# Settings > Developer Options > OEM Unlocking\n\n# Reboot ke Fastboot Mode\nadb reboot bootloader\n\n# Unlock Bootloader\nfastboot flashing unlock" },
                    { type: "callout", variant: "danger", title: "Penting", text: "Jangan pernah mencabut kabel USB atau mematikan perangkat selama proses unlock berlangsung. Hal ini dapat menyebabkan brick." },
                ],
                faq_items: [
                    { question: "Apakah UBL bisa di-relock?", answer: "Ya, kebanyakan perangkat mendukung relocking bootloader melalui perintah `fastboot flashing lock`. Namun, pastikan kamu sudah kembali ke firmware stock sebelum relock untuk menghindari bootloop." },
                    { question: "Apakah UBL menghapus data?", answer: "Ya, proses unlock bootloader akan melakukan factory reset otomatis. Semua data, aplikasi, dan pengaturan akan terhapus." },
                    { question: "Berapa lama proses UBL?", answer: "Proses unlock sendiri hanya beberapa detik. Namun untuk beberapa brand seperti Xiaomi, kamu perlu menunggu periode waiting time (biasanya 7-14 hari) setelah mengajukan permohonan." },
                ],
            },
            en: {
                title: "Unlock Bootloader",
                description: "The first step to unlocking modification access on your Android device.",
                content: [
                    { type: "heading", text: "What is Unlock Bootloader?", id: "apa-itu-ubl" },
                    { type: "paragraph", text: "Unlock Bootloader (UBL) is the process of unlocking the security on the bootloader of an Android device." },
                ],
                faq_items: [
                    { question: "Can UBL be relocked?", answer: "Yes, most devices support relocking bootloader via `fastboot flashing lock`." },
                ],
            },
        },
    },
    {
        slug: "root",
        icon: "🌱",
        category_key: "topik",
        sort_order: 3,
        translations: {
            id: {
                title: "Root",
                description: "Dapatkan akses penuh ke sistem operasi Android.",
                content: [
                    { type: "heading", text: "Apa itu Root?", id: "apa-itu-root" },
                    { type: "paragraph", text: "Root adalah proses mendapatkan akses superuser (hak administrator) pada perangkat Android. Dengan root, kamu mendapatkan kontrol penuh terhadap seluruh sistem operasi, termasuk area yang biasanya dibatasi oleh produsen." },
                    { type: "heading", text: "Kenapa Harus Root?", id: "kenapa-root" },
                    { type: "list", items: ["Menghapus bloatware bawaan yang tidak bisa dihapus", "Menggunakan aplikasi yang memerlukan akses root (Titanium Backup, AdAway)", "Modifikasi tampilan sistem secara mendalam", "Overclock atau underclock CPU", "Full backup sistem termasuk app data"] },
                    { type: "callout", variant: "tip", title: "Tips", text: "Magisk adalah metode root paling populer saat ini karena bersifat systemless — tidak mengubah partisi sistem secara langsung." },
                    { type: "heading", text: "Risiko Root", id: "risiko-root" },
                    { type: "callout", variant: "warning", title: "Peringatan", text: "Root memberikan akses penuh ke sistem. Aplikasi root yang berbahaya bisa merusak perangkat. Hanya install aplikasi dari sumber terpercaya." },
                ],
                faq_items: [
                    { question: "Apakah root bisa di-unroot?", answer: "Ya, Magisk menyediakan opsi Uninstall yang mengembalikan perangkat ke keadaan unroot tanpa harus flash ulang." },
                    { question: "Apakah semua HP bisa di-root?", answer: "Secara teknis, hampir semua perangkat Android bisa di-root. Namun kemudahannya bervariasi tergantung brand dan model. Perangkat dengan bootloader terbuka lebih mudah di-root." },
                ],
            },
            en: {
                title: "Root",
                description: "Get full access to the Android operating system.",
                content: [
                    { type: "heading", text: "What is Root?", id: "apa-itu-root" },
                    { type: "paragraph", text: "Root is the process of gaining superuser access on an Android device." },
                ],
                faq_items: [
                    { question: "Can root be undone?", answer: "Yes, Magisk provides an Uninstall option." },
                ],
            },
        },
    },
    {
        slug: "custom-rom",
        icon: "💿",
        category_key: "topik",
        sort_order: 4,
        translations: {
            id: {
                title: "Custom ROM",
                description: "Ganti OS Android bawaan dengan sistem yang lebih baik.",
                content: [
                    { type: "heading", text: "Apa itu Custom ROM?", id: "apa-itu-custom-rom" },
                    { type: "paragraph", text: "Custom ROM adalah versi modifikasi dari sistem operasi Android yang dibuat oleh developer komunitas. ROM ini biasanya menawarkan fitur tambahan, performa lebih baik, atau tampilan yang berbeda dari ROM bawaan (stock ROM)." },
                    { type: "heading", text: "Custom ROM Populer", id: "custom-rom-populer" },
                    { type: "list", items: ["LineageOS — salah satu ROM paling stabil dan luas dukungan perangkat", "Pixel Experience — UI mirip Google Pixel", "crDroid — kustomisasi tinggi", "Evolution X — Pixel UI dengan customisasi ekstra", "ArrowOS — ringan dan clean"] },
                    { type: "callout", variant: "info", title: "Prasyarat", text: "Sebelum install custom ROM, pastikan bootloader sudah di-unlock dan custom recovery (TWRP) sudah terpasang." },
                ],
                faq_items: [
                    { question: "Apakah custom ROM aman?", answer: "ROM dari developer terpercaya (LineageOS, Pixel Experience) umumnya aman. Selalu download dari sumber resmi dan periksa signature/checksum." },
                    { question: "Apakah bisa kembali ke stock ROM?", answer: "Ya, kamu bisa flash kembali firmware resmi dari produsen menggunakan tool khusus (Mi Flash untuk Xiaomi, Odin untuk Samsung)." },
                ],
            },
            en: {
                title: "Custom ROM",
                description: "Replace the stock Android OS with a better system.",
                content: [
                    { type: "heading", text: "What is Custom ROM?", id: "apa-itu-custom-rom" },
                    { type: "paragraph", text: "Custom ROM is a modified version of the Android operating system created by community developers." },
                ],
                faq_items: [
                    { question: "Is custom ROM safe?", answer: "ROMs from trusted developers are generally safe." },
                ],
            },
        },
    },
    {
        slug: "custom-kernel",
        icon: "⚡",
        category_key: "topik",
        sort_order: 5,
        translations: {
            id: {
                title: "Custom Kernel",
                description: "Optimasi hardware untuk performa dan baterai terbaik.",
                content: [
                    { type: "heading", text: "Apa itu Custom Kernel?", id: "apa-itu-kernel" },
                    { type: "paragraph", text: "Kernel adalah inti dari sistem operasi yang mengontrol komunikasi antara hardware dan software. Custom kernel adalah kernel yang dimodifikasi untuk mengoptimasi performa, baterai, atau fitur tertentu." },
                    { type: "heading", text: "Manfaat Custom Kernel", id: "manfaat" },
                    { type: "list", items: ["CPU governor custom untuk kontrol performa", "I/O scheduler yang lebih efisien", "Overclocking GPU", "Optimasi baterai (deep sleep improvement)", "Dukungan fitur tambahan (KCAL, WireGuard built-in)"] },
                    { type: "callout", variant: "danger", title: "Peringatan", text: "Menggunakan kernel yang tidak kompatibel bisa menyebabkan bootloop atau bahkan kerusakan hardware akibat overclock berlebihan." },
                ],
                faq_items: [
                    { question: "Apakah perlu root untuk install custom kernel?", answer: "Tidak selalu. Kamu bisa flash custom kernel melalui custom recovery (TWRP) tanpa root. Namun untuk konfigurasi lanjutan biasanya butuh root." },
                ],
            },
            en: {
                title: "Custom Kernel",
                description: "Hardware optimization for the best performance and battery.",
                content: [
                    { type: "heading", text: "What is Custom Kernel?", id: "apa-itu-kernel" },
                    { type: "paragraph", text: "Kernel is the core of the operating system that controls communication between hardware and software." },
                ],
                faq_items: [
                    { question: "Do I need root to install custom kernel?", answer: "Not always. You can flash via custom recovery (TWRP) without root." },
                ],
            },
        },
    },
    {
        slug: "custom-recovery",
        icon: "🔄",
        category_key: "topik",
        sort_order: 6,
        translations: {
            id: {
                title: "Custom Recovery",
                description: "Recovery mode advanced untuk flash dan backup sistem.",
                content: [
                    { type: "heading", text: "Apa itu Custom Recovery?", id: "apa-itu-recovery" },
                    { type: "paragraph", text: "Custom recovery menggantikan recovery bawaan perangkat dengan versi yang lebih powerful. Recovery custom seperti TWRP memungkinkan kamu untuk flash file ZIP, membuat full backup (Nandroid), dan mengelola partisi." },
                    { type: "heading", text: "TWRP vs OrangeFox", id: "twrp-vs-orangefox" },
                    { type: "list", items: ["TWRP — paling populer, dukungan device terbanyak", "OrangeFox — UI lebih modern, built-in Magisk installer"] },
                ],
                faq_items: [
                    { question: "Bagaimana cara install TWRP?", answer: "Flash file TWRP .img melalui fastboot menggunakan perintah `fastboot flash recovery twrp.img`, kemudian reboot ke recovery." },
                ],
            },
            en: {
                title: "Custom Recovery",
                description: "Advanced recovery mode for flashing and system backup.",
                content: [
                    { type: "heading", text: "What is Custom Recovery?", id: "apa-itu-recovery" },
                    { type: "paragraph", text: "Custom recovery replaces the stock device recovery with a more powerful version." },
                ],
                faq_items: [
                    { question: "How to install TWRP?", answer: "Flash TWRP .img via fastboot using `fastboot flash recovery twrp.img`." },
                ],
            },
        },
    },
    {
        slug: "magisk",
        icon: "🎭",
        category_key: "topik",
        sort_order: 7,
        translations: {
            id: {
                title: "Magisk",
                description: "Solusi root systemless dengan fitur modul dan hide root.",
                content: [
                    { type: "heading", text: "Apa itu Magisk?", id: "apa-itu-magisk" },
                    { type: "paragraph", text: "Magisk adalah solusi root systemless untuk Android. Artinya Magisk memberikan akses root tanpa mengubah partisi sistem, sehingga lebih aman dan bisa melewati SafetyNet/Play Integrity check." },
                    { type: "heading", text: "Fitur Utama Magisk", id: "fitur-utama" },
                    { type: "list", items: ["Systemless root — tidak mengubah /system", "MagiskHide / Zygisk DenyList — menyembunyikan root dari app tertentu", "Modul Magisk — extend fungsi tanpa modifikasi langsung", "Boot image patching — root via patch boot.img"] },
                    { type: "callout", variant: "tip", title: "Tips", text: "Gunakan Zygisk + Shamiko module untuk menyembunyikan root dari aplikasi banking dan Google Pay." },
                ],
                faq_items: [
                    { question: "Apakah Magisk aman untuk daily driver?", answer: "Ya, Magisk adalah metode root paling aman saat ini. Dengan konfigurasi DenyList yang tepat, perangkat bisa digunakan normal termasuk aplikasi banking." },
                ],
            },
            en: {
                title: "Magisk",
                description: "Systemless root solution with modules and root hiding features.",
                content: [
                    { type: "heading", text: "What is Magisk?", id: "apa-itu-magisk" },
                    { type: "paragraph", text: "Magisk is a systemless root solution for Android." },
                ],
                faq_items: [
                    { question: "Is Magisk safe for daily driver?", answer: "Yes, Magisk is the safest root method currently." },
                ],
            },
        },
    },
];

// ─────────────────────────────────────────────────────
// Tools Data
// ─────────────────────────────────────────────────────

const toolCategorySeed = [
    { key: "remote", sort_order: 0, translations: { id: "Remote Tools", en: "Remote Tools" } },
    { key: "android", sort_order: 1, translations: { id: "Android Tools", en: "Android Tools" } },
];

const toolArticleSeed = [
    {
        slug: "platform-tools", icon: "🔧", category_key: "remote", sort_order: 0,
        download_url: "https://developer.android.com/tools/releases/platform-tools",
        download_version: "35.0.2",
        translations: {
            id: {
                title: "Platform Tools (ADB & Fastboot)",
                description: "Command-line tools untuk komunikasi dengan perangkat Android via USB.",
                content: [
                    { type: "heading", text: "Apa itu Platform Tools?", id: "apa-itu" },
                    { type: "paragraph", text: "Android SDK Platform Tools adalah kumpulan command-line tools yang digunakan untuk berkomunikasi dengan perangkat Android. Package ini berisi ADB (Android Debug Bridge) dan Fastboot — dua tools esensial untuk proses oprek." },
                    { type: "callout", variant: "info", title: "Wajib Punya", text: "Platform Tools adalah prasyarat untuk hampir semua proses oprek. Pastikan tool ini sudah terinstall sebelum mulai." },
                ],
                specs: [{ label: "OS", value: "Windows, macOS, Linux" }, { label: "RAM", value: "2 GB minimum" }, { label: "Disk", value: "~100 MB" }, { label: "Developer", value: "Google" }],
                tabs: [
                    { label: "🖥 Host", steps: [{ title: "Download Platform Tools", description: "Download SDK Platform Tools dari situs resmi Google." }, { title: "Extract ke folder", description: "Extract ZIP ke folder yang mudah diakses, misalnya C:\\platform-tools" }, { title: "Tambahkan ke PATH", description: "Tambahkan folder platform-tools ke environment variable PATH.", code: "# Windows (PowerShell as Admin)\n[Environment]::SetEnvironmentVariable(\"Path\", $env:Path + \";C:\\platform-tools\", \"Machine\")\n\n# macOS / Linux\nexport PATH=$PATH:~/platform-tools" }, { title: "Verifikasi instalasi", description: "Buka terminal baru dan jalankan:", code: "adb version\nfastboot --version" }] },
                    { label: "📱 Client", steps: [{ title: "Aktifkan Developer Options", description: "Settings > About Phone > Tap Build Number 7 kali." }, { title: "Aktifkan USB Debugging", description: "Settings > Developer Options > USB Debugging > ON." }, { title: "Hubungkan ke PC", description: "Sambungkan perangkat dengan kabel USB. Pilih mode 'File Transfer'." }, { title: "Authorize PC", description: "Ketika muncul dialog 'Allow USB debugging?', centang 'Always allow' dan tap OK.", code: "# Verifikasi koneksi dari PC\nadb devices" }] },
                ],
            },
            en: {
                title: "Platform Tools (ADB & Fastboot)",
                description: "Command-line tools for communicating with Android devices via USB.",
                content: [
                    { type: "heading", text: "What are Platform Tools?", id: "apa-itu" },
                    { type: "paragraph", text: "Android SDK Platform Tools is a collection of command-line tools used to communicate with Android devices." },
                ],
                specs: [{ label: "OS", value: "Windows, macOS, Linux" }, { label: "RAM", value: "2 GB minimum" }, { label: "Disk", value: "~100 MB" }, { label: "Developer", value: "Google" }],
                tabs: [
                    { label: "🖥 Host", steps: [{ title: "Download Platform Tools", description: "Download SDK Platform Tools from Google's official site." }] },
                    { label: "📱 Client", steps: [{ title: "Enable Developer Options", description: "Settings > About Phone > Tap Build Number 7 times." }] },
                ],
            },
        },
    },
    {
        slug: "scrcpy", icon: "📺", category_key: "remote", sort_order: 1,
        download_url: "https://github.com/Genymobile/scrcpy/releases",
        download_version: "3.1",
        translations: {
            id: {
                title: "Scrcpy",
                description: "Tampilkan dan kontrol layar Android dari PC, via USB atau wireless.",
                content: [
                    { type: "heading", text: "Apa itu Scrcpy?", id: "apa-itu" },
                    { type: "paragraph", text: "Scrcpy (Screen Copy) adalah tool open-source yang memungkinkan kamu menampilkan dan mengontrol perangkat Android dari PC. Mendukung koneksi USB dan wireless dengan latensi rendah." },
                ],
                specs: [{ label: "OS", value: "Windows, macOS, Linux" }, { label: "RAM", value: "1 GB minimum" }, { label: "Disk", value: "~30 MB" }, { label: "Developer", value: "Genymobile (Open Source)" }],
                tabs: [
                    { label: "🖥 Host", steps: [{ title: "Install scrcpy", description: "Download dari GitHub releases atau install via package manager:", code: "# Windows (via Scoop)\nscoop install scrcpy\n\n# macOS (via Homebrew)\nbrew install scrcpy\n\n# Linux (Snap)\nsnap install scrcpy" }, { title: "Jalankan scrcpy", description: "Pastikan perangkat terhubung via USB:", code: "scrcpy\n\n# Mode wireless\nscrcpy --tcpip" }] },
                    { label: "📱 Client", steps: [{ title: "Aktifkan USB Debugging", description: "Settings > Developer Options > USB Debugging." }, { title: "Hubungkan ke PC", description: "Tidak perlu install apapun di perangkat." }] },
                ],
            },
            en: {
                title: "Scrcpy",
                description: "Display and control Android screen from PC, via USB or wireless.",
                content: [
                    { type: "heading", text: "What is Scrcpy?", id: "apa-itu" },
                    { type: "paragraph", text: "Scrcpy (Screen Copy) is an open-source tool for displaying and controlling your Android device from PC." },
                ],
                specs: [{ label: "OS", value: "Windows, macOS, Linux" }, { label: "RAM", value: "1 GB minimum" }, { label: "Disk", value: "~30 MB" }, { label: "Developer", value: "Genymobile (Open Source)" }],
                tabs: [],
            },
        },
    },
    {
        slug: "magisk", icon: "🎭", category_key: "android", sort_order: 2,
        download_url: "https://github.com/topjohnwu/Magisk/releases",
        download_version: "28.1",
        translations: {
            id: {
                title: "Magisk App",
                description: "Aplikasi root systemless Android, manage modul dan hide root.",
                content: [
                    { type: "heading", text: "Apa itu Magisk App?", id: "apa-itu" },
                    { type: "paragraph", text: "Magisk App adalah aplikasi companion untuk Magisk — root systemless Android. Gunakan app ini untuk manage modul, menyembunyikan root, dan mem-patch boot image." },
                    { type: "heading", text: "Instalasi", id: "instalasi" },
                    { type: "paragraph", text: "Download Magisk APK dari rilisan resmi GitHub, kemudian install di perangkat." },
                    { type: "callout", variant: "warning", title: "Peringatan", text: "Selalu gunakan versi Magisk terbaru dari GitHub resmi. Jangan download dari sumber tidak terpercaya." },
                ],
                specs: [{ label: "OS", value: "Android 6.0+" }, { label: "Prasyarat", value: "Unlocked Bootloader" }, { label: "Disk", value: "~10 MB" }, { label: "Developer", value: "topjohnwu (Open Source)" }],
                tabs: [],
            },
            en: {
                title: "Magisk App",
                description: "Systemless root Android app, manage modules and hide root.",
                content: [
                    { type: "heading", text: "What is Magisk App?", id: "apa-itu" },
                    { type: "paragraph", text: "Magisk App is the companion application for Magisk — systemless root for Android." },
                ],
                specs: [{ label: "OS", value: "Android 6.0+" }, { label: "Prerequisite", value: "Unlocked Bootloader" }, { label: "Disk", value: "~10 MB" }, { label: "Developer", value: "topjohnwu (Open Source)" }],
                tabs: [],
            },
        },
    },
    {
        slug: "lsposed", icon: "🧩", category_key: "android", sort_order: 3,
        download_url: "https://github.com/LSPosed/LSPosed/releases",
        download_version: "1.9.2",
        translations: {
            id: {
                title: "LSPosed",
                description: "Framework Xposed modern untuk modifikasi sistem tanpa mengubah partisi.",
                content: [
                    { type: "heading", text: "Apa itu LSPosed?", id: "apa-itu" },
                    { type: "paragraph", text: "LSPosed adalah framework Xposed modern yang berjalan di atas Zygisk (komponen Magisk). Memungkinkan kamu menginstall modul Xposed untuk modifikasi mendalam tanpa mengubah system partition." },
                    { type: "callout", variant: "tip", title: "Tips", text: "Install LSPosed sebagai modul Magisk melalui Magisk App. Aktifkan Zygisk terlebih dahulu di Settings Magisk." },
                ],
                specs: [{ label: "OS", value: "Android 8.1+" }, { label: "Prasyarat", value: "Magisk + Zygisk" }, { label: "Disk", value: "~5 MB" }, { label: "Developer", value: "LSPosed Team (Open Source)" }],
                tabs: [],
            },
            en: {
                title: "LSPosed",
                description: "Modern Xposed framework for system modification without changing partitions.",
                content: [
                    { type: "heading", text: "What is LSPosed?", id: "apa-itu" },
                    { type: "paragraph", text: "LSPosed is a modern Xposed framework that runs on top of Zygisk (a Magisk component)." },
                ],
                specs: [{ label: "OS", value: "Android 8.1+" }, { label: "Prerequisite", value: "Magisk + Zygisk" }, { label: "Disk", value: "~5 MB" }, { label: "Developer", value: "LSPosed Team (Open Source)" }],
                tabs: [],
            },
        },
    },
];

// ─────────────────────────────────────────────────────
// Blog Data
// ─────────────────────────────────────────────────────

const blogPostSeed = [
    {
        slug: "panduan-lengkap-unlock-bootloader-2026",
        category: "tutorial", read_time: 8, author: "versedroid",
        featured: true, published_at: "2026-02-15T00:00:00Z",
        translations: {
            id: {
                title: "Panduan Lengkap Unlock Bootloader 2026",
                excerpt: "Langkah-langkah detail unlock bootloader untuk semua brand populer: Xiaomi, Samsung, Google Pixel, dan lainnya.",
                content: [
                    { type: "heading", text: "Pendahuluan", id: "pendahuluan" },
                    { type: "paragraph", text: "Unlock bootloader adalah langkah pertama dan paling krusial dalam perjalanan oprek Android. Tanpa unlock bootloader, kamu tidak bisa install custom recovery, custom ROM, atau bahkan melakukan root. Dalam panduan ini, kita akan membahas langkah-langkah detail untuk semua brand populer." },
                    { type: "heading", text: "Persiapan", id: "persiapan" },
                    { type: "list", items: ["Backup semua data penting (foto, dokumen, kontak)", "Charge baterai minimal 50%", "Install Platform Tools (ADB & Fastboot) di PC", "Siapkan kabel USB yang reliable"] },
                    { type: "callout", variant: "warning", title: "Peringatan", text: "Proses unlock bootloader akan menghapus SEMUA data di perangkat. Tidak ada cara untuk menghindari ini." },
                    { type: "heading", text: "Langkah untuk Xiaomi", id: "xiaomi" },
                    { type: "paragraph", text: "Xiaomi memerlukan request unlock melalui Mi Unlock Tool. Prosesnya membutuhkan waktu tunggu 7-14 hari setelah permohonan." },
                    { type: "code", language: "bash", code: "# Setelah mendapat approval dari Mi Unlock\nadb reboot bootloader\n# Gunakan Mi Unlock Tool di PC untuk unlock" },
                    { type: "heading", text: "Langkah untuk Samsung", id: "samsung" },
                    { type: "paragraph", text: "Samsung menggunakan toggle OEM Unlock di Developer Options. Perlu diingat bahwa Samsung akan void garansi KNOX permanent setelah unlock." },
                ],
            },
            en: {
                title: "Complete Guide to Unlock Bootloader 2026",
                excerpt: "Detailed steps to unlock bootloader for all popular brands: Xiaomi, Samsung, Google Pixel, and more.",
                content: [
                    { type: "heading", text: "Introduction", id: "pendahuluan" },
                    { type: "paragraph", text: "Unlocking the bootloader is the first and most crucial step in your Android modding journey." },
                ],
            },
        },
        related_slugs: ["tips-aman-root-android", "review-custom-rom-terbaik-2026"],
    },
    {
        slug: "tips-aman-root-android",
        category: "tips", read_time: 5, author: "versedroid",
        featured: false, published_at: "2026-02-10T00:00:00Z",
        translations: {
            id: {
                title: "Tips Aman Root Android dengan Magisk",
                excerpt: "Panduan root Android yang aman menggunakan Magisk, termasuk tips hide root dan konfigurasi DenyList.",
                content: [
                    { type: "heading", text: "Root dengan Aman", id: "root-aman" },
                    { type: "paragraph", text: "Root Android bisa terasa menakutkan bagi pemula, tapi dengan persiapan yang tepat, prosesnya bisa berjalan tanpa masalah." },
                    { type: "list", items: ["Selalu gunakan Magisk versi terbaru dari repository resmi", "Backup boot.img original sebelum patching", "Aktifkan Zygisk untuk kompatibilitas terbaik", "Konfigurasi DenyList untuk app banking", "Jangan install modul yang tidak kamu pahami"] },
                    { type: "callout", variant: "tip", title: "Pro Tip", text: "Simpan backup boot.img original di cloud storage." },
                ],
            },
            en: {
                title: "Safe Tips for Rooting Android with Magisk",
                excerpt: "Safe Android rooting guide using Magisk, including root hiding tips and DenyList configuration.",
                content: [
                    { type: "heading", text: "Root Safely", id: "root-aman" },
                    { type: "paragraph", text: "Rooting Android can feel intimidating for beginners, but with proper preparation, the process can go smoothly." },
                ],
            },
        },
        related_slugs: ["panduan-lengkap-unlock-bootloader-2026"],
    },
    {
        slug: "review-custom-rom-terbaik-2026",
        category: "news", read_time: 10, author: "versedroid",
        featured: false, published_at: "2026-02-05T00:00:00Z",
        translations: {
            id: {
                title: "Review Custom ROM Terbaik 2026",
                excerpt: "Perbandingan lengkap LineageOS 22, Pixel Experience Plus, crDroid, dan ROM populer lainnya.",
                content: [
                    { type: "heading", text: "Custom ROM Terbaik 2026", id: "intro" },
                    { type: "paragraph", text: "Tahun 2026 membawa banyak perkembangan menarik di dunia custom ROM." },
                    { type: "heading", text: "1. LineageOS 22", id: "lineageos" },
                    { type: "paragraph", text: "LineageOS tetap menjadi pilihan utama bagi mereka yang menginginkan stabilitas." },
                    { type: "heading", text: "2. Pixel Experience Plus", id: "pixel-experience" },
                    { type: "paragraph", text: "Pixel Experience Plus memberikan pengalaman Pixel yang autentik dengan tambahan kustomisasi." },
                ],
            },
            en: {
                title: "Best Custom ROM Review 2026",
                excerpt: "Complete comparison of LineageOS 22, Pixel Experience Plus, crDroid, and other popular ROMs.",
                content: [
                    { type: "heading", text: "Best Custom ROM 2026", id: "intro" },
                    { type: "paragraph", text: "2026 brings many exciting developments in the custom ROM world." },
                ],
            },
        },
        related_slugs: ["panduan-lengkap-unlock-bootloader-2026", "tips-aman-root-android"],
    },
    {
        slug: "optimasi-baterai-custom-kernel",
        category: "tips", read_time: 6, author: "versedroid",
        featured: false, published_at: "2026-01-28T00:00:00Z",
        translations: {
            id: {
                title: "Optimasi Baterai dengan Custom Kernel",
                excerpt: "Tips dan trik mengoptimasi baterai menggunakan custom kernel: governor, I/O scheduler, dan deep sleep.",
                content: [
                    { type: "heading", text: "Optimasi Baterai", id: "optimasi" },
                    { type: "paragraph", text: "Custom kernel bisa memberikan peningkatan baterai yang signifikan jika dikonfigurasi dengan benar." },
                    { type: "list", items: ["Gunakan governor 'schedutil' atau 'pixel_smurfutil'", "Set I/O scheduler ke 'mq-deadline' untuk SSD/UFS", "Aktifkan deep sleep improvements", "Kurangi max frequency CPU untuk core besar saat idle"] },
                ],
            },
            en: {
                title: "Battery Optimization with Custom Kernel",
                excerpt: "Tips and tricks for optimizing battery using custom kernel: governor, I/O scheduler, and deep sleep.",
                content: [
                    { type: "heading", text: "Battery Optimization", id: "optimasi" },
                    { type: "paragraph", text: "Custom kernel can provide significant battery improvements when configured correctly." },
                ],
            },
        },
        related_slugs: ["review-custom-rom-terbaik-2026"],
    },
    {
        slug: "android-16-fitur-baru-oprek",
        category: "news", read_time: 4, author: "versedroid",
        featured: false, published_at: "2026-01-20T00:00:00Z",
        translations: {
            id: {
                title: "Android 16: Fitur Baru untuk Komunitas Oprek",
                excerpt: "Apa yang berubah di Android 16 untuk komunitas modding dan bagaimana mengatasinya.",
                content: [
                    { type: "heading", text: "Android 16 untuk Komunitas Oprek", id: "android-16" },
                    { type: "paragraph", text: "Android 16 membawa beberapa perubahan yang berdampak pada komunitas oprek." },
                    { type: "callout", variant: "info", title: "Info", text: "Google telah memperketat Play Integrity API di Android 16, tapi komunitas sudah menemukan solusi melalui module Magisk terbaru." },
                ],
            },
            en: {
                title: "Android 16: New Features for the Modding Community",
                excerpt: "What changed in Android 16 for the modding community and how to deal with it.",
                content: [
                    { type: "heading", text: "Android 16 for the Modding Community", id: "android-16" },
                    { type: "paragraph", text: "Android 16 brings several changes that impact the modding community." },
                ],
            },
        },
        related_slugs: ["tips-aman-root-android", "review-custom-rom-terbaik-2026"],
    },
];

// ─────────────────────────────────────────────────────
// Seed Runner
// ─────────────────────────────────────────────────────

async function seed() {
    console.log("🌱 Starting seed...\n");

    // ── FAQ Categories ────────────────────────────────
    console.log("📖 Seeding FAQ categories...");
    const faqCatMap = new Map<string, string>(); // key -> id

    for (const cat of faqCategorySeed) {
        const { data, error } = await supabase
            .from("faq_categories")
            .insert({ key: cat.key, sort_order: cat.sort_order })
            .select("id")
            .single();
        if (error) { console.error(`  ❌ faq_categories "${cat.key}":`, error.message); continue; }
        faqCatMap.set(cat.key, data.id);
        console.log(`  ✅ Category "${cat.key}" → ${data.id}`);

        // Translations
        for (const [locale, label] of Object.entries(cat.translations)) {
            const { error: tErr } = await supabase
                .from("faq_category_translations")
                .insert({ category_id: data.id, locale, label });
            if (tErr) console.error(`    ❌ Translation ${locale}:`, tErr.message);
        }
    }

    // ── FAQ Articles ──────────────────────────────────
    console.log("\n📖 Seeding FAQ articles...");
    for (const article of faqArticleSeed) {
        const categoryId = faqCatMap.get(article.category_key);
        if (!categoryId) { console.error(`  ❌ Category "${article.category_key}" not found`); continue; }

        const { data, error } = await supabase
            .from("faq_articles")
            .insert({ category_id: categoryId, slug: article.slug, icon: article.icon, sort_order: article.sort_order, published: true })
            .select("id")
            .single();
        if (error) { console.error(`  ❌ faq_articles "${article.slug}":`, error.message); continue; }
        console.log(`  ✅ Article "${article.slug}" → ${data.id}`);

        for (const [locale, trans] of Object.entries(article.translations)) {
            const { error: tErr } = await supabase
                .from("faq_article_translations")
                .insert({ article_id: data.id, locale, title: trans.title, description: trans.description, content: trans.content, faq_items: trans.faq_items });
            if (tErr) console.error(`    ❌ Translation ${locale}:`, tErr.message);
        }
    }

    // ── Tool Categories ───────────────────────────────
    console.log("\n🔧 Seeding tool categories...");
    const toolCatMap = new Map<string, string>();

    for (const cat of toolCategorySeed) {
        const { data, error } = await supabase
            .from("tool_categories")
            .insert({ key: cat.key, sort_order: cat.sort_order })
            .select("id")
            .single();
        if (error) { console.error(`  ❌ tool_categories "${cat.key}":`, error.message); continue; }
        toolCatMap.set(cat.key, data.id);
        console.log(`  ✅ Category "${cat.key}" → ${data.id}`);

        for (const [locale, label] of Object.entries(cat.translations)) {
            const { error: tErr } = await supabase
                .from("tool_category_translations")
                .insert({ category_id: data.id, locale, label });
            if (tErr) console.error(`    ❌ Translation ${locale}:`, tErr.message);
        }
    }

    // ── Tool Articles ─────────────────────────────────
    console.log("\n🔧 Seeding tool articles...");
    for (const tool of toolArticleSeed) {
        const categoryId = toolCatMap.get(tool.category_key);
        if (!categoryId) { console.error(`  ❌ Category "${tool.category_key}" not found`); continue; }

        const { data, error } = await supabase
            .from("tool_articles")
            .insert({ category_id: categoryId, slug: tool.slug, icon: tool.icon, download_url: tool.download_url, download_version: tool.download_version, sort_order: tool.sort_order, published: true })
            .select("id")
            .single();
        if (error) { console.error(`  ❌ tool_articles "${tool.slug}":`, error.message); continue; }
        console.log(`  ✅ Tool "${tool.slug}" → ${data.id}`);

        for (const [locale, trans] of Object.entries(tool.translations)) {
            const { error: tErr } = await supabase
                .from("tool_article_translations")
                .insert({ article_id: data.id, locale, title: trans.title, description: trans.description, content: trans.content, specs: trans.specs, tabs: trans.tabs });
            if (tErr) console.error(`    ❌ Translation ${locale}:`, tErr.message);
        }
    }

    // ── Blog Posts ─────────────────────────────────────
    console.log("\n📝 Seeding blog posts...");
    const blogPostMap = new Map<string, string>();

    for (const post of blogPostSeed) {
        const { data, error } = await supabase
            .from("blog_posts")
            .insert({ slug: post.slug, category: post.category, read_time: post.read_time, author: post.author, featured: post.featured, published: true, published_at: post.published_at })
            .select("id")
            .single();
        if (error) { console.error(`  ❌ blog_posts "${post.slug}":`, error.message); continue; }
        blogPostMap.set(post.slug, data.id);
        console.log(`  ✅ Post "${post.slug}" → ${data.id}`);

        for (const [locale, trans] of Object.entries(post.translations)) {
            const { error: tErr } = await supabase
                .from("blog_post_translations")
                .insert({ post_id: data.id, locale, title: trans.title, excerpt: trans.excerpt, content: trans.content });
            if (tErr) console.error(`    ❌ Translation ${locale}:`, tErr.message);
        }
    }

    // ── Blog Related Posts ─────────────────────────────
    console.log("\n🔗 Seeding blog related posts...");
    for (const post of blogPostSeed) {
        const postId = blogPostMap.get(post.slug);
        if (!postId || !post.related_slugs) continue;

        for (const relSlug of post.related_slugs) {
            const relatedId = blogPostMap.get(relSlug);
            if (!relatedId) continue;

            const { error } = await supabase
                .from("blog_related_posts")
                .insert({ post_id: postId, related_post_id: relatedId });
            if (error) console.error(`  ❌ Related "${post.slug}" → "${relSlug}":`, error.message);
            else console.log(`  ✅ "${post.slug}" → "${relSlug}"`);
        }
    }

    console.log("\n✨ Seed complete!");
}

seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
