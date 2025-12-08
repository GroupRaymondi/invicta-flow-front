import { X, User as UserIcon, Mail, Calendar, Clock, Shield } from 'lucide-react';
import type { User } from '../../data/mockUsers';
import type { Role } from '../../data/mockRoles';
import { motion, AnimatePresence } from 'framer-motion';

interface UserDetailsDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: User | null;
    roles: Role[];
    onEdit: (user: User) => void;
}

export const UserDetailsDrawer = ({ isOpen, onClose, user, roles, onEdit }: UserDetailsDrawerProps) => {
    if (!user) return null;

    const role = roles.find(r => r.id === user.roleId);

    const formatDate = (dateString?: string) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-background border-l border-border shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-border flex items-start justify-between bg-muted/10">
                            <div>
                                <h2 className="text-xl font-bold text-foreground mb-1">Detalhes do Usuário</h2>
                                <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium border border-primary/20 uppercase">
                                    {role?.nome}
                                </span>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-8">

                            {/* Info Geral */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2 text-foreground tracking-tight">
                                    <UserIcon size={18} className="text-primary" />
                                    Informações Gerais
                                </h3>

                                <div className="space-y-5 bg-card border border-border rounded-xl p-5 shadow-sm">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                                            {user.nome.charAt(0)}
                                        </div>
                                        <div className="space-y-0.5">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Nome Completo</label>
                                            <p className="text-base font-semibold text-foreground">{user.nome}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground border border-border/50">
                                            <Mail size={16} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Email</label>
                                            <p className="text-sm font-medium text-foreground">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-4">
                                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground border border-border/50">
                                            <Shield size={16} />
                                        </div>
                                        <div className="space-y-0.5">
                                            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Status</label>
                                            <p className="text-sm font-medium capitalize text-foreground">{user.status.replace('_', ' ')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Metadados */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2 text-foreground tracking-tight">
                                    <Clock size={18} className="text-primary" />
                                    Atividade
                                </h3>

                                <div className="grid grid-cols-2 gap-4 bg-card border border-border rounded-xl p-5 shadow-sm">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Calendar size={10} /> Data de Criação
                                        </label>
                                        <p className="text-sm font-mono text-foreground bg-muted/30 px-2 py-1 rounded border border-border/50 inline-block">
                                            {formatDate(user.criadoEm)}
                                        </p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                                            <Clock size={10} /> Último Acesso
                                        </label>
                                        <p className="text-sm font-mono text-foreground bg-muted/30 px-2 py-1 rounded border border-border/50 inline-block">
                                            {formatDate(user.ultimoAcesso)}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Permissões Resumidas */}
                            <div className="space-y-4">
                                <h3 className="font-bold text-lg flex items-center gap-2 text-foreground tracking-tight">
                                    <Shield size={18} className="text-primary" />
                                    Papel & Permissões
                                </h3>

                                <div className="bg-gradient-to-br from-muted/30 to-background border border-border rounded-xl p-5 shadow-sm">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="text-base text-foreground font-bold">{role?.nome}</p>
                                        {role?.isSystem && (
                                            <span className="text-[10px] font-bold tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                                                SISTEMA
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{role?.descricao}</p>

                                    <div className="space-y-3">
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Acesso aos Módulos:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {['Dashboard', 'CRM', 'Financeiro'].map(mod => (
                                                <span key={mod} className="px-2.5 py-1 bg-background border border-border rounded-md text-xs font-medium text-muted-foreground shadow-sm">
                                                    {mod}
                                                </span>
                                            ))}
                                            <span className="px-2.5 py-1 bg-muted/50 border border-border rounded-md text-xs font-medium text-muted-foreground">
                                                + outros
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-border bg-background flex justify-end gap-2">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                                Fechar
                            </button>
                            <button
                                onClick={() => onEdit(user)}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                Editar Usuário
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
