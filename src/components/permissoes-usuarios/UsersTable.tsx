import { MoreVertical, Eye, Edit, Power, Lock } from 'lucide-react';
import type { User } from '../../data/mockUsers';
import type { Role } from '../../data/mockRoles';
import { useState } from 'react';

interface UsersTableProps {
    users: User[];
    roles: Role[];
    onViewDetails: (user: User) => void;
    onEdit: (user: User) => void;
    onToggleStatus: (user: User) => void;
}

export const UsersTable = ({ users, roles, onViewDetails, onEdit, onToggleStatus }: UsersTableProps) => {
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);

    const getRoleName = (roleId: string) => {
        return roles.find(r => r.id === roleId)?.nome || roleId;
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ativo':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
                        Ativo
                    </span>
                );
            case 'inativo':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/10 text-red-600 border border-red-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5"></span>
                        Inativo
                    </span>
                );
            case 'convite_pendente':
                return (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
                        Pendente
                    </span>
                );
            default:
                return null;
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return <span className="text-muted-foreground/50">-</span>;
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm min-h-[400px]">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-muted/30 text-muted-foreground font-semibold text-xs uppercase tracking-wider border-b border-border">
                        <tr>
                            <th className="px-6 py-4">Nome</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Papel</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Último Acesso</th>
                            <th className="px-6 py-4 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-muted/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-foreground">{user.nome}</div>
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border/50">
                                        {getRoleName(user.roleId)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">{getStatusBadge(user.status)}</td>
                                <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{formatDate(user.ultimoAcesso)}</td>
                                <td className="px-6 py-4 text-right relative">
                                    <div className="flex items-center justify-end gap-1">
                                        <button
                                            onClick={() => onViewDetails(user)}
                                            className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                            title="Ver Detalhes"
                                        >
                                            <Eye size={18} />
                                        </button>

                                        <div className="relative">
                                            <button
                                                onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                                                className={`p-2 rounded-lg transition-colors ${openMenuId === user.id ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                                            >
                                                <MoreVertical size={18} />
                                            </button>

                                            {openMenuId === user.id && (
                                                <>
                                                    <div
                                                        className="fixed inset-0 z-10"
                                                        onClick={() => setOpenMenuId(null)}
                                                    />
                                                    <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-xl z-20 py-1 animate-in fade-in zoom-in-95 duration-200 ring-1 ring-black/5">
                                                        <button
                                                            onClick={() => { onEdit(user); setOpenMenuId(null); }}
                                                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2 transition-colors"
                                                        >
                                                            <Edit size={14} /> Editar
                                                        </button>
                                                        <button
                                                            onClick={() => { onToggleStatus(user); setOpenMenuId(null); }}
                                                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-accent hover:text-accent-foreground flex items-center gap-2 transition-colors"
                                                        >
                                                            <Power size={14} /> {user.status === 'ativo' ? 'Desativar' : 'Ativar'}
                                                        </button>
                                                        <div className="h-px bg-border my-1" />
                                                        <button
                                                            className="w-full text-left px-4 py-2.5 text-sm hover:bg-red-50 hover:text-red-600 flex items-center gap-2 text-muted-foreground transition-colors"
                                                        >
                                                            <Lock size={14} /> Redefinir Senha
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
