import { Filter, Calendar, User, X } from 'lucide-react';
import { mockVendedores } from '../../data/mockComissoesData';

export type PeriodPreset = 'last30' | 'last90' | 'year' | 'custom';
export type CommissionStatusFilter = 'all' | 'paga' | 'em_aberto' | 'atrasada';

interface ComissoesFiltersProps {
    period: PeriodPreset;
    setPeriod: (period: PeriodPreset) => void;
    selectedSeller: string;
    setSelectedSeller: (sellerId: string) => void;
    status: CommissionStatusFilter;
    setStatus: (status: CommissionStatusFilter) => void;
    onApply: () => void;
    onClear: () => void;
}

export const ComissoesFilters = ({
    period,
    setPeriod,
    selectedSeller,
    setSelectedSeller,
    status,
    setStatus,
    onApply,
    onClear
}: ComissoesFiltersProps) => {
    return (
        <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-end lg:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">

                    {/* Period Filter */}
                    <div className="flex-1 md:w-48">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Período</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <select
                                value={period}
                                onChange={(e) => setPeriod(e.target.value as PeriodPreset)}
                                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer hover:bg-accent/50 transition-colors"
                            >
                                <option value="last30">Últimos 30 dias</option>
                                <option value="last90">Últimos 90 dias</option>
                                <option value="year">Ano atual</option>
                                <option value="custom">Personalizado</option>
                            </select>
                        </div>
                    </div>

                    {/* Seller Filter */}
                    <div className="flex-1 md:w-56">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Vendedor / Parceiro</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <select
                                value={selectedSeller}
                                onChange={(e) => setSelectedSeller(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer hover:bg-accent/50 transition-colors"
                            >
                                <option value="all">Todos os vendedores</option>
                                {mockVendedores.map((vendedor) => (
                                    <option key={vendedor.id} value={vendedor.id}>
                                        {vendedor.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Status Filter */}
                    <div className="flex-1 md:w-48">
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Status</label>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as CommissionStatusFilter)}
                                className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none cursor-pointer hover:bg-accent/50 transition-colors"
                            >
                                <option value="all">Todas as comissões</option>
                                <option value="paga">Pagas</option>
                                <option value="em_aberto">Em aberto</option>
                                <option value="atrasada">Atrasadas</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full lg:w-auto">
                    <button
                        onClick={onClear}
                        className="flex-1 lg:flex-none px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <X size={16} />
                        Limpar
                    </button>
                    <button
                        onClick={onApply}
                        className="flex-1 lg:flex-none px-6 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow active:scale-95"
                    >
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
};
