import { Skeleton } from "@/components/shared/skeleton";

export default function BlogDetailLoading() {
    return (
        <section className="px-4 py-8 sm:py-12">
            <div className="mx-auto max-w-7xl">
                {/* Breadcrumb skeleton */}
                <div className="mb-6 flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-32" />
                </div>

                <div className="flex gap-8">
                    {/* Main content */}
                    <article className="min-w-0 flex-1">
                        {/* Meta */}
                        <div className="mb-6 flex gap-3">
                            <Skeleton className="h-5 w-20" />
                            <Skeleton className="h-5 w-28" />
                            <Skeleton className="h-5 w-20" />
                        </div>
                        {/* Title */}
                        <Skeleton className="mb-8 h-10 w-3/4" />
                        {/* Content blocks */}
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-5/6" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-2/3" />
                            <Skeleton className="mt-6 h-48 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-4/5" />
                        </div>
                    </article>

                    {/* TOC skeleton (desktop) */}
                    <div className="hidden w-56 shrink-0 lg:block">
                        <Skeleton className="mb-4 h-5 w-32" />
                        <div className="space-y-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Skeleton key={i} className="h-4 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
