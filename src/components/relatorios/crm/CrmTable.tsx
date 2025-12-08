import type { LeadReport } from '../../../data/mockReportsData';

interface CrmTableProps {
    data: LeadReport[];
}

export const CrmTable = ({ data }: CrmTableProps) => {
    const getFunnelBadge = (stage: string) => {
        switch (stage) {
            case 'Fechado':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">{stage}</span>;
            case 'Proposta Enviada':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">{stage}</span>;
            case 'Reunião Agendada':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 border border-purple-500/20">{stage}</span>;
            case 'Perdido':
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-500/10 text-rose-500 border border-rose-500/20">{stage}</span>;
            default:
                return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">{stage}</span>;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/10">
                <h3 className="font-semibold text-foreground">Leads Recentes</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/30 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Nome</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Origem</th>
                            <th className="px-6 py-4">Etapa do Funil</th>
                            <th className="px-6 py-4">Responsável</th>
                            <th className="px-6 py-4">Última Atividade</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((lead) => (
                            <tr key={lead.id} className="hover:bg-muted/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-foreground">{lead.nome}</td>
                                <td className="px-6 py-4 text-muted-foreground">{lead.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted text-muted-foreground border border-border">
                                        {lead.origem}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{getFunnelBadge(lead.etapaFunil)}</td>
                                <td className="px-6 py-4 text-muted-foreground">{lead.responsavel}</td>
                                <td className="px-6 py-4 text-muted-foreground text-xs">{formatDate(lead.ultimaAtividade)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="p-4 border-t border-border bg-muted/5 flex justify-center">
                <button className="text-sm text-primary hover:underline font-medium">Ver todos os leads</button>
            </div>
        </div>
    );
};
