import { Search, Filter } from 'lucide-react';

interface ClientesSearchAndFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    onToggleFilters: () => void; // Placeholder for now, can be expanded
}

export const ClientesSearchAndFilters = ({ search, onSearchChange, onToggleFilters }: ClientesSearchAndFiltersProps) => {
    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
            <div className="p-4 border-b border-border flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar clientes..."
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-background border border-border rounded-lg pl-10 pr-4 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                </div>
                <button
                    onClick={onToggleFilters}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                    <Filter size={20} />
                    Filtros
                </button>
            </div>
        </div>
    );
};
