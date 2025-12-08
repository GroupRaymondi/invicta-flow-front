import { Eye, MoreHorizontal } from 'lucide-react';
import type { Contrato } from '../../data/mockContratos';

interface ContratosTableProps {
    contratos: Contrato[];
    onViewDetails: (contrato: Contrato) => void;
}

export const ContratosTable = ({ contratos, onViewDetails }: ContratosTableProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'rascunho':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">Rascunho</span>;
            case 'em_analise':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-800">Em Análise</span>;
            case 'assinado':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">Assinado</span>;
            case 'em_andamento':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200 dark:border-amber-800">Em Andamento</span>;
            case 'concluido':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">Concluído</span>;
            case 'cancelado':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border border-rose-200 dark:border-rose-800">Cancelado</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Desconhecido</span>;
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
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-6 py-4 whitespace-nowrap">Nº Contrato</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Tipo</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Responsável</th>
                            <th className="px-6 py-4 text-right">Valor Total</th>
                            <th className="px-6 py-4">Criação</th>
                            <th className="px-6 py-4">Previsão</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {contratos.map((contrato) => (
                            <tr
                                key={contrato.id}
                                className="hover:bg-muted/50 transition-colors group cursor-pointer"
                                onClick={() => onViewDetails(contrato)}
                            >
                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground whitespace-nowrap">
                                    {contrato.numero}
                                </td>
                                <td className="px-6 py-4 font-medium text-foreground">
                                    {contrato.clienteNome}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                    {contrato.tipo}
                                </td>
                                <td className="px-6 py-4">
                                    {getStatusBadge(contrato.status)}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground text-xs">
                                    {contrato.responsavel}
                                </td>
                                <td className="px-6 py-4 text-right font-medium text-foreground whitespace-nowrap">
                                    {formatCurrency(contrato.valorTotal)}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                                    {formatDate(contrato.dataCriacao)}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground text-xs whitespace-nowrap">
                                    {contrato.dataPrevistaConclusao ? formatDate(contrato.dataPrevistaConclusao) : '-'}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onViewDetails(contrato);
                                            }}
                                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                            title="Ver Detalhes"
                                        >
                                            <Eye size={16} />
                                        </button>
                                        <button
                                            onClick={(e) => e.stopPropagation()}
                                            className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                        >
                                            <MoreHorizontal size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination Mock */}
            <div className="p-4 border-t border-border bg-muted/5 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                    Mostrando <span className="font-medium text-foreground">1</span> a <span className="font-medium text-foreground">{contratos.length}</span> de <span className="font-medium text-foreground">{contratos.length}</span> resultados
                </p>
                <div className="flex gap-2">
                    <button disabled className="px-3 py-1 text-xs font-medium border border-border rounded-lg bg-muted/50 text-muted-foreground cursor-not-allowed">
                        Anterior
                    </button>
                    <button disabled className="px-3 py-1 text-xs font-medium border border-border rounded-lg bg-muted/50 text-muted-foreground cursor-not-allowed">
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
};
