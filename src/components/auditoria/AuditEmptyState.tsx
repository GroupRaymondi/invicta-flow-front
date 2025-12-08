import { SearchX } from 'lucide-react';

export const AuditEmptyState = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-border rounded-xl bg-muted/10">
            <div className="p-4 rounded-full bg-muted/20 text-muted-foreground mb-4">
                <SearchX size={32} />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-1">Nenhum registro encontrado</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
                Tente ajustar os filtros ou buscar por outro termo para encontrar o que procura.
            </p>
        </div>
    );
};
