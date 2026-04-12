// Fix AC-08: DOM order bug — footer rendered before blog content in RSC streaming.
// This loading.tsx fills <main> with a skeleton while the page's async data resolves,
// preventing the layout shell (with Footer) from visually appearing before blog content.

export default function BlogLoading() {
    return (
        <div style={{ background: "var(--vd-bg)", minHeight: "100vh" }}>
            {/* Header skeleton */}
            <div
                className="px-6 py-16"
                style={{ borderBottom: "1px solid var(--vd-border)" }}
            >
                <div className="mx-auto max-w-[1100px] space-y-3">
                    <div
                        className="h-3 w-16 rounded animate-pulse"
                        style={{ background: "var(--vd-border)" }}
                    />
                    <div
                        className="h-8 w-64 rounded animate-pulse"
                        style={{ background: "var(--vd-border)" }}
                    />
                </div>
            </div>

            <div className="px-6 py-12">
                <div className="mx-auto max-w-[1100px]">
                    {/* Featured skeleton */}
                    <div
                        className="mb-10 h-64 rounded-xl animate-pulse"
                        style={{ background: "var(--vd-surface)" }}
                    />

                    {/* Filter skeleton */}
                    <div className="mb-8 flex gap-2">
                        {[80, 100, 120, 110].map((w, i) => (
                            <div
                                key={i}
                                className="h-8 rounded-full animate-pulse"
                                style={{ width: w, background: "var(--vd-surface)" }}
                            />
                        ))}
                    </div>

                    {/* Grid skeleton */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-60 rounded-xl animate-pulse"
                                style={{ background: "var(--vd-surface)" }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
