import { Skeleton } from "@/components/shared/skeleton";

export default function AdminToolsListLoading() {
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <Skeleton className="h-8 w-36" />
                <Skeleton className="h-9 w-28 rounded-md" />
            </div>

            <div className="rounded-lg border border-vd-border">
                {/* Table header */}
                <div className="flex gap-4 border-b border-vd-border px-4 py-3">
                    <Skeleton className="h-4 w-10" />
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                </div>
                {/* Table rows */}
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-4 border-b border-vd-border px-4 py-3 last:border-0"
                    >
                        <Skeleton className="h-5 w-8" />
                        <Skeleton className="h-5 w-1/3" />
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-5 w-16" />
                    </div>
                ))}
            </div>
        </div>
    );
}
