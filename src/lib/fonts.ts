import { DM_Serif_Display, DM_Sans, DM_Mono } from "next/font/google";

export const dmSerifDisplay = DM_Serif_Display({
    subsets: ["latin"],
    variable: "--font-dm-display",
    display: "swap",
    weight: ["400"],
    style: ["normal", "italic"],
});

export const dmSans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dm-sans",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

export const dmMono = DM_Mono({
    subsets: ["latin"],
    variable: "--font-dm-mono",
    display: "swap",
    weight: ["400", "500"],
});
