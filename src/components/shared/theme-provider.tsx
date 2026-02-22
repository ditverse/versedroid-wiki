"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";

type Theme = "dark" | "light";

type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = "vd-theme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("dark");

    // Read from localStorage on mount (client-only)
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
        if (stored === "light" || stored === "dark") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setTheme(stored);
        }
    }, []);

    // Apply class to <html> whenever theme changes
    useEffect(() => {
        const root = document.documentElement;
        root.classList.remove("dark", "light");
        root.classList.add(theme);
        localStorage.setItem(STORAGE_KEY, theme);
    }, [theme]);

    const toggleTheme = useCallback(() => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error("useTheme must be used inside <ThemeProvider>");
    }
    return ctx;
}
