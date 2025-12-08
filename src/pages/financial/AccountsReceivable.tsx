
import {
    Search,
    Filter,
    Download,
    Plus,
    Calendar,
    MoreVertical,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';

const receivables = [
    { id: 1, client: 'Tech Solutions Ltda', description: 'Desenvolvimento Web - Mês 1', dueDate: '2024-11-25', amount: 15000.00, status: 'pending' },
    { id: 2, client: 'Ana Silva Advocacia', description: 'Consultoria UI/UX', dueDate: '2024-11-20', amount: 5000.00, status: 'received' },
    { id: 3, client: 'Grupo Oliveira', description: 'Manutenção Mensal', dueDate: '2024-11-15', amount: 2500.00, status: 'overdue' },
    { id: 4, client: 'StartUp One', description: 'Setup Inicial', dueDate: '2024-11-28', amount: 8000.00, status: 'pending' },
    { id: 5, client: 'Mercado Local', description: 'Identidade Visual', dueDate: '2024-11-10', amount: 3500.00, status: 'received' },
];

export const AccountsReceivable = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Contas a Receber</h1>
                    <p className="text-muted-foreground">Gerencie suas receitas e cobranças.</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    <button className="bg-muted/50 text-foreground border border-border font-medium px-4 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                        <Download size={20} />
                        <span className="hidden sm:inline">Exportar</span>
                    </button>
                    <button className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                        <Plus size={20} />
                        <span className="hidden sm:inline">Nova Receita</span>
                    </button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ArrowUpRight size={64} className="text-primary" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <ArrowUpRight size={24} />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Total a Receber</p>
                    </div>
                    <p className="text-3xl font-bold text-foreground">U$ 23.000,00</p>
                    <p className="text-xs text-muted-foreground mt-1">Próximos 30 dias</p>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <CheckCircle2 size={64} className="text-green-500" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                            <CheckCircle2 size={24} />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Recebido (Mês)</p>
                    </div>
                    <p className="text-3xl font-bold text-foreground">U$ 8.500,00</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
                        <ArrowUpRight size={12} />
                        +12% vs mês anterior
                    </p>
                </div>

                <div className="bg-card border border-border p-6 rounded-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <AlertCircle size={64} className="text-red-500" />
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                            <AlertCircle size={24} />
                        </div>
                        <p className="text-sm font-medium text-muted-foreground">Em Atraso</p>
                    </div>
                    <p className="text-3xl font-bold text-foreground">U$ 2.500,00</p>
                    <p className="text-xs text-red-500 mt-1">1 fatura vencida</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto bg-muted/30 px-3 py-2 rounded-lg border border-border focus-within:border-primary/50 transition-colors">
                    <Search size={18} className="text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar por cliente..."
                        className="bg-transparent border-none outline-none text-sm w-full md:w-64 placeholder:text-muted-foreground/70"
                    />
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="flex items-center gap-2 bg-background border border-border px-3 py-2 rounded-lg">
                        <Calendar size={16} className="text-muted-foreground" />
                        <select className="bg-transparent border-none text-sm font-medium outline-none cursor-pointer">
                            <option>Novembro 2024</option>
                            <option>Outubro 2024</option>
                            <option>Setembro 2024</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2 bg-background border border-border px-3 py-2 rounded-lg">
                        <Filter size={16} className="text-muted-foreground" />
                        <select className="bg-transparent border-none text-sm font-medium outline-none cursor-pointer">
                            <option value="all">Todos os Status</option>
                            <option value="pending">Pendente</option>
                            <option value="received">Recebido</option>
                            <option value="overdue">Atrasado</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4">Descrição</th>
                                <th className="px-6 py-4">Vencimento</th>
                                <th className="px-6 py-4 text-right">Valor</th>
                                <th className="px-6 py-4 text-center">Status</th>
                                <th className="px-6 py-4 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {receivables.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-foreground">{item.client}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{item.description}</td>
                                    <td className="px-6 py-4 text-muted-foreground flex items-center gap-2">
                                        <Clock size={14} className={item.status === 'overdue' ? 'text-red-500' : ''} />
                                        <span className={item.status === 'overdue' ? 'text-red-500 font-medium' : ''}>
                                            {new Date(item.dueDate).toLocaleDateString('pt-BR')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-foreground">
                                        U$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`
                                            inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border
                                            ${item.status === 'received' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                                            ${item.status === 'pending' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : ''}
                                            ${item.status === 'overdue' ? 'bg-red-500/10 text-red-500 border-red-500/20' : ''}
                                        `}>
                                            {item.status === 'received' && 'Recebido'}
                                            {item.status === 'pending' && 'Pendente'}
                                            {item.status === 'overdue' && 'Atrasado'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Simple) */}
                <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                    <span>Mostrando 5 de 12 registros</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors disabled:opacity-50" disabled>Anterior</button>
                        <button className="px-3 py-1 border border-border rounded hover:bg-muted transition-colors">Próximo</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
