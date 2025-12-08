import { Filter, X } from 'lucide-react';

interface AuditFiltersProps {
    filters: {
        usuario: string;
        acao: string;
        entidade: string;
        entidadeId: string;
        dataInicio: string;
        dataFim: string;
    };
    setFilters: (filters: any) => void;
    onApply: () => void;
    onClear: () => void;
}

export const AuditFilters = ({ filters, setFilters, onApply, onClear }: AuditFiltersProps) => {
    const handleChange = (key: string, value: string) => {
        setFilters((prev: any) => ({ ...prev, [key]: value }));
    };

    return (
        <div className="bg-card border border-border rounded-xl p-4 mb-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Usuário */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Usuário</label>
                    <select
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        value={filters.usuario}
                        onChange={(e) => handleChange('usuario', e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Lucas Raymondi">Lucas Raymondi</option>
                        <option value="Fernanda Costa">Fernanda Costa</option>
                        <option value="Roberto Almeida">Roberto Almeida</option>
                    </select>
                </div>

                {/* Ação */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Ação</label>
                    <select
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        value={filters.acao}
                        onChange={(e) => handleChange('acao', e.target.value)}
                    >
                        <option value="">Todas</option>
                        <option value="Criação">Criação</option>
                        <option value="Edição">Edição</option>
                        <option value="Exclusão">Exclusão</option>
                        <option value="Login">Login</option>
                    </select>
                </div>

                {/* Entidade */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">Entidade</label>
                    <select
                        className="w-full bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        value={filters.entidade}
                        onChange={(e) => handleChange('entidade', e.target.value)}
                    >
                        <option value="">Todas</option>
                        <option value="cliente">Cliente</option>
                        <option value="contrato">Contrato</option>
                        <option value="processo">Processo</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="configuracoes">Configurações</option>
                    </select>
                </div>

                {/* ID da Entidade */}
                <div className="space-y-1">
                    <label className="text-xs font-medium text-muted-foreground">ID da Entidade</label>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Ex: cli-123"
                            className="w-full bg-background border border-border rounded-lg pl-3 pr-3 py-2 text-sm focus:outline-none focus:border-primary"
                            value={filters.entidadeId}
                            onChange={(e) => handleChange('entidadeId', e.target.value)}
                        />
                    </div>
                </div>

                {/* Período */}
                <div className="space-y-1 lg:col-span-2">
                    <label className="text-xs font-medium text-muted-foreground">Período</label>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                            value={filters.dataInicio}
                            onChange={(e) => handleChange('dataInicio', e.target.value)}
                        />
                        <span className="text-muted-foreground self-center">-</span>
                        <input
                            type="date"
                            className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary"
                            value={filters.dataFim}
                            onChange={(e) => handleChange('dataFim', e.target.value)}
                        />
                    </div>
                </div>

                {/* Botões */}
                <div className="flex items-end gap-2 lg:col-span-2 justify-end">
                    <button
                        onClick={onClear}
                        className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex items-center gap-2"
                    >
                        <X size={16} />
                        Limpar
                    </button>
                    <button
                        onClick={onApply}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm"
                    >
                        <Filter size={16} />
                        Aplicar Filtros
                    </button>
                </div>
            </div>
        </div>
    );
};
