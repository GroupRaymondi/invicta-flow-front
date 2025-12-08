import { Edit, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { Comissao } from '../../../data/mockComissoesData';

interface LancamentosTableProps {
    commissions: Comissao[];
    onEdit: (commission: Comissao) => void;
}

export const LancamentosTable = ({ commissions, onEdit }: LancamentosTableProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'paga':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500"><CheckCircle size={12} /> Paga</span>;
            case 'em_aberto':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500"><Clock size={12} /> Em Aberto</span>;
            case 'atrasada':
                return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500"><AlertCircle size={12} /> Atrasada</span>;
            default:
                return null;
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-4 py-3">Data</th>
                            <th className="px-4 py-3">Vendedor</th>
                            <th className="px-4 py-3">Cliente</th>
                            <th className="px-4 py-3">Contrato</th>
                            <th className="px-4 py-3">Valor Contrato</th>
                            <th className="px-4 py-3 text-center">%</th>
                            <th className="px-4 py-3">Comissão</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Previsão Pagto</th>
                            <th className="px-4 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {commissions.map((item) => (
                            <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-4 py-3 text-muted-foreground">
                                    {new Date(item.criadoEm).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-4 py-3 font-medium text-foreground">
                                    {/* In a real app we would lookup the name, here we assume we have it or use ID */}
                                    {/* For mock purposes, let's just show ID or a placeholder if we don't join data */}
                                    Vendedor {item.vendedorId}
                                </td>
                                <td className="px-4 py-3 text-foreground">{item.cliente}</td>
                                <td className="px-4 py-3 text-muted-foreground">{item.contrato}</td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {item.valorContrato.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </td>
                                <td className="px-4 py-3 text-center text-muted-foreground">{item.percentual}%</td>
                                <td className="px-4 py-3 font-medium text-foreground">
                                    {item.valorComissao.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                </td>
                                <td className="px-4 py-3">
                                    {getStatusBadge(item.status)}
                                </td>
                                <td className="px-4 py-3 text-muted-foreground">
                                    {new Date(item.dataPrevistaPagamento).toLocaleDateString('pt-BR')}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        title="Editar"
                                    >
                                        <Edit size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
