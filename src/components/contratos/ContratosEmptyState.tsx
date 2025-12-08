import { FileX } from 'lucide-react';

interface ContratosEmptyStateProps {
    onClearFilters?: () => void;
}

export const ContratosEmptyState = ({ onClearFilters }: ContratosEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-card border border-border rounded-xl border-dashed">
            <div className="bg-muted/50 p-4 rounded-full mb-4">
                <FileX size={48} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Nenhum contrato encontrado</h3>
            <p className="text-muted-foreground max-w-sm mb-6">
                Não encontramos contratos com os filtros selecionados. Tente ajustar sua busca.
            </p>
            {onClearFilters && (
                <button
                    onClick={onClearFilters}
                    className="text-primary font-medium hover:underline"
                >
                    Limpar filtros
                </button>
            )}
        </div>
    );
};
