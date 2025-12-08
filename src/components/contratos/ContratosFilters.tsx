import { Search, Filter, X } from 'lucide-react';
import { mockConsultores, mockTiposContrato, type ContratoStatus } from '../../data/mockContratos';

interface ContratosFiltersProps {
    filters: {
        search: string;
        status: ContratoStatus | 'all';
        tipo: string;
        responsavel: string;
        dateStart: string;
        dateEnd: string;
    };
    onFilterChange: (key: string, value: string) => void;
    onClearFilters: () => void;
}

export const ContratosFilters = ({ filters, onFilterChange, onClearFilters }: ContratosFiltersProps) => {
    return (
        <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente, contrato ou email..."
                        value={filters.search}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>

                {/* Status */}
                <div className="w-full md:w-48">
                    <select
                        value={filters.status}
                        onChange={(e) => onFilterChange('status', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                    >
                        <option value="all">Todos os Status</option>
                        <option value="rascunho">Rascunho</option>
                        <option value="em_analise">Em Análise</option>
                        <option value="assinado">Assinado</option>
                        <option value="em_andamento">Em Andamento</option>
                        <option value="concluido">Concluído</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>

                {/* Tipo */}
                <div className="w-full md:w-48">
                    <select
                        value={filters.tipo}
                        onChange={(e) => onFilterChange('tipo', e.target.value)}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer"
                    >
                        <option value="">Todos os Tipos</option>
                        {mockTiposContrato.map((tipo) => (
                            <option key={tipo} value={tipo}>{tipo}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-center justify-between pt-2 border-t border-border/50">
                <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                    {/* Responsável */}
                    <div className="w-full md:w-64">
                        <select
                            value={filters.responsavel}
                            onChange={(e) => onFilterChange('responsavel', e.target.value)}
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none cursor-pointer text-sm"
                        >
                            <option value="">Todos os Responsáveis</option>
                            {mockConsultores.map((consultor) => (
                                <option key={consultor} value={consultor}>{consultor}</option>
                            ))}
                        </select>
                    </div>

                    {/* Date Range */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <input
                            type="date"
                            value={filters.dateStart}
                            onChange={(e) => onFilterChange('dateStart', e.target.value)}
                            className="w-full md:w-auto px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                        />
                        <span className="text-muted-foreground">-</span>
                        <input
                            type="date"
                            value={filters.dateEnd}
                            onChange={(e) => onFilterChange('dateEnd', e.target.value)}
                            className="w-full md:w-auto px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm"
                        />
                    </div>
                </div>

                <div className="flex gap-2 w-full md:w-auto">
                    <button
                        onClick={onClearFilters}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors flex items-center gap-2"
                    >
                        <X size={16} />
                        Limpar
                    </button>
                    <button className="px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-lg transition-colors flex items-center gap-2">
                        <Filter size={16} />
                        Aplicar
                    </button>
                </div>
            </div>
        </div>
    );
};
