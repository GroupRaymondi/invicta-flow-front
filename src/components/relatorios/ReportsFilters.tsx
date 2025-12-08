import { Filter, Calendar, User, X } from 'lucide-react';
import type { PeriodPreset } from '../../data/mockReportsData';

interface ReportsFiltersProps {
    period: PeriodPreset;
    setPeriod: (period: PeriodPreset) => void;
    responsible: string;
    setResponsible: (responsible: string) => void;
    status: string;
    setStatus: (status: string) => void;
    onApply: () => void;
    onClear: () => void;
}

export const ReportsFilters = ({
    period,
    setPeriod,
    responsible,
    setResponsible,
    status,
    setStatus,
    onApply,
    onClear
}: ReportsFiltersProps) => {
    const isFiltered = period !== 'last30' || responsible !== '' || status !== '';

    return (
        <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
                <div className="flex flex-col md:flex-row gap-4 items-end flex-1 w-full">
                    {/* Período */}
                    <div className="w-full md:w-64 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Calendar size={12} /> Período
                        </label>
                        <select
                            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm cursor-pointer"
                            value={period}
                            onChange={(e) => setPeriod(e.target.value as PeriodPreset)}
                        >
                            <option value="last7">Últimos 7 dias</option>
                            <option value="last30">Últimos 30 dias</option>
                            <option value="last90">Últimos 90 dias</option>
                            <option value="year">Ano Atual</option>
                            <option value="custom">Personalizado</option>
                        </select>
                    </div>

                    {/* Responsável */}
                    <div className="w-full md:w-56 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <User size={12} /> Responsável
                        </label>
                        <select
                            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm cursor-pointer"
                            value={responsible}
                            onChange={(e) => setResponsible(e.target.value)}
                        >
                            <option value="">Todos os Responsáveis</option>
                            <option value="lucas">Dr. Lucas Raymondi</option>
                            <option value="ana">Dra. Ana Silva</option>
                            <option value="consultor_a">Consultor A</option>
                            <option value="consultor_b">Consultor B</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="w-full md:w-56 space-y-1.5">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                            <Filter size={12} /> Status
                        </label>
                        <select
                            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm cursor-pointer"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="">Todos os Status</option>
                            <option value="active">Ativos / Em Andamento</option>
                            <option value="completed">Concluídos / Pagos</option>
                            <option value="pending">Pendentes</option>
                            <option value="cancelled">Cancelados</option>
                        </select>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 w-full md:w-auto">
                    {isFiltered && (
                        <button
                            onClick={onClear}
                            className="px-3 py-2.5 border border-border rounded-lg text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all flex items-center justify-center gap-2 flex-1 md:flex-none"
                            title="Limpar Filtros"
                        >
                            <X size={18} />
                            <span className="md:hidden">Limpar</span>
                        </button>
                    )}
                    <button
                        onClick={onApply}
                        className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm flex-1 md:flex-none"
                    >
                        <Filter size={16} />
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
};
