
import { DollarSign, TrendingUp, TrendingDown, Download, Calendar } from 'lucide-react';

const transactions = [
    { id: 1, description: 'Honorários - Ana Silva', amount: 5000, type: 'income', date: '20 Nov 2024', category: 'Serviços' },
    { id: 2, description: 'Taxa de Protocolo - USCIS', amount: 750, type: 'expense', date: '19 Nov 2024', category: 'Taxas' },
    { id: 3, description: 'Honorários - Carlos Oliveira', amount: 3500, type: 'income', date: '18 Nov 2024', category: 'Serviços' },
    { id: 4, description: 'Aluguel Escritório', amount: 2000, type: 'expense', date: '05 Nov 2024', category: 'Operacional' },
    { id: 5, description: 'Consultoria - Mariana Santos', amount: 500, type: 'income', date: '01 Nov 2024', category: 'Consultoria' },
];

export const Financial = () => {
    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Financeiro</h1>
                    <p className="text-muted-foreground">Controle de receitas e despesas.</p>
                </div>
                <div className="flex flex-wrap gap-2 items-center">
                    {/* Month/Year Filter */}
                    <div className="bg-card border border-border rounded-lg flex items-center px-3 py-2 gap-2">
                        <Calendar size={18} className="text-muted-foreground" />
                        <select className="bg-transparent border-none text-sm font-medium focus:ring-0 outline-none cursor-pointer">
                            <option>Novembro 2024</option>
                            <option>Outubro 2024</option>
                            <option>Setembro 2024</option>
                        </select>
                    </div>

                    {/* Date Calendar Filter */}
                    <div className="bg-card border border-border rounded-lg flex items-center px-3 py-2 gap-2">
                        <input
                            type="date"
                            className="bg-transparent border-none text-sm font-medium focus:ring-0 outline-none"
                        />
                    </div>

                    <button className="bg-muted/50 text-foreground border border-border font-medium px-4 py-2 rounded-lg hover:bg-muted transition-colors flex items-center gap-2">
                        <Download size={20} />
                        <span className="hidden sm:inline">Exportar</span>
                    </button>
                    <button className="bg-primary text-black font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2">
                        <Plus size={20} />
                        <span className="hidden sm:inline">Nova Transação</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-green-500/10 text-green-500">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Receitas (Mês)</p>
                            <p className="text-2xl font-bold text-foreground">U$ 45.250,00</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-red-500/10 text-red-500">
                            <TrendingDown size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Despesas (Mês)</p>
                            <p className="text-2xl font-bold text-foreground">U$ 12.800,00</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card border border-border p-6 rounded-xl">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <DollarSign size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Saldo Líquido</p>
                            <p className="text-2xl font-bold text-foreground">U$ 32.450,00</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h3 className="text-lg font-bold">Transações Recentes</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-muted/50 text-muted-foreground font-medium">
                            <tr>
                                <th className="px-6 py-3">Descrição</th>
                                <th className="px-6 py-3">Categoria</th>
                                <th className="px-6 py-3">Data</th>
                                <th className="px-6 py-3 text-right">Valor</th>
                                <th className="px-6 py-3 text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {transactions.map((t) => (
                                <tr key={t.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-foreground">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${t.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {t.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                            </div>
                                            {t.description}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">{t.category}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{t.date}</td>
                                    <td className={`px-6 py-4 text-right font-medium ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                        {t.type === 'income' ? '+' : '-'} U$ {t.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-500 border border-green-500/20">
                                            Confirmado
                                        </span>
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

function Plus({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
