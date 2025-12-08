import type { ProcessStep } from '../../types/sales';

interface ProcessTimelineProps {
    steps: ProcessStep[];
}

export const ProcessTimeline = ({ steps }: ProcessTimelineProps) => {
    return (
        <div className="relative pl-4 border-l border-border/50 space-y-8 my-4">
            {steps.map((step) => {
                const isDone = step.status === 'DONE';
                const isInProgress = step.status === 'IN_PROGRESS';

                return (
                    <div key={step.id} className="relative pl-6">
                        {/* Dot */}
                        <div className={`absolute -left-[21px] top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center bg-background transition-colors
                            ${isDone ? 'border-emerald-500 text-emerald-500' :
                                isInProgress ? 'border-primary text-primary' :
                                    'border-muted-foreground/30 text-muted-foreground/30'
                            }`}
                        >
                            {isDone && <div className="w-2 h-2 bg-emerald-500 rounded-full" />}
                            {isInProgress && <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />}
                            {!isDone && !isInProgress && <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />}
                        </div>

                        {/* Content */}
                        <div className={`transition-opacity ${step.status === 'PENDING' ? 'opacity-60' : 'opacity-100'}`}>
                            <div className="flex items-center justify-between mb-1">
                                <h3 className={`font-semibold text-sm ${isInProgress ? 'text-primary' : 'text-foreground'}`}>
                                    {step.title}
                                </h3>
                                {step.date && (
                                    <span className="text-xs text-muted-foreground font-medium">
                                        {new Date(step.date).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                                {step.description}
                            </p>
                            {step.note && (
                                <div className="bg-muted/30 p-3 rounded-lg border border-border/50 text-xs text-muted-foreground italic">
                                    "{step.note}"
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
