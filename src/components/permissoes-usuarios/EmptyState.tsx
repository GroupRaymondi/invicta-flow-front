import { SearchX } from 'lucide-react';

interface EmptyStateProps {
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const EmptyState = ({ title, description, actionLabel, onAction }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-xl bg-muted/10">
            <div className="p-4 rounded-full bg-muted/20 text-muted-foreground mb-4">
                <SearchX size={32} />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-4">
                {description}
            </p>
            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};
