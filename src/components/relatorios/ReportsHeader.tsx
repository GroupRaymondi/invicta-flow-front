import { BarChart3 } from 'lucide-react';

export const ReportsHeader = () => {
    return (
        <div className="flex flex-col gap-2 mb-8">
            <h1 className="text-3xl font-bold text-foreground tracking-tight flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <BarChart3 size={24} />
                </div>
                Relatórios
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl">
                Visualize indicadores e métricas do sistema de forma consolidada para tomada de decisões estratégicas.
            </p>
        </div>
    );
};
