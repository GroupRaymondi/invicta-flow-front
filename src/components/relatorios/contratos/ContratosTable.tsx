import type { ContratoReport } from '../../../data/mockReportsData';

interface ContratosTableProps {
    data: ContratoReport[];
}

export const ContratosTable = ({ data }: ContratosTableProps) => {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'Aprovado':
            case 'Concluído':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">{status}</span>;
            case 'Em Andamento':
            case 'Processo Iniciado':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">{status}</span>;
            case 'RFE':
            case 'Em Análise':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">{status}</span>;
            case 'Negado':
            case 'Cancelado':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20">{status}</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">{status}</span>;
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/10">
                <h3 className="font-semibold text-foreground">Contratos Recentes</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/30 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Nº Contrato</th>
                            <th className="px-6 py-4">Cliente</th>
                            <th className="px-6 py-4">Tipo</th>
                            <th className="px-6 py-4">Responsável</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Início</th>
                            <th className="px-6 py-4">Previsão</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((contrato) => (
                            <tr key={contrato.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-mono text-xs text-muted-foreground">{contrato.numero}</td>
                                <td className="px-6 py-4 font-medium text-foreground">{contrato.cliente}</td>
                                <td className="px-6 py-4 text-muted-foreground">{contrato.tipo}</td>
                                <td className="px-6 py-4 text-muted-foreground">{contrato.responsavel}</td>
                                <td className="px-6 py-4">{getStatusBadge(contrato.status)}</td>
                                <td className="px-6 py-4 text-muted-foreground text-xs">{formatDate(contrato.dataInicio)}</td>
                                <td className="px-6 py-4 text-muted-foreground text-xs">{formatDate(contrato.dataEstimativaConclusao)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-border bg-muted/5 flex justify-center">
                <button className="text-sm text-primary hover:underline font-medium">Ver todos os contratos</button>
            </div>
        </div>
    );
};
