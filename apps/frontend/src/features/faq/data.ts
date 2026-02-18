import type { FaqArticle, FaqCategory } from "./types";

const unlockBootloader: FaqArticle = {
    slug: "unlock-bootloader",
    icon: "🔓",
    titleKey: "ublTitle",
    descriptionKey: "ublDesc",
    category: "topik",
    content: [
        {
            type: "heading",
            text: "Apa itu Unlock Bootloader?",
            id: "apa-itu-ubl",
        },
        {
            type: "paragraph",
            text: "Unlock Bootloader (UBL) adalah proses membuka kunci keamanan pada bootloader perangkat Android. Bootloader adalah program pertama yang berjalan saat perangkat dinyalakan, dan secara default dikunci oleh produsen untuk mencegah modifikasi sistem.",
        },
        {
            type: "heading",
            text: "Cara Kerja Bootloader",
            id: "cara-kerja",
        },
        {
            type: "paragraph",
            text: "Bootloader memverifikasi integritas sistem operasi sebelum memuatnya. Ketika bootloader dikunci, hanya firmware resmi yang diizinkan untuk boot. Dengan membuka kunci, kamu memungkinkan perangkat untuk menjalankan firmware custom.",
        },
        {
            type: "callout",
            variant: "info",
            title: "Perlu Diketahui",
            text: "Setiap brand memiliki prosedur UBL yang berbeda. Xiaomi memerlukan permohonan melalui Mi Unlock Tool, Samsung menggunakan mode OEM Unlock, dan Google Pixel bisa langsung via fastboot.",
        },
        {
            type: "heading",
            text: "Kelebihan Unlock Bootloader",
            id: "kelebihan",
        },
        {
            type: "list",
            items: [
                "Bisa install custom recovery (TWRP, OrangeFox)",
                "Bisa install custom ROM",
                "Bisa melakukan root dengan Magisk",
                "Bisa memodifikasi partisi sistem",
                "Kontrol penuh atas perangkat",
            ],
        },
        { type: "heading", text: "Risiko", id: "risiko" },
        {
            type: "callout",
            variant: "warning",
            title: "Peringatan",
            text: "Proses unlock bootloader akan menghapus semua data (factory reset). Pastikan backup data penting sebelum memulai.",
        },
        {
            type: "list",
            items: [
                "Garansi resmi bisa hangus",
                "Perangkat lebih rentan terhadap malware jika tidak hati-hati",
                "Beberapa aplikasi banking mungkin tidak berjalan (bisa diatasi dengan Magisk Hide)",
                "Risiko brick jika proses gagal",
            ],
        },
        {
            type: "heading",
            text: "Langkah-langkah UBL",
            id: "langkah-langkah",
        },
        {
            type: "paragraph",
            text: 'Berikut langkah umum untuk unlock bootloader. Detail spesifik berbeda per brand.',
        },
        {
            type: "code",
            language: "bash",
            code: "# Aktifkan Developer Options\n# Settings > About Phone > Tap Build Number 7x\n\n# Aktifkan OEM Unlocking\n# Settings > Developer Options > OEM Unlocking\n\n# Reboot ke Fastboot Mode\nadb reboot bootloader\n\n# Unlock Bootloader\nfastboot flashing unlock",
        },
        {
            type: "callout",
            variant: "danger",
            title: "Penting",
            text: "Jangan pernah mencabut kabel USB atau mematikan perangkat selama proses unlock berlangsung. Hal ini dapat menyebabkan brick.",
        },
    ],
    faqItems: [
        {
            question: "Apakah UBL bisa di-relock?",
            answer: "Ya, kebanyakan perangkat mendukung relocking bootloader melalui perintah `fastboot flashing lock`. Namun, pastikan kamu sudah kembali ke firmware stock sebelum relock untuk menghindari bootloop.",
        },
        {
            question: "Apakah UBL menghapus data?",
            answer: "Ya, proses unlock bootloader akan melakukan factory reset otomatis. Semua data, aplikasi, dan pengaturan akan terhapus.",
        },
        {
            question: "Berapa lama proses UBL?",
            answer: "Proses unlock sendiri hanya beberapa detik. Namun untuk beberapa brand seperti Xiaomi, kamu perlu menunggu periode waiting time (biasanya 7-14 hari) setelah mengajukan permohonan.",
        },
    ],
};

const root: FaqArticle = {
    slug: "root",
    icon: "🌱",
    titleKey: "rootTitle",
    descriptionKey: "rootDesc",
    category: "topik",
    content: [
        { type: "heading", text: "Apa itu Root?", id: "apa-itu-root" },
        {
            type: "paragraph",
            text: "Root adalah proses mendapatkan akses superuser (hak administrator) pada perangkat Android. Dengan root, kamu mendapatkan kontrol penuh terhadap seluruh sistem operasi, termasuk area yang biasanya dibatasi oleh produsen.",
        },
        {
            type: "heading",
            text: "Kenapa Harus Root?",
            id: "kenapa-root",
        },
        {
            type: "list",
            items: [
                "Menghapus bloatware bawaan yang tidak bisa dihapus",
                "Menggunakan aplikasi yang memerlukan akses root (Titanium Backup, AdAway)",
                "Modifikasi tampilan sistem secara mendalam",
                "Overclock atau underclock CPU",
                "Full backup sistem termasuk app data",
            ],
        },
        {
            type: "callout",
            variant: "tip",
            title: "Tips",
            text: "Magisk adalah metode root paling populer saat ini karena bersifat systemless — tidak mengubah partisi sistem secara langsung.",
        },
        {
            type: "heading",
            text: "Risiko Root",
            id: "risiko-root",
        },
        {
            type: "callout",
            variant: "warning",
            title: "Peringatan",
            text: "Root memberikan akses penuh ke sistem. Aplikasi root yang berbahaya bisa merusak perangkat. Hanya install aplikasi dari sumber terpercaya.",
        },
    ],
    faqItems: [
        {
            question: "Apakah root bisa di-unroot?",
            answer: "Ya, Magisk menyediakan opsi Uninstall yang mengembalikan perangkat ke keadaan unroot tanpa harus flash ulang.",
        },
        {
            question: "Apakah semua HP bisa di-root?",
            answer: "Secara teknis, hampir semua perangkat Android bisa di-root. Namun kemudahannya bervariasi tergantung brand dan model. Perangkat dengan bootloader terbuka lebih mudah di-root.",
        },
    ],
};

const customRom: FaqArticle = {
    slug: "custom-rom",
    icon: "💿",
    titleKey: "romTitle",
    descriptionKey: "romDesc",
    category: "topik",
    content: [
        {
            type: "heading",
            text: "Apa itu Custom ROM?",
            id: "apa-itu-custom-rom",
        },
        {
            type: "paragraph",
            text: "Custom ROM adalah versi modifikasi dari sistem operasi Android yang dibuat oleh developer komunitas. ROM ini biasanya menawarkan fitur tambahan, performa lebih baik, atau tampilan yang berbeda dari ROM bawaan (stock ROM).",
        },
        {
            type: "heading",
            text: "Custom ROM Populer",
            id: "custom-rom-populer",
        },
        {
            type: "list",
            items: [
                "LineageOS — salah satu ROM paling stabil dan luas dukungan perangkat",
                "Pixel Experience — UI mirip Google Pixel",
                "crDroid — kustomisasi tinggi",
                "Evolution X — Pixel UI dengan customisasi ekstra",
                "ArrowOS — ringan dan clean",
            ],
        },
        {
            type: "callout",
            variant: "info",
            title: "Prasyarat",
            text: "Sebelum install custom ROM, pastikan bootloader sudah di-unlock dan custom recovery (TWRP) sudah terpasang.",
        },
    ],
    faqItems: [
        {
            question: "Apakah custom ROM aman?",
            answer: "ROM dari developer terpercaya (LineageOS, Pixel Experience) umumnya aman. Selalu download dari sumber resmi dan periksa signature/checksum.",
        },
        {
            question: "Apakah bisa kembali ke stock ROM?",
            answer: "Ya, kamu bisa flash kembali firmware resmi dari produsen menggunakan tool khusus (Mi Flash untuk Xiaomi, Odin untuk Samsung).",
        },
    ],
};

const customKernel: FaqArticle = {
    slug: "custom-kernel",
    icon: "⚡",
    titleKey: "kernelTitle",
    descriptionKey: "kernelDesc",
    category: "topik",
    content: [
        {
            type: "heading",
            text: "Apa itu Custom Kernel?",
            id: "apa-itu-kernel",
        },
        {
            type: "paragraph",
            text: "Kernel adalah inti dari sistem operasi yang mengontrol komunikasi antara hardware dan software. Custom kernel adalah kernel yang dimodifikasi untuk mengoptimasi performa, baterai, atau fitur tertentu.",
        },
        {
            type: "heading",
            text: "Manfaat Custom Kernel",
            id: "manfaat",
        },
        {
            type: "list",
            items: [
                "CPU governor custom untuk kontrol performa",
                "I/O scheduler yang lebih efisien",
                "Overclocking GPU",
                "Optimasi baterai (deep sleep improvement)",
                "Dukungan fitur tambahan (KCAL, WireGuard built-in)",
            ],
        },
        {
            type: "callout",
            variant: "danger",
            title: "Peringatan",
            text: "Menggunakan kernel yang tidak kompatibel bisa menyebabkan bootloop atau bahkan kerusakan hardware akibat overclock berlebihan.",
        },
    ],
    faqItems: [
        {
            question: "Apakah perlu root untuk install custom kernel?",
            answer: "Tidak selalu. Kamu bisa flash custom kernel melalui custom recovery (TWRP) tanpa root. Namun untuk konfigurasi lanjutan biasanya butuh root.",
        },
    ],
};

const customRecovery: FaqArticle = {
    slug: "custom-recovery",
    icon: "🔄",
    titleKey: "recoveryTitle",
    descriptionKey: "recoveryDesc",
    category: "topik",
    content: [
        {
            type: "heading",
            text: "Apa itu Custom Recovery?",
            id: "apa-itu-recovery",
        },
        {
            type: "paragraph",
            text: "Custom recovery menggantikan recovery bawaan perangkat dengan versi yang lebih powerful. Recovery custom seperti TWRP memungkinkan kamu untuk flash file ZIP, membuat full backup (Nandroid), dan mengelola partisi.",
        },
        {
            type: "heading",
            text: "TWRP vs OrangeFox",
            id: "twrp-vs-orangefox",
        },
        {
            type: "list",
            items: [
                "TWRP — paling populer, dukungan device terbanyak",
                "OrangeFox — UI lebih modern, built-in Magisk installer",
            ],
        },
    ],
    faqItems: [
        {
            question: "Bagaimana cara install TWRP?",
            answer: "Flash file TWRP .img melalui fastboot menggunakan perintah `fastboot flash recovery twrp.img`, kemudian reboot ke recovery.",
        },
    ],
};

const magisk: FaqArticle = {
    slug: "magisk",
    icon: "🎭",
    titleKey: "magiskTitle",
    descriptionKey: "magiskDesc",
    category: "topik",
    content: [
        {
            type: "heading",
            text: "Apa itu Magisk?",
            id: "apa-itu-magisk",
        },
        {
            type: "paragraph",
            text: "Magisk adalah solusi root systemless untuk Android. Artinya Magisk memberikan akses root tanpa mengubah partisi sistem, sehingga lebih aman dan bisa melewati SafetyNet/Play Integrity check.",
        },
        {
            type: "heading",
            text: "Fitur Utama Magisk",
            id: "fitur-utama",
        },
        {
            type: "list",
            items: [
                "Systemless root — tidak mengubah /system",
                "MagiskHide / Zygisk DenyList — menyembunyikan root dari app tertentu",
                "Modul Magisk — extend fungsi tanpa modifikasi langsung",
                "Boot image patching — root via patch boot.img",
            ],
        },
        {
            type: "callout",
            variant: "tip",
            title: "Tips",
            text: 'Gunakan Zygisk + Shamiko module untuk menyembunyikan root dari aplikasi banking dan Google Pay.',
        },
    ],
    faqItems: [
        {
            question: "Apakah Magisk aman untuk daily driver?",
            answer: "Ya, Magisk adalah metode root paling aman saat ini. Dengan konfigurasi DenyList yang tepat, perangkat bisa digunakan normal termasuk aplikasi banking.",
        },
    ],
};

const apaItuOprek: FaqArticle = {
    slug: "apa-itu-oprek",
    icon: "📱",
    titleKey: "apaItuOprekTitle",
    descriptionKey: "apaItuOprekDesc",
    category: "dasar",
    content: [
        {
            type: "heading",
            text: "Apa itu Oprek Android?",
            id: "pengertian",
        },
        {
            type: "paragraph",
            text: "Oprek Android adalah istilah yang digunakan untuk mendeskripsikan proses modifikasi perangkat Android melampaui batasan yang ditetapkan produsen. Ini meliputi unlock bootloader, root, install custom ROM, kernel, dan berbagai modifikasi lainnya.",
        },
        {
            type: "heading",
            text: "Apakah Oprek Legal?",
            id: "legalitas",
        },
        {
            type: "paragraph",
            text: "Di Indonesia, oprek Android tidak melanggar hukum. Kamu memiliki hak untuk memodifikasi perangkat yang kamu beli. Namun, oprek dapat membatalkan garansi resmi dari produsen.",
        },
    ],
    faqItems: [
        {
            question: "Apakah oprek berbahaya?",
            answer: "Jika dilakukan dengan benar dan mengikuti panduan, risiko minimal. Yang penting: selalu backup data, gunakan tools yang terpercaya, dan ikuti instruksi dengan teliti.",
        },
    ],
};

const istilahOprek: FaqArticle = {
    slug: "istilah-oprek",
    icon: "📖",
    titleKey: "istilahTitle",
    descriptionKey: "istilahDesc",
    category: "dasar",
    content: [
        {
            type: "heading",
            text: "Glosarium Istilah Oprek",
            id: "glosarium",
        },
        {
            type: "list",
            items: [
                "Bootloader — program pertama yang berjalan saat perangkat menyala",
                "Root — akses superuser ke sistem Android",
                "ROM — Read-Only Memory, merujuk pada firmware/OS",
                "Kernel — inti sistem operasi yang mengelola hardware",
                "Recovery — mode khusus untuk maintenance sistem",
                "Flash — proses menulis firmware/file ke penyimpanan perangkat",
                "Brick — kondisi perangkat tidak bisa boot (soft brick vs hard brick)",
                "Nandroid — full backup partisi sistem",
                "ADB — Android Debug Bridge, tool komunikasi PC-Android",
                "Fastboot — protokol untuk modifikasi partisi saat bootloader aktif",
            ],
        },
    ],
    faqItems: [
        {
            question: "Apa bedanya soft brick dan hard brick?",
            answer: "Soft brick: perangkat masih bisa masuk recovery/fastboot dan bisa diperbaiki. Hard brick: perangkat sama sekali tidak merespon — sangat jarang terjadi dan biasanya butuh metode advanced untuk diperbaiki.",
        },
    ],
};

export const faqArticles: FaqArticle[] = [
    apaItuOprek,
    istilahOprek,
    unlockBootloader,
    root,
    customRom,
    customKernel,
    customRecovery,
    magisk,
];

export const faqCategories: FaqCategory[] = [
    {
        key: "dasar",
        labelKey: "categoryBasic",
        articles: [apaItuOprek, istilahOprek],
    },
    {
        key: "topik",
        labelKey: "categoryTopics",
        articles: [
            unlockBootloader,
            root,
            customRom,
            customKernel,
            customRecovery,
            magisk,
        ],
    },
];

export function getFaqBySlug(slug: string): FaqArticle | undefined {
    return faqArticles.find((a) => a.slug === slug);
}

export function getAdjacentArticles(slug: string) {
    const idx = faqArticles.findIndex((a) => a.slug === slug);
    return {
        prev: idx > 0 ? faqArticles[idx - 1] : null,
        next: idx < faqArticles.length - 1 ? faqArticles[idx + 1] : null,
    };
}
