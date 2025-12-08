import { ArrowUpDown, Eye, Monitor, Smartphone, Globe } from 'lucide-react';
import type { AuditLogEntry } from '../../data/mockAuditLogs';

interface AuditTableProps {
    logs: AuditLogEntry[];
    onViewDetails: (log: AuditLogEntry) => void;
    sortOrder: 'asc' | 'desc';
    onSortToggle: () => void;
}

export const AuditTable = ({ logs, onViewDetails, sortOrder, onSortToggle }: AuditTableProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getEntityBadgeColor = (entity: string) => {
        switch (entity) {
            case 'cliente': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'contrato': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'processo': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
            case 'financeiro': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'configuracoes': return 'bg-gray-500/10 text-gray-500 border-gray-500/20';
            default: return 'bg-muted text-muted-foreground border-border';
        }
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-6 py-3 cursor-pointer hover:text-foreground transition-colors" onClick={onSortToggle}>
                                <div className="flex items-center gap-2">
                                    Data/Hora
                                    <ArrowUpDown size={14} className={sortOrder === 'asc' ? 'rotate-180' : ''} />
                                </div>
                            </th>
                            <th className="px-6 py-3">Usuário</th>
                            <th className="px-6 py-3">Ação</th>
                            <th className="px-6 py-3">Entidade</th>
                            <th className="px-6 py-3">IP / Device</th>
                            <th className="px-6 py-3 text-right">Detalhes</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {logs.map((log) => (
                            <tr key={log.id} className="hover:bg-muted/50 transition-colors group">
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-foreground">
                                    {formatDate(log.criadoEm)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-foreground">{log.usuarioNome}</span>
                                        <span className="text-xs text-muted-foreground">{log.usuarioRole}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-foreground">
                                    {log.acao}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${getEntityBadgeColor(log.entidade)}`}>
                                            {log.entidade}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-mono">
                                            {log.entidadeId}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                                        <div className="flex items-center gap-1">
                                            <Globe size={12} />
                                            {log.ip}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {log.device.toLowerCase().includes('mobile') || log.device.toLowerCase().includes('ios') || log.device.toLowerCase().includes('android') ? (
                                                <Smartphone size={12} />
                                            ) : (
                                                <Monitor size={12} />
                                            )}
                                            <span className="truncate max-w-[150px]" title={log.device}>{log.device}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => onViewDetails(log)}
                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                        title="Ver Detalhes"
                                    >
                                        <Eye size={18} />
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
