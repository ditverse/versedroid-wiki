"use client";

import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/shared/theme-provider";

type ThemeToggleProps = {
    className?: string;
};

export function ThemeToggle({ className }: ThemeToggleProps) {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className={`relative h-9 w-9 text-vd-text-secondary hover:text-vd-text-primary ${className ?? ""}`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            {/* Sun icon — visible in dark mode */}
            <Sun
                className={`absolute h-4 w-4 transition-all duration-300 ${isDark
                        ? "rotate-0 scale-100 opacity-100"
                        : "-rotate-90 scale-0 opacity-0"
                    }`}
            />
            {/* Moon icon — visible in light mode */}
            <Moon
                className={`absolute h-4 w-4 transition-all duration-300 ${isDark
                        ? "rotate-90 scale-0 opacity-0"
                        : "rotate-0 scale-100 opacity-100"
                    }`}
            />
        </Button>
    );
}
