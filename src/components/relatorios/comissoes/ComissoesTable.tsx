import type { ComissaoReport } from '../../../data/mockReportsData';

interface ComissoesTableProps {
    data: ComissaoReport[];
}

export const ComissoesTable = ({ data }: ComissoesTableProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paga':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">Paga</span>;
            case 'em_aberto':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">Em Aberto</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">{status}</span>;
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
            <div className="p-4 border-b border-border bg-muted/10">
                <h3 className="font-semibold text-foreground">Detalhamento de Comissões</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/30 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Vendedor/Parceiro</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Contrato</th>
                            <th className="px-6 py-4 text-right">Valor Contrato</th>
                            <th className="px-6 py-4 text-center">%</th>
                            <th className="px-6 py-4 text-right">Comissão</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Previsão Pagto</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((comissao) => (
                            <tr key={comissao.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">{comissao.vendedor}</td>
                                <td className="px-6 py-4 text-muted-foreground">{comissao.cliente}</td>
                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{comissao.contrato}</td>
                                <td className="px-6 py-4 text-right text-muted-foreground">{formatCurrency(comissao.valorContrato)}</td>
                                <td className="px-6 py-4 text-center text-muted-foreground">{comissao.percentual}%</td>
                                <td className="px-6 py-4 text-right font-medium text-foreground">{formatCurrency(comissao.valorComissao)}</td>
                                <td className="px-6 py-4">{getStatusBadge(comissao.status)}</td>
                                <td className="px-6 py-4 text-muted-foreground text-xs">{formatDate(comissao.dataPrevistaPagamento)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-border bg-muted/5 flex justify-center">
                <button className="text-sm text-primary hover:underline font-medium">Ver todas as comissões</button>
            </div>
        </div>
    );
};
