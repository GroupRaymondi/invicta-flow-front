export const LoadingSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            {/* KPIs Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-card border border-border rounded-xl p-5 h-32">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-4 w-24 bg-muted/30 rounded"></div>
                            <div className="h-5 w-12 bg-muted/30 rounded-full"></div>
                        </div>
                        <div className="h-8 w-32 bg-muted/30 rounded"></div>
                    </div>
                ))}
            </div>

            {/* Charts Skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 h-[400px]">
                    <div className="h-6 w-48 bg-muted/30 rounded mb-6"></div>
                    <div className="h-full w-full bg-muted/10 rounded-lg flex items-end gap-2 p-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="w-full bg-muted/20 rounded-t" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                        ))}
                    </div>
                </div>
                <div className="bg-card border border-border rounded-xl p-6 h-[400px]">
                    <div className="h-6 w-32 bg-muted/30 rounded mb-6"></div>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between">
                                    <div className="h-4 w-24 bg-muted/30 rounded"></div>
                                    <div className="h-4 w-12 bg-muted/30 rounded"></div>
                                </div>
                                <div className="h-6 w-full bg-muted/20 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
