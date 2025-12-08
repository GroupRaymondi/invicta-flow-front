import { X } from 'lucide-react';
import type { User } from '../../data/mockUsers';
import type { Role } from '../../data/mockRoles';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface UserFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (user: Partial<User>) => void;
    user: User | null;
    roles: Role[];
}

export const UserFormModal = ({ isOpen, onClose, onSave, user, roles }: UserFormModalProps) => {
    const [formData, setFormData] = useState<Partial<User>>({
        nome: '',
        email: '',
        roleId: '',
        status: 'ativo'
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        } else {
            setFormData({
                nome: '',
                email: '',
                roleId: roles[0]?.id || '',
                status: 'convite_pendente'
            });
        }
    }, [user, roles, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="relative bg-background border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
                >
                    <div className="p-6 border-b border-border flex items-center justify-between bg-muted/10">
                        <h2 className="text-lg font-bold text-foreground">
                            {user ? 'Editar Usuário' : 'Novo Usuário'}
                        </h2>
                        <button
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Nome Completo</label>
                            <input
                                type="text"
                                required
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                                value={formData.nome}
                                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                                placeholder="Ex: João Silva"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="Ex: joao@empresa.com"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Papel</label>
                            <select
                                required
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm appearance-none"
                                value={formData.roleId}
                                onChange={(e) => setFormData({ ...formData, roleId: e.target.value })}
                            >
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
                            <select
                                required
                                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm appearance-none"
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                            >
                                <option value="ativo">Ativo</option>
                                <option value="inativo">Inativo</option>
                                <option value="convite_pendente">Convite Pendente</option>
                            </select>
                        </div>

                        {!user && (
                            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Senha Provisória</label>
                                <input
                                    type="text"
                                    className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all shadow-sm"
                                    value={(formData as any).tempPassword || ''}
                                    onChange={(e) => setFormData({ ...formData, tempPassword: e.target.value } as any)}
                                    placeholder="Digite uma senha provisória"
                                />
                                <p className="text-[10px] text-muted-foreground">
                                    O usuário será obrigado a alterar esta senha no primeiro acesso.
                                </p>
                            </div>
                        )}

                        <div className="pt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-4 py-2 border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
                            >
                                Salvar
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
