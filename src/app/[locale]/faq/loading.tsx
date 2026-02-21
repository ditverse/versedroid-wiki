import { Skeleton } from "@/components/shared/skeleton";

export default function FaqIndexLoading() {
    return (
        <section className="px-4 py-16 sm:py-20">
            <div className="mx-auto max-w-6xl">
                {/* Header skeleton */}
                <div className="mb-12 flex flex-col items-center gap-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-5 w-80 max-w-full" />
                </div>

                {/* Card grid skeleton */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <Skeleton key={i} className="h-40" />
                    ))}
                </div>
            </div>
        </section>
    );
}
