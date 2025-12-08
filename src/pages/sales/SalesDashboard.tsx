import { Users, FileText, CheckCircle, Clock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockSalesProcesses } from '../../data/mockSales';
import { StatusBadge } from '../../components/common/StatusBadge';

export const SalesDashboard = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Processos', value: mockSalesProcesses.length, icon: <FileText className="text-blue-500" />, bg: 'bg-blue-50 dark:bg-blue-500/10' },
        { label: 'Aguardando Pagamento', value: mockSalesProcesses.filter(p => p.status === 'WAITING_PAYMENT').length, icon: <Clock className="text-amber-500" />, bg: 'bg-amber-50 dark:bg-amber-500/10' },
        { label: 'Em Andamento', value: mockSalesProcesses.filter(p => p.status === 'IN_PROGRESS').length, icon: <Users className="text-indigo-500" />, bg: 'bg-indigo-50 dark:bg-indigo-500/10' },
        { label: 'Aprovados', value: mockSalesProcesses.filter(p => p.status === 'APPROVED').length, icon: <CheckCircle className="text-emerald-500" />, bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    ];

    const recentProcesses = [...mockSalesProcesses].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard de Vendas</h1>
                <p className="text-muted-foreground">Visão geral dos processos de imigração e vendas.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${stat.bg}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Processes */}
            <div className="bg-white dark:bg-card border border-border rounded-xl shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-bold text-foreground">Processos Recentes</h2>
                    <button
                        onClick={() => navigate('/sales/processes')}
                        className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
                    >
                        Ver todos <ArrowRight size={14} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-3">Cliente</th>
                                <th className="px-6 py-3">Tipo de Processo</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Pagamento</th>
                                <th className="px-6 py-3">Contrato</th>
                                <th className="px-6 py-3 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentProcesses.map((process) => (
                                <tr key={process.id} className="hover:bg-muted/30 transition-colors">
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
                                    <td className="px-6 py-4">
                                        <StatusBadge status={process.contractStatus} type="contract" />
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => navigate(`/sales/processes/${process.id}`)}
                                            className="text-primary hover:text-primary/80 font-medium text-xs border border-primary/20 bg-primary/5 px-3 py-1.5 rounded-md transition-colors"
                                        >
                                            Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
