import { Skeleton } from "@/components/shared/skeleton";

export default function AdminFaqEditLoading() {
    return (
        <div>
            <Skeleton className="mb-6 h-8 w-52" />

            {/* Form skeleton */}
            <div className="space-y-6 rounded-lg border border-vd-border bg-vd-bg-secondary p-6">
                {/* Slug + icon + category row */}
                <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                        <Skeleton className="mb-2 h-4 w-12" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div>
                        <Skeleton className="mb-2 h-4 w-10" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                    <div>
                        <Skeleton className="mb-2 h-4 w-20" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>
                {/* Content area */}
                <div>
                    <Skeleton className="mb-2 h-4 w-20" />
                    <Skeleton className="h-64 w-full rounded-md" />
                </div>
                {/* FAQ items */}
                <div>
                    <Skeleton className="mb-2 h-4 w-24" />
                    <Skeleton className="h-32 w-full rounded-md" />
                </div>
                {/* Submit button */}
                <Skeleton className="h-10 w-32 rounded-md" />
            </div>
        </div>
    );
}
