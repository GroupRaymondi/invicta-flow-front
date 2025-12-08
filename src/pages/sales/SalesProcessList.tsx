import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Plus } from 'lucide-react';
import { mockSalesProcesses } from '../../data/mockSales';
import { StatusBadge } from '../../components/common/StatusBadge';

export const SalesProcessList = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredProcesses = useMemo(() => {
        return mockSalesProcesses.filter(process => {
            const matchesSearch =
                process.clientName.toLowerCase().includes(search.toLowerCase()) ||
                process.clientEmail.toLowerCase().includes(search.toLowerCase()) ||
                process.internalProcessNumber.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = statusFilter === 'all' || process.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Processos de Vendas</h1>
                    <p className="text-muted-foreground">Gerencie todos os processos de imigração.</p>
                </div>
                <button className="bg-primary text-white font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-sm">
                    <Plus size={20} />
                    Novo Processo
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-card border border-border rounded-xl p-4 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                    <input
                        type="text"
                        placeholder="Buscar por cliente, email ou número do processo..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <Filter size={18} className="text-muted-foreground" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="flex-1 md:w-48 px-3 py-2 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                        <option value="all">Todos os Status</option>
                        <option value="WAITING_PAYMENT">Aguardando Pagamento</option>
                        <option value="IN_PROGRESS">Em Andamento</option>
                        <option value="FILED_USCIS">Protocolado USCIS</option>
                        <option value="APPROVED">Aprovado</option>
                        <option value="DENIED">Negado</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-3">Processo</th>
                                <th className="px-6 py-3">Cliente</th>
                                <th className="px-6 py-3">Tipo</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Pagamento</th>
                                <th className="px-6 py-3">Atualizado em</th>
                                <th className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredProcesses.map((process) => (
                                <tr key={process.id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs text-muted-foreground">
                                        {process.internalProcessNumber}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="font-medium text-foreground">{process.clientName}</p>
                                            <p className="text-xs text-muted-foreground">{process.clientEmail}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded text-xs font-medium border border-slate-200 dark:border-slate-700">
                                            {process.processType.code}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={process.status} type="process" />
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={process.paymentStatus} type="payment" />
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground text-xs">
                                        {new Date(process.updatedAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => navigate(`/sales/processes/${process.id}`)}
                                            className="text-primary hover:text-primary/80 font-medium text-xs border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-md transition-colors"
                                        >
                                            Ver Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProcesses.length === 0 && (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-muted-foreground">
                                        Nenhum processo encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
