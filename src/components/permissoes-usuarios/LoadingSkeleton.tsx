export const LoadingSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* Filters Skeleton */}
            <div className="flex flex-col space-y-4 mb-6">
                <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
                    <div className="flex flex-col md:flex-row gap-4 items-end flex-1">
                        <div className="w-full md:w-96 space-y-1.5">
                            <div className="h-3 w-20 bg-muted/30 rounded"></div>
                            <div className="h-10 w-full bg-muted/30 rounded-lg"></div>
                        </div>
                        <div className="w-full md:w-48 space-y-1.5">
                            <div className="h-3 w-16 bg-muted/30 rounded"></div>
                            <div className="h-10 w-full bg-muted/30 rounded-lg"></div>
                        </div>
                        <div className="w-full md:w-48 space-y-1.5">
                            <div className="h-3 w-16 bg-muted/30 rounded"></div>
                            <div className="h-10 w-full bg-muted/30 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="h-10 w-32 bg-muted/30 rounded-lg"></div>
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="border-b border-border bg-muted/30 p-4">
                    <div className="flex gap-6">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-4 bg-muted/40 rounded flex-1"></div>
                        ))}
                    </div>
                </div>
                <div className="divide-y divide-border">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-4 flex gap-6 items-center">
                            <div className="h-5 bg-muted/30 rounded w-32"></div>
                            <div className="h-4 bg-muted/30 rounded flex-1"></div>
                            <div className="h-6 bg-muted/30 rounded w-24"></div>
                            <div className="h-6 bg-muted/30 rounded w-20"></div>
                            <div className="h-4 bg-muted/30 rounded w-32"></div>
                            <div className="h-8 w-8 bg-muted/30 rounded ml-auto"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
