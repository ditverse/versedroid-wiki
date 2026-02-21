import { Skeleton } from "@/components/shared/skeleton";

export default function AdminDashboardLoading() {
    return (
        <div>
            <Skeleton className="mb-6 h-8 w-40" />

            <div className="grid gap-4 sm:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="rounded-lg border border-vd-border bg-vd-bg-secondary p-6"
                    >
                        <div className="mb-2 flex items-center justify-between">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-4" />
                        </div>
                        <Skeleton className="mb-2 h-9 w-12" />
                        <div className="flex gap-4">
                            <Skeleton className="h-3 w-20" />
                            <Skeleton className="h-3 w-16" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
