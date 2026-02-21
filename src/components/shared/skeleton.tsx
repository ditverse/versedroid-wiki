/**
 * Generic skeleton pulse block for loading states.
 * Used by loading.tsx files across routes.
 */
export function Skeleton({
    className = "",
}: {
    className?: string;
}) {
    return (
        <div
            className={`animate-pulse rounded-lg bg-vd-bg-tertiary ${className}`}
        />
    );
}
