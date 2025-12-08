import { MoreVertical, Mail, Phone, Eye, Edit, Archive } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { Cliente } from '../../data/mockClientes';

interface ClientesTableProps {
    clientes: Cliente[];
    onViewDetails: (cliente: Cliente) => void;
    onEdit: (cliente: Cliente) => void;
    onArchive: (cliente: Cliente) => void;
}

export const ClientesTable = ({ clientes, onViewDetails, onEdit, onArchive }: ClientesTableProps) => {
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActiveMenuId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setActiveMenuId(activeMenuId === id ? null : id);
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="px-6 py-3">Nome</th>
                            <th className="px-6 py-3">Contato</th>
                            <th className="px-6 py-3">Tipo de Processo</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {clientes.map((client) => (
                            <tr
                                key={client.id}
                                className="hover:bg-muted/50 transition-colors group cursor-pointer"
                                onClick={() => onViewDetails(client)}
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                            {client.nome.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-foreground">{client.nome}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-col gap-1 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail size={14} />
                                            {client.email || '-'}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone size={14} />
                                            {client.telefone || '-'}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-foreground">{client.tipoProcesso}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${client.status === 'ativo' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                        client.status === 'pendente' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                            client.status === 'em_analise' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                                                'bg-gray-500/10 text-gray-500 border-gray-500/20'
                                        }`}>
                                        {client.status === 'ativo' ? 'Ativo' :
                                            client.status === 'pendente' ? 'Pendente' :
                                                client.status === 'em_analise' ? 'Em Análise' :
                                                    'Arquivado'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right relative">
                                    <button
                                        onClick={(e) => toggleMenu(e, client.id)}
                                        className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/50 transition-colors"
                                    >
                                        <MoreVertical size={18} />
                                    </button>

                                    {activeMenuId === client.id && (
                                        <div
                                            ref={menuRef}
                                            className="absolute right-8 top-8 w-48 bg-card border border-border rounded-lg shadow-lg z-20 py-1 animate-in fade-in zoom-in-95 duration-200"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <button
                                                onClick={() => { onViewDetails(client); setActiveMenuId(null); }}
                                                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2"
                                            >
                                                <Eye size={16} className="text-muted-foreground" />
                                                Ver Detalhes
                                            </button>
                                            <button
                                                onClick={() => { onEdit(client); setActiveMenuId(null); }}
                                                className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center gap-2"
                                            >
                                                <Edit size={16} className="text-muted-foreground" />
                                                Editar Cliente
                                            </button>
                                            <button
                                                onClick={() => { onArchive(client); setActiveMenuId(null); }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                                            >
                                                <Archive size={16} />
                                                {client.status === 'arquivado' ? 'Desarquivar' : 'Arquivar'}
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="p-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                <span>Mostrando {clientes.length} resultados</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border border-border rounded hover:bg-muted/50 disabled:opacity-50" disabled>Anterior</button>
                    <button className="px-3 py-1 border border-border rounded hover:bg-muted/50 disabled:opacity-50" disabled>Próximo</button>
                </div>
            </div>
        </div>
    );
};
