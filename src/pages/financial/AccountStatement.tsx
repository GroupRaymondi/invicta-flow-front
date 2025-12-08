import {
    Search,
    Filter,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical
} from 'lucide-react';

const transactions = [
    { id: 1, date: '2024-11-24', description: 'Pagamento Cliente - Tech Solutions', type: 'credit', amount: 15000.00, balance: 45250.00, category: 'Receita' },
    { id: 2, date: '2024-11-23', description: 'Compra Equipamentos - Dell', type: 'debit', amount: 4500.00, balance: 30250.00, category: 'Equipamentos' },
    { id: 3, date: '2024-11-22', description: 'Pagamento Aluguel', type: 'debit', amount: 2000.00, balance: 34750.00, category: 'Operacional' },
    { id: 4, date: '2024-11-20', description: 'Consultoria - Ana Silva', type: 'credit', amount: 5000.00, balance: 36750.00, category: 'Serviços' },
    { id: 5, date: '2024-11-19', description: 'Taxas Bancárias', type: 'debit', amount: 45.90, balance: 31750.00, category: 'Taxas' },
];

export const AccountStatement = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Extrato de Conta</h1>
                    <p className="text-muted-foreground">Visualize o histórico detalhado de movimentações.</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    <div className="bg-card border border-border rounded-lg flex items-center px-3 py-2 gap-2">
                        <Calendar size={18} className="text-muted-foreground" />
                        <span className="text-sm font-medium">01 Nov - 30 Nov, 2024</span>
                    </div>
                    <button className="bg-muted/50 text-foreground border border-border font-medium px-4 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                        <Download size={20} />
                        <span className="hidden sm:inline">Exportar Extrato</span>
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Saldo Inicial</p>
                    <p className="text-xl font-bold text-foreground">U$ 31.795,90</p>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Total Entradas</p>
                    <p className="text-xl font-bold text-green-500 flex items-center gap-1">
                        <ArrowUpRight size={16} />
                        U$ 20.000,00
                    </p>
                </div>
                <div className="bg-card border border-border p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Total Saídas</p>
                    <p className="text-xl font-bold text-red-500 flex items-center gap-1">
                        <ArrowDownRight size={16} />
                        U$ 6.545,90
                    </p>
                </div>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                    <p className="text-sm text-primary mb-1 font-medium">Saldo Atual</p>
                    <p className="text-xl font-bold text-foreground">U$ 45.250,00</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-2 w-full md:w-auto bg-card px-3 py-2 rounded-lg border border-border focus-within:border-primary/50 transition-colors">
                    <Search size={18} className="text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Buscar lançamentos..."
                        className="bg-transparent border-none outline-none text-sm w-full md:w-64 placeholder:text-muted-foreground/70"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors" title="Filtrar">
                        <Filter size={20} />
                    </button>
                </div>
            </div>

            {/* Statement List */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/30 text-muted-foreground font-medium border-b border-border">
                            <tr>
                                <th className="px-6 py-4">Data</th>
                                <th className="px-6 py-4">Descrição</th>
                                <th className="px-6 py-4">Categoria</th>
                                <th className="px-6 py-4 text-right">Valor</th>
                                <th className="px-6 py-4 text-right">Saldo</th>
                                <th className="px-6 py-4 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {transactions.map((item) => (
                                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                        {new Date(item.date).toLocaleDateString('pt-BR')}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${item.type === 'credit' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {item.type === 'credit' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                                            </div>
                                            {item.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground border border-border">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-right font-medium ${item.type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                                        {item.type === 'credit' ? '+' : '-'} U$ {item.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-right font-medium text-foreground">
                                        U$ {item.balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreVertical size={16} />
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
