import type { BlogPost } from "./types";

const posts: BlogPost[] = [
    {
        slug: "panduan-lengkap-unlock-bootloader-2026",
        titleKey: "post1Title",
        excerptKey: "post1Excerpt",
        category: "tutorial",
        readTime: 8,
        date: "2026-02-15",
        author: "versedroid",
        featured: true,
        content: [
            {
                type: "heading",
                text: "Pendahuluan",
                id: "pendahuluan",
            },
            {
                type: "paragraph",
                text: "Unlock bootloader adalah langkah pertama dan paling krusial dalam perjalanan oprek Android. Tanpa unlock bootloader, kamu tidak bisa install custom recovery, custom ROM, atau bahkan melakukan root. Dalam panduan ini, kita akan membahas langkah-langkah detail untuk semua brand populer.",
            },
            {
                type: "heading",
                text: "Persiapan",
                id: "persiapan",
            },
            {
                type: "list",
                items: [
                    "Backup semua data penting (foto, dokumen, kontak)",
                    "Charge baterai minimal 50%",
                    "Install Platform Tools (ADB & Fastboot) di PC",
                    "Siapkan kabel USB yang reliable",
                ],
            },
            {
                type: "callout",
                variant: "warning",
                title: "Peringatan",
                text: "Proses unlock bootloader akan menghapus SEMUA data di perangkat. Tidak ada cara untuk menghindari ini.",
            },
            {
                type: "heading",
                text: "Langkah untuk Xiaomi",
                id: "xiaomi",
            },
            {
                type: "paragraph",
                text: "Xiaomi memerlukan request unlock melalui Mi Unlock Tool. Prosesnya membutuhkan waktu tunggu 7-14 hari setelah permohonan.",
            },
            {
                type: "code",
                language: "bash",
                code: "# Setelah mendapat approval dari Mi Unlock\nadb reboot bootloader\n# Gunakan Mi Unlock Tool di PC untuk unlock",
            },
            {
                type: "heading",
                text: "Langkah untuk Samsung",
                id: "samsung",
            },
            {
                type: "paragraph",
                text: "Samsung menggunakan toggle OEM Unlock di Developer Options. Perlu diingat bahwa Samsung akan void garansi KNOX permanent setelah unlock.",
            },
        ],
        relatedSlugs: ["tips-aman-root-android", "review-custom-rom-terbaik-2026"],
    },
    {
        slug: "tips-aman-root-android",
        titleKey: "post2Title",
        excerptKey: "post2Excerpt",
        category: "tips",
        readTime: 5,
        date: "2026-02-10",
        author: "versedroid",
        featured: false,
        content: [
            {
                type: "heading",
                text: "Root dengan Aman",
                id: "root-aman",
            },
            {
                type: "paragraph",
                text: "Root Android bisa terasa menakutkan bagi pemula, tapi dengan persiapan yang tepat, prosesnya bisa berjalan tanpa masalah. Berikut tips agar proses root aman.",
            },
            {
                type: "list",
                items: [
                    "Selalu gunakan Magisk versi terbaru dari repository resmi",
                    "Backup boot.img original sebelum patching",
                    "Aktifkan Zygisk untuk kompatibilitas terbaik",
                    "Konfigurasi DenyList untuk app banking",
                    "Jangan install modul yang tidak kamu pahami",
                ],
            },
            {
                type: "callout",
                variant: "tip",
                title: "Pro Tip",
                text: "Simpan backup boot.img original di cloud storage. Jika terjadi masalah, kamu bisa reflash kapan saja.",
            },
        ],
        relatedSlugs: ["panduan-lengkap-unlock-bootloader-2026"],
    },
    {
        slug: "review-custom-rom-terbaik-2026",
        titleKey: "post3Title",
        excerptKey: "post3Excerpt",
        category: "news",
        readTime: 10,
        date: "2026-02-05",
        author: "versedroid",
        featured: false,
        content: [
            {
                type: "heading",
                text: "Custom ROM Terbaik 2026",
                id: "intro",
            },
            {
                type: "paragraph",
                text: "Tahun 2026 membawa banyak perkembangan menarik di dunia custom ROM. Berikut review lengkap ROM-ROM terbaik yang bisa kamu coba.",
            },
            {
                type: "heading",
                text: "1. LineageOS 22",
                id: "lineageos",
            },
            {
                type: "paragraph",
                text: "LineageOS tetap menjadi pilihan utama bagi mereka yang menginginkan stabilitas. Versi 22 hadir dengan basis Android 16 dan dukungan device yang luas.",
            },
            {
                type: "heading",
                text: "2. Pixel Experience Plus",
                id: "pixel-experience",
            },
            {
                type: "paragraph",
                text: "Pixel Experience Plus memberikan pengalaman Pixel yang autentik dengan tambahan kustomisasi. Sempurna bagi yang ingin tampilan stock Google dengan sedikit tambahan.",
            },
        ],
        relatedSlugs: ["panduan-lengkap-unlock-bootloader-2026", "tips-aman-root-android"],
    },
    {
        slug: "optimasi-baterai-custom-kernel",
        titleKey: "post4Title",
        excerptKey: "post4Excerpt",
        category: "tips",
        readTime: 6,
        date: "2026-01-28",
        author: "versedroid",
        featured: false,
        content: [
            {
                type: "heading",
                text: "Optimasi Baterai",
                id: "optimasi",
            },
            {
                type: "paragraph",
                text: "Custom kernel bisa memberikan peningkatan baterai yang signifikan jika dikonfigurasi dengan benar. Berikut tips optimasi terbaik.",
            },
            {
                type: "list",
                items: [
                    "Gunakan governor 'schedutil' atau 'pixel_smurfutil' untuk keseimbangan performa-baterai",
                    "Set I/O scheduler ke 'mq-deadline' untuk SSD/UFS",
                    "Aktifkan deep sleep improvements",
                    "Kurangi max frequency CPU untuk core besar saat idle",
                ],
            },
        ],
        relatedSlugs: ["review-custom-rom-terbaik-2026"],
    },
    {
        slug: "android-16-fitur-baru-oprek",
        titleKey: "post5Title",
        excerptKey: "post5Excerpt",
        category: "news",
        readTime: 4,
        date: "2026-01-20",
        author: "versedroid",
        featured: false,
        content: [
            {
                type: "heading",
                text: "Android 16 untuk Komunitas Oprek",
                id: "android-16",
            },
            {
                type: "paragraph",
                text: "Android 16 membawa beberapa perubahan yang berdampak pada komunitas oprek. Berikut hal-hal yang perlu kamu ketahui.",
            },
            {
                type: "callout",
                variant: "info",
                title: "Info",
                text: "Google telah memperketat Play Integrity API di Android 16, tapi komunitas sudah menemukan solusi melalui module Magisk terbaru.",
            },
        ],
        relatedSlugs: ["tips-aman-root-android", "review-custom-rom-terbaik-2026"],
    },
];

export const blogPosts: BlogPost[] = posts;

export function getBlogBySlug(slug: string): BlogPost | undefined {
    return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slugs: string[]): BlogPost[] {
    return slugs
        .map((s) => posts.find((p) => p.slug === s))
        .filter(Boolean) as BlogPost[];
}

export function getPostsByCategory(category: string | null): BlogPost[] {
    if (!category || category === "all") return posts;
    return posts.filter((p) => p.category === category);
}

export function getFeaturedPost(): BlogPost | undefined {
    return posts.find((p) => p.featured);
}
