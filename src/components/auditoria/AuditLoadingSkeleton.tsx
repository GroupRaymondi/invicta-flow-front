export const AuditLoadingSkeleton = () => {
    return (
        <div className="space-y-4 animate-pulse">
            {/* Header Skeleton */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-lg bg-muted/50"></div>
                <div className="space-y-2">
                    <div className="h-8 w-48 bg-muted/50 rounded"></div>
                    <div className="h-4 w-64 bg-muted/30 rounded"></div>
                </div>
            </div>

            {/* Filters Skeleton */}
            <div className="bg-card border border-border rounded-xl p-4 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-3 w-16 bg-muted/30 rounded"></div>
                            <div className="h-10 w-full bg-muted/30 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="border-b border-border bg-muted/10 p-4">
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-4 bg-muted/30 rounded flex-1"></div>
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-border">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-4 flex gap-4">
                            <div className="h-4 bg-muted/20 rounded w-24"></div>
                            <div className="h-4 bg-muted/20 rounded flex-1"></div>
                            <div className="h-4 bg-muted/20 rounded w-32"></div>
                            <div className="h-4 bg-muted/20 rounded w-24"></div>
                            <div className="h-4 bg-muted/20 rounded w-32"></div>
                            <div className="h-8 w-8 bg-muted/20 rounded ml-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
