"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, AlertCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const supabase = createClient();
        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError(authError.message);
            setLoading(false);
            return;
        }

        router.push("/admin");
        router.refresh();
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-vd-bg-primary px-4">
            <div className="w-full max-w-sm space-y-6">
                {/* Logo */}
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-vd-text-primary">
                        versedroid<span className="text-vd-accent">.</span>
                    </h1>
                    <p className="mt-2 text-sm text-vd-text-secondary">
                        Admin Dashboard
                    </p>
                </div>

                {/* Login card */}
                <form
                    onSubmit={handleLogin}
                    className="rounded-xl border border-vd-border bg-vd-bg-secondary p-6 space-y-4"
                >
                    {error && (
                        <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                            <AlertCircle className="h-4 w-4 shrink-0" />
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="admin@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-vd-accent text-vd-bg-primary hover:bg-vd-accent/90"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>

                <p className="text-center text-xs text-vd-text-secondary">
                    <Link href="/" className="hover:text-vd-accent transition-colors">
                        ← Back to site
                    </Link>
                </p>
            </div>
        </div>
    );

}
