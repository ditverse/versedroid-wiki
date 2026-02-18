import type { ToolArticle, ToolCategory } from "./types";

const platformTools: ToolArticle = {
    slug: "platform-tools",
    icon: "🔧",
    titleKey: "platformToolsTitle",
    descriptionKey: "platformToolsDesc",
    category: "remote",
    specs: [
        { label: "OS", value: "Windows, macOS, Linux" },
        { label: "RAM", value: "2 GB minimum" },
        { label: "Disk", value: "~100 MB" },
        { label: "Developer", value: "Google" },
    ],
    downloadUrl: "https://developer.android.com/tools/releases/platform-tools",
    downloadVersion: "35.0.2",
    tabs: [
        {
            label: "🖥 Host",
            labelKey: "hostTab",
            steps: [
                {
                    title: "Download Platform Tools",
                    description: "Download SDK Platform Tools dari situs resmi Google.",
                },
                {
                    title: "Extract ke folder",
                    description: "Extract ZIP ke folder yang mudah diakses, misalnya C:\\platform-tools",
                },
                {
                    title: "Tambahkan ke PATH",
                    description: "Tambahkan folder platform-tools ke environment variable PATH agar bisa diakses dari terminal manapun.",
                    code: "# Windows (PowerShell as Admin)\n[Environment]::SetEnvironmentVariable(\"Path\", $env:Path + \";C:\\platform-tools\", \"Machine\")\n\n# macOS / Linux\nexport PATH=$PATH:~/platform-tools",
                },
                {
                    title: "Verifikasi instalasi",
                    description: "Buka terminal baru dan jalankan:",
                    code: "adb version\nfastboot --version",
                },
            ],
        },
        {
            label: "📱 Client",
            labelKey: "clientTab",
            steps: [
                {
                    title: "Aktifkan Developer Options",
                    description: "Settings > About Phone > Tap Build Number 7 kali.",
                },
                {
                    title: "Aktifkan USB Debugging",
                    description: "Settings > Developer Options > USB Debugging > ON.",
                },
                {
                    title: "Hubungkan ke PC",
                    description: "Sambungkan perangkat dengan kabel USB. Pilih mode 'File Transfer'.",
                },
                {
                    title: "Authorize PC",
                    description: "Ketika muncul dialog 'Allow USB debugging?', centang 'Always allow' dan tap OK.",
                    code: "# Verifikasi koneksi dari PC\nadb devices\n# Harus muncul device ID dengan status \"device\"",
                },
            ],
        },
    ],
    content: [
        {
            type: "heading",
            text: "Apa itu Platform Tools?",
            id: "apa-itu",
        },
        {
            type: "paragraph",
            text: "Android SDK Platform Tools adalah kumpulan command-line tools yang digunakan untuk berkomunikasi dengan perangkat Android. Package ini berisi ADB (Android Debug Bridge) dan Fastboot — dua tools esensial untuk proses oprek.",
        },
        {
            type: "callout",
            variant: "info",
            title: "Wajib Punya",
            text: "Platform Tools adalah prasyarat untuk hampir semua proses oprek. Pastikan tool ini sudah terinstall sebelum mulai.",
        },
    ],
};

const scrcpy: ToolArticle = {
    slug: "scrcpy",
    icon: "📺",
    titleKey: "scrcpyTitle",
    descriptionKey: "scrcpyDesc",
    category: "remote",
    specs: [
        { label: "OS", value: "Windows, macOS, Linux" },
        { label: "RAM", value: "1 GB minimum" },
        { label: "Disk", value: "~30 MB" },
        { label: "Developer", value: "Genymobile (Open Source)" },
    ],
    downloadUrl: "https://github.com/Genymobile/scrcpy/releases",
    downloadVersion: "3.1",
    tabs: [
        {
            label: "🖥 Host",
            labelKey: "hostTab",
            steps: [
                {
                    title: "Install scrcpy",
                    description: "Download dari GitHub releases atau install via package manager:",
                    code: "# Windows (via Scoop)\nscoop install scrcpy\n\n# macOS (via Homebrew)\nbrew install scrcpy\n\n# Linux (Snap)\nsnap install scrcpy",
                },
                {
                    title: "Jalankan scrcpy",
                    description: "Pastikan perangkat terhubung via USB dengan USB Debugging aktif, lalu:",
                    code: "scrcpy\n\n# Mode wireless (setelah satu kali USB)\nscrcpy --tcpip",
                },
            ],
        },
        {
            label: "📱 Client",
            labelKey: "clientTab",
            steps: [
                {
                    title: "Aktifkan USB Debugging",
                    description: "Settings > Developer Options > USB Debugging.",
                },
                {
                    title: "Hubungkan ke PC",
                    description: "Tidak perlu install apapun di perangkat. Scrcpy otomatis push server ke device.",
                },
            ],
        },
    ],
    content: [
        {
            type: "heading",
            text: "Apa itu Scrcpy?",
            id: "apa-itu",
        },
        {
            type: "paragraph",
            text: "Scrcpy (Screen Copy) adalah tool open-source yang memungkinkan kamu menampilkan dan mengontrol perangkat Android dari PC. Mendukung koneksi USB dan wireless dengan latensi rendah.",
        },
    ],
};

const magiskApp: ToolArticle = {
    slug: "magisk",
    icon: "🎭",
    titleKey: "magiskAppTitle",
    descriptionKey: "magiskAppDesc",
    category: "android",
    specs: [
        { label: "OS", value: "Android 6.0+" },
        { label: "Prasyarat", value: "Unlocked Bootloader" },
        { label: "Disk", value: "~10 MB" },
        { label: "Developer", value: "topjohnwu (Open Source)" },
    ],
    downloadUrl: "https://github.com/topjohnwu/Magisk/releases",
    downloadVersion: "28.1",
    tabs: [],
    content: [
        {
            type: "heading",
            text: "Apa itu Magisk App?",
            id: "apa-itu",
        },
        {
            type: "paragraph",
            text: "Magisk App adalah aplikasi companion untuk Magisk — root systemless Android. Gunakan app ini untuk manage modul, menyembunyikan root, dan mem-patch boot image.",
        },
        {
            type: "heading",
            text: "Instalasi",
            id: "instalasi",
        },
        {
            type: "paragraph",
            text: "Download Magisk APK dari rilisan resmi GitHub, kemudian install di perangkat. Untuk root pertama kali, gunakan fitur 'Install' di dalam app untuk mem-patch boot image, lalu flash via fastboot.",
        },
        {
            type: "callout",
            variant: "warning",
            title: "Peringatan",
            text: "Selalu gunakan versi Magisk terbaru dari GitHub resmi. Jangan download dari sumber tidak terpercaya.",
        },
    ],
};

const lsposed: ToolArticle = {
    slug: "lsposed",
    icon: "🧩",
    titleKey: "lsposedTitle",
    descriptionKey: "lsposedDesc",
    category: "android",
    specs: [
        { label: "OS", value: "Android 8.1+" },
        { label: "Prasyarat", value: "Magisk + Zygisk" },
        { label: "Disk", value: "~5 MB" },
        { label: "Developer", value: "LSPosed Team (Open Source)" },
    ],
    downloadUrl: "https://github.com/LSPosed/LSPosed/releases",
    downloadVersion: "1.9.2",
    tabs: [],
    content: [
        {
            type: "heading",
            text: "Apa itu LSPosed?",
            id: "apa-itu",
        },
        {
            type: "paragraph",
            text: "LSPosed adalah framework Xposed modern yang berjalan di atas Zygisk (komponen Magisk). Memungkinkan kamu menginstall modul Xposed untuk modifikasi mendalam tanpa mengubah system partition.",
        },
        {
            type: "callout",
            variant: "tip",
            title: "Tips",
            text: "Install LSPosed sebagai modul Magisk melalui Magisk App. Aktifkan Zygisk terlebih dahulu di Settings Magisk.",
        },
    ],
};

export const toolArticles: ToolArticle[] = [
    platformTools,
    scrcpy,
    magiskApp,
    lsposed,
];

export const toolCategories: ToolCategory[] = [
    {
        key: "remote",
        labelKey: "remoteTools",
        articles: [platformTools, scrcpy],
    },
    {
        key: "android",
        labelKey: "androidTools",
        articles: [magiskApp, lsposed],
    },
];

export function getToolBySlug(slug: string): ToolArticle | undefined {
    return toolArticles.find((a) => a.slug === slug);
}

export function getAdjacentTools(slug: string) {
    const idx = toolArticles.findIndex((a) => a.slug === slug);
    return {
        prev: idx > 0 ? toolArticles[idx - 1] : null,
        next: idx < toolArticles.length - 1 ? toolArticles[idx + 1] : null,
    };
}
