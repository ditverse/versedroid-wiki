import { Skeleton } from "@/components/shared/skeleton";

export default function FaqDetailLoading() {
    return (
        <section className="px-4 py-8 sm:py-12">
            <div className="mx-auto flex max-w-7xl gap-8">
                {/* Sidebar skeleton (desktop) */}
                <div className="hidden w-64 shrink-0 lg:block">
                    <div className="space-y-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Skeleton key={i} className="h-5 w-full" />
                        ))}
                    </div>
                </div>

                {/* Main content */}
                <div className="min-w-0 flex-1">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex gap-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                    {/* Title */}
                    <Skeleton className="mb-8 h-10 w-2/3" />
                    {/* Content */}
                    <div className="space-y-4">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-4/5" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="mt-6 h-40 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-5/6" />
                    </div>
                </div>

                {/* TOC skeleton (desktop) */}
                <div className="hidden w-56 shrink-0 xl:block">
                    <Skeleton className="mb-4 h-5 w-32" />
                    <div className="space-y-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} className="h-4 w-full" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
