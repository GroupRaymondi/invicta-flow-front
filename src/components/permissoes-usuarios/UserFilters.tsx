import { Search, Filter, X, Plus } from 'lucide-react';
import type { Role } from '../../data/mockRoles';

interface UserFiltersProps {
    filters: {
        search: string;
        role: string;
        status: string;
    };
    roles: Role[];
    setFilters: (filters: any) => void;
    onApply: () => void;
    onClear: () => void;
    onNewUser: () => void;
}

export const UserFilters = ({ filters, roles, setFilters, onApply, onClear, onNewUser }: UserFiltersProps) => {
    const handleChange = (key: string, value: string) => {
        setFilters((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="flex flex-col space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
                <div className="flex flex-col md:flex-row gap-4 items-end flex-1">
                    {/* Busca */}
                    <div className="w-full md:w-96 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Buscar</label>
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Nome ou email..."
                                className="w-full bg-background border border-border rounded-lg pl-10 pr-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                                value={filters.search}
                                onChange={(e) => handleChange('search', e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Papel */}
                    <div className="w-full md:w-48 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Papel</label>
                        <select
                            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm appearance-none cursor-pointer"
                            value={filters.role}
                            onChange={(e) => handleChange('role', e.target.value)}
                        >
                            <option value="">Todos os Papéis</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.nome}</option>
                            ))}
                        </select>
                    </div>

                    {/* Status */}
                    <div className="w-full md:w-48 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
                        <select
                            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm appearance-none cursor-pointer"
                            value={filters.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                        >
                            <option value="">Todos os Status</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="convite_pendente">Pendente</option>
                        </select>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex gap-2 pb-0.5">
                        {(filters.search || filters.role || filters.status) && (
                            <button
                                onClick={onClear}
                                className="px-3 py-2.5 border border-border rounded-lg text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all"
                                title="Limpar Filtros"
                            >
                                <X size={18} />
                            </button>
                        )}
                        <button
                            onClick={onApply}
                            className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-all flex items-center gap-2 shadow-sm"
                        >
                            <Filter size={16} />
                            Filtrar
                        </button>
                    </div>
                </div>

                {/* Primary Action */}
                <button
                    onClick={onNewUser}
                    className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    <Plus size={18} />
                    Novo Usuário
                </button>
            </div>
        </div>
    );
};
