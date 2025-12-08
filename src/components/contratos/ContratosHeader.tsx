import { Plus } from 'lucide-react';

interface ContratosHeaderProps {
    onNewContract: () => void;
}

export const ContratosHeader = ({ onNewContract }: ContratosHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Contratos</h1>
                <p className="text-muted-foreground">Gerencie todos os contratos ativos, em andamento e concluídos.</p>
            </div>
            <button
                onClick={onNewContract}
                className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 w-full md:w-auto justify-center"
            >
                <Plus size={20} />
                Novo Contrato
            </button>
        </div>
    );
};
