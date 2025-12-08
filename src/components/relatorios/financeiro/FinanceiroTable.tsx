import { Download, FileText } from 'lucide-react';
import type { FinanceRecord } from '../../../data/mockReportsData';

interface FinanceiroTableProps {
    data: FinanceRecord[];
}

export const FinanceiroTable = ({ data }: FinanceiroTableProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pago':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Pago</span>;
            case 'pendente':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Pendente</span>;
            case 'atrasado':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20">Atrasado</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">Desconhecido</span>;
        }
    };

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border flex flex-col md:flex-row items-center justify-between gap-4 bg-muted/10">
                <h3 className="font-semibold text-foreground">Últimos Recebimentos</h3>
                <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <FileText size={14} /> Exportar CSV
                    </button>
                    <button className="px-3 py-1.5 text-xs font-medium border border-border rounded-lg hover:bg-muted/50 transition-colors flex items-center gap-2 text-muted-foreground hover:text-foreground">
                        <Download size={14} /> Exportar PDF
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/30 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Data</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Tipo de Contrato</th>
                            <th className="px-6 py-4">Meio de Pagamento</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Valor</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((record) => (
                            <tr key={record.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{formatDate(record.date)}</td>
                                <td className="px-6 py-4 font-medium text-foreground">{record.cliente}</td>
                                <td className="px-6 py-4 text-muted-foreground">{record.contratoTipo}</td>
                                <td className="px-6 py-4 text-muted-foreground">{record.meioPagamento}</td>
                                <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                                <td className="px-6 py-4 text-right font-medium text-foreground">{formatCurrency(record.valor)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-border bg-muted/5 flex justify-center">
                <button className="text-sm text-primary hover:underline font-medium">Ver todos os lançamentos</button>
            </div>
        </div>
    );
};
