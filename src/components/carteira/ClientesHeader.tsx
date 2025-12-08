import { Plus } from 'lucide-react';

interface ClientesHeaderProps {
    onNewClient: () => void;
}

export const ClientesHeader = ({ onNewClient }: ClientesHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Clientes</h1>
                <p className="text-muted-foreground">Gerencie seus clientes e processos.</p>
            </div>
            <button
                onClick={onNewClient}
                className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20 w-full md:w-auto justify-center"
            >
                <Plus size={20} />
                Novo Cliente
            </button>
        </div>
    );
};
