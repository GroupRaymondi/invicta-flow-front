import { Briefcase } from 'lucide-react';

interface EmptyStateProps {
    title?: string;
    description?: string;
}

export const EmptyState = ({
    title = "Nenhuma comissão encontrada",
    description = "Não há dados para exibir com os filtros selecionados."
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center bg-muted/5 border border-dashed border-border rounded-xl animate-in fade-in zoom-in-95 duration-300">
            <div className="p-4 rounded-full bg-muted/20 text-muted-foreground mb-4">
                <Briefcase size={32} strokeWidth={1.5} />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-sm">
                {description}
            </p>
        </div>
    );
};
